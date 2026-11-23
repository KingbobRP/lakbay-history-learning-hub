import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, CalendarDays, Gamepad2, Search as SearchIcon } from "lucide-react";
import { lessons, terms, timeline } from "@/lib/historia-data";
import { gameCatalog } from "@/lib/history-games";
import { useStudent } from "@/lib/student";

export const Route = createFileRoute("/search")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === "string" ? search.q : "" }),
  head: () => ({
    meta: [
      { title: "Maghanap sa HISTORIA" },
      { name: "description", content: "Maghanap ng mga aralin, pangyayari sa kasaysayan, at larong pang-edukasyon." },
      { property: "og:title", content: "Maghanap sa HISTORIA" },
      { property: "og:description", content: "Isang paghahanap para sa mga aralin, timeline, at gawain." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

export function searchLessons(q: string) {
  const s = q.trim().toLocaleLowerCase("fil");
  if (!s) return [];
  return lessons.filter((l) => [l.title, l.topic, l.competency, l.summary, ...l.keywords, ...l.keyTerms.map((k) => k.term), ...l.sections.map((x) => x.heading + " " + x.body)].join(" ").toLocaleLowerCase("fil").includes(s));
}

function SearchPage() {
  const initial = Route.useSearch();
  const { session } = useStudent();
  const [q, setQ] = useState(initial.q ?? "");
  const [recent, setRecent] = useState<string[]>([]);
  const [category, setCategory] = useState<"all" | "lessons" | "events" | "games">("all");
  const recentKey = "historia-search-recent:" + (session?.user.id ?? "guest");
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem(recentKey) || "[]"); setRecent(Array.isArray(saved) ? saved.filter((v): v is string => typeof v === "string").slice(0, 6) : []); }
    catch { setRecent([]); }
  }, [recentKey]);
  const rememberSearch = (value: string) => {
    const term = value.trim();
    if (!term) return;
    setRecent((items) => {
      const next = [term, ...items.filter((item) => item.toLocaleLowerCase("fil") !== term.toLocaleLowerCase("fil")].slice(0, 5);
      try { localStorage.setItem(recentKey, JSON.stringify(next)); } catch { /* local history is optional */ }
      return next;
    });
  };
  const query = q.trim().toLocaleLowerCase("fil");
  const results = useMemo(() => {
    if (!query) return { lessons: [], events: [], games: [] };
    return {
      lessons: searchLessons(query),
      events: timeline.filter((e) => `${e.year} ${e.title} ${e.text}`.toLocaleLowerCase("fil").includes(query)),
      games: gameCatalog.filter((g) => `${g.title} ${g.category} ${g.description}`.toLocaleLowerCase("fil").includes(query)),
    };
  }, [query]);
  const showLessons = category === "all" || category === "lessons";
  const showEvents = category === "all" || category === "events";
  const showGames = category === "all" || category === "games";
  const total = (showLessons ? results.lessons.length : 0) + (showEvents ? results.events.length : 0) + (showGames ? results.games.length : 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-accent pb-7">
        <p className="eyebrow">HISTORIA · Aklatan ng kaalaman</p>
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Ano ang nais mong tuklasin?</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Maghanap sa mga aralin, mahahalagang pangyayari, at larong ginagamit sa pag-aaral ng kasaysayan.</p>
        <label className="relative mt-7 block">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") rememberSearch(q); }} type="search" placeholder="Hal. Rizal, Mactan, pagkamamamayan…" aria-label="Maghanap sa buong HISTORIA" className="min-h-14 w-full border border-primary bg-card pl-12 pr-4 font-sans text-base outline-none focus:ring-2 focus:ring-ring" />
        </label>
        {query && <p className="mt-3 font-sans text-sm text-muted-foreground" aria-live="polite">{total} resulta para sa “{q.trim()}”</p>}
      </header>

      {!query ? (
        <section className="mt-8">
          <h2 className="text-2xl">Magsimula sa mga paksa</h2>
          {recent.length > 0 && <div className="mt-4"><div className="mb-2 flex items-center justify-between"><h3 className="font-sans text-sm font-semibold">Kamakailang paghahanap</h3><button type="button" onClick={() => { setRecent([]); try { localStorage.removeItem(recentKey); } catch { /* optional */ } }} className="font-sans text-xs text-muted-foreground underline">Burahin</button></div><div className="flex flex-wrap gap-2">{recent.map((term) => <button key={term} type="button" onClick={() => setQ(term)} className="min-h-10 border border-border bg-card px-4 font-sans text-sm text-primary hover:bg-secondary">{term}</button>)}</div></div>}
          <h3 className="mt-6 font-sans text-sm font-semibold">Mga sikat na paksa</h3><div className="mt-2 flex flex-wrap gap-2">{["Jose Rizal", "Mactan", "Batas Militar", "babaylan", "pagkamamamayan", "kasarinlan"].map((term) => <button key={term} type="button" onClick={() => { setQ(term); rememberSearch(term); }} className="min-h-10 border border-border bg-card px-4 font-sans text-sm text-primary hover:bg-secondary">{term}</button>)}</div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Link to="/curriculum" className="border border-border bg-card p-5 hover:border-primary"><BookOpen className="h-6 w-6 text-primary" /><h3 className="mt-3 text-xl">Kurikulum</h3><p className="mt-1 text-sm text-muted-foreground">Tingnan ang mga aralin sa tatlong termino.</p></Link>
            <Link to="/timeline" className="border border-border bg-card p-5 hover:border-primary"><CalendarDays className="h-6 w-6 text-primary" /><h3 className="mt-3 text-xl">Talaang-panahon</h3><p className="mt-1 text-sm text-muted-foreground">Sundan ang mahahalagang pangyayari.</p></Link>
            <Link to="/games" className="border border-border bg-card p-5 hover:border-primary"><Gamepad2 className="h-6 w-6 text-primary" /><h3 className="mt-3 text-xl">Game Center</h3><p className="mt-1 text-sm text-muted-foreground">Subukan ang mga larong pangkasaysayan.</p></Link>
          </div>
        </section>
      ) : total === 0 ? (
        <div className="mt-10 border border-dashed border-border bg-card px-6 py-12 text-center">
          <SearchIcon className="mx-auto h-8 w-8 text-muted-foreground" />
          <h2 className="mt-3 text-xl">Walang nahanap na resulta</h2>
          <p className="mt-2 text-sm text-muted-foreground">Suriin ang baybay o gumamit ng mas pangkalahatang salita.</p>
          <button type="button" onClick={() => setQ("")} className="mt-4 min-h-11 bg-primary px-5 font-sans text-sm font-semibold text-primary-foreground">Burahin ang paghahanap</button>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {showLessons && results.lessons.length > 0 && <section>
            <div className="mb-3 flex items-center gap-2 border-b border-border pb-3"><BookOpen className="h-5 w-5 text-primary" /><h2 className="text-2xl">Mga aralin <span className="font-sans text-sm text-muted-foreground">({results.lessons.length})</span></h2></div>
            {terms.map((t) => {
              const rows = results.lessons.filter((l) => l.term === t.id).sort((a, b) => a.week - b.week);
              if (!rows.length) return null;
              return <div key={t.id} className="mb-5"><h3 className="mb-2 text-lg">{t.name} · {t.title}</h3><div className="divide-y divide-border border-y border-border">{rows.map((l) => <Link key={l.id} to="/lessons/$lessonId" params={{ lessonId: l.id }} className="group block px-3 py-4 hover:bg-card"><span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Linggo {l.weeks} · {l.topic}</span><span className="mt-1 flex items-center justify-between gap-3 font-display text-xl text-ink">{l.title}<ArrowUpRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span><span className="mt-1 block text-sm text-muted-foreground">{l.summary}</span></Link>)}</div></div>;
            })}
          </section>}
          {showEvents && results.events.length > 0 && <section><div className="mb-3 flex items-center gap-2 border-b border-border pb-3"><CalendarDays className="h-5 w-5 text-primary" /><h2 className="text-2xl">Mga pangyayari <span className="font-sans text-sm text-muted-foreground">({results.events.length})</span></h2></div><div className="divide-y divide-border border-y border-border">{results.events.map((e) => <div key={e.year + e.title} className="flex flex-wrap items-start justify-between gap-3 py-4"><div className="min-w-0 flex-1"><p className="font-display text-lg text-primary">{e.year}</p><h3 className="text-xl">{e.title}</h3><p className="mt-1 text-sm text-muted-foreground">{e.text}</p></div><div className="flex flex-wrap gap-2">{e.lesson && <Link to="/lessons/$lessonId" params={{ lessonId: e.lesson }} className="inline-flex min-h-10 items-center border border-border px-3 font-sans text-sm text-primary hover:bg-secondary">Aralin</Link>}<Link to="/timeline" className="inline-flex min-h-10 items-center gap-1 font-sans text-sm text-primary underline underline-offset-4">Timeline <ArrowUpRight className="h-3 w-3" /></Link></div></div>)}</div></section>}
          {showGames && results.games.length > 0 && <section><div className="mb-3 flex items-center gap-2 border-b border-border pb-3"><Gamepad2 className="h-5 w-5 text-primary" /><h2 className="text-2xl">Mga gawain at laro <span className="font-sans text-sm text-muted-foreground">({results.games.length})</span></h2></div><div className="grid gap-3 sm:grid-cols-2">{results.games.map((g) => <Link key={g.id} to="/games/$gameId" params={{ gameId: g.id }} className="border border-border bg-card p-4 hover:border-primary"><h3 className="text-xl">{g.title}</h3><p className="mt-1 font-sans text-xs uppercase tracking-wider text-muted-foreground">{g.category}</p><p className="mt-2 text-sm text-muted-foreground">{g.description}</p><span className="mt-3 inline-flex min-h-9 items-center gap-1 font-sans text-sm font-semibold text-primary">Buksan ang laro <ArrowUpRight className="h-4 w-4" /></span></Link>)}</div></section>}
        </div>
      )}
    </div>
  );
}
