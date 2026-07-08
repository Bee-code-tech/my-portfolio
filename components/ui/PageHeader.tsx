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

type PageHeaderProps = {
  label: string;
  title: string;
  description?: string;
};

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <span className="inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground">
          {label}
        </span>
        <div className="mt-4 flex items-start gap-3">
          <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <ArrowUpIcon className="mt-2 h-5 w-5 shrink-0 text-muted md:h-6 md:w-6" />
        </div>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
