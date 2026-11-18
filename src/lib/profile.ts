import { useEffect, useState } from "react";

/** Student profile — full name only plus class details; no email or phone. */
export type Profile = { fullName: string; age: string; gender: string; section: string };
const KEY = "historia-profile-v1";
const EVENT = "historia-profile";

function read(): Profile | null {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || "null");
    return p && typeof p.fullName === "string" && p.fullName.trim() ? p : null;
  } catch { return null; }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setProfile(read()); setReady(true);
    const on = () => setProfile(read());
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  const save = (p: Profile) => {
    try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
    window.dispatchEvent(new Event(EVENT));
  };
  return { profile, ready, save };
}
