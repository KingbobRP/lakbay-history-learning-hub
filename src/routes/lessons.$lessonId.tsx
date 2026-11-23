import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { lessons, terms, type Lesson, type Question } from "@/lib/historia-data";
import { lessonInteractives } from "@/lib/lesson-interactives";
import { AnswerFeedback, choiceClass } from "@/components/lesson/AnswerFeedback";
import { Celebration } from "@/components/lesson/Celebration";
import { EtymologyEquation } from "@/components/lesson/EtymologyEquation";
import { SourceSorter } from "@/components/lesson/SourceSorter";
import { BiasHotspots } from "@/components/lesson/BiasHotspots";
import { FlipCards } from "@/components/lesson/FlipCards";
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

const steps = ["Simula", "Pagtalakay", "Kasaysayan", "Susing Termino", "Buod", "Pagtataya"] as const;

function H2({ n, children }: { n: number; children: React.ReactNode }) {
  return <h2 className="lesson-h2 flex items-baseline gap-3 border-b border-accent pb-3 text-2xl sm:text-3xl"><span className="font-sans text-sm font-semibold text-accent">{String(n).padStart(2, "0")}</span>{children}</h2>;
}

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  return <LessonStepper key={lesson.id} lesson={lesson} />;
}

function LessonStepper({ lesson }: { lesson: Lesson }) {
  const { progress, toggleLesson, visitLesson } = useProgress();
  useEffect(() => { visitLesson(lesson.id); }, [lesson.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const [step, setStep] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const done = progress.completed.includes(lesson.id);
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  const prev = lessons[idx - 1];
  const next = lessons[idx + 1];
  const term = terms.find((t) => t.id === lesson.term)!;
  const extras = lessonInteractives[lesson.id] ?? {};
  const go = (n: number) => { setStep(n); topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <article className="lesson-page mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="font-sans text-xs text-muted-foreground"><Link to="/dashboard" className="hover:text-primary">Mga Aralin</Link> / {term.name} / Linggo {lesson.weeks}</nav>
      <p className="eyebrow mt-6">{term.name} · {term.title} · Linggo {lesson.weeks}</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">{lesson.title}</h1>

      <div ref={topRef} className="stepper-bar">
        <div className="flex items-center justify-between gap-3 font-sans text-sm">
          <p className="font-semibold text-primary">Hakbang {step + 1} ng {steps.length}<span className="font-normal text-muted-foreground"> · {steps[step]}</span></p>
          <p className="text-xs text-muted-foreground">{Math.round(((step + 1) / steps.length) * 100)}%</p>
        </div>
        <div className="mt-2 h-1.5 bg-muted" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-label="Pag-usad sa aralin"><div className="h-full bg-primary transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
        <ol className="mt-3 grid grid-cols-6 gap-1">
          {steps.map((label, i) => (
            <li key={label}><button onClick={() => go(i)} aria-current={i === step ? "step" : undefined} aria-label={`Hakbang ${i + 1}: ${label}`} className={`step-dot ${i === step ? "is-current" : i < step ? "is-done" : ""}`}><span>{i + 1}</span><span className="hidden sm:block">{label}</span></button></li>
          ))}
        </ol>
      </div>

      <section hidden={step !== 0} className="step-card">
        <div className="border border-primary/30 bg-card p-4 font-sans">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">Paksa ayon sa Badyet ng Gawain ng DepEd</p>
          <p className="mt-1 text-base text-foreground">{lesson.competency}</p>
          <p className="mt-2 text-xs text-muted-foreground">Ang mga sumusunod na paliwanag, halimbawa, gawain, at pagtataya ay karagdagang materyal ng HISTORIA at hindi opisyal na pahayag ng DepEd.</p>
        </div>
        <figure className="mt-6">
          <img src={lesson.image} alt="" width={1600} height={1008} className="photo aspect-[16/9] w-full object-cover" />
          <figcaption className="mt-2 font-sans text-xs text-muted-foreground">{lesson.caption}</figcaption>
        </figure>
        <H2 n={1}>Mga Layunin sa Pagkatuto</H2>
        <p className="mt-3 font-sans text-sm text-muted-foreground">Sa pagtatapos ng aralin, inaasahang ikaw ay:</p>
        <ol className="mt-2 list-decimal space-y-1 pl-6 leading-[1.8]">{lesson.objectives.map((o) => <li key={o}>{o}</li>)}</ol>
        <H2 n={2}>Panimula</H2>
        <p className="mt-4 border-l-2 border-accent pl-4 font-display text-xl italic leading-relaxed text-ink">{lesson.intro}</p>
      </section>

      <section hidden={step !== 1} className="step-card">
        <H2 n={3}>Pagtalakay</H2>
        {lesson.sections.map((s) => (
          <section key={s.heading} className="mt-6">
            <h3 className="text-2xl">{s.heading}</h3>
            {extras.etymologyHeading === s.heading ? <EtymologyEquation definition={s.body} /> : <p className="mt-2 leading-[1.8]">{s.body}</p>}
          </section>
        ))}
        {extras.sorter && <SourceSorter cards={extras.sorter} />}
      </section>

      <section hidden={step !== 2} className="step-card">
        <H2 n={4}>Mahahalagang Impormasyong Pangkasaysayan</H2>
        <ul className="mt-4 space-y-3 leading-[1.8]">{lesson.facts.map((f) => <li key={f} className="border-l border-accent pl-4">{f}</li>)}</ul>
        <H2 n={5}>Mga Halimbawang Pangkasaysayan</H2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {lesson.examples.map((e) => (
            <div key={e.title} className="example-card border-t-2 border-accent bg-card p-4">
              <h3 className="text-lg">{e.title}</h3>
              <p className="mt-2 text-[0.98rem] text-muted-foreground">{e.text}</p>
            </div>
          ))}
          {extras.bias && <BiasHotspots bias={extras.bias} />}
        </div>
      </section>

      <section hidden={step !== 3} className="step-card">
        <H2 n={6}>Mga Susing Termino</H2>
        <FlipCards lessonId={lesson.id} terms={lesson.keyTerms} />
      </section>

      <section hidden={step !== 4} className="step-card">
        <H2 n={7}>Buod ng Aralin</H2>
        <p className="mt-4 bg-parchment p-5 leading-[1.8]">{lesson.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">{lesson.keywords.map((k) => <span key={k} className="border border-border px-2 py-1 font-sans text-xs text-muted-foreground">{k}</span>)}</div>
      </section>

      <section hidden={step !== 5} className="step-card">
        <H2 n={8}>Maikling Pagtataya</H2>
        <MiniAssessment questions={lesson.assessment} onCompletionChange={setAssessmentComplete} />
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 font-sans sm:flex-row">
          <button onClick={() => toggleLesson(lesson.id)} disabled={!done && !assessmentComplete} className={`min-h-12 px-5 text-sm font-semibold ${done ? "border border-success text-success" : "bg-primary text-primary-foreground hover:bg-primary/90"} disabled:cursor-not-allowed disabled:opacity-40`}>
            {done ? "✓ Tapos na — ibalik bilang hindi tapos" : "Markahan bilang tapos"}
          </button>
          <Link to="/quiz" search={{ term: lesson.term }} className="inline-flex min-h-12 items-center justify-center border border-primary px-5 text-sm font-semibold text-primary hover:bg-secondary">Sagutan ang pagsusulit ng Termino {lesson.term}</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 font-sans text-sm">
          {prev ? <Link to="/lessons/$lessonId" params={{ lessonId: prev.id }} className="border border-border p-3 hover:border-primary hover:bg-card"><span className="text-xs text-muted-foreground">← Nakaraang aralin</span><span className="block text-ink">{prev.title}</span></Link> : <span />}
          {next && (assessmentComplete || done) ? <Link to="/lessons/$lessonId" params={{ lessonId: next.id }} className="border border-border p-3 text-right hover:border-primary hover:bg-card"><span className="text-xs text-muted-foreground">Susunod na aralin →</span><span className="block text-ink">{next.title}</span></Link> : next ? <div aria-disabled="true" className="border border-border bg-muted/50 p-3 text-right opacity-60"><span className="text-xs text-muted-foreground">Naka-lock ang susunod na aralin</span><span className="block text-ink">{next.title}</span><span className="mt-1 block text-xs text-muted-foreground">Sagutan muna ang lahat ng tanong sa pagtataya.</span></div> : null}
        </div>
      </section>

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-5 font-sans">
        <button onClick={() => go(step - 1)} disabled={step === 0} className="min-h-12 border border-border px-5 text-sm font-semibold text-primary hover:border-primary disabled:opacity-40">← Nakaraan</button>
        {step < steps.length - 1 && <button onClick={() => go(step + 1)} className="min-h-12 bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Susunod: {steps[step + 1]} →</button>}
      </div>
    </article>
  );
}

function MiniAssessment({ questions, onCompletionChange }: { questions: Question[]; onCompletionChange: (complete: boolean) => void }) {
  const [ans, setAns] = useState<(number | null)[]>(() => questions.map(() => null));
  const answered = ans.every((a) => a !== null);
  const score = scoreQuiz(ans, questions.map((q) => q.answer));
  return (
    <div className="mt-4 font-sans">
      {questions.map((q, i) => {
        const picked = ans[i] ?? null;
        return (
          <fieldset key={q.q} className="mt-8">
            <legend className="text-base leading-relaxed text-ink"><span className="font-semibold">{i + 1}.</span> {q.q}</legend>
            <div className="mt-3 grid gap-2">
              {q.choices.map((c, ci) => {
                const state = picked === null ? "idle" : ci === q.answer ? "correct" : picked === ci ? "wrong" : "dim";
                return <button key={c} disabled={picked !== null} onClick={() => setAns((a) => { const updated = a.map((v, j) => (j === i ? ci : v)); onCompletionChange(updated.every((answer) => answer !== null)); return updated; })} className={`relative min-h-12 border px-4 py-3 text-left text-sm ${choiceClass(state)}`}><span className="mr-2 font-semibold">{String.fromCharCode(65 + ci)}.</span>{c}{state === "correct" && picked === ci && <Celebration />}</button>;
              })}
            </div>
            {picked !== null && <AnswerFeedback correct={picked === q.answer} answer={q.choices[q.answer]} explain={q.explain} whyNot={q.whyNot} />}
          </fieldset>
        );
      })}
      {answered && (
        <div className="mt-6 flex flex-wrap items-center gap-4 border border-primary p-4" role="status">
          <p className="font-display text-2xl text-ink">Iskor: {score}/{questions.length}</p>
          <button onClick={() => { setAns(questions.map(() => null)); onCompletionChange(false); }} className="min-h-11 border border-primary px-4 text-sm font-semibold text-primary hover:bg-secondary">Ulitin</button>
        </div>
      )}
    </div>
  );
}
