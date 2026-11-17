import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { quizzes, terms } from "@/lib/historia-data";
import { scoreQuiz, useProgress } from "@/lib/progress";
import { AnswerFeedback, choiceClass } from "@/components/lesson/AnswerFeedback";
import { Celebration } from "@/components/lesson/Celebration";

export const Route = createFileRoute("/quiz")({
  staticData: { sitemap: true },
  validateSearch: (s: Record<string, unknown>): { term?: number } => {
    const n = Number(s["term"]);
    return n >= 1 && n <= 3 ? { term: n } : {};
  },
  head: () => ({
    meta: [
      { title: "Sentro ng Pagsusulit — HISTORIA" },
      { name: "description", content: "Sampung-tanong na pagsusulit sa bawat termino na may agarang puna at paliwanag." },
      { property: "og:title", content: "Sentro ng Pagsusulit — HISTORIA" },
      { property: "og:description", content: "Subukin ang iyong kaalaman sa kasaysayan at lipunang Pilipino." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizCenter,
});

function QuizCenter() {
  const { term } = Route.useSearch();
  const navigate = useNavigate({ from: "/quiz" });
  const { progress } = useProgress();

  if (!term) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="eyebrow">Pagsusulit</p>
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Sentro ng Pagsusulit</h1>
        <p className="mt-3 text-muted-foreground">Pumili ng termino. Bawat pagsusulit ay may 10 tanong na sumusukat sa pagsusuri at kritikal na pag-iisip, na may agarang puna at paliwanag kung bakit tama o kulang ang bawat sagot.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {terms.map((t) => (
            <button key={t.id} onClick={() => navigate({ search: { term: t.id } })} className="border border-border bg-card p-5 text-left hover:border-primary">
              <p className="eyebrow">Termino {t.id}</p>
              <p className="mt-2 font-display text-xl text-ink">{t.title}</p>
              <p className="mt-3 font-sans text-sm text-muted-foreground">{progress.scores[t.id] ? `Pinakamataas na iskor: ${progress.scores[t.id]?.best}/10` : "Hindi pa nasasagutan"}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }
  return <Quiz key={term} term={term} onBack={() => navigate({ search: {} })} />;
}

function Quiz({ term, onBack }: { term: number; onBack: () => void }) {
  const qs = quizzes[term] ?? [];
  const { recordScore } = useProgress();
  const [answers, setAnswers] = useState<(number | null)[]>(() => qs.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const answered = answers.filter((a) => a !== null).length;
  const score = scoreQuiz(answers, qs.map((q) => q.answer));

  const submit = () => { setSubmitted(true); recordScore(term, score); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const retake = () => { setAnswers(qs.map(() => null)); setSubmitted(false); window.scrollTo({ top: 0 }); };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <button onClick={onBack} className="min-h-11 font-sans text-sm text-muted-foreground hover:text-primary">← Lahat ng pagsusulit</button>
      <p className="eyebrow mt-4">Termino {term} · Pagsusulit</p>
      <h1 className="mt-2 text-3xl text-ink sm:text-4xl">{terms[term - 1]?.title}</h1>
      {submitted ? (
        <div className="mt-6 border border-ink bg-card p-6" role="status">
          <p className="eyebrow">Iyong iskor</p>
          <p className="mt-1 font-display text-5xl text-ink" data-testid="score">{score}/10</p>
          <p className="mt-2 text-muted-foreground">{score >= 8 ? "Mahusay! Malalim ang iyong pag-unawa." : score >= 5 ? "Magaling — balikan ang mga paliwanag sa ibaba." : "Ipagpatuloy ang pag-aaral — balikan ang mga aralin ng terminong ito."}</p>
          <button onClick={retake} className="mt-4 min-h-11 rounded-sm bg-primary px-5 font-sans text-sm font-medium text-primary-foreground">Ulitin ang pagsusulit</button>
        </div>
      ) : (
        <p className="mt-3 font-sans text-sm text-muted-foreground">{answered} sa 10 ang nasagutan</p>
      )}

      <ol className="mt-8 space-y-8">
        {qs.map((q, i) => {
          const picked = answers[i];
          return (
            <li key={i} className="border-t border-border pt-6">
              <p className="font-sans text-xs text-muted-foreground">Tanong {i + 1}</p>
              <p className="mt-1 text-lg text-ink">{q.q}</p>
              <div className="mt-4 grid gap-2">
                {q.choices.map((c, ci) => {
                  const state = picked === null ? "idle" : ci === q.answer ? "correct" : picked === ci ? "wrong" : "dim";
                  return (
                    <button key={ci} disabled={picked !== null || submitted} onClick={() => setAnswers((a) => a.map((v, j) => (j === i ? ci : v)))} className={`relative min-h-12 border px-4 py-3 text-left font-sans text-sm ${choiceClass(state)}`}>
                      <span className="mr-2 font-semibold">{String.fromCharCode(65 + ci)}.</span>{c}{state === "correct" && picked === ci && <Celebration />}
                    </button>
                  );
                })}
              </div>
              {picked !== null && <AnswerFeedback correct={picked === q.answer} answer={q.choices[q.answer]} explain={q.explain} whyNot={q.whyNot} />}
            </li>
          );
        })}
      </ol>
      {!submitted && (
        <button onClick={submit} disabled={answered < 10} className="mt-10 min-h-12 w-full rounded-sm bg-primary font-sans text-sm font-medium text-primary-foreground disabled:opacity-40">
          {answered < 10 ? `Sagutin ang lahat ng tanong (${answered}/10)` : "Ipasa at tingnan ang iskor"}
        </button>
      )}
    </div>
  );
}
