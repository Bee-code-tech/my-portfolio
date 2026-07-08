import { WhyMeGrid } from "@/components/why-me/WhyMeGrid";
import { SectionShell } from "@/components/ui/SectionShell";

export function WhyMe() {
  return (
    <SectionShell
      id="why-me"
      label="Why choose me"
      title="Engineering built around lasting clarity"
      description="I bring product thinking, system design, and production-ready execution together to ship software that's scalable, maintainable, and built to last."
    >
      <WhyMeGrid />
    </SectionShell>
  );
}
