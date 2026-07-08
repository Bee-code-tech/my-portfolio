import type { ReactNode } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/contact/ContactIcons";
import { AnimatedShaderBackground } from "@/components/ui/AnimatedShaderBackground";
import { contactConfig } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

function IconPill({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#24242a] text-white shadow-[inset_0_1px_0_0_#44454c]">
      {children}
    </div>
  );
}

function SidebarRow({
  icon,
  title,
  children,
  href,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex w-full items-start gap-4">
      <IconPill>{icon}</IconPill>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium text-[#94979e]">{title}</p>
        <div className="text-sm text-white">{children}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}

function Divider() {
  return <div className="h-px w-full bg-[#24242a]" aria-hidden />;
}

export function ContactSidebar() {
  return (
    <aside
      className="relative flex w-full max-w-[560px] flex-1 flex-col justify-between gap-8 overflow-visible rounded-3xl border border-[#121218] bg-linear-to-b from-[#24242a] to-[#121218] p-10 shadow-[0_4px_8px_-4px_#94979e,0_12px_18px_-2px_#94979e,inset_0_1px_0_1px_#44454c] lg:p-12"
    >
      <AnimatedShaderBackground roundedClassName="rounded-3xl" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-start gap-4">
          <IconPill>
            <CalendarIcon className="h-5 w-5" />
          </IconPill>
          <div className="space-y-1">
            <h2 className="font-heading text-lg font-semibold text-white">
              {contactConfig.availabilityTitle}
            </h2>
            <p className="text-sm text-[#94979e]">
              {contactConfig.availabilityNote}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-5">
        <SidebarRow
          icon={<MailIcon className="h-5 w-5" />}
          title={contactConfig.emailLabel}
          href={`mailto:${siteConfig.email}`}
        >
          {siteConfig.email}
        </SidebarRow>

        <Divider />

        <SidebarRow
          icon={<MapPinIcon className="h-5 w-5" />}
          title={contactConfig.locationLabel}
        >
          {contactConfig.location}
        </SidebarRow>

        <Divider />

        <SidebarRow
          icon={<ClockIcon className="h-5 w-5" />}
          title={contactConfig.responseTimeLabel}
        >
          {contactConfig.responseTime}
        </SidebarRow>
      </div>
    </aside>
  );
}
