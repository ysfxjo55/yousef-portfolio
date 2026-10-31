import { useState } from "react";
import { CARDIO_CASES, cardioCounts } from "@/content/demoData";

/** Threshold slider over 24 synthetic cases. These are not results from the project. */
export function CardioDemo() {
  const [thr, setThr] = useState(0.5);
  const { tp, fn, fp, tn } = cardioCounts(thr);
  const x = `calc(${thr * 100}% * 0.9 + 5%)`;
  const stats = [
    { k: "positives caught", v: tp, c: "#9db89f" }, { k: "positives missed", v: fn, c: "#c9a17f" },
    { k: "false alarms", v: fp, c: "#c9a17f" }, { k: "negatives cleared", v: tn, c: "#d9d5ca" },
  ];
  return (
    <div className="lab-demo">
      <div className="lab-demo-head"><span className="lab-demo-title">Inspect a model: move the threshold</span><span className="lab-tag">synthetic cases</span></div>
      <p className="lab-demo-sub" style={{ marginBottom: 16 }}>24 made-up cases with a risk score. Cases at or above the threshold are flagged.</p>
      <div aria-hidden style={{ position: "relative", height: 120, background: "#141a16", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: x, right: 0, background: "rgba(157,184,159,.08)" }} />
        <div style={{ position: "absolute", left: 10, top: 10, font: "400 10.5px/1 'IBM Plex Mono',monospace", color: "#8f978c" }}>positive</div>
        <div style={{ position: "absolute", left: 10, bottom: 10, font: "400 10.5px/1 'IBM Plex Mono',monospace", color: "#8f978c" }}>negative</div>
        {CARDIO_CASES.map(([sc, pos], i) => {
          const flagged = sc >= thr - 1e-9, missed = !!pos && !flagged, falseAlarm = !pos && flagged;
          return <span key={i} style={{ position: "absolute", left: `calc(${sc * 100}% * 0.9 + 5%)`, top: pos ? "32%" : "70%", width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", background: pos ? (missed ? "#c9a17f" : "#9db89f") : "transparent", border: pos ? "none" : `1.5px solid ${falseAlarm ? "#c9a17f" : "#8f978c"}`, boxShadow: missed ? "0 0 0 3px rgba(201,161,127,.3)" : "none", transition: "background .2s, border-color .2s" }} />;
        })}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: x, width: 2, marginLeft: -1, background: "#ebe6da" }} />
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16, font: "400 13px/1 'IBM Plex Mono',monospace", color: "#d9d5ca" }}>
        <span style={{ flex: "none" }}>threshold {thr.toFixed(2)}</span>
        <input type="range" min="0.05" max="0.95" step="0.05" value={thr} onChange={e => setThr(parseFloat(e.target.value))} aria-label="Decision threshold" aria-valuetext={`${thr.toFixed(2)}: ${tp} caught, ${fn} missed, ${fp} false alarms`} style={{ flex: 1, accentColor: "#9db89f", minHeight: 44 }} />
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 8, marginTop: 8 }}>
        {stats.map(s => (
          <div key={s.k} style={{ background: "#141a16", borderRadius: 6, padding: 12 }}>
            <div style={{ font: "400 28px/1 'Newsreader',serif", color: s.c }}>{s.v}</div>
            <div style={{ font: "400 12.5px/1.35 'Instrument Sans',sans-serif", color: "#b6b9ae", marginTop: 4 }}>{s.k}</div>
          </div>
        ))}
      </div>
      <p className="lab-note">Lowering the threshold catches more positives and raises more false alarms. These cases are synthetic: they are not results from the project and this is not a clinical tool.</p>
    </div>
  );
}
