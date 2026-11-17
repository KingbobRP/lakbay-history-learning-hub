import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, BookOpen, Landmark, ClipboardList, ChartNoAxesCombined, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images, lessons, terms } from "@/lib/historia-data";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Pag-aaral ng Kasaysayan at Lipunang Pilipino — HISTORIA" },
      { name: "description", content: "Digital na plataporma ng pagkatuto para sa Baitang 11 Pag-aaral ng Kasaysayan at Lipunang Pilipino, batay sa tatlong termino ng DepEd." },
      { property: "og:title", content: "Pag-aaral ng Kasaysayan at Lipunang Pilipino — HISTORIA" },
      { property: "og:description", content: "Mga aralin, talaang-panahon, at pagsusulit para sa Baitang 11 Kasaysayan at Lipunang Pilipino." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const learningTools = [
  { title: "Mga Aralin", subtitle: "Pag-unawa sa ating nakaraan", to: "/dashboard", icon: BookOpen },
  { title: "Talaang-Panahon", subtitle: "Mga yugto ng kasaysayan", to: "/timeline", icon: Landmark },
  { title: "Pagsusulit", subtitle: "Sukatin ang iyong kaalaman", to: "/quiz", icon: ClipboardList },
  { title: "Pag-unlad", subtitle: "Ang iyong paglalakbay", to: "/progress", icon: ChartNoAxesCombined },
] as const;

function Home() {
  return (
    <div className="home-page">
      <section className="home-cover relative overflow-hidden bg-cover text-cover-foreground">
        <img src={images.terraces} alt="Mga magsasakang naglalakad sa hagdan-hagdang palayan ng Kordilyera" width={1600} height={1008} className="cover-image" fetchPriority="high" />
        <div className="mx-auto max-w-6xl px-5 pb-6 pt-8 sm:px-8 sm:pb-10 sm:pt-16 lg:pt-20">
          <div className="flex items-center gap-3 font-sans text-xs font-semibold uppercase sm:text-sm">
            <span className="h-px w-8 bg-accent" />
            <span className="text-cover-muted">Baitang 11 · Kasaysayan at Lipunang Pilipino</span>
          </div>
          <h1 className="home-title mt-6 max-w-4xl leading-[1.05]">Pag-aaral ng Kasaysayan at Lipunang Pilipino</h1>
          <div className="home-competency mt-5 max-w-2xl">
            <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent">Kasanayang Pampagkatuto</p>
            <p className="mt-1 font-display text-xl italic leading-snug text-cover-foreground sm:text-2xl">Nasusuri ang mga sanggunian ng kasaysayan at nailalapat ang kritikal na pananaw sa pag-unawa ng nakaraan</p>
          </div>
          <p className="home-intro mt-5 max-w-lg text-base leading-relaxed text-cover-muted">HISTORIA — isang digital na plataporma ng pagkatuto na naglalayong palalimin ang pag-unawa ng mga mag-aaral sa kasaysayan, kultura, pakikibaka, at pagkamamamayan ng mga Pilipino.</p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <Button asChild size="lg" className="h-12 bg-accent px-5 font-semibold text-accent-foreground shadow-none hover:bg-accent/90"><Link to="/dashboard">Simulan ang Pag-aaral <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-cover-foreground/40 bg-transparent px-5 text-cover-foreground shadow-none hover:bg-cover-foreground/10 hover:text-cover-foreground"><Link to="/curriculum">Tuklasin ang Kurikulum <ArrowUpRight /></Link></Button>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-cover-foreground/20 pt-4 sm:mt-14 sm:pt-5">
            <p className="font-sans text-xs text-cover-muted">03 Termino <span className="mx-3 text-accent">/</span> {String(lessons.length).padStart(2, "0")} Aralin <span className="mx-3 text-accent">/</span> 30 Linggo</p>
            <p className="font-sans text-xs italic text-cover-muted">Kordilyera, Pilipinas · Ilustrasyong istilong-arkibo</p>
          </div>
        </div>
      </section>

      <section className="learning-tools border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:px-8 md:grid-cols-4">
          {learningTools.map(({ title, subtitle, to, icon: Icon }, i) => (
            <Link key={to} to={to} className={`group flex items-center gap-3 py-5 transition-colors hover:text-primary sm:py-7 ${i % 2 === 1 ? "border-l border-border pl-4" : "pr-3"} ${i > 1 ? "border-t border-border md:border-t-0 md:border-l md:pl-5" : ""}`}>
              <Icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.4} />
              <div className="min-w-0"><h2 className="text-lg sm:text-xl">{title}</h2><p className="mt-1 hidden font-sans text-xs text-muted-foreground sm:block">{subtitle}</p></div>
              <ArrowUpRight className="ml-auto hidden h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 lg:block" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 border-b border-accent px-5 py-7 sm:px-8">
        <div className="flex items-center gap-4"><Gamepad2 className="h-8 w-8 shrink-0 text-primary" strokeWidth={1.3} /><div><h2 className="text-2xl">Mga Larong Pangkasaysayan</h2><p className="mt-1 text-sm text-muted-foreground">Walong hamon sa kasaysayan, kultura, at pagkamamamayan.</p></div></div>
        <Button asChild variant="outline" className="min-h-12"><Link to="/games">Tuklasin ang mga laro <ArrowRight /></Link></Button>
      </section>

      <section className="home-curriculum mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col justify-between gap-4 border-b border-primary/40 pb-6 sm:flex-row sm:items-end">
          <div><p className="eyebrow">Ang Kurikulum</p><h2 className="mt-3 text-3xl sm:text-4xl">Tatlong Termino ng Pag-aaral</h2></div>
          <p className="max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">Inayos ayon sa Tatlong-Terminong<br />Badyet ng Gawain ng DepEd.</p>
        </div>
        <div className="grid gap-8 pt-8 md:grid-cols-3 md:gap-7">
          {terms.map((t, i) => (
            <article key={t.id} className="term-item group">
              <Link to="/curriculum" hash={`term-${t.id}`} className="relative block overflow-hidden" aria-label={t.title}>
                <img src={t.image} alt={t.title} loading="lazy" width={1600} height={1008} className="term-image aspect-[3/2] w-full object-cover" />
                <span className="absolute bottom-0 left-0 bg-primary px-4 py-2 font-sans text-xs font-semibold uppercase text-primary-foreground">{t.name}</span>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-card text-primary"><ArrowUpRight className="h-4 w-4" /></span>
              </Link>
              <div className="mt-5 flex items-start gap-4"><span className="section-number text-5xl">{String(i + 1).padStart(2, "0")}</span><div><p className="font-sans text-xs text-muted-foreground">10 linggo · {lessons.filter(l => l.term === t.id).length} aralin</p><h3 className="mt-2 text-2xl leading-tight">{t.title}</h3></div></div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.blurb}</p>
              <Link to="/curriculum" hash={`term-${t.id}`} className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-accent font-sans text-sm font-semibold text-primary">Tingnan ang mga aralin <ArrowRight className="h-4 w-4" /></Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}