"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { SOUVENIRS } from "@/app/data";

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.36-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}

function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const souvenir = SOUVENIRS[index];
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    // La lecture est déclenchée par un clic, donc le son est autorisé.
    videoRef.current?.play().catch(() => {});
  }, [index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index + 1) % SOUVENIRS.length);
      if (event.key === "ArrowLeft")
        onNavigate((index - 1 + SOUVENIRS.length) % SOUVENIRS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNavigate]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Souvenir ${index + 1} sur ${SOUVENIRS.length} : ${souvenir.caption}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-plum-900/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full w-full max-w-[26rem] flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <video
          ref={videoRef}
          key={souvenir.src}
          src={souvenir.src}
          poster={souvenir.poster}
          controls
          playsInline
          preload="metadata"
          className="max-h-[76svh] w-full rounded-3xl bg-black shadow-2xl shadow-black/50"
        />

        <p className="mt-4 text-center font-script text-2xl text-blush-200">
          {souvenir.caption}
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-200/60">
          {index + 1} / {SOUVENIRS.length}
        </p>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute -top-3 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-plum-900 shadow-lg transition hover:bg-white sm:-right-3"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Souvenir précédent"
          onClick={() =>
            onNavigate((index - 1 + SOUVENIRS.length) % SOUVENIRS.length)
          }
          className="absolute -left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-plum-900 shadow-lg transition hover:bg-white sm:-left-16"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Souvenir suivant"
          onClick={() => onNavigate((index + 1) % SOUVENIRS.length)}
          className="absolute -right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-plum-900 shadow-lg transition hover:bg-white sm:-right-16"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function VideoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  const navigate = useCallback((next: number) => setOpenIndex(next), []);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {SOUVENIRS.map((souvenir, i) => (
          <li key={souvenir.src}>
            <Reveal delay={(i % 4) * 90}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative block w-full overflow-hidden rounded-3xl border border-white/70 bg-blush-100 shadow-lg shadow-blush-500/15 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blush-500/30"
              >
                <span className="relative block aspect-[9/16] w-full">
                  <Image
                    src={souvenir.poster}
                    alt={souvenir.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.06]"
                  />
                </span>

                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-900/75 via-plum-900/10 to-transparent" />

                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm ring-1 ring-white/60 transition duration-300 group-hover:scale-110 group-hover:bg-white/40">
                    <PlayIcon className="ml-0.5 h-5 w-5 text-white drop-shadow" />
                  </span>
                </span>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-left">
                  <span className="block font-script text-xl leading-tight text-white drop-shadow-sm">
                    {souvenir.caption}
                  </span>
                  <span className="mt-0.5 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-blush-200/85">
                    Souvenir {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox index={openIndex} onClose={close} onNavigate={navigate} />
      )}
    </>
  );
}
