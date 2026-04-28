export const SITE = {
  name: "BrainOn",
  tagline: "Software studios for compounding teams",
  description:
    "BrainOn builds production software for category-defining companies. We design systems, ship products, and scale teams.",
  url: "https://brainon.example.com",
  email: "hello@brainon.studio",
  social: {
    linkedin: "https://www.linkedin.com/company/brainon",
    github: "https://github.com/brainon",
    x: "https://x.com/brainon",
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

export const SERVICES = [
  {
    id: "01",
    title: "Product engineering",
    body: "Senior pods that take ownership of an outcome — discovery to deployment. TypeScript, Go, Python, the cloud you're already on.",
    capabilities: ["Web platforms", "API & data layers", "Realtime systems", "Migrations"],
  },
  {
    id: "02",
    title: "Design systems",
    body: "Tokenized, accessible, machine-translatable to code. Built so your team ships faster six months from now, not slower.",
    capabilities: ["Token architecture", "Component libraries", "Motion language", "Documentation sites"],
  },
  {
    id: "03",
    title: "AI integration",
    body: "Production LLM systems with evaluation harnesses, retrieval pipelines, and safety guardrails. Not demos. Not prototypes.",
    capabilities: ["Eval-driven dev", "RAG pipelines", "Agent workflows", "Cost & latency tuning"],
  },
  {
    id: "04",
    title: "Platform & DX",
    body: "Internal tools, build pipelines, and developer surfaces that make a 30-engineer team feel like 60.",
    capabilities: ["CI/CD pipelines", "Internal tooling", "Observability", "Docs as code"],
  },
];

export const WORK = [
  {
    slug: "northwind-trading",
    client: "Northwind",
    title: "Rebuilding the trading desk",
    sector: "Fintech",
    year: "2025",
    summary:
      "Replaced a fragmented Java desktop with a streaming web platform. 11× faster order routing, 60% fewer support tickets.",
    metric: { label: "Order routing", value: "11×" },
  },
  {
    slug: "lumen-health",
    client: "Lumen Health",
    title: "Patient pathways, redesigned",
    sector: "Healthcare",
    year: "2024",
    summary:
      "Re-imagined a 10-year-old EHR module as a guided-pathway interface. Average task time halved across 3,200 clinicians.",
    metric: { label: "Task time", value: "−52%" },
  },
  {
    slug: "atlas-logistics",
    client: "Atlas",
    title: "Routing 4M parcels a day",
    sector: "Logistics",
    year: "2025",
    summary:
      "A new dispatcher console with live route choreography. We rebuilt the simulator and the UI in a 14-week sprint.",
    metric: { label: "Daily parcels", value: "4M+" },
  },
  {
    slug: "cipher-security",
    client: "Cipher",
    title: "Zero-trust admin surface",
    sector: "Security",
    year: "2024",
    summary:
      "Designed and shipped the entire administrative experience for a privileged-access platform now used by 240 enterprises.",
    metric: { label: "Enterprise tenants", value: "240" },
  },
  {
    slug: "kindred-edu",
    client: "Kindred",
    title: "An AI tutor that ships",
    sector: "Education",
    year: "2025",
    summary:
      "Built the eval harness, retrieval layer, and student-facing UI for an AI tutoring product now serving 80k learners.",
    metric: { label: "Active learners", value: "80k" },
  },
];

export const STATS = [
  { value: "12yr", label: "Average engineer tenure" },
  { value: "47", label: "Production launches" },
  { value: "9", label: "Industries served" },
  { value: "100%", label: "Senior staffed" },
];

export const PRINCIPLES = [
  {
    n: "01",
    h: "Senior by default",
    b: "No junior fronts. The engineers who scope the work are the engineers who ship it.",
  },
  {
    n: "02",
    h: "Outcome over output",
    b: "We measure ourselves on what your business changes, not what we shipped this sprint.",
  },
  {
    n: "03",
    h: "Documented as we go",
    b: "Every system we build leaves a paper trail your team can pick up the day after we leave.",
  },
  {
    n: "04",
    h: "Boring where it counts",
    b: "We pick adventurous design and unfussy infrastructure. Operate cheaply, ship loudly.",
  },
];
