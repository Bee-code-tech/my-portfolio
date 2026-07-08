"use client";

import { CountUpStat } from "@/components/ui/CountUpStat";
import { heroStats } from "@/lib/hero";

/** Matches `.hero-enter-stat { animation-delay: 0.9s }` in globals.css */
const HERO_STAT_DELAY = 0.9;

export function HeroStats() {
  return (
    <div className="flex w-full flex-wrap items-start justify-start gap-x-10 gap-y-4 min-[810px]:justify-center min-[1200px]:justify-start">
      {heroStats.map((stat) => (
        <CountUpStat
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          delay={HERO_STAT_DELAY}
          trigger="mount"
          className="hero-enter hero-enter-stat"
        />
      ))}
    </div>
  );
}
