import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, Gamepad2, Lock, Medal, Settings2, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student";
import { lessons, terms } from "@/lib/historia-data";
import { avatarSrc } from "@/lib/avatars";
import { overallPercent } from "@/lib/progress";
import { allBadges, formatDate } from "@/lib/achievements";
import { adventureRewards, totalStars } from "@/lib/adventure";
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
  if (!ready) return <p className="mx-auto max-w-5xl px-4 py-12 font-sans text-muted-foreground" role="status">Kinukuha ang iyong talaan…</p>;
  const pct = overallPercent(progress);
  const quizRows = activity.filter((a) => a.kind === "quiz");
  const lessonRows = activity.filter((a) => a.kind === "lesson");
  const level = Math.floor(rewards.xp / 100) + 1;
  const xpIntoLevel = rewards.xp % 100;
  const gameRuns = Object.values(progress.adventure.results).reduce((n, result) => n + Object.keys(result).length, 0);
  const stars = totalStars(progress.adventure);
  const gameRewards = adventureRewards(progress.adventure, progress.completed);
  const earnedBadges = allBadges(rewards).filter((b) => b.earned);
  const earnedGameRewards = gameRewards.filter((b) => b.earned);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><p className="eyebrow">Personal na talaan</p><h1 className="mt-2 text-4xl sm:text-5xl">Aking Paglalakbay</h1></div>
        <Button asChild variant="outline" className="min-h-11"><Link to="/settings"><Settings2 className="mr-2 h-4 w-4" /> Ayusin ang profile</Link></Button>
      </div>

      <section className="relative overflow-hidden border border-primary/20 bg-primary p-5 text-primary-foreground sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border border-accent/25" />
        <div className="pointer-events-none absolute -right-2 -top-8 h-40 w-40 rounded-full border border-accent/20" />
        <div className="relative flex flex-wrap items-center gap-5">
          <div className="rounded-full border-2 border-accent p-1"><AvatarImg src={avatarSrc(profile?.avatar)} size={104} /></div>
          <div className="min-w-0 flex-1">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent">Mag-aaral ng kasaysayan</p>
            <h2 className="mt-1 text-3xl text-primary-foreground sm:text-4xl">{profile?.full_name || "Mag-aaral"}</h2>
            <p className="mt-2 font-sans text-sm text-primary-foreground/70">{profile?.section || "Walang seksiyon"}{profile?.class_code ? ` · ${profile.class_code}` : ""}</p>
            <div className="mt-4 flex flex-wrap gap-2"><span className="inline-flex items-center gap-2 border border-accent/50 px-3 py-1.5 font-sans text-sm"><Medal className="h-4 w-4 text-accent" /> Antas {level} · Historyador</span><span className="inline-flex items-center gap-2 border border-primary-foreground/20 px-3 py-1.5 font-sans text-sm"><Star className="h-4 w-4 fill-accent text-accent" /> {rewards.xp.toLocaleString()} EXP</span></div>
          </div>
        </div>
        <div className="relative mt-7 border-t border-primary-foreground/15 pt-5">
          <div className="flex items-center justify-between gap-3 font-sans text-sm"><span className="font-semibold">Pag-unlad sa susunod na antas</span><span className="text-primary-foreground/75 tabular-nums">{xpIntoLevel}/100 EXP</span></div>
          <div className="mt-2 h-2 overflow-hidden bg-primary-foreground/15" role="progressbar" aria-label="Pag-unlad sa susunod na antas" aria-valuenow={xpIntoLevel} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-accent transition-all" style={{ width: `${xpIntoLevel}%` }} /></div>
          <p className="mt-2 font-sans text-xs text-primary-foreground/65">{100 - xpIntoLevel} EXP pa bago ang Antas {level + 1}. Nakabatay ang EXP sa mga gantimpalang naitala sa iyong account.</p>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Mga sukatan ng pag-aaral">
        <Metric icon={<BookOpen />} label="Natapos na aralin" value={`${progress.completed.length}/${lessons.length}`} />
        <Metric icon={<Trophy />} label="Mga nakamit" value={String(earnedBadges.length + earnedGameRewards.length)} />
        <Metric icon={<Gamepad2 />} label="Mga natapos na laro" value={String(gameRuns)} />
        <Metric icon={<Star />} label="Mga bituin sa laro" value={String(stars)} />
      </section>

      <section className="mt-9">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="eyebrow">Pangkalahatang pag-unlad</p><h2 className="mt-1 text-2xl sm:text-3xl">Ang iyong pag-aaral</h2></div><span className="font-display text-4xl text-primary">{pct}%</span></div>
        <div className="mt-3 h-2 overflow-hidden bg-muted" role="progressbar" aria-label="Kabuuang pag-unlad sa pag-aaral" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {terms.map((t) => {
            const ids = lessons.filter((l) => l.term === t.id).map((l) => l.id);
            const done = ids.filter((id) => progress.completed.includes(id)).length;
            const score = progress.scores[t.id];
            return <div key={t.id} className="border border-border bg-card p-4">
              <p className="eyebrow">{t.name}</p><h3 className="mt-1 text-xl">{t.title}</h3>
              <p className="mt-3 font-sans text-sm text-muted-foreground">{done} sa {ids.length} aralin · {score ? `Pinakamataas na iskor: ${score.best}/10` : "Wala pang iskor"}</p>
              <div className="mt-2 h-1.5 bg-muted"><div className="h-full bg-accent" style={{ width: `${ids.length ? (done / ids.length) * 100 : 0}%` }} /></div>
            </div>;
          })}
        </div>
      </section>

      <section className="mt-9 grid gap-6 lg:grid-cols-2">
        <div className="border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-2"><Award className="h-5 w-5 text-gold-deep" /><h2 className="text-2xl">Mga tsapa</h2></div>
          <p className="mt-1 text-sm text-muted-foreground">Mga gantimpalang nakukuha sa makabuluhang pagkatuto.</p>
          <ul className="mt-4 space-y-3">
            {allBadges(rewards).map((b) => <li key={b.id} className={`flex items-start gap-3 ${b.earned ? "" : "opacity-55"}`}>{b.earned ? <Award className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> : <Lock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />}<span><span className="block font-sans text-sm font-semibold">{b.title}</span><span className="block text-xs text-muted-foreground">{b.desc}</span></span></li>)}
          </ul>
        </div>
        <div className="border border-border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-gold-deep" /><h2 className="text-2xl">Mga hamon sa laro</h2></div>
          <p className="mt-1 text-sm text-muted-foreground">Mga gantimpalang nakabatay sa pagganap sa mga larong pangkasaysayan.</p>
          <ul className="mt-4 space-y-3">
            {gameRewards.map((b) => <li key={b.id} className={`flex items-start gap-3 ${b.earned ? "" : "opacity-55"}`}>{b.earned ? <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> : <Lock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />}<span><span className="block font-sans text-sm font-semibold">{b.title}</span><span className="block text-xs text-muted-foreground">{b.desc}</span></span></li>)}
          </ul>
        </div>
      </section>

      <div className="mt-9 grid gap-6 lg:grid-cols-2">
        <History title="Talaan ng natapos na aralin" rows={lessonRows} empty="Wala pang natapos na aralin." />
        <History title="Mga iskor sa pagsusulit" rows={quizRows} empty="Wala pang nasagutang pagsusulit." />
      </div>
      <History title="Kasaysayan ng gawain at puntos" rows={activity} empty="Wala pang gawain." />
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="border border-border bg-card p-4"><div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="font-sans text-xs">{label}</span></div><p className="mt-2 font-display text-3xl text-primary">{value}</p></div>;
}

function History({ title, rows, empty }: { title: string; rows: ReturnType<typeof useStudent>["activity"]; empty: string }) {
  return (
    <section className="mt-8 min-w-0">
      <h2 className="text-2xl">{title}</h2>
      {rows.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">{empty}</p> : (
        <ul className="mt-2 divide-y divide-border border-y border-border">
          {rows.map((a) => <li key={a.id} className="flex min-w-0 justify-between gap-3 py-3 text-sm"><span className="min-w-0 flex-1 break-words">{a.label}{a.score != null ? ` — ${a.score}/10` : ""}<span className="block font-sans text-xs text-muted-foreground">{formatDate(a.created_at)}</span></span>{a.points > 0 && <span className="shrink-0 font-sans font-semibold text-gold-deep">+{a.points} XP</span>}</li>)}
        </ul>
      )}
    </section>
  );
}
