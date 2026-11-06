"use client";

import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import SectionLabel from "./SectionLabel";

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col justify-between rounded-3xl glass p-7 sm:w-[420px]">
      <Quote className="h-6 w-6 text-fg/30" />
      <blockquote className="mt-4 text-lg leading-snug text-fg/85">“{t.quote}”</blockquote>
      <figcaption className="mt-6 border-t border-fg/10 pt-4">
        <div className="font-display text-sm font-semibold text-fg">{t.name}</div>
        <div className="text-sm text-fg/45">{t.role}</div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="testimonials" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel left="Testimonials" right="Kind Words" />
      </div>

      <div data-mc="draw" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max gap-5 pl-6">
          <div className="flex animate-marquee gap-5">
            {items.map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
