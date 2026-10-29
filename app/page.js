"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";
import VideoBox from "../components/VideoBox";
import LeaderRow from "../components/LeaderRow";
import { leaderboard } from "../lib/store";
import { JOIN_POINTS, REFERRAL_POINTS } from "../lib/config";

export default function Landing() {
  const [ref, setRef] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const r = new URLSearchParams(window.location.search).get("ref");
      if (r) setRef(r.toUpperCase());
    } catch (_) {}
    const load = () => setData(leaderboard("", 3));
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const joinHref = "/join" + (ref ? "?ref=" + ref : "");

  return (
    <>
      <SiteNav home refCode={ref} />
      <main className="wrap wide">
        <section className="hero">
          <h1 className="title">
            BUILD YOUR FIRST <span className="pill">AI</span> PROJECT IN 60 MIN
          </h1>
          <div className="herocard">
            <div className="spark" aria-hidden="true">✺</div>
            <h2>Welcome</h2>
            <p>
              Free live workshop for final-year engineering students. Join the clan and earn +{REFERRAL_POINTS} points for every friend you
              invite.
            </p>
            <Link className="btn lime" href={joinHref}>Join the clan</Link>
          </div>
        </section>

        <section className="bento">
          <div className="b-video">
            <VideoBox />
          </div>
          <div className="b-lime">
            <div className="tags"><span>Free</span><span>Live online</span><span>Final-year</span></div>
            <h3>Earn while you learn</h3>
            <p>
              +{JOIN_POINTS} points for joining and +{REFERRAL_POINTS} for every friend who registers through your link. Climb the leaderboard
              and bring your whole class.
            </p>
            <Link className="arrow" href={joinHref} aria-label="Join the clan">↗</Link>
          </div>
          <div className="b-stat light"><b>{data ? data.total : "--"}</b><span>Racers in</span></div>
          <div className="b-stat dark"><b>{data && data.top[0] ? data.top[0].points.toLocaleString("en-IN") : "--"}</b><span>Top score</span></div>
        </section>

        <section className="block">
          <h2 className="sec">Top racers right now</h2>
          <div className="card">
            {data ? data.top.map((s) => <LeaderRow key={s.id} student={s} />) : <p className="muted">Loading…</p>}
            <div className="center"><Link className="btn ghost" href="/leaderboard">Full leaderboard</Link></div>
          </div>
        </section>

        <section className="block" id="about-us">
          <h2 className="sec">About us</h2>
          <div className="card">
            <p>
              Student Race turns learning into a game. Join the clan, get your personal invite link and bring your friends. The more friends
              you bring, the higher you climb the leaderboard.
            </p>
            <div className="grid3">
              <div className="step"><b>1</b><p>Join the clan and get <b>+{JOIN_POINTS}</b> points instantly.</p></div>
              <div className="step"><b>2</b><p>Share your invite link on WhatsApp.</p></div>
              <div className="step"><b>3</b><p>Earn <b>+{REFERRAL_POINTS}</b> points for every friend who joins.</p></div>
            </div>
          </div>
        </section>

        <section className="block" id="company">
          <h2 className="sec">About the company</h2>
          <div className="card">
            <p>
              NxtWave is an ed-tech company on a mission to help students become job-ready in modern technology. It runs hands-on, project-first
              programs so students learn by building real things, not by memorising theory.
            </p>
            <p className="muted">(Sample text: replace with your official company description.)</p>
          </div>
        </section>

        <section className="block" id="course">
          <h2 className="sec">About the course</h2>
          <div className="card">
            <p><b>Build Your First AI Project in 60 Minutes</b></p>
            <ul className="list">
              <li>Free, live and online. No coding experience with AI needed.</li>
              <li>Pick a branch-specific idea and build it with AI tools during the session.</li>
              <li>Leave with a working project you can show recruiters.</li>
              <li>Open to final-year engineering students from any branch.</li>
            </ul>
            <div className="center"><Link className="btn" href={joinHref}>Join the clan</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
