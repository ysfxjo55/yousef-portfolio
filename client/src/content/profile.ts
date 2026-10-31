/**
 * VERIFIED CONTENT: profile, roles, dates, education.
 * Source of truth: Yousef_Ammar_Resume_Updated.pdf (CV). Edit here when the CV changes.
 * Do not add facts that are not in the CV or a public repo.
 */

export const PROFILE = {
  name: "Yousef Ammar Abdullah",
  shortName: "Yousef Ammar",
  headline: "AI and ML Engineering · Arabic NLP",
  location: "Makkah, Saudi Arabia",
  email: "yousefammarabdullah.a@gmail.com",
  github: "https://github.com/ysfxjo55",
  githubLabel: "github.com/ysfxjo55",
  site: "https://ysfxjo.com/",
  cv: "/Yousef_Ammar_Resume.pdf",
  cvFileName: "Yousef_Ammar_Resume.pdf",
  // The CV phone number is deliberately not published on the site.
} as const;

export const HERO = {
  lead: "I build Arabic NLP systems: retrieval over legal documents, OCR for structured fields, classification APIs and tool-using assistants. I'm a Data Science student at Umm Al-Qura University, graduating in 2027.",
  second:
    "Co-author of an ArabicNLP 2026 shared-task paper on Arabic hallucination detection. Learning toward model evaluation and explainability.",
};

export interface Role {
  role: string;
  org: string;
  meta: string;
  notes: string[];
}

export const EXPERIENCE: Role[] = [
  { role: "AI Developer", org: "Qatfah", meta: "Remote · 2026 – Present", notes: [] },
  {
    role: "AI Engineer, Part-time",
    org: "Moasherat",
    meta: "Makkah · 2026 – Present",
    notes: [
      "Developed an Arabic analytics chatbot connecting FastMCP, Cube, Directus, and LibreChat to operational data; improved tool definitions and routing.",
      "Built a PaddleOCR and FastAPI pipeline to extract structured fields from Arabic Umrah permit images.",
    ],
  },
  {
    role: "Data Scientist Intern",
    org: "Qanoniah",
    meta: "Makkah · Feb – Aug 2026",
    notes: [
      "Built Arabic legal retrieval workflows with structured document parsing, hybrid search, cross-encoder reranking, and Hit@K/MRR evaluation.",
      "Developed Arabic OCR processing with text normalization and word/character error-rate evaluation; built a cached FastAPI leaderboard service.",
    ],
  },
  {
    role: "AI Engineer Intern",
    org: "Rakaya",
    meta: "2026 – Aug 2026",
    notes: [
      "Enhanced a Laravel Arabic copilot with multi-round tool calling, retry handling, query caching, and clearer tool descriptions.",
    ],
  },
  {
    role: "Data Analyst, Hajj Season",
    org: "Moasherat",
    meta: "Makkah · May – Jun 2025",
    notes: ["Monitored operational KPIs and analyzed satisfaction-survey data for Hajj reporting."],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Data Science · Umm Al-Qura University, Makkah",
  period: "2023 – 2027 (expected)",
  gpa: "GPA 3.92 / 4.00",
};

export const SKILLS = {
  technical:
    "Python, SQL, JavaScript, PHP/Laravel · PyTorch, Hugging Face Transformers, scikit-learn · FastAPI, FastMCP, Docker, Git · Qdrant, ChromaDB, BM25, reranking · PaddleOCR, SHAP, PyMC",
  languages: "Arabic (native) · English (professional working proficiency)",
};

export const ABOUT_PARAGRAPHS = [
  "I'm a Data Science student at Umm Al-Qura University in Makkah, graduating in 2027. My work so far has been in Arabic NLP systems: retrieval over legal documents, OCR that extracts structured fields, analytics assistants that call tools over operational data, and classification APIs.",
  "I co-authored an ArabicNLP 2026 shared-task paper on Arabic hallucination detection. I'm interested in model evaluation, explainability, reliable AI systems and how neural networks work inside, and I'm studying these alongside my engineering work.",
  "I also built Agents World, a local interface for managing and continuing AI coding sessions.",
];

export const PUBLICATION = {
  title:
    "NAMAA Community at HalluScoring 2026: Beyond Predictive Performance: Reliability and Generalization in Arabic Hallucination Detection",
  venue: "ArabicNLP 2026 Shared Tasks, pp. 1138–1145",
  stats: [
    { value: "3rd of 7", label: "team result" },
    { value: "0.7596", label: "hidden-test ROC-AUC" },
  ],
  href: "https://aclanthology.org/2026.arabicnlp-sharedtasks.141/",
  question:
    "The HalluScoring 2026 shared task asks systems to score Arabic model outputs for hallucinated content. As its title says, the paper looks beyond predictive performance, at how reliable the scores are and how well they generalise.",
  role: "I contributed as one of the paper's co-authors on the NAMAA Community team.",
};

export const INTERESTS = [
  { t: "Model evaluation", d: "What a single score hides, and how results hold up on data a model has not seen. The shared-task paper is where I have worked on this directly." },
  { t: "Explainability", d: "I used SHAP in the cardiology project and am learning where such explanations help and where they mislead." },
  { t: "Reliable AI systems", d: "Fallbacks, confidence thresholds, retries and clear tool definitions, as in my RAG, classification and copilot work." },
  { t: "Understanding neural networks", d: "How networks represent what they learn. I am reading into this area; I have not published in it." },
];
