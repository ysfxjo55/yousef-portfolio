import { HERO, PROFILE } from "@/content/profile";

export function Hero({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div className="lab-obj lab-hero">
      <p className="lab-kicker" style={{ marginBottom: 18 }}>{PROFILE.headline}</p>
      <h1 style={{ margin: "0 0 20px", font: "400 max(40px,4.4cqw)/1.0 'Newsreader',serif", letterSpacing: "-.015em", color: "#ebe6da", textWrap: "balance" }}>{PROFILE.name}</h1>
      <p style={{ margin: "0 0 14px", font: "400 max(16px,1.15cqw)/1.55 'Instrument Sans',sans-serif", color: "#d9d5ca", textWrap: "pretty", maxWidth: "34em" }}>{HERO.lead}</p>
      <p style={{ margin: "0 0 26px", font: "400 max(14px,.95cqw)/1.55 'Instrument Sans',sans-serif", color: "#a8ada3", textWrap: "pretty", maxWidth: "36em" }}>{HERO.second}</p>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 18px", font: "400 12px/1.4 'IBM Plex Mono',monospace", color: "#a8ada3" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 10, color: "#c9d6c9" }}>
          <span aria-hidden style={{ display: "block", width: 28, height: 1, background: "#9db89f" }} />Explore the workbench
        </span>
        <button className="lab-browse" onClick={onBrowse} style={{ background: "none", border: 0, padding: "4px 0", color: "#a8ada3", textDecoration: "underline", textUnderlineOffset: 3 }}>or browse the project list</button>
      </div>
    </div>
  );
}
