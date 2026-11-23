import { createFileRoute, Link } from "@tanstack/react-router";
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

function Timeline() {
  return (
    <div className="timeline-page mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Talaan ng Panahon</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Talaang-Panahon ng Kasaysayan</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Mahahalagang yugto sa pagbuo ng kamalayan at lipunang Pilipino — bawat isa ay nakaugnay sa isang aralin.</p>
      <ol className="relative mt-12 border-l-2 border-primary/60 pl-6 sm:pl-10">
        {timeline.map((e) => (
          <li key={e.year + e.title} className="relative mb-12">
            <span className="absolute -left-[33px] top-2 h-4 w-4 rounded-full border-2 border-primary bg-accent sm:-left-[49px]" aria-hidden />
            <p className="font-display text-2xl text-primary">{e.year}</p>
            <h2 className="mt-1 text-xl text-ink">{e.title}</h2>
            <p className="mt-2 leading-relaxed">{e.text}</p>
            {e.image && (
              <figure className="mt-4 max-w-lg">
                <img src={e.image} alt={e.caption ?? e.title} loading="lazy" width={1200} height={800} className="photo aspect-[3/2] w-full object-cover" />
                <figcaption className="mt-2 font-sans text-xs text-muted-foreground">{e.caption}</figcaption>
              </figure>
            )}
            {e.lesson && <Link to="/lessons/$lessonId" params={{ lessonId: e.lesson }} className="mt-3 inline-flex min-h-11 items-center font-sans text-sm text-primary underline underline-offset-4">Basahin ang kaugnay na aralin →</Link>}
          </li>
        ))}
      </ol>
    </div>
  );
}
