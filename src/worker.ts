interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body: ContactPayload = await request.json();

        if (!body.name || !body.email || !body.subject || !body.message) {
          return Response.json(
            { success: false, error: "Missing required fields" },
            { status: 400, headers: corsHeaders() }
          );
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

        await fetch("https://api.mailchannels.net/tx/v1/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            personalizations: [
              { to: [{ email: "mnishsaini@gmail.com", name: "Hear O Care" }] },
            ],
            from: { email: "noreply@hearocare.com", name: "Hear O Care" },
            subject: `New enquiry from ${body.name} - ${body.subject}`,
            content: [{ type: "text/plain", value: emailContent }],
          }),
        });

        return Response.json(
          { success: true, message: "Message sent successfully" },
          { status: 200, headers: corsHeaders() }
        );
      } catch {
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
