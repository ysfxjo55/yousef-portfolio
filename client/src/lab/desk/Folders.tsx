import type { CSSProperties } from "react";
import type { PanelId } from "@/content/projects";

const DEFS: { id: PanelId; short: string; name: string; full: string; tech: string; bg: string; tab: string; l: string; r: number; t: string }[] = [
  { id: "complaint", short: "complaint-api", name: "Complaint classification", full: "Arabic Complaint Classification API", tech: "MARBERT-v2", bg: "#3e5546", tab: "#4a6352", l: "0%", r: -2.5, t: "7%" },
  { id: "legal", short: "legal-rag", name: "Legal RAG API", full: "Arabic Legal RAG API", tech: "Qdrant · E5", bg: "#4f4a3f", tab: "#5d574a", l: "32.5%", r: 0, t: "4%" },
  { id: "cardio", short: "cardiology", name: "Cardiology risk", full: "Interpretable Cardiology Risk", tech: "SHAP · PyMC", bg: "#39443f", tab: "#45524b", l: "65%", r: 2.5, t: "7%" },
];

export function Folders({ onOpen }: { onOpen: (id: PanelId) => void }) {
  return (
    <div className="lab-obj cq lab-folders">
      <div style={{ position: "relative", aspectRatio: "1.75/1", transform: "perspective(1100px) rotateX(22deg)" }}>
        {DEFS.map(f => (
          <button key={f.id} className="lab-folder" onClick={() => onOpen(f.id)} aria-label={`Case file: ${f.full}`} style={{ left: f.l, top: f.t, "--r": `${f.r}deg` } as CSSProperties}>
            <div style={{ display: "inline-block", background: f.tab, color: "#e7e3d8", font: "500 3.1cqw/1 'IBM Plex Mono',monospace", padding: "1.6cqw 2.6cqw 1.4cqw", borderRadius: "1.2cqw 1.2cqw 0 0", marginLeft: "6%" }}>{f.short}</div>
            <div style={{ background: f.bg, borderRadius: "0 1.2cqw 1.2cqw 1.2cqw", padding: "4cqw 3.6cqw 5cqw", aspectRatio: "1/1.05", overflow: "hidden", boxShadow: "0 2.6cqw 5cqw rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)" }}>
              <div style={{ font: "500 4.6cqw/1.2 'Instrument Sans',sans-serif", color: "#ebe6da", marginBottom: "2cqw", textWrap: "balance" }}>{f.name}</div>
              <div style={{ font: "400 3cqw/1.3 'IBM Plex Mono',monospace", color: "#c9cdc1" }}>{f.tech}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="lab-cap" style={{ marginTop: 18, textAlign: "center", whiteSpace: "nowrap" }}><b>03</b> — Case files · three more projects</div>
    </div>
  );
}
