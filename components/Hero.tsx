"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { gsap } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";

function useTyping(words: string[], speed = 80, pause = 1600) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi % words.length];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && text === word) delay = pause;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setWi((w) => w + 1);
      } else setText(word.slice(0, deleting ? text.length - 1 : text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wi, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTyping(PROFILE.roles);
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2, defaults: { ease: "power3.out" } });
      tl.from(".hero-anim", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        force3D: true,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="home" className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="hero-anim mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-fg/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-fg" />
          </span>
          Available for opportunities
        </div>

        <p className="hero-anim mb-4 flex items-center justify-center gap-2 font-display text-sm tracking-[0.2em] text-fg/60">
          <Sparkles className="h-4 w-4" /> {PROFILE.experience} · {PROFILE.location}
        </p>

        <h1 className="hero-anim font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          <span className="text-fg">Aman Singh</span>
          <br />
          <span className="text-shimmer">Bisht</span>
        </h1>

        <div className="hero-anim mt-6 flex h-9 items-center justify-center font-display text-xl text-fg/90 sm:text-2xl">
          <span>I&apos;m a&nbsp;</span>
          <span className="font-semibold text-fg">{typed}</span>
          <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-fg" />
        </div>

        <p className="hero-anim mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-fg/55 sm:text-lg">
          {PROFILE.bio}
        </p>

        <div className="hero-anim mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-fg px-7 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90 glow"
            >
              Hire Me
              <ArrowDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-full glass px-7 py-3 text-sm font-semibold text-fg transition-colors hover:bg-fg/10"
            >
              <Download className="h-4 w-4" /> View Work
            </a>
          </MagneticButton>
        </div>

        <div className="hero-anim mt-9 flex items-center justify-center gap-4">
          {[
            { icon: Github, href: PROFILE.socials.github, label: "GitHub" },
            { icon: Linkedin, href: PROFILE.socials.linkedin, label: "LinkedIn" },
            { icon: Mail, href: PROFILE.socials.email, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full glass text-fg/70 transition-all hover:-translate-y-1 hover:text-fg hover:glow"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="hero-anim absolute bottom-8 left-1/2 -translate-x-1/2 text-fg/50"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-fg/30 p-1.5">
          <div className="h-1.5 w-1 animate-bounce rounded-full bg-fg/60" />
        </div>
      </a>
    </section>
  );
}
