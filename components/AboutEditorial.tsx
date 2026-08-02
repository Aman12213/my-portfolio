"use client";

import { ABOUT_PARAGRAPHS, STATS } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import WordReveal from "./WordReveal";
import Counter from "./Counter";
import Reveal from "./Reveal";

export default function AboutEditorial() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionLabel left="About" right="Who I Am" />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <WordReveal
              key={i}
              text={p}
              delay={i * 0.05}
              className="mb-6 font-display text-2xl font-medium leading-snug tracking-tight text-fg/85 sm:text-3xl md:text-[2.1rem]"
            />
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="grid grid-cols-2 gap-8 border-t border-fg/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i}>
                <div>
                  <div className="font-display text-4xl font-semibold text-fg">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-fg/50">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
