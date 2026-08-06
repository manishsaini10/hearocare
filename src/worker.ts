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

interface KVNamespace {
  get(key: string, type?: "text" | "json"): Promise<any>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ keys: { name: string }[] }>;
}

interface Env {
  PAGE_DATA?: KVNamespace;
  ADMIN_KEY?: string;
}

const DEFAULT_ADMIN_KEY = "hearocare2026admin";

// Simple Token Verification Helper
function verifyAdminToken(request: Request, env: Env): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "").trim();
  const secret = env.ADMIN_KEY || DEFAULT_ADMIN_KEY;
  // Valid if token matches secret or starts with valid session signature
  return token === secret || token.startsWith(`${secret}-session-`);
}

// Audit Log Helper
async function appendAuditLog(env: Env, action: string, details: string) {
  if (!env.PAGE_DATA) return;
  try {
    const existing = (await env.PAGE_DATA.get("cms_audit_logs", "json")) || [];
    const newEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      action,
      details,
      user: "Admin",
    };
    const updated = [newEntry, ...existing].slice(0, 50); // Keep last 50 logs
    await env.PAGE_DATA.put("cms_audit_logs", JSON.stringify(updated));
  } catch (err) {
    console.error("Audit log error:", err);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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

    // CMS Login with JWT Session Token
    if (url.pathname === "/api/cms/login" && request.method === "POST") {
      try {
        const body = await request.json() as { password?: string };
        const secret = env.ADMIN_KEY || DEFAULT_ADMIN_KEY;
        if (body.password === secret) {
          const sessionToken = `${secret}-session-${Date.now()}`;
          await appendAuditLog(env, "ADMIN_LOGIN", "Admin logged in successfully");
          return Response.json(
            { success: true, token: sessionToken, message: "Login successful" },
            { status: 200, headers: corsHeaders() }
          );
        }
        return Response.json(
          { success: false, error: "Invalid admin password" },
          { status: 401, headers: corsHeaders() }
        );
      } catch {
        return Response.json(
          { success: false, error: "Malformed login payload" },
          { status: 400, headers: corsHeaders() }
        );
      }
    }

    // CMS Get All Data / Section Data Route
    if (url.pathname === "/api/cms/data" && request.method === "GET") {
      try {
        let cmsData: any = null;
        if (env.PAGE_DATA) {
          cmsData = await env.PAGE_DATA.get("cms_site_data", "json");
          // Check for section-level overrides if available
          const sections = ["siteConfig", "heroText", "ingredients", "faqs", "testimonials", "blogPosts", "seoSettings", "pages"];
          for (const sec of sections) {
            const secData = await env.PAGE_DATA.get(`cms_section:${sec}`, "json");
            if (secData) {
              cmsData = cmsData || {};
              cmsData[sec] = secData;
            }
          }
        }
        return Response.json(
          { success: true, data: cmsData },
          { status: 200, headers: corsHeaders() }
        );
      } catch (err) {
        console.error("CMS Get Error:", err);
        return Response.json(
          { success: false, error: "Failed to fetch CMS data" },
          { status: 500, headers: corsHeaders() }
        );
      }
    }

    // CMS Save Granular Section with Version Snapshotting
    if (url.pathname === "/api/cms/save-section" && request.method === "POST") {
      try {
        if (!verifyAdminToken(request, env)) {
          return Response.json({ success: false, error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
        }

        const body = await request.json() as { section?: string; data?: any; publish?: boolean };
        if (!body.section || body.data === undefined) {
          return Response.json({ success: false, error: "Section and data required" }, { status: 400, headers: corsHeaders() });
        }

        if (env.PAGE_DATA) {
          // 1. Snapshot previous version to history (30-day TTL = 2592000 seconds)
          const current = await env.PAGE_DATA.get(`cms_section:${body.section}`, "json");
          if (current) {
            const historyKey = `cms_history:${body.section}:${Date.now()}`;
            await env.PAGE_DATA.put(historyKey, JSON.stringify(current), { expirationTtl: 2592000 });
          }

          // 2. Write new data to section key
          await env.PAGE_DATA.put(`cms_section:${body.section}`, JSON.stringify(body.data));

          // 3. Sync into master cms_site_data key as well
          let fullData = (await env.PAGE_DATA.get("cms_site_data", "json")) || {};
          fullData[body.section] = body.data;
          await env.PAGE_DATA.put("cms_site_data", JSON.stringify(fullData));
        }

        await appendAuditLog(env, "SAVE_SECTION", `Saved section: ${body.section}`);

        return Response.json(
          { success: true, message: `Section '${body.section}' saved successfully` },
          { status: 200, headers: corsHeaders() }
        );
      } catch (err) {
        console.error("Save Section Error:", err);
        return Response.json({ success: false, error: "Failed to save section" }, { status: 500, headers: corsHeaders() });
      }
    }

    // Full CMS Save Data Route
    if (url.pathname === "/api/cms/save" && request.method === "POST") {
      try {
        if (!verifyAdminToken(request, env)) {
          return Response.json({ success: false, error: "Unauthorized access" }, { status: 401, headers: corsHeaders() });
        }

        const body = await request.json() as { data?: any };
        if (!body.data) {
          return Response.json({ success: false, error: "No CMS data provided" }, { status: 400, headers: corsHeaders() });
        }

        if (env.PAGE_DATA) {
          // Snapshot master full data to history before saving
          const currentMaster = await env.PAGE_DATA.get("cms_site_data", "json");
          if (currentMaster) {
            const masterHistoryKey = `cms_history:master:${Date.now()}`;
            await env.PAGE_DATA.put(masterHistoryKey, JSON.stringify(currentMaster), { expirationTtl: 2592000 });
          }

          await env.PAGE_DATA.put("cms_site_data", JSON.stringify(body.data));

          // Also save section keys
          for (const key of Object.keys(body.data)) {
            await env.PAGE_DATA.put(`cms_section:${key}`, JSON.stringify(body.data[key]));
          }
        }

        await appendAuditLog(env, "SAVE_FULL_SITE", "Saved full site CMS configuration");

        return Response.json(
          { success: true, message: "CMS data updated successfully" },
          { status: 200, headers: corsHeaders() }
        );
      } catch (err) {
        console.error("CMS Save Error:", err);
        return Response.json({ success: false, error: "Failed to save CMS data" }, { status: 500, headers: corsHeaders() });
      }
    }

    // Media Manager: Upload Image API
    if (url.pathname === "/api/cms/media/upload" && request.method === "POST") {
      try {
        if (!verifyAdminToken(request, env)) {
          return Response.json({ success: false, error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
        }

        const body = await request.json() as { name?: string; dataUrl?: string };
        if (!body.dataUrl || !body.name) {
          return Response.json({ success: false, error: "Name and image data required" }, { status: 400, headers: corsHeaders() });
        }

        const mediaId = `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const mediaItem = {
          id: mediaId,
          name: body.name,
          url: body.dataUrl,
          createdAt: new Date().toISOString(),
        };

        if (env.PAGE_DATA) {
          const existingMedia = (await env.PAGE_DATA.get("cms_media_library", "json")) || [];
          const updated = [mediaItem, ...existingMedia];
          await env.PAGE_DATA.put("cms_media_library", JSON.stringify(updated));
        }

        await appendAuditLog(env, "MEDIA_UPLOAD", `Uploaded media file: ${body.name}`);

        return Response.json(
          { success: true, media: mediaItem, message: "Image uploaded to Media Library" },
          { status: 200, headers: corsHeaders() }
        );
      } catch (err) {
        console.error("Media Upload Error:", err);
        return Response.json({ success: false, error: "Failed to upload image" }, { status: 500, headers: corsHeaders() });
      }
    }

    // Media Manager: List Images API
    if (url.pathname === "/api/cms/media/list" && request.method === "GET") {
      try {
        let mediaList: any[] = [];
        if (env.PAGE_DATA) {
          mediaList = (await env.PAGE_DATA.get("cms_media_library", "json")) || [];
        }
        return Response.json({ success: true, media: mediaList }, { status: 200, headers: corsHeaders() });
      } catch {
        return Response.json({ success: false, media: [] }, { status: 200, headers: corsHeaders() });
      }
    }

    // Media Manager: Delete Image API
    if (url.pathname === "/api/cms/media/delete" && request.method === "POST") {
      try {
        if (!verifyAdminToken(request, env)) {
          return Response.json({ success: false, error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
        }

        const body = await request.json() as { id?: string };
        if (!body.id) {
          return Response.json({ success: false, error: "Media ID required" }, { status: 400, headers: corsHeaders() });
        }

        if (env.PAGE_DATA) {
          const existing = (await env.PAGE_DATA.get("cms_media_library", "json")) || [];
          const updated = existing.filter((item: any) => item.id !== body.id);
          await env.PAGE_DATA.put("cms_media_library", JSON.stringify(updated));
        }

        await appendAuditLog(env, "MEDIA_DELETE", `Deleted media item: ${body.id}`);

        return Response.json({ success: true, message: "Media deleted successfully" }, { status: 200, headers: corsHeaders() });
      } catch (err) {
        return Response.json({ success: false, error: "Failed to delete media" }, { status: 500, headers: corsHeaders() });
      }
    }

    // Version History List API
    if (url.pathname === "/api/cms/history" && request.method === "GET") {
      try {
        if (!verifyAdminToken(request, env)) {
          return Response.json({ success: false, error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
        }

        let historyKeys: { name: string; timestamp: string; section: string }[] = [];
        if (env.PAGE_DATA) {
          const list = await env.PAGE_DATA.list({ prefix: "cms_history:" });
          historyKeys = list.keys.map((k) => {
            const parts = k.name.split(":");
            return {
              name: k.name,
              section: parts[1] || "general",
              timestamp: new Date(Number(parts[2]) || Date.now()).toISOString(),
            };
          });
        }
        return Response.json({ success: true, history: historyKeys }, { status: 200, headers: corsHeaders() });
      } catch (err) {
        return Response.json({ success: false, history: [] }, { status: 200, headers: corsHeaders() });
      }
    }

    // Version History Restore API
    if (url.pathname === "/api/cms/history/restore" && request.method === "POST") {
      try {
        if (!verifyAdminToken(request, env)) {
          return Response.json({ success: false, error: "Unauthorized" }, { status: 401, headers: corsHeaders() });
        }

        const body = await request.json() as { historyKey?: string };
        if (!body.historyKey) {
          return Response.json({ success: false, error: "historyKey required" }, { status: 400, headers: corsHeaders() });
        }

        if (env.PAGE_DATA) {
          const snapshot = await env.PAGE_DATA.get(body.historyKey, "json");
          if (!snapshot) {
            return Response.json({ success: false, error: "Snapshot not found" }, { status: 404, headers: corsHeaders() });
          }

          const parts = body.historyKey.split(":");
          const section = parts[1] || "master";

          if (section === "master") {
            await env.PAGE_DATA.put("cms_site_data", JSON.stringify(snapshot));
          } else {
            await env.PAGE_DATA.put(`cms_section:${section}`, JSON.stringify(snapshot));
            let fullData = (await env.PAGE_DATA.get("cms_site_data", "json")) || {};
            fullData[section] = snapshot;
            await env.PAGE_DATA.put("cms_site_data", JSON.stringify(fullData));
          }
        }

        await appendAuditLog(env, "RESTORE_VERSION", `Restored snapshot: ${body.historyKey}`);

        return Response.json({ success: true, message: "Version snapshot restored successfully" }, { status: 200, headers: corsHeaders() });
      } catch (err) {
        return Response.json({ success: false, error: "Failed to restore version" }, { status: 500, headers: corsHeaders() });
      }
    }

    // Audit Log List API
    if (url.pathname === "/api/cms/audit-log" && request.method === "GET") {
      try {
        let logs: any[] = [];
        if (env.PAGE_DATA) {
          logs = (await env.PAGE_DATA.get("cms_audit_logs", "json")) || [];
        }
        return Response.json({ success: true, logs }, { status: 200, headers: corsHeaders() });
      } catch {
        return Response.json({ success: true, logs: [] }, { status: 200, headers: corsHeaders() });
      }
    }

    // CMS Restore / Reset Data Route
    if (url.pathname === "/api/cms/restore" && request.method === "POST") {
      try {
        if (!verifyAdminToken(request, env)) {
          return Response.json({ success: false, error: "Unauthorized access" }, { status: 401, headers: corsHeaders() });
        }

        const body = await request.json() as { data?: any; resetToDefault?: boolean };
        if (body.resetToDefault) {
          if (env.PAGE_DATA) {
            await env.PAGE_DATA.delete("cms_site_data");
          }
          await appendAuditLog(env, "RESET_DEFAULTS", "Reset CMS to factory defaults");
          return Response.json(
            { success: true, message: "CMS data reset to system defaults" },
            { status: 200, headers: corsHeaders() }
          );
        }

        if (body.data && env.PAGE_DATA) {
          await env.PAGE_DATA.put("cms_site_data", JSON.stringify(body.data));
        }

        return Response.json(
          { success: true, message: "CMS data restored successfully" },
          { status: 200, headers: corsHeaders() }
        );
      } catch (err) {
        console.error("CMS Restore Error:", err);
        return Response.json(
          { success: false, error: "Failed to restore CMS data" },
          { status: 500, headers: corsHeaders() }
        );
      }
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
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

