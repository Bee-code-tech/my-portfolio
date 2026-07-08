import type { Project } from "@/lib/projects";

type ProjectGridProps = {
  projects: Project[];
  showDescription?: boolean;
};

export function ProjectGrid({
  projects,
  showDescription = false,
}: ProjectGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.name}
          className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
        >
          <div className="aspect-4/3 rounded-xl bg-surface" />
          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground">{project.name}</h3>
              <p className="mt-1 text-sm text-muted">{project.category}</p>
            </div>
            <span className="text-sm text-muted">{project.year}</span>
          </div>
          {showDescription && (
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {project.description}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
