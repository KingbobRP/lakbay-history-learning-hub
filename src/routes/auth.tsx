import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { studentEmail, studentPassword, validPin } from "@/lib/student-auth";
import { useStudent } from "@/lib/student";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Mag-log in — HISTORIA" },
    { name: "description", content: "Mag-log in gamit ang buong pangalan, class code, at PIN." },
    { property: "og:title", content: "Mag-log in — HISTORIA" },
    { property: "og:description", content: "Pasukan ng mag-aaral sa HISTORIA." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [f, setF] = useState({ fullName: "", classCode: "", section: "", pin: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { session } = useStudent();
  useEffect(() => { if (session) navigate({ to: "/", replace: true }); }, [session, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    const name = f.fullName.trim().replace(/\s+/g, " ");
    if (name.split(" ").length < 2) return setError("Ilagay ang iyong buong pangalan (pangalan at apelyido).");
    if (!f.classCode.trim()) return setError("Ilagay ang class code mula sa iyong guro.");
    if (!validPin(f.pin)) return setError("Ang PIN ay dapat 4 hanggang 6 na numero.");
    setBusy(true);
    const email = studentEmail(name, f.classCode), password = studentPassword(f.pin);
    const res = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { full_name: name, class_code: f.classCode.trim().toUpperCase(), section: f.section.trim() } } });
    setBusy(false);
    if (res.error) {
      const m = res.error.message.toLowerCase();
      setError(mode === "login" ? "Mali ang pangalan, class code, o PIN." : m.includes("registered") ? "May account na ang pangalang ito sa class code na ito. Mag-log in na lang." : "Hindi nagawa ang account. Subukang muli.");
    }
  };
  const field = "mt-1 min-h-12 w-full border border-border bg-background px-3 font-sans text-base focus:border-primary focus:outline-none";
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <p className="eyebrow">📜 Pasukan ng Mag-aaral</p>
      <h1 className="mt-3 text-4xl">{mode === "login" ? "Mag-log in" : "Gumawa ng account"}</h1>
      <p className="mt-2 text-muted-foreground">Walang email o numero ng telepono — pangalan, class code, at PIN lang.</p>
      <div className="mt-6 grid grid-cols-2 border border-border font-sans text-sm" role="tablist">
        {(["login", "signup"] as const).map((m) => (
          <button key={m} role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setError(""); }} className={`min-h-11 ${mode === m ? "bg-primary text-primary-foreground" : "text-primary"}`}>{m === "login" ? "Mag-log in" : "Bagong account"}</button>
        ))}
      </div>
      <form onSubmit={submit} className="mt-6 space-y-4 border border-border bg-card p-5">
        <label className="block font-sans text-sm">Buong pangalan<input value={f.fullName} onChange={(e) => setF({ ...f, fullName: e.target.value })} autoComplete="name" maxLength={80} className={field} /></label>
        <label className="block font-sans text-sm">Class code<input value={f.classCode} onChange={(e) => setF({ ...f, classCode: e.target.value })} placeholder="hal. 11STEM-A" maxLength={20} className={field} /></label>
        {mode === "signup" && <label className="block font-sans text-sm">Baitang at seksiyon<input value={f.section} onChange={(e) => setF({ ...f, section: e.target.value })} placeholder="hal. 11 - STEM" maxLength={40} className={field} /></label>}
        <label className="block font-sans text-sm">PIN (4–6 na numero)<input value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })} type="password" inputMode="numeric" autoComplete={mode === "login" ? "current-password" : "new-password"} className={field} /></label>
        {error && <p role="alert" className="font-sans text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={busy} className="min-h-12 w-full">{busy && <Loader2 className="animate-spin" />}{mode === "login" ? "Pumasok" : "Gumawa ng account"}</Button>
        <p className="font-sans text-xs text-muted-foreground">Nakalimutan ang PIN? Lumapit sa iyong guro.</p>
      </form>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-sans text-sm text-primary">← Bumalik sa Tahanan</Link>
    </div>
  );
}
