// Shared data layer (demo mode): seed students + students saved in this browser.
// Browser-only: call from useEffect / event handlers, never during server render.
import { getSeed } from "./seed";
import { JOIN_POINTS, REFERRAL_POINTS, GOAL } from "./config";

const K_USERS = "sr_users";
const K_ME = "sr_me";
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CHANNELS = ["ambassador", "referral", "club", "linkedin", "direct"];

function read(key, fallback) {
  try {
    const v = JSON.parse(window.localStorage.getItem(key));
    return v ?? fallback;
  } catch (_) {
    return fallback;
  }
}
function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_) {
    return false;
  }
}

export function getMe() {
  return read(K_ME, "");
}
export function setMe(code) {
  write(K_ME, code);
}
export function resetDemo() {
  try {
    window.localStorage.removeItem(K_USERS);
    window.localStorage.removeItem(K_ME);
  } catch (_) {}
}

// "Riya Deshmukh" -> "Riya D."
export function shortName(name = "") {
  const parts = name.trim().split(/\s+/);
  const last = parts.length > 1 ? " " + parts[parts.length - 1][0].toUpperCase() + "." : "";
  return parts[0] + last;
}

// All students (seed + local), each with referrals, points and rank fields, sorted by rank.
export function getAll() {
  const local = read(K_USERS, []);
  const all = [...getSeed(), ...local];
  const counts = {};
  for (const s of local) if (s.refBy) counts[s.refBy] = (counts[s.refBy] || 0) + 1;
  const withPoints = all.map((s) => {
    const referrals = (s.baseReferrals || 0) + (counts[s.code] || 0);
    return { ...s, referrals, points: JOIN_POINTS + REFERRAL_POINTS * referrals };
  });
  // Most referrals first; ties go to whoever joined earlier.
  withPoints.sort((a, b) => b.referrals - a.referrals || a.joinedAt - b.joinedAt);
  return withPoints.map((s, i) => ({ ...s, rank: i + 1 }));
}

export function getByCode(code) {
  if (!code) return null;
  const c = String(code).trim().toUpperCase();
  return getAll().find((s) => s.code === c) || null;
}

export function rankOf(code) {
  const all = getAll();
  const me = all.find((s) => s.code === String(code).toUpperCase());
  return { rank: me ? me.rank : null, total: all.length };
}

function newCode(existing) {
  for (;;) {
    let c = "";
    for (let i = 0; i < 6; i++) c += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    if (!existing.has(c)) return c;
  }
}

// Returns { ok: true, student } or { ok: false, error }
export function register({ name, college, branch, phone, ref, channel }) {
  const all = getAll();
  if (all.some((s) => s.phone === phone)) {
    return { ok: false, error: "This WhatsApp number is already registered." };
  }
  const referrer = ref ? all.find((s) => s.code === String(ref).toUpperCase()) : null;
  const student = {
    id: "u-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    code: newCode(new Set(all.map((s) => s.code))),
    name: name.trim(),
    college: college.trim(),
    branch,
    phone,
    channel: referrer ? "referral" : CHANNELS.includes(channel) ? channel : "direct",
    refBy: referrer ? referrer.code : null,
    joinedAt: Date.now(),
  };
  const local = read(K_USERS, []);
  local.push(student);
  if (!write(K_USERS, local)) {
    return { ok: false, error: "Could not save in this browser. Please allow storage and retry." };
  }
  setMe(student.code);
  return { ok: true, student: getByCode(student.code) };
}

// Top n rows plus the current player (and whether they are outside the top n).
export function leaderboard(code, n = 10) {
  const all = getAll();
  const me = code ? all.find((s) => s.code === String(code).toUpperCase()) || null : null;
  return { top: all.slice(0, n), me, meOutside: !!me && me.rank > n, total: all.length };
}

export function stats() {
  const all = getAll();
  const countBy = (fn) => {
    const m = {};
    for (const s of all) m[fn(s)] = (m[fn(s)] || 0) + 1;
    return m;
  };
  // Last 7 days, oldest first
  const byDay = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const start = d.getTime();
    const label = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" });
    byDay.push({ label, count: all.filter((s) => s.joinedAt >= start && s.joinedAt < start + 86400000).length });
  }
  const toList = (m) => Object.entries(m).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
  return {
    total: all.length,
    goal: GOAL,
    byChannel: toList(countBy((s) => s.channel)),
    byBranch: toList(countBy((s) => s.branch)),
    byDay,
    topReferrers: all.slice(0, 5),
  };
}
