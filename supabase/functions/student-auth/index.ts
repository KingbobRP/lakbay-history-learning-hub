import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const reply = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

const normalizeName = (value: string) =>
  value.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");

const normalizeCode = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const legacyEmail = (name: string, code: string) =>
  `${normalizeName(name)}.${normalizeCode(code)}@mag-aaral.historia.app`;

const passwordFor = (pin: string) => `historia-pin-${pin}`;
const validUsername = (value: string) => /^[a-z0-9_]{3,20}$/.test(value);
const validPin = (value: string) => /^\d{4,6}$/.test(value);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return reply({ error: "not_allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

  if (!url || !serviceKey || !anonKey) {
    return reply({ error: "server_not_configured" }, 500);
  }

  try {
    const body = await req.json();
    const action = String(body.action ?? "");
    const username = String(body.username ?? "").trim().toLowerCase();
    const pin = String(body.pin ?? "");
    const avatar = String(body.avatar ?? "");

    if (!validPin(pin)) return reply({ error: "invalid_credentials" }, 400);

    const admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const publicAuth = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    if (action === "login") {
      if (!validUsername(username)) {
        return reply({ error: "invalid_credentials" }, 400);
      }

      const { data: profile } = await admin
        .from("profiles")
        .select("id")
        .ilike("username", username)
        .maybeSingle();

      if (!profile) return reply({ error: "invalid_credentials" }, 401);

      const { data: userData, error: userError } =
        await admin.auth.admin.getUserById(profile.id);

      if (userError || !userData.user?.email) {
        return reply({ error: "invalid_credentials" }, 401);
      }

      const { data: signed, error: signError } =
        await publicAuth.auth.signInWithPassword({
          email: userData.user.email,
          password: passwordFor(pin),
        });

      if (signError || !signed.session) {
        return reply({ error: "invalid_credentials" }, 401);
      }

      if (avatar) {
        await admin.from("profiles")
          .update({ avatar, updated_at: new Date().toISOString() })
          .eq("id", profile.id);
      }

      return reply({
        access_token: signed.session.access_token,
        refresh_token: signed.session.refresh_token,
      });
    }

    if (action === "migrate") {
      const fullName = String(body.full_name ?? "")
        .trim()
        .replace(/\s+/g, " ");

      const classCode = String(body.class_code ?? "").trim();

      if (
        !validUsername(username) ||
        fullName.split(" ").length < 2 ||
        !classCode
      ) {
        return reply({ error: "invalid_credentials" }, 400);
      }

      const { data: signed, error: signError } =
        await publicAuth.auth.signInWithPassword({
          email: legacyEmail(fullName, classCode),
          password: passwordFor(pin),
        });

      if (signError || !signed.session?.user) {
        return reply({ error: "invalid_credentials" }, 401);
      }

      const { data: existing } = await admin.from("profiles")
        .select("id")
        .ilike("username", username)
        .maybeSingle();

      if (existing && existing.id !== signed.session.user.id) {
        return reply({ error: "username_taken" }, 409);
      }

      const { error: updateError } = await admin.from("profiles")
        .update({
          username,
          avatar,
          updated_at: new Date().toISOString(),
        })
        .eq("id", signed.session.user.id);

      if (updateError) return reply({ error: "migration_failed" }, 500);

      return reply({
        access_token: signed.session.access_token,
        refresh_token: signed.session.refresh_token,
      });
    }

    return reply({ error: "invalid_action" }, 400);
  } catch (error) {
    console.error("student-auth error:", error);
    return reply({ error: "invalid_request" }, 400);
  }
});
