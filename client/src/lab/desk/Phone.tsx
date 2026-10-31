import { PHONE_CHAT } from "@/content/demoData";

export function Phone({ onOpen }: { onOpen: () => void }) {
  const ar = "'IBM Plex Sans Arabic',sans-serif";
  return (
    <div className="lab-obj cq lab-phone">
      <button className="lab-objbtn" onClick={onOpen} aria-label="Phone with an Arabic chat. Open the analytics assistant project">
        <div style={{ transform: "perspective(1100px) rotateX(22deg) rotate(2deg)" }}>
          <div style={{ background: "linear-gradient(160deg,#2c342e,#1a201c)", borderRadius: "11cqw", padding: "5cqw", boxShadow: "0 6cqw 12cqw rgba(0,0,0,.55),inset 0 0 0 1px rgba(255,255,255,.07)" }}>
            <div dir="rtl" lang="ar" style={{ aspectRatio: "9/17", background: "#0e1310", borderRadius: "7cqw", padding: "12cqw 6cqw 8cqw", display: "flex", flexDirection: "column", gap: "5cqw", overflow: "hidden", fontFamily: ar }}>
              <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: "#9db89f", color: "#141a16", borderRadius: "5cqw 5cqw 1.5cqw 5cqw", padding: "3.5cqw 5cqw", font: `500 7.6cqw/1.35 ${ar}` }}>{PHONE_CHAT.q}</div>
              <div dir="ltr" style={{ alignSelf: "flex-end", font: "500 5.4cqw/1.2 'IBM Plex Mono',monospace", color: "#7f9a84" }}>{PHONE_CHAT.tool}</div>
              <div style={{ alignSelf: "flex-end", maxWidth: "86%", background: "#e8e2d2", color: "#262b24", borderRadius: "5cqw 5cqw 5cqw 1.5cqw", padding: "3.5cqw 5cqw", font: `400 7.2cqw/1.4 ${ar}` }}>{PHONE_CHAT.a}</div>
              <div style={{ marginTop: "auto", height: "9cqw", borderRadius: "5cqw", border: "1px solid rgba(235,230,218,.14)" }} />
            </div>
          </div>
        </div>
        <div className="lab-cap wrap" style={{ marginTop: 18, textAlign: "center" }}><b>04</b> — Analytics assistant</div>
      </button>
    </div>
  );
}
