import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { applyAward, XP_EVENT, XP_RULES, type Rewards } from "./rewards";
import { emptyAdventure, type Adventure } from "./adventure";

export type Progress = { completed: string[]; scores: Record<string, { best: number; last: number; attempts: number }>; mastered: string[]; lastLesson?: string | null; adventure: Adventure };
export type Profile = { full_name: string; age: number | null; gender: string; class_code: string; section: string; avatar: string; username: string | null };
export type Activity = { id: string; kind: string; label: string; reward_id: string | null; score: number | null; points: number; created_at: string };

const emptyProgress: Progress = { completed: [], scores: {}, mastered: [], lastLesson: null, adventure: emptyAdventure };
const LOCAL_P = "historia-progress-v1";
const LOCAL_R = "historia-rewards-v1";

function readLocal<T>(key: string, fallback: T): T {
  try { return { ...fallback, ...JSON.parse(localStorage.getItem(key) || "{}") }; } catch { return fallback; }
}
function writeLocal(key: string, v: unknown) { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ } }

type Ctx = {
  ready: boolean;
  session: Session | null;
  profile: Profile | null;
  progress: Progress;
  activity: Activity[];
  rewards: Rewards;
  saveProgress: (fn: (p: Progress) => Progress) => void;
  award: (rewardId: string, label: string) => void;
  log: (kind: string, label: string, score?: number) => void;
  updateProfile: (patch: Partial<Profile>) => Promise<string | null>;
  resetProgress: () => Promise<void>;
  signOut: () => Promise<void>;
};
const StudentCtx = createContext<Ctx | null>(null);

const pointsFor = (id: string) => (XP_RULES as Record<string, number>)[id.split(":")[0] ?? ""] ?? 0;

export function StudentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [localRewards, setLocalRewards] = useState<Rewards>({ xp: 0, awarded: [] });
  const uid = session?.user.id ?? null;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); if (!data.session) setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") setSession(s);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const loadRemote = useCallback(async (id: string) => {
    const [p, pr, a] = await Promise.all([
      supabase.from("profiles").select("full_name, age, gender, class_code, section, avatar, username").eq("id", id).maybeSingle(),
      supabase.from("student_progress").select("*").eq("user_id", id).maybeSingle(),
      supabase.from("activity_log").select("id, kind, label, reward_id, score, points, created_at").eq("user_id", id).order("created_at", { ascending: false }).limit(500),
    ]);
    setProfile(p.data ?? null);
    if (pr.data) {
      setProgress({ completed: pr.data.completed, mastered: pr.data.mastered, scores: (pr.data.scores ?? {}) as Progress["scores"], lastLesson: pr.data.last_lesson, adventure: { ...emptyAdventure, ...((pr.data.adventure ?? {}) as Adventure) } });
    } else {
      // first sign-in: carry over anything done as a guest on this device
      const local = readLocal(LOCAL_P, emptyProgress);
      setProgress(local);
      await supabase.from("student_progress").insert({ user_id: id, completed: local.completed, mastered: local.mastered, scores: local.scores, last_lesson: local.lastLesson ?? null, adventure: local.adventure as never });
    }
    setActivity((a.data ?? []) as Activity[]);
    setReady(true);
  }, []);

  useEffect(() => {
    if (uid) { setReady(false); void loadRemote(uid); }
    else {
      setProfile(null); setActivity([]);
      setProgress(readLocal(LOCAL_P, emptyProgress));
      const r = readLocal<Rewards>(LOCAL_R, { xp: 0, awarded: [] });
      setLocalRewards({ xp: Number(r.xp) || 0, awarded: Array.isArray(r.awarded) ? r.awarded : [] });
    }
  }, [uid, session?.user.email, loadRemote]);

  const saveProgress = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = fn(prev);
      if (uid) {
        void supabase.from("student_progress").upsert({ user_id: uid, completed: next.completed, mastered: next.mastered, scores: next.scores, last_lesson: next.lastLesson ?? null, adventure: next.adventure as never, updated_at: new Date().toISOString() });
      } else writeLocal(LOCAL_P, next);
      return next;
    });
  }, [uid]);

  const notify = (points: number) => window.dispatchEvent(new CustomEvent(XP_EVENT, { detail: { points } }));

  const award = useCallback((rewardId: string, label: string) => {
    if (uid) {
      if (activity.some((a) => a.reward_id === rewardId)) return;
      void supabase.rpc("award_points", { _reward_id: rewardId, _label: label }).then(({ data, error }) => {
        if (error) {
          console.error("XP award failed:", error);
          return;
        }
        const pts = Number(data) || 0;
        if (pts > 0) {
          setActivity((list) => [{ id: crypto.randomUUID(), kind: "points", label, reward_id: rewardId, score: null, points: pts, created_at: new Date().toISOString() }, ...list]);
          notify(pts);
        }

      });
    } else {
      setLocalRewards((r) => {
        const next = applyAward(r, rewardId, pointsFor(rewardId));
        if (!next) return r;
        writeLocal(LOCAL_R, next); notify(next.xp - r.xp);
        return next;
      });
    }
  }, [uid, activity]);

  const log = useCallback((kind: string, label: string, score?: number) => {
    if (!uid) return;
    const row = { user_id: uid, kind, label: label.slice(0, 200), score: score ?? null };
    setActivity((list) => [{ id: crypto.randomUUID(), kind, label: row.label, reward_id: null, score: row.score, points: 0, created_at: new Date().toISOString() }, ...list]);
    void supabase.from("activity_log").insert(row);
  }, [uid]);

  const updateProfile = useCallback(async (patch: Partial<Profile>) => {
    if (!uid) return "Hindi ka naka-log in.";
    const { error } = await supabase.from("profiles").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", uid);
    if (error) return "Hindi nai-save. Subukang muli.";
    setProfile((p) => (p ? { ...p, ...patch } : p));
    return null;
  }, [uid]);

  const resetProgress = useCallback(async () => {
    saveProgress(() => emptyProgress);
    if (!uid) { writeLocal(LOCAL_R, { xp: 0, awarded: [] }); setLocalRewards({ xp: 0, awarded: [] }); }
  }, [uid, saveProgress]);

  const signOut = useCallback(async () => { await supabase.auth.signOut(); }, []);

  const rewards = useMemo<Rewards>(() => uid
    ? { xp: activity.reduce((n, a) => n + a.points, 0), awarded: activity.filter((a) => a.reward_id).map((a) => a.reward_id!) }
    : localRewards, [uid, activity, localRewards]);

  const value = useMemo(() => ({ ready, session, profile, progress, activity, rewards, saveProgress, award, log, updateProfile, resetProgress, signOut }),
    [ready, session, profile, progress, activity, rewards, saveProgress, award, log, updateProfile, resetProgress, signOut]);
  return <StudentCtx.Provider value={value}>{children}</StudentCtx.Provider>;
}

export function useStudent() {
  const c = useContext(StudentCtx);
  if (!c) throw new Error("useStudent outside StudentProvider");
  return c;
}
