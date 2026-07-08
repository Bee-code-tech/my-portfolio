import { ExpertiseCarousel } from "@/components/expertise/ExpertiseCarousel";
import { SectionShell } from "@/components/ui/SectionShell";

export function Expertise() {
  return (
    <SectionShell
      id="expertise"
      label="My Expertise"
      title="Creative services for digital brands"
      description="Focused design and development support to help brands build clearer identities, better websites, and refined product experiences."
    >
      <ExpertiseCarousel />
    </SectionShell>
  );
}
