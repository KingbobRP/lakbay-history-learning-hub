import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { images, lessons, terms } from "@/lib/historia-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Historia — Grade 11 Learning Dashboard" },
      { name: "description", content: "Study Pag-aaral ng Kasaysayan at Lipunang Pilipino week by week across three terms." },
      { property: "og:title", content: "Historia — Grade 11 Learning Dashboard" },
      { property: "og:description", content: "Weekly lessons, timeline, and quizzes on Philippine history." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { progress, percent } = useProgress();
  const [term, setTerm] = useState(1);
  const t = terms.find((x) => x.id === term)!;
  const list = lessons.filter((l) => l.term === term);
  const next = lessons.find((l) => !progress.completed.includes(l.id));

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img src={images.intramuros} alt="Intramuros walls and church, archival-style photograph" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="eyebrow">Baitang 11 · Pag-aaral ng Kasaysayan at Lipunang Pilipino</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-ink sm:text-6xl">Ang nakaraan bilang <em className="text-primary">aral</em> at salamin ng bayan.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">Twelve weekly lessons across three terms — read, reflect, and test your understanding.</p>
          <div className="mt-8 flex flex-wrap gap-3 font-sans">
            {next && <Link to="/lessons/$lessonId" params={{ lessonId: next.id }} className="inline-flex min-h-11 items-center rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90">Continue: {next.english}</Link>}
            <Link to="/timeline" className="inline-flex min-h-11 items-center rounded-sm border border-ink px-5 text-sm font-medium text-ink hover:bg-card">Explore the timeline</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3 border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Learning progress</p>
            <p className="mt-1 font-display text-2xl text-ink">{progress.completed.length} of {lessons.length} lessons completed</p>
          </div>
          <div className="w-full sm:w-72">
            <div className="h-2 w-full bg-muted" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div className="h-2 bg-primary transition-all" style={{ width: `${percent}%` }} /></div>
            <p className="mt-1 text-right font-sans text-xs text-muted-foreground">{percent}%</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 border-b border-border font-sans" role="tablist">
          {terms.map((x) => {
            const done = lessons.filter((l) => l.term === x.id && progress.completed.includes(l.id)).length;
            return (
              <button key={x.id} role="tab" aria-selected={term === x.id} onClick={() => setTerm(x.id)} className={`min-h-14 border-b-2 px-2 py-3 text-left text-sm ${term === x.id ? "border-primary text-ink" : "border-transparent text-muted-foreground"}`}>
                <span className="block text-[0.65rem] uppercase tracking-[0.15em]">Term {x.id}</span>
                <span className="hidden sm:block">{x.name}</span>
                <span className="block text-xs text-muted-foreground">{done}/4 done</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <img src={t.image} alt={t.title} loading="lazy" width={1200} height={800} className="photo aspect-[4/3] w-full object-cover" />
            <p className="eyebrow mt-5">{t.period}</p>
            <h2 className="mt-2 text-3xl text-ink">{t.title}</h2>
            <p className="mt-3 text-muted-foreground">{t.blurb}</p>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {list.map((l) => {
              const done = progress.completed.includes(l.id);
              return (
                <li key={l.id}>
                  <Link to="/lessons/$lessonId" params={{ lessonId: l.id }} className="flex items-start gap-4 py-5 hover:bg-card">
                    <span className="w-14 shrink-0 font-sans text-xs uppercase tracking-widest text-muted-foreground">Week {l.week}</span>
                    <span className="flex-1">
                      <span className="block font-display text-xl text-ink">{l.title}</span>
                      <span className="block text-sm italic text-muted-foreground">{l.english}</span>
                    </span>
                    {done ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-label="Completed" /> : <Circle className="h-5 w-5 shrink-0 text-border" aria-label="Not yet completed" />}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
