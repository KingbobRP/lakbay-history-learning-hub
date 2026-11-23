import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ClipboardList, Gamepad2, Landmark, Star, Award, Clock3, Compass, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/lib/student";
import { lessons, terms } from "@/lib/historia-data";
import { avatarSrc } from "@/lib/avatars";
import { overallPercent } from "@/lib/progress";
import { allBadges, continueLesson, formatDate, quizzesDone } from "@/lib/achievements";
import { AvatarImg } from "@/components/AvatarPicker";
import heroFigures from "@/assets/home-hero-figures.jpg";

export function StudentDashboard() {
  const { profile, progress, activity, rewards, ready } = useStudent();
  if (!ready) return <div className="mx-auto max-w-6xl px-5 py-16 font-sans text-muted-foreground" role="status">Kinukuha ang iyong talaan…</div>;
  const name = profile?.full_name || "Mag-aaral";
  const first = name.split(" ")[0] ?? name;
  const next = continueLesson(progress);
  const recent = lessons.find((l) => l.id === progress.lastLesson);
  const pct = overallPercent(progress);
  const badges = allBadges(rewards).filter((b) => b.earned);
  const shortcuts = [
    { to: "/dashboard", label: "Mga Aralin", desc: "Tuklasin ang bawat kabanata", icon: BookOpen },
    { to: "/timeline", label: "Talaang-Panahon", desc: "Balikan ang mahahalagang yugto", icon: Clock3 },
    { to: "/quiz", label: "Pagsusulit", desc: "Subukan ang iyong kaalaman", icon: ClipboardList },
    { to: "/games", label: "Mga Laro", desc: "Matuto habang naglalaro", icon: Gamepad2 },
  ];
  return (
    <div className="home-page historia-dashboard">
      <section className="hd-hero">
        <img className="hd-hero-image" src={heroFigures} alt="" aria-hidden="true" />
        <div className="hd-hero-shade" />
        <div className="hd-hero-content">
          <p className="hd-eyebrow"><Sparkles size={14} /> MALIGAYANG PAGBABALIK</p>
          <div className="hd-profile-line">
            <AvatarImg src={avatarSrc(profile?.avatar)} size={58} />
            <div><h1>Kumusta, <em>{first}!</em></h1><p>{profile?.section || "Mag-aaral ng Baitang 11"} · Ipagpatuloy ang iyong paglalakbay sa kasaysayan.</p></div>
          </div>
          {next ? <Button asChild className="hd-primary-cta"><Link to="/lessons/$lessonId" params={{ lessonId: next.id }}> <BookOpen size={17} /> Ipagpatuloy ang Pag-aaral <ArrowRight size={17} /></Link></Button> : <p className="hd-finished">Natapos mo na ang lahat ng {lessons.length} aralin! <Trophy size={18} /></p>}
        </div>
        <div className="hd-hero-mark">HISTORIA <span>•</span> KASAYSAYANG PILIPINO</div>
      </section>

      <div className="hd-top-grid">
        <section className="hd-panel hd-progress-panel">
          <div className="hd-panel-heading"><div><p className="hd-eyebrow">ANG IYONG PAG-UNLAD</p><h2>Learning progress</h2></div><Star className="hd-gold-icon" /></div>
          <div className="hd-progress-main">
            <div className="hd-ring" style={{ background: `conic-gradient(var(--accent) ${pct * 3.6}deg, rgba(255,255,255,.10) 0deg)` }}><div><strong>{pct}%</strong><span>NAKUMPLETO</span></div></div>
            <div className="hd-progress-stats"><div><strong>{progress.completed.length}<small>/{lessons.length}</small></strong><span>Mga aralin</span></div><div><strong>{quizzesDone(progress)}<small>/{terms.length}</small></strong><span>Mga pagsusulit</span></div><div><strong>{rewards.xp}</strong><span>Experience points</span></div></div>
          </div>
          <Link to="/progress" className="hd-text-link">Tingnan ang buong progreso <ArrowRight size={15} /></Link>
        </section>
        <section className="hd-panel hd-current-panel">
          <p className="hd-eyebrow">IPAGPATULOY KUNG SAAN KA NATAPOS</p><h2>Kasalukuyang Aralin</h2>
          {next ? <><div className="hd-current-art"><img src={heroFigures} alt="" /><span>TERM {next.term} · LINGGO {next.weeks}</span></div><h3>{next.title}</h3><p>{next.intro}</p><Link className="hd-gold-link" to="/lessons/$lessonId" params={{ lessonId: next.id }}>Buksan ang aralin <ArrowRight size={16} /></Link></> : <p>Mahusay! Natapos mo na ang lahat ng aralin.</p>}
          {recent && <p className="hd-last-opened">Huling binuksan: {recent.title}</p>}
        </section>
      </div>

      <section className="hd-featured">
        <div className="hd-featured-image"><img src={heroFigures} alt="Mga bayani at tagpo sa kasaysayan ng Pilipinas" /></div>
        <div className="hd-featured-copy"><p className="hd-eyebrow"><Star size={14} /> ITAMPOK NA PAGKATUTO</p><h2>Ang kasaysayan ay hindi lamang inaalala—ito ay inuunawa.</h2><p>Palalimin ang iyong pag-unawa sa mga pangyayari, pamana, at pagbabagong humubog sa lipunang Pilipino.</p><Link to="/dashboard" className="hd-gold-link">Tuklasin ang mga aralin <ArrowRight size={16} /></Link></div>
      </section>

      <section className="hd-explore"><div className="hd-section-heading"><div><p className="hd-eyebrow">IPAGPATULOY ANG PAGTUKLAS</p><h2>Explore HISTORIA</h2></div><span>04 LEARNING SPACES</span></div><div className="hd-shortcuts">{shortcuts.map(({to,label,desc,icon:Icon}) => <Link to={to} key={to} className="hd-shortcut"><span className="hd-shortcut-icon"><Icon /></span><strong>{label}</strong><p>{desc}</p><ArrowRight className="hd-shortcut-arrow" size={17} /></Link>)}</div></section>

      <div className="hd-bottom-grid">
        <section className="hd-panel"><div className="hd-panel-heading"><div><p className="hd-eyebrow">MGA NAKAMIT</p><h2>Achievements</h2></div><Award className="hd-gold-icon" /></div>{badges.length === 0 ? <p className="hd-empty">Wala pang tsapa. Tapusin ang iyong unang aralin upang makakuha ng gantimpala.</p> : <ul className="hd-badges">{badges.slice(0,4).map((b) => <li key={b.id}><span><Award /></span><strong>{b.title}</strong></li>)}</ul>}<Link to="/achievements" className="hd-text-link">Lahat ng gantimpala <ArrowRight size={15} /></Link></section>
        <section className="hd-panel"><div className="hd-panel-heading"><div><p className="hd-eyebrow">IYONG MGA HAKBANG</p><h2>Recent activity</h2></div><Clock3 className="hd-gold-icon" /></div>{activity.length === 0 ? <p className="hd-empty">Wala pang gawain. Simulan ang isang aralin o pagsusulit!</p> : <ul className="hd-activity">{activity.slice(0,5).map((a) => <li key={a.id}><span className="hd-activity-dot" /><div><strong>{a.label}{a.score != null ? ` — ${a.score}/10` : ""}</strong><small>{formatDate(a.created_at)}</small></div>{a.points > 0 && <b>+{a.points} XP</b>}</li>)}</ul>}</section>
      </div>
      <footer className="hd-footer">✦ <span>HISTORIA</span> · Learning Today, Leading Tomorrow.</footer>
    </div>
  );
}
