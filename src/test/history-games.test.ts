import { describe, expect, it } from "vitest";
import { gameCatalog, difficulties, questionsFor, timelineRounds, pointsFor, validatesText, correctPositions } from "@/lib/history-games";

describe("History games rules", () => {
  it("offers eight games", () => expect(gameCatalog).toHaveLength(8));
  it("every game and difficulty has playable questions with a valid answer", () => {
    for (const g of gameCatalog.filter((g) => g.id !== "timeline")) {
      for (const d of difficulties) {
        const qs = questionsFor(g.id, d.id);
        expect(qs.length).toBe(g.id === "millionaire" ? 9 : 3);
        qs.forEach((q) => expect(q.choices[q.answer]).toBeDefined());
      }
    }
  });
  it("does not always place the correct answer first", () => {
    const answers = [...questionsFor("detective", "easy"), ...questionsFor("detective", "medium"), ...questionsFor("detective", "hard")].map((q) => q.answer);
    expect(new Set(answers).size).toBeGreaterThan(1);
  });
  it("timeline rounds grow with difficulty and are chronological", () => {
    expect(timelineRounds("easy")[0]).toHaveLength(3);
    expect(timelineRounds("hard")[0]).toHaveLength(5);
    for (const r of timelineRounds("hard")) expect(r.map((e) => e.year)).toEqual([...r.map((e) => e.year)].sort((a, b) => a - b));
  });
  it("scores 100/150/200 by difficulty and halves hinted answers", () => {
    expect(pointsFor("easy", 0)).toBe(100);
    expect(pointsFor("medium", 0)).toBe(150);
    expect(pointsFor("hard", 0, false, true)).toBe(100);
    expect(pointsFor("easy", 8, true)).toBe(3000);
  });
  it("accepts alternative typed answers regardless of case", () => {
    const q = questionsFor("complete", "easy")[1]!;
    expect(validatesText("rizal", q)).toBe(true);
    expect(validatesText("Bonifacio", q)).toBe(false);
  });
  it("counts timeline items in the correct position", () => expect(correctPositions([0, 2, 1])).toBe(1));
});
