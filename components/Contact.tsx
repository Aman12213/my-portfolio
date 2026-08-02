"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { PROFILE } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="CONTACT"
        title="Let's build something"
        subtitle="Have a project, a role, or an idea? My inbox is always open."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="flex h-full flex-col justify-between gap-8 rounded-3xl glass-strong p-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-fg">Get in touch</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg/55">
                Available for full-time roles, freelance projects, and technical collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={PROFILE.socials.email}
                className="flex items-center gap-3 text-fg/80 transition-colors hover:text-fg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fg/10 text-fg">
                  <Mail className="h-4 w-4" />
                </span>
                {PROFILE.email}
              </a>
              <div className="flex items-center gap-3 text-fg/80">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fg/10 text-fg">
                  <MapPin className="h-4 w-4" />
                </span>
                {PROFILE.location}
              </div>
            </div>

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
          </div>
        </Reveal>

        <Reveal delay={1} className="lg:col-span-3">
          <form onSubmit={onSubmit} className="rounded-3xl glass p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" placeholder="What's this about?" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm text-fg/70">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-2xl border border-fg/10 bg-fg/[0.03] px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg/30 focus:border-fg/50"
              />
            </div>

            <MagneticButton>
              <button
                type="submit"
                className="mt-6 flex items-center gap-2 rounded-full bg-fg px-7 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90 glow"
              >
                {sent ? "Message sent ✦" : "Send message"}
                <Send className="h-4 w-4" />
              </button>
            </MagneticButton>
            {sent && (
              <p className="mt-3 text-sm text-fg/70">Thanks! I&apos;ll get back to you soon.</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-fg/70">{label}</label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-fg/10 bg-fg/[0.03] px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg/30 focus:border-fg/50"
      />
    </div>
  );
}
