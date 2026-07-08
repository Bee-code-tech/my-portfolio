"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CountUpStatProps = {
  value: number;
  suffix?: string;
  label: string;
  /** Delay before counting starts (seconds). */
  delay?: number;
  duration?: number;
  /** Mount immediately, or when scrolled into view. */
  trigger?: "mount" | "scroll";
  className?: string;
};

export function CountUpStat({
  value,
  suffix = "",
  label,
  delay = 0,
  duration = 2.5,
  trigger = "mount",
  className,
}: CountUpStatProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    setDisplay(0);

    const counter = { val: 0 };

    if (trigger === "scroll") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger:
          trigger === "scroll"
            ? {
                trigger: root,
                start: "top 85%",
                once: true,
              }
            : undefined,
        onUpdate: () => {
          setDisplay(Math.round(counter.val));
        },
        onComplete: () => {
          setDisplay(value);
        },
      });
    }, root);

    return () => ctx.revert();
  }, [value, delay, duration, trigger]);

  return (
    <div ref={rootRef} className={className}>
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
