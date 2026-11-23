import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { lessons, terms, timeline } from "@/lib/historia-data";
import { gameCatalog } from "@/lib/history-games";

export const Route = createFileRoute("/search")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Maghanap sa HISTORIA" },
      { name: "description", content: "Maghanap sa mga aralin, pangyayaring pangkasaysayan, at larong pang-edukasyon ng HISTORIA." },
      { property: "og:title", content: "Maghanap sa HISTORIA" },
      { property: "og:description", content: "Mabilis na tuklasin ang mga aralin, pangyayari, at laro ng HISTORIA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

type SearchType = "Lahat" | "Aralin" | "Pangyayari" | "Laro";

export function searchLessons(q: string) {
  const s = q.trim().toLocaleLowerCase("fil-PH");
  if (!s) return [];
  return lessons.filter((l) => [l.title, l.topic, l.competency, l.summary, ...l.keywords, ...l.keyTerms.map((k) => k.term), ...l.sections.map((x) => x.heading + " " + x.body)].join(" ").toLocaleLowerCase("fil-PH").includes(s));
}

function SearchPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<SearchType>("Lahat");
  const query = q.trim().toLocaleLowerCase("fil-PH");
  const lessonResults = useMemo(() => searchLessons(q), [q]);
  const eventResults = useMemo(() => timeline.filter((event) => [event.year, event.title, event.text, event.caption ?? ""].join(" ").toLocaleLowerCase("fil-PH").includes(query) && query.length > 0), [query]);
  const gameResults = useMemo(() => gameCatalog.filter((game) => [game.title, game.category, game.description, game.instructions].join(" ").toLocaleLowerCase("fil-PH").includes(query) && query.length > 0), [query]);
  const total = lessonResults.length + eventResults.length + gameResults.length;
  const showLessons = type === "Lahat" || type === "Aralin";
  const showEvents = type === "Lahat" || type === "Pangyayari";
  const showGames = type === "Lahat" || type === "Laro";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Paghahanap</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Tuklasin ang HISTORIA</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Maghanap sa mga aralin, talaang-pangkasaysayan, at larong makatutulong sa iyong pag-aaral.</p>
      <label htmlFor="historia-search" className="mt-8 block font-sans text-sm font-semibold text-ink">Ano ang nais mong tuklasin?</label>
      <input id="historia-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Hal. “Rizal”, “babaylan”, “Mactan”, “Katipunan”…" aria-label="Maghanap sa HISTORIA" className="mt-2 min-h-12 w-full border border-primary bg-card px-4 font-sans text-base outline-none focus:ring-2 focus:ring-ring" />
      <div className="mt-4 flex flex-wrap gap-2" aria-label="Uri ng resulta">
        {(["Lahat", "Aralin", "Pangyayari", "Laro"] as SearchType[]).map((item) => <button key={item} type="button" onClick={() => setType(item)} aria-pressed={type === item} className={`min-h-10 border px-3 font-sans text-sm ${type === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-ink hover:border-primary"}`}>{item}</button>)}
      </div>
      {q.trim() ? (
        <p className="mt-4 font-sans text-sm text-muted-foreground" role="status">{total} resulta para sa “{q.trim()}”.</p>
      ) : (
        <div className="mt-8 border border-border bg-card p-5"><p className="font-semibold text-ink">Mga mungkahing paksa</p><div className="mt-3 flex flex-wrap gap-2">{["Jose Rizal", "Katipunan", "Mactan", "Batas Militar", "Kamalayang pangkasaysayan"].map((term) => <button key={term} type="button" onClick={() => setQ(term)} className="border border-border px-3 py-2 font-sans text-sm text-primary hover:border-primary">{term}</button>)}</div></div>
      )}

      {showLessons && lessonResults.length > 0 && (
        <section className="mt-8">
          <h2 className="border-b border-ink pb-2 text-xl text-ink">Mga Aralin ({lessonResults.length})</h2>
          {terms.map((term) => {
            const results = lessonResults.filter((lesson) => lesson.term === term.id).sort((a, b) => a.week - b.week);
            if (!results.length) return null;
            return <div key={term.id} className="mt-4"><h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">Termino {term.id} · {term.title}</h3>{results.map((lesson) => <Link key={lesson.id} to="/lessons/$lessonId" params={{ lessonId: lesson.id }} className="block border-b border-border py-4 hover:bg-card"><span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Linggo {lesson.weeks} · {lesson.topic}</span><span className="block font-display text-lg text-ink">{lesson.title}</span><span className="block text-sm text-muted-foreground">{lesson.summary}</span></Link>)}</div>;
          })}
        </section>
      )}

      {showEvents && eventResults.length > 0 && (
        <section className="mt-8">
          <h2 className="border-b border-ink pb-2 text-xl text-ink">Mga Pangyayaring Pangkasaysayan ({eventResults.length})</h2>
          {eventResults.map((event) => <Link key={event.year + event.title} to="/timeline" className="block border-b border-border py-4 hover:bg-card"><span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{event.year}</span><span className="block font-display text-lg text-ink">{event.title}</span><span className="block text-sm text-muted-foreground">{event.text}</span></Link>)}
        </section>
      )}

      {showGames && gameResults.length > 0 && (
        <section className="mt-8">
          <h2 className="border-b border-ink pb-2 text-xl text-ink">Mga Laro ({gameResults.length})</h2>
          {gameResults.map((game) => <Link key={game.id} to="/games/$gameId" params={{ gameId: game.id }} className="block border-b border-border py-4 hover:bg-card"><span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{game.category}</span><span className="block font-display text-lg text-ink">{game.title}</span><span className="block text-sm text-muted-foreground">{game.description}</span></Link>)}
        </section>
      )}

      {q.trim() && total === 0 && <p className="mt-8 border border-border bg-card p-6 text-center text-muted-foreground">Walang nahanap. Subukan ang ibang salita o piliin ang ibang uri ng resulta.</p>}
      {q.trim() && total > 0 && ((type === "Aralin" && lessonResults.length === 0) || (type === "Pangyayari" && eventResults.length === 0) || (type === "Laro" && gameResults.length === 0)) && <p className="mt-8 border border-border bg-card p-6 text-center text-muted-foreground">Walang tugmang resulta sa napiling kategorya.</p>}
    </div>
  );
}
