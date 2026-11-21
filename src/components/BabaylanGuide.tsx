import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Minus } from "lucide-react";
import babaylan from "@/assets/babaylan.jpg";
import type { Lesson } from "@/lib/historia-data";

type Step = "welcome" | "ready" | "later" | "intro" | "question" | "answered";

/** Friendly Babaylan guide. Talking to her never awards points. */
export function BabaylanGuide({ name, lesson }: { name: string; lesson?: Lesson }) {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState<Step>("welcome");
  const [picked, setPicked] = useState<number | null>(null);
  const [qIndex, setQIndex] = useState(0);
  useEffect(() => {
    if (sessionStorage.getItem("babaylan-greeted")) setStep("intro");
    else sessionStorage.setItem("babaylan-greeted", "1");
    setQIndex(Math.floor(Math.random() * 100));
  }, []);
  const q = useMemo(() => (lesson?.assessment.length ? lesson.assessment[qIndex % lesson.assessment.length] : undefined), [lesson, qIndex]);

  if (!open) return (
    <button onClick={() => setOpen(true)} className="babaylan-fab" aria-label="Kausapin si Babaylan">
      <img src={babaylan} alt="" width={56} height={56} /><MessageCircle className="h-4 w-4" />
    </button>
  );

  const say = (() => {
    switch (step) {
      case "welcome": return `Magandang araw, ${name}! Handa ka na bang maglakbay sa kasaysayan ng ating bayan?`;
      case "ready": return lesson ? `Napakagaling! Simulan natin sa "${lesson.title}". Isang hakbang lang ang kailangan para magsimula.` : "Napakagaling! Natapos mo na ang lahat ng aralin — subukan ang mga pagsusulit o laro.";
      case "later": return "Walang problema. Maglibot ka muna — narito lang ako kapag handa ka na. 🌿";
      case "intro": return lesson ? `Ngayong araw, ating aalamin: ${lesson.topic}. Handa ka na bang tuklasin ang ating nakaraan?` : "Natapos mo na ang lahat ng aralin! Balikan ang mga paborito mo.";
      case "question": return q?.q ?? "";
      case "answered": return picked === q?.answer ? `Tama! ${q?.explain}` : `Muntik na! Ang tamang sagot ay "${q?.choices[q.answer]}". ${q?.explain} Ayos lang magkamali — doon tayo natututo.`;
    }
  })();

  return (
    <section className="babaylan-card" aria-label="Si Babaylan, ang iyong gabay">
      <img src={babaylan} alt="Si Babaylan, gabay sa pag-aaral" width={120} height={120} className={`babaylan-face ${step === "answered" && picked === q?.answer ? "is-happy" : ""}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-lg text-primary">Babaylan</p>
          <button onClick={() => setOpen(false)} aria-label="Itago si Babaylan" className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary"><Minus className="h-4 w-4" /></button>
        </div>
        <p key={step + String(picked)} className="babaylan-bubble">{say}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {step === "welcome" && <><Btn onClick={() => setStep("ready")} primary>Handa na ako!</Btn><Btn onClick={() => setStep("later")}>Sandali lang.</Btn></>}
          {(step === "ready" || step === "intro") && lesson && <Link to="/lessons/$lessonId" params={{ lessonId: lesson.id }} className="babaylan-btn is-primary">Simulan ang Aralin</Link>}
          {(step === "ready" || step === "intro" || step === "later") && q && <Btn onClick={() => { setPicked(null); setStep("question"); }}>Tanungin mo ako</Btn>}
          {step === "question" && q && (
            <div className="grid w-full gap-2">
              {q.choices.map((c, i) => <button key={i} onClick={() => { setPicked(i); setStep("answered"); }} className="min-h-11 border border-border bg-background px-3 py-2 text-left font-sans text-sm hover:border-primary">{c}</button>)}
            </div>
          )}
          {step === "answered" && <><Btn onClick={() => { setQIndex((n) => n + 1); setPicked(null); setStep("question"); }}>Isa pang tanong</Btn>{lesson && <Link to="/lessons/$lessonId" params={{ lessonId: lesson.id }} className="babaylan-btn is-primary">Ituloy ang pag-aaral</Link>}</>}
        </div>
      </div>
    </section>
  );
}
function Btn({ children, onClick, primary }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) {
  return <button onClick={onClick} className={`babaylan-btn ${primary ? "is-primary" : ""}`}>{children}</button>;
}
