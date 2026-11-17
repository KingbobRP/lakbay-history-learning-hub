import { useState, type DragEvent } from "react";
import { RotateCcw } from "lucide-react";
import { Celebration } from "./Celebration";

const words = [
  { id: "salaysay", word: "Salaysay", gloss: "kuwento, pagsasalaysay" },
  { id: "saysay", word: "Saysay", gloss: "kabuluhan, kahalagahan" },
];

/** Students tap or drag "Salaysay" and "Saysay" into the equation to unlock the meaning of kasaysayan. */
export function EtymologyEquation({ definition }: { definition: string }) {
  const [placed, setPlaced] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const unlocked = placed.length === 2;
  const place = (id: string) => { setPlaced((p) => (p.includes(id) ? p : [...p, id])); setSelected(null); };
  const onDrop = (e: DragEvent) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) place(id); };
  return (
    <div className="activity mt-4">
      <p className="activity-label">Gawain · Buuin ang salita</p>
      <p className="mt-1 font-sans text-sm text-muted-foreground">Pindutin o i-drag ang dalawang salita papunta sa kahon upang mabuksan ang kahulugan.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {words.filter((w) => !placed.includes(w.id)).map((w) => (
          <button key={w.id} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", w.id)} onClick={() => (selected === w.id ? place(w.id) : setSelected(w.id))} aria-pressed={selected === w.id}
            className={`word-tile ${selected === w.id ? "is-selected" : ""}`}>
            <span className="font-display text-2xl">{w.word}</span><span className="block font-sans text-xs text-muted-foreground">{w.gloss}</span>
          </button>
        ))}
      </div>
      <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} onClick={() => selected && place(selected)}
        className={`equation mt-4 ${unlocked ? "is-unlocked" : ""}`} aria-live="polite">
        {[0, 1].map((i) => {
          const w = words.find((x) => x.id === placed[i]);
          return <span key={i} className="flex items-center gap-2 sm:gap-3">{i === 1 && <span className="equation-op">+</span>}<span className={`equation-slot ${w ? "is-filled" : ""}`}>{w ? w.word : "?"}</span></span>;
        })}
        <span className="equation-op">=</span>
        <span className={`equation-slot equation-result ${unlocked ? "is-filled" : ""}`}>{unlocked ? "Kasaysayan" : "· · ·"}{unlocked && <Celebration />}</span>
      </div>
      {unlocked ? (
        <div className="mt-4 border-l-2 border-accent pl-4">
          <p className="leading-[1.75]">{definition}</p>
          <button onClick={() => setPlaced([])} className="mt-3 inline-flex min-h-11 items-center gap-2 font-sans text-sm text-primary underline-offset-4 hover:underline"><RotateCcw className="h-4 w-4" /> Ulitin</button>
        </div>
      ) : selected ? <p className="mt-2 font-sans text-xs text-primary">Napili: {words.find((w) => w.id === selected)?.word} — pindutin ang kahon o pindutin muli ang salita.</p> : null}
    </div>
  );
}
