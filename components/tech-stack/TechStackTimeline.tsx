"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechStackItem } from "@/components/tech-stack/TechStackItem";
import { GSAP_EASE } from "@/lib/motion";
import { techStackCategories } from "@/lib/tech-stack";

export function TechStackTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const line = root.querySelector<HTMLElement>("[data-timeline-line]");
      const articles = gsap.utils.toArray<HTMLElement>(
        "[data-timeline-item]",
        root,
      );

      if (line) {
        if (reduceMotion) {
          gsap.set(line, { scaleY: 1 });
        } else {
          gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
          gsap.to(line, {
            scaleY: 1,
            duration: 1.1,
            ease: GSAP_EASE,
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              once: true,
            },
          });
        }
      }

      articles.forEach((article, index) => {
        const isLeft = article.dataset.side === "left";
        const card = article.querySelector<HTMLElement>("[data-timeline-card]");
        const dot = article.querySelector<HTMLElement>("[data-timeline-dot]");
        const connector = article.querySelector<HTMLElement>(
          "[data-timeline-connector]",
        );
        const title = article.querySelector<HTMLElement>(
          "[data-timeline-title]",
        );
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-timeline-tech-item]",
          article,
        );

        if (!card || !dot || !connector || !title) return;

        if (reduceMotion) {
          gsap.set([card, dot, connector, title, ...items], {
            opacity: 1,
            x: 0,
            y: 0,
            scaleX: 1,
          });
          return;
        }

        gsap.set(card, { opacity: 0, x: isLeft ? -28 : 28 });
        gsap.set([dot, title, ...items], { opacity: 0, y: 24 });
        gsap.set(connector, {
          scaleX: 0,
          transformOrigin: isLeft ? "right center" : "left center",
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: article,
              start: "top 85%",
              once: true,
            },
            delay: index * 0.04,
          })
          .to(card, { opacity: 1, x: 0, duration: 0.65, ease: GSAP_EASE })
          .to(
            dot,
            { opacity: 1, y: 0, duration: 0.65, ease: GSAP_EASE },
            "<",
          )
          .to(
            connector,
            { scaleX: 1, duration: 0.5, ease: GSAP_EASE },
            "<0.1",
          )
          .to(
            title,
            { opacity: 1, y: 0, duration: 0.65, ease: GSAP_EASE },
            "<0.08",
          )
          .to(
            items,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.05,
              ease: GSAP_EASE,
            },
            "-=0.4",
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto max-w-4xl pt-6 min-[810px]:pt-10"
    >
      <div
        data-timeline-line
        className="absolute top-[18px] bottom-[18px] left-1/2 hidden w-[2px] origin-top -translate-x-1/2 bg-border min-[810px]:block"
        aria-hidden
      />

      <div className="flex flex-col gap-10 min-[810px]:gap-14">
        {techStackCategories.map((category) => {
          const isLeft = category.side === "left";

          return (
            <article
              key={category.id}
              data-timeline-item
              data-side={category.side}
              className={`relative flex w-full ${
                isLeft ? "min-[810px]:justify-start" : "min-[810px]:justify-end"
              }`}
            >
              <div
                data-timeline-dot
                className="absolute top-[18px] left-1/2 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-card bg-muted min-[810px]:block"
                aria-hidden
              />

              <div
                data-timeline-card
                className={`relative w-full min-[810px]:w-[calc(50%-1.75rem)] ${
                  isLeft ? "min-[810px]:pr-7" : "min-[810px]:pl-7"
                }`}
              >
                <div
                  data-timeline-connector
                  className={`absolute top-[18px] hidden h-[2px] w-7 origin-left bg-border min-[810px]:block ${
                    isLeft ? "-right-7 origin-right" : "-left-7"
                  }`}
                  aria-hidden
                />

                <h3
                  data-timeline-title
                  className="text-left font-heading text-xl font-semibold tracking-tight text-foreground min-[810px]:text-[22px]"
                >
                  {category.title}
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                  {category.items.map((item) => (
                    <div key={item.name} data-timeline-tech-item>
                      <TechStackItem {...item} />
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
