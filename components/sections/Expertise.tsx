import { ExpertiseCarousel } from "@/components/expertise/ExpertiseCarousel";
import { SectionShell } from "@/components/ui/SectionShell";

export function Expertise() {
  return (
    <SectionShell
      id="expertise"
      label="Expertise"
      title="What I build"
      description="Full stack engineering across web, mobile, AI, and Web3 — from architecture through production deployment."
    >
      <ExpertiseCarousel />
    </SectionShell>
  );
}
