"use client";

import { WhyMeCountStat } from "@/components/why-me/WhyMeCountStat";
import { AnimatedShaderBackground } from "@/components/ui/AnimatedShaderBackground";
import { whyMeDarkCard, whyMeStats } from "@/lib/why-me";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 62 58"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M31 0L38.09 21.09H60.78L42.84 34.14L49.93 55.23L31 42.18L12.07 55.23L19.16 34.14L1.22 21.09H23.91L31 0Z" />
    </svg>
  );
}

function StatCard({
  description,
  value,
  suffix,
  label,
  className = "",
}: (typeof whyMeStats)[number] & { className?: string }) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-border bg-card p-6 ${className}`}
    >
      <p className="max-w-[280px] text-base leading-relaxed text-foreground">
        {description}
      </p>
      <WhyMeCountStat
        value={value}
        suffix={suffix}
        label={label}
        useStatFont
      />
    </div>
  );
}

export function WhyMeGrid() {
  return (
    <div className="flex flex-col gap-2 min-[1200px]:flex-row min-[1200px]:items-stretch">
      <div className="flex flex-1 flex-col gap-2 min-[810px]:min-h-[388px] min-[810px]:flex-row min-[810px]:items-stretch">
        <div className="flex min-h-[248px] flex-1 min-[810px]:min-h-0">
          <StatCard {...whyMeStats[0]} className="h-full w-full" />
        </div>

        <div className="flex flex-1 flex-col gap-2 min-[810px]:min-h-0">
          <StatCard {...whyMeStats[1]} className="min-h-[248px] flex-1 min-[810px]:min-h-0" />
          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-border bg-card px-6 py-5">
            <span
              className="h-3 w-3 shrink-0 rounded-full bg-accent-soft"
              aria-hidden
            />
            <h6 className="font-heading text-base font-semibold text-foreground">
              Available for projects
            </h6>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-between gap-16 overflow-hidden rounded-2xl border border-foreground bg-linear-to-b from-[#24242a] to-[#121218] p-6 shadow-[0_4px_8px_-4px_#94979e,0_12px_18px_-2px_#94979e,inset_0_1px_0_1px_#44454c] min-[810px]:gap-20 min-[810px]:p-8 min-[1200px]:w-[40%] min-[1200px]:self-stretch min-[1200px]:gap-24 min-[1200px]:p-8">
        <AnimatedShaderBackground />

        <p className="relative z-10 max-w-md text-base leading-relaxed text-[#c9cdd2]">
          {whyMeDarkCard.description}
        </p>

        <div className="relative z-10 flex flex-col gap-4">
          <WhyMeCountStat
            value={whyMeDarkCard.rating}
            decimals={1}
            valueClassName="text-white"
          />
          <div className="flex flex-col gap-1.5 pb-1.5">
            <div className="flex items-center gap-1 text-[#ffb800]">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="h-2.5 w-2.5" />
              ))}
            </div>
            <p className="text-sm text-[#94979e]">{whyMeDarkCard.trustLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
