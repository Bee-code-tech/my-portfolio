import type { ReactNode } from "react";
import Link from "next/link";
import { FooterBrandMark } from "@/components/layout/FooterBrandMark";
import { pageLinks, siteConfig, socialLinks } from "@/lib/site";

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "text-sm text-muted transition-colors hover:text-foreground hover:underline";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-8 pt-16 min-[810px]:px-6 min-[1200px]:pt-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="rounded-3xl border border-border bg-surface p-2">
          <div className="relative overflow-visible rounded-2xl border border-border bg-card shadow-[0_4px_8px_-4px_#c9cdd2,0_12px_18px_-2px_#c9cdd2]">
            <div className="relative flex flex-col gap-12 px-8 pt-12 pb-36 min-[810px]:grid min-[810px]:grid-cols-2 min-[810px]:gap-12 min-[810px]:px-12 min-[810px]:pb-48 min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:gap-24 min-[1200px]:px-12 min-[1200px]:pb-64 min-[1200px]:pt-[49px]">
              <div className="relative z-10 min-w-0 min-[1200px]:min-w-[560px] min-[1200px]:flex-1">
                <Link
                  href="/"
                  className="inline-flex w-fit font-heading text-xl font-semibold tracking-tight text-[#1b1b21] transition-opacity hover:opacity-80 min-[810px]:text-2xl"
                >
                  {siteConfig.brand}
                </Link>

                <p className="mt-4 max-w-[420px] text-base leading-relaxed text-foreground-muted">
                  {siteConfig.tagline}
                </p>
              </div>

              <div className="relative z-10 flex flex-col gap-5 min-[1200px]:flex-1">
                <p className="text-sm font-medium text-foreground">Pages</p>
                <ul className="flex flex-col gap-4">
                  <li>
                    <FooterLink href="/">Home</FooterLink>
                  </li>
                  {pageLinks.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 flex flex-col gap-5 min-[810px]:col-start-2 min-[1200px]:col-start-auto min-[1200px]:flex-1">
                <p className="text-sm font-medium text-foreground">Social</p>
                <ul className="flex flex-col gap-4">
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href} external>
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <FooterBrandMark />

            <div className="relative z-20 border-t border-[#121218] bg-linear-to-b from-[#24242a] to-[#121218] px-8 py-6 shadow-[inset_0_1px_0_1px_#44454c] min-[810px]:px-12">
              <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between">
                <p className="text-sm text-[#c9cdd2]">
                  © {year} {siteConfig.author}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
