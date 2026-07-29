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

        console.log("Contact form submission:", JSON.stringify(body, null, 2));

        return Response.json(
          { success: true, message: "Message received successfully" },
          { status: 200, headers: corsHeaders() }
        );
      } catch {
        return Response.json(
          { success: false, error: "Invalid request" },
          { status: 400, headers: corsHeaders() }
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
