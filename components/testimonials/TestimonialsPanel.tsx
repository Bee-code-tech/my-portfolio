import Link from "next/link";
import { FeaturedTestimonialCard } from "@/components/testimonials/FeaturedTestimonialCard";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { TrustedByCard } from "@/components/testimonials/TrustedByCard";
import {
  featuredTestimonial,
  liamTestimonial,
  mayaTestimonial,
  testimonialsMeta,
  trustAvatars,
} from "@/lib/testimonials";

export function TestimonialsPanel() {
  return (
    <div className="flex flex-col gap-2 min-[810px]:h-[380px] min-[810px]:flex-row min-[810px]:items-stretch">
      <FeaturedTestimonialCard
        testimonial={featuredTestimonial}
        className="min-[810px]:flex-1"
      />

      <div className="flex flex-1 flex-col gap-2">
        <TestimonialCard testimonial={mayaTestimonial} className="flex-1" />
        <TrustedByCard
          label={testimonialsMeta.trustLabel}
          avatars={trustAvatars}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Link
          href={testimonialsMeta.ctaHref}
          className="flex shrink-0 items-center justify-center rounded-2xl border border-foreground bg-linear-to-b from-[#24242a] to-[#121218] px-5 py-4 text-center shadow-[inset_0_2px_0_0_#44454c,0_2px_4px_-2px_#61646b,0_4px_8px_-4px_#61646b] transition-transform hover:-translate-y-0.5"
        >
          <span className="font-heading text-base font-semibold text-white">
            {testimonialsMeta.ctaLabel}
          </span>
        </Link>
        <TestimonialCard testimonial={liamTestimonial} className="flex-1" />
      </div>
    </div>
  );
}
