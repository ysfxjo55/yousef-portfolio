import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

const RM_QUERY = "(prefers-reduced-motion: reduce)";

/** True when the OS asks for reduced motion. Sequences then jump to their end state. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    cb => {
      const mq = window.matchMedia(RM_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  );
}

/** True while the element is on screen AND the tab is visible. Used to pause animation. */
export function useActive(ref: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState === "visible");
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  useEffect(() => {
    const on = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return inView && tabVisible;
}

/**
 * Counts 0 → total once, one step per `ms`, only while `active`. It never loops and
 * its timer is cleared when inactive, on completion and on unmount.
 */
export function useStepper(total: number, ms: number, active: boolean, reduced: boolean): number {
  const [step, setStep] = useState(reduced ? total : 0);
  const done = step >= total;
  useEffect(() => {
    if (reduced) { setStep(total); return; }
    if (!active || done) return;
    const id = window.setInterval(() => setStep(s => Math.min(total, s + 1)), ms);
    return () => window.clearInterval(id);
  }, [active, done, reduced, total, ms]);
  return step;
}

/** Collects timeouts so they can all be cleared on unmount or restart. */
export function useTimers() {
  const ids = useRef<number[]>([]);
  useEffect(() => () => ids.current.forEach(clearTimeout), []);
  return {
    later(fn: () => void, ms: number) { ids.current.push(window.setTimeout(fn, ms)); },
    clear() { ids.current.forEach(clearTimeout); ids.current = []; },
  };
}
