import { describe, expect, it } from "vitest";
import { CURVE, COSMETICS, ERAS, ERA_COUNT, LEVEL_THRESHOLDS, MAX_LEVEL, diffProgress, eraForLevel, levelFromXp, progressFor, unlockedCosmetics, xpForLevel } from "../lib/civilization";
import { lessons, quizzes, timeline } from "../lib/historia-data";
import { gameCatalog, difficulties, questionsFor, timelineRounds } from "../lib/history-games";
import { XP_RULES } from "../lib/rewards";

describe("civilization structure",()=>{
 it("contains twelve eras and sixty levels without gaps",()=>{
  expect(ERAS).toHaveLength(ERA_COUNT); expect(MAX_LEVEL).toBe(60);
  expect(ERAS[0]?.id).toBe("bato"); expect(ERAS[11]?.id).toBe("kosmiko");
  ERAS.forEach((era,i)=>{expect(era.order).toBe(i+1);if(i)expect(era.firstLevel).toBe(ERAS[i-1]!.lastLevel+1);});
 });
 it("maps level ranges to their eras",()=>{expect(eraForLevel(1).id).toBe("bato");expect(eraForLevel(6).id).toBe("tribo");expect(eraForLevel(60).id).toBe("kosmiko");});
 it("has 36 unique cosmetics, three per era",()=>{expect(COSMETICS).toHaveLength(36);expect(new Set(COSMETICS.map(c=>c.id)).size).toBe(36);});
});
describe("XP curve",()=>{
 it("starts at zero and increases strictly",()=>{expect(LEVEL_THRESHOLDS[0]).toBe(0);for(let i=1;i<60;i++)expect(LEVEL_THRESHOLDS[i]!).toBeGreaterThan(LEVEL_THRESHOLDS[i-1]!);});
 it("makes the first 25-XP lesson reach level two",()=>{expect(levelFromXp(24)).toBe(1);expect(levelFromXp(25)).toBe(2);});
 it("places full available course completion around level 50",()=>{
  const lessonXp=lessons.length*XP_RULES.lesson;
  const termXp=lessons.reduce((n,l)=>n+l.keyTerms.length*XP_RULES.term,0);
  const quizXp=Object.values(quizzes).reduce((n,qs)=>n+XP_RULES.quiz+qs.length*XP_RULES.quizAnswer+XP_RULES.perfect,0);
  const gameXp=gameCatalog.reduce((n,g)=>{
   const rounds=g.id==="timeline"?Math.max(...difficulties.map(d=>timelineRounds(d.id).length)):Math.max(...difficulties.map(d=>questionsFor(g.id,d.id).length));
   return n+rounds*XP_RULES.gameAnswer+XP_RULES.streak3+XP_RULES.streak5+XP_RULES.gameComplete;
  },0);
  const total=lessonXp+termXp+quizXp+gameXp;
  expect(lessons).toHaveLength(19); expect(lessons.reduce((n,l)=>n+l.keyTerms.length,0)).toBe(76);
  expect(gameCatalog).toHaveLength(8); expect(timeline).toHaveLength(15);
  expect(total).toBe(1845); expect(levelFromXp(total)).toBeGreaterThanOrEqual(49); expect(levelFromXp(total)).toBeLessThanOrEqual(50);
  expect(CURVE.scale).toBe(0.5);
 });
 it("round-trips every level threshold",()=>{for(let l=1;l<=MAX_LEVEL;l++){expect(levelFromXp(xpForLevel(l))).toBe(l);if(l>1)expect(levelFromXp(xpForLevel(l)-1)).toBe(l-1);}});
 it("sanitizes invalid XP and clamps max level",()=>{expect(levelFromXp(-2)).toBe(1);expect(levelFromXp(Number.NaN)).toBe(1);expect(levelFromXp(1e9)).toBe(MAX_LEVEL);});
});
describe("derived progress and celebrations",()=>{
 it("shows a new student in the Stone Age",()=>{const p=progressFor(0);expect(p.level).toBe(1);expect(p.era.id).toBe("bato");expect(p.xpToNextLevel).toBe(12);expect(p.nextEra?.id).toBe("tribo");});
 it("detects level-ups and newly unlocked cosmetics",()=>{const d=diffProgress(20,30);expect(d.leveledUp).toBe(true);expect(d.newLevel).toBe(3);expect(d.newlyUnlocked.length).toBeGreaterThan(0);});
 it("detects an era transition",()=>{const threshold=xpForLevel(6);const d=diffProgress(threshold-1,threshold);expect(d.eraAdvanced).toBe(true);expect(d.newEra?.id).toBe("tribo");expect(d.newlyUnlocked.map(c=>c.id)).toContain("frame-tribo");});
 it("does not report XP regressions",()=>{const d=diffProgress(500,100);expect(d.gained).toBe(0);expect(d.newLevel).toBe(levelFromXp(500));});
 it("calculates progress percentages within bounds",()=>{const p=progressFor(100);expect(p.levelPercent).toBeGreaterThanOrEqual(0);expect(p.levelPercent).toBeLessThanOrEqual(100);expect(p.eraPercent).toBeGreaterThanOrEqual(0);expect(p.eraPercent).toBeLessThanOrEqual(100);});
});
