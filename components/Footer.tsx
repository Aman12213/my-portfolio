"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-fg/10 px-6 py-14">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[50%] bg-fg/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <a href="#home" className="font-display text-3xl font-bold text-shimmer">
          Aman Singh Bisht
        </a>
        <p className="max-w-md text-sm text-fg/50">
          Backend Engineer · AI Engineer · Integration Specialist. Building products that scale from India.
        </p>

        <div className="flex gap-3">
          {[
            { icon: Github, href: PROFILE.socials.github },
            { icon: Linkedin, href: PROFILE.socials.linkedin },
            { icon: Mail, href: PROFILE.socials.email },
          ].map(({ icon: Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full glass text-fg/70 transition-all hover:-translate-y-1 hover:text-fg"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <a
          href="#home"
          className="flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-fg/70 transition-transform hover:-translate-y-0.5 hover:text-fg"
        >
          <ArrowUp className="h-4 w-4" /> Back to top
        </a>

        <p className="mt-4 text-xs text-fg/40">
          © 2025 Aman Singh Bisht. Crafted with Next.js, GSAP & a lot of coffee.
        </p>
      </div>
    </footer>
  );
}
