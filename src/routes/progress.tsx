import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons, terms } from "@/lib/historia-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/progress")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Pag-unlad ng Mag-aaral — HISTORIA" },
      { name: "description", content: "Subaybayan ang mga natapos na aralin at iskor sa pagsusulit." },
      { property: "og:title", content: "Pag-unlad ng Mag-aaral — HISTORIA" },
      { property: "og:description", content: "Ang iyong talaan ng pag-aaral sa HISTORIA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { progress, percent, reset } = useProgress();
  const quizAvg = Object.values(progress.scores).length ? Math.round((Object.values(progress.scores).reduce((n, s) => n + s.best, 0) / (terms.length * 10)) * 100) : 0;
  const overall = Math.round(percent * 0.6 + quizAvg * 0.4);
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Talaan ng Pag-unlad</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Pag-unlad ng Mag-aaral</h1>
      <p className="mt-3 text-muted-foreground">Awtomatikong naitatala sa kagamitang ito.</p>
      <div className="mt-8 grid grid-cols-3 border border-border bg-card text-center">
        {[["Aralin", `${percent}%`], ["Pagsusulit", `${quizAvg}%`], ["Kabuuan", `${overall}%`]].map(([k, v]) => (
          <div key={k} className="border-r border-border p-4 last:border-r-0"><p className="eyebrow">{k}</p><p className="mt-1 font-display text-3xl text-ink">{v}</p></div>
        ))}
      </div>
      <p className="mt-2 font-sans text-xs text-muted-foreground">Kabuuan = 60% natapos na aralin + 40% pinakamataas na iskor sa pagsusulit.</p>
      {terms.map((t) => {
        const s = progress.scores[t.id];
        return (
          <section key={t.id} className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink pb-2">
              <h2 className="text-2xl text-ink">Termino {t.id}: {t.title}</h2>
              <span className="font-sans text-sm text-muted-foreground">{s ? `Pinakamataas ${s.best}/10 · huli ${s.last}/10 · ${s.attempts} pagsubok` : "Hindi pa nasasagutan ang pagsusulit"}</span>
            </div>
            <ul className="mt-2">
              {lessons.filter((l) => l.term === t.id).map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 border-b border-border py-3">
                  <Link to="/lessons/$lessonId" params={{ lessonId: l.id }} className="text-ink hover:text-primary">Linggo {l.weeks} · {l.title}</Link>
                  <span className={`shrink-0 font-sans text-xs ${progress.completed.includes(l.id) ? "text-success" : "text-muted-foreground"}`}>{progress.completed.includes(l.id) ? "Tapos na" : "Hindi pa tapos"}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <button onClick={() => { if (confirm("Burahin ang lahat ng pag-unlad?")) reset(); }} className="mt-10 min-h-11 border border-destructive px-4 font-sans text-sm text-destructive">Burahin ang pag-unlad</button>
    </div>
  );
}
