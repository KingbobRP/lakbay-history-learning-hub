import { useCallback, useEffect, useState } from "react";
import { lessons } from "./historia-data";

const KEY = "historia-progress-v1";
export type Progress = { completed: string[]; scores: Record<string, { best: number; last: number; attempts: number }> };
const empty: Progress = { completed: [], scores: {} };

function read(): Progress {
  try { return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return empty; }
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
    reset: () => save(() => empty),
    percent: Math.round((p.completed.length / lessons.length) * 100),
  };
}

export function scoreQuiz(answers: (number | null)[], key: number[]) {
  return answers.reduce<number>((n, a, i) => n + (a === key[i] ? 1 : 0), 0);
}
