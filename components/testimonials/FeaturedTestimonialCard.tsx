"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedShaderBackground } from "@/components/ui/AnimatedShaderBackground";
import type { Testimonial } from "@/lib/testimonials";

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

type FeaturedTestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function FeaturedTestimonialCard({
  testimonial,
  className = "",
}: FeaturedTestimonialCardProps) {
  return (
    <article
      className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-foreground bg-linear-to-b from-[#24242a] to-[#121218] p-5 min-[810px]:min-h-0 min-[810px]:flex-1 ${className}`}
    >
      <AnimatedShaderBackground />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-1 text-[#ffb800]">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className="h-2.5 w-2.5" />
          ))}
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[#c9cdd2] min-[810px]:text-[15px]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="relative z-10 mt-4 flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/40">
          <Image
            src={testimonial.avatar}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base font-semibold text-[#c9cdd2]">
            {testimonial.name}
          </p>
          <p className="truncate text-sm text-[#94979e]">{testimonial.role}</p>
          {testimonial.link && (
            <Link
              href={testimonial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-heading text-sm font-semibold text-[#c9cdd2] opacity-0 transition-opacity group-hover:opacity-100"
            >
              See on X →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
