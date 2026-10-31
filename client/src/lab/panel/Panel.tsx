import { useEffect, useRef, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

/**
 * Slide-in panel. Radix handles the dialog behaviour: Esc and backdrop close it, Tab is
 * trapped inside, background is inert, and focus returns to whatever opened it.
 * On open (and when switching panels) focus moves to the title and scroll resets.
 */
export function Panel({ id, kicker, title, purpose, onClose, children }: {
  id: string; kicker: string; title: string; purpose: string; onClose: () => void; children: ReactNode;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    const t = window.setTimeout(() => titleRef.current?.focus({ preventScroll: true }), 40);
    return () => clearTimeout(t);
  }, [id]);

  return (
    <Dialog.Root open onOpenChange={o => { if (!o) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="lab-overlay" />
        <Dialog.Content
          className="lab-panel"
          onOpenAutoFocus={e => { e.preventDefault(); titleRef.current?.focus({ preventScroll: true }); }}
        >
          <div className="lab-panel-bar">
            <button className="lab-btn" onClick={onClose}>← Back to the desk</button>
            <span className="lab-mono" style={{ fontSize: 11, color: "#8f978c" }}>Esc to close</span>
          </div>
          <div ref={scrollRef} className="lab-panel-scroll">
            <div className="lab-panel-inner">
              <p className="lab-kicker" style={{ marginBottom: 14 }}>{kicker}</p>
              <Dialog.Title ref={titleRef} tabIndex={-1} className="lab-title">{title}</Dialog.Title>
              <Dialog.Description style={{ font: "400 18px/1.5 'Instrument Sans',sans-serif", color: "#c9c6bc", textWrap: "pretty" }}>{purpose}</Dialog.Description>
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
