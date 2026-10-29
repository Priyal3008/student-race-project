"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SiteNav from "../../components/SiteNav";
import Footer from "../../components/Footer";
import Avatar from "../../components/Avatar";
import { getAll, getByCode, getMe, shortName } from "../../lib/store";
import { randomIdea } from "../../lib/ideas";
import { JOIN_POINTS, REFERRAL_POINTS } from "../../lib/config";

export default function Thanks() {
  const [code, setCode] = useState("");
  const [state, setState] = useState({ loading: true, me: null, total: 0, above: null });
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);
  const [idea, setIdea] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    let c = "";
    try {
      c = (new URLSearchParams(window.location.search).get("code") || "").toUpperCase() || getMe();
    } catch (_) {}
    setCode(c);
    const load = () => {
      const all = getAll();
      const me = getByCode(c);
      setState({ loading: false, me, total: all.length, above: me && me.rank > 1 ? all[me.rank - 2] : null });
    };
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  const { me, above, total, loading } = state;

  if (!loading && !me) {
    return (
      <>
        <SiteNav />
        <main className="wrap">
          <div className="card">
            <h2>We couldn&apos;t find your profile</h2>
            <p>Please register first.</p>
            <Link className="btn" href="/join">Join the clan</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  if (!me) return <><SiteNav /><main className="wrap"><p className="muted">Loading…</p></main></>;

  const first = me.name.trim().split(/\s+/)[0];
  const link = origin + "/?ref=" + me.code;
  const msg =
    "Hey! I just joined the free workshop 'Build Your First AI Project in 60 Minutes'. Join the clan with my link and we both climb the leaderboard: " + link;
  const wa = "https://wa.me/?text=" + encodeURIComponent(msg);
  const need = above ? above.referrals - me.referrals + 1 : 0;
  const nudge = above
    ? `Invite ${need} more friend${need === 1 ? "" : "s"} to overtake ${shortName(above.name)}`
    : "You're #1! Keep inviting to stay ahead.";

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
    } catch (_) {
      try {
        const ta = document.createElement("textarea");
        ta.value = link;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch (__) {}
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <SiteNav />
      <main className="wrap">
        <div className="center">
          <Avatar id={me.id} size={88} />
          <h1 className="title small">You&apos;re in, {first}!</h1>
        </div>

        <div className="grid">
          <div className="card stat"><b>#{me.rank}</b><span>of {total}</span></div>
          <div className="card stat"><b>{me.points.toLocaleString("en-IN")}</b><span>points</span></div>
          <div className="card stat"><b>{me.referrals}</b><span>friends invited</span></div>
        </div>

        <div className="card">
          <h2>Your reward points</h2>
          <div className="pts-row"><span>Joined the clan</span><b>+{JOIN_POINTS}</b></div>
          <div className="pts-row"><span>{me.referrals} friend{me.referrals === 1 ? "" : "s"} joined × {REFERRAL_POINTS}</span><b>+{me.referrals * REFERRAL_POINTS}</b></div>
          <div className="pts-row total"><span>Total</span><b>{me.points.toLocaleString("en-IN")}</b></div>
        </div>

        <div className="card">
          <p className="nudge">{nudge}</p>
          <h2>Your invite link</h2>
          <div className="linkbox">{link}</div>
          <a className="btn green" href={wa} target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>{" "}
          <button type="button" className="ghost" onClick={copy}>{copied ? "Copied!" : "Copy link"}</button>
        </div>

        <div className="card">
          <h2>Need an AI project idea?</h2>
          {idea && <p className="idea">{idea}</p>}
          <button type="button" onClick={() => setIdea(randomIdea(me.branch, idea))}>
            {idea ? "Another idea" : "Give me an idea"}
          </button>
        </div>

        <div className="center">
          <Link className="btn" href={"/leaderboard?code=" + me.code}>See the leaderboard</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
