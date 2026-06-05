import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowDown, BookOpen, Cpu, FlaskConical, Layers, Moon, Sun, Star, Eye } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import ParticleCanvas from "../components/ParticleCanvas";
import TypeWriter from "../components/TypeWriter";
import SectionReveal from "../components/SectionReveal";
import data from "../../../portfolio-data.json";

// ─── Custom Cursor ────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  if (!toggleTheme) return null;
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
    </button>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { label: string; id: string }[] = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Research", id: "research" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Credentials", id: "certifications" },
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <span className="nav-logo">yousef.ammar</span>
        <div className="nav-actions">
          <ThemeToggle />
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>{l.label}</a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${data.profile.email}`}
                className="btn-outline"
                style={{ padding: "7px 18px", fontSize: "12px" }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero stats ───────────────────────────────────────────────────
function HeroStats() {
  const stats = (data as { stats?: { value: string; label: string }[] }).stats ?? [];
  if (!stats.length) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "12px",
        maxWidth: "560px",
        marginBottom: "40px",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="glass-card"
          style={{
            padding: "14px 16px",
            textAlign: "center",
            background: "var(--glass-bg)",
          }}
        >
          <div
            style={{
              fontSize: "clamp(22px, 4vw, 28px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--accent-light)",
              lineHeight: 1.1,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "var(--text-subtle)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        boxSizing: "border-box",
        paddingTop: "clamp(5.75rem, 12svh, 8.5rem)",
        paddingBottom: "clamp(2rem, 6svh, 4rem)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--hero-bg-gradient)",
      }}
    >
      <ParticleCanvas />

      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "var(--hero-orb)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            Yousef Ammar
          </h1>

          <div
            style={{
              fontSize: "clamp(18px, 3vw, 28px)",
              fontWeight: 600,
              color: "var(--text-muted)",
              marginBottom: "28px",
              minHeight: "2em",
            }}
          >
            <TypeWriter
              phrases={[
                "Arabic NLP Engineer",
                "XAI Researcher",
                "Production ML Systems",
                "AI Engineer @ Moasherat + Qanoniah",
              ]}
              className="gradient-text"
            />
          </div>

          <p
            style={{
              fontSize: "16px",
              color: "var(--text-muted)",
              maxWidth: "520px",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            {data.profile.subtitle}. 3rd year Data Science @ UQU · GPA {data.profile.gpa.split(" /")[0]} · Active IEEE Access research.
          </p>

          <HeroStats />

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "56px" }}>
            <a href="#projects" className="btn-primary">
              View Projects <ArrowDown size={15} />
            </a>
            <a href={data.profile.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Github size={15} /> GitHub
            </a>
            <a href={data.profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a
              href={(data.profile as { huggingface?: string }).huggingface ?? "https://huggingface.co/Ysfxjo"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <span style={{ fontSize: "13px", fontWeight: 700 }}>🤗</span> Hugging Face
            </a>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--text-subtle)",
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            <ArrowDown size={14} />
            <span>SCROLL</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="divider" style={{ marginBottom: "96px" }} />
        <SectionReveal direction="left">
          <div style={{ maxWidth: "720px" }}>
            <div className="section-label">About</div>
            <h2 className="section-title">Who I Am</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "20px" }}>
              {data.about}
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "28px" }}>
              I believe in deterministic boundaries — LLMs should{" "}
              <em style={{ color: "var(--text)", fontStyle: "normal", fontWeight: 600 }}>explain</em>, not
              decide. Every system I build puts interpretability and privacy at the core.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Arabic NLP", "XAI", "Federated Learning", "Production ML"].map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────
function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <SectionReveal>
          <div className="section-label">Experience</div>
          <h2 className="section-title">Where I've Worked</h2>
          <p className="section-subtitle" style={{ marginBottom: "56px" }}>
            Two concurrent AI roles while finishing a research paper — in my 3rd year.
          </p>
        </SectionReveal>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "12px",
              bottom: "12px",
              width: "1px",
              background: "linear-gradient(180deg, var(--accent), transparent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.experience.map((exp, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  style={{ paddingLeft: "36px", paddingBottom: "40px", position: "relative", cursor: "pointer" }}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-4px",
                      top: "4px",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: i === 0 ? "var(--accent)" : "var(--text-subtle)",
                      border: "2px solid var(--bg)",
                      boxShadow: i === 0 ? "0 0 10px var(--accent-glow)" : "none",
                    }}
                  />

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text)" }}>{exp.role}</h3>
                        {exp.period === "Current" && <span className="dot-live" />}
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ fontWeight: 600, color: "var(--accent-light)", fontSize: "14px" }}>{exp.company}</span>
                        <span style={{ color: "var(--text-subtle)", fontSize: "13px" }}>·</span>
                        <span style={{ color: "var(--text-subtle)", fontSize: "13px" }}>{exp.location}</span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: exp.period === "Current" ? "var(--accent)" : "var(--text-subtle)",
                        whiteSpace: "nowrap",
                        marginTop: "3px",
                        padding: "3px 8px",
                        background: exp.period === "Current" ? "var(--accent-dim)" : "transparent",
                        borderRadius: "4px",
                        border: exp.period === "Current" ? "1px solid var(--border)" : "none",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: expanded === i ? "auto" : 0, opacity: expanded === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <ul style={{ listStyle: "none", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {exp.highlights.map((h, j) => (
                        <li key={j} style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, paddingLeft: "16px", position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, top: "9px", width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)" }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {expanded !== i && (
                    <div style={{ fontSize: "11px", color: "var(--text-subtle)", marginTop: "6px", fontFamily: "var(--font-mono)" }}>
                      click to expand →
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Research ─────────────────────────────────────────────────────
function Research() {
  return (
    <section id="research" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-label">Research</div>
          <h2 className="section-title">Active Research</h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div
            className="glass-card"
            style={{
              padding: "48px",
              background: "var(--research-panel-bg)",
              border: "1px solid var(--research-panel-border)",
              marginTop: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-80px",
                right: "-80px",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "var(--research-highlight-orb)",
                pointerEvents: "none",
              }}
            />

            <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", padding: "3px 10px", borderRadius: "4px" }}>
                IN PROGRESS
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-light)", background: "var(--accent-dim)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: "4px" }}>
                TARGET: IEEE Access
              </span>
            </div>

            <h3 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, marginBottom: "24px", lineHeight: 1.3, maxWidth: "680px" }}>
              {data.research.title}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
              {data.research.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <span style={{ fontSize: "10px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7 }}>{h}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["MARBERT", "SHAP", "LIME", "FedAvg", "Arabic NLP", "XAI", "Federated Learning"].map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────
const statusConfig: Record<string, { dot: string; label: string }> = {
  Production: { dot: "dot-live",     label: "Production"          },
  Live:       { dot: "dot-live",     label: "Live"                },
  Active:     { dot: "dot-active",   label: "Active"              },
  Finalist:   { dot: "dot-finalist", label: "Hackathon Finalist"  },
  Research:   { dot: "dot-active",   label: "Research"            },
};

type PortfolioProject = (typeof data.projects)[number] & {
  featured?: boolean;
  github?: string;
  live?: string;
  platform?: string;
  highlights?: string[];
};

const PROJECT_FILTERS = ["All", "Featured", "Production", "Research"] as const;
type ProjectFilter = (typeof PROJECT_FILTERS)[number];

function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const projects = [...(data.projects as PortfolioProject[])].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  );

  const filtered = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Featured") return Boolean(p.featured);
    if (filter === "Production") return p.status === "Production" || p.status === "Live";
    if (filter === "Research") return p.status === "Research";
    return true;
  });

  return (
    <section id="projects" className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <SectionReveal>
          <div className="section-label">Projects</div>
          <h2 className="section-title">What I've Built</h2>
          <p className="section-subtitle" style={{ marginBottom: "28px" }}>
            17 public repos — production APIs, RAG systems, XAI research, and open-source tools.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "36px" }}>
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                style={{
                  padding: "7px 14px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${filter === f ? "var(--accent)" : "var(--border)"}`,
                  background: filter === f ? "var(--accent-dim)" : "transparent",
                  color: filter === f ? "var(--accent-light)" : "var(--text-subtle)",
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {filtered.map((p, i) => {
            const sc = statusConfig[p.status] ?? { dot: "dot-active", label: p.status };
            return (
              <SectionReveal key={p.name} delay={i * 0.07}>
                <motion.div
                  className="glass-card"
                  whileHover={{ y: -4, boxShadow: "var(--card-hover-glow)" }}
                  style={{
                    padding: "28px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    border: p.featured ? "1px solid var(--border-hover)" : undefined,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span className={sc.dot} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-subtle)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {sc.label}
                      </span>
                      {p.featured && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#f59e0b", fontFamily: "var(--font-mono)" }}>
                          <Star size={10} fill="#f59e0b" /> PINNED
                        </span>
                      )}
                      {p.platform && (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-subtle)" }}>
                          · {p.platform}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" title="View on GitHub" style={{ color: "var(--text-subtle)", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
                          <Github size={16} />
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" title="Live demo" style={{ color: "var(--text-subtle)", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-light)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", lineHeight: 1.3, color: "var(--text)" }}>
                      {p.name}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "12px" }}>{p.description}</p>
                    {p.highlights && p.highlights.length > 0 && (
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {p.highlights.slice(0, 2).map((h) => (
                          <li key={h} style={{ fontSize: "12px", color: "var(--text-subtle)", lineHeight: 1.6, paddingLeft: "12px", position: "relative" }}>
                            <span style={{ position: "absolute", left: 0, top: "7px", width: "3px", height: "3px", borderRadius: "50%", background: "var(--accent)" }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a
              href={data.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Github size={15} />
              View all 17 public repos on GitHub
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────
function Skills() {
  const s = data.skills as Record<string, string[]>;

  const groups = [
    { icon: <Cpu size={16} />,         label: "ML & NLP",        keys: ["ml_nlp"] },
    { icon: <FlaskConical size={16} />, label: "XAI & FL",        keys: ["xai", "federated_ml"] },
    { icon: <Eye size={16} />,         label: "Vision & OCR",    keys: ["vision_ocr"] },
    { icon: <Layers size={16} />,       label: "Infrastructure",  keys: ["infrastructure", "agents"] },
    { icon: <BookOpen size={16} />,     label: "Specialties",     keys: ["specialties"] },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-label">Skills</div>
          <h2 className="section-title">Technical Stack</h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Built from real projects and production systems — not a checklist.
          </p>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
          {groups.map((g, i) => {
            const items = g.keys.flatMap((k) => s[k] ?? []);
            return (
              <SectionReveal key={g.label} delay={i * 0.07}>
                <div className="glass-card" style={{ padding: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent-dim)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                      {g.icon}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: "14px" }}>{g.label}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {items.map((item) => <span className="tag" key={item}>{item}</span>)}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.3}>
          <div className="glass-card" style={{ padding: "20px 28px", marginTop: "20px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: "8px" }}>
              Languages
            </span>
            {s.programming?.map((p) => <span className="tag" key={p}>{p}</span>)}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Certifications ───────────────────────────────────────────────
function Certifications() {
  return (
    <section id="certifications" className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <SectionReveal>
          <div className="section-label">Credentials</div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Math, ML, CV, and cloud — across KAUST, DeepLearning.AI, AWS, and INE.
          </p>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(380px, 100%), 1fr))", gap: "10px" }}>
          {data.certifications.map((cert, i) => {
            const color = cert.includes("KAUST") ? "#6366f1" : cert.includes("DeepLearning") ? "#22c55e" : cert.includes("AWS") ? "#f59e0b" : "var(--text-subtle)";
            return (
              <SectionReveal key={i} delay={i * 0.04}>
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 18px", background: "var(--cert-row-bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", transition: "border-color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "7px" }} />
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>{cert}</span>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "56px 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 600, color: "var(--accent)", marginBottom: "6px" }}>
              yousef.ammar
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-subtle)" }}>
              Arabic NLP Engineer · Makkah, Saudi Arabia · 2026
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {[
              { href: data.profile.github,   icon: <Github size={15} />,   label: "GitHub"      },
              { href: data.profile.linkedin,  icon: <Linkedin size={15} />, label: "LinkedIn"    },
              { href: (data.profile as { huggingface?: string }).huggingface ?? "https://huggingface.co/Ysfxjo", icon: null, label: "HuggingFace" },
              { href: `mailto:${data.profile.email}`,  icon: <Mail size={15} />, label: "Email"  },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{ color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
              >
                {l.icon}{l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Research />
        <Projects />
        <Skills />
        <Certifications />
      </main>
      <Footer />
    </>
  );
}
