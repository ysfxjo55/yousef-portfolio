import { useRef, type CSSProperties } from "react";
import { MONITOR_FLIES, MONITOR_ROWS, MONITOR_STEPS, MONITOR_TILES } from "@/content/demoData";
import { useActive, useReducedMotion, useStepper } from "../hooks";
import { HEX, village } from "./village";

const ROLE = "'Instrument Sans',sans-serif";

/**
 * The desk monitor: a tiny Agents World. Six tiles appear once, 420ms apart, then one
 * session flips to "working". It runs once, pauses when off screen or in a hidden tab,
 * and jumps straight to the end state under reduced motion. All data is simulated.
 */
export function Monitor({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const active = useActive(ref);
  const step = useStepper(MONITOR_STEPS, 420, active, reduced);
  const busy = step >= MONITOR_STEPS;
  const working = busy ? 2 : 1;

  const tiles = MONITOR_TILES.slice(0, Math.min(6, step)).map(t => {
    const glow = !!t.hot && busy;
    const houses = t.lab ? 2 : (parseInt(t.label.split("· ")[1] ?? "1", 10) || 1) + 1;
    return { t, glow, props: village(t.l * 7 + t.t, Math.min(4, houses), t.lab ? 1 : 3, t.lab) };
  });

  return (
    <div ref={ref} className="lab-obj cq lab-monitor">
      <button className="lab-objbtn" onClick={onOpen} aria-label="Monitor showing Agents World. Open the Agents World project" style={{ borderRadius: 10 }}>
        <div style={{ position: "relative", background: "linear-gradient(180deg,#2d352f,#212823)", borderRadius: "2.4cqw", padding: "3.2cqw 3.2cqw 4.6cqw", boxShadow: "0 4cqw 7cqw rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.07),inset 0 0 0 1px rgba(255,255,255,.04)" }}>
          <div style={{ aspectRatio: "16/10", background: "#0b100e", borderRadius: "1.2cqw", boxShadow: "inset 0 0 3cqw rgba(0,0,0,.8)", overflow: "hidden", display: "grid", gridTemplateColumns: "32% minmax(0,1fr)", fontFamily: ROLE }}>
            <div style={{ background: "#121815", borderRight: "1px solid rgba(235,230,218,.06)", padding: "3.4cqw 2.6cqw", display: "flex", flexDirection: "column", gap: "1.6cqw", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1cqw" }}>
                <span style={{ font: `600 2.8cqw/1 ${ROLE}`, color: "#ebe6da", whiteSpace: "nowrap" }}>Agents World</span>
                <span style={{ font: `400 1.8cqw/1 ${ROLE}`, color: "#9db89f", whiteSpace: "nowrap" }}>● live</span>
              </div>
              <div style={{ display: "flex", gap: "1cqw", flexWrap: "wrap", marginBottom: ".6cqw" }}>
                <span style={{ font: `400 1.9cqw/1 ${ROLE}`, color: "#cfe0cf", border: "1px solid rgba(157,184,159,.35)", background: busy ? "rgba(157,184,159,.16)" : "transparent", borderRadius: "9cqw", padding: ".8cqw 1.4cqw", transition: "background .4s" }}>● {working} working</span>
                <span style={{ font: `400 1.9cqw/1 ${ROLE}`, color: "#a8ada3", border: "1px solid rgba(235,230,218,.12)", borderRadius: "9cqw", padding: ".8cqw 1.4cqw" }}>{busy ? 8 : 9} sleeping</span>
              </div>
              {MONITOR_ROWS.map(([name, status], i) => {
                const st = i === 1 && busy ? "working" : status;
                const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: "1cqw", padding: "1.1cqw 1.4cqw", borderRadius: "1cqw", background: i === 1 && busy ? "rgba(157,184,159,.14)" : i === 0 ? "rgba(36,89,106,.25)" : "transparent", font: `400 2.2cqw/1.2 ${ROLE}`, color: "#d9d5ca", opacity: step >= 1 ? 1 : 0, transition: "opacity .3s" };
                return (
                  <div key={name} style={row}>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
                    <span style={{ flex: "none", color: st === "working" ? "#9db89f" : "#7f877c", font: `400 1.8cqw/1.2 ${ROLE}` }}>{st}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ position: "relative", background: "radial-gradient(ellipse 90% 70% at 50% 75%,#163322,#0e1a17 60%,#0c1216)", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "2.6cqw", right: "2.6cqw", display: "flex", gap: "1cqw" }}>
                {["Chat", "Overview"].map(l => (
                  <span key={l} style={{ font: `500 1.9cqw/1 ${ROLE}`, color: "#d9d5ca", border: "1px solid rgba(235,230,218,.16)", borderRadius: "1cqw", padding: "1cqw 1.6cqw" }}>{l}</span>
                ))}
              </div>
              <span aria-hidden style={{ position: "absolute", left: "-8%", top: "8%", width: "48%", aspectRatio: "1.6/1", clipPath: "polygon(50% 0,100% 100%,0 100%)", background: "linear-gradient(160deg,#1b3324,#122019 70%)" }} />
              <span aria-hidden style={{ position: "absolute", left: "30%", top: "14%", width: "36%", aspectRatio: "1.7/1", clipPath: "polygon(46% 0,100% 100%,0 100%)", background: "linear-gradient(200deg,#18301f,#101c16 70%)" }} />
              <span aria-hidden style={{ position: "absolute", right: "-10%", top: "4%", width: "46%", aspectRatio: "1.5/1", clipPath: "polygon(55% 0,100% 100%,0 100%)", background: "linear-gradient(170deg,#1a3122,#111d17 70%)" }} />
              {MONITOR_FLIES.slice(0, Math.max(0, step - 1)).map(([x, y]) => (
                <span key={`${x}-${y}`} aria-hidden style={{ position: "absolute", left: x + "%", top: y + "%", width: ".7cqw", height: ".7cqw", background: "#c9d77a", opacity: 0.55 }} />
              ))}
              {tiles.map(({ t, glow, props }) => (
                <div key={t.label} style={{ position: "absolute", left: t.l + "%", top: t.t + "%", width: "28%", aspectRatio: "2.3/1", animation: reduced ? "none" : "labFade .35s ease both" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, top: "18%", bottom: "-22%", clipPath: HEX, background: "linear-gradient(180deg,#1c3a25 0 60%,#14251a 60%)" }} />
                  <div style={{ position: "absolute", inset: 0, clipPath: HEX, background: glow ? "linear-gradient(180deg,#4f8f5c,#2f6a3e)" : `linear-gradient(180deg,${t.c},${t.lab ? "#1b4553" : "#265634"})`, transition: "background .4s" }} />
                  {props.map((p, i) => <span key={i} style={p} />)}
                  <span style={{ position: "absolute", left: "50%", bottom: "78%", transform: "translateX(-50%)", whiteSpace: "nowrap", font: `600 1.9cqw/1 ${ROLE}`, color: t.lab ? "#0e2a30" : "#ebe6da", background: t.lab ? "#8fd0d8" : glow ? "#24302a" : "rgba(12,16,14,.9)", border: glow ? "1px solid #9db89f" : "1px solid rgba(235,230,218,.14)", borderRadius: "9cqw", padding: ".9cqw 1.4cqw" }}>{t.label}</span>
                </div>
              ))}
              <span style={{ position: "absolute", left: "2.4cqw", bottom: "2cqw", font: "500 1.8cqw/1 'IBM Plex Mono',monospace", letterSpacing: ".1em", color: "#c9a17f" }}>SIMULATED</span>
            </div>
          </div>
          <div aria-hidden style={{ position: "absolute", bottom: "1.7cqw", left: "50%", width: "1.3cqw", height: "1.3cqw", marginLeft: "-.65cqw", borderRadius: "50%", background: "#9db89f", boxShadow: "0 0 1.6cqw rgba(157,184,159,.6)" }} />
        </div>
        <div aria-hidden style={{ width: "13%", height: "9cqw", margin: "0 auto", background: "linear-gradient(90deg,#1c221e,#2b322d 50%,#1c221e)" }} />
        <div aria-hidden style={{ width: "46%", height: "2.6cqw", margin: "0 auto", borderRadius: "1.4cqw 1.4cqw .6cqw .6cqw", background: "linear-gradient(180deg,#323a34,#1f2521)", boxShadow: "0 2.4cqw 4cqw rgba(0,0,0,.55)" }} />
        <div className="lab-cap" style={{ marginTop: 16, textAlign: "center" }}><b>01</b> — Agents World · session monitor</div>
      </button>
    </div>
  );
}
