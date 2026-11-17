import { useEffect, useState, type CSSProperties } from "react";

/** Brief confetti burst shown once when it mounts; skipped for reduced-motion users. */
export function Celebration({ label = "Mahusay!" }: { label?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 1400);
    return () => window.clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <span aria-hidden className="celebration">
      {Array.from({ length: 16 }, (_, i) => (
        <i key={i} style={{ "--a": `${(i * 360) / 16}deg`, "--d": `${46 + (i % 3) * 16}px` } as CSSProperties} />
      ))}
      <b>{label}</b>
    </span>
  );
}
