import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lessons, terms } from "@/lib/historia-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/lessons/$lessonId")({
  loader: ({ params }) => {
    const lesson = lessons.find((l) => l.id === params.lessonId);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.lesson.title} — Historia` },
          { name: "description", content: loaderData.lesson.summary },
          { property: "og:title", content: `${loaderData.lesson.english} — Historia` },
          { property: "og:description", content: loaderData.lesson.summary },
        ]
      : [{ title: "Lesson unavailable — Historia" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="text-3xl">Lesson not found</h1><Link to="/" className="mt-4 inline-block font-sans text-primary underline">Back to dashboard</Link></div>
  ),
  component: LessonPage,
});

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
      <nav className="font-sans text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Dashboard</Link> / Term {lesson.term} / Week {lesson.week}</nav>
      <p className="eyebrow mt-6">{term.name} · Linggo {lesson.week} · {lesson.topic}</p>
      <h1 className="mt-3 text-4xl leading-tight text-ink sm:text-5xl">{lesson.title}</h1>
      <p className="mt-2 text-xl italic text-muted-foreground">{lesson.english}</p>
      <figure className="mt-8">
        <img src={lesson.image} alt={lesson.english} width={1200} height={800} className="photo aspect-[16/9] w-full object-cover" />
        <figcaption className="mt-2 font-sans text-xs text-muted-foreground">Archival-style illustration · {term.period}</figcaption>
      </figure>
      <p className="mt-8 border-l-2 border-primary pl-4 text-lg leading-relaxed text-ink">{lesson.summary}</p>
      {lesson.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-2xl text-ink">{s.heading}</h2>
          <p className="mt-3 text-[1.075rem] leading-[1.75]">{s.body}</p>
        </section>
      ))}
      {lesson.source && (
        <blockquote className="mt-10 border-y border-border bg-card px-6 py-6">
          <p className="eyebrow">Primaryang sanggunian</p>
          <p className="mt-2 font-display text-2xl italic text-ink">“{lesson.source.quote}”</p>
          <cite className="mt-2 block font-sans text-sm not-italic text-muted-foreground">— {lesson.source.cite}</cite>
        </blockquote>
      )}
      <div className="mt-10 flex flex-wrap gap-2">{lesson.keywords.map((k) => <span key={k} className="rounded-sm bg-muted px-2 py-1 font-sans text-xs text-muted-foreground">{k}</span>)}</div>

      <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 font-sans sm:flex-row">
        <button onClick={() => toggleLesson(lesson.id)} className={`min-h-11 rounded-sm px-5 text-sm font-medium ${done ? "border border-success text-success" : "bg-primary text-primary-foreground"}`}>
          {done ? "✓ Completed — mark as unfinished" : "Mark lesson as completed"}
        </button>
        <Link to="/quiz" search={{ term: lesson.term }} className="inline-flex min-h-11 items-center justify-center rounded-sm border border-ink px-5 text-sm text-ink">Take Term {lesson.term} quiz</Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 font-sans text-sm">
        {prev ? <Link to="/lessons/$lessonId" params={{ lessonId: prev.id }} className="border border-border p-3 hover:bg-card"><span className="text-xs text-muted-foreground">← Previous</span><span className="block text-ink">{prev.english}</span></Link> : <span />}
        {next && <Link to="/lessons/$lessonId" params={{ lessonId: next.id }} className="border border-border p-3 text-right hover:bg-card"><span className="text-xs text-muted-foreground">Next →</span><span className="block text-ink">{next.english}</span></Link>}
      </div>
    </article>
  );
}
