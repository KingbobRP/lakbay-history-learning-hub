import { lessons } from "./historia-data";

export type Level = "madali" | "karaniwan" | "mahirap";
export const levels: { id: Level; label: string; desc: string }[] = [
  { id: "madali", label: "MADALI", desc: "Mga termino, petsa, at personalidad; simpleng pag-unawa." },
  { id: "karaniwan", label: "KARANIWAN", desc: "Sanhi at bunga, paghahambing, at paglalapat ng konsepto." },
  { id: "mahirap", label: "MAHIRAP", desc: "Pagsusuri ng ebidensya, magkakaibang pananaw, bagong sitwasyon." },
];
export type LevelResult = { best: number; total: number; stars: number };
export type Adventure = { results: Record<string, Partial<Record<Level, LevelResult>>>; rescued?: boolean };
export const emptyAdventure: Adventure = { results: {} };
export const term1Lessons = lessons.filter((l) => l.term === 1);

/** Stars: one per correct answer plus one for finishing the quiz. */
export const starsForRun = (correct: number) => correct + 1;
/** Excellent = at least 90%. */
export const isExcellent = (correct: number, total: number) => total > 0 && correct / total >= 0.9;

/** Keep only the best run per lesson and level so replays never duplicate stars. */
export function recordRun(a: Adventure, lessonId: string, level: Level, correct: number, total: number, rescued: boolean): Adventure {
  const prev = a.results[lessonId]?.[level];
  const run = { best: correct, total, stars: starsForRun(correct) };
  const keep = !prev || run.best > prev.best ? run : prev;
  return { results: { ...a.results, [lessonId]: { ...a.results[lessonId], [level]: keep } }, rescued: a.rescued || rescued };
}

export const totalStars = (a: Adventure) => Object.values(a.results).reduce((n, r) => n + Object.values(r).reduce((m, x) => m + (x?.stars ?? 0), 0), 0);

export type Reward = { id: string; title: string; desc: string; earned: boolean; kind: "badge" | "trophy" };
export function adventureRewards(a: Adventure, completed: string[]): Reward[] {
  const runs = Object.entries(a.results).flatMap(([lid, r]) => Object.entries(r).map(([lv, x]) => ({ lid, lv: lv as Level, ...x! })));
  const levelsDone = new Set(runs.map((r) => r.lv));
  return [
    { id: "unang-hakbang", kind: "badge", title: "Unang Hakbang", desc: "Natapos ang unang pagsusulit", earned: runs.length > 0 },
    { id: "tagapagtanggol", kind: "badge", title: "Tagapagtanggol ni Babaylan", desc: "Nailigtas si Babaylan mula sa Mangkukulam", earned: !!a.rescued },
    { id: "batang-historyador", kind: "badge", title: "Batang Historyador", desc: "Natapos ang isang aralin at ang pagsusulit nito", earned: runs.some((r) => completed.includes(r.lid)) },
    { id: "matalinong-iskolar", kind: "badge", title: "Matalinong Iskolar", desc: "Nakakuha ng 90% pataas sa isang pagsusulit", earned: runs.some((r) => isExcellent(r.best, r.total)) },
    { id: "dalubhasa", kind: "badge", title: "Dalubhasa sa Kasaysayan", desc: "Natapos ang antas na Mahirap", earned: levelsDone.has("mahirap") },
    { id: "tropeo-termino", kind: "trophy", title: "Tropeo ng Termino 1", desc: "Natapos ang lahat ng aralin ng Termino 1", earned: term1Lessons.every((l) => completed.includes(l.id)) },
    { id: "tropeo-antas", kind: "trophy", title: "Tropeo ng Tatlong Antas", desc: "Natapos ang Madali, Karaniwan, at Mahirap", earned: levelsDone.size === 3 },
    { id: "tropeo-husay", kind: "trophy", title: "Tropeo ng Kahusayan", desc: "90% pataas sa Mahirap na pagsusulit", earned: runs.some((r) => r.lv === "mahirap" && isExcellent(r.best, r.total)) },
  ];
}
