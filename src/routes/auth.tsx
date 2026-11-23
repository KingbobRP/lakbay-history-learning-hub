import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { studentEmail, usernameEmail, studentPassword, validPin, validUsername } from "@/lib/student-auth";
import { useStudent } from "@/lib/student";
import { claimStudentUsername } from "./-auth.functions";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Mag-log in — HISTORIA" },
      { name: "description", content: "Mag-log in sa HISTORIA gamit ang username at PIN." },
      { property: "og:title", content: "Mag-log in — HISTORIA" },
      { property: "og:description", content: "Pasukan ng mag-aaral sa HISTORIA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

type Mode = "login" | "signup" | "migrate";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [f, setF] = useState({
    fullName: "",
    classCode: "",
    username: "",
    section: "",
    pin: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const { session } = useStudent();

  useEffect(() => {
    if (session && mode !== "migrate") {
      navigate({ to: "/", replace: true });
    }
  }, [session, mode, navigate]);

  const changeMode = (next: Mode) => {
    setMode(next);
    setError("");
    setNotice("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    const username = f.username.trim().toLowerCase();

    if (!validPin(f.pin)) {
      setError("Ang PIN ay dapat 4 hanggang 6 na numero.");
      return;
    }

    if (mode !== "migrate" && !validUsername(username)) {
      setError("Username: 3–20 characters; letters, numbers, dot, dash, o underscore lamang.");
      return;
    }

    if (mode !== "login" && !validUsername(username)) {
      setError("Maglagay ng valid na username.");
      return;
    }

    if (mode !== "login" && mode !== "signup" && !f.fullName.trim()) {
      setError("Ilagay ang buong pangalan.");
      return;
    }

    if (mode === "signup" && f.fullName.trim().split(/\s+/).length < 2) {
      setError("Ilagay ang buong pangalan at apelyido.");
      return;
    }

    if (mode === "signup" && !f.section.trim()) {
      setError("Ilagay ang iyong baitang at seksiyon.");
      return;
    }

    if (mode === "migrate" && !f.classCode.trim()) {
      setError("Ilagay ang dating class code.");
      return;
    }

    setBusy(true);

    try {
      const password = studentPassword(f.pin);

      if (mode === "login") {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: usernameEmail(username),
          password,
        });

        if (loginError) throw new Error("Mali ang username o PIN.");
      } else if (mode === "signup") {
        const { error: signupError } = await supabase.auth.signUp({
          email: usernameEmail(username),
          password,
          options: {
            data: {
              full_name: f.fullName.trim().replace(/\s+/g, " "),
              username,
              class_code: "",
              section: f.section.trim(),
            },
          },
        });

        if (signupError) throw new Error("Hindi nagawa ang account. Subukang muli o pumili ng ibang username.");
        setNotice("Matagumpay ang registration. Maaari ka nang mag-log in.");
        setMode("login");
        setF({ ...f, pin: "" });
      } else {
        const oldEmail = studentEmail(
          f.fullName.trim().replace(/\s+/g, " "),
          f.classCode,
        );

        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: oldEmail,
          password,
        });

        if (loginError) throw new Error("Hindi ma-verify ang dating account. Suriin ang pangalan, class code, at PIN.");

        await claimStudentUsername({ data: { username } });

        const { data: refreshed, error: refreshError } =
          await supabase.auth.refreshSession();

        if (refreshError || !refreshed.session) {
          throw new Error(
            "Na-update ang username, ngunit hindi na-refresh ang session. Mag-log in gamit ang bagong username at dating PIN."
          );
        }

        if (refreshed.session.user.email !== usernameEmail(username)) {
          throw new Error(
            "Hindi nakumpirma ang bagong username. Mag-log in muli gamit ang bagong username."
          );
        }

        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "May nangyaring error. Subukang muli.");
    } finally {
      setBusy(false);
    }
  };

  const field = "mt-1 min-h-12 w-full border border-border bg-background px-3 font-sans text-base focus:border-primary focus:outline-none";

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <p className="eyebrow">📜 Pasukan ng Mag-aaral</p>
      <h1 className="mt-3 text-4xl">
        {mode === "login" ? "Mag-log in" : mode === "signup" ? "Gumawa ng account" : "Ilipat ang dating account"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {mode === "migrate"
          ? "Gamitin ang dati mong pangalan, class code, at PIN upang mapanatili ang iyong progress."
          : "Username at PIN lamang ang kailangan upang makapasok sa HISTORIA."}
      </p>

      <div className="mt-6 grid grid-cols-2 border border-border font-sans text-sm" role="tablist">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => changeMode(m)}
            className={`min-h-11 ${mode === m ? "bg-primary text-primary-foreground" : "text-primary"}`}
          >
            {m === "login" ? "Mag-log in" : "Bagong account"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4 border border-border bg-card p-5">
        {(mode === "signup" || mode === "migrate") && (
          <label className="block font-sans text-sm">
            Buong pangalan
            <input
              value={f.fullName}
              onChange={(e) => setF({ ...f, fullName: e.target.value })}
              autoComplete="name"
              maxLength={80}
              className={field}
            />
          </label>
        )}

        {mode === "migrate" && (
          <label className="block font-sans text-sm">
            Dating class code
            <input
              value={f.classCode}
              onChange={(e) => setF({ ...f, classCode: e.target.value })}
              maxLength={20}
              className={field}
            />
          </label>
        )}

        <label className="block font-sans text-sm">
          {mode === "migrate" ? "Bagong username" : "Username"}
          <input
            value={f.username}
            onChange={(e) => setF({ ...f, username: e.target.value })}
            autoComplete="username"
            minLength={3}
            maxLength={20}
            placeholder="hal. juandelacruz"
            className={field}
          />
        </label>

        {mode === "signup" && (
          <label className="block font-sans text-sm">
            Baitang at seksiyon
            <input
              value={f.section}
              onChange={(e) => setF({ ...f, section: e.target.value })}
              placeholder="hal. 11 - STEM"
              required
              maxLength={40}
              className={field}
            />
          </label>
        )}

        <label className="block font-sans text-sm">
          PIN (4–6 na numero)
          <input
            value={f.pin}
            onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })}
            type="password"
            inputMode="numeric"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className={field}
          />
        </label>

        {error && <p role="alert" className="font-sans text-sm text-destructive">{error}</p>}
        {notice && <p role="status" className="font-sans text-sm text-primary">{notice}</p>}

        <Button type="submit" disabled={busy} className="min-h-12 w-full">
          {busy && <Loader2 className="animate-spin" />}
          {mode === "login" ? "Pumasok" : mode === "signup" ? "Gumawa ng account" : "I-save ang username"}
        </Button>

        <p className="font-sans text-xs text-muted-foreground">
          {mode === "migrate"
            ? "Hindi gagawa ng bagong account ang prosesong ito."
            : "Nakalimutan ang PIN? Lumapit sa iyong guro."}
        </p>
      </form>

      {mode !== "migrate" && (
        <button
          type="button"
          onClick={() => changeMode("migrate")}
          className="mt-4 min-h-11 w-full text-left font-sans text-sm text-primary underline"
        >
          May dati ka nang account? Ilipat ito rito.
        </button>
      )}

      <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-sans text-sm text-primary">
        ← Bumalik sa Tahanan
      </Link>
    </div>
  );
}
