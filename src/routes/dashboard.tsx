import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { lessons, terms } from "@/lib/historia-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Learning Dashboard — HISTORIA" },
      { name: "description", content: "Lingguhang aralin sa tatlong termino, may tala ng natapos at hindi pa natatapos." },
      { property: "og:title", content: "Learning Dashboard — HISTORIA" },
      { property: "og:description", content: "Subaybayan ang iyong pag-aaral sa Baitang 11 Kasaysayan at Lipunang Pilipino." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Learning Dashboard</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Ang Iyong Pag-aaral</h1>

      <div className="mt-8 grid gap-6 border border-border bg-card p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-sans text-sm text-muted-foreground">Learning progress</p>
          <p className="mt-1 font-display text-3xl text-ink">{progress.completed.length} sa {lessons.length} aralin ang natapos</p>
          <div className="mt-4 h-1.5 w-full bg-muted" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Learning progress"><div className="h-1.5 bg-primary" style={{ width: `${percent}%` }} /></div>
          <p className="mt-1 font-sans text-xs text-muted-foreground">{percent}%</p>
        </div>
        {next ? (
          <Link to="/lessons/$lessonId" params={{ lessonId: next.id }} className="inline-flex min-h-12 items-center justify-center bg-primary px-6 font-sans text-sm font-semibold text-primary-foreground">Ituloy: Termino {next.term}, Linggo {next.weeks}</Link>
        ) : <p className="font-sans text-sm text-success">Natapos mo na ang lahat ng aralin!</p>}
      </div>

      <div className="mt-10 grid grid-cols-3 border-b border-border font-sans" role="tablist" aria-label="Mga termino">
        {terms.map((x) => {
          const total = lessons.filter((l) => l.term === x.id).length;
          const done = lessons.filter((l) => l.term === x.id && progress.completed.includes(l.id)).length;
          return (
            <button key={x.id} role="tab" aria-selected={term === x.id} onClick={() => setTerm(x.id)} className={`min-h-16 border-b-2 px-2 py-3 text-left ${term === x.id ? "border-accent text-ink" : "border-transparent text-muted-foreground"}`}>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.15em]">Termino {x.id}</span>
              <span className="hidden text-sm sm:block">{x.title}</span>
              <span className="block text-xs text-muted-foreground">{done}/{total} tapos</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.5fr]">
        <div>
          <img src={t.image} alt={t.title} loading="lazy" width={1600} height={1008} className="photo aspect-[4/3] w-full object-cover" />
          <p className="eyebrow mt-5">{t.name} · {t.weeks} linggo</p>
          <h2 className="mt-2 text-3xl">{t.title}</h2>
          <p className="mt-3 text-muted-foreground">{t.blurb}</p>
        </div>
        <ol className="divide-y divide-border border-y border-border">
          {list.map((l) => {
            const done = progress.completed.includes(l.id);
            return (
              <li key={l.id}>
                <Link to="/lessons/$lessonId" params={{ lessonId: l.id }} className="flex items-start gap-4 px-1 py-5 hover:bg-card">
                  <span className="w-20 shrink-0 pt-1 font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">Linggo {l.weeks}</span>
                  <span className="flex-1">
                    <span className="block font-display text-xl text-ink">{l.title}</span>
                    <span className="mt-1 block font-sans text-sm text-muted-foreground">{l.topic}</span>
                  </span>
                  {done ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-label="Tapos na" /> : <Circle className="h-5 w-5 shrink-0 text-border" aria-label="Hindi pa tapos" />}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
