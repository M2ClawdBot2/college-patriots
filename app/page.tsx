"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const stories = [
  { id: 1, school: "UNIVERSITY OF MICHIGAN", tag: "CAMPUS LIFE", title: "The speech code nobody voted for", dek: "A new residence hall policy turns ordinary disagreements into reportable incidents.", time: "8 MIN", issue: "01", accent: "red" },
  { id: 2, school: "UCLA", tag: "INVESTIGATION", title: "$2.4M for an office students can't name", dek: "We followed the fees, the committees, and the six-figure consultants.", time: "11 MIN", issue: "02", accent: "blue" },
  { id: 3, school: "GEORGETOWN", tag: "VIDEO", title: "The debate that almost didn't happen", dek: "Watch what happened when students refused to cancel the conversation.", time: "6:42", issue: "03", accent: "black" },
  { id: 4, school: "ARIZONA STATE", tag: "FIELD NOTES", title: "The mandatory workshop with optional truth", dek: "A first-person account from inside orientation week.", time: "5 MIN", issue: "04", accent: "gold" },
  { id: 5, school: "CORNELL", tag: "DOCUMENTS", title: "Read the memo they hoped you'd ignore", dek: "Internal emails reveal how a student resolution became administrative policy.", time: "9 MIN", issue: "05", accent: "red" },
  { id: 6, school: "UNIVERSITY OF TEXAS", tag: "CULTURE", title: "A comedy show met the campus approval process", dek: "Twenty-three pages later, only the punchline was missing.", time: "4 MIN", issue: "06", accent: "blue" },
];

const states = ["ALL", "MIDWEST", "WEST", "SOUTH", "NORTHEAST"];

export default function Home() {
  const [region, setRegion] = useState("ALL");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [game, setGame] = useState(false);
  const [score, setScore] = useState(0);
  const featured = useMemo(() => stories.slice(0, region === "ALL" ? 6 : 3), [region]);

  return (
    <main>
      <header className="masthead">
        <Link className="brand" href="/" aria-label="College Patriots home"><span className="seal">CP</span><span>COLLEGE<br/>PATRIOTS</span></Link>
        <nav aria-label="Primary navigation"><a href="#dispatches">Dispatches</a><a href="#watch">Watch</a><a href="#arcade">Arcade</a><a href="#about">About</a></nav>
        <Link className="studio-link" href="/studio">EDITORIAL STUDIO ↗</Link>
      </header>

      <section className="hero">
        <div className="eyebrow"><span>EST. 2026</span><span>STUDENT NEWS NETWORK</span><span>ISSUE NO. 001</span></div>
        <h1>THE CAMPUS<br/><em>RECORD,</em> UNFILTERED.</h1>
        <div className="hero-bottom">
          <p>Original reporting and video dispatches from students documenting the ideas, policies, and institutions shaping American campus life.</p>
          <div className="scroll-note">SCROLL TO ENTER<br/><span>↓</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Latest updates"><span>LIVE DESK</span><div>NEW: UCLA STUDENTS QUESTION $2.4M PROGRAM&nbsp;&nbsp;◆&nbsp;&nbsp; VIDEO: THE DEBATE THAT ALMOST DIDN'T HAPPEN&nbsp;&nbsp;◆&nbsp;&nbsp; 14 CAMPUSES REPORTING THIS WEEK</div></section>

      <section className="lead-story" id="dispatches">
        <div className="lead-mark"><span>THE</span><strong>BIG</strong><span>STORY</span></div>
        <div className="lead-copy"><div className="story-meta"><span>UNIVERSITY OF MICHIGAN</span><span>CAMPUS LIFE</span><span>JUL 31, 2026</span></div><h2>The speech code<br/>nobody voted for.</h2><p>A new residence hall policy turns ordinary disagreements into reportable incidents. Students tell us how it happened—and what comes next.</p><button className="read-button">READ THE REPORT <span>↗</span></button></div>
        <div className="lead-visual"><div className="issue-number">01</div><div className="quote">“Nobody could tell us who wrote it.”</div><div className="campus-lines" aria-hidden="true"><i/><i/><i/><i/><i/></div></div>
      </section>

      <section className="dispatches">
        <div className="section-head"><div><span className="index">/02</span><h2>FIELD<br/>DISPATCHES</h2></div><div className="filters" aria-label="Filter dispatches">{states.map(s => <button className={region===s ? "active" : ""} onClick={()=>setRegion(s)} key={s}>{s}</button>)}</div></div>
        <div className="story-grid">{featured.map((story) => <article className={`story-card ${story.accent}`} key={story.id}><div className="card-top"><span>{story.issue}</span><span>{story.tag}</span></div><div className="school">{story.school}</div><h3>{story.title}</h3><p>{story.dek}</p><div className="card-foot"><span>{story.time}</span><button aria-label={`Read ${story.title}`}>↗</button></div></article>)}</div>
      </section>

      <section className="watch" id="watch"><div className="section-head light"><div><span className="index">/03</span><h2>WATCH THE<br/>RECORD</h2></div><p>Reports, interviews, and first-person footage<br/>from the students who were there.</p></div><div className="video-feature"><div className="video-poster"><button aria-label="Play featured video">▶</button><span>06:42</span><div className="video-word">DEBATE</div></div><div className="video-info"><span>GEORGETOWN · VIDEO REPORT</span><h3>The debate that almost didn't happen</h3><p>When administrators pulled the venue, students built their own stage.</p><div className="platforms">WATCH ON <b>YOUTUBE</b><b>INSTAGRAM</b><b>𝕏</b></div></div></div></section>

      <section className="arcade" id="arcade"><div><span className="index">/04</span><h2>CAMPUS<br/><em>ARCADE</em></h2><p>News literacy, campus absurdity, and bragging rights. A two-minute reset between reports.</p><button className="read-button dark" onClick={()=>setGame(!game)}>{game ? "CLOSE GAME" : "PLAY TODAY'S GAME"} <span>→</span></button></div><div className="game-card"><div className="game-label">TODAY'S GAME · POLICY OR PARODY?</div>{game ? <div className="game-live"><p>“All spontaneous expression must be reserved 72 hours in advance.”</p><div><button onClick={()=>setScore(score+1)}>REAL POLICY</button><button onClick={()=>setScore(score+1)}>PARODY</button></div><b>SCORE {score}/5</b></div> : <><div className="pixel-flag">?</div><h3>POLICY OR<br/>PARODY?</h3><p>Can you tell a real campus rule from one we made up?</p></>}</div></section>

      <section className="newsletter"><span>THE WEEKLY BRIEF</span><h2>Seven days.<br/>Five stories.<br/><em>Zero spin.</em></h2>{joined ? <div className="success">YOU'RE ON THE LIST. WATCH YOUR INBOX. ✓</div> : <form onSubmit={(e)=>{e.preventDefault(); if(email) setJoined(true)}}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="YOUR EMAIL ADDRESS" value={email} onChange={e=>setEmail(e.target.value)}/><button>JOIN THE BRIEF →</button></form>}<p>One sharp email every Friday. Unsubscribe whenever.</p></section>

      <footer id="about"><div className="footer-brand"><span className="seal">CP</span><h2>COLLEGE<br/>PATRIOTS</h2></div><p>Independent student reporting from universities across the United States. Stories are attributed to the school—not the student.</p><div className="footer-links"><div><b>EXPLORE</b><a href="#dispatches">Dispatches</a><a href="#watch">Video</a><a href="#arcade">Arcade</a></div><div><b>FOLLOW</b><a href="#">X / Twitter</a><a href="#">YouTube</a><a href="#">Instagram</a></div></div><div className="copyright">© 2026 COLLEGE PATRIOTS <span>THE CAMPUS RECORD, UNFILTERED.</span></div></footer>
    </main>
  );
}
