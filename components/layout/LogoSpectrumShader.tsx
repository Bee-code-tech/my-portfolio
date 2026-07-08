"use client";

import { useEffect, useRef, useState } from "react";
import {
  createLogoHeightmap,
  createTextSourceImage,
  resolveHeadingFontFamily,
} from "@/lib/shaders/createLogoHeightmap";
import { LogoSpectrumRenderer } from "@/lib/shaders/logoSpectrumRenderer";

const BRAND_TEXT = "TheTechOD";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function buildRenderer(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  const pixelWidth = Math.max(640, Math.round(width * 2));
  const pixelHeight = Math.max(
    Math.round(height * 2),
    Math.round(pixelWidth / 5.2),
  );
  const source = createTextSourceImage(
    BRAND_TEXT,
    resolveHeadingFontFamily(),
    pixelWidth,
    pixelHeight,
  );
  const heightmap = createLogoHeightmap(source);

  if (!heightmap) return null;

  return new LogoSpectrumRenderer(canvas, heightmap);
}

export function LogoSpectrumShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<LogoSpectrumRenderer | null>(null);
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window === "undefined" ? false : prefersReducedMotion(),
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      rendererRef.current?.dispose();
      rendererRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;
    let resizeFrame = 0;

    const mountRenderer = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width < 1 || height < 1) return;

      rendererRef.current?.dispose();
      rendererRef.current = buildRenderer(canvas, width, height) ?? null;
      rendererRef.current?.start();
    };

    const setup = async () => {
      await document.fonts.ready;
      if (cancelled) return;
      mountRenderer();

      resizeObserver = new ResizeObserver(() => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => {
          if (!cancelled) mountRenderer();
        });
      });
      resizeObserver.observe(canvas);
    };

    void setup();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(resizeFrame);
      resizeObserver?.disconnect();
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        className="flex h-full w-full items-end justify-center pb-1"
        aria-hidden
      >
        <p className="w-full text-center font-heading text-[52px] font-semibold tracking-[0.06em] text-[#121218] min-[810px]:text-[96px] min-[1200px]:text-[128px]">
          {BRAND_TEXT}
        </p>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
      aria-hidden
    />
  );
}
