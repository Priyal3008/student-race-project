// Symmetric 5x5 avatar, colour derived from a hash of the id.
function hash(str) {
  let h = 2166136261;
  for (const ch of String(str)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function Avatar({ id = "x", size = 44 }) {
  const h = hash(id);
  const hue = h % 360;
  const fg = `hsl(${hue} 70% 45%)`;
  const bg = `hsl(${hue} 70% 90%)`;
  const cells = [];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) {
      if ((h >> (y * 3 + x)) & 1) {
        cells.push(<rect key={x + "-" + y} x={x} y={y} width="1" height="1" fill={fg} />);
        if (x < 2) cells.push(<rect key={"m" + x + "-" + y} x={4 - x} y={y} width="1" height="1" fill={fg} />);
      }
    }
  }
  return (
    <svg className="avatar" viewBox="0 0 5 5" width={size} height={size} shapeRendering="crispEdges" aria-hidden="true">
      <rect width="5" height="5" fill={bg} />
      {cells}
    </svg>
  );
}
