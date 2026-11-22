import { describe, expect, it } from "vitest";
import { applyAward, XP_RULES } from "@/lib/rewards";

describe("XP rewards", () => {
  it("starts at 0 and adds 25 XP for finishing a lesson", () => {
    const r = applyAward({ xp: 0, awarded: [] }, "lesson:a", XP_RULES.lesson);
    expect(r?.xp).toBe(25);
  });
  it("never awards the same activity twice", () => {
    const once = applyAward({ xp: 0, awarded: [] }, "quiz:1", XP_RULES.quiz)!;
    expect(applyAward(once, "quiz:1", XP_RULES.quiz)).toBeNull();
  });
  it("uses the defined point values", () => {
    expect(XP_RULES).toEqual({ lesson: 25, term: 5, quiz: 30, quizAnswer: 10, perfect: 20, gameAnswer: 10, streak3: 5, streak5: 10, gameComplete: 15 });
  });
});
