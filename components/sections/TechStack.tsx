import { TechStackHeader } from "@/components/tech-stack/TechStackHeader";
import { TechStackTimeline } from "@/components/tech-stack/TechStackTimeline";

export function TechStack() {
  return (
    <section id="tech-stack" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <TechStackHeader />
        <TechStackTimeline />
      </div>
    </section>
  );
}
