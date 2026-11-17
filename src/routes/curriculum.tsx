import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons, terms } from "@/lib/historia-data";

export const Route = createFileRoute("/curriculum")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Kurikulum — HISTORIA" },
      { name: "description", content: "Ang tatlong termino at lingguhang paksa ng Baitang 11 Pag-aaral ng Kasaysayan at Lipunang Pilipino ayon sa Badyet ng Gawain ng DepEd." },
      { property: "og:title", content: "Kurikulum — HISTORIA" },
      { property: "og:description", content: "Tatlong termino, lingguhang paksa, batay sa Tatlong-Terminong Badyet ng Gawain ng DepEd." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Curriculum,
});

function Curriculum() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Balangkas ng Kurso</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Ang Kurikulum</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">Ang mga paksa sa ibaba ay inayos ayon sa Tatlong-Terminong Badyet ng Gawain ng DepEd para sa Baitang 11. Ang nakasulat sa kolum na <strong className="text-foreground">"Paksa ayon sa Badyet ng Gawain"</strong> ay ang opisyal na lingguhang paksa; ang lahat ng paliwanag sa loob ng mga aralin ay karagdagang materyal ng HISTORIA.</p>

      {terms.map((t) => (
        <section key={t.id} id={`term-${t.id}`} className="mt-14 scroll-mt-24">
          <div className="border-b-2 border-primary pb-3">
            <p className="eyebrow">{t.name}</p>
            <h2 className="mt-1 text-3xl uppercase tracking-wide">{t.title}</h2>
          </div>
          <table className="w-full font-sans text-sm">
            <thead className="sr-only sm:not-sr-only">
              <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="py-3 pr-4 font-semibold">Linggo</th>
                <th className="py-3 pr-4 font-semibold">Paksa ayon sa Badyet ng Gawain</th>
                <th className="py-3 font-semibold"><span className="sr-only">Aralin</span></th>
              </tr>
            </thead>
            <tbody>
              {lessons.filter((l) => l.term === t.id).map((l) => (
                <tr key={l.id} className="flex flex-col border-b border-border py-4 sm:table-row sm:py-0">
                  <td className="whitespace-nowrap font-semibold text-ink sm:py-4 sm:pr-4 sm:align-top">Linggo {l.weeks}</td>
                  <td className="py-1 text-base text-foreground sm:py-4 sm:pr-4">{l.competency}</td>
                  <td className="sm:py-4 sm:text-right sm:align-top"><Link to="/lessons/$lessonId" params={{ lessonId: l.id }} className="inline-flex min-h-11 items-center whitespace-nowrap font-semibold text-primary underline decoration-accent underline-offset-4">Buksan ang aralin →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
