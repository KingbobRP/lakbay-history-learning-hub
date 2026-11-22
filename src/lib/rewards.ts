/** XP rules — each reward id can be earned only once per student. */
export const XP_RULES = {
  lesson: 25,
  term: 5,
  quiz: 30,
  quizAnswer: 10,
  perfect: 20,
  gameAnswer: 10,
  streak3: 5,
  streak5: 10,
  gameComplete: 15,
} as const;

export const XP_EVENT = "historia-xp";
export type Rewards = { xp: number; awarded: string[] };

/** Pure rule: returns the new state, or null when the reward was already earned. */
export function applyAward(state: Rewards, id: string, points: number): Rewards | null {
  if (state.awarded.includes(id)) return null;
  return { xp: state.xp + points, awarded: [...state.awarded, id] };
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

import { useStudent } from "./student";
export function useRewards() { return useStudent().rewards; }
