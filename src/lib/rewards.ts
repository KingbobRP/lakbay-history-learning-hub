import { useEffect, useState } from "react";

/** XP rules — each reward id can be earned only once per student. */
export const XP_RULES = {
  lesson: 20, // first time a lesson is marked finished
  term: 5, // first time a key term is marked memorised
  quiz: 30, // first time a term quiz is submitted
  perfect: 20, // first perfect 10/10 on a term quiz
} as const;

const KEY = "historia-rewards-v1";
export const XP_EVENT = "historia-xp";
export type Rewards = { xp: number; awarded: string[] };
const empty: Rewards = { xp: 0, awarded: [] };

export function readRewards(): Rewards {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) || "{}");
    return { xp: Number(r.xp) || 0, awarded: Array.isArray(r.awarded) ? r.awarded : [] };
  } catch { return empty; }
}

/** Pure rule: returns the new state, or null when the reward was already earned. */
export function applyAward(state: Rewards, id: string, points: number): Rewards | null {
  if (state.awarded.includes(id)) return null;
  return { xp: state.xp + points, awarded: [...state.awarded, id] };
}

export function award(id: string, points: number) {
  if (typeof window === "undefined") return;
  const next = applyAward(readRewards(), id, points);
  if (!next) return;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent(XP_EVENT, { detail: { points } }));
}

export function resetRewards() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent(XP_EVENT, { detail: { points: 0 } }));
}

export function useRewards() {
  const [r, setR] = useState<Rewards>(empty);
  useEffect(() => {
    setR(readRewards());
    const on = () => setR(readRewards());
    window.addEventListener(XP_EVENT, on);
    return () => window.removeEventListener(XP_EVENT, on);
  }, []);
  return r;
}

export type Badge = { id: string; title: string; desc: string; earned: boolean };
export function badgesFor(r: Rewards, lessonIdsByTerm: string[][]): Badge[] {
  const lessons = r.awarded.filter((a) => a.startsWith("lesson:")).map((a) => a.slice(7));
  const terms = r.awarded.filter((a) => a.startsWith("term:")).length;
  return [
    { id: "first", title: "Unang Hakbang", desc: "Natapos ang unang aralin", earned: lessons.length >= 1 },
    { id: "five", title: "Masigasig na Mag-aaral", desc: "Natapos ang limang aralin", earned: lessons.length >= 5 },
    { id: "termdone", title: "Tagapagtapos ng Termino", desc: "Natapos ang lahat ng aralin sa isang termino", earned: lessonIdsByTerm.some((ids) => ids.length > 0 && ids.every((id) => lessons.includes(id))) },
    { id: "quiz", title: "Matapang na Tagasagot", desc: "Nasagutan ang isang pagsusulit", earned: r.awarded.some((a) => a.startsWith("quiz:")) },
    { id: "perfect", title: "Dalubhasa sa Pagsusulit", desc: "Nakakuha ng perpektong iskor", earned: r.awarded.some((a) => a.startsWith("perfect:")) },
    { id: "words", title: "Tagapag-ingat ng Salita", desc: "Kabisado ang sampung susing termino", earned: terms >= 10 },
  ];
}
