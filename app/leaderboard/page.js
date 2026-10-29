"use client";
import { useEffect, useState } from "react";
import SiteNav from "../../components/SiteNav";
import Footer from "../../components/Footer";
import Avatar from "../../components/Avatar";
import PixelTrophy from "../../components/PixelTrophy";
import LeaderboardList from "../../components/LeaderboardList";
import { shortName } from "../../lib/store";

export default function LeaderboardPage() {
  const [code, setCode] = useState("");
  const [me, setMe] = useState(null);

  useEffect(() => {
    try {
      setCode((new URLSearchParams(window.location.search).get("code") || "").toUpperCase());
    } catch (_) {}
  }, []);

  return (
    <>
      <SiteNav />
      <main className="wrap">
        <div className="phone">
          <div className="chips">
            {me ? (
              <>
                <div className="chip name"><Avatar id={me.id} size={26} /> {shortName(me.name)}</div>
                <div className="chip pts"><PixelTrophy size={22} /> {me.points.toLocaleString("en-IN")}</div>
              </>
            ) : (
              <div className="chip name">Spectator</div>
            )}
          </div>
          <div className="lbtitle">
            <PixelTrophy size={52} />
            Leaderboard
          </div>
          <LeaderboardList code={code} onData={(d) => setMe(d.me)} />
        </div>
      </main>
      <Footer />
    </>
  );
}
