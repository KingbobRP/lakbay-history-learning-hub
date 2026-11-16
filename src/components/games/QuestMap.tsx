import { locations } from '@/lib/history-games';
import { mapPoint, philippinesOutline } from '@/lib/philippines-map';

export function QuestMap({ picked, correct }: { picked: number | null; correct?: number | undefined }) {
 return <figure className="quest-map relative border border-border bg-secondary/40">
  <svg viewBox="0 0 410 560" className="mx-auto h-[380px] w-full sm:h-[440px]" role="img" aria-label="Mapa ng Pilipinas na may siyam na makasaysayang lokasyon">
   <path d={philippinesOutline} className="fill-card stroke-accent" strokeWidth="1.5" />
   {locations.map((l, i)=>{
    const p = mapPoint(l.lon,l.lat);
    // Offset tightly clustered Manila-area labels, retaining the geographic anchor.
    const x = i === 0 ? p.x - 30 : i === 1 ? p.x - 28 : i === 5 ? p.x + 28 : p.x;
    const y = i === 0 ? p.y + 22 : i === 1 ? p.y - 18 : p.y;
    return <g key={l.name}>
     <line x1={p.x} y1={p.y} x2={x} y2={y} className="stroke-primary" />
     <circle cx={p.x} cy={p.y} r="2" className="fill-primary" />
     <circle cx={x} cy={y} r="12" className={correct===i ? 'fill-success' : picked===i ? 'fill-accent' : 'fill-primary'} />
     <text x={x} y={y+4} textAnchor="middle" className="fill-primary-foreground font-sans text-[12px]">{i+1}</text>
    </g>;
   })}
   <text x="20" y="40" className="fill-muted-foreground font-sans text-[12px]">PILIPINAS</text>
  </svg>
  <figcaption className="px-4 pb-3 text-xs text-muted-foreground">Balangkas: Natural Earth · Mga marker: tinatayang sentro ng lokasyon</figcaption>
 </figure>;
}