import { useState } from "react";
import { CHAT } from "@/content/demoData";
import { useReducedMotion, useTimers } from "../hooks";

const AR = "'IBM Plex Sans Arabic',sans-serif";

/** Scripted trace: question → route → tool call → Arabic answer. Invented data. */
export function AnalyticsDemo() {
  const reduced = useReducedMotion();
  const timers = useTimers();
  const [q, setQ] = useState(-1);
  const [step, setStep] = useState(0);

  const ask = (i: number) => {
    timers.clear();
    setQ(i);
    if (reduced) { setStep(3); return; }
    setStep(0);
    [1, 2, 3].forEach(s => timers.later(() => setStep(s), s * 550));
  };
  const c = q >= 0 ? CHAT[q] : null;
  const box = { borderLeft: "2px solid #4a6352", padding: "4px 0 4px 12px" } as const;

  return (
    <div className="lab-demo">
      <div className="lab-demo-head"><span className="lab-demo-title">Ask the assistant</span><span className="lab-tag">fictional data · scripted trace</span></div>
      <p className="lab-demo-sub">Pick a question to see how it is routed to a tool, what the tool returns, and the answer.</p>
      <div dir="rtl" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {CHAT.map((x, i) => (
          <button key={x.q} lang="ar" aria-pressed={i === q} onClick={() => ask(i)} style={{ background: i === q ? "#24302a" : "transparent", color: "#ebe6da", border: i === q ? "1px solid #9db89f" : "1px solid rgba(235,230,218,.18)", borderRadius: 8, padding: "9px 12px", minHeight: 44, font: `400 14.5px/1.5 ${AR}`, textAlign: "right" }}>{x.q}</button>
        ))}
      </div>
      <div aria-live="polite" style={{ background: "#0f1411", borderRadius: 8, padding: 16, minHeight: 120, display: "flex", flexDirection: "column", gap: 10 }}>
        {!c && <p style={{ margin: "auto", font: "400 13px/1.5 'IBM Plex Mono',monospace", color: "#7f877c", textAlign: "center" }}>Choose a question above</p>}
        {c && <div dir="rtl" lang="ar" className="lab-fade" style={{ alignSelf: "flex-start", maxWidth: "85%", background: "#9db89f", color: "#141a16", borderRadius: "12px 12px 4px 12px", padding: "10px 14px", font: `500 16px/1.6 ${AR}` }}>{c.q}</div>}
        {c && step >= 1 && (
          <div className="lab-fade" style={box}>
            <div style={{ font: "500 11px/1 'IBM Plex Mono',monospace", color: "#9db89f", marginBottom: 6 }}>route</div>
            <div style={{ font: "400 13.5px/1.5 'Instrument Sans',sans-serif", color: "#d9d5ca" }}>{c.route}</div>
          </div>
        )}
        {c && step >= 2 && c.call && (
          <div className="lab-fade" style={box}>
            <div style={{ font: "500 11px/1 'IBM Plex Mono',monospace", color: "#9db89f", marginBottom: 6 }}>tool call · FastMCP</div>
            <div style={{ font: "400 12.5px/1.55 'IBM Plex Mono',monospace", color: "#d9d5ca", wordBreak: "break-word" }}>{c.call}</div>
          </div>
        )}
        {c && step >= 3 && (
          <div dir="rtl" lang="ar" className="lab-fade" style={{ alignSelf: "flex-end", maxWidth: "90%", background: "#e8e2d2", color: "#262b24", borderRadius: "12px 12px 12px 4px", padding: "12px 14px" }}>
            <p style={{ font: `400 16px/1.7 ${AR}` }}>{c.answer}</p>
            {c.rows.length > 0 && (
              <div style={{ marginTop: 10, borderTop: "1px solid rgba(38,43,36,.15)" }}>
                {c.rows.map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "6px 0", borderBottom: "1px solid rgba(38,43,36,.1)", font: `400 14px/1.4 ${AR}` }}><span>{k}</span><span dir="ltr" style={{ fontFamily: "'IBM Plex Mono',monospace" }}>{v}</span></div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <p className="lab-note">Numbers and tool names here are invented for the demo. The real assistant runs in LibreChat over Moasherat's operational data.</p>
    </div>
  );
}
