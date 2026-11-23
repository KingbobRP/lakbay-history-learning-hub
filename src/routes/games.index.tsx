import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, ArrowRight, Fingerprint, Search, MapPinned, ScrollText, Hourglass, Landmark, Trophy, BadgeCheck, BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gameCatalog } from '@/lib/history-games';
import { images } from '@/lib/historia-data';

const description = 'Siyam na larong pangkasaysayan para sa Baitang 11, kabilang ang Unang Termino Quest na nakabatay sa mga aralin sa kamalayang pangkasaysayan.';
export const Route = createFileRoute('/games/')({
 staticData: { sitemap: true },
 head: () => ({ meta: [{ title: 'Mga Larong Pangkasaysayan — HISTORIA' }, { name: 'description', content: description }, { property: 'og:title', content: 'Mga Larong Pangkasaysayan — HISTORIA' }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: GamesPage,
});
const icons = [BookOpenCheck, Hourglass, Fingerprint, Search, BadgeCheck, MapPinned, ScrollText, Landmark, Trophy];
function GamesPage() {
 return <div className="games-page">
  <section className="relative overflow-hidden bg-primary text-primary-foreground">
   <img src={images.intramuros} alt="Mga pader ng Intramuros, ilustrasyong istilong-arkibo" className="absolute inset-0 h-full w-full object-cover opacity-20" />
   <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"><p className="text-xs font-semibold uppercase text-accent">HISTORIA · Silid ng mga Hamon</p><h1 className="mt-4 max-w-2xl text-4xl text-primary-foreground sm:text-6xl">Mga Larong<br /><span className="italic">Pangkasaysayan</span></h1><p className="mt-5 max-w-lg text-primary-foreground/80">Kilalanin ang mga bayani, sundan ang mga bakas, at tuklasin ang mga lugar na humubog sa ating pagkakakilanlan.</p><p className="mt-8 border-t border-accent/40 pt-4 text-xs text-primary-foreground/70">09 laro <span className="mx-3 text-accent">/</span> 03 antas ng hamon <span className="mx-3 text-accent">/</span> Baitang 11</p></div>
  </section>
  <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8"><div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-accent pb-5"><div><p className="eyebrow mb-2">PILIIN ANG IYONG PAGLALAKBAY</p><h2 className="text-3xl">Piliin ang iyong hamon</h2></div><span className="text-sm text-muted-foreground">Kasaysayan · Kultura · Pagkamamamayan</span></div>
   <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{gameCatalog.map((g,i)=>{
    const Icon=icons[i] ?? Landmark;
    return <article key={g.id} className={g.id === 'term1' ? 'game-card game-card-featured flex flex-col border border-accent bg-card p-6 transition-all duration-200' : 'game-card flex flex-col border border-border bg-card p-6 transition-all duration-200'}><div className="flex items-center justify-between"><span className={g.id === 'term1' ? 'game-icon inline-flex h-12 w-12 items-center justify-center border border-accent bg-primary text-primary-foreground' : 'game-icon inline-flex h-12 w-12 items-center justify-center border border-border bg-secondary text-primary'}><Icon className="h-6 w-6" strokeWidth={1.4} /></span><span className="font-display text-2xl text-accent">{String(i+1).padStart(2,'0')}</span></div><p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.category}</p><h3 className="mt-2 text-2xl">{g.title}</h3><p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">{g.description}</p><Button asChild variant="link" className="mt-auto min-h-11 justify-between border-t border-border px-0 pt-4"><Link to="/games/$gameId" params={{gameId:g.id}}>Buksan ang laro <ArrowUpRight /></Link></Button></article>;
   })}</div>
   <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-accent pt-6"><p className="max-w-xl text-sm text-muted-foreground">Karagdagang pagsasanay ng HISTORIA. Ang mga laro ay hindi opisyal na pagtataya ng DepEd.</p><Button asChild variant="outline" className="min-h-11"><Link to="/dashboard">Balikan ang mga aralin <ArrowRight /></Link></Button></div>
  </section>
 </div>;
}