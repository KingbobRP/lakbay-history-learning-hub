import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student";
import { StudentDashboard } from "@/components/StudentDashboard";
import heroFigures from "@/assets/home-hero-figures.jpg";
import mascot from "@/assets/home-mascot.png";
import decoBook from "@/assets/deco-book.png";
import decoQuill from "@/assets/deco-quill.png";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Pag-aaral ng Kasaysayan at Lipunang Pilipino — HISTORIA" },
      { name: "description", content: "Digital na plataporma ng pagkatuto para sa Baitang 11 Pag-aaral ng Kasaysayan at Lipunang Pilipino, batay sa tatlong termino ng DepEd." },
      { property: "og:title", content: "Pag-aaral ng Kasaysayan at Lipunang Pilipino — HISTORIA" },
      { property: "og:description", content: "Tuklasin ang mayamang kasaysayan ng Pilipinas: mga aralin, pagsusulit, at laro para sa Baitang 11." },
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
            <h1 className="hx-title">HISTORIA</h1>
            <p className="hx-subtitle">Pag-aaral ng Kasaysayan at Lipunang Pilipino</p>
            <div className="hx-divider" aria-hidden><span />◆<span /></div>
            <div className="hx-competency">
              <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-accent">Pangunahing Kasanayan</p>
              <p>Nasusuri ang mga pangunahing yugto, pamana, at pagbabago sa kasaysayan at lipunang Pilipino mula sa sinaunang pamayanan hanggang sa kontemporaryong panahon upang mahubog ang mapanuring kamalayang pangkasaysayan.</p>
            </div>
            <p className="hx-intro">Tuklasin ang mayamang kasaysayan ng Pilipinas at alamin ang ating kultura, bayan, at pagkakakilanlan.</p>
            <Button asChild size="lg" className="hx-cta"><Link to="/dashboard">Simulan ang Pag-aaral <ArrowRight /></Link></Button>
          </div>
          <figure className="hx-art">
            <img src={heroFigures} alt="Ilustrasyon ng mga Pilipinong bayani sa harap ng watawat ng Pilipinas at isang lumang simbahan, may kompas, orasang buhangin, at sampaguita" width={1280} height={1024} fetchPriority="high" />
          </figure>
        </div>
      </section>

      <section className="hx-panel-wrap mx-auto max-w-6xl px-4 sm:px-8">
        <div className="hx-panel">
          <img src={mascot} alt="Masayahing mag-aaral na may hawak na aklat" width={816} height={816} className="hx-mascot" />
          <div className="hx-welcome"><span>Maligayang pagdating,</span><strong>Mag-aaral!</strong></div>
          <div className="hx-empty">
            <p>Mag-log in gamit ang iyong buong pangalan, class code, at PIN upang makita ang iyong profile, puntos, at pag-unlad.</p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/auth">Mag-log in</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
