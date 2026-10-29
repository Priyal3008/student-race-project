"use client";
import { useEffect, useState } from "react";
import LeaderRow from "./LeaderRow";
import { leaderboard, getMe } from "../lib/store";

// Re-reads data every 5 seconds. `code` overrides the stored player code.
export default function LeaderboardList({ code, onData }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = () => {
      const d = leaderboard(code || getMe(), 10);
      setData(d);
      if (onData) onData(d);
    };
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  if (!data) return <p className="muted">Loading the race…</p>;
  return (
    <div>
      {data.top.map((s) => (
        <LeaderRow key={s.id} student={s} isMe={data.me && s.id === data.me.id} />
      ))}
      {data.meOutside && (
        <>
          <div className="dots">...</div>
          <LeaderRow student={data.me} isMe />
        </>
      )}
    </div>
  );
}
