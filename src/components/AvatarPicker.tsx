import { Check } from "lucide-react";
import { avatars } from "@/lib/avatars";

export function AvatarPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <div role="radiogroup" aria-label="Pumili ng avatar" className="grid grid-cols-5 gap-2 sm:gap-3">
      {avatars.map((a) => {
        const on = value === a.id;
        return (
          <button key={a.id} type="button" role="radio" aria-checked={on} aria-label={`${a.name} — ${a.desc}`} onClick={() => onChange(a.id)}
            className={`relative overflow-hidden rounded-full border-2 transition-transform hover:scale-105 ${on ? "border-accent ring-2 ring-accent/50" : "border-border"}`}>
            <img src={a.src} alt="" width={400} height={400} loading="lazy" className="aspect-square w-full object-cover" />
            {on && <span className="absolute inset-0 flex items-center justify-center bg-primary/40"><Check className="h-6 w-6 text-primary-foreground" /></span>}
          </button>
        );
      })}
    </div>
  );
}

export function AvatarImg({ src, size = 48, className = "" }: { src?: string; size?: number; className?: string }) {
  return src
    ? <img src={src} alt="" width={size} height={size} className={`shrink-0 rounded-full border-2 border-accent object-cover ${className}`} style={{ width: size, height: size }} />
    : <span className={`flex shrink-0 items-center justify-center rounded-full border-2 border-accent bg-secondary font-display text-primary ${className}`} style={{ width: size, height: size }}>?</span>;
}
