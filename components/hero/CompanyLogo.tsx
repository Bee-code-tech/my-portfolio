type CompanyLogoProps = {
  id: (typeof import("@/lib/companies").companyLogos)[number]["id"];
  className?: string;
};

export function CompanyLogo({ id, className = "h-full w-full" }: CompanyLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/logos/${id}.svg`}
      alt=""
      className={className}
      aria-hidden
      draggable={false}
    />
  );
}
