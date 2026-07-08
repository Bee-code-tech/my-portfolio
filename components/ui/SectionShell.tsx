import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  label: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

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

export function SectionShell({
  id,
  label,
  title,
  description,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <span className="inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground">
          {label}
        </span>
        <div className="mt-4 flex items-start gap-3">
          <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <ArrowUpIcon className="mt-1.5 h-5 w-5 shrink-0 text-muted md:mt-2 md:h-6 md:w-6" />
        </div>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {description}
          </p>
        )}
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
