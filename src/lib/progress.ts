import { useCallback, useEffect, useState } from "react";
import { lessons } from "./historia-data";

const KEY = "historia-progress-v1";
/** mastered holds key-term ids ("lessonId::term") the student marked as memorised on the flip cards. */
export type Progress = { completed: string[]; scores: Record<string, { best: number; last: number; attempts: number }>; mastered: string[] };
const empty: Progress = { completed: [], scores: {}, mastered: [] };
export const masteryKey = (lessonId: string, term: string) => `${lessonId}::${term}`;
export const totalKeyTerms = lessons.reduce((n, l) => n + l.keyTerms.length, 0);

function read(): Progress {
  try {
    const saved = { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") } as Progress;
    return { ...saved, mastered: Array.isArray(saved.mastered) ? saved.mastered : [] };
  } catch { return empty; }
}

export function useProgress() {
  const [p, setP] = useState<Progress>(empty);
  useEffect(() => {
    setP(read());
    const on = () => setP(read());
    window.addEventListener("historia-progress", on);
    return () => window.removeEventListener("historia-progress", on);
  }, []);
  const save = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(read());
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
    setP(next);
    window.dispatchEvent(new Event("historia-progress"));
  }, []);
  return {
    progress: p,
    toggleLesson: (id: string) => save((s) => ({ ...s, completed: s.completed.includes(id) ? s.completed.filter((x) => x !== id) : [...s.completed, id] })),
    recordScore: (term: number, score: number) => save((s) => {
      const prev = s.scores[term] ?? { best: 0, last: 0, attempts: 0 };
      return { ...s, scores: { ...s.scores, [term]: { best: Math.max(prev.best, score), last: score, attempts: prev.attempts + 1 } } };
    }),
    toggleMastered: (key: string) => save((s) => ({ ...s, mastered: s.mastered.includes(key) ? s.mastered.filter((x) => x !== key) : [...s.mastered, key] })),
    reset: () => save(() => empty),
    percent: Math.round((p.completed.length / lessons.length) * 100),
  };
}

export function scoreQuiz(answers: (number | null)[], key: number[]) {
  return answers.reduce<number>((n, a, i) => n + (a === key[i] ? 1 : 0), 0);
}
