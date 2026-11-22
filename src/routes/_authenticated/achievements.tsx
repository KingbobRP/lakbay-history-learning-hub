import { createFileRoute } from "@tanstack/react-router";
import { Award, Lock, Star } from "lucide-react";
import { useStudent } from "@/lib/student";
import { XP_RULES } from "@/lib/rewards";
import { allBadges, formatDate, pointEvents } from "@/lib/achievements";

export const Route = createFileRoute("/_authenticated/achievements")({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: "Mga Gantimpala — HISTORIA" }, { name: "description", content: "Mga puntos, tsapa, at kasaysayan ng gantimpala ng mag-aaral." },
    { property: "og:title", content: "Mga Gantimpala — HISTORIA" }, { property: "og:description", content: "Mga gantimpala sa HISTORIA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
  component: Achievements,
});

function Achievements() {
  const { rewards, activity, ready } = useStudent();
  if (!ready) return <p className="mx-auto max-w-4xl px-4 py-12 font-sans text-muted-foreground" role="status">Kinukuha…</p>;
  const events = pointEvents(activity);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="eyebrow">🏆 Gantimpala</p>
      <h1 className="mt-2 text-4xl">Mga Gantimpala at Nakamit</h1>
      <div className="dash-card mt-6 flex items-center gap-4"><Star className="h-8 w-8 fill-accent text-accent" /><div><p className="font-display text-5xl text-primary">{rewards.xp} XP</p><p className="font-sans text-sm text-muted-foreground">+{XP_RULES.lesson} bawat aralin · +{XP_RULES.term} bawat kabisadong termino · +{XP_RULES.quiz} unang pagsusulit · +{XP_RULES.perfect} perpektong iskor. Isang beses lang bawat gawain.</p></div></div>
      <h2 className="mt-8 text-2xl">Mga tsapa</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {allBadges(rewards).map((b) => <li key={b.id} className={`dash-card flex items-center gap-3 ${b.earned ? "" : "opacity-55"}`}>{b.earned ? <Award className="h-7 w-7 text-accent" /> : <Lock className="h-5 w-5 text-muted-foreground" />}<span><span className="block font-semibold">{b.title}</span><span className="block text-sm text-muted-foreground">{b.desc}</span></span></li>)}
      </ul>
      <h2 className="mt-8 text-2xl">Kasaysayan ng puntos</h2>
      {events.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Wala pang nakuhang puntos.</p> : (
        <ul className="mt-2 divide-y divide-border border-y border-border">{events.map((a) => <li key={a.id} className="flex justify-between gap-3 py-2 text-sm"><span>{a.label}<span className="block font-sans text-xs text-muted-foreground">{formatDate(a.created_at)}</span></span><span className="font-sans font-semibold text-gold-deep">+{a.points} XP</span></li>)}</ul>
      )}
    </div>
  );
}
