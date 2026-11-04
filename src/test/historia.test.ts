import { describe, expect, it } from "vitest";
import { quizzes, lessons, timeline } from "@/lib/historia-data";
import { scoreQuiz } from "@/lib/progress";
import { searchLessons } from "@/routes/search";

describe("Historia rules", () => {
  it("every quiz has exactly 10 questions with valid answers", () => {
    for (const t of [1, 2, 3]) {
      expect(quizzes[t]).toHaveLength(10);
      quizzes[t].forEach((q) => expect(q.choices[q.answer]).toBeDefined());
    }
  });
  it("scores correct answers", () => {
    expect(scoreQuiz([0, 1, null, 2], [0, 1, 1, 3])).toBe(2);
  });
  it("has three terms of four weeks", () => {
    expect(lessons).toHaveLength(12);
    expect(new Set(lessons.map((l) => l.term)).size).toBe(3);
  });
  it("timeline is linked to existing lessons", () => {
    timeline.forEach((e) => e.lesson && expect(lessons.some((l) => l.id === e.lesson)).toBe(true));
  });
  it("search finds by keyword", () => {
    expect(searchLessons("rizal").map((l) => l.id)).toContain("t2-w3");
  });
});
