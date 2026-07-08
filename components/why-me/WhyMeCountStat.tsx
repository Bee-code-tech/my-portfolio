"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type WhyMeCountStatProps = {
  value: number;
  suffix?: string;
  label?: string;
  decimals?: number;
  valueClassName?: string;
  labelClassName?: string;
  useStatFont?: boolean;
};

export function WhyMeCountStat({
  value,
  suffix = "",
  label,
  decimals = 0,
  valueClassName = "text-foreground",
  labelClassName = "text-muted",
  useStatFont = false,
}: WhyMeCountStatProps) {
  const statRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(decimals > 0 ? "0.0" : "0");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const counter = { val: 0 };

    const tween = gsap.to(counter, {
      val: value,
      duration: 2.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        setDisplay(
          decimals > 0
            ? counter.val.toFixed(decimals)
            : String(Math.round(counter.val)),
        );
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, decimals]);

  const valueFontClass = useStatFont
    ? "font-stat text-[3.5rem] leading-[4rem]"
    : "font-heading text-[3.5rem] leading-none";

  return (
    <div ref={statRef}>
      <div
        className={`flex items-baseline gap-0.5 font-semibold tracking-tight ${valueFontClass} ${valueClassName}`}
      >
        <span>{display}</span>
        {suffix && <span>{suffix}</span>}
      </div>
      {label && (
        <p className={`mt-1 text-sm ${labelClassName}`}>{label}</p>
      )}
    </div>
  );
}
