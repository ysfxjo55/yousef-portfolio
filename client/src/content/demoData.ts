/**
 * FICTIONAL / SYNTHETIC DEMO DATA.
 * Everything in this file is invented for the interactive demos and is labelled as
 * such in the UI. None of it is a real result, document, person, session or metric.
 * Verified facts live in profile.ts and projects.ts, never here.
 */

// ── Agents World (simulated sessions) ───────────────────────────────
export interface AwSession { t: string; a: string; s: "working" | "sleeping" }
export interface AwFolder { name: string; lab?: boolean; sessions: AwSession[] }

export const AW_FOLDERS: AwFolder[] = [
  { name: "legal-rag-api", sessions: [{ t: "Add reranker evaluation", a: "Claude Code", s: "sleeping" }, { t: "Fix citation format", a: "Codex", s: "sleeping" }] },
  { name: "agents-world", sessions: [{ t: "World view tile labels", a: "Claude Code", s: "working" }, { t: "Trash restore flow", a: "OpenCode", s: "sleeping" }, { t: "Agent Guild roles", a: "Antigravity", s: "sleeping" }] },
  { name: "ocr-pipeline", sessions: [{ t: "Normalise Arabic digits", a: "Codex", s: "sleeping" }] },
  { name: "complaint-api", sessions: [{ t: "Confidence review queue", a: "Claude Code", s: "sleeping" }] },
  { name: "Research Lab", lab: true, sessions: [{ t: "Deep research: hallucination metrics", a: "Claude Code", s: "sleeping" }] },
  { name: "portfolio", sessions: [{ t: "Workbench prototype", a: "Antigravity", s: "working" }] },
];
export const AW_AGENTS = ["Claude Code", "OpenCode", "Codex", "Antigravity"];
export const AW_PROMPTS = ["Explain this codebase to me", "Review this project for bugs", "Fix the failing test"];
export const AW_REPLIES: Record<string, string> = {
  [AW_PROMPTS[0]]: "This folder holds an API service, its tests and a Dockerfile. The entry point is app/main.py. (Simulated reply.)",
  [AW_PROMPTS[1]]: "Two possible issues: empty input is not handled, and one outbound request has no timeout. (Simulated reply.)",
};

/** The desk monitor: tiles appear one by one, then one session switches to working. */
export const MONITOR_TILES = [
  { label: "legal-rag · 2", l: 6, t: 46, c: "#2f6a3e" },
  { label: "agents-world · 3", l: 35, t: 34, c: "#2f6a3e", hot: true },
  { label: "ocr-pipeline · 1", l: 64, t: 46, c: "#2f6a3e" },
  { label: "Research Lab", l: 14, t: 70, c: "#24596a", lab: true },
  { label: "complaint-api · 1", l: 43, t: 64, c: "#2f6a3e" },
  { label: "portfolio · 1", l: 70, t: 74, c: "#2f6a3e" },
];
export const MONITOR_ROWS: [string, "ready" | "working" | "sleeping"][] = [
  ["Deep Researcher", "ready"], ["agents-world", "sleeping"], ["legal-rag-api", "sleeping"], ["ocr-pipeline", "sleeping"], ["portfolio", "working"],
];
export const MONITOR_STEPS = 7; // step 7: one session switches from sleeping to working
export const MONITOR_FLIES: [number, number][] = [[12, 30], [26, 52], [58, 26], [80, 40], [90, 64], [8, 86], [52, 90], [70, 16]];

// ── Arabic OCR (fictional permit) ───────────────────────────────────
export const OCR_FIELDS: [string, string][] = [
  ["الاسم", "سارة محمد العلي"],
  ["رقم التصريح", "٤٨٢١٠٩٣٧"],
  ["التاريخ", "١٢ / ٠٣ / ١٤٤٨ هـ"],
  ["الفترة", "٥:٠٠ – ٧:٠٠ ص"],
];
export const OCR_JSON: [string, string][] = [
  ["name", "سارة محمد العلي"], ["permit_no", "48210937"], ["date_hijri", "1448-03-12"], ["time_slot", "05:00–07:00"],
];

// ── Analytics assistant (invented questions, tools and numbers) ─────
export interface ChatCase { q: string; route: string; call: string; answer: string; rows: [string, string][] }
export const CHAT: ChatCase[] = [
  { q: "كم عدد الزوار هذا الأسبوع مقارنة بالأسبوع الماضي؟", route: "Picked the visits tool: the question asks for a count over two weeks.", call: 'visits_count(granularity="week", last=2)', answer: "بلغ عدد الزوار ١٢٬٤٨٠ هذا الأسبوع، بزيادة ٨٪ عن الأسبوع الماضي.", rows: [["هذا الأسبوع", "12,480"], ["الأسبوع الماضي", "11,550"]] },
  { q: "ما أكثر ثلاث بوابات ازدحاماً اليوم؟", route: "Picked the visits tool, grouped by gate and limited to the top three.", call: 'visits_count(by="gate", date="today", order="desc", limit=3)', answer: "أكثر البوابات ازدحاماً اليوم: البوابة ٤ ثم البوابة ١ ثم البوابة ٧.", rows: [["البوابة ٤", "2,140"], ["البوابة ١", "1,905"], ["البوابة ٧", "1,610"]] },
  { q: "ما متوسط رضا الزوار هذا الشهر؟", route: "Picked the survey tool: satisfaction scores come from survey responses.", call: 'survey_stats(field="satisfaction", period="this_month")', answer: "متوسط الرضا هذا الشهر ٤٫٣ من ٥، بناءً على ٨٦٠ استجابة.", rows: [["المتوسط", "4.3 / 5"], ["الاستجابات", "860"]] },
  { q: "من سيفوز بمباراة الليلة؟", route: "No tool matches. The question is outside the operational data, so no query runs.", call: "", answer: "لا أستطيع الإجابة عن هذا السؤال. يمكنني المساعدة في أسئلة الزيارات والبوابات واستبيانات الرضا.", rows: [] },
];
export const PHONE_CHAT = { q: "كم زائر اليوم؟", tool: "cube_query", a: "٤٬٢١٠ زائر حتى الآن" };

// ── Complaint pipeline (invented complaint, labels and confidence) ──
export const COMPLAINT_TEXT = "للمرة الثالثة يتأخر وصول طلبي ولا أحد يرد على اتصالاتي.";
export const COMPLAINT_ORDER = ["Classify", "Route", "Explain"];
export const COMPLAINT_TILES = ["Route", "Explain", "Classify"];
export const COMPLAINT_CARDS = [
  { stage: "Classify · MARBERT-v2 classifiers", body: "sentiment: negative · topic: delivery · intent: complaint · confidence 0.91 (example values)" },
  { stage: "Route · deterministic rule", body: "negative + delivery + complaint → escalate to the delivery team. Confidence is above the review threshold, so no manual review is needed." },
  { stage: "Explain · optional LLM layer", body: "“The customer reports a third delayed delivery and no reply to calls, so the complaint was escalated to the delivery team.” The explanation describes the action; it does not change it." },
];
export function complaintFeedback(slots: (string | null)[]): string {
  if (slots.includes(null)) return "";
  if (slots[0] !== "Classify") return "Not yet. The routing rules read the sentiment, topic and intent labels, so Classify has to come first.";
  if (slots[1] !== "Route") return "Close. Explain describes an action that has already been chosen, so Route comes before Explain.";
  return "Correct. Now run the complaint through the pipeline.";
}

// ── Legal RAG (fictional legal text) ────────────────────────────────
export interface LegalStep { n: string; title: string; ar: string; passages: string[]; en: string }
export const LEGAL: LegalStep[] = [
  { n: "1", title: "Arabic question", ar: "ما المدة المتاحة للاعتراض على القرار بعد الإبلاغ به؟", passages: [], en: "A user asks, in Arabic, how long they have to object to a decision after being notified." },
  { n: "2", title: "Retrieval", ar: "", passages: [], en: "The question is embedded with E5 and the nearest passages are fetched from Qdrant. The system keeps the top-ranked passages and passes them on; it does not answer from memory." },
  { n: "3", title: "Supporting passages", ar: "", passages: ["[١] المادة ٣: يجوز الاعتراض على القرار خلال ثلاثين يوماً من تاريخ الإبلاغ به.", "[٢] المادة ٧: يُقدَّم الاعتراض كتابةً إلى الجهة المختصة."], en: "Two passages support the answer. They are numbered so the answer can cite them. (Fictional text written for this demo.)" },
  { n: "4", title: "Cited answer", ar: "يمكن الاعتراض خلال ثلاثين يوماً من تاريخ الإبلاغ بالقرار [١]، ويُقدَّم الاعتراض كتابةً إلى الجهة المختصة [٢].", passages: [], en: "Every claim in the answer points to a passage. If no language model is configured, the API returns passages [1] and [2] as context instead of a written answer." },
  { n: "5", title: "Evaluation", ar: "", passages: [], en: "Hit@K asks whether a relevant passage appears in the top K results; MRR averages 1 / rank of the first relevant one. Here the relevant passage is ranked first, so Hit@3 = 1 and the reciprocal rank is 1.0 for this one fictional query." },
];

// ── Cardiology threshold demo (24 synthetic cases, not project results) ──
/** [risk score, is positive (1) or negative (0)] */
export const CARDIO_CASES: [number, 0 | 1][] = [[.91,1],[.84,1],[.77,1],[.69,1],[.58,1],[.46,1],[.33,1],[.22,1],[.81,0],[.64,0],[.55,0],[.49,0],[.42,0],[.38,0],[.31,0],[.27,0],[.21,0],[.18,0],[.14,0],[.11,0],[.08,0],[.06,0],[.04,0],[.02,0]];

export function cardioCounts(threshold: number) {
  let tp = 0, fn = 0, fp = 0, tn = 0;
  for (const [score, positive] of CARDIO_CASES) {
    const flagged = score >= threshold - 1e-9;
    if (positive && flagged) tp++; else if (positive) fn++; else if (flagged) fp++; else tn++;
  }
  return { tp, fn, fp, tn };
}
