import type { CSSProperties } from "react";

type HeroHeadingProps = {
  lines: ReadonlyArray<{
    readonly text: string;
    readonly className?: string;
  }>;
  className?: string;
};

export function HeroHeading({ lines, className }: HeroHeadingProps) {
  let charIndex = 0;

  return (
    <h1 className={className}>
      {lines.map((line) => (
        <span key={line.text} className={line.className}>
          {line.text.split("").map((char) => {
            const index = charIndex++;
            return (
              <span
                key={`${line.text}-${index}`}
                className="hero-enter hero-enter-letter inline-block"
                style={
                  {
                    "--hero-i": index,
                    whiteSpace: char === " " ? "pre" : undefined,
                  } as CSSProperties
                }
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
