import { createFileRoute, Link } from "@tanstack/react-router";
import { images, lessons, terms } from "@/lib/historia-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HISTORIA: Kasaysayan, Kultura, at Pagkakakilanlan" },
      { name: "description", content: "Digital learning platform para sa Grade 11 Pag-aaral ng Kasaysayan at Lipunang Pilipino, batay sa tatlong termino ng DepEd." },
      { property: "og:title", content: "HISTORIA: Kasaysayan, Kultura, at Pagkakakilanlan" },
      { property: "og:description", content: "Mga aralin, timeline, at pagsusulit para sa Baitang 11 Kasaysayan at Lipunang Pilipino." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
          <div>
            <p className="eyebrow">Baitang 11 · Pag-aaral ng Kasaysayan at Lipunang Pilipino</p>
            <h1 className="mt-5 text-[2.6rem] sm:text-6xl">HISTORIA: <span className="italic">Kasaysayan, Kultura, at Pagkakakilanlan</span></h1>
            <div className="mt-6 h-px w-20 bg-accent" />
            <p className="mt-6 max-w-xl text-lg text-foreground">Isang digital learning platform na naglalayong palalimin ang pag-unawa ng mga mag-aaral sa kasaysayan, kultura, pakikibaka, at pagkamamamayan ng mga Pilipino.</p>
            <div className="mt-8 flex flex-col gap-3 font-sans sm:flex-row">
              <Link to="/dashboard" className="inline-flex min-h-12 items-center justify-center bg-primary px-6 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/90">Start Learning</Link>
              <Link to="/curriculum" className="inline-flex min-h-12 items-center justify-center border border-primary px-6 text-sm font-semibold uppercase tracking-[0.12em] text-primary hover:bg-card">Explore the Curriculum</Link>
            </div>
          </div>
          <figure>
            <img src={images.terraces} alt="Mga magsasakang naglalakad sa hagdan-hagdang palayan ng Kordilyera" width={1600} height={1008} className="photo aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-3 border-l-2 border-accent pl-3 font-sans text-xs text-muted-foreground">Hagdan-hagdang palayan ng Kordilyera — pamana ng kaalaman, pagtutulungan, at pag-angkop sa kalikasan.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-4 border-b border-primary pb-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Ang Kurikulum</p>
            <h2 className="mt-2 text-4xl">Tatlong Termino ng Pag-aaral</h2>
          </div>
          <p className="max-w-md font-sans text-sm text-muted-foreground">Inayos ayon sa DepEd Three-Term Budget of Work — {lessons.length} aralin sa loob ng 30 linggo.</p>
        </div>
        <div className="grid md:grid-cols-3">
          {terms.map((t, i) => (
            <article key={t.id} className={`py-8 md:px-6 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : "md:pl-0"}`}>
              <img src={t.image} alt={t.title} loading="lazy" width={1600} height={1008} className="photo aspect-[3/2] w-full object-cover" />
              <p className="eyebrow mt-5">{t.name}</p>
              <h3 className="mt-2 text-2xl">{t.title}</h3>
              <p className="mt-3 text-[0.98rem] text-muted-foreground">{t.blurb}</p>
              <Link to="/curriculum" hash={`term-${t.id}`} className="mt-4 inline-flex min-h-11 items-center font-sans text-sm font-semibold text-primary underline decoration-accent underline-offset-4">Tingnan ang mga aralin →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          {[
            ["Mga Aralin", "Bawat linggo ay may layunin, paliwanag, halimbawa, at maikling pagtataya.", "/dashboard"],
            ["Timeline", "Mahahalagang petsa mula sinaunang panahon hanggang kasalukuyan.", "/timeline"],
            ["Quiz Center", "Sampung tanong bawat termino na may agarang puna at paliwanag.", "/quiz"],
            ["Progress", "Itala ang natapos na aralin at iskor sa pagsusulit.", "/progress"],
          ].map(([h, d, to]) => (
            <Link key={h} to={to as "/dashboard"} className="block border-t-2 border-accent pt-4 hover:bg-background">
              <h3 className="text-xl">{h}</h3>
              <p className="mt-2 font-sans text-sm text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
