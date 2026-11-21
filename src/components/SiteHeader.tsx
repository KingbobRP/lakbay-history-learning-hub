import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, UserRound, Home, BookOpen, ClipboardList, Trophy, ChartNoAxesCombined, Settings, LogIn } from "lucide-react";
import { useStudent } from "@/lib/student";
import { avatarSrc } from "@/lib/avatars";
import { AvatarImg } from "@/components/AvatarPicker";
import { Button } from "@/components/ui/button";
import { XpBadge } from "@/components/XpBadge";

const nav = [
  { to: "/", label: "Tahanan", icon: Home },
  { to: "/dashboard", label: "Aralin", icon: BookOpen },
  { to: "/quiz", label: "Pagsusulit", icon: ClipboardList },
  { to: "/achievements", label: "Gantimpala", icon: Trophy },
  { to: "/progress", label: "Pag-unlad", icon: ChartNoAxesCombined },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/settings", label: "Mga Setting", icon: Settings },
] as const;

export function Logo() {
  return (
    <span className="historia-logo flex items-center gap-3">
      <span aria-hidden className="logo-monogram flex h-10 w-10 shrink-0 items-center justify-center border border-accent font-display text-2xl italic text-accent">H</span>
      <span className="min-w-0 leading-none">
        <span className="block font-display text-2xl font-semibold text-primary-foreground">HISTORIA</span>
        <span className="mt-1 hidden font-sans text-[0.6rem] uppercase text-accent sm:block">Kasaysayan at Lipunang Pilipino</span>
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { session, profile } = useStudent();
  return (
    <header className="site-header sticky top-0 z-40 bg-primary">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link to="/" aria-label="HISTORIA — Tahanan" onClick={() => setOpen(false)}><Logo /></Link>
        <nav className="desktop-navigation hidden items-center font-sans text-sm lg:flex" aria-label="Pangunahing nabigasyon">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} title={n.label} className="flex items-center gap-1.5 border-b-2 border-transparent !px-2 py-2 text-primary-foreground/75 transition-colors hover:text-primary-foreground" activeProps={{ className: "!border-accent !text-accent" }}><n.icon className="h-4 w-4" /><span className="hidden xl:inline">{n.label}</span></Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <XpBadge />
          {session
            ? <Link to="/profile" aria-label="Profile ng mag-aaral" className="hidden lg:flex"><AvatarImg src={avatarSrc(profile?.avatar)} size={40} /></Link>
            : <Link to="/auth" className="hidden min-h-10 items-center gap-1.5 border border-accent px-3 font-sans text-sm text-accent hover:bg-accent/15 lg:flex"><LogIn className="h-4 w-4" />Mag-log in</Link>}
          <Button variant="ghost" size="icon" className="h-11 w-11 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground lg:hidden" aria-label={open ? "Isara ang nabigasyon" : "Buksan ang nabigasyon"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <div className="h-px bg-accent/60" />
      {open && (
        <nav className="bg-primary font-sans lg:hidden" aria-label="Nabigasyon sa telepono">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} onClick={() => setOpen(false)} className="flex items-center gap-3 border-b border-primary-foreground/10 px-6 py-4 text-base text-primary-foreground/85" activeProps={{ className: "!text-accent font-semibold" }}><n.icon className="h-5 w-5" />{n.label}</Link>
          ))}
          {!session && <Link to="/auth" onClick={() => setOpen(false)} className="flex items-center gap-3 px-6 py-4 text-base text-accent"><LogIn className="h-5 w-5" />Mag-log in</Link>}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-accent bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 font-sans text-sm sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-primary-foreground/75">Isang digital na plataporma ng pagkatuto para sa Baitang 11 — Pag-aaral ng Kasaysayan at Lipunang Pilipino.</p>
        </div>
        <div>
          <p className="eyebrow !text-accent">Galugarin</p>
          <ul className="mt-3 space-y-2 text-primary-foreground/80">
            <li><Link to="/curriculum" className="hover:text-primary-foreground">Kurikulum</Link></li>
            <li><Link to="/timeline" className="hover:text-primary-foreground">Talaang-Panahon</Link></li>
            <li><Link to="/games" className="hover:text-primary-foreground">Mga Laro</Link></li>
            <li><Link to="/search" className="hover:text-primary-foreground">Maghanap</Link></li>
            <li><Link to="/about" className="hover:text-primary-foreground">Tungkol sa HISTORIA</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow !text-accent">Paalala</p>
          <p className="mt-3 text-primary-foreground/70">Ang mga paksa bawat linggo ay batay sa Tatlong-Terminong Badyet ng Gawain ng DepEd. Ang mga paliwanag at halimbawa ay karagdagang materyal ng HISTORIA. Ang ilang larawan ay ilustrasyong istilong-arkibo; ang iba ay tunay na larawan mula sa Pambansang Museo at Wikimedia Commons.</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-primary-foreground/15 px-5 py-5 font-sans text-xs text-primary-foreground/60 sm:px-6"><span>HISTORIA · Kasaysayan, Kultura, at Pagkakakilanlan</span><span>Baitang 11</span></div>
    </footer>
  );
}
