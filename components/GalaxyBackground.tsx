"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  baseAlpha: number;
  twinkle: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  life: number;
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Read theme each frame — 255 (white ink) for dark bg, 0 (black ink) for light bg.
    const ink = () => (document.documentElement.classList.contains("light") ? 0 : 255);
    const bgColor = () => (document.documentElement.classList.contains("light") ? "#ffffff" : "#000000");

    let width = window.innerWidth;
    let height = window.innerHeight;
    // Cap DPR at 1.5 — full retina DPR doubles fill cost for no visible gain here.
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setup();

    const STAR_COUNT = Math.min(160, Math.floor((width * height) / 11000));
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      baseAlpha: Math.random() * 0.6 + 0.25,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const shooting: ShootingStar[] = [];
    let frame = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / width - 0.5) * 2;
      mouse.current.ty = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    const cloud = (x: number, y: number, radius: number, alpha: number) => {
      const c = ink();
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(${c}, ${c}, ${c}, ${alpha})`);
      g.addColorStop(1, `rgba(${c}, ${c}, ${c}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const render = () => {
      frame++;
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;

      const c = ink();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = bgColor();
      ctx.fillRect(0, 0, width, height);

      // faint drifting light clouds (mono)
      const t = frame * 0.0016;
      const cloudA = c === 255 ? 0.05 : 0.03;
      cloud(
        width * (0.25 + Math.sin(t) * 0.05) - mouse.current.x * 40,
        height * (0.3 + Math.cos(t * 0.8) * 0.05) - mouse.current.y * 40,
        Math.max(width, height) * 0.5,
        cloudA
      );
      cloud(
        width * (0.78 + Math.cos(t * 0.9) * 0.05) - mouse.current.x * 55,
        height * (0.7 + Math.sin(t) * 0.05) - mouse.current.y * 55,
        Math.max(width, height) * 0.45,
        cloudA
      );

      // stars — no shadowBlur (that was the main perf killer); crisp cheap dots
      for (const s of stars) {
        const px = s.x - mouse.current.x * s.z * 55;
        const py = s.y - mouse.current.y * s.z * 55;
        const tw = reduced ? 1 : (Math.sin(frame * 0.03 + s.twinkle) + 1) / 2;
        const alpha = s.baseAlpha * (0.4 + tw * 0.6);
        ctx.beginPath();
        ctx.arc(px, py, s.r * (0.6 + s.z * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c}, ${c}, ${c}, ${alpha})`;
        ctx.fill();
      }

      // shooting stars
      if (!reduced && Math.random() < 0.004 && shooting.length < 3) {
        shooting.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          len: Math.random() * 120 + 80,
          speed: Math.random() * 6 + 6,
          angle: Math.PI * 0.18 + Math.random() * 0.15,
          life: 1,
        });
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const sh = shooting[i];
        sh.x += Math.cos(sh.angle) * sh.speed;
        sh.y += Math.sin(sh.angle) * sh.speed;
        sh.life -= 0.012;
        const ex = sh.x - Math.cos(sh.angle) * sh.len;
        const ey = sh.y - Math.sin(sh.angle) * sh.len;
        const grad = ctx.createLinearGradient(sh.x, sh.y, ex, ey);
        grad.addColorStop(0, `rgba(${c}, ${c}, ${c}, ${Math.max(sh.life, 0)})`);
        grad.addColorStop(1, `rgba(${c}, ${c}, ${c}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        if (sh.life <= 0 || sh.x > width + 100 || sh.y > height + 100) shooting.splice(i, 1);
      }

      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="fixed inset-0 -z-10 h-full w-full" />;
}
