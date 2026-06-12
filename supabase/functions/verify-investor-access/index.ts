// Server-side gate for the investor portal.
// The portal password lives only in the INVESTOR_PORTAL_PASSWORD secret and is
// never shipped to the client bundle. The client sends a candidate password and
// receives only an authorized boolean.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const expected = Deno.env.get("INVESTOR_PORTAL_PASSWORD");
    if (!expected) {
      console.error("INVESTOR_PORTAL_PASSWORD secret is not configured");
      return new Response(
        JSON.stringify({ error: "Server not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const password = (body as { password?: unknown })?.password;
    if (typeof password !== "string" || password.length === 0 || password.length > 200) {
      return new Response(JSON.stringify({ authorized: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authorized = password === expected;

    return new Response(JSON.stringify({ authorized }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("verify-investor-access error", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
