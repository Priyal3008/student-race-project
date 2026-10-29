"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteNav from "../../components/SiteNav";
import Footer from "../../components/Footer";
import PixelTrophy from "../../components/PixelTrophy";
import LeaderboardList from "../../components/LeaderboardList";
import { register, getByCode, shortName } from "../../lib/store";
import { BRANCHES, COLLEGES, JOIN_POINTS, REFERRAL_POINTS } from "../../lib/config";

export default function Join() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", college: "", branch: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [ref, setRef] = useState("");
  const [channel, setChannel] = useState("");
  const [inviter, setInviter] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const r = (p.get("ref") || "").toUpperCase();
      setRef(r);
      setChannel(p.get("src") || "");
      const who = r && getByCode(r);
      if (who) setInviter(shortName(who.name));
    } catch (_) {}
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function validate() {
    const e = {};
    if (!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(form.name.trim())) e.name = "Enter your full name (letters only).";
    if (form.college.trim().length < 3) e.college = "Enter your college name.";
    if (!BRANCHES.includes(form.branch)) e.branch = "Choose your branch.";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit WhatsApp number.";
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    const res = register({ ...form, ref, channel });
    if (!res.ok) {
      setErrors({ phone: res.error });
      setBusy(false);
      return;
    }
    router.push("/thanks?code=" + res.student.code);
  }

  return (
    <>
      <SiteNav refCode={ref} />
      <main className="wrap wide">
        <div className="split">
          <section>
            <div className="card">
              <h2>Register now and get a chance to earn</h2>
              <p className="sub">
                +{JOIN_POINTS} points for joining and +{REFERRAL_POINTS} points for every friend who joins through your link.
              </p>
              {inviter && <div className="badge">Invited by {inviter}</div>}
              <form onSubmit={submit} noValidate>
                <label htmlFor="name">Full name</label>
                <input id="name" value={form.name} onChange={set("name")} placeholder="e.g. Riya Deshmukh" autoComplete="name" />
                {errors.name && <div className="err">{errors.name}</div>}

                <label htmlFor="college">College</label>
                <input id="college" list="colleges" value={form.college} onChange={set("college")} placeholder="Start typing your college" />
                <datalist id="colleges">
                  {COLLEGES.map((c) => <option key={c} value={c} />)}
                </datalist>
                {errors.college && <div className="err">{errors.college}</div>}

                <label htmlFor="branch">Branch</label>
                <select id="branch" value={form.branch} onChange={set("branch")}>
                  <option value="">Select branch</option>
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.branch && <div className="err">{errors.branch}</div>}

                <label htmlFor="phone">WhatsApp number</label>
                <input
                  id="phone"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  placeholder="10-digit number"
                  autoComplete="tel"
                />
                {errors.phone && <div className="err">{errors.phone}</div>}

                <button type="submit" disabled={busy}>{busy ? "Joining…" : "Register now"}</button>
              </form>
            </div>
          </section>

          <aside>
            <div className="phone">
              <div className="lbtitle">
                <PixelTrophy size={44} />
                Leaderboard
              </div>
              <LeaderboardList />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
