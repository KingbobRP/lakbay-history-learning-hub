import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, UserRound, KeyRound, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { studentPassword, validPin, validUsername } from "@/lib/student-auth";
import { AvatarPicker } from "@/components/AvatarPicker";
import { useStudent } from "@/lib/student";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({ mode: search.mode === "signup" ? "signup" as const : "login" as const }),
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Mag-log in — HISTORIA" },
    { name: "description", content: "Mag-log in sa HISTORIA gamit ang username at PIN." },
    { property: "og:title", content: "Mag-log in — HISTORIA" },
    { property: "og:description", content: "Pasukan ng mag-aaral sa HISTORIA." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const { mode: requestedMode } = Route.useSearch();
  const [mode, setMode] = useState<"login" | "signup">(requestedMode);
  const [f, setF] = useState({ username: "", fullName: "", classCode: "", section: "", pin: "" });
  const [legacy, setLegacy] = useState({ fullName: "", classCode: "", username: "", pin: "" });
  const [avatar, setAvatar] = useState("babae-1");
  const [showMigration, setShowMigration] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const { session } = useStudent();
  useEffect(() => { if (session) navigate({ to: "/", replace: true }); }, [session, navigate]);

  const finishSession = async (data: { access_token: string; refresh_token: string }) => {
    const { error: sessionError } = await supabase.auth.setSession(data);
    if (sessionError) throw sessionError;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setNotice("");
    if (!validPin(f.pin)) return setError("Ang PIN ay dapat 4 hanggang 6 na numero.");
    if (mode === "login") {
      if (!validUsername(f.username)) return setError("Gumamit ng username na 3–20 karakter: titik, numero, o underscore.");
      setBusy(true);
      const { data, error: invokeError } = await supabase.functions.invoke("student-auth", { body: { action: "login", username: f.username.trim().toLowerCase(), pin: f.pin, avatar } });
      setBusy(false);
      if (invokeError || data?.error || !data?.access_token || !data?.refresh_token) return setError("Hindi tugma ang username o PIN. Subukang muli.");
      try { await finishSession(data); } catch { setError("Hindi makumpleto ang pagpasok. Subukang muli."); }
      return;
    }

    const name = f.fullName.trim().replace(/\s+/g, " ");
    if (name.split(" ").length < 2) return setError("Ilagay ang iyong buong pangalan (pangalan at apelyido).");
    if (!f.classCode.trim()) return setError("Ilagay ang class code mula sa iyong guro.");
    if (!validUsername(f.username)) return setError("Gumamit ng username na 3–20 karakter: titik, numero, o underscore.");
    setBusy(true);
    const email = `student.${f.username.trim().toLowerCase()}@mag-aaral.historia.app`;
    const { error: signupError } = await supabase.auth.signUp({
      email, password: studentPassword(f.pin),
      options: { data: { full_name: name, username: f.username.trim().toLowerCase(), class_code: f.classCode.trim().toUpperCase(), section: f.section.trim(), avatar } },
    });
    setBusy(false);
    if (signupError) {
      const m = signupError.message.toLowerCase();
      setError(m.includes("registered") || m.includes("already") ? "May gumagamit na ng username na iyan. Pumili ng iba." : "Hindi nagawa ang account. Subukang muli.");
    } else {
      setNotice("Nagawa ang account. Kung kailangan ng kumpirmasyon, tingnan ang tagubilin ng iyong guro.");
    }
  };

  const migrate = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setNotice("");
    const name = legacy.fullName.trim().replace(/\s+/g, " ");
    if (name.split(" ").length < 2 || !legacy.classCode.trim()) return setError("Ilagay ang dating buong pangalan at class code.");
    if (!validUsername(legacy.username)) return setError("Gumamit ng bagong username na 3–20 karakter.");
    if (!validPin(legacy.pin)) return setError("Ang dating PIN ay dapat 4 hanggang 6 na numero.");
    setBusy(true);
    const { data, error: invokeError } = await supabase.functions.invoke("student-auth", {
      body: { action: "migrate", full_name: name, class_code: legacy.classCode.trim(), username: legacy.username.trim().toLowerCase(), pin: legacy.pin, avatar },
    });
    setBusy(false);
    if (invokeError || data?.error || !data?.access_token || !data?.refresh_token) return setError("Hindi ma-ilipat ang account. Tiyaking tama ang dating pangalan, class code, at PIN; maaaring nagamit na ang username.");
    try { await finishSession(data); } catch { setError("Na-update ang account pero hindi nakumpleto ang pagpasok. Mag-log in gamit ang bagong username."); }
  };

  const field = "mt-1 min-h-12 w-full border border-border bg-background px-3 font-sans text-base focus:border-primary focus:outline-none";
  const label = "block font-sans text-sm font-medium text-foreground";
  return (
    <div className="relative mx-auto max-w-xl px-4 py-10 sm:py-14">
      <div className="mb-7 text-center">
        <p className="eyebrow">📜 Pasukan ng Mag-aaral</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{mode === "login" ? "Ipagpatuloy ang iyong paglalakbay." : "Simulan ang iyong paglalakbay."}</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">{mode === "login" ? "Bumalik sa iyong mga aralin at tuklasin muli ang kasaysayan." : "Gumawa ng iyong pagkakakilanlan bilang mag-aaral sa HISTORIA."}</p>
      </div>

      <div className="mx-auto mb-6 grid max-w-sm grid-cols-2 border border-border bg-card p-1 font-sans text-sm" role="tablist">
        {(["login", "signup"] as const).map((m) => (
          <button key={m} role="tab" aria-selected={mode === m} onClick={() => { setMode(m); setError(""); setNotice(""); setShowMigration(false); }} className={`min-h-11 px-3 transition-colors ${mode === m ? "bg-primary text-primary-foreground shadow-sm" : "text-primary hover:bg-secondary"}`}>{m === "login" ? "Mag-login" : "Gumawa ng account"}</button>
        ))}
      </div>

      <div className="border border-border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary"><UserRound /></span>
          <div><h2 className="font-display text-2xl">{showMigration ? "Ilipat ang dating account" : mode === "login" ? "Maligayang pagbabalik!" : "I-set up ang iyong account"}</h2><p className="font-sans text-xs text-muted-foreground">{showMigration ? "Isang beses lang itong kailangan." : "Pumili muna ng iyong avatar."}</p></div>
        </div>

        <div className="mb-6">
          <p className="mb-3 font-sans text-sm font-medium">Piliin ang iyong avatar</p>
          <AvatarPicker value={avatar} onChange={setAvatar} />
        </div>

        {showMigration ? (
          <form onSubmit={migrate} className="space-y-4">
            <p className="border-l-2 border-accent bg-secondary/50 p-3 font-sans text-xs leading-relaxed text-muted-foreground">Para mapanatili ang dati mong account at progreso, gamitin ang dating detalye nang isang beses at pumili ng bagong username.</p>
            <label className={label}>Dating buong pangalan<input value={legacy.fullName} onChange={(e) => setLegacy({ ...legacy, fullName: e.target.value })} autoComplete="name" maxLength={80} className={field} /></label>
            <label className={label}>Dating class code<input value={legacy.classCode} onChange={(e) => setLegacy({ ...legacy, classCode: e.target.value })} maxLength={20} className={field} /></label>
            <label className={label}>Bagong username<input value={legacy.username} onChange={(e) => setLegacy({ ...legacy, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20) })} autoCapitalize="none" autoComplete="username" minLength={3} maxLength={20} className={field} /></label>
            <label className={label}>Dating PIN<input value={legacy.pin} onChange={(e) => setLegacy({ ...legacy, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })} type="password" inputMode="numeric" autoComplete="current-password" className={field} /></label>
            {error && <p role="alert" className="font-sans text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={busy} className="min-h-12 w-full">{busy && <Loader2 className="animate-spin" />} Ilipat at buksan ang account</Button>
            <button type="button" onClick={() => { setShowMigration(false); setError(""); }} className="flex min-h-10 w-full items-center justify-center gap-2 font-sans text-sm text-primary"><ArrowLeft className="h-4 w-4" /> Bumalik sa login</button>
          </form>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" ? (
              <>
                <label className={label}>Buong pangalan<input value={f.fullName} onChange={(e) => setF({ ...f, fullName: e.target.value })} autoComplete="name" maxLength={80} className={field} /></label>
                <label className={label}>Username<input value={f.username} onChange={(e) => setF({ ...f, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20) })} placeholder="hal. juan123" autoCapitalize="none" autoComplete="username" minLength={3} maxLength={20} className={field} /></label>
                <label className={label}>Class code mula sa guro<input value={f.classCode} onChange={(e) => setF({ ...f, classCode: e.target.value })} placeholder="hal. 11STEM-A" maxLength={20} className={field} /></label>
                <label className={label}>Baitang at seksiyon (opsyonal)<input value={f.section} onChange={(e) => setF({ ...f, section: e.target.value })} placeholder="hal. 11 - STEM" maxLength={40} className={field} /></label>
              </>
            ) : (
              <label className={label}>Username<input value={f.username} onChange={(e) => setF({ ...f, username: e.target.value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20) })} placeholder="Ilagay ang username" autoCapitalize="none" autoComplete="username" minLength={3} maxLength={20} className={field} /></label>
            )}
            <label className={label}><span className="flex items-center gap-2"><KeyRound className="h-4 w-4" /> PIN (4–6 na numero)</span><input value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })} type="password" inputMode="numeric" autoComplete={mode === "login" ? "current-password" : "new-password"} className={field} /></label>
            {error && <p role="alert" className="font-sans text-sm text-destructive">{error}</p>}
            {notice && <p role="status" className="font-sans text-sm text-primary">{notice}</p>}
            <Button type="submit" disabled={busy} className="min-h-12 w-full">{busy ? <Loader2 className="animate-spin" /> : <ShieldCheck className="h-4 w-4" />}{mode === "login" ? "Mag-login" : "Gumawa ng account"}</Button>
            {mode === "login" && <button type="button" onClick={() => { setShowMigration(true); setError(""); }} className="min-h-10 w-full font-sans text-sm text-primary underline-offset-4 hover:underline">May dati ka nang account? Ilipat ito rito.</button>}
            <p className="text-center font-sans text-xs text-muted-foreground">Nakalimutan ang PIN? Lumapit sa iyong guro.</p>
          </form>
        )}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 text-center font-sans text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4" /> Ligtas ang iyong account at progreso.</div>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center font-sans text-sm text-primary">← Bumalik sa Tahanan</Link>
    </div>
  );
}
