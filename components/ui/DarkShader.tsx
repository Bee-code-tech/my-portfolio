"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  CursorRipples,
  FlowingGradient,
  LinearGradient,
  Shader,
} from "shaders/react";

function ShaderLayers() {
  return (
    <Shader className="h-full w-full">
      <CursorRipples intensity={12} radius={0.5} decay={8} chromaticSplit={0.8}>
        <LinearGradient
          colorA="#1a1a20"
          colorB="#0a0a0e"
          angle={160}
          colorSpace="oklch"
        />
        <FlowingGradient
          colorA="#0a0a0e"
          colorB="#3a3a44"
          colorC="#1a1a22"
          colorD="#08080c"
          speed={0.3}
          distortion={0.55}
          opacity={0.65}
        />
      </CursorRipples>
    </Shader>
  );
}

export function DarkShader() {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reduceMotion) {
    return (
      <div
        className="h-full w-full bg-linear-to-b from-[#24242a] to-[#121218]"
        aria-hidden
      />
    );
  }

  return <ShaderLayers />;
}

export const DarkShaderLazy = dynamic(
  () => Promise.resolve({ default: DarkShader }),
  { ssr: false },
);
