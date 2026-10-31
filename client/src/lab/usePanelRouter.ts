import { useCallback, useEffect, useRef, useState } from "react";
import type { PanelId } from "@/content/projects";

const PANELS: PanelId[] = ["agents", "analytics", "ocr", "complaint", "legal", "cardio", "research", "connections", "all", "about", "contact"];

/**
 * Anchors from the previous portfolio (#about, #projects, …) still work: each opens
 * the closest panel. Anything else in the hash is ignored.
 */
const LEGACY: Record<string, PanelId | null> = {
  hero: null,
  projects: "all",
  experience: "about",
  skills: "about",
  education: "about",
  certifications: "about",
};

export function panelFromHash(hash: string): PanelId | null {
  const key = hash.replace(/^#\/?/, "");
  if ((PANELS as string[]).includes(key)) return key as PanelId;
  return LEGACY[key] ?? null;
}

/**
 * Owns which panel is open and mirrors it in the URL hash (#agents, #about, …) so
 * panels are linkable and the browser Back button closes them.
 * Also owns the notebook cover state: it opens first, then the research panel follows.
 */
export function usePanelRouter(reduced: boolean) {
  const [panel, setPanel] = useState<PanelId | null>(() => panelFromHash(window.location.hash));
  const [notebookOpen, setNotebookOpen] = useState(panel === "research");
  const pushed = useRef(false);
  const returnEl = useRef<HTMLElement | null>(null);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const show = useCallback((id: PanelId | null) => {
    setPanel(id);
    if (id === "research") setNotebookOpen(true);
    else if (!id) {
      later(() => setNotebookOpen(false), reduced ? 0 : 160);
      // Radix only restores focus to a <Trigger>; our panels open from many places, so do it here.
      const el = returnEl.current;
      returnEl.current = null;
      later(() => el?.isConnected && el.focus({ preventScroll: true }), 40);
    }
  }, [reduced]);

  const open = useCallback((id: PanelId) => {
    const url = `#${id}`;
    if (!panel && document.activeElement instanceof HTMLElement) returnEl.current = document.activeElement;
    if (panel) window.history.replaceState(null, "", url);
    else { window.history.pushState(null, "", url); pushed.current = true; }
    if (id === "research" && !panel && !reduced) {
      setNotebookOpen(true);
      later(() => show(id), 460);
    } else show(id);
  }, [panel, reduced, show]);

  const close = useCallback(() => {
    show(null);
    if (pushed.current) { pushed.current = false; window.history.back(); }
    else if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, [show]);

  useEffect(() => {
    const sync = () => show(panelFromHash(window.location.hash));
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => { window.removeEventListener("popstate", sync); window.removeEventListener("hashchange", sync); };
  }, [show]);

  return { panel, notebookOpen, open, close };
}
