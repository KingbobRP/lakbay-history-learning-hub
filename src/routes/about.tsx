import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/historia-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Historia" },
      { name: "description", content: "The purpose, goals and intended users of Historia." },
      { property: "og:title", content: "About Historia" },
      { property: "og:description", content: "Why Historia was made and who it serves." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">Tungkol sa Historia</p>
      <h1 className="mt-3 text-4xl text-ink sm:text-5xl">A museum you can carry, a textbook that responds.</h1>
      <img src={images.revolution} alt="Revolutionary soldiers, archival-style photograph" loading="lazy" width={1200} height={800} className="photo mt-8 aspect-[16/9] w-full object-cover" />
      <h2 className="mt-10 text-2xl text-ink">Purpose</h2>
      <p className="mt-3 leading-[1.75]">Historia is a digital learning resource for Grade 11 Pag-aaral ng Kasaysayan at Lipunang Pilipino. It organizes the course into weekly lessons and pairs each with a timeline, quizzes and a personal progress record.</p>
      <h2 className="mt-8 text-2xl text-ink">Educational goals</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
        <li>Develop historical thinking through primary and secondary sources.</li>
        <li>Understand Philippine society from pre-colonial times to the present.</li>
        <li>Connect the past to Filipino identity and citizenship.</li>
        <li>Encourage self-paced review with immediate feedback.</li>
      </ul>
      <h2 className="mt-8 text-2xl text-ink">Intended users</h2>
      <p className="mt-3 leading-[1.75]">Senior high school students, teachers preparing lessons, and anyone seeking a clear introduction to Philippine history.</p>
    </article>
  );
}
