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

const spamPaths = [
  "/ontdek-de-beste-online-casinos-stunning-games-unparalleled-bonuses-fast-payouts-in-de-wereld-van/",
  "/777-casino-85-free-spins-on-registration-only-United-Kingdom/",
  "/descubre-los-secretos-de-malina-casino-y-transforma-tu-suerte-los-casinos-han-sido-centros-de-entret/",
  "/bingo-online-casino-50/",
  "/best-free-casino-apps/",
  "/huge-online-casino-bonus-for-uk-players/",
  "/deposit-15-get-30-free-live-casino-uk/",
  "/free-online-slot-machine-apps/",
  "/dealer-online-casino/",
  "/paysafe-casinos-uk/",
  "/free-racing-slots-uk/",
  "/casino-online-city-center/",
  "/az-online-slot-sites/",
  "/virginbet-casino-no-deposit-bonus-2026-special-offer-UK/",
  "/pay-by-phone-bill-casino-birthday-bonus-casino-uk/",
  "/best-andar-bahar-casino-uk/",
  "/no-max-cashout-bonus-casino-uk/",
  "/best-online-casino-fish-game/",
  "/no-kyc-casino-no-deposit-bonus-uk/",
  "/best-google-pay-casino-real-money-casino-uk/",
  "/bettom-casino-first-deposit-bonus-200-free-spins-United-Kingdom/",
  "/free-demo-roulette-uk/",
  "/trada-casino-real-money-bonus-no-deposit-2026-UK/",
  "/rhino-casino-welcome-bonus-100-free-spins-United-Kingdom/",
  "/bcgame-casino-claim-now-no-deposit-bonus-United-Kingdom/",
  "/deposit-10-play-with-40-online-blackjack-uk/",
  "/uk-racing-casino/",
  "/best-1000x-max-win-slots-uk/",
  "/khaotichnaia-priroda-professionalnogo-gemblinga/",
  "/best-online-casino-game-software/",
];

const spamPostIds = ["53102", "53055", "53311", "53062", "53053", "52989"];

const spamKeywords = [
  "casino", "gambling", "slots", "betting", "poker",
  "roulette", "blackjack", "spins", "bonus-uk", "no-deposit",
];

const legitimatePaths = ["/blog/", "/product/", "/buy-now", "/reviews"];

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function isSpam(pathname: string): boolean {
  if (spamPaths.includes(pathname)) return true;
  const isLegit = legitimatePaths.some((lp) => pathname.startsWith(lp));
  if (!isLegit) {
    const lower = pathname.toLowerCase();
    if (spamKeywords.some((kw) => lower.includes(kw))) return true;
  }
  return false;
}

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
    const pathname = url.pathname;

    if (isSpam(pathname)) {
      return new Response("Gone", { status: 410 });
    }

    const p = url.searchParams.get("p");
    if (p && spamPostIds.includes(p)) {
      return new Response("Gone", { status: 410 });
    }

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
            {
              to: [{ email: "support@hearocare.com", name: "Hear O Care" }],
              headers: { "Reply-To": body.email },
            },
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
