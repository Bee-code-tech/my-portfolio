import { CompanyLogo } from "@/components/hero/CompanyLogo";
import { companyLogos } from "@/lib/companies";

type LogoMarqueeProps = {
  className?: string;
};

const REPEAT_COUNT = 6;

export function LogoMarquee({ className }: LogoMarqueeProps) {
  const half = Array.from({ length: REPEAT_COUNT }, () => companyLogos).flat();
  const items = [...half, ...half];

  return (
    <div
      className={`logo-marquee relative w-full overflow-hidden ${className ?? ""}`}
      aria-label="Companies I've worked with"
    >
      <div className="logo-marquee-track flex w-max items-center gap-16">
        {items.map((company, index) => (
          <div
            key={`${company.id}-${index}`}
            className="relative shrink-0"
            style={{ width: company.width, height: company.height }}
            aria-hidden={index >= half.length}
          >
            <CompanyLogo id={company.id} className="h-full w-full" />
            {index < companyLogos.length ? (
              <span className="sr-only">{company.name}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
