import { useState } from "react";
import { AW_AGENTS, AW_FOLDERS, AW_PROMPTS, AW_REPLIES } from "@/content/demoData";
import { useReducedMotion, useTimers } from "../hooks";
import { HEX, village } from "../desk/village";

interface Msg { who: "me" | "agent"; text: string }

/** Simulated Agents World: pick a tile, continue a session, ask the agent. Nothing here is live. */
export function AgentsDemo() {
  const reduced = useReducedMotion();
  const timers = useTimers();
  const [tab, setTab] = useState<"world" | "chat">("world");
  const [folder, setFolder] = useState(1);
  const [session, setSession] = useState<{ fi: number; si: number } | null>(null);
  const [agent, setAgent] = useState("Claude Code");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [pending, setPending] = useState(false);
  const [busy, setBusy] = useState(false);

  const cont = (fi: number, si: number) => {
    const fo = AW_FOLDERS[fi], se = fo.sessions[si];
    setTab("chat"); setSession({ fi, si }); setAgent(se.a); setPending(false); setBusy(false);
    setMsgs([{ who: "agent", text: `Resumed “${se.t}” in ~/${fo.name}. Last activity: 2 files edited, tests passing. (Simulated.)` }]);
  };
  const send = (t: string) => {
    setMsgs(m => [...m, { who: "me", text: t }]); setBusy(true);
    timers.later(() => {
      const reply = AW_REPLIES[t];
      if (reply) { setMsgs(m => [...m, { who: "agent", text: reply }]); setBusy(false); }
      else setPending(true);
    }, reduced ? 0 : 600);
  };
  const decide = (ok: boolean) => {
    setPending(false); setBusy(false);
    setMsgs(m => [...m, { who: "agent", text: ok ? "Edited tests/test_api.py. 12 tests passing. (Simulated.)" : "Edit skipped. Nothing was changed." }]);
  };

  const cur = AW_FOLDERS[session ? session.fi : folder];
  const title = session ? AW_FOLDERS[session.fi].sessions[session.si].t : "New session";

  return (
    <div className="lab-demo">
      <div className="lab-demo-head"><span className="lab-demo-title">Try a simplified Agents World</span><span className="lab-tag">simulated · example sessions</span></div>
      <p className="lab-demo-sub">Pick a project tile, continue a session, then ask the agent something.</p>
      <div role="tablist" aria-label="Agents World views" className="lab-seg" style={{ marginBottom: 16 }}>
        <button role="tab" aria-selected={tab === "world"} onClick={() => setTab("world")}>World</button>
        <button role="tab" aria-selected={tab === "chat"} onClick={() => setTab("chat")}>Chat</button>
      </div>

      {tab === "world" && (
        <div role="tabpanel">
          <div style={{ background: "linear-gradient(180deg,#0f1a20,#12241a 55%,#163322)", borderRadius: 8, padding: "20px 12px 22px", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "22px 8px" }}>
            {AW_FOLDERS.map((fo, i) => {
              const on = i === folder, working = fo.sessions.some(x => x.s === "working");
              const props = village(i * 13 + 5, Math.min(4, fo.sessions.length + 1), fo.lab ? 1 : 3, fo.lab);
              return (
                <button key={fo.name} onClick={() => setFolder(i)} aria-pressed={on} aria-label={`${fo.name}, ${fo.sessions.length} sessions${working ? ", one working" : ""}`} style={{ background: "none", border: 0, padding: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, borderRadius: 6 }}>
                  <span style={{ font: "600 11.5px/1 'Instrument Sans',sans-serif", whiteSpace: "nowrap", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", color: fo.lab ? "#0e2a30" : "#ebe6da", background: fo.lab ? "#8fd0d8" : on ? "#24302a" : "rgba(12,16,14,.9)", border: on ? "1px solid #9db89f" : "1px solid rgba(235,230,218,.14)", borderRadius: 999, padding: "6px 9px" }}>{fo.name} · {fo.sessions.length}</span>
                  <span style={{ position: "relative", display: "block", width: "86%", aspectRatio: "2.1/1", marginTop: 10 }}>
                    <span style={{ position: "absolute", left: 0, right: 0, top: "18%", bottom: "-22%", clipPath: HEX, background: "linear-gradient(180deg,#1c3a25 0 60%,#14251a 60%)" }} />
                    <span style={{ position: "absolute", inset: 0, clipPath: HEX, background: fo.lab ? "linear-gradient(180deg,#2c6a7c,#1b4553)" : on ? "linear-gradient(180deg,#5a9a66,#36744a)" : working ? "linear-gradient(180deg,#3f7d4c,#2a5e37)" : "linear-gradient(180deg,#2f6a3e,#24502f)", transition: "background .2s" }} />
                    {props.map((p, k) => <span key={k} style={p} />)}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="lab-label" style={{ marginTop: 14, marginBottom: 0, fontSize: 11 }}>~/{AW_FOLDERS[folder].name}</div>
          <ul className="lab-list" style={{ marginTop: 8 }}>
            {AW_FOLDERS[folder].sessions.map((se, si) => (
              <li key={se.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
                <span aria-hidden style={{ width: 9, height: 9, borderRadius: "50%", flex: "none", background: se.s === "working" ? "#9db89f" : "#55607a", boxShadow: se.s === "working" ? "0 0 0 3px rgba(157,184,159,.2)" : "none" }} />
                <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ font: "500 14.5px/1.3 'Instrument Sans',sans-serif", color: "#ebe6da" }}>{se.t}</span>
                  <span style={{ font: "400 11.5px/1.3 'IBM Plex Mono',monospace", color: "#a8ada3" }}>{se.a} · {se.s}</span>
                </span>
                <button className="lab-btn" style={{ minHeight: 40, padding: "8px 12px", fontSize: 13, flex: "none" }} onClick={() => cont(folder, si)}>Continue →</button>
              </li>
            ))}
          </ul>
          <p className="lab-note" style={{ marginTop: 12 }}>Deleted sessions go to Trash and can be restored.</p>
        </div>
      )}

      {tab === "chat" && (
        <div role="tabpanel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="lab-demo-title">{title}</span>
            <span style={{ font: "500 12px/1 'Instrument Sans',sans-serif", color: "#d9d5ca", border: "1px solid rgba(235,230,218,.2)", borderRadius: 6, padding: "8px 10px" }}>Read-only</span>
          </div>
          <div role="group" aria-label="Agent program" className="lab-seg" style={{ display: "flex", marginBottom: 8 }}>
            {AW_AGENTS.map(a => <button key={a} aria-pressed={a === agent} onClick={() => setAgent(a)}>{a}</button>)}
          </div>
          <div className="lab-mono" style={{ fontSize: 12, lineHeight: 1.4, color: "#a8ada3", marginBottom: 12 }}>{agent} · ~/{cur.name}</div>
          <div aria-live="polite" style={{ background: "#0f1411", borderRadius: 8, padding: 14, minHeight: 110, display: "flex", flexDirection: "column", gap: 10 }}>
            {!msgs.length && !pending && <p style={{ margin: "auto", font: "400 13px/1.5 'Instrument Sans',sans-serif", color: "#8f978c", textAlign: "center" }}>What should we work on?</p>}
            {msgs.map((m, i) => m.who === "me"
              ? <div key={i} className="lab-fade" style={{ alignSelf: "flex-end", maxWidth: "85%", background: "#2a332d", color: "#ebe6da", borderRadius: "12px 12px 4px 12px", padding: "9px 13px", font: "400 14px/1.5 'Instrument Sans',sans-serif" }}>{m.text}</div>
              : <div key={i} className="lab-fade" style={{ alignSelf: "flex-start", maxWidth: "90%", color: "#d9d5ca", borderLeft: "2px solid #4a6352", padding: "4px 0 4px 12px", font: "400 14px/1.55 'Instrument Sans',sans-serif" }}>{m.text}</div>)}
            {pending && (
              <div role="alert" className="lab-fade" style={{ border: "1px solid rgba(201,161,127,.45)", background: "rgba(201,161,127,.1)", borderRadius: 8, padding: 12 }}>
                <p style={{ margin: "0 0 10px", font: "400 14px/1.5 'Instrument Sans',sans-serif", color: "#ebd9c6" }}>{agent} wants to edit tests/test_api.py. Paused for your review.</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="lab-btn light" style={{ minHeight: 40, padding: "8px 14px", fontSize: 13 }} onClick={() => decide(true)}>Approve</button>
                  <button className="lab-btn" style={{ minHeight: 40, padding: "8px 14px", fontSize: 13 }} onClick={() => decide(false)}>Deny</button>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {AW_PROMPTS.map(t => <button key={t} className="lab-btn" disabled={busy} onClick={() => send(t)} style={{ borderRadius: 999, padding: "9px 14px", minHeight: 40, fontWeight: 400, fontSize: 13.5, color: "#d9d5ca", borderColor: "rgba(235,230,218,.18)" }}>{t}</button>)}
          </div>
          <p className="lab-note" style={{ marginTop: 12, fontSize: 13 }}>The real app runs the AI programs installed on your own computer.</p>
        </div>
      )}
    </div>
  );
}
