import Reveal from "./Reveal";
import { WISHES } from "@/app/data";

export default function WishCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {WISHES.map((wish, i) => (
        <li key={wish.title}>
          <Reveal delay={(i % 3) * 110} className="h-full">
            <article className="glass-card group h-full rounded-3xl p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blush-500/25">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blush-100 text-2xl transition duration-300 group-hover:scale-110">
                {wish.emoji}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-blush-700">
                {wish.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-plum-800/75">
                {wish.body}
              </p>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
