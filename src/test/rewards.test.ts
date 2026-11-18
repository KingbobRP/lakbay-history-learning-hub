import { describe, expect, it } from "vitest";
import { applyAward, XP_RULES } from "@/lib/rewards";

describe("XP rewards", () => {
  it("starts at 0 and adds 20 XP for finishing a lesson", () => {
    const r = applyAward({ xp: 0, awarded: [] }, "lesson:a", XP_RULES.lesson);
    expect(r?.xp).toBe(20);
  });
  it("never awards the same activity twice", () => {
    const once = applyAward({ xp: 0, awarded: [] }, "quiz:1", XP_RULES.quiz)!;
    expect(applyAward(once, "quiz:1", XP_RULES.quiz)).toBeNull();
  });
  it("uses the defined point values", () => {
    expect(XP_RULES).toEqual({ lesson: 20, term: 5, quiz: 30, perfect: 20 });
  });
});
