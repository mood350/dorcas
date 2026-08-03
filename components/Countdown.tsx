"use client";

import { useSyncExternalStore } from "react";
import { BIRTHDAY_ISO } from "@/app/data";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

/** Une horloge partagée qui notifie chaque seconde. */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

/** Arrondi à la seconde : la valeur reste stable entre deux ticks. */
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

function computeRemaining(target: number, nowSeconds: number): Remaining | "today" {
  const diff = target - nowSeconds * 1000;
  // Le jour J (et après) : plus de compte à rebours, on fête.
  if (diff <= 0) return "today";

  return {
    days: Math.floor(diff / DAY_MS),
    hours: Math.floor((diff / (60 * 60 * 1000)) % 24),
    minutes: Math.floor((diff / (60 * 1000)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass-card flex min-w-[4.5rem] flex-col items-center rounded-2xl px-3 py-2.5 sm:min-w-[5.5rem] sm:px-5 sm:py-3">
      <span className="font-display text-2xl font-bold tabular-nums text-blush-700 sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-plum-800/65 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const target = new Date(BIRTHDAY_ISO).getTime();
  const nowSeconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Rendu serveur / hydratation : on réserve la place sans afficher d'heure.
  if (nowSeconds === null) {
    return <div className="h-[4.75rem] sm:h-[5.5rem]" aria-hidden="true" />;
  }

  const state = computeRemaining(target, nowSeconds);

  if (state === "today") {
    return (
      <p className="font-script text-3xl text-blush-600 sm:text-5xl">
        C&rsquo;est aujourd&rsquo;hui&nbsp;! 🎂
      </p>
    );
  }

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      role="timer"
      aria-live="off"
      aria-label="Compte à rebours avant l'anniversaire"
    >
      <Unit value={state.days} label="jours" />
      <Unit value={state.hours} label="heures" />
      <Unit value={state.minutes} label="min" />
      <Unit value={state.seconds} label="sec" />
    </div>
  );
}
