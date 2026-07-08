import Image from "next/image";
import Link from "next/link";
import type { Testimonial } from "@/lib/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({
  testimonial,
  className = "",
}: TestimonialCardProps) {
  return (
    <article
      className={`group flex min-h-0 flex-col justify-between rounded-2xl border border-border bg-card p-5 ${className}`}
    >
      <p className="text-sm leading-relaxed text-foreground min-[810px]:text-[15px]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-4 flex items-center gap-3">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
          <Image
            src={testimonial.avatar}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="truncate text-sm text-muted">{testimonial.role}</p>
          {testimonial.link && (
            <Link
              href={testimonial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-heading text-sm font-semibold text-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              See on X →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
