"use client";

import type { MouseEvent, ReactNode } from "react";
import { burstPetals } from "./PetalRain";

export default function PetalButton({
  children,
  count = 110,
  className = "",
}: {
  children: ReactNode;
  count?: number;
  className?: string;
}) {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    burstPetals(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
