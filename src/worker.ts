interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
  timeCheck?: number;
  turnstileToken?: string;
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60000 });
    return false;
  }
  entry.count++;
  return entry.count > 5;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
        if (isRateLimited(clientIp)) {
          return Response.json(
            { success: false, error: "Too many requests. Try again later." },
            { status: 429, headers: corsHeaders() }
          );
        }

        const body: ContactPayload = await request.json();

        if (!body.name || !body.email || !body.subject || !body.message) {
          return Response.json(
            { success: false, error: "Missing required fields" },
            { status: 400, headers: corsHeaders() }
          );
        }

        if (body.honeypot) {
          return Response.json(
            { success: false, error: "Bot detected" },
            { status: 400, headers: corsHeaders() }
          );
        }

        if (!body.timeCheck || body.timeCheck < 3000) {
          return Response.json(
            { success: false, error: "Form submitted too quickly" },
            { status: 400, headers: corsHeaders() }
          );
        }

        if (body.turnstileToken) {
          const turnstileRes = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
              method: "POST",
              body: new URLSearchParams({
                secret: "0x4AAAAAAEAuLqgL7rYxhfrmrgGB-psYDjQ",
                response: body.turnstileToken,
              }),
            }
          );
          const turnstileData = await turnstileRes.json() as { success: boolean };
          if (!turnstileData.success) {
            return Response.json(
              { success: false, error: "Security check failed" },
              { status: 400, headers: corsHeaders() }
            );
          }
        }

        const emailContent = `
New Contact Form Submission
===========================
Name:    ${body.name}
Email:   ${body.email}
Phone:   ${body.phone || "N/A"}
Subject: ${body.subject}
Message: ${body.message}
        `;

        const mailPayload = {
          personalizations: [
            { to: [{ email: "mnishsaini@gmail.com", name: "Hear O Care" }] },
          ],
          from: { email: "noreply@hearocare.mnishsaini.workers.dev", name: "Hear O Care" },
          subject: `New enquiry from ${body.name} - ${body.subject}`,
          content: [{ type: "text/plain", value: emailContent }],
        };

        const mailRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mailPayload),
        });

        if (!mailRes.ok) {
          const mailErr = await mailRes.text();
          console.error("MailChannels error:", mailErr);
          return Response.json(
            { success: false, error: `Email failed: ${mailErr.substring(0, 200)}` },
            { status: 500, headers: corsHeaders() }
          );
        }

        return Response.json(
          { success: true, message: "Message sent successfully" },
          { status: 200, headers: corsHeaders() }
        );
      } catch (err) {
        console.error("Worker error:", err);
        return Response.json(
          { success: false, error: "Failed to send message" },
          { status: 500, headers: corsHeaders() }
        );
      }
    }

    return new Response("Not found", { status: 404 });
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
