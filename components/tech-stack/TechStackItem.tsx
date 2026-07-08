import type { TechItem } from "@/lib/tech-stack";

export function TechStackItem({ name, icon: Icon }: TechItem) {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card shadow-[0_4px_8px_-4px_#c9cdd2,0_12px_18px_-2px_#c9cdd2]">
        <Icon className="h-6 w-6 text-foreground" aria-hidden />
      </div>
      <span className="text-base text-foreground-muted">{name}</span>
    </div>
  );
}
