import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { timeline, type TimelineEvent } from "@/lib/historia-data";

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

type Period = "Sinaunang Panahon" | "Panahon ng Kolonyalismong Espanyol" | "Himagsikan at Unang Republika" | "Panahon ng Kalayaan at Kontemporaryo";

function yearValue(year: string) {
  const values = [...year.matchAll(/[\d,]+/g)].map(([value]) => Number(value.replaceAll(",", "")));
  if (!values.length) return Number.MAX_SAFE_INTEGER;
  const value = values.length > 1 ? (values[0]! + values[1]!) / 2 : values[0]!;
  return /nakalipas|BK/i.test(year) ? -value : value;
}

function periodFor(event: TimelineEvent): Period {
  const year = yearValue(event.year);
  if (year < 0) return "Sinaunang Panahon";
  if (year >= 1892 && year <= 1899) return "Himagsikan at Unang Republika";
  if (year >= 1521 && year < 1892) return "Panahon ng Kolonyalismong Espanyol";
  return "Panahon ng Kalayaan at Kontemporaryo";
}

const periods: Period[] = [
  "Sinaunang Panahon",
  "Panahon ng Kolonyalismong Espanyol",
  "Himagsikan at Unang Republika",
  "Panahon ng Kalayaan at Kontemporaryo",
];

function Timeline() {
  const [period, setPeriod] = useState<"Lahat" | Period>("Lahat");
  const [query, setQuery] = useState("");
  const events = useMemo(() => timeline
    .map((event, index) => ({ event, index, period: periodFor(event), sort: yearValue(event.year) }))
    .sort((a, b) => a.sort - b.sort || a.index - b.index), []);
  const visible = events.filter(({ event, period: eventPeriod }) =>
    (period === "Lahat" || eventPeriod === period) &&
    (!query.trim() || [event.year, event.title, event.text, event.caption ?? "", eventPeriod]
      .join(" ").toLocaleLowerCase("fil-PH").includes(query.trim().toLocaleLowerCase("fil-PH")))
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Talaan ng Panahon</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Talaang-Panahon ng Kasaysayan</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Siyasatin ang mahahalagang yugto sa pagbuo ng kamalayan at lipunang Pilipino. Nakaayos ang mga pangyayari mula sa pinakamaaga hanggang sa kasalukuyang panahon at iniuugnay sa mga aralin.</p>

      <section className="mt-8 border border-border bg-card p-4 sm:p-5" aria-label="Mga panala sa talaang-panahon">
        <label htmlFor="timeline-search" className="block font-sans text-sm font-semibold text-ink">Maghanap sa mga pangyayari</label>
        <input id="timeline-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Hal. Mactan, Katipunan, kalayaan…" className="mt-2 min-h-12 w-full border border-border bg-background px-3 font-sans text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring" />
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Salain ayon sa panahon">
          <button type="button" onClick={() => setPeriod("Lahat")} aria-pressed={period === "Lahat"} className={`min-h-10 border px-3 font-sans text-sm ${period === "Lahat" ? "border-primary bg-primary text-primary-foreground" : "border-border text-ink hover:border-primary"}`}>Lahat ({timeline.length})</button>
          {periods.map((item) => {
            const count = events.filter((entry) => entry.period === item).length;
            return <button key={item} type="button" onClick={() => setPeriod(item)} aria-pressed={period === item} className={`min-h-10 border px-3 font-sans text-sm ${period === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-ink hover:border-primary"}`}>{item} ({count})</button>;
          })}
        </div>
        <p className="mt-3 font-sans text-xs text-muted-foreground" role="status">Ipinapakita ang {visible.length} sa {timeline.length} pangyayari.</p>
      </section>

      {visible.length ? (
        <ol className="relative mt-10 space-y-8 border-l-2 border-primary/50 pl-6 sm:pl-10">
          {visible.map(({ event, period: eventPeriod }) => (
            <li key={event.year + event.title} className="relative">
              <span className="absolute -left-[33px] top-2 h-4 w-4 rounded-full border-2 border-primary bg-accent sm:-left-[49px]" aria-hidden />
              <article className="border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-2xl text-primary">{event.year}</p>
                  <span className="border border-accent/70 px-2 py-1 font-sans text-[0.68rem] uppercase tracking-wide text-gold-deep">{eventPeriod}</span>
                </div>
                <h2 className="mt-2 text-xl text-ink sm:text-2xl">{event.title}</h2>
                <p className="mt-2 leading-relaxed">{event.text}</p>
                {event.image && (
                  <figure className="mt-4 max-w-xl">
                    <img src={event.image} alt={event.caption ?? event.title} loading="lazy" width={1200} height={800} className="photo aspect-[3/2] w-full object-cover" />
                    {event.caption && <figcaption className="mt-2 font-sans text-xs text-muted-foreground">{event.caption}</figcaption>}
                  </figure>
                )}
                {event.lesson && <Link to="/lessons/$lessonId" params={{ lessonId: event.lesson }} className="mt-4 inline-flex min-h-11 items-center border-b border-accent font-sans text-sm font-semibold text-primary hover:text-gold-deep">Basahin ang kaugnay na aralin →</Link>}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-8 border border-border bg-card p-6 text-center text-muted-foreground">Walang pangyayaring tumutugma sa iyong paghahanap. Subukan ang ibang salita o piliin ang “Lahat”.</p>
      )}
    </div>
  );
}
