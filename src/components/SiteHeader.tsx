import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Home, BookOpen, Trophy, ChartNoAxesCombined, Settings, Clock3, Gamepad2, Search, Landmark, ClipboardList } from "lucide-react";
import { useStudent } from "@/lib/student";
import { AvatarImg } from "@/components/AvatarPicker";
import { avatarSrc } from "@/lib/avatars";
import { Button } from "@/components/ui/button";
import { XpBadge } from "@/components/XpBadge";

const nav = [
 { to: "/", label: "Home", icon: Home },
 { to: "/dashboard", label: "Learning Modules", icon: BookOpen },
 { to: "/timeline", label: "Historical Timeline", icon: Clock3 },
 { to: "/curriculum", label: "Source Archives", icon: Landmark },
 { to: "/search", label: "Explore & Search", icon: Search },
 { to: "/games", label: "Practice Center", icon: Gamepad2 },
 { to: "/achievements", label: "Achievements", icon: Trophy },
 { to: "/progress", label: "Study Progress", icon: ChartNoAxesCombined },
 { to: "/profile", label: "Profile & Settings", icon: Settings },
] as const;

export function Logo() {
 return <span className="historia-logo flex items-center gap-3"><span aria-hidden className="logo-monogram flex h-10 w-10 shrink-0 items-center justify-center border border-accent font-display text-2xl italic text-accent">H</span><span className="min-w-0 leading-none"><span className="block font-display text-2xl font-semibold text-primary-foreground">HISTORIA</span><span className="mt-1 hidden font-sans text-[0.6rem] uppercase text-accent sm:block">Kasaysayan at Lipunang Pilipino</span></span></span>;
}
export function SiteHeader() {
 const [open,setOpen]=useState(false); const {session}=useStudent();
 if(session) return <>
  <aside className="historia-sidebar hidden lg:flex" aria-label="HISTORIA navigation">
   <Link to="/" className="historia-sidebar-brand"><span className="historia-brand-mark">✦</span><span><strong>HISTORIA</strong><small>REBORN</small></span></Link>
   <nav className="historia-sidebar-nav" aria-label="Main navigation">{nav.map(n=><Link key={n.to} to={n.to} activeOptions={{exact:n.to==="/"} } activeProps={{className:"is-active"}}><n.icon size={19}/><span>{n.label}</span></Link>)}</nav>
   <div className="historia-sidebar-quote">“A people without the knowledge of their past is a people without a future.”<small>— Dr. Jose Rizal</small></div><div className="historia-sidebar-bottom"><XpBadge/></div>
  </aside>
  <header className="historia-mobile-header lg:hidden"><Link to="/"><Logo/></Link><div className="flex items-center gap-2"><XpBadge/><Button variant="ghost" size="icon" aria-label={open?"Close navigation":"Open navigation"} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button></div>{open&&<nav className="historia-mobile-nav" aria-label="Mobile navigation">{nav.map(n=><Link key={n.to} to={n.to} onClick={()=>setOpen(false)}><n.icon size={18}/>{n.label}</Link>)}</nav>}</header>
 </>;
 return <header className="site-header sticky top-0 z-40 bg-primary"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8"><Link to="/" aria-label="HISTORIA — Tahanan"><Logo/></Link><div className="flex items-center gap-2"><Link to="/auth" className="min-h-9 flex items-center border border-accent/70 px-3 font-sans text-sm text-accent hover:bg-accent/15">Mag-login</Link><Link to="/auth" search={{mode:"signup"}} className="min-h-9 flex items-center bg-accent px-3 font-sans text-sm font-semibold text-primary hover:bg-accent/85">Magsimula</Link></div></div><div className="h-px bg-accent/60"/></header>;
}
export function SiteFooter() {
 return <footer className="border-t-2 border-accent bg-primary text-primary-foreground"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 font-sans text-sm sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]"><div><Logo/><p className="mt-4 max-w-sm text-primary-foreground/75">Isang digital na plataporma ng pagkatuto para sa Baitang 11 — Pag-aaral ng Kasaysayan at Lipunang Pilipino.</p></div><div><p className="eyebrow !text-accent">Galugarin</p><ul className="mt-3 space-y-2 text-primary-foreground/80"><li><Link to="/curriculum">Kurikulum</Link></li><li><Link to="/timeline">Talaang-Panahon</Link></li><li><Link to="/games">Mga Laro</Link></li><li><Link to="/search">Maghanap</Link></li><li><Link to="/about">Tungkol sa HISTORIA</Link></li></ul></div><div><p className="eyebrow !text-accent">Paalala</p><p className="mt-3 text-primary-foreground/70">Ang mga paksa bawat linggo ay batay sa Tatlong-Terminong Badyet ng Gawain ng DepEd. Ang mga paliwanag at halimbawa ay karagdagang materyal ng HISTORIA.</p></div></div></footer>;
}