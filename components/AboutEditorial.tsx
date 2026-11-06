"use client";

import { ABOUT_PARAGRAPHS, STATS } from "@/lib/data";
import SectionLabel from "./SectionLabel";
import Counter from "./Counter";

export default function AboutEditorial() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionLabel left="About" right="Who I Am" />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p
              key={i}
              data-mc="type"
              className="mb-6 font-display text-2xl font-medium leading-snug tracking-tight text-fg/85 sm:text-3xl md:text-[2.1rem]"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="lg:col-span-4">
          {/* The frame is drawn first, then the stats are filled in. */}
          <div
            data-mc="draw"
            className="grid grid-cols-2 gap-8 border-t border-fg/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div data-mc="pop" className="font-display text-4xl font-semibold text-fg">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div data-mc="type" className="mt-1 text-sm text-fg/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
