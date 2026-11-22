import { describe, expect, it } from "vitest";
import { adventureRewards, emptyAdventure, recordRun, totalStars, term1Lessons } from "@/lib/adventure";

describe("Lesson adventure rewards", () => {
  it("gives one star per correct answer plus one for finishing", () => {
    expect(totalStars(recordRun(emptyAdventure, "t1-w1", "madali", 4, 6, false))).toBe(5);
  });
  it("replaying the same quiz never adds duplicate stars", () => {
    const once = recordRun(emptyAdventure, "t1-w1", "madali", 4, 6, false);
    expect(totalStars(recordRun(once, "t1-w1", "madali", 3, 6, false))).toBe(5);
    expect(totalStars(recordRun(once, "t1-w1", "madali", 6, 6, false))).toBe(7);
  });
  it("unlocks Tagapagtanggol ni Babaylan only after a rescue", () => {
    const a = recordRun(emptyAdventure, "t1-w1", "madali", 2, 6, false);
    expect(adventureRewards(a, []).find((r) => r.id === "tagapagtanggol")?.earned).toBe(false);
    expect(adventureRewards(recordRun(a, "t1-w1", "madali", 2, 6, true), []).find((r) => r.id === "tagapagtanggol")?.earned).toBe(true);
  });
  it("Matalinong Iskolar needs at least 90%", () => {
    expect(adventureRewards(recordRun(emptyAdventure, "x", "madali", 5, 6, false), []).find((r) => r.id === "matalinong-iskolar")?.earned).toBe(false);
    expect(adventureRewards(recordRun(emptyAdventure, "x", "madali", 6, 6, false), []).find((r) => r.id === "matalinong-iskolar")?.earned).toBe(true);
  });
  it("Term 1 trophy needs every Term 1 lesson finished", () => {
    const ids = term1Lessons.map((l) => l.id);
    expect(adventureRewards(emptyAdventure, ids.slice(1)).find((r) => r.id === "tropeo-termino")?.earned).toBe(false);
    expect(adventureRewards(emptyAdventure, ids).find((r) => r.id === "tropeo-termino")?.earned).toBe(true);
  });
});
