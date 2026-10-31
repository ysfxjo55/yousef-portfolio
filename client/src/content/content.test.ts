import { describe, expect, it } from "vitest";
import { CARDIO_CASES, CHAT, LEGAL, cardioCounts, complaintFeedback } from "./demoData";
import { EXPERIENCE, PROFILE, PUBLICATION } from "./profile";
import { LINKS, NODES, PROJECTS, PROJECT_LIST, THEMES } from "./projects";
import { panelFromHash } from "../lab/usePanelRouter";

const ALLOWED_HOSTS = ["github.com", "aclanthology.org"];

describe("verified content", () => {
  it("keeps roles and dates exactly as in the CV", () => {
    expect(EXPERIENCE.map(e => `${e.role} | ${e.org} | ${e.meta}`)).toEqual([
      "AI Developer | Qatfah | Remote · 2026 – Present",
      "AI Engineer, Part-time | Moasherat | Makkah · 2026 – Present",
      "Data Scientist Intern | Qanoniah | Makkah · Feb – Aug 2026",
      "AI Engineer Intern | Rakaya | 2026 – Aug 2026",
      "Data Analyst, Hajj Season | Moasherat | Makkah · May – Jun 2025",
    ]);
    expect(PUBLICATION.stats.map(s => s.value)).toEqual(["3rd of 7", "0.7596"]);
  });

  it("only links to verified hosts", () => {
    const urls = [PROFILE.github, PUBLICATION.href, ...Object.values(PROJECTS).flatMap(p => p.links.map(l => l.href))];
    for (const u of urls) expect(ALLOWED_HOSTS).toContain(new URL(u).hostname);
  });

  it("does not publish the phone number", () => {
    expect(JSON.stringify([PROFILE, EXPERIENCE, PROJECTS])).not.toMatch(/0509610800|\+?966\s?5/);
  });

  it("project list, map nodes and themes refer to real panels", () => {
    const ids = new Set(PROJECT_LIST.map(p => p.id));
    for (const n of NODES) expect(ids.has(n.id)).toBe(true);
    for (const t of THEMES) for (const k of Object.keys(LINKS[t.id])) expect(ids.has(k as never)).toBe(true);
    for (const id of Object.keys(PROJECTS)) expect(ids.has(id as never)).toBe(true);
  });

  it("projects without a public repo say so instead of linking", () => {
    for (const p of Object.values(PROJECTS)) expect(p.links.length > 0 || !!p.noLinkText).toBe(true);
  });
});

describe("fictional demo data", () => {
  it("has 24 cardiology cases whose counts always add up", () => {
    expect(CARDIO_CASES).toHaveLength(24);
    for (const t of [0.05, 0.2, 0.5, 0.9]) {
      const c = cardioCounts(t);
      expect(c.tp + c.fn + c.fp + c.tn).toBe(24);
    }
    expect(cardioCounts(0.5)).toMatchObject({ tp: 5, fn: 3 });
  });
  it("complaint feedback enforces Classify → Route → Explain", () => {
    expect(complaintFeedback(["Route", "Explain", "Classify"])).toMatch(/Classify has to come first/);
    expect(complaintFeedback(["Classify", "Explain", "Route"])).toMatch(/Route comes before Explain/);
    expect(complaintFeedback(["Classify", "Route", "Explain"])).toMatch(/^Correct/);
  });
  it("includes one out-of-scope analytics question that calls no tool", () => {
    expect(CHAT.filter(c => c.call === "")).toHaveLength(1);
    expect(LEGAL).toHaveLength(5);
  });
});

describe("URLs", () => {
  it("maps old portfolio anchors and new panel ids to panels", () => {
    expect(panelFromHash("#about")).toBe("about");
    expect(panelFromHash("#projects")).toBe("all");
    expect(panelFromHash("#experience")).toBe("about");
    expect(panelFromHash("#skills")).toBe("about");
    expect(panelFromHash("#certifications")).toBe("about");
    expect(panelFromHash("#research")).toBe("research");
    expect(panelFromHash("#agents")).toBe("agents");
    expect(panelFromHash("#hero")).toBeNull();
    expect(panelFromHash("#nonsense")).toBeNull();
    expect(panelFromHash("")).toBeNull();
  });
});
