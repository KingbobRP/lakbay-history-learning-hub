import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, Lightbulb, RotateCcw, Trophy, Search, SkipForward, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gameCatalog, difficulties, questionsFor, timelineRounds, correctPositions, pointsFor, validatesText, type Difficulty, type GameId } from '@/lib/history-games';
import { QuestMap } from './QuestMap';
import { Celebration } from '@/components/lesson/Celebration';
import { useStudent } from '@/lib/student';

function shuffledOrder(length: number) {
 const order = Array.from({ length }, (_, i) => i);
 for (let attempt = 0; attempt < 10; attempt++) {
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const a = order[i]!; order[i] = order[j]!; order[j] = a; }
  if (correctPositions(order) < length) return order;
 }
 return order.reverse();
}

export function HistoryGame({ id }: { id: GameId }) {
 const game = gameCatalog.find(g=>g.id===id);
  const { award } = useStudent();
 const [difficulty, setDifficulty] = useState<Difficulty>('easy');
 const [phase, setPhase] = useState<'intro'|'play'|'results'>('intro');
 const [round, setRound] = useState(0);
 const [score, setScore] = useState(0);
 const [earned, setEarned] = useState(0);
 const [picked, setPicked] = useState<number|null>(null);
 const [text, setText] = useState('');
 const [feedback, setFeedback] = useState<boolean|null>(null);
 const [hinted, setHinted] = useState(false);
 const [opened, setOpened] = useState<number[]>([]);
 const [order, setOrder] = useState<number[]>([]);
 const [lifelines, setLifelines] = useState<string[]>([]);
 const [fifty, setFifty] = useState(false);
 const [skipped, setSkipped] = useState(false);
 const [hits, setHits] = useState(0);
  const [streak, setStreak] = useState(0);
 const qs = questionsFor(id,difficulty);
 const rounds = timelineRounds(difficulty);
 const total = id==='timeline' ? rounds.length : qs.length;\n const progressPercent = total ? Math.min(100, ((round + (feedback !== null ? 1 : 0)) / total) * 100) : 0;
 const question = qs[round];
 const sequence = rounds[round] ?? [];
 const max = id==='timeline' ? rounds.reduce((n,r)=>n+r.length*pointsFor(difficulty,0),0) : qs.reduce((n,_,i)=>n+pointsFor(difficulty,i,id==='millionaire'),0);
 if (!game) return null;
  const recordAnswerReward = (correct: boolean) => {
    if (!correct) {
      setStreak(0);
      return;
    }
    const nextStreak = streak + 1;
    setStreak(nextStreak);
    award(`gameAnswer:${id}:${round}`, `Tamang sagot sa ${game.title} — hamon ${round + 1}`);
    if (nextStreak === 3) award(`streak3:${id}`, `3 sunod-sunod na tamang sagot sa ${game.title}`);
    if (nextStreak === 5) award(`streak5:${id}`, `5 sunod-sunod na tamang sagot sa ${game.title}`);
  };
 const resetRound = (index: number) => {
  setRound(index); setPicked(null); setText(''); setFeedback(null); setHinted(false); setOpened([]); setFifty(false); setSkipped(false); setEarned(0);
  setOrder(shuffledOrder((rounds[index] ?? []).length));
 };
 const start = () => { setScore(0); setHits(0); setStreak(0); setLifelines([]); resetRound(0); setPhase('play'); };
 const answer = (choice: number|null) => {
  if(feedback!==null || !question) return;
  const correct = id==='complete' ? validatesText(text,question) : choice===question.answer;
  const pts = correct ? pointsFor(difficulty,round,id==='millionaire',hinted && id==='who') : 0;
  setPicked(choice); setFeedback(correct); setScore(s=>s+pts); setEarned(pts); if(correct) setHits(h=>h+1); recordAnswerReward(correct);
 };
 const checkOrder = () => {
  if(feedback!==null) return;
  const count=correctPositions(order); const pts=count*pointsFor(difficulty,round);
  setFeedback(count===sequence.length); setScore(s=>s+pts); setEarned(pts); if(count===sequence.length) setHits(h=>h+1); recordAnswerReward(count===sequence.length);
 };
 const next = () => {
    if (round + 1 === total) {
      award(`gameComplete:${id}`, `Natapos ang larong ${game.title}`);
      setPhase('results');
    } else if (id === 'millionaire' && feedback === false && !skipped) {
      setPhase('results');
    } else {
      resetRound(round + 1);
    }
  };
 const move = (index:number, delta:number) => setOrder(old=>{
  const next=[...old]; const a=next[index]; const b=next[index+delta];
  if(a===undefined || b===undefined) return old;
  next[index]=b; next[index+delta]=a; return next;
 });
 const applyLifeline = (name:string) => {
  if(lifelines.includes(name) || feedback!==null) return;
  setLifelines(l=>[...l,name]);
  if(name==='50:50') setFifty(true);
  if(name==='hint') setHinted(true);
  if(name==='skip') {setSkipped(true);setFeedback(false);setStreak(0);}
 };
 return <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
  <Button asChild variant="link" className="mb-6 min-h-11 px-0"><Link to="/games"><ArrowLeft /> Lahat ng laro</Link></Button>
  <p className="eyebrow">HISTORIA · {game.category}</p>
  <h1 className="mt-3 text-4xl sm:text-5xl">{game.title}</h1>
  {phase==='intro' && <div className="game-intro-panel mt-8 grid gap-8 border border-border bg-card p-5 pt-7 sm:p-7 md:grid-cols-[1.4fr_1fr]">
   <div><h2 className="text-2xl">Bago magsimula</h2><p className="mt-4 max-w-xl leading-relaxed">{game.instructions}</p>
    <p className="mt-4 text-sm text-muted-foreground">{id==='millionaire' ? '9 tanong · 3 yugto · hanggang 9,350 puntos' : id==='timeline' ? '3 hamon · 100–200 puntos bawat tamang puwesto' : '3 tanong · 100–200 puntos bawat tamang sagot'}</p>
    <fieldset className="mt-8"><legend className="mb-3 text-sm font-semibold text-primary">Antas ng hamon</legend><div className="flex flex-wrap gap-2">{difficulties.map(d=><Button key={d.id} variant={difficulty===d.id?'default':'outline'} className="min-h-11" aria-pressed={difficulty===d.id} onClick={()=>setDifficulty(d.id)}>{d.label}</Button>)}</div></fieldset>
    <Button size="lg" className="mt-8 min-h-12" onClick={start}>Simulan ang Laro <ArrowRight /></Button>
   </div>
   <aside className="border-l-2 border-accent pl-6"><p className="font-display text-5xl text-accent">{String(gameCatalog.findIndex(g=>g.id===id)+1).padStart(2,'0')}</p><p className="mt-4 text-xl text-primary">{game.description}</p><p className="mt-5 text-sm text-muted-foreground">Karagdagang pagsasanay ng HISTORIA para sa Baitang 11; hindi opisyal na pagsusulit ng DepEd.</p></aside>
  </div>}
  {phase==='results' && <section className="mt-8 border-y border-accent py-10 text-center" aria-label="Pangwakas na resulta">
   <Trophy className="mx-auto h-10 w-10 text-accent" /><p className="eyebrow mt-4">Natapos ang hamon</p><h2 className="mt-3 text-3xl">Ang iyong resulta</h2><p className="mt-4 font-display text-6xl text-primary" data-testid="final-score">{score.toLocaleString()} <span className="text-2xl">/ {max.toLocaleString()}</span></p><p className="mt-3 text-muted-foreground">{hits} sa {total} {id==='timeline'?'hamon ang ganap na tama':'sagot ang tama'} · {difficulties.find(d=>d.id===difficulty)?.label}</p>
   <div className="mt-8 flex flex-wrap justify-center gap-3"><Button onClick={start} className="min-h-12"><RotateCcw /> Maglaro Muli</Button><Button variant="outline" onClick={()=>setPhase('intro')} className="min-h-12">Baguhin ang antas</Button></div>
  </section>}
  {phase==='play' && <section className="mt-8 border-t border-accent pt-6">
   <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm"><span className="text-muted-foreground">{id==='detective'?'Misyon':'Hamon'} {round+1} / {total}{id==='millionaire' ? ` · Yugto ${Math.floor(round/3)+1}` : ''} · {difficulties.find(d=>d.id===difficulty)?.label}</span><div className="flex items-center gap-3"><span className="font-semibold text-primary" data-testid="running-score">{score.toLocaleString()} puntos</span>{streak >= 2 && <span className="game-streak" aria-label={`${streak} sunod-sunod na tamang sagot`}>✦ {streak} sunod-sunod</span>}</div></div>\n   <div className="game-progress-track mb-8" role="progressbar" aria-label="Pag-usad sa laro" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progressPercent)}><div className="game-progress-fill" style={{ width: `${progressPercent}%` }} /></div>
   {id==='millionaire' && <div className="mb-6 flex flex-wrap gap-2"><Button variant="outline" className="min-h-11" disabled={lifelines.includes('50:50')||feedback!==null} onClick={()=>applyLifeline('50:50')}><Scissors /> 50:50</Button><Button variant="outline" className="min-h-11" disabled={lifelines.includes('hint')||feedback!==null} onClick={()=>applyLifeline('hint')}><Lightbulb /> Pahiwatig</Button><Button variant="outline" className="min-h-11" disabled={lifelines.includes('skip')||feedback!==null} onClick={()=>applyLifeline('skip')}><SkipForward /> Laktawan</Button><span className="self-center text-sm text-muted-foreground">Antas {round+1} · {pointsFor(difficulty,round,true)} puntos</span></div>}
   {id==='timeline' ? <div className="game-question-panel max-w-3xl"><h2 className="mb-6 text-2xl">Mula pinakamaaga hanggang pinakahuli</h2><ol className="space-y-3">{order.map((eventIndex,i)=><li key={eventIndex} className={`flex items-center gap-3 border p-3 sm:p-4 ${feedback!==null ? eventIndex===i?'border-success bg-success/5':'border-destructive' : 'border-border bg-card'}`}><span className="font-display text-2xl text-accent">{i+1}</span><span className="flex-1 text-sm sm:text-base">{sequence[eventIndex]?.title}</span><Button variant="outline" size="icon" className="h-11 w-11 shrink-0" aria-label={`Itaas ${sequence[eventIndex]?.title}`} title="Itaas" disabled={i===0||feedback!==null} onClick={()=>move(i,-1)}><ArrowUp /></Button><Button variant="outline" size="icon" className="h-11 w-11 shrink-0" aria-label={`Ibaba ${sequence[eventIndex]?.title}`} title="Ibaba" disabled={i===order.length-1||feedback!==null} onClick={()=>move(i,1)}><ArrowDown /></Button></li>)}</ol>{feedback===null && <Button className="mt-6 min-h-12" onClick={checkOrder}><Check /> Suriin ang pagkakasunod-sunod</Button>}</div> : question && <div className={`game-question-panel ${id==='map'||id==='artifact'?'grid items-start gap-8 md:grid-cols-2':'max-w-3xl'}`}>
    {id==='map' && <QuestMap picked={picked} correct={feedback!==null?question.answer:undefined} />}
    {id==='artifact' && <figure className="border border-border bg-card p-5"><img src={question.image} alt="Artepakto mula sa koleksiyon ng Pambansang Museo; tukuyin sa tanong" className="h-72 w-full object-contain sm:h-96" /><figcaption className="mt-3 text-xs text-muted-foreground">Larawan: Pambansang Museo ng Pilipinas · <a className="underline" href={question.source} target="_blank" rel="noreferrer">Sanggunian</a></figcaption></figure>}
    <div><h2 className="text-2xl leading-snug sm:text-3xl">{question.prompt}</h2>
     {question.clues && <div className="mt-5 space-y-2">{question.clues.map((clue,i)=><div key={clue}><Button variant="outline" className="min-h-11 w-full justify-start" aria-expanded={opened.includes(i)} onClick={()=>setOpened(a=>a.includes(i)?a:a.concat(i))}><Search /> Ebidensiya {i+1}{opened.includes(i)&&<Check />}</Button>{opened.includes(i)&&<p className="border-x border-b border-border p-4 text-sm">{clue}</p>}</div>)}</div>}
     {id==='who' && feedback===null && <Button variant="outline" className="mt-5 min-h-11" disabled={hinted} onClick={()=>setHinted(true)}><Lightbulb /> Dagdag na pahiwatig</Button>}
     {hinted && <p className="mt-4 border-l-2 border-accent pl-4 text-sm">{question.hint}</p>}
     {id==='complete' ? <form className="relative mt-6" onSubmit={e=>{e.preventDefault();answer(null);}}><label htmlFor="history-answer" className="block text-sm font-semibold">Iyong sagot</label><input id="history-answer" autoComplete="off" value={text} onChange={e=>setText(e.target.value)} disabled={feedback!==null} className="mt-2 min-h-12 w-full border border-input bg-card px-4 text-base focus:outline-ring" />{feedback===true && <Celebration label={`+${earned} puntos`} />}<Button type="submit" className="mt-4 min-h-12" disabled={!text.trim()||feedback!==null}>Suriin ang sagot <Check /></Button></form> : <div className={`mt-6 grid gap-3 ${id==='map'?'grid-cols-2':''}`}>{question.choices.map((choice,i)=>{
      const firstWrong=question.choices.findIndex((_,j)=>j!==question.answer);
      const hidden=fifty && i!==question.answer && i!==firstWrong;
      return <Button key={choice} variant="outline" disabled={feedback!==null || hidden || (id==='detective' && opened.length!==question.clues?.length)} onClick={()=>answer(i)} className={`relative h-auto min-h-12 justify-start whitespace-normal p-4 transition-transform hover:translate-x-0.5 text-left leading-relaxed ${feedback!==null ? 'disabled:opacity-100' : ''} ${feedback!==null && i===question.answer ? 'border-2 border-success bg-success/15 text-foreground' : feedback!==null && i===picked ? 'border-2 border-destructive bg-destructive/10 text-foreground' : feedback!==null ? 'text-muted-foreground' : ''}`}><span className="shrink-0 text-muted-foreground">{id==='map'?i+1:String.fromCharCode(65+i)}.</span>{hidden?'—':choice}{feedback===true && i===picked && <Celebration label={`+${earned} puntos`} />}</Button>;
     })}</div>}
    </div>
   </div>}
   {feedback!==null && <div role="status" className={`relative mt-8 border-l-4 p-5 answer-feedback ${feedback?'border-success bg-success/10':'border-destructive bg-destructive/5'}`}><p className={`font-semibold ${feedback?'text-success':'text-destructive'}`}>{skipped?'Nilaktawan — walang puntos.':feedback?'Tama!':id==='timeline'?'May puwestong kailangang itama.':'Hindi pa tama.'} <span className="text-foreground">+{earned} puntos</span></p>
    {id==='timeline'?<ol className="mt-3 space-y-1 text-sm">{sequence.map(e=><li key={e.title}>{e.date} — {e.title}</li>)}</ol>:<><p className="mt-2 text-sm">Tamang sagot: <strong>{question?.choices[question.answer]}</strong></p><p className="mt-2"><strong>Bakit ito ang tama: </strong>{question?.explain}</p>{question?.whyNot && <p className="mt-2 text-muted-foreground"><strong className="text-foreground">Bakit kulang ang ibang pagpipilian: </strong>{question.whyNot}</p>}</>}
    <Button onClick={next} className="mt-5 min-h-12">{round+1===total||(id==='millionaire'&&!feedback&&!skipped)?'Tingnan ang resulta':'Susunod'} <ArrowRight /></Button>
   </div>}
  </section>}
 </div>;
}