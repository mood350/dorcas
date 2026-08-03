# 🌸 Joyeux anniversaire Dorcas

Site d'anniversaire (Next.js 16 + Tailwind v4) : pluie de pétales de fleurs sur canvas,
compte à rebours jusqu'au 3 août, galerie des 11 vidéos et lettre personnalisée.

## Lancer

```bash
npm run dev     # http://localhost:3000
npm run build   # build de production
npm start       # servir le build
```

## Hébergement (GitHub Pages)

Le site est en export statique (`output: "export"`), publié automatiquement par
`.github/workflows/deploy.yml` à chaque push sur `main`.

👉 **https://mood350.github.io/dorcas/**

Activation, une seule fois : *Settings → Pages → Build and deployment → Source :
**GitHub Actions***.

Le workflow construit avec `NEXT_PUBLIC_BASE_PATH=/dorcas`, car Pages sert le site
depuis un sous-dossier. En local la variable est vide et le site reste à la racine.
Si le dépôt est un jour renommé, il faut mettre cette valeur à jour dans le workflow.

## Tout personnaliser

Un seul fichier : **`app/data.ts`**

| Constante        | Rôle                                                      |
| ---------------- | --------------------------------------------------------- |
| `CELEBRANT`      | Le prénom affiché partout                                 |
| `BIRTHDAY_ISO`   | Date cible du compte à rebours (heure locale)             |
| `BIRTHDAY_LABEL` | La date telle qu'elle s'affiche dans les textes           |
| `SIGNATURE`      | Le nom en bas de la lettre                                |
| `LETTER`         | Les paragraphes de la lettre (un élément = un paragraphe) |
| `WISHES`         | Les cartes de vœux                                        |
| `SOUVENIRS`      | Les vidéos, leurs miniatures et leurs légendes            |

Les couleurs sont définies dans le bloc `@theme` de `app/globals.css`
(`--color-blush-*`, `--color-plum-*`, `--color-gold-*`).

## Médias

- Vidéos : `public/videos/souvenir-01.mp4` … `souvenir-11.mp4`
- Miniatures : `public/posters/souvenir-01.jpg` … (générées avec ffmpeg)

Le dossier `vidéo/` à la racine contient les fichiers WhatsApp d'origine ; il n'est pas
utilisé par le site et peut être supprimé.

Pour ajouter une vidéo : la déposer dans `public/videos/`, générer sa miniature
(`ffmpeg -ss 0.5 -i ma-video.mp4 -frames:v 1 -vf scale=640:-2 public/posters/ma-video.jpg`)
puis ajouter une entrée dans `SOUVENIRS`.

## Détails

- La pluie de pétales est un canvas (`components/PetalRain.tsx`). Les boutons
  « Fais pleuvoir les pétales » et « Souffler les bougies » déclenchent une gerbe.
- `prefers-reduced-motion` est respecté : les animations se figent.
- La galerie s'ouvre en lightbox, navigable au clavier (← → et Échap).
