import type { CSSProperties } from "react";

/** Hexagon clip used by every tile on the monitor and in the Agents World demo. */
export const HEX = "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)";

const ROOFS = ["#7d4b60", "#3f4f8c", "#8a5c3c", "#5a4a86"];
const WALLS = ["#d8cdbb", "#c3c6d6", "#cfc2b0"];

/** Deterministic little houses and trees for a hex tile (same seed, same village). */
export function village(seed: number, houses: number, trees: number, lab?: boolean): CSSProperties[] {
  let r = seed * 9301 + 49297;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  const items: { y: number; s: CSSProperties }[] = [];
  for (let i = 0; i < houses; i++) {
    const x = 26 + (i * 48) / Math.max(1, houses - 1 || 1) + (rnd() * 8 - 4);
    const y = 52 + rnd() * 24;
    const w = 10 + rnd() * 3;
    const roof = lab ? "#7fc4d0" : ROOFS[Math.floor(rnd() * ROOFS.length)];
    const wall = lab ? "#cfe6ea" : WALLS[Math.floor(rnd() * WALLS.length)];
    items.push({ y, s: { position: "absolute", left: x + "%", top: y + "%", width: w + "%", aspectRatio: "1/1.2", transform: "translate(-50%,-100%)", clipPath: "polygon(50% 0,100% 40%,100% 100%,0 100%,0 40%)", background: `radial-gradient(circle at 50% 74%,#f2d684 0 10%,transparent 11%),linear-gradient(180deg,${roof} 0 42%,${wall} 42% 100%)` } });
  }
  for (let i = 0; i < trees; i++) {
    const x = 16 + rnd() * 68;
    const y = 34 + rnd() * 46;
    const w = 8 + rnd() * 3;
    items.push({ y, s: { position: "absolute", left: x + "%", top: y + "%", width: w + "%", aspectRatio: ".6/1", transform: "translate(-50%,-100%)", clipPath: "polygon(50% 0,100% 100%,0 100%)", background: "linear-gradient(180deg,#14301c,#0d2214)" } });
  }
  return items.sort((a, b) => a.y - b.y).map(i => i.s);
}
