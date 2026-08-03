"use client";

import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "@/lib/data";
import MaskLines from "./MaskLines";
import MagneticButton from "./MagneticButton";

export default function ContactFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-fg/10 px-6 pb-12 pt-28">
      <div className="pointer-events-none absolute -bottom-48 left-1/2 h-96 w-[130%] -translate-x-1/2 rounded-[50%] bg-fg/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-6 font-display text-xs uppercase tracking-[0.25em] text-fg/50">
          <span className="text-fg/40">©</span> Contact | Let&apos;s Build
        </p>

        <MaskLines className="font-display text-[13vw] font-semibold leading-[0.95] tracking-tight text-fg sm:text-7xl md:text-8xl">
          {[
            <span key="1">Let&apos;s work</span>,
            <span key="2">
              together<span className="serif-italic"> →</span>
            </span>,
          ]}
        </MaskLines>

        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="max-w-md text-fg/55">
              Have a project, a role, or an idea? I&apos;m open to full-time roles, freelance work, and
              collaborations.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <a
                  href={PROFILE.socials.email}
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
                >
                  {PROFILE.email} <ArrowUpRight className="h-4 w-4" />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={PROFILE.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-6 py-3 text-sm font-medium text-fg/80 transition-colors hover:border-fg/60 hover:text-fg"
                >
                  Download Resume <Download className="h-4 w-4" />
                </a>
              </MagneticButton>
            </div>
          </div>

          <div className="flex gap-3">
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-fg/15 text-fg/70 transition-all hover:-translate-y-1 hover:border-fg hover:text-fg"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-fg/10 pt-6 text-sm text-fg/40 sm:flex-row">
          <span>© 2026 Aman Singh Bisht</span>
          <a href="#home" className="link-underline hover:text-fg">
            Back to top ↑
          </a>
          <span>Backend · AI · Integrations</span>
        </div>
      </div>
    </footer>
  );
}
