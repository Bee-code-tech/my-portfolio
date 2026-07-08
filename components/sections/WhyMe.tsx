import { WhyMeGrid } from "@/components/why-me/WhyMeGrid";
import { SectionShell } from "@/components/ui/SectionShell";

export function WhyMe() {
  return (
    <SectionShell
      id="why-me"
      label="Why me"
      title="Built to ship and scale"
      description="I take products from idea to production — clean architecture, reliable APIs, and software that teams can maintain."
    >
      <WhyMeGrid />
    </SectionShell>
  );
}
