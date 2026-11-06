"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { PROFILE } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function EditorialNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-fg/10 bg-bg/70 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          data-mc="type"
          href="#home"
          className="font-display text-sm font-semibold tracking-tight text-fg"
        >
          Aman Singh Bisht<span className="text-fg/40">©</span>
        </a>

        <nav data-mc="type" className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline font-display text-sm text-fg/70 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            data-mc="pop"
            href={PROFILE.resume}
            download
            className="hidden items-center gap-1.5 rounded-full border border-fg/20 px-4 py-1.5 text-sm text-fg/80 transition-colors hover:border-fg/60 hover:text-fg sm:flex"
          >
            Resume <Download className="h-3.5 w-3.5" />
          </a>
          <span data-mc="pop" className="inline-flex">
            <ThemeToggle />
          </span>
        </div>
      </div>
    </header>
  );
}
