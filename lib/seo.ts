import { PROFILE, PROJECTS, SKILL_GROUPS, EXPERIENCE } from "./data";

/**
 * Public URL of the site, used for canonical links, the sitemap and social cards.
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://amansinghbisht.com) once you have a domain.
 * On Vercel it falls back to the project's production domain automatically.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Aman Singh Bisht";
export const COMPANY = "Fonix Technology";

export const SEO_TITLE = "Aman Singh Bisht — Backend Developer & AI Engineer | Fonix Technology";
export const SEO_DESCRIPTION =
  "Aman Singh Bisht is a Backend Developer and Senior AI Engineer at Fonix Technology, India. " +
  "2+ years building scalable Node.js, Laravel, Python & FastAPI backends, third-party API integrations, " +
  "RAG chatbots, LLM services and AI agents. 25+ shipped projects. Portfolio, projects & resume.";

const projectNames = PROJECTS.map((p) => p.title.split(" — ")[0]);
const skills = SKILL_GROUPS.flatMap((g) => g.skills);

export const KEYWORDS = Array.from(
  new Set([
    // Name and the ways people type it
    "Aman Singh Bisht",
    "Aman Bisht",
    "Aman Singh",
    "Aman Singh Bisht portfolio",
    "Aman Singh Bisht developer",
    "Aman Singh Bisht Fonix Technology",
    "AmanFonix",
    // Company
    "Fonix Technology",
    "Fonix Technology developer",
    "Fonix Technology backend developer",
    "Fonix Technology AI engineer",
    // Roles
    "Backend Developer",
    "Backend Engineer",
    "Backend Developer India",
    "Backend Developer portfolio",
    "AI Engineer",
    "AI Developer",
    "AI Developer portfolio",
    "AI Engineer India",
    "Senior AI Engineer",
    "LLM Engineer",
    "Generative AI developer",
    "Full Stack Developer",
    "Node.js Developer",
    "Laravel Developer",
    "Python FastAPI Developer",
    "API Integration Specialist",
    "Chatbot Developer",
    "RAG Developer",
    "AI Agent Developer",
    "Freelance Backend Developer",
    "Hire Backend Developer India",
    "Software Engineer portfolio",
    // Projects
    ...projectNames,
    "AI chatbot development",
    "RAG chatbot",
    "WhatsApp API integration",
    "Meta Ads API integration",
    // Tech
    ...skills,
  ])
);

/** Structured data so Google understands who you are, where you work and what you built. */
export function jsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PROFILE.name,
    alternateName: ["Aman Bisht", "Aman Singh"],
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    email: `mailto:${PROFILE.email}`,
    jobTitle: "Senior AI Engineer & Backend Developer",
    description: SEO_DESCRIPTION,
    nationality: { "@type": "Country", name: "India" },
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    worksFor: { "@id": `${SITE_URL}/#fonix` },
    hasOccupation: EXPERIENCE.map((e) => ({
      "@type": "Occupation",
      name: e.role,
      description: e.description,
    })),
    knowsAbout: skills,
    sameAs: [PROFILE.socials.github, PROFILE.socials.linkedin],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#fonix`,
        name: COMPANY,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} — Portfolio`,
        description: SEO_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SEO_TITLE,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        about: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects`,
        name: "Projects by Aman Singh Bisht",
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.title,
            description: p.description,
            url: p.url,
            applicationCategory: "WebApplication",
            keywords: p.tech.join(", "),
            creator: { "@id": `${SITE_URL}/#person` },
          },
        })),
      },
    ],
  };
}
