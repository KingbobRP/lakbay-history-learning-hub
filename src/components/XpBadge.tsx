import { useEffect, useState } from "react";
import { Star, Award, Lock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { badgesFor, useRewards, XP_EVENT, XP_RULES } from "@/lib/rewards";
import { lessons, terms } from "@/lib/historia-data";

const byTerm = terms.map((t) => lessons.filter((l) => l.term === t.id).map((l) => l.id));

export function XpBadge() {
  const rewards = useRewards();
  const [pop, setPop] = useState<{ n: number; key: number } | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      const n = (e as CustomEvent<{ points: number }>).detail?.points ?? 0;
      if (n <= 0) return;
      setPop({ n, key: Date.now() });
      clearTimeout(timer);
      timer = setTimeout(() => setPop(null), 2600);
    };
    window.addEventListener(XP_EVENT, on);
    return () => { window.removeEventListener(XP_EVENT, on); clearTimeout(timer); };
  }, []);
  const badges = badgesFor(rewards, byTerm);
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger className="xp-pill" aria-label={`${rewards.xp} XP — buksan ang mga gantimpala`}>
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-semibold">{rewards.xp}</span><span className="text-[0.7rem] opacity-75">XP</span>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 border-accent bg-card p-0">
          <div className="border-b border-border bg-primary p-4 text-primary-foreground">
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-accent">Kabuuang puntos</p>
            <p className="font-display text-4xl">{rewards.xp} XP</p>
          </div>
          <div className="p-4">
            <p className="eyebrow">Mga tsapa at nakamit</p>
            <ul className="mt-2 space-y-2">
              {badges.map((b) => (
                <li key={b.id} className={`flex items-center gap-3 ${b.earned ? "" : "opacity-50"}`}>
                  {b.earned ? <Award className="h-5 w-5 shrink-0 text-accent" /> : <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />}
                  <span className="min-w-0"><span className="block text-sm font-semibold text-ink">{b.title}</span><span className="block text-xs text-muted-foreground">{b.desc}</span></span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-border pt-3 font-sans text-[0.7rem] leading-relaxed text-muted-foreground">Paano kumita: +{XP_RULES.lesson} bawat natapos na aralin, +{XP_RULES.term} bawat kabisadong termino, +{XP_RULES.quiz} sa unang pagsagot ng pagsusulit, +{XP_RULES.perfect} sa perpektong iskor. Isang beses lang bawat gawain.</p>
          </div>
        </PopoverContent>
      </Popover>
      {pop && <span key={pop.key} className="xp-toast" role="status">+{pop.n} XP nakuha!</span>}
    </div>
  );
}
