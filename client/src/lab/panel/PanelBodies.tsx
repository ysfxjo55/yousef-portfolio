import { useState, type ReactNode } from "react";
import { ABOUT_PARAGRAPHS, EDUCATION, EXPERIENCE, INTERESTS, PROFILE, PUBLICATION, SKILLS } from "@/content/profile";
import { LINKS, NODES, PROJECTS, PROJECT_LIST, THEMES, type PanelId, type ProjectId, type ThemeId } from "@/content/projects";
import { AgentsDemo } from "../demos/AgentsDemo";
import { AnalyticsDemo } from "../demos/AnalyticsDemo";
import { CardioDemo } from "../demos/CardioDemo";
import { ComplaintDemo } from "../demos/ComplaintDemo";
import { LegalDemo } from "../demos/LegalDemo";

type Open = (id: PanelId) => void;

const Sec = ({ label, children, first }: { label: string; children: ReactNode; first?: boolean }) => (
  <section className="lab-sec" style={first ? { marginTop: 40 } : undefined}>
    <h3 className="lab-label">{label}</h3>
    {children}
  </section>
);

const DEMOS: Partial<Record<ProjectId, () => ReactNode>> = {
  agents: () => <AgentsDemo />, analytics: () => <AnalyticsDemo />, complaint: () => <ComplaintDemo />,
  legal: () => <LegalDemo />, cardio: () => <CardioDemo />,
};

export function ProjectBody({ id }: { id: ProjectId }) {
  const p = PROJECTS[id];
  const demo = DEMOS[id];
  return (
    <>
      <Sec label="Problem and context" first><p className="lab-body">{p.problem}</p></Sec>
      <Sec label="My contribution"><ul className="lab-bullets">{p.contribution.map(c => <li key={c} style={{ textWrap: "pretty" }}>{c}</li>)}</ul></Sec>
      <Sec label="How it works">
        <p className="lab-body" style={{ marginBottom: demo ? 20 : 0 }}>{p.how}</p>
        {demo?.()}
      </Sec>
      <Sec label="Evidence and results"><p className="lab-body">{p.evidence}</p></Sec>
      <Sec label="Limitations and lessons"><ul className="lab-bullets">{p.limits.map(c => <li key={c} style={{ textWrap: "pretty" }}>{c}</li>)}</ul></Sec>
      <Sec label="Technologies">
        <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tech.map(t => <li key={t} style={{ font: "400 12.5px/1 'IBM Plex Mono',monospace", color: "#d9d5ca", border: "1px solid rgba(235,230,218,.16)", borderRadius: 4, padding: "7px 9px" }}>{t}</li>)}
        </ul>
      </Sec>
      <section className="lab-sec" style={{ paddingBottom: 8 }}>
        <h3 className="lab-label">Links</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, font: "400 15px/1.5 'Instrument Sans',sans-serif" }}>
          {p.links.map(l => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
          {!p.links.length && <p style={{ color: "#a8ada3" }}>{p.noLinkText}</p>}
        </div>
      </section>
    </>
  );
}

export function ResearchBody({ open }: { open: Open }) {
  return (
    <>
      <article style={{ marginTop: 36, border: "1px solid rgba(235,230,218,.12)", borderRadius: 8, padding: 24, background: "#1a211d" }}>
        <div style={{ font: "400 11.5px/1.5 'IBM Plex Mono',monospace", color: "#9db89f", marginBottom: 12 }}>Publication · Co-author</div>
        <h3 style={{ margin: "0 0 12px", font: "400 24px/1.25 'Newsreader',serif", color: "#ebe6da", textWrap: "pretty" }}>{PUBLICATION.title}</h3>
        <p style={{ margin: "0 0 20px", font: "400 14px/1.5 'IBM Plex Mono',monospace", color: "#b6b9ae" }}>{PUBLICATION.venue}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10, marginBottom: 20 }}>
          {PUBLICATION.stats.map(s => (
            <div key={s.label} style={{ background: "#141a16", borderRadius: 6, padding: 14 }}>
              <div style={{ font: "400 30px/1 'Newsreader',serif", color: "#ebe6da" }}>{s.value}</div>
              <div style={{ font: "400 13px/1.4 'Instrument Sans',sans-serif", color: "#b6b9ae", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <a href={PUBLICATION.href} target="_blank" rel="noopener noreferrer" style={{ font: "500 15px/1.4 'Instrument Sans',sans-serif" }}>Read the paper on ACL Anthology ↗</a>
      </article>
      <Sec label="The research question">
        <p className="lab-body" style={{ marginBottom: 12 }}>{PUBLICATION.question}</p>
        <p className="lab-body">{PUBLICATION.role}</p>
      </Sec>
      <section style={{ marginTop: 44, paddingTop: 32, borderTop: "1px solid var(--line, rgba(235,230,218,.1))" }}>
        <h3 className="lab-label" style={{ marginBottom: 6 }}>Current interests and ongoing learning</h3>
        <p style={{ margin: "0 0 18px", font: "400 14px/1.55 'Instrument Sans',sans-serif", color: "#a8ada3" }}>These are areas I'm studying. They are interests, not established research.</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
          {INTERESTS.map(it => (
            <li key={it.t} style={{ display: "grid", gridTemplateColumns: "minmax(0,180px) minmax(0,1fr)", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(235,230,218,.08)" }}>
              <span style={{ font: "500 15px/1.4 'Instrument Sans',sans-serif", color: "#ebe6da" }}>{it.t}</span>
              <span style={{ font: "400 14.5px/1.55 'Instrument Sans',sans-serif", color: "#b6b9ae", textWrap: "pretty" }}>{it.d}</span>
            </li>
          ))}
        </ul>
        <button className="lab-btn" style={{ marginTop: 20, padding: "12px 16px" }} onClick={() => open("cardio")}>Try the threshold demo in Cardiology Risk →</button>
      </section>
    </>
  );
}

export function ConnectionsBody({ open }: { open: Open }) {
  const [theme, setTheme] = useState<ThemeId>("arabic");
  const lines = THEMES.flatMap((t, i) => Object.keys(LINKS[t.id]).map(pid => ({ i, j: NODES.findIndex(n => n.id === pid), on: t.id === theme }))).sort((a, b) => Number(a.on) - Number(b.on));
  return (
    <>
      <div role="group" aria-label="Themes" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 32 }}>
        {THEMES.map(t => (
          <button key={t.id} className="lab-pill" aria-pressed={t.id === theme} onClick={() => setTheme(t.id)} style={{ padding: "9px 14px", fontSize: 13.5, ...(t.id === theme ? { background: "#9db89f", color: "#141a16" } : { color: "#d9d5ca", borderColor: "rgba(235,230,218,.18)" }) }}>{t.label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(40px,90px) minmax(0,1.3fr)", marginTop: 24 }}>
        <div aria-hidden style={{ display: "flex", flexDirection: "column" }}>
          {THEMES.map(t => <div key={t.id} style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "flex-end", textAlign: "right", paddingRight: 10, font: "400 12px/1.2 'IBM Plex Mono',monospace", color: t.id === theme ? "#ebe6da" : "#7f877c" }}>{t.label}</div>)}
        </div>
        <svg aria-hidden width="100%" height="336" style={{ display: "block", overflow: "visible" }}>
          {lines.map((l, k) => <line key={k} x1="0%" y1={l.i * 48 + 24} x2="100%" y2={l.j * 48 + 24} style={{ stroke: l.on ? "#9db89f" : "rgba(235,230,218,.12)", strokeWidth: l.on ? 1.6 : 1 }} />)}
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {NODES.map(n => {
            const on = !!LINKS[theme][n.id];
            return <button key={n.id} onClick={() => open(n.id)} style={{ height: 40, margin: "4px 0", display: "flex", alignItems: "center", padding: "0 12px", borderRadius: 6, textAlign: "left", font: "500 14px/1.2 'Instrument Sans',sans-serif", background: on ? "#24302a" : "transparent", color: on ? "#ebe6da" : "#7f877c", border: on ? "1px solid rgba(157,184,159,.5)" : "1px solid rgba(235,230,218,.08)", transition: "all .2s" }}>{n.label}</button>;
          })}
        </div>
      </div>
      <Sec label={`Why these connect · ${THEMES.find(t => t.id === theme)!.label}`}>
        <ul aria-live="polite" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
          {NODES.filter(n => LINKS[theme][n.id]).map(n => (
            <li key={n.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,170px) minmax(0,1fr)", gap: 16, padding: "12px 0", borderBottom: "1px solid rgba(235,230,218,.08)" }}>
              <span style={{ font: "500 15px/1.4 'Instrument Sans',sans-serif", color: "#ebe6da" }}>{n.label}</span>
              <span style={{ font: "400 14.5px/1.5 'Instrument Sans',sans-serif", color: "#b6b9ae" }}>{LINKS[theme][n.id]}</span>
            </li>
          ))}
        </ul>
      </Sec>
    </>
  );
}

export function AllBody({ open }: { open: Open }) {
  return (
    <>
      <ul className="lab-list" style={{ marginTop: 32 }}>
        {PROJECT_LIST.map(p => (
          <li key={p.id}>
            <button className="lab-row" onClick={() => open(p.id)} style={{ gridTemplateColumns: "36px minmax(0,1fr)", gap: "4px 14px", padding: "18px 2px" }}>
              <span style={{ font: "400 12px/1.6 'IBM Plex Mono',monospace", color: "#9db89f" }}>{p.n}</span>
              <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ font: "500 17px/1.3 'Instrument Sans',sans-serif", color: "#ebe6da" }}>{p.name}</span>
                <span style={{ font: "400 14.5px/1.5 'Instrument Sans',sans-serif", color: "#b6b9ae" }}>{p.line}</span>
                <span style={{ font: "400 12px/1.4 'IBM Plex Mono',monospace", color: "#8f978c" }}>{p.tech}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button className="lab-btn" style={{ marginTop: 20, padding: "12px 16px" }} onClick={() => open("connections")}>Explore connections between projects →</button>
    </>
  );
}

export function AboutBody() {
  return (
    <>
      <section style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 14, font: "400 16px/1.65 'Instrument Sans',sans-serif", color: "#d9d5ca" }}>
        {ABOUT_PARAGRAPHS.map(t => <p key={t} style={{ textWrap: "pretty" }}>{t}</p>)}
      </section>
      <Sec label="Experience" first>
        <ol style={{ listStyle: "none" }}>
          {EXPERIENCE.map(e => (
            <li key={e.role + e.org} style={{ padding: "18px 0", borderBottom: "1px solid rgba(235,230,218,.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px 16px", alignItems: "baseline" }}>
                <span style={{ font: "500 16px/1.35 'Instrument Sans',sans-serif", color: "#ebe6da" }}>{e.role} · {e.org}</span>
                <span style={{ font: "400 12px/1.4 'IBM Plex Mono',monospace", color: "#a8ada3" }}>{e.meta}</span>
              </div>
              {e.notes.length > 0 && <ul style={{ margin: "8px 0 0", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 5, font: "400 14.5px/1.55 'Instrument Sans',sans-serif", color: "#b6b9ae" }}>{e.notes.map(n => <li key={n} style={{ textWrap: "pretty" }}>{n}</li>)}</ul>}
            </li>
          ))}
        </ol>
      </Sec>
      <Sec label="Education">
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px 16px", alignItems: "baseline" }}>
          <span style={{ font: "500 16px/1.35 'Instrument Sans',sans-serif", color: "#ebe6da" }}>{EDUCATION.degree}</span>
          <span style={{ font: "400 12px/1.4 'IBM Plex Mono',monospace", color: "#a8ada3" }}>{EDUCATION.period}</span>
        </div>
        <p style={{ margin: "6px 0 0", font: "400 14.5px/1.5 'Instrument Sans',sans-serif", color: "#b6b9ae" }}>{EDUCATION.gpa}</p>
      </Sec>
      <Sec label="Technical skills">
        <p style={{ margin: "0 0 10px", font: "400 14.5px/1.65 'IBM Plex Mono',monospace", color: "#d9d5ca" }}>{SKILLS.technical}</p>
        <p style={{ font: "400 14.5px/1.5 'Instrument Sans',sans-serif", color: "#b6b9ae" }}>{SKILLS.languages}</p>
      </Sec>
      <a className="lab-btn light" href={PROFILE.cv} download={PROFILE.cvFileName} style={{ marginTop: 28, padding: "12px 16px" }}>Download CV (PDF)</a>
    </>
  );
}

export function ContactBody() {
  const rows: [string, ReactNode][] = [
    ["Email", <a href={`mailto:${PROFILE.email}`} style={{ wordBreak: "break-all" }}>{PROFILE.email}</a>],
    ["GitHub", <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">{PROFILE.githubLabel} ↗</a>],
    ["CV", <a href={PROFILE.cv} download={PROFILE.cvFileName}>Download PDF</a>],
    ["Based in", <span style={{ color: "#d9d5ca" }}>{PROFILE.location}</span>],
  ];
  return (
    <ul className="lab-list" style={{ marginTop: 32 }}>
      {rows.map(([k, v]) => (
        <li key={k} style={{ display: "grid", gridTemplateColumns: "110px minmax(0,1fr)", gap: 12, padding: "18px 0", alignItems: "baseline" }}>
          <span style={{ font: "400 12px/1 'IBM Plex Mono',monospace", color: "#a8ada3" }}>{k}</span>
          <span style={{ font: "500 16px/1.4 'Instrument Sans',sans-serif" }}>{v}</span>
        </li>
      ))}
    </ul>
  );
}
