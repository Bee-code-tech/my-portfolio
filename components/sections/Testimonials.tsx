import { TestimonialsPanel } from "@/components/testimonials/TestimonialsPanel";

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start gap-8 min-[810px]:flex-row min-[810px]:items-end min-[810px]:justify-between">
          <div className="flex max-w-[420px] flex-col gap-2">
            <span className="inline-flex w-fit rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-foreground">
              Testimonials
            </span>
            <div className="flex items-start gap-3">
              <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                What clients say
              </h2>
              <ArrowUpIcon className="mt-1.5 h-5 w-5 shrink-0 text-muted md:mt-2 md:h-6 md:w-6" />
            </div>
          </div>

          <p className="max-w-[480px] text-lg leading-relaxed text-foreground-muted min-[810px]:pb-1">
            Thoughtful feedback from founders and teams who trusted the
            process, direction, and final result.
          </p>
        </div>

        <div className="mt-12">
          <TestimonialsPanel />
        </div>
      </div>
    </section>
  );
}
