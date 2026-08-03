"use client";

import { useEffect, useRef } from "react";

/** Événement déclenché par les boutons pour faire exploser une gerbe de pétales. */
export const PETAL_BURST_EVENT = "dorcas:petal-burst";

export function burstPetals(x: number, y: number, count = 70) {
  window.dispatchEvent(
    new CustomEvent(PETAL_BURST_EVENT, { detail: { x, y, count } }),
  );
}

const PETAL_COLORS = [
  "#ffd0e2",
  "#ffb3d1",
  "#ff8fbc",
  "#f9629f",
  "#ffe3ee",
  "#f7a8c4",
  "#e6c48a",
];

type Petal = {
  x: number;
  y: number;
  baseX: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  spin: number;
  flip: number;
  flipSpeed: number;
  swayAmp: number;
  swaySpeed: number;
  phase: number;
  color: string;
  opacity: number;
  burst: boolean;
};

function makeAmbientPetal(w: number, h: number, spawnAbove: boolean): Petal {
  const size = 7 + Math.random() * 13;
  const baseX = Math.random() * w;
  return {
    x: baseX,
    y: spawnAbove ? -Math.random() * h * 0.6 - 20 : Math.random() * h,
    baseX,
    vx: 0,
    vy: 22 + Math.random() * 48 + size * 1.4,
    size,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 1.1,
    flip: Math.random() * Math.PI * 2,
    flipSpeed: 0.6 + Math.random() * 1.4,
    swayAmp: 14 + Math.random() * 46,
    swaySpeed: 0.35 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
    color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
    opacity: 0.45 + Math.random() * 0.5,
    burst: false,
  };
}

function makeBurstPetal(x: number, y: number): Petal {
  const size = 6 + Math.random() * 12;
  const angle = Math.random() * Math.PI * 2;
  const speed = 90 + Math.random() * 320;
  return {
    x,
    y,
    baseX: x,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 140,
    size,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 4,
    flip: Math.random() * Math.PI * 2,
    flipSpeed: 1.5 + Math.random() * 2.5,
    swayAmp: 0,
    swaySpeed: 0,
    phase: 0,
    color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
    opacity: 0.75 + Math.random() * 0.25,
    burst: true,
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  const s = p.size;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  // Le "flip" simule le pétale qui tourne sur lui-même en tombant.
  ctx.scale(1, Math.max(0.18, Math.abs(Math.cos(p.flip))));
  ctx.globalAlpha = p.opacity;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(s * 0.55, -s * 0.62, s * 1.35, -s * 0.3, s * 1.5, s * 0.16);
  ctx.bezierCurveTo(s * 1.32, s * 0.78, s * 0.5, s * 0.72, 0, 0);
  ctx.closePath();
  ctx.fillStyle = p.color;
  ctx.fill();
  ctx.restore();
}

export default function PetalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let petals: Petal[] = [];
    let raf = 0;
    let last = 0;
    let elapsed = 0;

    const ambientCount = () => {
      const w = window.innerWidth;
      if (w < 640) return 22;
      if (w < 1024) return 34;
      return 48;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      petals = Array.from({ length: ambientCount() }, () =>
        makeAmbientPetal(width, height, false),
      );
    };

    resize();
    seed();

    if (reduced) {
      // Pas d'animation : un décor de pétales figé, discret.
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.opacity *= 0.6;
        drawPetal(ctx, p);
      }
      const onResizeStatic = () => {
        resize();
        seed();
        ctx.clearRect(0, 0, width, height);
        for (const p of petals) {
          p.opacity *= 0.6;
          drawPetal(ctx, p);
        }
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    const onResize = () => {
      resize();
      const target = ambientCount();
      const ambient = petals.filter((p) => !p.burst);
      while (ambient.length < target) {
        ambient.push(makeAmbientPetal(width, height, true));
      }
      petals = [...ambient.slice(0, target), ...petals.filter((p) => p.burst)];
    };

    const onBurst = (event: Event) => {
      const { x, y, count } = (event as CustomEvent<{
        x: number;
        y: number;
        count: number;
      }>).detail;
      const room = Math.max(0, 420 - petals.length);
      const n = Math.min(count, room);
      for (let i = 0; i < n; i++) petals.push(makeBurstPetal(x, y));
    };

    const frame = (now: number) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      elapsed += dt;

      ctx.clearRect(0, 0, width, height);

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.angle += p.spin * dt;
        p.flip += p.flipSpeed * dt;

        if (p.burst) {
          p.vy += 620 * dt; // gravité
          p.vx *= 1 - 1.1 * dt; // frottement de l'air
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.opacity -= 0.28 * dt;
          if (p.opacity <= 0.02 || p.y > height + 60) petals.splice(i, 1);
        } else {
          p.y += p.vy * dt;
          p.x = p.baseX + Math.sin(elapsed * p.swaySpeed + p.phase) * p.swayAmp;
          if (p.y > height + 40) {
            const fresh = makeAmbientPetal(width, height, false);
            fresh.y = -30;
            petals[i] = fresh;
          }
        }

        drawPetal(ctx, p);
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);
    window.addEventListener(PETAL_BURST_EVENT, onBurst);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(PETAL_BURST_EVENT, onBurst);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  );
}
