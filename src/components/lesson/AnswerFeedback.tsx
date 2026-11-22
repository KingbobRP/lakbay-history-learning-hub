import { CheckCircle2, XCircle } from "lucide-react";

export function AnswerFeedback({ correct, answer, explain, whyNot, extra }: { correct: boolean; answer?: string | undefined; explain?: string | undefined; whyNot?: string | undefined; extra?: string | undefined }) {
  return (
    <div role="status" className={`answer-feedback mt-3 border-l-4 p-4 font-sans text-sm ${correct ? "border-success bg-success/10" : "border-destructive bg-destructive/5"}`}>
      <p className={`flex items-center gap-2 font-semibold ${correct ? "text-success" : "text-destructive"}`}>
        {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        {correct ? "Tama!" : "Hindi pa tama."} {extra && <span className="font-normal text-foreground">{extra}</span>}
      </p>
      {!correct && <p className="mt-2 text-muted-foreground">💪 Kaya mo ‘yan! Suriin natin ang paliwanag sa ibaba.</p>}
      {!correct && answer && <p className="mt-2">Tamang sagot: <strong>{answer}</strong></p>}
      {explain && <p className="mt-2"><span className="font-semibold text-ink">Bakit ito ang tama: </span>{explain}</p>}
      {whyNot && <p className="mt-2 text-muted-foreground"><span className="font-semibold text-ink">Bakit kulang ang ibang pagpipilian: </span>{whyNot}</p>}
    </div>
  );
}

export function choiceClass(state: "idle" | "correct" | "wrong" | "dim") {
  return {
    idle: "choice border-border bg-card hover:border-primary hover:bg-secondary",
    correct: "choice border-success bg-success/15 text-ink",
    wrong: "choice choice-wrong border-destructive bg-destructive/10",
    dim: "choice border-border bg-card text-muted-foreground",
  }[state];
}
