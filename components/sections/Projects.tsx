import Link from "next/link";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionShell } from "@/components/ui/SectionShell";
import { projects } from "@/lib/projects";

export function Projects() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <SectionShell
      id="projects"
      label="Selected work"
      title="Shipped products"
      description="Production systems, SaaS platforms, and mobile apps built end to end."
    >
      <ProjectGrid projects={featuredProjects} />
      <div className="mt-10">
        <Link
          href="/portfolio"
          className="inline-flex rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
        >
          View all projects →
        </Link>
      </div>
    </SectionShell>
  );
}
