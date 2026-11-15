import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/historia-data";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Tungkol sa HISTORIA" },
      { name: "description", content: "Layunin, mithiing pang-edukasyon, at mga gagamit ng HISTORIA, ang digital learning platform para sa Baitang 11." },
      { property: "og:title", content: "Tungkol sa HISTORIA" },
      { property: "og:description", content: "Bakit binuo ang HISTORIA at para kanino ito." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Tungkol sa HISTORIA</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Isang museong madadala, isang aklat na tumutugon.</h1>
      <img src={images.citizens} alt="Mamamayang Pilipino sa isang pampublikong pagtitipon" loading="lazy" width={1600} height={1008} className="photo mt-8 aspect-[16/9] w-full object-cover" />
      <h2 className="mt-10 border-b border-border pb-2 text-2xl">Layunin</h2>
      <p className="mt-3">Ang HISTORIA ay digital learning platform para sa asignaturang <em>Pag-aaral ng Kasaysayan at Lipunang Pilipino</em> sa Baitang 11. Inaayos nito ang mga aralin ayon sa tatlong termino ng DepEd Three-Term Budget of Work upang madaling masundan ng mag-aaral at guro.</p>
      <h2 className="mt-10 border-b border-border pb-2 text-2xl">Mga Mithiing Pang-edukasyon</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>Linangin ang kamalayang pangkasaysayan at kritikal na pagsusuri ng sanggunian.</li>
        <li>Unawain ang pakikibaka ng mga Pilipino bilang ugat ng pambansang pagkakakilanlan.</li>
        <li>Hubugin ang aktibo at responsableng mamamayan para sa likas-kayang pag-unlad.</li>
        <li>Gamitin ang Filipino bilang pangunahing wika ng pagkatuto.</li>
      </ul>
      <h2 className="mt-10 border-b border-border pb-2 text-2xl">Para Kanino</h2>
      <p className="mt-3">Para sa mga mag-aaral ng Baitang 11, mga guro ng Araling Panlipunan na naghahanap ng karagdagang materyal, at mga magulang na gustong sumubaybay sa pag-aaral ng kanilang anak.</p>
      <h2 className="mt-10 border-b border-border pb-2 text-2xl">Paalala sa Nilalaman</h2>
      <p className="mt-3">Ang lingguhang paksa sa bawat aralin ay hango sa DepEd Budget of Work at malinaw na nakamarka. Ang mga paliwanag, halimbawa, at pagsusulit ay karagdagang materyal ng HISTORIA at hindi opisyal na kompetensi ng DepEd. Ang progreso ay naitatala lamang sa device na ginagamit mo.</p>
    </article>
  );
}
