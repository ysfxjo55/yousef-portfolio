import { useState } from "react";
import { LEGAL } from "@/content/demoData";

/** Five fictional steps, earlier steps stay visible. */
export function LegalDemo() {
  const [i, setI] = useState(0);
  const AR = "'IBM Plex Sans Arabic',sans-serif";
  return (
    <div className="lab-demo">
      <div className="lab-demo-head" style={{ marginBottom: 14 }}><span className="lab-demo-title">A system unfolds</span><span className="lab-tag neutral">fictional legal text</span></div>
      <div role="group" aria-label="Pipeline steps" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {LEGAL.map((s, k) => (
          <button key={s.n} className="lab-pill" aria-current={k === i ? "step" : "false"} onClick={() => setI(k)} style={k < i ? { background: "#24302a", color: "#ebe6da" } : undefined}>{s.n} {s.title}</button>
        ))}
      </div>
      <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {LEGAL.slice(0, i + 1).map(s => (
          <div key={s.n} className="lab-fade" style={{ background: "#141a16", border: "1px solid rgba(235,230,218,.1)", borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ font: "500 11px/1 'IBM Plex Mono',monospace", color: "#9db89f", marginBottom: 10 }}>{s.n} · {s.title}</div>
            {s.ar && <p dir="rtl" lang="ar" style={{ margin: "0 0 10px", font: `400 17px/1.75 ${AR}`, color: "#ebe6da" }}>{s.ar}</p>}
            {s.passages.map(pg => <p key={pg} dir="rtl" lang="ar" style={{ margin: "0 0 8px", padding: "10px 12px", background: "#ebe5d5", color: "#262b24", borderRadius: 5, font: `400 15.5px/1.75 ${AR}` }}>{pg}</p>)}
            <p style={{ font: "400 14px/1.55 'Instrument Sans',sans-serif", color: "#b6b9ae", textWrap: "pretty" }}>{s.en}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <button className="lab-btn" disabled={i === 0} onClick={() => setI(Math.max(0, i - 1))}>Back</button>
        <button className="lab-btn primary" disabled={i === LEGAL.length - 1} onClick={() => setI(Math.min(LEGAL.length - 1, i + 1))}>Next step</button>
      </div>
    </div>
  );
}
