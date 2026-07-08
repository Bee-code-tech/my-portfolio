"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { heroStats } from "@/lib/hero";

/** Synced with `.hero-enter-stat { animation-delay: 0.9s }` — both start at mount. */
const COUNT_DELAY = 0.9;
const COUNT_DURATION = 2.5;

function HeroStatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: COUNT_DURATION,
        delay: COUNT_DELAY,
        ease: "power3.out",
        onUpdate: () => {
          setDisplay(Math.round(counter.val));
        },
        onComplete: () => {
          setDisplay(value);
        },
      });
    }, root);

    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={rootRef} className="hero-enter hero-enter-stat">
      <div className="flex flex-col gap-1">
        <p className="font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {display}
          {suffix}
        </p>
        <p className="text-sm text-foreground-muted">{label}</p>
      </div>
    </div>
  );
}

export function HeroStats() {
  return (
    <div className="flex w-full flex-wrap items-start justify-start gap-x-10 gap-y-4 min-[810px]:justify-center min-[1200px]:justify-start">
      {heroStats.map((stat) => (
        <HeroStatItem
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
        />
      ))}
    </div>
  );
}
