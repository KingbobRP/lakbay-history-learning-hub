import { useMemo, useState, type DragEvent } from "react";
import { RotateCcw } from "lucide-react";
import type { SortCard } from "@/lib/lesson-interactives";
import { Celebration } from "./Celebration";

type Bin = SortCard["kind"];
const bins: { id: Bin; label: string; hint: string }[] = [
  { id: "primarya", label: "Primarya", hint: "Nalikha sa panahon ng pangyayari" },
  { id: "sekundarya", label: "Sekundarya", hint: "Interpretasyon sa ibang panahon" },
];

/** Drag (or tap, then tap a box) each card into Primarya or Sekundarya. */
export function SourceSorter({ cards }: { cards: SortCard[] }) {
  const order = useMemo(() => [cards[1], cards[2], cards[3], cards[0]].filter(Boolean) as SortCard[], [cards]);
  const [placed, setPlaced] = useState<Record<string, Bin>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const done = Object.keys(placed).length === cards.length;
  const score = cards.filter((c) => placed[c.id] === c.kind).length;
  const drop = (bin: Bin, id: string | null) => { if (!id || placed[id]) return; setPlaced((p) => ({ ...p, [id]: bin })); setSelected(null); };
  const onDrop = (bin: Bin) => (e: DragEvent) => { e.preventDefault(); drop(bin, e.dataTransfer.getData("text/plain")); };
  return (
    <section className="activity mt-10" aria-labelledby="sorter-title">
      <p className="activity-label">Mini-laro · Bago ang pagtataya</p>
      <h3 id="sorter-title" className="mt-1 text-2xl">Primarya o Sekundarya?</h3>
      <p className="mt-1 font-sans text-sm text-muted-foreground">I-drag ang bawat kard sa tamang kahon. Sa telepono, pindutin ang kard at saka ang kahon.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {order.filter((c) => !placed[c.id]).map((c) => (
          <button key={c.id} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", c.id)} onClick={() => setSelected(selected === c.id ? null : c.id)} aria-pressed={selected === c.id}
            className={`sort-card ${selected === c.id ? "is-selected" : ""}`}>{c.label}</button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {bins.map((b) => (
          <div key={b.id} onDragOver={(e) => e.preventDefault()} onDrop={onDrop(b.id)} onClick={() => drop(b.id, selected)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); drop(b.id, selected); } }}
            aria-label={`Ilagay sa ${b.label}`} className={`sort-bin ${selected ? "is-ready" : ""}`}>
            <p className="font-display text-xl text-ink">{b.label}</p>
            <p className="font-sans text-xs text-muted-foreground">{b.hint}</p>
            <ul className="mt-3 space-y-2">
              {cards.filter((c) => placed[c.id] === b.id).map((c) => {
                const ok = c.kind === b.id;
                return (
                  <li key={c.id} className={`relative border-l-4 p-3 font-sans text-sm ${ok ? "border-success bg-success/10" : "choice-wrong border-destructive bg-destructive/10"}`}>
                    <strong>{ok ? "✓ " : "✗ "}{c.label}</strong>
                    <span className="mt-1 block text-xs text-muted-foreground">{ok ? c.why : `Mas angkop sa ${c.kind === "primarya" ? "Primarya" : "Sekundarya"}: ${c.why}`}</span>
                    {ok && <Celebration label="+1" />}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {done && (
        <div role="status" className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-primary bg-card p-4">
          <p className="font-display text-2xl text-ink">{score}/{cards.length} tama {score === cards.length ? "— handa ka na sa pagtataya!" : ""}</p>
          <button onClick={() => setPlaced({})} className="inline-flex min-h-11 items-center gap-2 border border-primary px-4 font-sans text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"><RotateCcw className="h-4 w-4" /> Ulitin</button>
        </div>
      )}
    </section>
  );
}
