"use client";

import { STATS, PROFILE } from "@/lib/data";
import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FOCUS = [
  "Backend Engineering", "Artificial Intelligence", "LLMs & Agents", "AI Agents",
  "Automation", "API Integrations", "Distributed Systems", "System Design",
  "Performance Optimization",
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="ABOUT ME" title="Engineering that scales" />

      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="gradient-border h-full rounded-3xl glass-strong p-8">
            <p className="text-lg leading-relaxed text-fg/80">
              I&apos;m a <span className="text-fg">Backend Engineer</span> with{" "}
              <span className="font-semibold text-fg">{PROFILE.experience}</span> of experience building
              scalable backend systems, cloud-native applications, integrations, automation systems,
              and AI-powered products.
            </p>
            <p className="mt-5 leading-relaxed text-fg/55">
              My expertise spans designing distributed architectures, integrating complex third-party
              APIs, building event-driven systems, developing AI applications, creating autonomous
              agents, and shipping scalable production systems. I love solving complex
              engineering problems and building products that scale.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-fg/10 bg-fg/5 px-3 py-1.5 text-xs text-fg/70 transition-colors hover:border-fg/40 hover:text-fg"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i}>
              <div className="flex h-full flex-col justify-center rounded-3xl glass p-6 transition-all hover:-translate-y-1 hover:glow">
                <div className="font-display text-4xl font-bold text-fg sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-fg/55">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
