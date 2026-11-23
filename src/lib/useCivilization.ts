import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useStudent } from "./student";
import { diffProgress, progressFor, unlockedCosmetics, type ProgressDiff } from "./civilization";
import { XP_EVENT } from "./rewards";

export function useCivilization() {
  const { rewards } = useStudent();
  const progress = progressFor(rewards.xp);
  const lastXp = useRef(rewards.xp);
  const [queue, setQueue] = useState<ProgressDiff[]>([]);
  const active = queue[0] ?? null;

  useEffect(() => {
    const onXp = (event: Event) => {
      const points = Number((event as CustomEvent<{ points?: number }>).detail?.points ?? 0);
      if (!Number.isFinite(points) || points <= 0) return;
      const nextXp = lastXp.current + points;
      const diff = diffProgress(lastXp.current, nextXp);
      lastXp.current = nextXp;
      if (diff.leveledUp) toast.success(`Antas ${diff.newLevel}!`, { description: `Nadagdagan ang iyong kaalaman. +${diff.gained} EXP` });
      if (diff.eraAdvanced) setQueue((items) => [...items, diff]);
    };
    window.addEventListener(XP_EVENT, onXp);
    return () => window.removeEventListener(XP_EVENT, onXp);
  }, []);

  useEffect(() => {
    if (rewards.xp > lastXp.current) lastXp.current = rewards.xp;
  }, [rewards.xp]);

  const dismiss = useCallback(() => setQueue((items) => items.slice(1)), []);
  return { progress, rewards, cosmetics: unlockedCosmetics(progress.level), celebration: active, dismiss };
}
