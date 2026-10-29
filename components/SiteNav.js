import Link from "next/link";
import PixelTrophy from "./PixelTrophy";

// `home` = true on the landing page, where About links scroll to sections.
export default function SiteNav({ home = false, refCode = "" }) {
  const base = home ? "" : "/";
  const joinHref = "/join" + (refCode ? "?ref=" + refCode : "");
  return (
    <header className="topnav">
      <Link className="brand" href="/">
        <PixelTrophy size={26} variant="ink" /> Student Race
      </Link>
      <nav className="navlinks">
        <a href={base + "#about-us"}>About us</a>
        <a href={base + "#company"}>The company</a>
        <a href={base + "#course"}>The course</a>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link className="btn small" href={joinHref}>Join the clan</Link>
      </nav>
    </header>
  );
}
