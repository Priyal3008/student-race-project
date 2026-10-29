// Clean trophy icon (kept under the same name so imports stay stable).
const PALETTES = {
  gold: { a: "#f5c518", b: "#c99a00", c: "#fff2a8" },
  silver: { a: "#cfd4db", b: "#8d95a1", c: "#ffffff" },
  bronze: { a: "#d99a64", b: "#97602f", c: "#f3cfae" },
  ink: { a: "#0d0d0d", b: "#000000", c: "#e3f78c" },
};

export default function PixelTrophy({ size = 48, variant = "gold", className = "", style }) {
  const p = PALETTES[variant] || PALETTES.gold;
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path d="M12 6h24v14a12 12 0 0 1-24 0V6z" fill={p.a} />
      <path d="M12 6h6v26a12 12 0 0 1-6-12V6z" fill={p.c} opacity=".55" />
      <path d="M12 10H5v4a8 8 0 0 0 8 8M36 10h7v4a8 8 0 0 1-8 8" fill="none" stroke={p.b} strokeWidth="3" strokeLinecap="round" />
      <rect x="21" y="30" width="6" height="8" fill={p.b} />
      <rect x="14" y="38" width="20" height="5" rx="2" fill={p.a} />
      <rect x="14" y="41" width="20" height="2" fill={p.b} />
    </svg>
  );
}
