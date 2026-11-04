import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { quizzes, terms } from "@/lib/historia-data";
import { scoreQuiz, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/quiz")({
  validateSearch: (s: Record<string, unknown>): { term?: number } => {
    const n = Number(s.term);
    return n >= 1 && n <= 3 ? { term: n } : {};
  },
  head: () => ({
    meta: [
      { title: "Quiz Center — Historia" },
      { name: "description", content: "Ten-question quizzes for each term with instant feedback and explanations." },
      { property: "og:title", content: "Quiz Center — Historia" },
      { property: "og:description", content: "Test your knowledge of Philippine history." },
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
        <h1 className="mt-3 text-4xl text-ink sm:text-5xl">Quiz Center</h1>
        <p className="mt-3 text-muted-foreground">Choose a term. Each quiz has 10 multiple-choice questions.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {terms.map((t) => (
            <button key={t.id} onClick={() => navigate({ search: { term: t.id } })} className="border border-border bg-card p-5 text-left hover:border-primary">
              <p className="eyebrow">Term {t.id}</p>
              <p className="mt-2 font-display text-xl text-ink">{t.title}</p>
              <p className="mt-3 font-sans text-sm text-muted-foreground">{progress.scores[t.id] ? `Best score: ${progress.scores[t.id].best}/10` : "Not yet taken"}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }
  return <Quiz key={term} term={term} onBack={() => navigate({ search: {} })} />;
}

function Quiz({ term, onBack }: { term: number; onBack: () => void }) {
  const qs = quizzes[term];
  const { recordScore } = useProgress();
  const [answers, setAnswers] = useState<(number | null)[]>(() => qs.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const answered = answers.filter((a) => a !== null).length;
  const score = scoreQuiz(answers, qs.map((q) => q.answer));

  const submit = () => { setSubmitted(true); recordScore(term, score); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const retake = () => { setAnswers(qs.map(() => null)); setSubmitted(false); window.scrollTo({ top: 0 }); };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <button onClick={onBack} className="min-h-11 font-sans text-sm text-muted-foreground hover:text-primary">← All quizzes</button>
      <p className="eyebrow mt-4">Term {term} Quiz</p>
      <h1 className="mt-2 text-3xl text-ink sm:text-4xl">{terms[term - 1].title}</h1>
      {submitted ? (
        <div className="mt-6 border border-ink bg-card p-6" role="status">
          <p className="eyebrow">Your score</p>
          <p className="mt-1 font-display text-5xl text-ink" data-testid="score">{score}/10</p>
          <p className="mt-2 text-muted-foreground">{score >= 8 ? "Mahusay! Excellent understanding." : score >= 5 ? "Magaling — review the explanations below." : "Keep studying — revisit this term's lessons."}</p>
          <button onClick={retake} className="mt-4 min-h-11 rounded-sm bg-primary px-5 font-sans text-sm font-medium text-primary-foreground">Retake quiz</button>
        </div>
      ) : (
        <p className="mt-3 font-sans text-sm text-muted-foreground">{answered} of 10 answered</p>
      )}

      <ol className="mt-8 space-y-8">
        {qs.map((q, i) => {
          const picked = answers[i];
          return (
            <li key={i} className="border-t border-border pt-6">
              <p className="font-sans text-xs text-muted-foreground">Question {i + 1}</p>
              <p className="mt-1 text-lg text-ink">{q.q}</p>
              <div className="mt-4 grid gap-2">
                {q.choices.map((c, ci) => {
                  const isPicked = picked === ci;
                  const reveal = picked !== null;
                  const correct = ci === q.answer;
                  let cls = "border-border bg-card hover:border-ink";
                  if (reveal && correct) cls = "border-success bg-success/10 text-ink";
                  else if (reveal && isPicked) cls = "border-destructive bg-destructive/10";
                  return (
                    <button key={ci} disabled={reveal || submitted} onClick={() => setAnswers((a) => a.map((v, j) => (j === i ? ci : v)))} className={`min-h-12 border px-4 py-3 text-left font-sans text-sm ${cls}`}>
                      <span className="mr-2 font-semibold">{String.fromCharCode(65 + ci)}.</span>{c}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <p className={`mt-3 font-sans text-sm ${picked === q.answer ? "text-success" : "text-destructive"}`}>
                  <strong>{picked === q.answer ? "Correct." : `Incorrect — the answer is ${String.fromCharCode(65 + q.answer)}.`}</strong> <span className="text-foreground">{q.explain}</span>
                </p>
              )}
            </li>
          );
        })}
      </ol>
      {!submitted && (
        <button onClick={submit} disabled={answered < 10} className="mt-10 min-h-12 w-full rounded-sm bg-primary font-sans text-sm font-medium text-primary-foreground disabled:opacity-40">
          {answered < 10 ? `Answer all questions (${answered}/10)` : "Submit and see score"}
        </button>
      )}
    </div>
  );
}
