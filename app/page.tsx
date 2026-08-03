import Hero from "@/components/Hero";
import PetalRain from "@/components/PetalRain";
import PetalButton from "@/components/PetalButton";
import Reveal from "@/components/Reveal";
import FloralDivider from "@/components/FloralDivider";
import VideoGallery from "@/components/VideoGallery";
import WishCards from "@/components/WishCards";
import {
  CELEBRANT,
  BIRTHDAY_LABEL,
  LETTER,
  SIGNATURE,
  SOUVENIRS,
} from "./data";

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="text-center">
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-blush-500">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-black text-plum-900 sm:text-5xl">
        {title}
      </h2>
      <FloralDivider className="mt-5" />
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <PetalRain />

      <main className="relative z-10 flex-1">
        <Hero />

        {/* ---------- La lettre ---------- */}
        <section
          id="lettre"
          className="mx-auto w-full max-w-3xl scroll-mt-16 px-5 py-20 sm:py-28"
        >
          <SectionTitle eyebrow="Quelques mots" title="Une lettre pour toi" />

          <Reveal delay={120}>
            <div className="glass-card mt-10 rounded-[2rem] p-7 sm:p-11">
              <p className="font-script text-3xl text-blush-600 sm:text-4xl">
                Chère {CELEBRANT},
              </p>

              <div className="mt-5 space-y-4 text-[0.98rem] leading-[1.85] text-plum-800/85 sm:text-lg">
                {LETTER.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-8 text-right font-script text-3xl text-blush-600">
                — {SIGNATURE}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---------- Les souvenirs ---------- */}
        <section
          id="souvenirs"
          className="mx-auto w-full max-w-6xl scroll-mt-16 px-5 py-20 sm:py-28"
        >
          <SectionTitle
            eyebrow={`${SOUVENIRS.length} moments`}
            title="Nos souvenirs"
          />

          <Reveal delay={100}>
            <p className="mx-auto mt-5 max-w-xl text-balance text-center text-sm leading-relaxed text-plum-800/70 sm:text-base">
              Touche une vignette pour lancer la vidéo. Les flèches du clavier
              permettent de passer d&rsquo;un souvenir à l&rsquo;autre.
            </p>
          </Reveal>

          <div className="mt-12">
            <VideoGallery />
          </div>
        </section>

        {/* ---------- Les vœux ---------- */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
          <SectionTitle eyebrow="Pour cette année" title="Mes vœux pour toi" />

          <div className="mt-12">
            <WishCards />
          </div>
        </section>

        {/* ---------- Le gâteau ---------- */}
        <section className="px-5 pb-24 pt-6 text-center sm:pb-32">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <p className="float-slow text-7xl sm:text-8xl" aria-hidden="true">
                🎂
              </p>

              <h2 className="mt-6 font-display text-3xl font-black text-plum-900 sm:text-5xl">
                Fais un vœu, {CELEBRANT}
              </h2>

              <p className="mx-auto mt-4 max-w-md text-balance text-sm leading-relaxed text-plum-800/70 sm:text-base">
                Ferme les yeux, souffle les bougies — et laisse les pétales faire
                le reste.
              </p>

              <PetalButton
                count={160}
                className="pulse-ring relative mt-9 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-9 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-blush-500/35 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blush-500/45 active:translate-y-0"
              >
                Souffler les bougies 🕯️
              </PetalButton>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-blush-200/70 bg-white/45 px-5 py-9 text-center backdrop-blur">
        <p className="font-script text-2xl text-blush-600">
          Joyeux anniversaire {CELEBRANT} 🌸
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-plum-800/50">
          {BIRTHDAY_LABEL} · avec beaucoup d&rsquo;affection
        </p>
      </footer>
    </>
  );
}
