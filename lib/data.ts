export const PROFILE = {
  name: "Aman Singh Bisht",
  title: "Backend Engineer · AI Engineer · Integration Specialist",
  roles: ["Backend Engineer", "AI Engineer", "Integration Specialist", "React Developer"],
  location: "India",
  experience: "2+ Years",
  email: "animegoku1010@gmail.com",
  bio: "I build scalable backend systems, complex API integrations, automation systems, and AI-powered products. I love turning hard engineering problems into products that scale.",
  socials: {
    github: "https://github.com/AmanFonix",
    linkedin: "https://www.linkedin.com/in/aman-singh-bisht-b2b179253/",
    email: "mailto:animegoku1010@gmail.com",
  },
};

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
      "Node.js", "Python", "FastAPI", "Express.js", "REST API", "Microservices",
      "WebSockets", "JWT / OAuth", "Redis", "Queues", "Cron Jobs",
      "Event-Driven Architecture",
    ],
  },
  {
    category: "AI & LLMs",
    icon: "Brain",
    skills: [
      "OpenAI", "Anthropic Claude", "Google Gemini", "LangChain", "LangGraph",
      "CrewAI", "RAG", "Embeddings", "Pinecone", "Qdrant", "AI Agents",
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
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma", "Mongoose"],
  },
];

export const EXPERIENCE = [
  {
    role: "Backend & AI Engineer",
    company: "Fonix Tech",
    period: "2023 — Present",
    description:
      "Design event-driven backends and production AI systems — building autonomous agents, RAG pipelines, and complex third-party integrations for high-traffic products.",
    achievements: [
      "Built an agentic AI platform orchestrating multi-step tool-calling workflows",
      "Cut API latency ~40% with queue-based event processing",
      "Shipped 15+ third-party integrations (payments, messaging, voice)",
    ],
  },
  {
    role: "Backend Developer",
    company: "Product Studio",
    period: "2022 — 2023",
    description:
      "Built scalable REST APIs, real-time WebSocket systems, and automation for SaaS products.",
    achievements: [
      "Built real-time notification & chat systems on WebSockets",
      "Implemented OAuth2 & JWT auth across a microservices fleet",
      "Delivered WhatsApp & Telegram automation bots at scale",
    ],
  },
];

export const PROJECTS = [
  {
    title: "AI Voice Assistant",
    tagline: "Real-time speech-to-speech agent",
    description:
      "Low-latency voice agent with streaming STT, LLM reasoning, tool-calling, and TTS. Sub-second turn-taking over WebSockets.",
    tech: ["Node.js", "OpenAI", "WebSockets", "STT/TTS", "Redis"],
  },
  {
    title: "AI Agent Platform",
    tagline: "Autonomous multi-agent orchestration",
    description:
      "A platform to build, run, and monitor autonomous agents with memory, function calling, and MCP-based tool integrations.",
    tech: ["LangGraph", "CrewAI", "FastAPI", "Qdrant", "MCP"],
  },
  {
    title: "RAG Search Engine",
    tagline: "Semantic search over knowledge bases",
    description:
      "Hybrid retrieval with embeddings + reranking, chunking strategies, and citation-grounded answers over private data.",
    tech: ["Embeddings", "Pinecone", "LangChain", "Postgres", "Next.js"],
  },
  {
    title: "WhatsApp Automation Platform",
    tagline: "Messaging automation at scale",
    description:
      "Event-driven WhatsApp automation with queues, templated flows, webhooks, and delivery tracking for thousands of conversations.",
    tech: ["Node.js", "WhatsApp API", "Redis", "Queues", "MongoDB"],
  },
  {
    title: "Home Service Marketplace",
    tagline: "Two-sided platform backend",
    description:
      "Booking, matching, payments, and real-time tracking for a services marketplace with a microservices backend.",
    tech: ["Node.js", "MongoDB", "Stripe", "WebSockets", "Docker"],
  },
  {
    title: "LLM Chat Platform",
    tagline: "Multi-model conversational app",
    description:
      "Streaming chat across OpenAI, Claude, and Gemini with memory, tools, and per-user rate limiting and analytics.",
    tech: ["Next.js", "Claude", "Gemini", "Redis", "Prisma"],
  },
];

export const TECH_MARQUEE = [
  "Node.js", "Python", "FastAPI", "Express.js", "REST API", "MongoDB",
  "PostgreSQL", "MySQL", "Redis", "Docker", "LangChain", "OpenAI",
  "Anthropic", "Pinecone", "Qdrant", "Next.js", "React", "Redux",
  "Tailwind CSS", "Bootstrap", "Shadcn UI", "JavaScript", "MCP", "WebSockets",
];
