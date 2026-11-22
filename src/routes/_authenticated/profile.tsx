import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student";
import { lessons, terms } from "@/lib/historia-data";
import { avatarSrc } from "@/lib/avatars";
import { overallPercent } from "@/lib/progress";
import { allBadges, formatDate } from "@/lib/achievements";
import { AvatarImg } from "@/components/AvatarPicker";

export const Route = createFileRoute("/_authenticated/profile")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Aking Profile — HISTORIA" }, { name: "description", content: "Buong profile at talaan ng pag-aaral ng mag-aaral." },
    { property: "og:title", content: "Aking Profile — HISTORIA" }, { property: "og:description", content: "Profile ng mag-aaral sa HISTORIA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, progress, activity, rewards, ready } = useStudent();
  if (!ready) return <p className="mx-auto max-w-4xl px-4 py-12 font-sans text-muted-foreground" role="status">Kinukuha ang iyong talaan…</p>;
  const pct = overallPercent(progress);
  const quizRows = activity.filter((a) => a.kind === "quiz");
  const lessonRows = activity.filter((a) => a.kind === "lesson");
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link to="/" className="inline-flex min-h-11 items-center font-sans text-sm text-muted-foreground hover:text-primary">← Tahanan</Link>
      <section className="dash-card mt-2 flex flex-wrap items-center gap-5">
        <AvatarImg src={avatarSrc(profile?.avatar)} size={110} />
        <div className="min-w-0 flex-1">
          <p className="eyebrow">Profile ng mag-aaral</p>
          <h1 className="mt-1 text-4xl">{profile?.full_name}</h1>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 font-sans text-sm sm:grid-cols-4">
            {[["Edad", profile?.age ?? "—"], ["Kasarian", profile?.gender || "—"], ["Seksiyon", profile?.section || "—"], ["Class code", profile?.class_code || "—"]].map(([k, v]) => <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold text-ink">{v}</dd></div>)}
          </dl>
        </div>
        <div className="text-center"><Star className="mx-auto h-6 w-6 fill-accent text-accent" /><p className="font-display text-4xl text-primary">{rewards.xp}</p><p className="font-sans text-xs text-muted-foreground">kabuuang XP</p></div>
        <Button asChild variant="outline" className="w-full sm:w-auto"><Link to="/settings">Baguhin ang profile</Link></Button>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">Pag-unlad: {pct}%</h2>
        <div className="dash-bar mt-2"><span style={{ width: `${pct}%` }} /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {terms.map((t) => {
            const ids = lessons.filter((l) => l.term === t.id).map((l) => l.id);
            const done = ids.filter((id) => progress.completed.includes(id)).length;
            return <div key={t.id} className="dash-card"><p className="eyebrow">Termino {t.id}</p><p className="mt-1 font-sans text-sm">{done}/{ids.length} aralin · {progress.scores[t.id] ? `iskor ${progress.scores[t.id]!.best}/10` : "wala pang iskor"}</p><div className="dash-bar mt-2"><span style={{ width: `${(done / ids.length) * 100}%` }} /></div></div>;
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl">🏆 Mga nakamit</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {allBadges(rewards).map((b) => <li key={b.id} className={`flex items-center gap-3 ${b.earned ? "" : "opacity-50"}`}>{b.earned ? <Award className="h-5 w-5 text-accent" /> : <Lock className="h-4 w-4 text-muted-foreground" />}<span><span className="block text-sm font-semibold">{b.title}</span><span className="block text-xs text-muted-foreground">{b.desc}</span></span></li>)}
        </ul>
      </section>

      <History title="Talaan ng natapos na aralin" rows={lessonRows} empty="Wala pang natapos na aralin." />
      <History title="Mga iskor sa pagsusulit" rows={quizRows} empty="Wala pang nasagutang pagsusulit." />
      <History title="Kasaysayan ng gawain at puntos" rows={activity} empty="Wala pang gawain." />
    </div>
  );
}

function History({ title, rows, empty }: { title: string; rows: ReturnType<typeof useStudent>["activity"]; empty: string }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl">{title}</h2>
      {rows.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">{empty}</p> : (
        <ul className="mt-2 divide-y divide-border border-y border-border">
          {rows.map((a) => <li key={a.id} className="flex justify-between gap-3 py-2 text-sm"><span className="min-w-0">{a.label}{a.score != null ? ` — ${a.score}/10` : ""}<span className="block font-sans text-xs text-muted-foreground">{formatDate(a.created_at)}</span></span>{a.points > 0 && <span className="shrink-0 font-sans font-semibold text-gold-deep">+{a.points} XP</span>}</li>)}
        </ul>
      )}
    </section>
  );
}
