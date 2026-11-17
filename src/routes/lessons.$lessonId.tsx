import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { lessons, terms } from "@/lib/historia-data";
import { scoreQuiz, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/lessons/$lessonId")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const lesson = lessons.find((l) => l.id === params.lessonId);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.lesson.title} — HISTORIA` },
          { name: "description", content: loaderData.lesson.summary },
          { property: "og:title", content: `${loaderData.lesson.title} — HISTORIA` },
          { property: "og:description", content: loaderData.lesson.summary },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Aralin — HISTORIA" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="text-3xl">Hindi mahanap ang aralin</h1><Link to="/dashboard" className="mt-4 inline-block font-sans text-primary underline">Bumalik sa mga aralin</Link></div>
  ),
  component: LessonPage,
});

function H2({ n, children }: { n: number; children: React.ReactNode }) {
  return <h2 className="mt-12 flex items-baseline gap-3 border-b border-border pb-2 text-2xl sm:text-3xl"><span className="font-sans text-sm font-semibold text-accent">{String(n).padStart(2, "0")}</span>{children}</h2>;
}

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const { progress, toggleLesson } = useProgress();
  const done = progress.completed.includes(lesson.id);
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const prev = lessons[idx - 1];
  const next = lessons[idx + 1];
  const term = terms.find((t) => t.id === lesson.term)!;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="font-sans text-xs text-muted-foreground"><Link to="/dashboard" className="hover:text-primary">Mga Aralin</Link> / {term.name} / Linggo {lesson.weeks}</nav>
      <p className="eyebrow mt-6">{term.name} · {term.title} · Linggo {lesson.weeks}</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">{lesson.title}</h1>

      <div className="mt-6 border border-primary/30 bg-card p-4 font-sans">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">Paksa ayon sa Badyet ng Gawain ng DepEd</p>
        <p className="mt-1 text-base text-foreground">{lesson.competency}</p>
        <p className="mt-2 text-xs text-muted-foreground">Ang mga sumusunod na paliwanag, halimbawa, at pagtataya ay karagdagang materyal ng HISTORIA at hindi opisyal na pahayag ng DepEd.</p>
      </div>

      <figure className="mt-8">
        <img src={lesson.image} alt={lesson.caption} width={1600} height={1008} className="photo aspect-[16/9] w-full object-cover" />
        <figcaption className="mt-2 font-sans text-xs text-muted-foreground">{lesson.caption}</figcaption>
      </figure>

      <H2 n={1}>Mga Layunin sa Pagkatuto</H2>
      <p className="mt-3 font-sans text-sm text-muted-foreground">Sa pagtatapos ng aralin, inaasahang ikaw ay:</p>
      <ol className="mt-2 list-decimal space-y-1 pl-6">{lesson.objectives.map((o) => <li key={o}>{o}</li>)}</ol>

      <H2 n={2}>Panimula</H2>
      <p className="mt-4 border-l-2 border-accent pl-4 font-display text-xl italic leading-relaxed text-ink">{lesson.intro}</p>

      <H2 n={3}>Pagtalakay</H2>
      {lesson.sections.map((s) => (
        <section key={s.heading} className="mt-6">
          <h3 className="text-xl">{s.heading}</h3>
          <p className="mt-2 leading-[1.75]">{s.body}</p>
        </section>
      ))}

      <H2 n={4}>Mahahalagang Impormasyong Pangkasaysayan</H2>
      <ul className="mt-4 space-y-3">{lesson.facts.map((f) => <li key={f} className="border-l border-border pl-4">{f}</li>)}</ul>

      <H2 n={5}>Mga Halimbawang Pangkasaysayan</H2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {lesson.examples.map((e) => (
          <div key={e.title} className="border-t-2 border-accent bg-card p-4">
            <h3 className="text-lg">{e.title}</h3>
            <p className="mt-2 text-[0.98rem] text-muted-foreground">{e.text}</p>
          </div>
        ))}
      </div>

      <H2 n={6}>Mga Susing Termino</H2>
      <dl className="mt-4 divide-y divide-border border-y border-border">
        {lesson.keyTerms.map((k) => (
          <div key={k.term} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
            <dt className="font-semibold text-ink">{k.term}</dt>
            <dd className="text-muted-foreground">{k.def}</dd>
          </div>
        ))}
      </dl>

      <H2 n={7}>Buod ng Aralin</H2>
      <p className="mt-4 bg-parchment p-5 leading-[1.75]">{lesson.summary}</p>

      <H2 n={8}>Maikling Pagtataya</H2>
      <MiniAssessment key={lesson.id} questions={lesson.assessment} />

      <div className="mt-10 flex flex-wrap gap-2">{lesson.keywords.map((k) => <span key={k} className="border border-border px-2 py-1 font-sans text-xs text-muted-foreground">{k}</span>)}</div>

      <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 font-sans sm:flex-row">
        <button onClick={() => toggleLesson(lesson.id)} className={`min-h-12 px-5 text-sm font-semibold ${done ? "border border-success text-success" : "bg-primary text-primary-foreground"}`}>
          {done ? "✓ Tapos na — ibalik bilang hindi tapos" : "Markahan bilang tapos"}
        </button>
        <Link to="/quiz" search={{ term: lesson.term }} className="inline-flex min-h-12 items-center justify-center border border-primary px-5 text-sm font-semibold text-primary">Sagutan ang pagsusulit ng Termino {lesson.term}</Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 font-sans text-sm">
        {prev ? <Link to="/lessons/$lessonId" params={{ lessonId: prev.id }} className="border border-border p-3 hover:bg-card"><span className="text-xs text-muted-foreground">← Nakaraan</span><span className="block text-ink">{prev.title}</span></Link> : <span />}
        {next && <Link to="/lessons/$lessonId" params={{ lessonId: next.id }} className="border border-border p-3 text-right hover:bg-card"><span className="text-xs text-muted-foreground">Susunod →</span><span className="block text-ink">{next.title}</span></Link>}
      </div>
    </article>
  );
}

function MiniAssessment({ questions }: { questions: { q: string; choices: string[]; answer: number; explain: string }[] }) {
  const [ans, setAns] = useState<(number | null)[]>(() => questions.map(() => null));
  const answered = ans.every((a) => a !== null);
  const score = scoreQuiz(ans, questions.map((q) => q.answer));
  return (
    <div className="mt-4 font-sans">
      {questions.map((q, i) => (
        <fieldset key={q.q} className="mt-6">
          <legend className="text-base text-ink"><span className="font-semibold">{i + 1}.</span> {q.q}</legend>
          <div className="mt-3 grid gap-2">
            {q.choices.map((c, ci) => {
              const picked = ans[i];
              let cls = "border-border bg-card hover:border-primary";
              if (picked !== null && ci === q.answer) cls = "border-success bg-success/10";
              else if (picked === ci) cls = "border-destructive bg-destructive/10";
              return <button key={c} disabled={picked !== null} onClick={() => setAns((a) => a.map((v, j) => (j === i ? ci : v)))} className={`min-h-11 border px-4 py-2 text-left text-sm ${cls}`}><span className="mr-2 font-semibold">{String.fromCharCode(65 + ci)}.</span>{c}</button>;
            })}
          </div>
          {ans[i] !== null && <p className={`mt-2 text-sm ${ans[i] === q.answer ? "text-success" : "text-destructive"}`}><strong>{ans[i] === q.answer ? "Tama." : "Mali."}</strong> <span className="text-foreground">{q.explain}</span></p>}
        </fieldset>
      ))}
      {answered && (
        <div className="mt-6 flex flex-wrap items-center gap-4 border border-primary p-4" role="status">
          <p className="font-display text-2xl text-ink">Iskor: {score}/{questions.length}</p>
          <button onClick={() => setAns(questions.map(() => null))} className="min-h-11 border border-primary px-4 text-sm font-semibold text-primary">Ulitin</button>
        </div>
      )}
    </div>
  );
}
