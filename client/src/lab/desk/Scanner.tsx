import { useState } from "react";
import { OCR_FIELDS, OCR_JSON } from "@/content/demoData";
import { useReducedMotion, useTimers } from "../hooks";

type Scan = "idle" | "armed" | "scanning" | "fields" | "done";

/**
 * Scanner + result slip. Scan sample: line sweeps 1.6s, fields highlight with a 90ms
 * stagger, JSON slip fades in (about 2.4s total). The document is fictional.
 */
export function Scanner({ onOpenOcr }: { onOpenOcr: () => void }) {
  const reduced = useReducedMotion();
  const timers = useTimers();
  const [scan, setScan] = useState<Scan>("idle");
  const busy = scan === "armed" || scan === "scanning" || scan === "fields";
  const fieldsOn = scan === "fields" || scan === "done";
  const sweeping = scan === "scanning";

  const run = () => {
    timers.clear();
    if (reduced) { setScan("done"); return; }
    setScan("armed");
    requestAnimationFrame(() => requestAnimationFrame(() => setScan("scanning")));
    timers.later(() => setScan("fields"), 1750);
    timers.later(() => setScan("done"), 2400);
  };

  const ar = "'IBM Plex Sans Arabic',sans-serif";
  return (
    <>
      <div className="lab-obj cq lab-scanner">
        <div style={{ transform: "perspective(1300px) rotateX(22deg)" }}>
          <div style={{ background: "linear-gradient(180deg,#3c443e,#2b322d)", borderRadius: "2.6cqw", padding: "4cqw 4cqw 3cqw", boxShadow: "0 4cqw 8cqw rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.08)" }}>
            <div style={{ background: "#0e1310", borderRadius: "1.2cqw", padding: "4.5cqw 9cqw", boxShadow: "inset 0 0 3cqw rgba(0,0,0,.9)" }}>
              <div dir="rtl" lang="ar" style={{ position: "relative", overflow: "hidden", background: "#ece6d6", color: "#262b24", padding: "5cqw 6cqw", borderRadius: ".4cqw", boxShadow: "0 1cqw 2cqw rgba(0,0,0,.4)", fontFamily: "'Noto Naskh Arabic',serif" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(38,43,36,.25)", paddingBottom: "2cqw", marginBottom: "2.4cqw" }}>
                  <span style={{ font: "600 4.6cqw/1.3 'Noto Naskh Arabic',serif" }}>تصريح زيارة</span>
                  <span style={{ font: `400 3cqw/1.3 ${ar}`, color: "#5b6256" }}>نموذج توضيحي</span>
                </div>
                {OCR_FIELDS.map(([label, value], i) => (
                  <div key={label} style={{ display: "flex", gap: "3cqw", alignItems: "baseline", font: "400 3.7cqw/1.75 'Noto Naskh Arabic',serif" }}>
                    <span style={{ color: "#5b6256", minWidth: "24%" }}>{label}</span>
                    <span style={{ fontWeight: 600, padding: "0 1.4cqw", borderRadius: ".6cqw", background: fieldsOn ? "rgba(157,184,159,.38)" : "transparent", boxShadow: fieldsOn ? "inset 0 0 0 1px rgba(74,99,82,.7)" : "none", transition: reduced ? "none" : `background .3s ease ${i * 90}ms, box-shadow .3s ease ${i * 90}ms` }}>{value}</span>
                  </div>
                ))}
                <div aria-hidden style={{ display: "flex", flexDirection: "column", gap: "1.6cqw", marginTop: "2.4cqw" }}>
                  <div style={{ height: "1.1cqw", width: "92%", background: "rgba(38,43,36,.14)" }} />
                  <div style={{ height: "1.1cqw", width: "78%", background: "rgba(38,43,36,.14)" }} />
                </div>
                <div style={{ marginTop: "2.6cqw", font: `400 2.8cqw/1.3 ${ar}`, color: "#6b7266" }}>بيانات وهمية للعرض فقط</div>
                <div aria-hidden style={{ position: "absolute", left: 0, right: 0, height: "2.2cqw", marginTop: "-1.1cqw", top: sweeping || scan === "fields" ? "100%" : "0%", opacity: scan === "armed" || sweeping ? 1 : 0, background: "linear-gradient(180deg,transparent,rgba(157,184,159,.85),transparent)", boxShadow: "0 0 4cqw rgba(157,184,159,.55)", transition: sweeping ? "top 1.6s linear, opacity .2s" : "opacity .3s", pointerEvents: "none" }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2.6cqw", padding: "0 1cqw" }}>
              <span style={{ font: "500 2.6cqw/1 'IBM Plex Mono',monospace", color: "#9aa198", letterSpacing: ".1em" }}>OCR · 01</span>
              <span aria-hidden style={{ width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: busy ? "#9db89f" : "#4b544d", boxShadow: busy ? "0 0 2cqw rgba(157,184,159,.8)" : "none" }} />
            </div>
          </div>
        </div>
        <div className="lab-cap" style={{ marginTop: 18, textAlign: "center", whiteSpace: "nowrap" }}><b>02</b> — Arabic OCR · demo runs locally</div>
        <div className="lab-scan-btns">
          <button className="lab-btn primary" onClick={run} disabled={busy}>{busy ? "Scanning…" : scan === "done" ? "Scan again" : "Scan sample"}</button>
          <button className="lab-btn" onClick={onOpenOcr}>Project details</button>
        </div>
        <p aria-live="polite" className="lab-sr">{busy ? "Scanning the sample document" : scan === "done" ? "Scan complete. Four fields extracted." : ""}</p>
      </div>

      <div className="lab-obj lab-tray">
        {scan === "done" ? (
          <div className="lab-fade" style={{ background: "#ebe5d5", color: "#262b24", borderRadius: 4, padding: "12px 12px 14px", boxShadow: "0 14px 30px rgba(0,0,0,.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, font: "500 10.5px/1.3 'IBM Plex Mono',monospace", color: "#5b6256", marginBottom: 10, letterSpacing: ".03em", whiteSpace: "nowrap" }}><span>extracted.json</span><span>fictional</span></div>
            <div style={{ font: "400 10.5px/1.7 'IBM Plex Mono',monospace", color: "#262b24", whiteSpace: "nowrap", overflow: "hidden" }}>
              <div>{"{"}</div>
              {OCR_JSON.map(([k, v], i) => (
                <div key={k} style={{ paddingLeft: 8 }}>"{k}": "<bdi style={{ fontFamily: "'IBM Plex Sans Arabic','IBM Plex Mono',sans-serif" }}>{v}</bdi>"{i < OCR_JSON.length - 1 ? "," : ""}</div>
              ))}
              <div>{"}"}</div>
            </div>
            <p style={{ margin: "10px 0 12px", font: "400 12px/1.45 'Instrument Sans',sans-serif", color: "#4a5246" }}>Arabic-Indic digits normalised to Western digits.</p>
            <button onClick={onOpenOcr} style={{ background: "#262b24", color: "#ebe6da", border: 0, borderRadius: 5, padding: "10px 12px", minHeight: 40, font: "600 13px/1 'Instrument Sans',sans-serif", width: "100%" }}>Open OCR project</button>
          </div>
        ) : (
          <div className="lab-tray-empty" style={{ aspectRatio: "3/4.2", border: "1.5px dashed rgba(235,230,218,.16)", borderRadius: 4, flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8, padding: 16, textAlign: "center", transform: "perspective(1200px) rotateX(22deg)" }}>
            <span style={{ font: "500 11px/1.3 'IBM Plex Mono',monospace", color: "#8f978c" }}>extracted.json</span>
            <span style={{ font: "400 12.5px/1.45 'Instrument Sans',sans-serif", color: "#8f978c", textWrap: "balance" }}>Scan the sample to extract its fields here</span>
          </div>
        )}
      </div>
    </>
  );
}
