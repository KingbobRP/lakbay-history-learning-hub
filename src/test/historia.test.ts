import { describe, expect, it } from "vitest";
import { quizzes, lessons, timeline } from "@/lib/historia-data";
import { scoreQuiz } from "@/lib/progress";
import { searchLessons } from "@/routes/search";

describe("Historia rules", () => {
  it("every quiz has exactly 10 questions with valid answers", () => {
    for (const t of [1, 2, 3]) {
      const qz = quizzes[t] ?? [];
      expect(qz).toHaveLength(10);
      qz.forEach((q) => expect(q.choices[q.answer]).toBeDefined());
    }
  });
  it("scores correct answers", () => {
    expect(scoreQuiz([0, 1, null, 2], [0, 1, 1, 3])).toBe(2);
  });
  it("follows the Budget of Work weekly distribution", () => {
    expect(lessons.filter((l) => l.term === 1).map((l) => l.weeks)).toEqual(["1–2", "3–4", "5–6", "7–8", "9–10"]);
    expect(lessons.filter((l) => l.term === 2).map((l) => l.weeks)).toEqual(["1", "2–3", "4–5", "6–7", "8–9", "10"]);
    expect(lessons.filter((l) => l.term === 3).map((l) => l.weeks)).toEqual(["1", "2", "3", "4", "5–6", "7–8", "9", "10"]);
    expect(new Set(lessons.map((l) => l.term)).size).toBe(3);
  });
  it("timeline is linked to existing lessons", () => {
    timeline.forEach((e) => e.lesson && expect(lessons.some((l) => l.id === e.lesson)).toBe(true));
  });
  it("every timeline event has a photo with a caption", () => {
    timeline.forEach((e) => {
      expect(e.image, e.title).toBeTruthy();
      expect(e.caption, e.title).toBeTruthy();
    });
  });
  it("search finds by keyword", () => {
    expect(searchLessons("rizal").map((l) => l.id)).toContain("t2-w4");
  });
});
