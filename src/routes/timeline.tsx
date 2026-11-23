import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, CalendarDays, Search } from "lucide-react";
import { timeline } from "@/lib/historia-data";

export const Route = createFileRoute("/timeline")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Talaang-Panahon ng Kasaysayan — HISTORIA" },
      { name: "description", content: "Kronolohikal na talaang-panahon ng kasaysayang Pilipino na nakaugnay sa mga aralin ng Baitang 11." },
      { property: "og:title", content: "Talaang-Panahon ng Kasaysayan — HISTORIA" },
      { property: "og:description", content: "Mahahalagang petsa at pangyayari sa kasaysayan ng Pilipinas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Timeline,
});

const periods = [
  { id: "all", label: "Lahat ng panahon" },
  { id: "sinauna", label: "Sinaunang Pilipinas" },
  { id: "kolonyal", label: "Panahong kolonyal" },
  { id: "rebolusyon", label: "Rebolusyon at kalayaan" },
  { id: "makabago", label: "Makabagong Pilipinas" },
] as const;

function yearValue(year: string) {
  if (year.includes("67,000")) return -67000;
  if (year.includes("2,000")) return -2000;
  if (year.includes("890")) return -800;
  return Number(year.match(/\\d{3,4}/)?.[0] ?? 0);
}

function periodFor(year: string) {
  const value = yearValue(year);
  if (value < 1521) return "sinauna";
  if (value < 1892) return "kolonyal";
  if (value < 1946) return "rebolusyon";
  return "makabago";
}

function Timeline() {
  const [period, setPeriod] = useState<(typeof periods)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const events = useMemo(() => {
    return [...timeline]
      .sort((a, b) => yearValue(a.year) - yearValue(b.year))
      .map((event) => ({ ...event, period: periodFor(event.year) }))
      .filter((event) => period === "all" || event.period === period)
      .filter((event) => !query.trim() || `${event.year} ${event.title} ${event.text}`.toLocaleLowerCase("fil").includes(query.trim().toLocaleLowerCase("fil")));
  }, [period, query]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="border-b border-accent pb-7">
        <p className="eyebrow flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Talaan ng panahon · Gabay sa pag-aaral</p>
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Talaang-Panahon ng Kasaysayan</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Sundan ang mahahalagang pangyayari sa pagbuo ng lipunang Pilipino. Pumili ng panahon o maghanap ng paksa, at buksan ang kaugnay na aralin para sa mas malalim na pagtalakay.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Maghanap ng taon, pangyayari, o paksa…" aria-label="Maghanap sa talaang-panahon" className="min-h-12 w-full border border-border bg-card pl-11 pr-4 font-sans text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <p className="font-sans text-sm text-muted-foreground" aria-live="polite">{events.length} sa {timeline.length} pangyayari</p>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Salain ayon sa panahon">
          {periods.map((item) => (
            <button key={item.id} type="button" onClick={() => setPeriod(item.id)} aria-pressed={period === item.id} className={`min-h-10 shrink-0 border px-3 font-sans text-sm transition-colors ${period === item.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-secondary"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {events.length ? (
        <ol className="relative mt-9 border-l-2 border-accent pl-6 sm:pl-10">
          {events.map((event) => (
            <li key={event.year + event.title} className="relative mb-8 last:mb-0">
              <span className="absolute -left-[33px] top-6 h-4 w-4 rounded-full border-2 border-primary bg-accent sm:-left-[49px]" aria-hidden />
              <article className="overflow-hidden border border-border bg-card">
                <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                  {event.image && (
                    <figure className="min-h-48 bg-muted md:min-h-full">
                      <img src={event.image} alt={event.caption ?? event.title} loading="lazy" width={1200} height={800} className="h-full max-h-72 w-full object-cover md:max-h-full" />
                    </figure>
                  )}
                  <div className="p-5 sm:p-6">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">{periods.find((p) => p.id === event.period)?.label}</p>
                    <p className="mt-2 font-display text-2xl text-primary">{event.year}</p>
                    <h2 className="mt-1 text-2xl text-ink">{event.title}</h2>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{event.text}</p>
                    {event.caption && <p className="mt-3 border-t border-border pt-2 font-sans text-xs leading-relaxed text-muted-foreground">{event.caption}</p>}
                    <div className="mt-5 flex flex-wrap gap-3">
                      {event.lesson && <Link to="/lessons/$lessonId" params={{ lessonId: event.lesson }} className="inline-flex min-h-11 items-center gap-2 bg-primary px-4 font-sans text-sm font-semibold text-primary-foreground hover:bg-primary/90"><BookOpen className="h-4 w-4" /> Kaugnay na aralin <ArrowUpRight className="h-4 w-4" /></Link>}
                      <Link to="/search" search={{ q: event.title } as never} className="inline-flex min-h-11 items-center border border-border px-4 font-sans text-sm text-primary hover:bg-secondary">Maghanap ng kaugnay na paksa</Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-10 border border-dashed border-border bg-card px-6 py-12 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" />
          <h2 className="mt-3 text-xl">Walang nahanap na pangyayari</h2>
          <p className="mt-2 text-sm text-muted-foreground">Subukan ang ibang salita o piliin ang lahat ng panahon.</p>
          <button type="button" onClick={() => { setQuery(""); setPeriod("all"); }} className="mt-4 min-h-11 bg-primary px-5 font-sans text-sm font-semibold text-primary-foreground">I-reset ang paghahanap</button>
        </div>
      )}
    </div>
  );
}
