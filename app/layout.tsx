import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Quicksand } from "next/font/google";
import "./globals.css";
import { CELEBRANT, BIRTHDAY_LABEL } from "./data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Joyeux anniversaire ${CELEBRANT} 🌸`,
  description: `Une page rien que pour ${CELEBRANT}, le ${BIRTHDAY_LABEL}. Des pétales, des souvenirs et beaucoup d'affection.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${greatVibes.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
