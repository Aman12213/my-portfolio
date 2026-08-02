import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aman Singh Bisht — Backend & AI Engineer",
  description:
    "Backend Engineer, AI Engineer & Integration Specialist with 2+ years building scalable backend systems, API integrations, and AI-powered products.",
  keywords: [
    "Aman Singh Bisht",
    "Backend Engineer",
    "AI Engineer",
    "Integration Specialist",
    "React Developer",
    "Node.js",
    "LangChain",
    "AI Agents",
    "Portfolio",
  ],
  authors: [{ name: "Aman Singh Bisht" }],
  openGraph: {
    title: "Aman Singh Bisht — Backend & AI Engineer",
    description:
      "Building scalable backend systems, cloud-native applications, and AI-powered products.",
    type: "website",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} ${serif.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
