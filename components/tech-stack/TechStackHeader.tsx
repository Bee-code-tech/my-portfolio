"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSAP_EASE } from "@/lib/motion";

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TechStackHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const header = headerRef.current;
    if (!header) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const image = header.querySelector<HTMLElement>("[data-stack-image]");
    const title = header.querySelector<HTMLElement>("[data-stack-title]");
    if (!image || !title) return;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([image, title], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(image, { opacity: 0, scale: 0.92 });
      gsap.set(title, { opacity: 0, y: 24 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
          delay: 0.05,
        })
        .to(image, { opacity: 1, scale: 1, duration: 0.55, ease: GSAP_EASE })
        .to(title, { opacity: 1, y: 0, duration: 0.65, ease: GSAP_EASE }, "-=0.35");
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="mx-auto flex max-w-2xl flex-col items-center text-center"
    >
      <div
        data-stack-image
        className="relative h-[120px] w-full max-w-md min-[810px]:h-[140px]"
      >
        <Image
          src="/stack.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 810px) 100vw, 448px"
          className="object-contain object-center"
        />
      </div>

      <div
        data-stack-title
        className="mt-5 flex items-start justify-center gap-3"
      >
        <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
          My Tech Stack
        </h2>
        <ArrowUpIcon className="mt-1.5 h-5 w-5 shrink-0 text-muted md:mt-2 md:h-6 md:w-6" />
      </div>
    </header>
  );
}
