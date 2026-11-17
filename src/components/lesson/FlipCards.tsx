import { useState } from "react";
import { Check, RotateCw } from "lucide-react";
import { masteryKey, useProgress } from "@/lib/progress";

/** Key terms as 3D flip cards; "kabisado" toggles are saved to the student's progress. */
export function FlipCards({ lessonId, terms }: { lessonId: string; terms: { term: string; def: string }[] }) {
  const { progress, toggleMastered } = useProgress();
  const [flipped, setFlipped] = useState<string[]>([]);
  const mastered = terms.filter((t) => progress.mastered.includes(masteryKey(lessonId, t.term))).length;
  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-sm">
        <p className="text-muted-foreground">Pindutin ang kard upang baligtarin.</p>
        <p className="font-semibold text-primary" data-testid="mastered-count">{mastered} sa {terms.length} kabisado na</p>
      </div>
      <div className="mt-2 h-1 bg-muted"><div className="h-full bg-accent transition-all" style={{ width: `${(mastered / terms.length) * 100}%` }} /></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {terms.map((t) => {
          const key = masteryKey(lessonId, t.term);
          const isFlipped = flipped.includes(t.term);
          const isMastered = progress.mastered.includes(key);
          return (
            <div key={t.term} className="flex flex-col">
              <button onClick={() => setFlipped((f) => (f.includes(t.term) ? f.filter((x) => x !== t.term) : [...f, t.term]))} aria-pressed={isFlipped} aria-label={`${t.term} — baligtarin ang kard`} className={`flip-card ${isFlipped ? "is-flipped" : ""}`}>
                <span className="flip-inner">
                  <span className="flip-face flip-front">
                    <span className="eyebrow">Susing termino</span>
                    <span className="mt-2 font-display text-2xl leading-tight text-ink">{t.term}</span>
                    <span className="mt-auto flex items-center gap-1 font-sans text-xs text-muted-foreground"><RotateCw className="h-3 w-3" /> Baligtarin</span>
                  </span>
                  <span className="flip-face flip-back">
                    <span className="eyebrow !text-accent">{t.term}</span>
                    <span className="mt-2 text-base leading-relaxed">{t.def}</span>
                  </span>
                </span>
              </button>
              <button onClick={() => toggleMastered(key)} aria-pressed={isMastered} className={`mt-2 inline-flex min-h-11 items-center justify-center gap-2 border font-sans text-sm font-semibold ${isMastered ? "border-success bg-success/10 text-success" : "border-border text-primary hover:border-primary hover:bg-secondary"}`}>
                {isMastered ? <><Check className="h-4 w-4" /> Kabisado na</> : "Markahang kabisado"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
