import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Babawale Al-Ameen — SaaS platforms, enterprise dashboards, mobile apps, and production systems built with React, Next.js, and TypeScript.",
};

export default function PortfolioPage() {
  return (
    <PageLayout>
      <PageHeader
        label="Portfolio"
        title="Shipped work"
        description="Production systems and products built end to end for teams that need to move fast."
      />
      <div className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <ProjectGrid projects={projects} showDescription />
        </div>
      </div>
    </PageLayout>
  );
}
