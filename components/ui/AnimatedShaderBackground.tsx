"use client";

import Image from "next/image";

type AnimatedShaderBackgroundProps = {
  roundedClassName?: string;
  className?: string;
};

export function AnimatedShaderBackground({
  roundedClassName = "rounded-2xl",
  className = "",
}: AnimatedShaderBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.43] mix-blend-luminosity select-none ${roundedClassName} ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(transparent 0%, black 40%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(transparent 0%, black 40%, black 90%, transparent 100%)",
      }}
      aria-hidden
    >
      <Image
        src="/contact-shader.gif"
        alt=""
        fill
        unoptimized
        sizes="560px"
        className={`object-cover object-center ${roundedClassName}`}
      />
    </div>
  );
}
