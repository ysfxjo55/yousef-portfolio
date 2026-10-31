import { useState } from "react";
import { COMPLAINT_CARDS, COMPLAINT_ORDER, COMPLAINT_TEXT, COMPLAINT_TILES, complaintFeedback } from "@/content/demoData";
import { useReducedMotion, useTimers } from "../hooks";

type Slots = (string | null)[];
const EMPTY: Slots = [null, null, null];

/** Place Classify → Route → Explain in order, then run an invented complaint through them. */
export function ComplaintDemo() {
  const reduced = useReducedMotion();
  const timers = useTimers();
  const [slots, setSlots] = useState<Slots>(EMPTY);
  const [tiles, setTiles] = useState<string[]>(COMPLAINT_TILES);
  const [runStep, setRunStep] = useState(-1);

  const correct = slots.join() === COMPLAINT_ORDER.join();
  const full = !slots.includes(null);
  const msg = complaintFeedback(slots);

  const place = (t: string) => {
    const i = slots.indexOf(null);
    if (i < 0) return;
    timers.clear();
    const s = [...slots]; s[i] = t;
    setSlots(s); setTiles(tiles.filter(x => x !== t)); setRunStep(-1);
  };
  const unplace = (i: number) => {
    const t = slots[i]; if (!t) return;
    timers.clear();
    const s = [...slots]; s[i] = null;
    setSlots(s); setTiles([...tiles, t]); setRunStep(-1);
  };
  const reset = () => { timers.clear(); setSlots(EMPTY); setTiles(COMPLAINT_TILES); setRunStep(-1); };
  const run = () => {
    timers.clear();
    if (reduced) { setRunStep(2); return; }
    setRunStep(0); timers.later(() => setRunStep(1), 700); timers.later(() => setRunStep(2), 1400);
  };

  return (
    <div className="lab-demo">
      <div className="lab-demo-head"><span className="lab-demo-title">Optional: build the pipeline</span><span className="lab-tag neutral">illustrative · example labels</span></div>
      <p className="lab-demo-sub" style={{ marginBottom: 16 }}>Place the three stages in order, then run a complaint through them.</p>
      <p dir="rtl" lang="ar" style={{ marginBottom: 18, padding: "12px 14px", background: "#ebe5d5", color: "#262b24", borderRadius: 6, font: "400 17px/1.7 'IBM Plex Sans Arabic',sans-serif" }}>{COMPLAINT_TEXT}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 8, marginBottom: 12 }}>
        {slots.map((s, i) => (
          <button key={i} onClick={() => unplace(i)} aria-label={s ? `Step ${i + 1}: ${s}. Activate to remove` : `Step ${i + 1}: empty`} style={{ minHeight: 64, textAlign: "left", padding: "10px 12px", borderRadius: 6, cursor: s ? "pointer" : "default", background: s ? "#24302a" : "transparent", border: s ? "1px solid rgba(157,184,159,.45)" : "1px dashed rgba(235,230,218,.22)", color: s ? "#ebe6da" : "#8f978c", font: "600 15px/1.1 'Instrument Sans',sans-serif" }}>
            <span style={{ display: "block", font: "400 10.5px/1 'IBM Plex Mono',monospace", color: "#8f978c", marginBottom: 6 }}>Step {i + 1}</span>{s || "empty"}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minHeight: 44, marginBottom: 12 }}>
        {tiles.map(t => <button key={t} className="lab-btn light" style={{ padding: "12px 16px" }} onClick={() => place(t)} aria-label={`Place ${t} in the next step`}>{t}</button>)}
      </div>
      <p aria-live="polite" style={{ margin: "0 0 12px", minHeight: 22, font: "400 14px/1.5 'Instrument Sans',sans-serif", color: correct ? "#b9cfba" : full ? "#d8b596" : "#a8ada3" }}>{msg}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="lab-btn primary" disabled={!correct} onClick={run}>Run complaint</button>
        <button className="lab-btn" onClick={reset}>Reset</button>
      </div>
      <div aria-live="polite" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
        {(runStep >= 0 ? COMPLAINT_CARDS.slice(0, runStep + 1) : []).map(r => (
          <div key={r.stage} className="lab-fade" style={{ background: "#141a16", border: "1px solid rgba(157,184,159,.25)", borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ font: "500 11px/1 'IBM Plex Mono',monospace", color: "#9db89f", marginBottom: 8 }}>{r.stage}</div>
            <div style={{ font: "400 14px/1.55 'Instrument Sans',sans-serif", color: "#d9d5ca", textWrap: "pretty" }}>{r.body}</div>
          </div>
        ))}
      </div>
      <p className="lab-note">Deterministic routing chooses the action. The optional LLM layer only explains it.</p>
    </div>
  );
}
