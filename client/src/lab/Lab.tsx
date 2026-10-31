import { Component, useRef, type ReactNode } from "react";
import { PROFILE } from "@/content/profile";
import { OTHER_HEADS, PROJECTS, PROJECT_LIST, type PanelId, type ProjectId } from "@/content/projects";
import { useReducedMotion } from "./hooks";
import { usePanelRouter } from "./usePanelRouter";
import { Folders } from "./desk/Folders";
import { Hero } from "./desk/Hero";
import { MapPin } from "./desk/MapPin";
import { Monitor } from "./desk/Monitor";
import { Notebook } from "./desk/Notebook";
import { Phone } from "./desk/Phone";
import { Scanner } from "./desk/Scanner";
import { Panel } from "./panel/Panel";
import { AboutBody, AllBody, ConnectionsBody, ContactBody, ProjectBody, ResearchBody } from "./panel/PanelBodies";
import "./lab.css";

/** The interactive desk is decoration. If it throws, the hero, list and panels still work. */
class DeskBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err: unknown) { console.error("Desk failed to render; showing the plain layout.", err); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const isProject = (id: PanelId): id is ProjectId => id in PROJECTS;

export default function Lab() {
  const reduced = useReducedMotion();
  const { panel, notebookOpen, open, close } = usePanelRouter(reduced);
  const workRef = useRef<HTMLElement>(null);

  const browse = () => workRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  const head = panel ? (isProject(panel) ? PROJECTS[panel] : OTHER_HEADS[panel]) : null;

  return (
    <div className="lab">
      <a className="lab-skip" href="#work" onClick={e => { e.preventDefault(); browse(); }}>Skip to the project list</a>
      <header className="lab-nav">
        <div className="lab-nav-brand">
          <span style={{ font: "500 17px/1 'Newsreader',serif", letterSpacing: ".01em" }}>{PROFILE.shortName}</span>
          <span className="lab-mono" style={{ fontSize: 11, color: "#8f978c", letterSpacing: ".04em" }}>Makkah · Arabic NLP</span>
        </div>
        <nav aria-label="Primary" className="lab-nav-links">
          <button className="lab-nav-item" onClick={() => open("all")}>All Projects</button>
          <button className="lab-nav-item" onClick={() => open("research")}>Research</button>
          <button className="lab-nav-item" onClick={() => open("about")}>About</button>
          <a className="lab-nav-item" href={PROFILE.cv} download={PROFILE.cvFileName}>CV ↓</a>
          <button className="lab-nav-item lab-nav-cta" onClick={() => open("contact")}>Contact</button>
        </nav>
      </header>

      <main>
        <DeskBoundary fallback={<div className="lab-fallback"><Hero onBrowse={browse} /></div>}>
          <div className="lab-stage" role="group" aria-label="Yousef's research workbench">
            <div aria-hidden className="lab-bg" style={{ left: 0, right: 0, top: 0, height: "56%", background: "linear-gradient(180deg,#101512 0%,#151b17 100%)" }} />
            <div aria-hidden className="lab-bg" style={{ left: 0, right: 0, top: "56%", bottom: 0, background: "linear-gradient(180deg,#252c26 0%,#1d231f 60%,#191f1b 100%)" }} />
            <div aria-hidden className="lab-bg" style={{ left: 0, right: 0, top: "56%", bottom: 0, background: "repeating-linear-gradient(90deg,rgba(235,230,218,.014) 0 1px,transparent 1px 9px)", mixBlendMode: "screen" }} />
            <div aria-hidden className="lab-bg" style={{ left: 0, right: 0, top: "56%", height: 1, background: "rgba(235,230,218,.09)", boxShadow: "0 1px 14px rgba(0,0,0,.6)" }} />
            <div aria-hidden className="lab-bg" style={{ left: 0, right: 0, bottom: 0, height: "4%", background: "#141915", borderTop: "1px solid rgba(235,230,218,.05)" }} />
            <div aria-hidden className="lab-bg" style={{ inset: 0, background: "radial-gradient(ellipse 48% 40% at 54% 70%,rgba(240,228,198,.075),transparent 72%),radial-gradient(ellipse 80% 70% at 50% 40%,transparent 60%,rgba(0,0,0,.35) 100%)" }} />

            <Hero onBrowse={browse} />
            <MapPin onOpen={() => open("connections")} />
            <Monitor onOpen={() => open("agents")} />
            <div className="lab-deskrow">
              <Scanner onOpenOcr={() => open("ocr")} />
              <Folders onOpen={open} />
              <Phone onOpen={() => open("analytics")} />
              <Notebook onOpen={() => open("research")} open={notebookOpen} reduced={reduced} />
            </div>
          </div>
        </DeskBoundary>

        <section id="work" ref={workRef} className="lab-work" aria-labelledby="work-title" style={{ scrollMarginTop: 60 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            <h2 id="work-title" style={{ font: "400 34px/1.1 'Newsreader',serif", color: "#ebe6da" }}>Selected work</h2>
            <span className="lab-mono" style={{ fontSize: 12, color: "#a8ada3" }}>The same projects as the desk, as a list</span>
          </div>
          <ul className="lab-list" style={{ listStyle: "none" }}>
            {PROJECT_LIST.map(p => (
              <li key={p.id}>
                <button className="lab-row" onClick={() => open(p.id)}>
                  <span style={{ font: "400 12px/1 'IBM Plex Mono',monospace", color: "#9db89f" }}>{p.n}</span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                    <span style={{ font: "500 19px/1.25 'Instrument Sans',sans-serif", color: "#ebe6da" }}>{p.name}</span>
                    <span style={{ font: "400 15px/1.5 'Instrument Sans',sans-serif", color: "#a8ada3", textWrap: "pretty" }}>{p.line}</span>
                  </span>
                  <span className="lab-row-tech">{p.tech}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="lab-footer">
        <span>{PROFILE.name} · {PROFILE.location}</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          <a href={`mailto:${PROFILE.email}`}>Email</a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PROFILE.cv} download={PROFILE.cvFileName}>CV (PDF)</a>
        </div>
      </footer>

      {panel && head && (
        <Panel id={panel} kicker={head.kicker} title={head.title} purpose={head.purpose} onClose={close}>
          {isProject(panel) && <ProjectBody id={panel} />}
          {panel === "research" && <ResearchBody open={open} />}
          {panel === "connections" && <ConnectionsBody open={open} />}
          {panel === "all" && <AllBody open={open} />}
          {panel === "about" && <AboutBody />}
          {panel === "contact" && <ContactBody />}
        </Panel>
      )}
    </div>
  );
}
