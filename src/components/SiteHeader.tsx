import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/timeline", label: "Timeline" },
  { to: "/quiz", label: "Quiz Center" },
  { to: "/progress", label: "Progress" },
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">Historia</span>
          <span className="hidden font-sans text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:inline">Kasaysayan at Lipunang Pilipino · 11</span>
        </Link>
        <nav className="hidden items-center gap-1 font-sans text-sm lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="rounded-sm px-3 py-2 text-muted-foreground hover:text-ink" activeProps={{ className: "text-primary font-semibold" }}>{n.label}</Link>
          ))}
        </nav>
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-card font-sans lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} onClick={() => setOpen(false)} className="block border-b border-border px-6 py-4 text-base text-ink" activeProps={{ className: "text-primary font-semibold" }}>{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 font-sans text-sm text-muted-foreground sm:px-6">
        <div className="rule-double mb-6" />
        <p className="font-display text-lg text-ink">Historia</p>
        <p className="mt-1">A digital learning resource for Grade 11 Pag-aaral ng Kasaysayan at Lipunang Pilipino.</p>
        <p className="mt-3 text-xs">Images are archival-style illustrations for educational use.</p>
      </div>
    </footer>
  );
}
