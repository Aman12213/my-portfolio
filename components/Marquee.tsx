"use client";

import { TECH_MARQUEE } from "@/lib/data";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...TECH_MARQUEE, ...TECH_MARQUEE];
  return (
    <div className="flex w-max">
      <div
        className={`flex shrink-0 gap-4 pr-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((t, i) => (
          <div
            key={`${t}-${i}`}
            className="group flex items-center gap-2 whitespace-nowrap rounded-2xl glass px-6 py-3.5 transition-colors hover:border-fg/40"
          >
            <span className="h-2 w-2 rounded-full bg-fg transition-transform group-hover:scale-150" />
            <span className="font-display text-sm font-medium text-fg/80 group-hover:text-fg">
              {t}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="mb-10 text-center">
        <p data-mc="type" className="font-display text-xs tracking-[0.3em] text-fg/60">
          TECH STACK
        </p>
        <h2 data-mc="type" className="mt-3 font-display text-2xl font-semibold text-fg/90">
          Tools that power the systems
        </h2>
      </div>

      {/* Each row is dragged open by a cursor, then starts moving. The edge
          fades live inside the rows so they appear together with them. */}
      <div className="flex flex-col gap-4">
        {[false, true].map((reverse) => (
          <div key={String(reverse)} data-mc="draw" className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
            <Row reverse={reverse} />
          </div>
        ))}
      </div>
    </section>
  );
}
