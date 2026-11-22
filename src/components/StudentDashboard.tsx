import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ClipboardList, Gamepad2, Landmark, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student";
import { lessons, terms } from "@/lib/historia-data";
import { avatarSrc } from "@/lib/avatars";
import { overallPercent } from "@/lib/progress";
import { allBadges, continueLesson, formatDate, quizzesDone } from "@/lib/achievements";
import { AvatarImg } from "@/components/AvatarPicker";

export function StudentDashboard() {
  const { profile, progress, activity, rewards, ready } = useStudent();
  if (!ready) return <div className="mx-auto max-w-6xl px-5 py-16 font-sans text-muted-foreground" role="status">Kinukuha ang iyong talaan…</div>;
  const name = profile?.full_name || "Mag-aaral";
  const first = name.split(" ")[0] ?? name;
  const next = continueLesson(progress);
  const recent = lessons.find((l) => l.id === progress.lastLesson);
  const pct = overallPercent(progress);
  const badges = allBadges(rewards).filter((b) => b.earned);
  return (
    <div className="home-page mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-8">
      <section className="dash-card flex flex-wrap items-center gap-4">
        <AvatarImg src={avatarSrc(profile?.avatar)} size={72} />
        <div className="min-w-0 flex-1">
          <p className="eyebrow">Maligayang pagbabalik</p>
          <h1 className="truncate text-3xl sm:text-4xl">Maligayang pagbabalik, {first}!</h1>
          <p className="mt-1 font-sans text-sm text-muted-foreground">{name} · {profile?.age ? `${profile.age} taon · ` : ""}{profile?.gender || "—"} · {profile?.section || "Walang seksiyon"}</p>
        </div>
        <div className="dash-xp-summary flex items-center gap-2 border border-accent px-4 py-2"><Star className="dashboard-icon-motion h-5 w-5 fill-accent text-accent" /><span className="font-display text-3xl text-primary">{rewards.xp}</span><span className="font-sans text-xs text-muted-foreground">XP</span></div>
        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
          {!profile?.avatar && <Button asChild variant="outline"><Link to="/settings">Pumili ng avatar</Link></Button>}
          <Button asChild variant="outline"><Link to="/profile">Tingnan ang buong profile</Link></Button>
        </div>
      </section>


      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="dash-card">
          <p className="eyebrow">📜 Ituloy ang pag-aaral</p>
          {next ? (
            <>
              <h2 className="mt-2 text-2xl">{next.title}</h2>
              <p className="mt-1 font-sans text-sm text-muted-foreground">Termino {next.term} · Linggo {next.weeks}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed">{next.intro}</p>
              <Button asChild className="mt-4 min-h-12"><Link to="/lessons/$lessonId" params={{ lessonId: next.id }}>Ituloy ang Pag-aaral <ArrowRight /></Link></Button>
            </>
          ) : <p className="mt-2">Natapos mo na ang lahat ng {lessons.length} aralin! 🏆</p>}
          {recent && recent.id !== next?.id && <p className="mt-4 font-sans text-sm text-muted-foreground">Huling binuksan: <Link to="/lessons/$lessonId" params={{ lessonId: recent.id }} className="text-primary underline">{recent.title}</Link></p>}
          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border pt-4 font-sans text-sm sm:grid-cols-4">
            {[{ to: "/dashboard", l: "Mga Aralin", i: BookOpen }, { to: "/quiz", l: "Pagsusulit", i: ClipboardList }, { to: "/games", l: "Mga Laro", i: Gamepad2 }, { to: "/timeline", l: "Talaang-Panahon", i: Landmark }].map(({ to, l, i: I }) => (
              <Link key={to} to={to} className="flex min-h-11 items-center gap-2 border border-border px-3 hover:border-primary"><I className="dashboard-icon-motion h-4 w-4 text-primary" />{l}</Link>
            ))}
          </div>
        </section>

        <section className="dash-card">
          <p className="eyebrow">Pag-unlad sa pag-aaral</p>
          <p className="mt-2 font-display text-5xl text-primary">{pct}%</p>
          <div className="dash-bar mt-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Kabuuang pag-unlad"><span style={{ width: `${pct}%` }} /></div>
          <dl className="mt-4 grid grid-cols-2 gap-3 font-sans text-sm">
            <div><dt className="text-muted-foreground">Natapos na aralin</dt><dd className="font-display text-2xl text-ink">{progress.completed.length}/{lessons.length}</dd></div>
            <div><dt className="text-muted-foreground">Natapos na pagsusulit</dt><dd className="font-display text-2xl text-ink">{quizzesDone(progress)}/{terms.length}</dd></div>
          </dl>
          <ul className="mt-3 space-y-1 font-sans text-sm">
            {terms.map((t) => <li key={t.id} className="flex justify-between border-t border-border pt-1"><span>Termino {t.id}</span><span className="text-muted-foreground">{progress.scores[t.id] ? `Pinakamataas ${progress.scores[t.id]!.best}/10` : "Wala pang iskor"}</span></li>)}
          </ul>
          <Link to="/progress" className="mt-3 inline-flex min-h-11 items-center font-sans text-sm text-primary underline">Buong talaan ng pag-unlad</Link>
        </section>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <section className="dash-card min-w-0 overflow-hidden">
          <p className="eyebrow">Mga kamakailang gawain</p>
          {activity.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Wala pang gawain. Tapusin ang isang aralin o pagsusulit para magsimula!</p> : (
            <ul className="mt-2 max-h-64 min-w-0 max-w-full overflow-y-auto overscroll-contain divide-y divide-border pr-1">
              {activity.slice(0, 6).map((a) => (
                <li key={a.id} className="flex min-w-0 items-center justify-between gap-3 py-2 text-sm">
                  <span className="min-w-0 flex-1 overflow-hidden"><span className="block truncate">{a.label}{a.score != null ? ` — ${a.score}/10` : ""}</span><span className="font-sans text-xs text-muted-foreground">{formatDate(a.created_at)}</span></span>
                  {a.points > 0 && <span className="shrink-0 font-sans text-sm font-semibold text-gold-deep">+{a.points} XP</span>}
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="dash-card min-w-0 overflow-hidden">
          <p className="eyebrow">🏆 Mga tsapa</p>
          {badges.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">Wala pang tsapa. Ang unang aralin ay magbubukas ng "Unang Hakbang".</p> : (
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">{badges.map((b) => <li key={b.id} className="flex items-center gap-2 text-sm"><Award className="h-5 w-5 shrink-0 text-accent" />{b.title}</li>)}</ul>
          )}
          <Link to="/achievements" className="mt-3 inline-flex min-h-11 items-center font-sans text-sm text-primary underline">Lahat ng gantimpala</Link>
        </section>
      </div>
    </div>
  );
}
