export function Notebook({ onOpen, open, reduced }: { onOpen: () => void; open: boolean; reduced: boolean }) {
  return (
    <div className="lab-obj cq lab-notebook">
      <button className="lab-objbtn" onClick={onOpen} aria-label="Research notebook. Open research and the ArabicNLP 2026 publication" style={{ borderRadius: 6 }}>
        <div style={{ transform: "perspective(1200px) rotateX(22deg) rotate(-2deg)", transformStyle: "preserve-3d" }}>
          <div style={{ position: "relative", aspectRatio: "3/4", transformStyle: "preserve-3d" }}>
            <div style={{ position: "absolute", inset: 0, background: "#e6e0cf", borderRadius: "1cqw 3cqw 3cqw 1cqw", boxShadow: "1.4cqw 1.4cqw 0 #cfc8b5,2.6cqw 2.6cqw 0 #bdb6a2,4cqw 6cqw 8cqw rgba(0,0,0,.55)", padding: "12cqw 10cqw", color: "#2f3a31", overflow: "hidden" }}>
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(180deg,transparent 0 9cqw,rgba(74,99,82,.18) 9cqw calc(9cqw + 1px))", pointerEvents: "none" }} />
              <div style={{ position: "relative", font: "600 9cqw/1.15 'Caveat',cursive" }}>Q: can we trust the score?</div>
              <div style={{ position: "relative", font: "500 7.5cqw/1.25 'Caveat',cursive", marginTop: "6cqw", color: "#4a6352" }}>ROC-AUC .7596<br />3rd of 7 teams</div>
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#526d5a,#3f5747)", borderRadius: "1cqw 3cqw 3cqw 1cqw", transformOrigin: "left center", transform: open ? "rotateY(-160deg)" : "rotateY(0deg)", transition: reduced ? "none" : "transform .45s cubic-bezier(.4,.1,.2,1)", backfaceVisibility: "hidden", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)" }}>
              <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "8%", background: "rgba(0,0,0,.22)", borderRadius: "1cqw 0 0 1cqw" }} />
              <div aria-hidden style={{ position: "absolute", right: "13%", top: 0, bottom: 0, width: "3.2cqw", background: "#1d2620" }} />
              <div style={{ position: "absolute", left: "18%", right: "24%", top: "20%", background: "#e9e3d3", padding: "6cqw 6cqw 5cqw", transform: "rotate(-1.5deg)", boxShadow: "0 .6cqw 1.6cqw rgba(0,0,0,.25)" }}>
                <div style={{ font: "600 11cqw/0.95 'Caveat',cursive", color: "#2a332c" }}>Arabic hallucination detection</div>
                <div style={{ font: "500 4.4cqw/1.2 'IBM Plex Mono',monospace", color: "#4a5246", marginTop: "4cqw" }}>ArabicNLP · 2026</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lab-cap wrap" style={{ marginTop: 24, textAlign: "center" }}><b>05</b> — Research notebook</div>
      </button>
    </div>
  );
}
