"use client";
import { useEffect, useState } from "react";
import SiteNav from "../../components/SiteNav";
import Footer from "../../components/Footer";
import { stats, resetDemo, shortName } from "../../lib/store";

function BarList({ title, items }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div className="card">
      <h2>{title}</h2>
      {items.map((i) => (
        <div className="row" key={i.label}>
          <span className="rl">{i.label}</span>
          <div className="bar"><i style={{ width: (i.count / max) * 100 + "%" }} /></div>
          <b className="rc">{i.count}</b>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const [s, setS] = useState(null);
  const load = () => setS(stats());

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  if (!s) return <><SiteNav /><main className="wrap"><p className="muted">Loading…</p></main></>;
  const pct = Math.min(100, Math.round((s.total / s.goal) * 100));

  return (
    <>
      <SiteNav />
      <main className="wrap wide">
        <h1 className="title small">Campaign dashboard</h1>
        <div className="card">
          <h2>{s.total} / {s.goal} registrations</h2>
          <div className="bar big"><i style={{ width: pct + "%" }} /></div>
          <p className="muted">{pct}% of goal</p>
        </div>
        <div className="split2">
          <BarList title="By channel" items={s.byChannel} />
          <BarList title="By branch" items={s.byBranch} />
          <BarList title="By day (last 7)" items={s.byDay} />
          <div className="card">
            <h2>Top 5 referrers</h2>
            {s.topReferrers.map((t) => (
              <div className="row" key={t.id}>
                <span className="rl">#{t.rank} {shortName(t.name)}</span>
                <span className="muted grow">{t.college}</span>
                <b className="rc">{t.referrals}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="center">
          <button type="button" className="ghost" onClick={() => { resetDemo(); load(); }}>Reset demo data</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
