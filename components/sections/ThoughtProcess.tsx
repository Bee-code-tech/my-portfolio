import { ProcessTimeline } from "@/components/process/ProcessTimeline";

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

export function ThoughtProcess() {
  return (
    <section id="thought-process" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12 min-[810px]:flex-row min-[810px]:items-start min-[810px]:gap-16 min-[1200px]:gap-24">
          <div className="max-w-[420px] shrink-0 min-[810px]:sticky min-[810px]:top-32 min-[810px]:self-start lg:top-[164px]">
            <span className="inline-flex rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-foreground">
              Process
            </span>
            <div className="mt-4 flex items-start gap-3">
              <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                How the process flows with clarity
              </h2>
              <ArrowUpIcon className="mt-1.5 h-5 w-5 shrink-0 text-muted md:mt-2 md:h-6 md:w-6" />
            </div>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              A clear and collaborative workflow that moves each project from
              first idea to production-ready launch.
            </p>
          </div>

          <div className="w-full min-[810px]:w-1/2 min-[810px]:shrink-0">
            <ProcessTimeline />
          </div>
        </div>
      </div>
    </section>
  );
}
