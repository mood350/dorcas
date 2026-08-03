/**
 * Tout ce qui est personnalisable est ici.
 * Modifie ce fichier pour changer les textes, la date ou l'ordre des vidéos.
 */

export const CELEBRANT = "Dorcas";

/** Date de l'anniversaire (heure locale). */
export const BIRTHDAY_ISO = "2026-08-03T00:00:00";
export const BIRTHDAY_LABEL = "3 août";

/** Nom affiché en bas de la lettre. */
export const SIGNATURE = "Prince";

export const LETTER = [
  `Il y a des personnes qu'on croise, et il y a celles qui laissent une trace. Toi, Dorcas, tu fais partie des secondes.`,
  `Ton rire, ta manière de rendre les journées ordinaires un peu moins ordinaires, ta présence quand il faut être là — tout ça compte plus que ce que des mots sur un écran peuvent dire.`,
  `Alors aujourd'hui, le ${BIRTHDAY_LABEL}, on met tout en pause pour toi. J'ai rassemblé ici quelques souvenirs, quelques sourires, et beaucoup de pétales.`,
  `Joyeux anniversaire. Que cette nouvelle année t'apporte tout ce que tu mérites, et un peu plus.`,
];

export type Wish = {
  emoji: string;
  title: string;
  body: string;
};

export const WISHES: Wish[] = [
  {
    emoji: "🌸",
    title: "Que tu fleurisses",
    body: "Comme ces pétales : sans te presser, à ton rythme, et magnifiquement.",
  },
  {
    emoji: "✨",
    title: "Que tu brilles",
    body: "Tu as cette lumière qui rassure les autres. N'oublie jamais de la garder pour toi aussi.",
  },
  {
    emoji: "💗",
    title: "Que tu sois aimée",
    body: "Autant que tu aimes. Et tu aimes beaucoup, même quand tu ne le dis pas.",
  },
  {
    emoji: "🎯",
    title: "Que tu réussisses",
    body: "Tous ces projets dans ta tête — cette année est celle où ils prennent forme.",
  },
  {
    emoji: "😂",
    title: "Que tu ries",
    body: "Fort. Trop fort. Au mauvais moment. C'est là que tu es la meilleure.",
  },
  {
    emoji: "🕊️",
    title: "Que tu sois en paix",
    body: "Une année douce, sans orage inutile, avec les bonnes personnes autour de toi.",
  },
];

export type Souvenir = {
  src: string;
  poster: string;
  caption: string;
};

/** Les fichiers vivent dans public/videos et public/posters. */
export const SOUVENIRS: Souvenir[] = [
  { src: "/videos/souvenir-01.mp4", poster: "/posters/souvenir-01.jpg", caption: "Le début de tout" },
  { src: "/videos/souvenir-02.mp4", poster: "/posters/souvenir-02.jpg", caption: "Ce sourire-là" },
  { src: "/videos/souvenir-03.mp4", poster: "/posters/souvenir-03.jpg", caption: "Un instant volé" },
  { src: "/videos/souvenir-04.mp4", poster: "/posters/souvenir-04.jpg", caption: "Rien que du bonheur" },
  { src: "/videos/souvenir-05.mp4", poster: "/posters/souvenir-05.jpg", caption: "Juste toi" },
  { src: "/videos/souvenir-06.mp4", poster: "/posters/souvenir-06.jpg", caption: "Éclats de rire" },
  { src: "/videos/souvenir-07.mp4", poster: "/posters/souvenir-07.jpg", caption: "Souvenir doux" },
  { src: "/videos/souvenir-08.mp4", poster: "/posters/souvenir-08.jpg", caption: "Un moment à garder" },
  { src: "/videos/souvenir-09.mp4", poster: "/posters/souvenir-09.jpg", caption: "Toujours rayonnante" },
  { src: "/videos/souvenir-10.mp4", poster: "/posters/souvenir-10.jpg", caption: "Encore une fois" },
  { src: "/videos/souvenir-11.mp4", poster: "/posters/souvenir-11.jpg", caption: "Et ce n'est que le début" },
];
