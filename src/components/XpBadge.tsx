import { useEffect, useState } from "react";
import { Award, Lock, Sparkles, ArrowUpRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { badgesFor, XP_EVENT, XP_RULES } from "@/lib/rewards";
import { lessons, terms } from "@/lib/historia-data";
import { useCivilization } from "@/lib/useCivilization";

const byTerm = terms.map((t) => lessons.filter((l) => l.term === t.id).map((l) => l.id));

export function XpBadge() {
  const { progress, rewards: earnedRewards, cosmetics, celebration, dismiss } = useCivilization();
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
  const badges = badgesFor(earnedRewards, byTerm);
  const rewards = [
    ["Aralin", XP_RULES.lesson, "Sa unang pagtatapos ng bawat aralin"],
    ["Kabisadong termino", XP_RULES.term, "Sa bawat susing terminong mamamaster"],
    ["Pagsusulit", XP_RULES.quiz, "Sa unang pagsagot sa bawat pagsusulit"],
    ["Tamang sagot sa pagsusulit", XP_RULES.quizAnswer, "Sa bawat tamang sagot, isang beses"],
    ["Perpektong iskor", XP_RULES.perfect, "Bonus sa perpektong pagsusulit"],
    ["Tamang sagot sa laro", XP_RULES.gameAnswer, "Sa unang tamang sagot sa bawat hamon"],
    ["3 sunod-sunod na tama", XP_RULES.streak3, "Gantimpala sa unang 3-answer streak"],
    ["5 sunod-sunod na tama", XP_RULES.streak5, "Gantimpala sa unang 5-answer streak"],
    ["Pagtatapos ng laro", XP_RULES.gameComplete, "Sa unang pagtatapos ng bawat laro"],
  ] as const;
  return (
    <>
      <div className="relative">
        <Popover>
          <PopoverTrigger className="xp-pill flex items-center gap-2" aria-label={`Antas ${progress.level}, ${progress.era.nameFil}, ${progress.xp} EXP — buksan ang pag-unlad`}>
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full" style={{ background: `conic-gradient(var(--era-accent) ${progress.levelPercent}%, color-mix(in srgb, var(--era-accent) 18%, transparent) 0)` }}>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">{progress.level}</span>
            </span>
            <span className="hidden text-left sm:block"><span className="block text-xs font-semibold leading-tight">{progress.era.nameFil}</span><span className="block text-[0.65rem] opacity-75">{progress.xp.toLocaleString()} EXP</span></span>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[min(22rem,calc(100vw-2rem))] border-accent bg-card p-0">
            <div className="border-b border-border bg-primary p-4 text-primary-foreground">
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-accent">Antas {progress.level} · {progress.era.nameFil}</p>
              <p className="mt-1 font-display text-3xl">{progress.era.title}</p>
              <p className="mt-1 text-sm text-primary-foreground/75">{progress.era.tagline}</p>
              <div className="mt-4 h-2 overflow-hidden bg-primary-foreground/15"><div className="h-full bg-accent" style={{ width: `${progress.levelPercent}%` }} /></div>
              <p className="mt-2 font-sans text-xs text-primary-foreground/75">{progress.xpToNextLevel === null ? "Pinakamataas na antas" : `${progress.xpToNextLevel} EXP bago ang susunod na antas`}</p>
              {progress.nextEra && <p className="mt-1 font-sans text-xs text-primary-foreground/75">{progress.xpToNextEra} EXP bago ang {progress.nextEra.nameFil}</p>}
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-4">
              <p className="eyebrow">Paano kumita ng EXP</p>
              <ul className="mt-2 space-y-2">{rewards.map(([label, points, note]) => <li key={label} className="flex items-start justify-between gap-3 border-b border-border pb-2 text-sm last:border-0"><span><span className="block font-semibold text-foreground">{label}</span><span className="block text-xs text-muted-foreground">{note}</span></span><span className="shrink-0 font-sans font-semibold text-gold-deep">+{points}</span></li>)}</ul>
              <div className="mt-3 border-t border-border pt-3"><p className="eyebrow">Mga tsapa</p><ul className="mt-2 space-y-2">{badges.map((b) => <li key={b.id} className="flex items-center gap-3 opacity-70">{b.earned ? <Award className="h-4 w-4 shrink-0 text-accent" /> : <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />}<span className="text-sm">{b.title}</span></li>)}</ul></div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Isang beses lamang makukuha ang bawat gantimpala. Ang iyong antas at panahon ay awtomatikong nakabatay sa kabuuang EXP na naitala sa account.</p>
            </div>
          </PopoverContent>
        </Popover>
        {pop && <span key={pop.key} className="xp-toast" role="status">+{pop.n} EXP nakuha!</span>}
      </div>
      <Dialog open={Boolean(celebration?.eraAdvanced)} onOpenChange={(open) => { if (!open) dismiss(); }}>
        <DialogContent className="max-w-md border-2" style={celebration?.newEra ? { borderColor: celebration.newEra.theme.accent } : undefined}>
          <DialogHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full" style={celebration?.newEra ? { backgroundColor: celebration.newEra.theme.accent, color: celebration.newEra.theme.bg } : undefined}><Sparkles className="h-6 w-6" /></div>
            <DialogTitle className="text-2xl">Bagong yugto ng iyong paglalakbay!</DialogTitle>
            <DialogDescription>{celebration?.newEra?.nameFil} · Antas {celebration?.newLevel}. {celebration?.newEra?.tagline}</DialogDescription>
          </DialogHeader>
          <div className="rounded-sm border border-border bg-card p-4">
            <p className="eyebrow">Mga bagong nabuksan</p>
            {celebration?.newlyUnlocked.length ? <ul className="mt-2 space-y-2">{celebration.newlyUnlocked.map((item) => <li key={item.id} className="flex items-center gap-2 text-sm"><Award className="h-4 w-4 text-gold-deep" /><span>{item.name} <span className="text-xs text-muted-foreground">· {item.kind === "frame" ? "Balangkas" : item.kind === "background" ? "Likuran" : "Titulo"}</span></span></li>)}</ul> : <p className="mt-2 text-sm text-muted-foreground">Walang bagong kosmetiko sa antas na ito.</p>}
          </div>
          <p className="text-xs text-muted-foreground">{cosmetics.length} kosmetiko na ang nabuksan sa iyong paglalakbay.</p>
          <Button onClick={dismiss} className="min-h-11 w-full">Ipagpatuloy <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
