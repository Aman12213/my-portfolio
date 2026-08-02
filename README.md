# Aman Singh Bisht — Portfolio ◐

A premium **black & white** developer portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **GSAP**. Fully monochrome, buttery smooth, with light + dark mode.

## ✨ Features

- **Pure monochrome design** — bright white on black (dark) / black on white (light)
- **Light & dark mode** toggle with no-flash theme persistence (localStorage + system preference)
- **GSAP-powered animations** everywhere:
  - ScrollTrigger reveal animations on every section
  - Scroll progress bar, scrub-drawn timeline
  - Hero entrance timeline, animated counters
  - `quickTo` magnetic buttons, cursor follower, 3D tilt project cards
- **Animated starfield background** (theme-aware canvas) with parallax + shooting stars
- **Moving cards** — infinite dual-row tech marquee
- Preloader / splash, glass navbar, typing hero
- Respects `prefers-reduced-motion` · SEO + Open Graph metadata

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## 🗂 Structure

```
app/            # App Router: layout (theme no-flash script), page, global styles
components/     # UI sections + GSAP animation primitives
lib/data.ts    # All content (edit this to update the site)
lib/gsap.ts    # GSAP + ScrollTrigger registration
```

Customize content in `lib/data.ts`. Theme tokens live as CSS variables in `app/globals.css`.

## 🎨 Tech

Next.js · React 18 · TypeScript · Tailwind CSS · **GSAP + ScrollTrigger** · lucide-react
