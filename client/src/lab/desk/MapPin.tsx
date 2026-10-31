export function MapPin({ onOpen }: { onOpen: () => void }) {
  const dot = (cx: string, cy: string) => <circle cx={cx} cy={cy} r="3.5" style={{ fill: "#262b24" }} />;
  const spoke = (x: string, y: string) => <line x1={x} y1={y} x2="50%" y2="50%" style={{ stroke: "#4a6352", strokeWidth: 1 }} />;
  return (
    <div className="lab-obj cq lab-map">
      <button className="lab-objbtn map" onClick={onOpen} aria-label="Pinned project map. Explore connections between projects" style={{ borderRadius: 4 }}>
        <div style={{ position: "relative", background: "#e3ddcc", color: "#262b24", padding: "9cqw 8cqw 7cqw", transform: "rotate(2deg)", boxShadow: "0 2cqw 5cqw rgba(0,0,0,.5),0 0 0 1px rgba(0,0,0,.08)", borderRadius: 1 }}>
          <div aria-hidden style={{ position: "absolute", top: "2.5cqw", left: "50%", width: "5.5cqw", height: "5.5cqw", marginLeft: "-2.75cqw", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,#b9cfba,#4a6352 70%)", boxShadow: "0 1cqw 1.6cqw rgba(0,0,0,.45)" }} />
          <div style={{ font: "600 10cqw/1 'Caveat',cursive", color: "#2f3a31", marginBottom: "3cqw" }}>how it connects</div>
          <svg aria-hidden width="100%" height="34cqw" style={{ display: "block", height: "34cqw" }}>
            {spoke("14%", "22%")}{spoke("86%", "18%")}{spoke("20%", "84%")}{spoke("80%", "82%")}
            <line x1="14%" y1="22%" x2="20%" y2="84%" style={{ stroke: "#8d9484", strokeWidth: 1, strokeDasharray: "3 3" }} />
            <line x1="86%" y1="18%" x2="80%" y2="82%" style={{ stroke: "#8d9484", strokeWidth: 1, strokeDasharray: "3 3" }} />
            <circle cx="50%" cy="50%" r="5" style={{ fill: "#4a6352" }} />
            {dot("14%", "22%")}{dot("86%", "18%")}{dot("20%", "84%")}{dot("80%", "82%")}
          </svg>
          <div style={{ font: "500 max(9px,5.4cqw)/1.3 'IBM Plex Mono',monospace", color: "#4a5246", marginTop: "3cqw", letterSpacing: ".02em" }}>arabic · retrieval · eval</div>
        </div>
        <div className="lab-cap" style={{ marginTop: 16 }}><b>Map</b> — Explore connections</div>
      </button>
    </div>
  );
}
