import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { lessons, terms } from "@/lib/historia-data";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search Lessons — Historia" },
      { name: "description", content: "Search lessons by title, topic or keyword." },
      { property: "og:title", content: "Search Lessons — Historia" },
      { property: "og:description", content: "Find any Historia lesson quickly." },
    ],
  }),
  component: SearchPage,
});

export function searchLessons(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return lessons.filter((l) => [l.title, l.english, l.topic, l.summary, ...l.keywords, ...l.sections.map((x) => x.heading + " " + x.body)].join(" ").toLowerCase().includes(s));
}

function SearchPage() {
  const [q, setQ] = useState("");
  const results = searchLessons(q);
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Paghahanap</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Search Lessons</h1>
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “Rizal”, “barangay”, “1898”…" aria-label="Search lessons" className="mt-8 min-h-12 w-full border border-ink bg-card px-4 font-sans text-base outline-none focus:ring-2 focus:ring-ring" />
      {q && <p className="mt-3 font-sans text-sm text-muted-foreground">{results.length} result(s)</p>}
      {terms.map((t) => {
        const r = results.filter((l) => l.term === t.id);
        if (!r.length) return null;
        return (
          <section key={t.id} className="mt-8">
            <h2 className="border-b border-ink pb-2 text-xl text-ink">Term {t.id} · {t.title}</h2>
            {r.sort((a, b) => a.week - b.week).map((l) => (
              <Link key={l.id} to="/lessons/$lessonId" params={{ lessonId: l.id }} className="block border-b border-border py-4 hover:bg-card">
                <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Week {l.week} · {l.topic}</span>
                <span className="block font-display text-lg text-ink">{l.title}</span>
                <span className="block text-sm text-muted-foreground">{l.summary}</span>
              </Link>
            ))}
          </section>
        );
      })}
    </div>
  );
}
