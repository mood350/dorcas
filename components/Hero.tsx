"use client";

import { useCallback, type MouseEvent } from "react";
import Countdown from "./Countdown";
import FloralDivider from "./FloralDivider";
import { burstPetals } from "./PetalRain";
import { CELEBRANT, BIRTHDAY_LABEL } from "@/app/data";

export default function Hero() {
  const onBurst = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    burstPetals(rect.left + rect.width / 2, rect.top + rect.height / 2, 90);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
      {/* Halos décoratifs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="float-slower absolute -left-24 top-16 h-72 w-72 rounded-full bg-blush-200/50 blur-3xl" />
        <div className="float-slow absolute -right-20 top-40 h-80 w-80 rounded-full bg-blush-300/40 blur-3xl" />
        <div className="float-slower absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />
      </div>

      <p className="font-script text-3xl text-blush-500 sm:text-4xl">
        Joyeux anniversaire
      </p>

      <h1 className="text-gradient-rose mt-1 font-display text-[3.6rem] font-black leading-[0.95] tracking-tight sm:text-8xl lg:text-[9.5rem]">
        {CELEBRANT}
      </h1>

      <FloralDivider className="mt-6 w-full max-w-md" />

      <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-plum-800/80 sm:text-lg">
        Le <strong className="font-semibold text-blush-700">{BIRTHDAY_LABEL}</strong>,
        le monde a reçu un très joli cadeau. Cette page est la nôtre pour te le
        rappeler.
      </p>

      <div className="mt-9">
        <Countdown />
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBurst}
          className="pulse-ring relative rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-blush-500/35 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blush-500/45 active:translate-y-0"
        >
          Fais pleuvoir les pétales 🌸
        </button>

        <a
          href="#souvenirs"
          className="rounded-full border border-blush-300 bg-white/70 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-blush-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
        >
          Voir les souvenirs
        </a>
      </div>

      <a
        href="#lettre"
        aria-label="Descendre vers la lettre"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-blush-500/70 transition hover:text-blush-600"
      >
        <svg
          viewBox="0 0 24 24"
          className="float-slow h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
