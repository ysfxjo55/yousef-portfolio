/**
 * VERIFIED CONTENT: project write-ups shown in the panels and the project list.
 * Roles, stacks and links come from the CV and the public GitHub repos.
 * Claims not in the CV are deliberately absent (no metrics, no live demo links).
 * Demo data for the interactive parts lives in demoData.ts and is fictional.
 */

export type ProjectId = "agents" | "analytics" | "ocr" | "complaint" | "legal" | "cardio";
export type PanelId = ProjectId | "research" | "connections" | "all" | "about" | "contact";

export interface Project {
  kicker: string;
  title: string;
  purpose: string;
  problem: string;
  contribution: string[];
  how: string;
  evidence: string;
  limits: string[];
  tech: string[];
  links: { label: string; href: string }[];
  noLinkText?: string;
}

export const PROJECTS: Record<ProjectId, Project> = {
  agents: {
    kicker: "Project · Developer tool",
    title: "Agents World",
    purpose: "A local app for seeing, starting and continuing AI coding sessions across Claude Code, Codex, OpenCode and Antigravity.",
    problem: "Each coding agent keeps its sessions in its own local history. With many projects and several agent programs, it gets hard to see what is running, what is asleep, and where to pick up.",
    contribution: [
      "Built a World view that lays out project folders as tiles, with session counts and each session shown as working or sleeping.",
      "Built a Chat view that starts a session with any installed agent program in a chosen folder, or continues one from the sidebar.",
      "Added access controls per chat: actions that need permission pause for review.",
      "Added recoverable deletion through Trash, plus agent activity tracking across sessions.",
      "Added reusable agent roles (an Agent Guild with roles such as architect, builder and code-reviewer) and a Research Lab space.",
    ],
    how: "Agents World reads local session histories and groups them by project folder. The World and Chat views are two ways into the same sessions.",
    evidence: "The source code is public on GitHub. No usage figures are published.",
    limits: [
      "It runs the AI programs installed on your own computer and does not host agents.",
      "The monitor on the desk and the demo above are simulations with example sessions, not a live connection.",
    ],
    tech: ["JavaScript", "Node.js", "Claude Code", "Codex", "OpenCode", "Antigravity"],
    links: [{ label: "github.com/ysfxjo55/agents-world", href: "https://github.com/ysfxjo55/agents-world" }],
  },
  analytics: {
    kicker: "Work · Tool-using assistant",
    title: "Arabic Analytics Assistant",
    purpose: "A chatbot that answers Arabic questions about operational data by calling tools.",
    problem: "Operational data sits behind databases and dashboards. Staff who ask questions in Arabic need answers without writing queries.",
    contribution: [
      "At Moasherat: developed an Arabic analytics chatbot connecting FastMCP, Cube, Directus, and LibreChat to operational data.",
      "Improved the tool definitions and routing so that questions reach the right tool.",
    ],
    how: "LibreChat provides the chat interface. Tools served with FastMCP give the model access to operational data through Cube and Directus. For each question the model either picks a tool or says it cannot help.",
    evidence: "Employer work. No public figures.",
    limits: [
      "An answer is only right if the right tool is chosen, which is why clear tool descriptions and routing mattered.",
      "The code and data are not public. The demo uses invented numbers and a scripted trace.",
    ],
    tech: ["FastMCP", "Cube", "Directus", "LibreChat"],
    links: [],
    noLinkText: "No public repository. Details available on request.",
  },
  ocr: {
    kicker: "Work · Arabic OCR",
    title: "Arabic Document OCR",
    purpose: "Extracting structured fields from Arabic document images.",
    problem: "Teams receive Arabic documents, such as permit images, and need specific fields as data they can query rather than as pictures.",
    contribution: [
      "At Moasherat: built a PaddleOCR and FastAPI pipeline that extracts structured fields from Arabic Umrah permit images.",
      "At Qanoniah: developed Arabic OCR processing with text normalisation, evaluated with word and character error rates, and built a cached FastAPI leaderboard service.",
    ],
    how: "An image goes through OCR, the Arabic text is normalised, and the fields are extracted and returned as JSON from a FastAPI service.",
    evidence: "OCR output was evaluated with word error rate (WER) and character error rate (CER). The figures are not published here.",
    limits: [
      "This was employer work, so the code and real documents are not public.",
      "The desk demo uses a fictional document and runs entirely in the browser.",
    ],
    tech: ["Python", "PaddleOCR", "FastAPI"],
    links: [],
    noLinkText: "No public repository. Details available on request.",
  },
  complaint: {
    kicker: "Project · Arabic NLP",
    title: "Arabic Complaint Classification API",
    purpose: "Classifies Arabic complaints and routes each one to an action.",
    problem: "Arabic complaints arrive as free text. Each needs a sentiment, topic and intent before anyone can act on it, and uncertain cases need a person to look at them.",
    contribution: [
      "Integrated sentiment, topic and intent classifiers built on MARBERT-v2.",
      "Added deterministic action routing on top of the classifier outputs.",
      "Added confidence-based manual review and optional LLM explanations.",
      "Served the API with FastAPI and packaged it with Docker.",
    ],
    how: "Classifiers label the complaint. Fixed rules map those labels to an action, and low-confidence cases go to manual review. An optional LLM writes a short explanation of the chosen action.",
    evidence: "The code is public on GitHub. No accuracy figures are claimed here.",
    limits: [
      "Deterministic rules keep actions predictable and auditable, but a new category needs a new rule.",
      "The LLM explanation is optional and never chooses the action.",
    ],
    tech: ["Python", "MARBERT-v2", "FastAPI", "Docker"],
    links: [{ label: "github.com/ysfxjo55/arabic-complaint-classification-api", href: "https://github.com/ysfxjo55/arabic-complaint-classification-api" }],
  },
  legal: {
    kicker: "Project · Retrieval",
    title: "Arabic Legal RAG API",
    purpose: "Answers Arabic legal questions with citations to the passages it retrieved.",
    problem: "A legal answer needs to point back to its source text. A fluent answer without its supporting passage is hard to check.",
    contribution: [
      "Built retrieval and cited-answer generation over legal documents with FastAPI, Qdrant and E5 embeddings.",
      "Added a context-only fallback that returns the retrieved passages when no language model is configured.",
      "Related work at Qanoniah: Arabic legal retrieval workflows with structured document parsing, hybrid search, cross-encoder reranking, and Hit@K/MRR evaluation.",
    ],
    how: "Step through one question below. Each step shows what the system decides and why.",
    evidence: "Retrieval in my Qanoniah work was evaluated with Hit@K and MRR. Scores are not published here.",
    limits: [
      "An answer can only be as good as the passages retrieved for it.",
      "The fallback keeps the API useful without a model, but returns passages rather than a written answer.",
    ],
    tech: ["FastAPI", "Qdrant", "E5 embeddings"],
    links: [{ label: "github.com/ysfxjo55/legal-rag-api", href: "https://github.com/ysfxjo55/legal-rag-api" }],
  },
  cardio: {
    kicker: "Project · Explainability",
    title: "Interpretable Cardiology Risk",
    purpose: "Comparing interpretable models for cardiovascular risk on the Framingham dataset.",
    problem: "In risk screening, a missed positive and a false alarm have different costs, and the reasons behind a prediction matter as much as the score.",
    contribution: [
      "Compared logistic regression and random forest models on Framingham data.",
      "Evaluated the models with recall and ROC-AUC.",
      "Added a Bayesian analysis with PyMC and SHAP explanations.",
    ],
    how: "Each model produces a risk score, and a threshold turns the score into a flag. The demo below shows how that choice trades missed positives against false alarms.",
    evidence: "Model results are in the repository and are not restated here.",
    limits: ["A study project on a public dataset. It is not a clinical tool."],
    tech: ["scikit-learn", "SHAP", "PyMC"],
    links: [{ label: "github.com/ysfxjo55/cardiology-risk-xai", href: "https://github.com/ysfxjo55/cardiology-risk-xai" }],
  },
};

export const OTHER_HEADS: Record<Exclude<PanelId, ProjectId>, { kicker: string; title: string; purpose: string }> = {
  research: { kicker: "Research · Publication", title: "Research and evaluation", purpose: "Starting with an ArabicNLP 2026 shared-task paper on Arabic hallucination detection." },
  connections: { kicker: "Map", title: "How the work connects", purpose: "Select a theme to see which projects it runs through, and why." },
  all: { kicker: "Index", title: "All projects", purpose: "Everything on the desk, as a list." },
  about: { kicker: "About", title: "Yousef Ammar Abdullah", purpose: "AI and ML engineering · Arabic NLP · Makkah, Saudi Arabia" },
  contact: { kicker: "Contact", title: "Get in touch", purpose: "Email is the best way to reach me." },
};

export const PROJECT_LIST: { id: PanelId; n: string; name: string; line: string; tech: string }[] = [
  { id: "agents", n: "01", name: "Agents World", line: "A local app for seeing and continuing AI coding sessions across four agent programs.", tech: "JavaScript · Node.js" },
  { id: "ocr", n: "02", name: "Arabic Document OCR", line: "Structured fields from Arabic document images.", tech: "PaddleOCR · FastAPI" },
  { id: "complaint", n: "03", name: "Arabic Complaint Classification API", line: "Classifies Arabic complaints and routes each one to an action.", tech: "MARBERT-v2 · FastAPI" },
  { id: "legal", n: "04", name: "Arabic Legal RAG API", line: "Cited answers over Arabic legal documents.", tech: "Qdrant · E5" },
  { id: "cardio", n: "05", name: "Interpretable Cardiology Risk", line: "Interpretable risk models on Framingham data.", tech: "scikit-learn · SHAP · PyMC" },
  { id: "analytics", n: "06", name: "Arabic Analytics Assistant", line: "Answers Arabic questions about operational data by calling tools.", tech: "FastMCP · Cube · LibreChat" },
  { id: "research", n: "07", name: "Arabic hallucination detection", line: "ArabicNLP 2026 shared-task paper. Co-author; team placed 3rd of 7.", tech: "Publication" },
];

export const THEMES = [
  { id: "arabic", label: "Arabic language" },
  { id: "retrieval", label: "Retrieval" },
  { id: "evaluation", label: "Evaluation" },
  { id: "explain", label: "Explainability" },
  { id: "devtools", label: "Developer tools" },
  { id: "reliability", label: "System reliability" },
] as const;
export type ThemeId = (typeof THEMES)[number]["id"];

export const NODES: { id: PanelId; label: string }[] = [
  { id: "agents", label: "Agents World" },
  { id: "research", label: "Hallucination paper" },
  { id: "ocr", label: "Arabic OCR" },
  { id: "analytics", label: "Analytics assistant" },
  { id: "complaint", label: "Complaint API" },
  { id: "legal", label: "Legal RAG" },
  { id: "cardio", label: "Cardiology risk" },
];

export const LINKS: Record<ThemeId, Partial<Record<PanelId, string>>> = {
  arabic: { research: "Scores Arabic model outputs for hallucinated content.", ocr: "Reads Arabic document images and normalises Arabic text.", complaint: "Classifies Arabic complaint text with MARBERT-v2.", legal: "Retrieves and cites Arabic legal passages.", analytics: "Answers questions asked in Arabic about operational data." },
  retrieval: { legal: "Qdrant with E5 embeddings; hybrid search and cross-encoder reranking in the Qanoniah work." },
  evaluation: { research: "ROC-AUC on a hidden test set, with attention to reliability and generalisation.", ocr: "Word and character error rates (Qanoniah).", legal: "Hit@K and MRR for retrieval (Qanoniah).", cardio: "Recall and ROC-AUC across two model types." },
  explain: { cardio: "SHAP explanations and a Bayesian analysis.", complaint: "Optional LLM explanation of the routed action." },
  devtools: { agents: "An interface for viewing and continuing AI coding sessions.", analytics: "Tools served to the model with FastMCP." },
  reliability: { agents: "Access controls and recoverable session deletion.", complaint: "Confidence-based manual review for uncertain cases.", legal: "Context-only fallback when no language model is configured.", research: "Asks how reliable hallucination scores are.", analytics: "Clearer tool definitions and routing so questions reach the right tool." },
};
