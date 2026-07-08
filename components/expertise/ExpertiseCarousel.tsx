"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CodeTerminal } from "@/components/expertise/CodeTerminal";
import { ExpertiseIcon } from "@/components/expertise/ExpertiseIcons";
import { getTypingDurationMs, expertiseItems } from "@/lib/expertise";
import { expertiseTerminals, getTerminalCharCount } from "@/lib/expertise-terminals";

const SLIDE_HEIGHT_CLASS = "h-[360px] min-[1200px]:h-[640px]";

export function ExpertiseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleProgress, setCycleProgress] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cycleTweenRef = useRef<gsap.core.Tween | null>(null);
  const activeIndexRef = useRef(0);
  const cycleKeyRef = useRef(0);
  const cycleProgressRef = useRef(0);
  const progressFrameRef = useRef<number | null>(null);

  const scheduleProgressUpdate = useCallback((value: number) => {
    cycleProgressRef.current = value;
    if (progressFrameRef.current !== null) return;

    progressFrameRef.current = requestAnimationFrame(() => {
      progressFrameRef.current = null;
      setCycleProgress((prev) =>
        prev === cycleProgressRef.current ? prev : cycleProgressRef.current,
      );
    });
  }, []);

  const getSlideHeight = useCallback(
    () => viewportRef.current?.offsetHeight ?? 0,
    [],
  );

  const animateToIndex = useCallback(
    (index: number, immediate = false) => {
      const height = getSlideHeight();
      if (!stackRef.current || height === 0) return;

      timelineRef.current?.kill();

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const duration = immediate || reducedMotion ? 0 : 0.7;
      const blurDuration = immediate || reducedMotion ? 0 : 0.6;

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut", overwrite: "auto" },
      });

      tl.to(stackRef.current, { y: -index * height, duration }, 0);

      layerRefs.current.forEach((layer, i) => {
        if (!layer) return;
        const isVisible = i === index;
        tl.to(
          layer,
          {
            filter: isVisible ? "blur(0px)" : "blur(16px)",
            opacity: isVisible ? 1 : 0,
            duration: blurDuration,
          },
          0,
        );
      });

      tl.call(() => {
        layerRefs.current.forEach((layer, i) => {
          if (!layer) return;
          gsap.set(layer, {
            filter: i === index ? "blur(0px)" : "none",
            opacity: i === index ? 1 : 0,
          });
        });
      });

      timelineRef.current = tl;
    },
    [getSlideHeight],
  );

  const startCycle = useCallback((index: number) => {
    cycleTweenRef.current?.kill();

    const charCount = getTerminalCharCount(expertiseTerminals[index]);
    const durationMs = getTypingDurationMs(charCount);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cycleKey = ++cycleKeyRef.current;

    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
    }
    cycleProgressRef.current = 0;
    setCycleProgress(0);

    if (reducedMotion) {
      cycleProgressRef.current = 1;
      setCycleProgress(1);
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 1 });
      }
      window.setTimeout(() => {
        if (cycleKey !== cycleKeyRef.current) return;
        const next = (index + 1) % expertiseItems.length;
        activeIndexRef.current = next;
        setActiveIndex(next);
      }, 800);
      return;
    }

    const state = { value: 0 };

    cycleTweenRef.current = gsap.to(state, {
      value: 1,
      duration: durationMs / 1000,
      ease: "none",
      onUpdate: () => {
        if (cycleKey !== cycleKeyRef.current) return;
        scheduleProgressUpdate(state.value);
        if (progressRef.current) {
          gsap.set(progressRef.current, {
            scaleX: state.value,
            transformOrigin: "left center",
          });
        }
      },
      onComplete: () => {
        if (cycleKey !== cycleKeyRef.current) return;
        const next = (index + 1) % expertiseItems.length;
        activeIndexRef.current = next;
        setActiveIndex(next);
      },
    });
  }, [scheduleProgressUpdate]);

  const goToIndex = useCallback(
    (index: number) => {
      cycleKeyRef.current += 1;
      cycleTweenRef.current?.kill();
      activeIndexRef.current = index;
      setActiveIndex(index);
    },
    [],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => {
      animateToIndex(activeIndexRef.current, true);
    });

    observer.observe(viewport);
    return () => observer.disconnect();
  }, [animateToIndex]);

  useLayoutEffect(() => {
    animateToIndex(activeIndex);
    startCycle(activeIndex);
  }, [activeIndex, animateToIndex, startCycle]);

  useEffect(() => {
    layerRefs.current.forEach((layer, i) => {
      if (!layer) return;
      gsap.set(layer, {
        filter: i === 0 ? "blur(0px)" : "none",
        opacity: i === 0 ? 1 : 0,
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      cycleTweenRef.current?.kill();
      if (progressFrameRef.current !== null) {
        cancelAnimationFrame(progressFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:gap-4">
      <div className="flex flex-1 flex-col gap-2">
        {expertiseItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => goToIndex(index)}
              className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border p-6 text-left transition-[background-color,box-shadow,border-color] duration-300 ${
                isActive
                  ? "border-[#0d29000d] bg-card shadow-[0_4px_8px_-4px_#c9cdd2,0_12px_18px_-2px_#c9cdd2]"
                  : "border-transparent bg-transparent shadow-none hover:opacity-90"
              }`}
              aria-expanded={isActive}
            >
              {isActive && (
                <div
                  className="absolute top-0 right-0 left-0 h-1 bg-[#0d29000d]"
                  aria-hidden
                >
                  <div
                    ref={progressRef}
                    className="h-full w-full origin-left bg-foreground"
                  />
                </div>
              )}

              <div className="flex flex-col gap-6">
                <ExpertiseIcon id={item.icon} className="h-8 w-8 text-foreground" />

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground min-[810px]:text-xl">
                    {item.title}
                  </h3>
                  <p className="max-w-[480px] text-sm leading-relaxed text-foreground-muted min-[810px]:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div
        ref={viewportRef}
        className={`${SLIDE_HEIGHT_CLASS} w-full shrink-0 overflow-hidden rounded-2xl border border-[#0d29001a] bg-surface min-[1200px]:w-[calc(50%-8px)]`}
      >
        <div ref={stackRef} className="flex w-full flex-col will-change-transform">
          {expertiseItems.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                layerRefs.current[index] = el;
              }}
              className={`${SLIDE_HEIGHT_CLASS} w-full shrink-0 overflow-hidden bg-surface`}
            >
              <CodeTerminal
                snippet={expertiseTerminals[index]}
                progress={index === activeIndex ? cycleProgress : 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
