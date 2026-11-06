export const PROFILE = {
  name: "Aman Singh Bisht",
  title: "Backend Engineer · AI Engineer · Integration Specialist",
  roles: ["Backend Engineer", "AI Engineer", "Integration Specialist", "React Developer"],
  location: "India",
  experience: "2+ Years",
  email: "animegoku1010@gmail.com",
  resume: "/Aman-Singh-Bisht-Resume.pdf",
  bio: "I build scalable backend systems, complex API integrations, automation systems, and AI-powered products. I love turning hard engineering problems into products that scale.",
  socials: {
    github: "https://github.com/AmanFonix",
    linkedin: "https://www.linkedin.com/in/aman-singh-bisht-b2b179253/",
    email: "mailto:animegoku1010@gmail.com",
  },
};

// Hero headline split into lines. { t } = normal, { i } = italic serif accent word.
export const HERO_LINES: { t?: string; i?: string }[] = [
  { t: "Engineering backends" },
  { t: "that scale clean," },
  { t: "integrate anything," },
  { t: "and ", i: "think" },
];
export const HERO_LAST = " with AI.";

export const HERO_INTRO =
  "I'm Aman Singh Bisht, a Backend & AI Engineer at Fonix Technology, India. Over 2+ years I've shipped 25+ projects — scalable APIs, complex third-party integrations, and production AI systems with RAG, agents, and LLMs.";

export const ABOUT_PARAGRAPHS = [
  "I design and build scalable backend systems, complex API integrations, automation, and AI-powered products. I started as a backend intern at Fonix Technology and grew into a Senior AI Engineer — moving from Node.js and Laravel into Python, FastAPI, and LangChain.",
  "I care about the stuff users never see but always feel: clean architecture, reliable integrations, and systems that just work at scale. Lately I build RAG assistants, autonomous agents, and LLM services on top of solid backend foundations.",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// NOTE: replace these with real client/colleague quotes when you have them.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Aman turns vague requirements into clean, reliable backends fast. Our third-party integrations finally just worked.",
    name: "Project Manager",
    role: "Fonix Technology",
  },
  {
    quote:
      "He built our AI chatbot and RAG pipeline end-to-end. Sharp engineer who understands both the backend and the AI side.",
    name: "Team Lead",
    role: "Client Project",
  },
  {
    quote:
      "Strong system-design sense and great with APIs. Aman shipped features quickly without cutting corners on quality.",
    name: "Senior Developer",
    role: "Fonix Technology",
  },
  {
    quote:
      "From WhatsApp automation to multi-dashboard platforms, he delivered on time and made complex things look simple.",
    name: "Product Owner",
    role: "Healthcare Platform",
  },
];

export const STATS = [
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 25, suffix: "+", label: "Projects Shipped" },
  { value: 20, suffix: "+", label: "API Integrations" },
  { value: 10, suffix: "+", label: "AI Systems Built" },
];

export const SKILL_GROUPS = [
  {
    category: "Backend",
    icon: "Server",
    skills: [
      "Node.js", "Express.js", "PHP", "Laravel", "Python", "FastAPI", "REST API",
      "Microservices", "WebSockets", "Socket.io", "JWT / OAuth", "Nodemailer",
      "Redis", "Queues", "Event-Driven Architecture",
    ],
  },
  {
    category: "AI & LLMs",
    icon: "Brain",
    skills: [
      "OpenAI", "Anthropic Claude", "Google Gemini", "LangChain", "RAG",
      "Embeddings", "Vector Databases", "Pinecone", "Qdrant", "AI Agents",
      "Function Calling", "MCP", "Agentic Workflows",
    ],
  },
  {
    category: "Frontend",
    icon: "Sparkles",
    skills: [
      "HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap",
      "Shadcn UI", "Redux",
    ],
  },
  {
    category: "Database",
    icon: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "Redis", "Mongoose"],
  },
];

export const EXPERIENCE = [
  {
    role: "Backend Developer — Intern",
    company: "Fonix Technology",
    period: "Sep 2024 — Mar 2025",
    description:
      "Started as a backend intern, building REST APIs and web platforms with Node.js and Laravel while learning production engineering.",
    achievements: [
      "Built REST APIs with Node.js (Express) and Laravel",
      "Worked with MySQL & MongoDB for data modelling",
      "Shipped features into live production web platforms",
    ],
  },
  {
    role: "Backend Developer",
    company: "Fonix Technology",
    period: "Apr 2025 — Sep 2025",
    description:
      "Moved full-time into backend — owning third-party API integrations, chatbots, real-time systems, and automation for client products.",
    achievements: [
      "Integrated third-party APIs (WhatsApp, Meta Ads, payments)",
      "Built chatbots, webhooks, and automation flows",
      "Added JWT/OAuth auth and real-time chat with Socket.io",
    ],
  },
  {
    role: "Senior AI Engineer",
    company: "Fonix Technology",
    period: "Oct 2025 — Present",
    description:
      "Grew into AI engineering — designing production AI systems with Python, FastAPI, and LangChain: RAG assistants, embeddings, and autonomous agents.",
    achievements: [
      "Built RAG assistants over private business documents",
      "Developed AI agents & agentic workflows (OpenAI, Claude)",
      "Shipped LLM services with Python, FastAPI & vector databases",
    ],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  url: string;
  links?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    title: "The Storage Marketplace",
    tagline: "Self-storage marketplace + AI",
    description:
      "A self-storage marketplace with an AI chatbot that answers customer questions, plus AI that summarizes listing videos by category. Built on Node.js and MySQL with OpenAI powering the chat and video summarization.",
    tech: ["Node.js", "MySQL", "OpenAI", "AI Chatbot", "Video Summarization"],
    url: "https://thestoragemarketplace.com",
  },
  {
    title: "HPIT Inc — Corporate Site + AI Chatbot",
    tagline: "Company website & support AI",
    description:
      "A corporate website (Accenture-style) with an integrated AI chatbot that answers visitor questions about the company's services, powered by OpenAI and Claude.",
    tech: ["Node.js", "MySQL", "OpenAI", "Claude", "JWT"],
    url: "https://hpit-inc.com/",
  },
  {
    title: "DogPro AI Knowledge Assistant",
    tagline: "RAG chatbot over business docs",
    description:
      "A ChatGPT-style assistant where admins upload documents and users get instant, grounded answers about the business. Uses embeddings + RAG so the bot retrieves the right knowledge before replying.",
    tech: ["Node.js", "OpenAI", "Supabase", "Embeddings", "RAG"],
    url: "https://ask.dogprosolutions.co.uk/",
  },
  {
    title: "Agapecure — Healthcare Platform",
    tagline: "Multi-dashboard appointments system",
    description:
      "A healthcare platform to book doctors, diagnostics, and hospitals, with role-based dashboards for hospital, doctor, diagnostic, admin, and super-admin. Integrates WhatsApp for notifications and Meta Ads for campaigns.",
    tech: ["Node.js", "MySQL", "WhatsApp API", "Meta Ads API", "JWT"],
    url: "https://agapecure.in/",
  },
  {
    title: "MeMarathi Platform",
    tagline: "Community · Jobs · Matrimony",
    description:
      "A three-vertical platform — a social community with real-time chat, a jobs portal, and a matrimony site — built end-to-end on Laravel with MySQL. The community app uses Socket.io for live messaging.",
    tech: ["Laravel", "MySQL", "Socket.io", "PHP", "JWT"],
    url: "https://community.memarathi.com/",
    links: [
      { label: "Community", href: "https://community.memarathi.com/" },
      { label: "Jobs", href: "https://jobs.memarathi.com/" },
      { label: "Matrimony", href: "https://matrimony.memarathi.com/" },
    ],
  },
];

export const TECH_MARQUEE = [
  "Node.js", "Express.js", "PHP", "Laravel", "Python", "FastAPI", "MySQL",
  "MongoDB", "PostgreSQL", "Supabase", "Redis", "Socket.io", "OpenAI",
  "Anthropic", "LangChain", "Pinecone", "Qdrant", "React", "Next.js",
  "Redux", "Tailwind CSS", "Bootstrap", "Docker", "JWT",
];
