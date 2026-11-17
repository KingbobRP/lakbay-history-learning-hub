import { useState } from "react";
import { Search } from "lucide-react";
import type { LessonInteractives } from "@/lib/lesson-interactives";

/** "Bias Detective": clickable words in a Pigafetta excerpt reveal how a European lens shaped the account. */
export function BiasHotspots({ bias }: { bias: NonNullable<LessonInteractives["bias"]> }) {
  const words = bias.segments.filter((s): s is { word: string; note: string } => typeof s !== "string");
  const [found, setFound] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const open = (w: string) => { setActive(w); setFound((f) => (f.includes(w) ? f : [...f, w])); };
  const note = words.find((w) => w.word === active)?.note;
  return (
    <div className="activity sm:col-span-2">
      <p className="activity-label flex items-center gap-2"><Search className="h-3.5 w-3.5" /> Detektib ng Kinikilingan</p>
      <h3 className="mt-1 text-lg">{bias.exampleTitle}</h3>
      <p className="mt-1 font-sans text-xs text-muted-foreground">Pindutin ang mga salitang may salungguhit. Natuklasan: {found.length} sa {words.length}</p>
      <blockquote className="mt-4 border-l-2 border-accent pl-4 font-display text-xl italic leading-relaxed text-ink">
        “{bias.segments.map((s, i) => typeof s === "string" ? <span key={i}>{s}</span> : (
          <button key={i} onClick={() => open(s.word)} aria-expanded={active === s.word} className={`hotspot ${found.includes(s.word) ? "is-found" : ""} ${active === s.word ? "is-active" : ""}`}>{s.word}</button>
        ))}”
      </blockquote>
      <p className="mt-2 font-sans text-xs text-muted-foreground">{bias.source}</p>
      {note && (
        <div role="status" className="mt-4 border border-accent bg-background p-4 font-sans text-sm">
          <p className="font-semibold text-ink">Lenteng Europeo sa salitang “{active}”</p>
          <p className="mt-1 leading-relaxed">{note}</p>
        </div>
      )}
      {found.length === words.length && (
        <div className="mt-4 border-t-2 border-primary bg-secondary p-4 font-sans text-sm">
          <p className="font-semibold text-ink">Kaugnayan sa Pantayong Pananaw</p>
          <p className="mt-1 leading-relaxed">{bias.pantayo}</p>
        </div>
      )}
    </div>
  );
}
