import { lessons, terms } from "./historia-data";
import type { Activity, Progress } from "./student";
import { badgesFor, type Rewards } from "./rewards";

const byTerm = terms.map((t) => lessons.filter((l) => l.term === t.id).map((l) => l.id));
export const allBadges = (r: Rewards) => badgesFor(r, byTerm);

/** The next lesson to study: last opened unfinished lesson, else the first unfinished one. */
export function continueLesson(p: Progress) {
  const last = lessons.find((l) => l.id === p.lastLesson);
  if (last && !p.completed.includes(last.id)) return last;
  return lessons.find((l) => !p.completed.includes(l.id));
}
export const quizzesDone = (p: Progress) => Object.keys(p.scores).length;
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fil-PH", { month: "short", day: "numeric", year: "numeric" });
}
export const pointEvents = (a: Activity[]) => a.filter((x) => x.points > 0);
