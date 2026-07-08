"use client";

import dynamic from "next/dynamic";
import { LogoSpectrumShader } from "@/components/layout/LogoSpectrumShader";

function FooterBrandMarkInner() {
  return (
    <div
      className="pointer-events-none absolute right-8 bottom-[48px] left-8 z-0 h-[96px] min-[810px]:right-12 min-[810px]:bottom-[36px] min-[810px]:left-12 min-[810px]:h-[180px] min-[1200px]:bottom-[24px] min-[1200px]:h-[240px]"
      aria-hidden
      style={{
        WebkitMaskImage:
          "linear-gradient(0deg, rgba(0,0,0,0) 6%, rgba(0,0,0,1) 92%)",
        maskImage:
          "linear-gradient(0deg, rgba(0,0,0,0) 6%, rgba(0,0,0,1) 92%)",
      }}
    >
      <LogoSpectrumShader />
    </div>
  );
}

export const FooterBrandMark = dynamic(
  () => Promise.resolve({ default: FooterBrandMarkInner }),
  { ssr: false },
);
