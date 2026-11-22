import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student";
import { AvatarPicker } from "@/components/AvatarPicker";

export const Route = createFileRoute("/_authenticated/settings")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Mga Setting — HISTORIA" }, { name: "description", content: "Baguhin ang profile at avatar ng mag-aaral." },
    { property: "og:title", content: "Mga Setting — HISTORIA" }, { property: "og:description", content: "Mga setting ng account sa HISTORIA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { profile, updateProfile, signOut, ready } = useStudent();
  const navigate = useNavigate();
  const [f, setF] = useState({ full_name: "", age: "", gender: "", section: "", avatar: "" });
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (profile) setF({ full_name: profile.full_name, age: profile.age ? String(profile.age) : "", gender: profile.gender, section: profile.section, avatar: profile.avatar }); }, [profile]);
  if (!ready) return <p className="mx-auto max-w-3xl px-4 py-12 font-sans text-muted-foreground" role="status">Kinukuha…</p>;
  const field = "mt-1 min-h-12 w-full border border-border bg-background px-3 font-sans text-base";
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const age = f.age ? Number(f.age) : null;
    if (!f.full_name.trim()) { toast.error("Ilagay ang buong pangalan."); return; }
    if (age !== null && (age < 10 || age > 30)) { toast.error("Ilagay ang tamang edad (10–30)."); return; }
    setBusy(true);
    const err = await updateProfile({ full_name: f.full_name.trim().slice(0, 80), age, gender: f.gender, section: f.section.trim().slice(0, 40), avatar: f.avatar });
    setBusy(false);
    if (err) toast.error(err); else toast.success("Nai-save ang iyong profile!");
  };
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">⚙️ Mga Setting</p>
      <h1 className="mt-2 text-4xl">Aking account</h1>
      <form onSubmit={save} className="mt-6 space-y-6">
        <section className="dash-card">
          <h2 className="text-2xl">Pumili ng avatar</h2>
          <p className="mt-1 text-sm text-muted-foreground">Malaya kang pumili ng kahit anong tauhan.</p>
          <div className="mt-4"><AvatarPicker value={f.avatar} onChange={(avatar) => setF({ ...f, avatar })} /></div>
        </section>
        <section className="dash-card grid gap-4 sm:grid-cols-2">
          <label className="font-sans text-sm sm:col-span-2">Buong pangalan<input value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} maxLength={80} className={field} /></label>
          <label className="font-sans text-sm">Edad<input inputMode="numeric" value={f.age} onChange={(e) => setF({ ...f, age: e.target.value.replace(/\D/g, "").slice(0, 2) })} className={field} /></label>
          <label className="font-sans text-sm">Kasarian<select value={f.gender} onChange={(e) => setF({ ...f, gender: e.target.value })} className={field}><option value="">Pumili</option><option>Lalaki</option><option>Babae</option><option>Mas gustong hindi sabihin</option></select></label>
          <label className="font-sans text-sm sm:col-span-2">Baitang at seksiyon<input value={f.section} onChange={(e) => setF({ ...f, section: e.target.value })} maxLength={40} className={field} /></label>
          <p className="font-sans text-xs text-muted-foreground sm:col-span-2">Paalala: ang pag-log in ay gumagamit pa rin ng pangalang inilagay mo noong ginawa ang account.</p>
        </section>
        <Button type="submit" disabled={busy} className="min-h-12">{busy && <Loader2 className="animate-spin" />}I-save</Button>
      </form>
      <Button variant="outline" className="mt-8 min-h-12" onClick={async () => { await signOut(); navigate({ to: "/", replace: true }); }}><LogOut />Mag-log out</Button>
    </div>
  );
}
