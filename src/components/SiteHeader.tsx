import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/curriculum", label: "Kurikulum" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/timeline", label: "Timeline" },
  { to: "/quiz", label: "Quiz Center" },
  { to: "/progress", label: "Progress" },
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
] as const;

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden className="flex h-10 w-10 items-center justify-center border border-accent font-display text-xl font-semibold text-primary-foreground">H</span>
      <span className="leading-none">
        <span className="block font-display text-2xl font-semibold tracking-[0.14em] text-primary-foreground">HISTORIA</span>
        <span className="mt-1 hidden font-sans text-[0.62rem] uppercase tracking-[0.22em] text-accent sm:block">Kasaysayan at Lipunang Pilipino · Baitang 11</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-primary">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="HISTORIA — Home" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className="hidden items-center font-sans text-sm xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="border-b border-transparent px-3 py-2 text-primary-foreground/80 hover:text-primary-foreground" activeProps={{ className: "!border-accent !text-primary-foreground" }}>{n.label}</Link>
          ))}
        </nav>
        <button className="inline-flex h-11 w-11 items-center justify-center border border-primary-foreground/30 text-primary-foreground xl:hidden" aria-label={open ? "Isara ang menu" : "Buksan ang menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div className="h-px bg-accent/60" />
      {open && (
        <nav className="max-h-[80vh] overflow-y-auto bg-primary font-sans xl:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} onClick={() => setOpen(false)} className="block border-b border-primary-foreground/10 px-6 py-4 text-base text-primary-foreground/85" activeProps={{ className: "!text-accent font-semibold" }}>{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 font-sans text-sm sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-primary-foreground/75">Isang digital learning platform para sa Baitang 11 — Pag-aaral ng Kasaysayan at Lipunang Pilipino.</p>
        </div>
        <div>
          <p className="eyebrow !text-accent">Mga Termino</p>
          <ul className="mt-3 space-y-2 text-primary-foreground/80">
            <li><Link to="/curriculum" hash="term-1" className="hover:text-primary-foreground">Kamalayang Pangkasaysayan</Link></li>
            <li><Link to="/curriculum" hash="term-2" className="hover:text-primary-foreground">Pakikibaka at Kamalayang Pilipino</Link></li>
            <li><Link to="/curriculum" hash="term-3" className="hover:text-primary-foreground">Pagkamamamayan at Likas-Kayang Pag-unlad</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-accent">Paalala</p>
          <p className="mt-3 text-primary-foreground/70">Ang mga paksa bawat linggo ay batay sa DepEd Three-Term Budget of Work. Ang mga paliwanag at halimbawa ay karagdagang materyal ng HISTORIA. Ang mga larawan ay archival-style na ilustrasyon.</p>
        </div>
      </div>
    </footer>
  );
}
