"use client";

/**
 * The "crew": five animated cursors that build the page live.
 *
 * Every element marked with `data-mc` is a job. A free cursor picks the next
 * visible job, glides to it, and reveals it:
 *   data-mc="type"  text typed character by character, the cursor riding the caret
 *   data-mc="draw"  a selection box is dragged open and the block is revealed inside it
 *   data-mc="line"  a divider is dragged out from left to right
 *   data-mc="pop"   a click, and the element springs into place
 *
 * Optional attributes:
 *   data-mc-final     marks the last section; once it's built the crew takes a bow and leaves
 *   data-mc-fx="bloom" (pop) a slow fade instead of a spring, for soft glows
 *   data-mc-at="x,y"  (pop) where to click, as fractions of the element's box
 *
 * Cursor positions live in page coordinates inside an absolutely positioned
 * stage, so they scroll with the content natively. Idle cursors are pulled
 * back toward the viewport, which makes them trail the page and catch up.
 */

import { gsap } from "@/lib/gsap";
import { splitForTyping, type Split } from "./split";

type Pt = { x: number; y: number };
type Ease = (t: number) => number;
type JobState = "pending" | "claimed" | "active" | "done";
/** Where the cursor tip should be this frame. `follow` > 0 smooths toward it. */
type Step = { x: number; y: number; follow: number } | null;

/* ------------------------------------------------------------------ tuning */

const NAMES = ["Design", "Code", "Copy", "Motion", "Layout"];

// Each cursor enters from its own edge and settles at its own resting spot
// (viewport fractions). `speed` and `curve` give each one its own hand.
const CAST = [
  { from: [-0.1, 0.42], home: [0.14, 0.34], speed: 1.06, curve: 0.16 },
  { from: [0.58, -0.14], home: [0.45, 0.22], speed: 0.95, curve: -0.12 },
  { from: [1.1, 0.16], home: [0.84, 0.3], speed: 1.12, curve: 0.14 },
  { from: [0.08, 1.14], home: [0.28, 0.64], speed: 0.98, curve: -0.18 },
  { from: [1.08, 1.08], home: [0.7, 0.58], speed: 1.02, curve: 0.1 },
] as const;

const ENTER_DELAY = 0.35; // seconds of empty screen before the crew flies in

const ARROW =
  '<svg class="mc-arrow" width="22" height="24" viewBox="0 0 22 24" aria-hidden="true">' +
  '<path d="M1.5 1.5v18.2l4.9-4.5 3.2 7.3 3.1-1.4-3.2-7.1h6.9z"/></svg>';

/* ------------------------------------------------------------------ helpers */

// Shared per-frame state (only one crew runs at a time).
const F = { now: 0, dt: 0, sx: 0, sy: 0, vw: 0, vh: 0, speed: 1, work: 1 };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
/** Frame-rate independent smoothing factor. */
const damp = (k: number) => 1 - Math.exp(-k * F.dt);
/** Minimum-jerk profile — the velocity shape of a human reaching movement. */
const minJerk: Ease = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const outCubic: Ease = (t) => 1 - Math.pow(1 - t, 3);

/** Tip position for a caret at viewport (x, top) with height h → page coords. */
const caretTip = (x: number, top: number, h: number): Pt => ({
  x: x + F.sx + 3,
  y: top + F.sy + h * 0.92,
});

/* --------------------------------------------------------------------- jobs */

abstract class Job {
  state: JobState = "pending";
  visible = false;
  parent: Job | null = null;
  final = false;

  constructor(readonly el: HTMLElement, protected crew: Crew) {}

  prepare() {}
  /** Page-coordinate point the cursor travels to before starting. */
  abstract anchor(): Pt;
  abstract begin(c: Cursor): void;
  /** Advances the reveal; returns null when finished. */
  abstract update(c: Cursor): Step;
  /** Leaves the element fully revealed. `instant` = no one is watching. */
  abstract complete(instant: boolean): void;
  /** Puts the element back exactly as it was (used on unmount). */
  abstract reset(): void;

  get ready() {
    return (
      this.state === "pending" && this.visible && (!this.parent || this.parent.state === "done")
    );
  }
  get renderable() {
    return this.el.getClientRects().length > 0;
  }
}

class TypeJob extends Job {
  private split: Split | null = null;
  private times: number[] = [];
  private total = 0;
  private t = 0;
  private n = 0;

  prepare() {
    this.split = splitForTyping(this.el);
    // The container is visible from now on; its characters are not.
    this.el.classList.add("mc-armed");
  }

  private get tokens() {
    return this.split?.tokens ?? [];
  }

  anchor() {
    const r = (this.tokens[0] ?? this.el).getBoundingClientRect();
    return caretTip(r.left, r.top, r.height);
  }

  begin() {
    const toks = this.tokens;
    const fs = parseFloat(getComputedStyle(toks[0] ?? this.el).fontSize) || 16;
    // Big display type is typed a touch slower; long copy is capped so nobody waits.
    const per = clamp(0.012 + fs * 0.00034, 0.016, 0.05);
    let acc = 0;
    const marks: number[] = [];
    for (const tk of toks) {
      marks.push(acc);
      let gap = rand(0.6, 1.4); // uneven rhythm reads as a person typing
      if (/[.,;:!?—–]/.test(tk.textContent ?? "")) gap += 1.8;
      if (tk.nextSibling?.nodeType === Node.TEXT_NODE) gap += 0.5; // end of a word
      acc += gap;
    }
    this.total = clamp(acc * per, 0.3, 1.7);
    const k = this.total / (acc || 1);
    this.times = marks.map((m) => m * k);
    this.t = 0;
    this.n = 0;
    const perChar = this.total / Math.max(1, toks.length) / F.work;
    this.el.style.setProperty("--mc-fade", `${clamp(perChar * 3, 0.04, 0.18).toFixed(3)}s`);
  }

  update(c: Cursor): Step {
    const toks = this.tokens;
    if (!toks.length) return null;
    this.t += F.dt * F.work;
    while (this.n < toks.length && this.times[this.n] <= this.t) toks[this.n++].classList.add("on");

    const r = toks[Math.max(0, this.n - 1)].getBoundingClientRect();
    const x = this.n ? r.right : r.left;
    c.setCaret(x + F.sx, r.top + F.sy, r.height);

    if (this.n >= toks.length && this.t >= this.total) return null;
    const tip = caretTip(x, r.top, r.height);
    return { x: tip.x, y: tip.y, follow: 34 };
  }

  complete(instant: boolean) {
    const s = this.split;
    if (!s) return;
    this.split = null;
    s.tokens.forEach((t) => t.classList.add("on"));
    // Put React's original text nodes back once the last fade has settled.
    const restore = () => {
      s.restore();
      this.el.style.removeProperty("--mc-fade");
    };
    if (instant) restore();
    else this.crew.defer(restore, 320);
  }

  reset() {
    this.split?.restore();
    this.split = null;
    this.el.style.removeProperty("--mc-fade");
    this.el.classList.remove("mc-armed", "mc-done");
  }
}

/** Drags a selection box ("box") or a divider ("line") open from the top-left. */
class DragJob extends Job {
  private t = 0;
  private dur = 0.6;
  private hold = 0;
  private prevTransition = "";

  constructor(el: HTMLElement, crew: Crew, private shape: "box" | "line") {
    super(el, crew);
  }

  anchor() {
    const r = this.el.getBoundingClientRect();
    const x = clamp(r.left, 10, F.vw - 10);
    const y = this.shape === "line" ? r.top + r.height / 2 : clamp(r.top, 10, F.vh - 10);
    return { x: x + F.sx, y: y + F.sy };
  }

  begin(c: Cursor) {
    const r = this.el.getBoundingClientRect();
    this.dur =
      this.shape === "line"
        ? clamp(0.32 + r.width / 2300, 0.38, 0.85)
        : clamp(0.4 + Math.hypot(r.width, r.height) / 2600, 0.5, 1.05);
    this.t = 0;
    this.hold = 0;
    this.prevTransition = this.el.style.transition;
    this.el.style.transition = "none"; // don't let utility transitions smear the clip
    this.el.style.clipPath = this.shape === "line" ? "inset(0 100% 0 0)" : "inset(0 100% 100% 0)";
    this.el.classList.add("mc-armed");
    c.click();
  }

  update(c: Cursor): Step {
    this.t += (F.dt * F.work) / this.dur;
    const e = minJerk(clamp(this.t, 0, 1));
    const r = this.el.getBoundingClientRect();
    const w = Math.max(1, r.width);
    const h = Math.max(1, r.height);

    // Keep the drag on screen even for full-bleed blocks.
    const x0 = clamp(r.left, 10, F.vw - 10);
    const x1 = Math.max(x0 + 2, Math.min(r.right, F.vw - 12));
    const x = lerp(x0, x1, e);
    const insetR = clamp((r.right - x) / w, 0, 1) * 100;

    let y: number;
    if (this.shape === "line") {
      y = r.top + r.height / 2;
      this.el.style.clipPath = `inset(0 ${insetR.toFixed(2)}% 0 0)`;
    } else {
      const y0 = clamp(r.top, 10, F.vh - 10);
      const y1 = Math.max(y0 + 2, Math.min(r.bottom, F.vh - 12));
      // Height opens a little ahead of width, so the drag arcs like a real hand.
      y = lerp(y0, y1, minJerk(clamp(this.t * 1.4, 0, 1)));
      const insetB = clamp((r.bottom - y) / h, 0, 1) * 100;
      this.el.style.clipPath = `inset(0 ${insetR.toFixed(2)}% ${insetB.toFixed(2)}% 0)`;
      c.setBox(r.left + F.sx, r.top + F.sy, x - r.left, y - r.top);
    }

    if (this.t >= 1 && (this.hold += F.dt) > 0.1) return null;
    return { x: x + F.sx, y: y + F.sy, follow: 0 };
  }

  complete() {
    this.el.style.clipPath = "";
    this.el.style.transition = this.prevTransition;
    this.el.classList.add("mc-armed");
  }

  reset() {
    this.el.style.clipPath = "";
    this.el.style.transition = this.prevTransition;
    this.el.classList.remove("mc-armed", "mc-done");
  }
}

/** A click, and the element springs (or blooms) into place. */
class PopJob extends Job {
  private hold = 0;
  private tween: gsap.core.Tween | null = null;
  private prevTransition = "";
  private at: [number, number] = [0.5, 0.5];

  prepare() {
    const a = (this.el.dataset.mcAt ?? "").split(",").map(Number);
    if (a.length === 2 && a.every(Number.isFinite)) this.at = [a[0], a[1]];
  }

  anchor() {
    const r = this.el.getBoundingClientRect();
    return {
      x: clamp(r.left + r.width * this.at[0], 10, F.vw - 10) + F.sx,
      y: clamp(r.top + r.height * this.at[1], 10, F.vh - 10) + F.sy,
    };
  }

  begin(c: Cursor) {
    const el = this.el;
    this.hold = 0;
    c.click();
    this.crew.ripple(c.x, c.y);

    this.prevTransition = el.style.transition;
    el.style.transition = "none";
    el.classList.add("mc-armed");
    const done = () => {
      gsap.set(el, { clearProps: "opacity,transform" });
      el.style.transition = this.prevTransition;
      this.tween = null;
    };
    this.tween =
      el.dataset.mcFx === "bloom"
        ? gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out", onComplete: done })
        : gsap.fromTo(
            el,
            { opacity: 0, scale: 0.5, y: 12 },
            { opacity: 1, scale: 1, y: 0, duration: 0.62, ease: "back.out(2.2)", onComplete: done }
          );
    el.dispatchEvent(new CustomEvent("mc:reveal", { detail: { instant: false } }));
  }

  update(c: Cursor): Step {
    this.hold += F.dt * F.work;
    if (this.hold > 0.3) return null;
    return { x: c.x, y: c.y, follow: 0 };
  }

  complete(instant: boolean) {
    if (!instant) return; // the spring finishes on its own
    this.el.classList.add("mc-armed");
    this.el.dispatchEvent(new CustomEvent("mc:reveal", { detail: { instant: true } }));
  }

  reset() {
    this.tween?.kill();
    this.tween = null;
    gsap.set(this.el, { clearProps: "opacity,transform" });
    this.el.style.transition = this.prevTransition;
    this.el.classList.remove("mc-armed", "mc-done");
  }
}

/* ------------------------------------------------------------------ cursors */

type Travel = {
  fx: number;
  fy: number;
  to: () => Pt;
  t: number;
  dur: number;
  curve: number;
  ease: Ease;
  scaled: boolean;
  done: () => void;
};

class Cursor {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  job: Job | null = null;
  mode: "off" | "travel" | "work" | "idle" | "hold" = "off";
  nextThink = Infinity;
  holdAt: (() => Pt) | null = null;

  readonly el: HTMLDivElement;
  readonly body: HTMLDivElement;
  readonly tag: HTMLSpanElement;
  private tagWrap: HTMLDivElement;
  private caretEl: HTMLDivElement;
  private boxEl: HTMLDivElement;
  private dimEl: HTMLSpanElement;

  private tr: Travel | null = null;
  private idleSince = 0;
  private wander = [rand(0.35, 0.6), rand(0.7, 1.1), rand(0, 6.28), rand(0, 6.28)];
  private tox = 0;
  private toy = 0;
  private flip = 0;
  private tagW = 56;
  private caretOn = false;
  private cx = 0;
  private cy = 0;
  private ch = 0;
  private boxOn = false;
  private bx = 0;
  private by = 0;
  private bw = 0;
  private bh = 0;
  private dimText = "";

  constructor(
    readonly i: number,
    readonly cast: (typeof CAST)[number],
    private crew: Crew,
    crewLayer: HTMLElement,
    fxLayer: HTMLElement
  ) {
    this.caretEl = document.createElement("div");
    this.caretEl.className = "mc-caret";
    this.boxEl = document.createElement("div");
    this.boxEl.className = "mc-box";
    this.boxEl.innerHTML = '<i></i><i></i><i></i><i></i><span class="mc-dim"></span>';
    this.dimEl = this.boxEl.querySelector(".mc-dim") as HTMLSpanElement;
    fxLayer.append(this.boxEl, this.caretEl);

    this.el = document.createElement("div");
    this.el.className = "mc-cursor";
    this.el.innerHTML =
      `<div class="mc-body"><div class="mc-inner">${ARROW}` +
      `<div class="mc-tagwrap"><span class="mc-tag">${NAMES[i]}</span></div></div></div>`;
    this.body = this.el.querySelector(".mc-body") as HTMLDivElement;
    this.tagWrap = this.el.querySelector(".mc-tagwrap") as HTMLDivElement;
    this.tag = this.el.querySelector(".mc-tag") as HTMLSpanElement;
    crewLayer.appendChild(this.el);
  }

  show() {
    this.el.classList.add("on");
  }

  /** Cache the name tag's width (fonts are loaded by the time work starts). */
  measure() {
    this.tagW = this.tag.offsetWidth || this.tagW;
  }

  /** Viewport-anchored resting spot, with a slow hand-drift. */
  home(): Pt {
    const [f1, f2, p1, p2] = this.wander;
    const t = F.now;
    const amp = clamp(F.vw * 0.025, 10, 30);
    // Lean toward where the page is heading: lower when scrolling down, higher going up.
    const lean = clamp(this.crew.scrollVel / 5200, -0.12, 0.16);
    return {
      x: F.sx + F.vw * this.cast.home[0] + (Math.sin(t * f1 + p1) + 0.5 * Math.sin(t * f2 + p2)) * amp,
      y:
        F.sy +
        F.vh * clamp(this.cast.home[1] + lean, 0.1, 0.86) +
        (Math.cos(t * f1 * 0.8 + p2) + 0.5 * Math.sin(t * f2 * 1.2 + p1)) * amp * 0.7,
    };
  }

  goTo(
    to: () => Pt,
    o: { done: () => void; dur?: number; curve?: number; ease?: Ease; delay?: number; scaled?: boolean }
  ) {
    const d = to();
    const dist = Math.hypot(d.x - this.x, d.y - this.y);
    // Fitts-style timing: far targets take longer, but not linearly longer.
    const dur = o.dur ?? 0.2 + 0.1 * Math.log2(1 + dist / 30);
    const curve =
      o.curve ?? this.cast.curve * rand(0.5, 1.2) * (Math.random() < 0.25 ? -1 : 1);
    this.tr = {
      fx: this.x,
      fy: this.y,
      to,
      t: -(o.delay ?? 0) / dur,
      dur,
      curve,
      ease: o.ease ?? minJerk,
      scaled: o.scaled ?? true,
      done: o.done,
    };
    this.mode = "travel";
  }

  rest() {
    this.mode = "idle";
    this.idleSince = F.now;
    this.tr = null;
  }

  afterJob() {
    this.job = null;
    this.caretOff();
    this.boxOff();
    this.rest();
    this.nextThink = F.now + rand(0.04, 0.16) / F.speed;
  }

  click() {
    this.crew.track(
      gsap.fromTo(
        this.body,
        { scale: 1 },
        { scale: 0.8, duration: 0.09, ease: "power2.out", yoyo: true, repeat: 1, overwrite: "auto" }
      )
    );
  }

  setCaret(x: number, y: number, h: number) {
    this.cx = x - 1;
    this.cy = y;
    this.ch = h;
    if (!this.caretOn) {
      this.caretOn = true;
      this.caretEl.classList.add("on");
    }
  }

  caretOff() {
    if (!this.caretOn) return;
    this.caretOn = false;
    this.caretEl.classList.remove("on");
  }

  setBox(x: number, y: number, w: number, h: number) {
    this.bx = x;
    this.by = y;
    this.bw = Math.max(0, w);
    this.bh = Math.max(0, h);
    if (!this.boxOn) {
      this.boxOn = true;
      this.boxEl.classList.add("on");
    }
  }

  boxOff() {
    if (!this.boxOn) return;
    this.boxOn = false;
    this.boxEl.classList.remove("on");
  }

  step() {
    const px = this.x;
    const py = this.y;

    switch (this.mode) {
      case "travel": {
        const tr = this.tr;
        if (!tr) {
          this.rest();
          break;
        }
        const rate = tr.scaled ? F.speed * this.cast.speed : 1;
        tr.t += (F.dt * rate) / tr.dur;
        const e = tr.ease(clamp(tr.t, 0, 1));
        const d = tr.to();
        const dx = d.x - tr.fx;
        const dy = d.y - tr.fy;
        const dist = Math.hypot(dx, dy) || 1;
        // Bow the path sideways, like a wrist sweeping a mouse.
        const bend = Math.sin(Math.PI * e) * clamp(dist * tr.curve, -140, 140);
        this.x = tr.fx + dx * e + (-dy / dist) * bend;
        this.y = tr.fy + dy * e + (dx / dist) * bend;
        if (tr.t >= 1) {
          this.rest();
          tr.done(); // may switch to "work" or "hold"
        }
        break;
      }
      case "work": {
        const s = this.job ? this.job.update(this) : null;
        if (!s) {
          this.crew.jobDone(this);
          break;
        }
        if (s.follow > 0) {
          const k = damp(s.follow);
          this.x += (s.x - this.x) * k;
          this.y += (s.y - this.y) * k;
        } else {
          this.x = s.x;
          this.y = s.y;
        }
        break;
      }
      case "idle": {
        // Ease into drifting so short pauses between jobs read as stillness.
        const ramp = clamp((F.now - this.idleSince) / 0.7, 0, 1);
        const h = this.home();
        const k = damp(3 * this.cast.speed * ramp * ramp);
        this.x += (h.x - this.x) * k;
        this.y += (h.y - this.y) * k;
        break;
      }
      case "hold": {
        if (!this.holdAt) break;
        const h = this.holdAt();
        const k = damp(7);
        this.x += (h.x - this.x) * k;
        this.y += (h.y - this.y) * k;
        break;
      }
    }

    if (F.dt > 0) {
      const k = damp(12);
      this.vx = lerp(this.vx, (this.x - px) / F.dt, k);
      this.vy = lerp(this.vy, (this.y - py) / F.dt, k);
    }
  }

  render() {
    this.el.style.transform = `translate3d(${this.x.toFixed(1)}px,${this.y.toFixed(1)}px,0)`;

    // The name tag trails the pointer slightly when it moves fast, and swings
    // to the left of the pointer near the right edge so it never gets cut off.
    const k = damp(9);
    this.tox = lerp(this.tox, clamp(-this.vx * 0.014, -12, 12), k);
    this.toy = lerp(this.toy, clamp(-this.vy * 0.014, -9, 9), k);
    const nearEdge = this.x - F.sx > F.vw - this.tagW - 36;
    this.flip = lerp(this.flip, nearEdge ? 1 : 0, damp(10));
    const tx = this.tox - this.flip * (this.tagW + 20);
    this.tagWrap.style.transform = `translate3d(${tx.toFixed(1)}px,${this.toy.toFixed(1)}px,0)`;

    if (this.caretOn) {
      this.caretEl.style.transform = `translate3d(${this.cx.toFixed(1)}px,${this.cy.toFixed(1)}px,0) scaleY(${(this.ch / 100).toFixed(3)})`;
    }
    if (this.boxOn) {
      this.boxEl.style.transform = `translate3d(${this.bx.toFixed(1)}px,${this.by.toFixed(1)}px,0)`;
      this.boxEl.style.width = `${this.bw.toFixed(1)}px`;
      this.boxEl.style.height = `${this.bh.toFixed(1)}px`;
      const dim = `${Math.round(this.bw)} × ${Math.round(this.bh)}`;
      if (dim !== this.dimText) this.dimEl.textContent = this.dimText = dim;
    }
  }
}

/* --------------------------------------------------------------------- crew */

export class Crew {
  scrollVel = 0;

  private root = document.documentElement;
  private jobs: Job[] = [];
  private finals: Job[] = [];
  private cursors: Cursor[] = [];
  private stage: HTMLDivElement;
  private fx: HTMLDivElement;
  private io: IntersectionObserver;
  private phase: "enter" | "build" | "exit" | "gone" = "enter";
  private launchAt: number;
  private launched = false;
  private arrived = 0;
  private speed = 1;
  private nextFinalCheck = 0;
  private timers = new Map<number, () => void>();
  private tweens: gsap.core.Animation[] = [];

  /** Starts the crew if the page opted in (html.mc) and motion is allowed. */
  static start(): Crew | null {
    const root = document.documentElement;
    if (!root.classList.contains("mc")) return null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("mc");
      return null;
    }
    (window as unknown as { __mcAlive?: boolean }).__mcAlive = true;
    return new Crew();
  }

  private constructor() {
    this.sync(performance.now() / 1000);
    F.dt = 0;

    this.stage = document.createElement("div");
    this.stage.className = "mc-stage";
    this.stage.setAttribute("aria-hidden", "true");
    this.fx = document.createElement("div");
    this.fx.className = "mc-layer";
    const crewLayer = document.createElement("div");
    crewLayer.className = "mc-layer";
    this.stage.append(this.fx, crewLayer);
    document.body.appendChild(this.stage);

    // Collect jobs in document order — parents always come before children.
    const byEl = new Map<Element, Job>();
    document.querySelectorAll<HTMLElement>("[data-mc]").forEach((el) => {
      const kind = el.dataset.mc;
      const job =
        kind === "type"
          ? new TypeJob(el, this)
          : kind === "draw"
            ? new DragJob(el, this, "box")
            : kind === "line"
              ? new DragJob(el, this, "line")
              : new PopJob(el, this);
      const host = el.parentElement?.closest("[data-mc]");
      job.parent = (host && byEl.get(host)) || null;
      job.final = !!el.closest("[data-mc-final]");
      byEl.set(el, job);
      this.jobs.push(job);
      if (job.final) this.finals.push(job);
    });
    this.jobs.forEach((j) => j.prepare());
    // Anything not rendered at this breakpoint (display: none) is simply shown.
    this.jobs.forEach((j) => !j.renderable && this.finish(j, true));

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const j = byEl.get(e.target);
          if (j) j.visible = e.isIntersecting;
        }
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    this.jobs.forEach((j) => j.state !== "done" && this.io.observe(j.el));

    this.cursors = CAST.map((c, i) => new Cursor(i, c, this, crewLayer, this.fx));
    this.launchAt = F.now + ENTER_DELAY;
    gsap.ticker.add(this.tick);
  }

  /** Tears down and restores the page exactly as rendered (React unmount / HMR). */
  destroy() {
    this.teardown(false);
  }

  track(a: gsap.core.Animation) {
    this.tweens.push(a);
  }

  defer(fn: () => void, ms: number) {
    const id = window.setTimeout(() => {
      this.timers.delete(id);
      fn();
    }, ms);
    this.timers.set(id, fn);
  }

  ripple(x: number, y: number, scale = 1) {
    const r = document.createElement("div");
    r.className = "mc-ripple";
    this.fx.appendChild(r);
    this.track(
      gsap.fromTo(
        r,
        { x, y, scale: 0.15, opacity: 0.75 },
        { scale, opacity: 0, duration: 0.65, ease: "power2.out", onComplete: () => r.remove() }
      )
    );
  }

  jobDone(c: Cursor) {
    if (c.job) this.finish(c.job, false);
    c.afterJob();
  }

  /* ---------------------------------------------------------------- frame */

  private tick = () => {
    if (this.phase === "gone") return;
    try {
      this.frame();
    } catch (err) {
      // Never leave the page hidden because of an animation bug.
      console.error("[cursor crew]", err);
      this.teardown(true);
    }
  };

  private sync(now: number) {
    F.dt = clamp(now - F.now, 0, 0.05);
    F.now = now;
    F.sx = window.scrollX;
    F.sy = window.scrollY;
    F.vw = this.root.clientWidth;
    F.vh = window.innerHeight;
  }

  private frame() {
    const prevSy = F.sy;
    this.sync(performance.now() / 1000);
    const v = F.dt > 0 ? (F.sy - prevSy) / F.dt : 0;
    this.scrollVel = lerp(this.scrollVel, clamp(v, -6000, 6000), damp(5));

    // When a lot is waiting on screen (fast scroll), the whole crew speeds up.
    if (this.phase === "build") {
      let backlog = 0;
      for (const j of this.jobs) if (j.state === "pending" && j.visible) backlog++;
      this.speed = lerp(this.speed, clamp(1 + (backlog - 3) * 0.13, 1, 2.8), damp(3));
    } else {
      this.speed = 1;
    }
    F.speed = this.speed;
    F.work = Math.sqrt(this.speed);

    if (this.phase === "enter" && !this.launched && F.now >= this.launchAt) this.launch();
    if (this.phase === "build") {
      this.watch();
      this.dispatch();
      this.checkFinal();
    }

    for (const c of this.cursors) c.step();
    for (const c of this.cursors) c.render();
  }

  /* ------------------------------------------------------------- entrance */

  private launch() {
    this.launched = true;
    this.cursors.forEach((c, i) => {
      const cast = CAST[i];
      c.x = F.sx + F.vw * cast.from[0];
      c.y = F.sy + F.vh * cast.from[1];
      c.show();
      c.goTo(() => c.home(), {
        dur: rand(1.05, 1.3),
        curve: cast.curve * 1.8,
        ease: outCubic,
        delay: i * 0.07,
        scaled: false,
        done: () => {
          if (++this.arrived === this.cursors.length) this.kickoff();
        },
      });
    });
  }

  /** Everyone's in: one synchronized click, the stars come up, work begins. */
  private kickoff() {
    this.phase = "build";
    this.root.classList.add("mc-live");
    this.cursors.forEach((c, i) => {
      c.measure();
      c.click();
      this.ripple(c.x, c.y);
      c.nextThink = F.now + 0.16 + i * 0.05;
    });
  }

  /* ---------------------------------------------------------------- build */

  /** Drop jobs that scrolled away before the cursor got there. */
  private watch() {
    for (const c of this.cursors) {
      const j = c.job;
      if (!j) continue;
      if (j.state === "claimed" && !j.visible) {
        j.state = "pending";
        c.job = null;
        c.rest();
      } else if (j.state === "active") {
        const r = j.el.getBoundingClientRect();
        if (r.bottom < -60 || r.top > F.vh + 60) {
          // Scrolled fully out of view mid-reveal: finish it off-screen.
          this.finish(j, true);
          c.afterJob();
        }
      }
    }
  }

  private dispatch() {
    for (const c of this.cursors) {
      if (c.job || c.mode !== "idle" || F.now < c.nextThink) continue;
      const j = this.pick(c);
      if (j) this.assign(c, j);
      else c.nextThink = F.now + 0.12;
    }
  }

  /** Earliest visible jobs first (the page builds top-down), nearest wins among them. */
  private pick(c: Cursor): Job | null {
    let best: Job | null = null;
    let bestScore = Infinity;
    let rank = 0;
    for (const j of this.jobs) {
      if (!j.ready) continue;
      const a = j.anchor();
      const score = rank * 260 + Math.hypot(a.x - c.x, a.y - c.y);
      if (score < bestScore) {
        bestScore = score;
        best = j;
      }
      if (++rank >= 4) break;
    }
    return best;
  }

  private assign(c: Cursor, j: Job) {
    j.state = "claimed";
    c.job = j;
    c.goTo(() => j.anchor(), {
      done: () => {
        if (c.job !== j || j.state !== "claimed") return;
        j.state = "active";
        c.mode = "work";
        j.begin(c);
      },
    });
  }

  private finish(j: Job, instant: boolean) {
    if (j.state === "done") return;
    j.complete(instant);
    j.state = "done";
    j.el.classList.add("mc-done");
  }

  private checkFinal() {
    if (F.now < this.nextFinalCheck) return;
    this.nextFinalCheck = F.now + 0.25;
    if (this.cursors.some((c) => c.job)) return;
    if (this.jobs.some((j) => j.state === "pending" && j.visible)) return;
    const finals = this.finals.length ? this.finals : this.jobs;
    for (const j of finals) {
      if (j.state === "done") continue;
      if (!j.visible && !j.renderable) {
        this.finish(j, true);
        continue;
      }
      return;
    }
    this.beginExit();
  }

  /* ----------------------------------------------------------------- exit */

  private beginExit() {
    this.phase = "exit";
    // Anything the visitor skipped past is off-screen — just show it.
    for (const j of this.jobs) this.finish(j, true);

    const gap = clamp(F.vw * 0.1, 44, 72);
    const lineup = [...this.cursors].sort((a, b) => a.x - b.x); // no crossing paths
    let settled = 0;
    lineup.forEach((c, i) => {
      const o = i - 2;
      const spot = () => ({ x: F.sx + F.vw / 2 + o * gap, y: F.sy + F.vh * 0.5 + o * o * 6 });
      c.goTo(spot, {
        dur: 0.9 + Math.abs(o) * 0.08,
        curve: 0.1 * (o < 0 ? -1 : 1),
        ease: minJerk,
        scaled: false,
        done: () => {
          c.mode = "hold";
          c.holdAt = spot;
          if (++settled === lineup.length) this.finale(lineup);
        },
      });
    });
  }

  /** A small bow in a wave, a shared pulse, then each cursor dissolves. */
  private finale(lineup: Cursor[]) {
    const tl = gsap.timeline({ onComplete: () => this.teardown(true) });
    this.track(tl);
    lineup.forEach((c, i) => {
      tl.to(
        c.body,
        { y: 8, scale: 0.9, duration: 0.24, ease: "power2.out", yoyo: true, repeat: 1 },
        0.05 + i * 0.07
      );
    });
    tl.add(() => lineup.forEach((c) => this.ripple(c.x, c.y, 1.6)), 0.62);
    lineup.forEach((c, i) => {
      const at = 0.7 + Math.abs(i - 2) * 0.09; // centre first, then outward
      tl.to(c.tag, { opacity: 0, scale: 0.6, x: -8, duration: 0.32, ease: "power2.in" }, at);
      tl.to(
        c.body,
        { opacity: 0, scale: 0.35, y: -30, rotate: -8, filter: "blur(6px)", duration: 0.8, ease: "power3.inOut" },
        at + 0.06
      );
    });
  }

  private teardown(complete: boolean) {
    if (this.phase === "gone") return;
    this.phase = "gone";
    gsap.ticker.remove(this.tick);
    this.io.disconnect();
    this.tweens.forEach((t) => t.kill());
    this.tweens = [];
    this.timers.forEach((fn, id) => {
      clearTimeout(id);
      fn();
    });
    this.timers.clear();
    this.stage.remove();

    if (complete) {
      this.jobs.forEach((j) => this.finish(j, true));
      this.root.classList.remove("mc", "mc-live");
      this.jobs.forEach((j) => j.el.classList.remove("mc-armed", "mc-done"));
      window.dispatchEvent(new Event("mc:complete"));
    } else {
      // React strict mode / hot reload: undo everything so a fresh crew can start.
      this.jobs.forEach((j) => j.reset());
      this.root.classList.remove("mc-live");
    }
  }
}
