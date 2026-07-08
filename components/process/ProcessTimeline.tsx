"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/process";

type StepState = "upcoming" | "active" | "completed";

const PROCESS_ICON_SHADOW =
  "shadow-[0_4px_8px_-4px_#c9cdd2,0_12px_18px_-2px_#c9cdd2]";

const STEP_TRANSITION_MS = 280;

function getStepState(index: number, activeIndex: number): StepState {
  if (activeIndex < 0) return "upcoming";
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "active";
  return "upcoming";
}

function ProcessStepRow({
  title,
  description,
  Icon,
  iconClassName = "text-foreground/60",
  state,
  stepRef,
}: (typeof processSteps)[number] & {
  state: StepState;
  stepRef: (node: HTMLDivElement | null) => void;
}) {
  const isHighlighted = state === "active" || state === "completed";

  return (
    <div ref={stepRef} className="relative w-full">
      <div
        data-process-icon
        className={`absolute top-6 left-6 z-20 flex items-center justify-center rounded-full p-2.5 transition-all ease-out ${
          isHighlighted
            ? `bg-white opacity-100 ${PROCESS_ICON_SHADOW}`
            : "bg-surface opacity-80 shadow-[0_4px_8px_-4px_transparent,0_12px_18px_-2px_transparent]"
        }`}
        style={{ transitionDuration: `${STEP_TRANSITION_MS}ms` }}
      >
        <Icon
          className={`h-5 w-5 transition-colors ease-out ${
            isHighlighted ? "text-foreground" : iconClassName
          }`}
          style={{ transitionDuration: `${STEP_TRANSITION_MS}ms` }}
        />
      </div>

      <div
        data-process-card
        className={`relative z-0 rounded-2xl border px-6 py-6 pl-[88px] transition-all ease-out ${
          isHighlighted
            ? "border-border bg-white opacity-100"
            : "border-transparent bg-transparent opacity-80"
        }`}
        style={{ transitionDuration: `${STEP_TRANSITION_MS}ms` }}
      >
        <h4 className="font-heading text-lg font-semibold text-foreground">
          {title}
        </h4>
        <p className="mt-2 max-w-[380px] text-sm leading-relaxed text-foreground-muted min-[810px]:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

type TimelineMetrics = {
  left: number;
  top: number;
  height: number;
  lineEndY: number;
  stepTriggers: number[];
};

function metricsEqual(a: TimelineMetrics | null, b: TimelineMetrics) {
  return (
    a !== null &&
    a.left === b.left &&
    a.top === b.top &&
    a.height === b.height &&
    a.lineEndY === b.lineEndY &&
    a.stepTriggers.length === b.stepTriggers.length &&
    a.stepTriggers.every((value, index) => value === b.stepTriggers[index])
  );
}

export function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineMetrics, setLineMetrics] = useState<TimelineMetrics | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(-1);
  const metricsRef = useRef<TimelineMetrics | null>(null);
  const rafRef = useRef<number | null>(null);
  const setActiveIndexSafeRef = useRef<(index: number) => void>(() => {});
  const scheduleActiveUpdateRef = useRef<() => void>(() => {});

  const setActiveIndexSafe = useCallback((index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const updateActiveFromLine = useCallback(() => {
    const metrics = metricsRef.current;
    const progressFill = progressFillRef.current;
    if (!metrics || !progressFill) return;

    const scaleY = gsap.getProperty(progressFill, "scaleY") as number;
    const lineEndY = metrics.top + scaleY * metrics.height;

    let nextIndex = -1;
    for (let i = 0; i < metrics.stepTriggers.length; i++) {
      if (lineEndY >= metrics.stepTriggers[i]) {
        nextIndex = i;
      }
    }

    if (scaleY >= 0.998) {
      nextIndex = metrics.stepTriggers.length - 1;
    }

    setActiveIndexSafe(nextIndex);
  }, [setActiveIndexSafe]);

  const scheduleActiveUpdate = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateActiveFromLine();
    });
  }, [updateActiveFromLine]);

  setActiveIndexSafeRef.current = setActiveIndexSafe;
  scheduleActiveUpdateRef.current = scheduleActiveUpdate;

  const updateLineMetrics = useCallback(() => {
    const list = listRef.current;
    const firstStep = stepRefs.current[0];
    const lastStep = stepRefs.current[processSteps.length - 1];

    if (!list || !firstStep || !lastStep) return;

    const listRect = list.getBoundingClientRect();
    const stepTriggers: number[] = [];

    for (const step of stepRefs.current) {
      if (!step) continue;

      const card = step.querySelector<HTMLElement>("[data-process-card]");
      if (!card) continue;

      const cardRect = card.getBoundingClientRect();
      stepTriggers.push(
        cardRect.top - listRect.top + cardRect.height * 0.4,
      );
    }

    if (stepTriggers.length === 0) return;

    const firstIcon = firstStep.querySelector<HTMLElement>("[data-process-icon]");
    const lastIcon = lastStep.querySelector<HTMLElement>("[data-process-icon]");

    if (!firstIcon || !lastIcon) return;

    const firstRect = firstIcon.getBoundingClientRect();
    const lastRect = lastIcon.getBoundingClientRect();

    const firstCenterY =
      firstRect.top - listRect.top + firstRect.height / 2;
    const lineEndY = lastRect.top - listRect.top + lastRect.height / 2;
    const centerX = firstRect.left - listRect.left + firstRect.width / 2;

    const next: TimelineMetrics = {
      left: centerX,
      top: firstCenterY,
      height: Math.max(lineEndY - firstCenterY, 0),
      lineEndY,
      stepTriggers,
    };

    metricsRef.current = next;
    setLineMetrics((prev) => (metricsEqual(prev, next) ? prev : next));
    scheduleActiveUpdate();
  }, [scheduleActiveUpdate]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    updateLineMetrics();

    const list = listRef.current;
    if (!list) return;

    const observer = new ResizeObserver(() => updateLineMetrics());
    observer.observe(list);
    window.addEventListener("resize", updateLineMetrics);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLineMetrics);
    };
  }, [updateLineMetrics]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const list = listRef.current;
    const progressFill = progressFillRef.current;
    if (!list || !progressFill) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set(progressFill, {
      scaleY: reducedMotion ? 1 : 0,
      transformOrigin: "top center",
    });

    if (reducedMotion) {
      setActiveIndexSafeRef.current(processSteps.length - 1);
      return;
    }

    const lastStepEl = stepRefs.current[processSteps.length - 1];
    const lastIconEl = lastStepEl?.querySelector<HTMLElement>(
      "[data-process-icon]",
    );

    const fillTween = gsap.to(progressFill, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: list,
        start: "top 55%",
        ...(lastIconEl
          ? { endTrigger: lastIconEl, end: "center 55%" }
          : { end: "bottom 45%" }),
        scrub: 0.45,
        onUpdate: (self) => {
          if (self.progress <= 0) {
            setActiveIndexSafeRef.current(-1);
            return;
          }

          if (self.progress >= 0.995) {
            setActiveIndexSafeRef.current(processSteps.length - 1);
            return;
          }

          scheduleActiveUpdateRef.current();
        },
      },
    });

    ScrollTrigger.refresh();

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      fillTween.scrollTrigger?.kill();
      fillTween.kill();
    };
  }, []);

  useEffect(() => {
    if (!lineMetrics) return;
    ScrollTrigger.refresh();
  }, [lineMetrics]);

  return (
    <div ref={timelineRef} className="relative w-full">
      <div
        className="pointer-events-none absolute z-10 w-px -translate-x-1/2"
        style={{
          left: lineMetrics?.left ?? 44,
          top: lineMetrics?.top ?? 44,
          height: lineMetrics?.height ?? 0,
          opacity: lineMetrics ? 1 : 0,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-stripe" />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            ref={progressFillRef}
            className="absolute inset-0 rounded-full bg-foreground will-change-transform"
          />
        </div>
      </div>

      <div ref={listRef} className="relative flex flex-col gap-4">
        {processSteps.map((step, index) => (
          <ProcessStepRow
            key={step.id}
            {...step}
            state={getStepState(index, activeIndex)}
            stepRef={(node) => {
              stepRefs.current[index] = node;
            }}
          />
        ))}
      </div>
    </div>
  );
}
