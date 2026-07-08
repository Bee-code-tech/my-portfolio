"use client";

import dynamic from "next/dynamic";

export const HeroStats = dynamic(
  () => import("@/components/hero/HeroStats").then((mod) => mod.HeroStats),
  { ssr: false },
);
