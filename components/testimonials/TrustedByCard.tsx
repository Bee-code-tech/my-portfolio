import Image from "next/image";

type TrustedByCardProps = {
  label: string;
  avatars: string[];
  className?: string;
};

export function TrustedByCard({
  label,
  avatars,
  className = "",
}: TrustedByCardProps) {
  return (
    <div
      className={`flex w-full shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 ${className}`}
    >
      <div className="relative flex h-9 shrink-0 items-center">
        {avatars.slice(0, 4).map((avatar, index) => (
          <div
            key={avatar}
            className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-card shadow-[0_4px_8px_-4px_#c9cdd2,0_12px_18px_-2px_#c9cdd2]"
            style={{ marginLeft: index === 0 ? 0 : -12, zIndex: avatars.length - index }}
          >
            <Image
              src={avatar}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <h6 className="font-heading text-base font-semibold text-foreground">
        {label}
      </h6>
    </div>
  );
}
