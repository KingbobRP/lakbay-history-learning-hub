import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, Compass, Landmark, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student";
import { StudentDashboard } from "@/components/StudentDashboard";
import heroFigures from "@/assets/home-hero-figures.jpg";
import decoBook from "@/assets/deco-book.png";
import decoQuill from "@/assets/deco-quill.png";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "HISTORIA — Tuklasin ang Nakaraan, Hubugin ang Kinabukasan" },
      { name: "description", content: "Isang makabuluhan at makabagong paglalakbay sa kasaysayan at lipunang Pilipino para sa Baitang 11." },
      { property: "og:title", content: "HISTORIA — Tuklasin ang Nakaraan, Hubugin ang Kinabukasan" },
      { property: "og:description", content: "Unawain ang ating kasaysayan. Kilalanin ang ating pagkakakilanlan. Hubugin ang kinabukasan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const sparkles = [
  { top: "12%", left: "6%", d: "0s" }, { top: "30%", left: "44%", d: "1.2s" }, { top: "8%", left: "38%", d: "2s" },
  { top: "58%", left: "3%", d: "0.6s" }, { top: "18%", left: "92%", d: "1.6s" }, { top: "70%", left: "48%", d: "2.4s" },
];

function Home() {
  const { session } = useStudent();
  return session ? <StudentDashboard /> : <Landing />;
}

function Landing() {
  return (
    <div className="home-page hx">
      <section className="hx-hero">
        {sparkles.map((s, i) => <span key={i} className="hx-spark" style={{ top: s.top, left: s.left, animationDelay: s.d }} aria-hidden>✦</span>)}
        <img src={decoBook} alt="" aria-hidden width={816} height={816} className="hx-deco hx-book" />
        <img src={decoQuill} alt="" aria-hidden width={752} height={896} className="hx-deco hx-quill" />

        <div className="hx-grid mx-auto max-w-6xl px-5 sm:px-8">
          <div className="hx-copy">
            <div className="hx-sun" aria-hidden><span /><Sparkles className="h-5 w-5" /><span /></div>
            <p className="hx-kicker">ANG NAKARAAN AY ATING GABAY</p>
            <h1 className="hx-title">HISTORIA</h1>
            <p className="hx-subtitle">Tuklasin ang Nakaraan.<br />Hubugin ang Kinabukasan.</p>
            <div className="hx-divider" aria-hidden><span />◆<span /></div>
            <p className="hx-competency">PAG-AARAL NG KASAYSAYAN AT LIPUNANG PILIPINO</p>
            <p className="hx-intro">Bawat kuwento ay may aral. Bawat Pilipino ay may bahagi sa kasaysayan. Simulan ang paglalakbay tungo sa mas malalim na pag-unawa sa ating bayan.</p>
            <div className="hx-actions">
              <Button asChild size="lg" className="hx-cta"><Link to="/auth" search={{ mode: "signup" }}>Magsimula <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline" className="hx-login"><Link to="/auth">Mag-login</Link></Button>
            </div>
            <p className="hx-note">Para sa mga mag-aaral ng Baitang 11</p>
          </div>
          <figure className="hx-art">
            <img src={heroFigures} alt="Ilustrasyon ng mga Pilipinong bayani sa harap ng watawat ng Pilipinas at isang lumang simbahan, may kompas, orasang buhangin, at sampaguita" width={1280} height={1024} fetchPriority="high" />
            <figcaption className="hx-art-caption">Kilalanin ang mga kuwento. Unawain ang ating pinagmulan.</figcaption>
          </figure>
        </div>
      </section>

      <section className="hx-values mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="hx-values-heading">
          <p className="eyebrow">HIGIT PA SA PAG-AARAL</p>
          <h2>Ang kasaysayan ay buhay sa bawat isa sa atin.</h2>
          <p>Hindi lang natin inaalala ang nakaraan—natututo tayong mag-isip nang mapanuri, magpahalaga sa ating kultura, at maging bahagi ng mas magandang bukas.</p>
        </div>
        <div className="hx-value-grid">
          <article className="hx-value-card">
            <span className="hx-value-icon"><BookOpenCheck aria-hidden /></span>
            <h3>Matuto nang may saysay</h3>
            <p>Unawain ang mahahalagang pangyayari, tao, at ideyang humubog sa Pilipinas.</p>
          </article>
          <article className="hx-value-card">
            <span className="hx-value-icon"><Compass aria-hidden /></span>
            <h3>Mag-isip nang mapanuri</h3>
            <p>Suriin ang mga sanggunian at tuklasin ang iba't ibang pananaw sa kasaysayan.</p>
          </article>
          <article className="hx-value-card">
            <span className="hx-value-icon"><Landmark aria-hidden /></span>
            <h3>Pahalagahan ang pagka-Pilipino</h3>
            <p>Kilalanin ang ating kultura, pamana, at kolektibong pagkakakilanlan.</p>
          </article>
        </div>
        <p className="hx-mantra">“Ang pag-unawa sa ating pinagmulan ay simula ng paghubog sa ating patutunguhan.”</p>
      </section>
    </div>
  );
}
