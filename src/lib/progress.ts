import { lessons, terms } from "./historia-data";
import { useStudent, type Progress } from "./student";
import { XP_RULES } from "./rewards";

export type { Progress };
export const masteryKey = (lessonId: string, term: string) => `${lessonId}::${term}`;
export const totalKeyTerms = lessons.reduce((n, l) => n + l.keyTerms.length, 0);

/** Overall progress: 60% finished lessons + 40% best quiz scores (all three term quizzes). */
export function overallPercent(p: Progress) {
  const lessonPct = (p.completed.length / lessons.length) * 100;
  const quizPct = (terms.reduce((n, t) => n + (p.scores[t.id]?.best ?? 0), 0) / (terms.length * 10)) * 100;
  return Math.round(lessonPct * 0.6 + quizPct * 0.4);
}

export function useProgress() {
  const { progress: p, saveProgress: save, award, log } = useStudent();
  return {
    progress: p,
    toggleLesson: (id: string) => {
      const adding = !p.completed.includes(id);
      save((s) => ({ ...s, completed: adding ? [...s.completed, id] : s.completed.filter((x) => x !== id) }));
      if (adding) {
        const title = lessons.find((l) => l.id === id)?.title ?? id;
        award(`lesson:${id}`, `Natapos ang aralin: ${title}`);
        log("lesson", `Natapos ang aralin: ${title}`);
      }
    },
    visitLesson: (id: string) => { if (p.lastLesson !== id) save((s) => ({ ...s, lastLesson: id })); },
    recordScore: (term: number, score: number, answers: (number | null)[], keys: number[]) => {
      answers.forEach((answer, i) => {
        if (answer === keys[i]) award(`quizAnswer:${term}:${i}`, `Tamang sagot ${i + 1} sa Pagsusulit ng Termino ${term}`);
      });
      award(`quiz:${term}`, `Unang pagsagot sa Pagsusulit ng Termino ${term}`);
      if (score === 10) award(`perfect:${term}`, `Perpektong iskor sa Termino ${term}`);
      log("quiz", `Pagsusulit ng Termino ${term}`, score);
      save((s) => {
        const prev = s.scores[term] ?? { best: 0, last: 0, attempts: 0 };
        return { ...s, scores: { ...s.scores, [term]: { best: Math.max(prev.best, score), last: score, attempts: prev.attempts + 1 } } };
      });
    },
    toggleMastered: (key: string) => {
      const adding = !p.mastered.includes(key);
      save((s) => ({ ...s, mastered: adding ? [...s.mastered, key] : s.mastered.filter((x) => x !== key) }));
      if (adding) award(`term:${key}`, `Kabisado: ${key.split("::")[1] ?? key}`);
    },
    percent: Math.round((p.completed.length / lessons.length) * 100),
    xpRules: XP_RULES,
  };
}

export function scoreQuiz(answers: (number | null)[], key: number[]) {
  return answers.reduce<number>((n, a, i) => n + (a === key[i] ? 1 : 0), 0);
}
