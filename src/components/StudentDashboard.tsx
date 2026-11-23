import { Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowUpRight, Award, Bell, BookOpen, CalendarDays, ChevronRight,
  Clock3, Compass, Gamepad2, Home, Landmark, MapPin, Play, Search, Settings,
  Sparkles, Star, Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student";
import { lessons, terms } from "@/lib/historia-data";
import { avatarSrc } from "@/lib/avatars";
import { overallPercent } from "@/lib/progress";
import { allBadges, continueLesson, formatDate, quizzesDone } from "@/lib/achievements";
import { AvatarImg } from "@/components/AvatarPicker";
import heroFigures from "@/assets/home-hero-figures.jpg";
import revolutionImage from "@/assets/revolution.jpg";
import archiveImage from "@/assets/artifact-kulaman-urn.jpg";
import timelineImage from "@/assets/timeline-kawit.jpg";
import practiceImage from "@/assets/artifact-bulul.jpg";

const navigation = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Learning Modules", icon: BookOpen },
  { to: "/timeline", label: "Historical Timeline", icon: Clock3 },
  { to: "/curriculum", label: "Source Archives", icon: Landmark },
  { to: "/timeline", label: "Map Explorer", icon: MapPin },
  { to: "/games", label: "Practice Center", icon: Gamepad2 },
  { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/progress", label: "Study Planner", icon: CalendarDays },
  { to: "/settings", label: "Profile & Settings", icon: Settings },
];

export function StudentDashboard() {
  const { profile, progress, activity, rewards, ready } = useStudent();
  if (!ready) return <div className="reborn-loading" role="status">Opening your history journal…</div>;

  const name = profile?.full_name || "Mag-aaral";
  const first = name.split(" ")[0] ?? name;
  const next = continueLesson(progress);
  const pct = overallPercent(progress);
  const earnedBadges = allBadges(rewards).filter((badge) => badge.earned);
  const currentTerm = next?.term ?? terms[0]?.id ?? 1;
  const currentTermLabel = `Term ${currentTerm}`;
  const featured = next ?? lessons[0];
  const recent = lessons.find((lesson) => lesson.id === progress.lastLesson);
  const ringStyle = { background: `conic-gradient(#e8bd69 ${pct * 3.6}deg, rgba(232,189,105,.13) 0deg)` };

  return (
    <div className="reborn-dashboard">
      <aside className="reborn-sidebar">
        <Link to="/" className="reborn-brand" aria-label="HISTORIA Reborn home">
          <span className="reborn-brand-mark"><BookOpen size={34} strokeWidth={1.4} /></span>
          <span className="reborn-brand-name">HISTORIA<small>REBORN</small></span>
        </Link>
        <nav className="reborn-nav" aria-label="Student navigation">
          {navigation.map(({ to, label, icon: Icon }, index) => (
            <Link key={label} to={to} activeOptions={{ exact: to === "/" }} className={index === 0 ? "reborn-nav-link reborn-nav-active" : "reborn-nav-link"}>
              <Icon size={19} strokeWidth={1.8} /><span>{label}</span>{index === 0 && <ChevronRight size={15} />}
            </Link>
          ))}
        </nav>
        <blockquote className="reborn-quote">
          “A people without the knowledge of their past is a people without a future.”
          <cite>— Dr. José Rizal</cite>
        </blockquote>
        <div className="reborn-sidebar-foot"><Sparkles size={15} /> Learning Today, Leading Tomorrow.</div>
      </aside>

      <main className="reborn-main">
        <header className="reborn-topbar">
          <Link to="/search" className="reborn-search"><Search size={17} /><span>Search in HISTORIA...</span><kbd>Ctrl + K</kbd></Link>
          <div className="reborn-user-tools">
            <Link to="/achievements" className="reborn-notification" aria-label="View achievements"><Bell size={19}/><i>!</i></Link>
            <Link to="/profile" className="reborn-user">
              <AvatarImg src={avatarSrc(profile?.avatar)} size={38}/>
              <span><strong>{name}</strong><small>Grade 11 · Student</small></span>
            </Link>
          </div>
        </header>

        <section className="reborn-hero">
          <img className="reborn-hero-art" src={heroFigures} alt="Historical Filipino figures with the Philippine flag" />
          <div className="reborn-hero-vignette" />
          <div className="reborn-hero-copy">
            <p className="reborn-kicker">WELCOME BACK,</p>
            <h1>{first}!</h1>
            <p className="reborn-hero-subtitle">Continue your journey through<br/>the rich history of the Philippines.</p>
            <Button asChild className="reborn-gold-button"><Link to={next ? "/lessons/$lessonId" : "/dashboard"} params={next ? { lessonId: next.id } : undefined}><Play size={15} fill="currentColor"/> Resume Learning <ArrowRight size={17}/></Link></Button>
          </div>
          <div className="reborn-hero-dots"><span/><i/><i/></div>
        </section>

        <div className="reborn-content-grid">
          <div className="reborn-left-column">
            <section className="reborn-feature-panel">
              <div className="reborn-section-heading"><span><Star size={20} fill="currentColor"/> Featured Lesson</span><i/></div>
              <div className="reborn-feature-body">
                <img src={revolutionImage} alt="Historical illustration of the Philippine Revolution" />
                <div className="reborn-feature-copy">
                  <p className="reborn-feature-label">CONTINUE YOUR JOURNEY</p>
                  <h2>{featured?.title ?? "The Philippine Revolution"}</h2>
                  <p>{featured?.intro ?? "Explore the events, key figures, and significance of the Philippine Revolution."}</p>
                  <span className="reborn-duration"><Clock3 size={15}/> Approx. 15 min · {currentTermLabel}</span>
                  <Button asChild className="reborn-gold-button"><Link to={featured ? "/lessons/$lessonId" : "/dashboard"} params={featured ? { lessonId: featured.id } : undefined}>Start Lesson <ArrowRight size={16}/></Link></Button>
                </div>
              </div>
            </section>

            <section className="reborn-explore">
              <div className="reborn-section-heading"><span>Explore More</span><i/></div>
              <div className="reborn-explore-grid">
                <Link to="/timeline" className="reborn-explore-card"><img src={timelineImage} alt="Historical timeline artwork"/><span className="reborn-card-icon"><Clock3 size={17}/></span><strong>Interactive Timeline</strong><small>Relive the past, step by step.</small><ArrowUpRight className="reborn-card-arrow" size={17}/></Link>
                <Link to="/curriculum" className="reborn-explore-card"><img src={archiveImage} alt="Historical artifact"/><span className="reborn-card-icon"><Landmark size={17}/></span><strong>Source Archives</strong><small>Discover primary sources and historical documents.</small><ArrowUpRight className="reborn-card-arrow" size={17}/></Link>
                <Link to="/timeline" className="reborn-explore-card"><img src={practiceImage} alt="Cultural heritage artifact"/><span className="reborn-card-icon"><Compass size={17}/></span><strong>Map Explorer</strong><small>Explore historical places across the Philippines.</small><ArrowUpRight className="reborn-card-arrow" size={17}/></Link>
                <Link to="/games" className="reborn-explore-card"><img src={revolutionImage} alt="Philippine history learning activity"/><span className="reborn-card-icon"><Gamepad2 size={17}/></span><strong>Practice Center</strong><small>Test your knowledge with engaging activities.</small><ArrowUpRight className="reborn-card-arrow" size={17}/></Link>
              </div>
            </section>
          </div>

          <aside className="reborn-right-column">
            <section className="reborn-progress-panel">
              <div className="reborn-section-heading"><span>Your Progress</span><Sparkles size={19}/></div>
              <div className="reborn-progress-main">
                <div className="reborn-progress-ring" style={ringStyle}><div><strong>{pct}%</strong></div></div>
                <div><strong>Overall Completion</strong><span>{currentTermLabel}</span><small> {progress.completed.length} of {lessons.length} lessons completed</small></div>
              </div>
              <div className="reborn-current-lesson">
                <h3>Current Lesson</h3>
                <div className="reborn-current-row"><img src={revolutionImage} alt="Current lesson"/><div><strong>{next?.title ?? "All lessons completed!"}</strong><small>{next ? `Term ${next.term} · ${next.weeks}` : "Congratulations!"}</small></div>{next && <Link to="/lessons/$lessonId" params={{lessonId:next.id}} className="reborn-continue">Continue <ArrowRight size={14}/></Link>}</div>
              </div>
            </section>

            <section className="reborn-achievements-panel">
              <div className="reborn-section-heading"><span>Achievements</span><Link to="/achievements">View All <ArrowRight size={14}/></Link></div>
              {earnedBadges.length ? <div className="reborn-badges">{earnedBadges.slice(0,4).map((badge) => <div key={badge.id}><span><Award size={27}/></span><small>{badge.title}</small></div>)}</div> : <div className="reborn-empty-badges"><Trophy size={24}/><span>Complete lessons and quizzes to earn your first badge.</span></div>}
              <div className="reborn-xp-line"><Star size={15} fill="currentColor"/> {rewards.xp} XP earned <span>·</span> {quizzesDone(progress)} quizzes completed</div>
            </section>

            <section className="reborn-activity-panel">
              <div className="reborn-section-heading"><span>Recent Activity</span><Link to="/progress">View All <ArrowRight size={14}/></Link></div>
              {activity.length ? <ul>{activity.slice(0,3).map((item)=><li key={item.id}><i/><div><strong>{item.label}{item.score != null ? ` · ${item.score}/10` : ""}</strong><small>{formatDate(item.created_at)}</small></div>{item.points>0 && <b>+{item.points} XP</b>}</li>)}</ul> : <p className="reborn-empty-activity">Your learning journey starts here. Complete a lesson to see your activity.</p>}
              {recent && <p className="reborn-last-opened">Last opened: {recent.title}</p>}
            </section>
          </aside>
        </div>
        <footer className="reborn-footer"><span>✦ HISTORIA REBORN</span><i/> <em>Learning Today, Leading Tomorrow.</em><span className="reborn-footer-right">Grade 11 · Philippine History</span></footer>
      </main>
    </div>
  );
}
