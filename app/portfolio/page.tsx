import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected full-stack projects by Babawale Al-Ameen — including SaaS platforms, enterprise dashboards, mobile apps, and Web3 products built with React, Next.js, and TypeScript.",
};

export default function PortfolioPage() {
  return (
    <PageLayout>
      <PageHeader
        label="Portfolio"
        title="Selected work with clarity"
        description="A curated collection of brand, web, and product design work created for modern teams."
      />
      <div className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <ProjectGrid projects={projects} showDescription />
        </div>
      </div>
    </PageLayout>
  );
}
