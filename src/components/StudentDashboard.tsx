import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Archive, BookOpen, CalendarDays, ChartNoAxesColumnIncreasing,
  ChevronRight, Clock3, Compass, Gamepad2, Home, Landmark, MapPinned,
  Search, Settings, Sparkles, Star, Trophy, Bell, ScrollText, Flame,
} from "lucide-react";
import { useStudent } from "@/lib/student";
import { lessons, terms, images } from "@/lib/historia-data";
import { overallPercent } from "@/lib/progress";
import { allBadges, continueLesson, formatDate, quizzesDone } from "@/lib/achievements";
import { AvatarImg } from "@/components/AvatarPicker";
import { avatarSrc } from "@/lib/avatars";
import heroFigures from "@/assets/home-hero-figures.jpg";

const navigation = [
  { label: "Home", to: "/", icon: Home },
  { label: "Learning Modules", to: "/dashboard", icon: BookOpen },
  { label: "Historical Timeline", to: "/timeline", icon: Clock3 },
  { label: "Source Archives", to: "/search", icon: Archive },
  { label: "Map Explorer", to: "/timeline", icon: MapPinned },
  { label: "Practice Center", to: "/games", icon: Gamepad2 },
  { label: "Achievements", to: "/achievements", icon: Trophy },
  { label: "Study Planner", to: "/progress", icon: CalendarDays },
  { label: "Profile & Settings", to: "/settings", icon: Settings },
] as const;

export function StudentDashboard() {
  const { profile, progress, activity, rewards, ready } = useStudent();
  if (!ready) return <div className="sr-only" role="status">Kinukuha ang iyong talaan…</div>;

  const name = profile?.full_name || "Mag-aaral";
  const first = name.split(" ")[0] ?? name;
  const next = continueLesson(progress);
  const pct = overallPercent(progress);
  const badges = allBadges(rewards).filter((b) => b.earned);
  const featured = next ?? lessons[0];
  const recentItems = activity.slice(0, 3);
  const termDone = lessons.filter((l) => l.term === (next?.term ?? 1) && progress.completed.includes(l.id)).length;
  const termTotal = lessons.filter((l) => l.term === (next?.term ?? 1)).length;

  return (
    <div className="reborn-dashboard">
      <aside className="reborn-sidebar">
        <Link to="/" className="reborn-brand" aria-label="HISTORIA Reborn home">
          <span className="reborn-brand-mark"><BookOpen size={31} /><Sparkles size={13} /></span>
          <span className="reborn-brand-name">HISTORIA<small>REBORN</small></span>
        </Link>
        <nav className="reborn-nav" aria-label="Dashboard navigation">
          {navigation.map(({ label, to, icon: Icon }, index) => (
            <Link key={label} to={to} activeOptions={{ exact: to === "/" }} activeProps={{ className: "is-active" }} className={index === 0 ? "is-active" : ""}>
              <Icon size={19} strokeWidth={1.8} /><span>{label}</span>
            </Link>
          ))}
        </nav>
        <blockquote className="reborn-quote">
          “A people without the knowledge of their past is a people without a future.”
          <cite>— Dr. Jose Rizal</cite>
        </blockquote>
        <div className="reborn-sidebar-landmark" aria-hidden="true">✦</div>
      </aside>

      <div className="reborn-main">
        <header className="reborn-topbar">
          <Link to="/search" className="reborn-search"><Search size={17} /><span>Search in HISTORIA...</span><kbd>Ctrl + K</kbd></Link>
          <div className="reborn-user">
            <span className="reborn-bell"><Bell size={19} /><i>3</i></span>
            <AvatarImg src={avatarSrc(profile?.avatar)} size={40} />
            <span className="reborn-user-copy"><strong>{name}</strong><small>Grade 11 · {profile?.section || "Student"}</small></span>
            <Link to="/profile" aria-label="Open profile"><ChevronRight size={17} /></Link>
          </div>
        </header>

        <section className="reborn-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,13,10,.96) 0%, rgba(5,13,10,.78) 30%, rgba(5,13,10,.18) 67%, rgba(5,13,10,.65) 100%), url(${heroFigures})` }}>
          <div className="reborn-hero-copy">
            <p className="reborn-kicker">WELCOME BACK,</p>
            <h1>{first}!</h1>
            <p>Continue your journey through<br />the rich history of the Philippines.</p>
            {next ? <Link to="/lessons/$lessonId" params={{ lessonId: next.id }} className="reborn-gold-button"><BookOpen size={16} /> Resume Learning <ArrowRight size={17} /></Link> : <Link to="/dashboard" className="reborn-gold-button">Explore Lessons <ArrowRight size={17} /></Link>}
          </div>
          <div className="reborn-hero-caption"><span>✦</span> THE STORY OF OUR NATION</div>
          <section className="reborn-progress-panel">
            <div className="reborn-panel-heading"><h2>Your Progress</h2><ChartNoAxesColumnIncreasing size={22} /></div>
            <div className="reborn-progress-body">
              <div className="reborn-ring" style={{ "--progress": `${pct}%` } as React.CSSProperties}><span>{pct}%</span></div>
              <div><strong>Overall Completion</strong><p>This Term</p><b>↑ {termDone}/{termTotal} lessons</b></div>
            </div>
            <div className="reborn-current">
              <h3>Current Lesson</h3>
              <div className="reborn-current-row"><img src={featured.image} alt="" /><span><strong>{featured.title}</strong><small>Term {featured.term} · Week {featured.weeks}</small></span><Link to="/lessons/$lessonId" params={{ lessonId: featured.id }}>Continue <ArrowRight size={14} /></Link></div>
            </div>
          </section>
        </section>

        <div className="reborn-content-grid">
          <div className="reborn-left-column">
            <section className="reborn-featured">
              <div className="reborn-section-title"><h2><Star size={21} fill="currentColor" /> Featured Lesson</h2><span>✧━━━━━━━━✧</span></div>
              <div className="reborn-feature-body">
                <img src={images.revolution} alt="Historical illustration representing the Philippine Revolution" />
                <div className="reborn-feature-copy"><p className="reborn-kicker">CONTINUE YOUR DISCOVERY</p><h3>{featured.title}</h3><p>{featured.intro}</p><small><Clock3 size={15} /> Suggested reading · 15 min</small><Link to="/lessons/$lessonId" params={{ lessonId: featured.id }} className="reborn-gold-button">Start Lesson <ArrowRight size={16} /></Link></div>
              </div>
            </section>

            <section className="reborn-explore">
              <div className="reborn-section-title"><h2>Explore More</h2><span>✧━━━━━━━━✧</span></div>
              <div className="reborn-explore-grid">
                <Link to="/timeline" className="reborn-explore-card"><img src={images.intramuros} alt="" /><span><strong>Historical Timeline</strong><small>Relive the past, step by step.</small></span><i><Clock3 size={17} /></i></Link>
                <Link to="/search" className="reborn-explore-card"><img src={images.precolonial} alt="" /><span><strong>Source Archives</strong><small>Discover primary sources and historical documents.</small></span><i><ScrollText size={17} /></i></Link>
                <Link to="/timeline" className="reborn-explore-card"><img src={images.terraces} alt="" /><span><strong>Map Explorer</strong><small>Explore historical places across the Philippines.</small></span><i><Compass size={17} /></i></Link>
                <Link to="/games" className="reborn-explore-card"><img src={images.community} alt="" /><span><strong>Practice Center</strong><small>Test your knowledge with engaging activities.</small></span><i><Gamepad2 size={17} /></i></Link>
              </div>
            </section>
          </div>

          <div className="reborn-right-column">
            <section className="reborn-achievements">
              <div className="reborn-section-title"><h2>Achievements</h2><Link to="/achievements">View All <ArrowRight size={14} /></Link></div>
              <div className="reborn-badges">
                {(badges.length ? badges.slice(0, 4) : [{ id: "history-beginner", title: "History Beginner" }, { id: "quiz-champion", title: "Quiz Champion" }, { id: "research-scholar", title: "Research Scholar" }, { id: "top-learner", title: "Top Learner" }]).map((b, i) => {
                  const Icon = [BookOpen, Star, ScrollText, Trophy][i];
                  return <div className={badges.length ? "reborn-badge earned" : "reborn-badge locked"} key={b.id}><span><Icon size={27} /></span><small>{b.title}</small></div>;
                })}
              </div>
            </section>

            <section className="reborn-activity">
              <div className="reborn-section-title"><h2>Recent Activity</h2><Link to="/progress">View All <ArrowRight size={14} /></Link></div>
              {recentItems.length ? <ol>{recentItems.map((item) => <li key={item.id}><i /><span><strong>{item.label}{item.score != null ? ` · ${item.score}/10` : ""}</strong><small>{formatDate(item.created_at)} {item.points > 0 ? `· +${item.points} XP` : ""}</small></span></li>)}</ol> : <p className="reborn-empty-activity"><Flame size={18} /> Your learning journey starts here. Complete a lesson or quiz to see your activity.</p>}
            </section>

            <section className="reborn-xp-card"><span><Sparkles size={19} /> YOUR EXPERIENCE</span><strong>{rewards.xp.toLocaleString()} <small>XP</small></strong><p>{progress.completed.length} lessons completed · {quizzesDone(progress)} quizzes taken</p></section>
          </div>
        </div>
        <footer className="reborn-footer"><span>☼</span><strong>HISTORIA REBORN</strong><i>Learning Today, Leading Tomorrow.</i><span className="reborn-footer-motif">✦ ━━━━━━━━━━━━━ ✦</span><span className="reborn-footer-note">Baitang 11 · Kasaysayan at Lipunang Pilipino</span></footer>
      </div>
    </div>
  );
}
