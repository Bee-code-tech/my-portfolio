import Image from "next/image";
import Link from "next/link";
import { HeroHeading } from "@/components/hero/HeroHeading";
import { HeroStats } from "@/components/hero/HeroStatsClient";
import { LogoMarquee } from "@/components/hero/LogoMarquee";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="scroll-mt-24 pt-8 pb-12 min-[810px]:pt-24 min-[810px]:pb-12 min-[1200px]:pb-24"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 pb-12 min-[810px]:gap-16 min-[810px]:px-6 min-[810px]:pb-12 min-[1200px]:gap-12">
        <div className="hero-enter hero-enter-card relative overflow-hidden rounded-[32px] bg-linear-to-r from-[#edeef1] from-60% to-[#c9cdd2] px-6 pt-10 pb-[300px] min-[810px]:overflow-visible min-[810px]:px-12 min-[810px]:py-20 min-[810px]:pb-20 min-[1200px]:min-h-[560px] min-[1200px]:p-24">
          <div className="relative z-10 flex w-full flex-col gap-12 min-[810px]:gap-20 min-[1200px]:max-w-[50%] min-[1200px]:min-h-[420px] min-[1200px]:justify-between min-[1200px]:gap-10">
            <div className="flex w-full flex-col items-center min-[810px]:items-start min-[810px]:gap-5">
              <div className="hero-enter hero-enter-content flex w-full flex-col items-center min-[810px]:items-start min-[810px]:gap-5">
                <HeroHeading
                  lines={[
                    { text: "Al-Ameen ", className: "text-foreground" },
                    { text: "Babawale", className: "text-muted" },
                  ]}
                  className="flex flex-col gap-0 text-center font-heading text-5xl font-semibold leading-[0.92] tracking-tight min-[810px]:text-left min-[810px]:text-5xl min-[1200px]:text-6xl min-[1400px]:text-7xl"
                />

                <p className="hero-enter hero-enter-tagline mx-auto max-w-xs px-2 py-4 text-center text-base leading-relaxed text-foreground-muted min-[810px]:mx-0 min-[810px]:max-w-md min-[810px]:py-0 min-[810px]:text-left min-[810px]:text-lg">
                  {siteConfig.tagline}
                </p>
              </div>

              <div className="hero-enter hero-enter-actions mx-auto flex w-full max-w-sm flex-col gap-3 pt-1 min-[810px]:mx-0 min-[810px]:max-w-none min-[810px]:flex-row min-[810px]:flex-wrap min-[810px]:justify-start min-[810px]:gap-4 min-[810px]:pt-0">
                <Link
                  href="/portfolio"
                  className="w-full rounded-full bg-foreground px-6 py-4 text-center text-sm font-medium text-card transition-opacity hover:opacity-90 min-[810px]:w-auto min-[810px]:py-3.5"
                >
                  View projects
                </Link>
                <Link
                  href="/contact"
                  className="w-full rounded-full border border-border bg-card px-6 py-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface min-[810px]:w-auto min-[810px]:py-3.5"
                >
                  Get in touch
                </Link>
              </div>
            </div>

            <HeroStats />
          </div>

          <div className="absolute right-[-52px] bottom-0 h-[400px] w-[358px] overflow-visible rounded-br-[32px] min-[810px]:right-0 min-[810px]:top-[-90px] min-[810px]:bottom-0 min-[810px]:h-auto min-[810px]:w-[min(576px,46%)]">
            <div className="relative h-full w-full min-[810px]:absolute min-[810px]:inset-0">
              <Image
                src="/portrait.webp"
                alt={siteConfig.name}
                fill
                priority
                sizes="(max-width: 809px) 358px, 576px"
                className="rounded-br-[32px] object-cover object-top"
              />
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-auto z-20 flex w-[min(340px,calc(100%-48px))] flex-row items-end gap-3 rounded-2xl border border-[#ffffff4d] bg-[#ffffff33] px-5 py-4 backdrop-blur-sm [-webkit-backdrop-filter:blur(8px)] min-[810px]:bottom-12 min-[810px]:left-auto min-[810px]:right-12 min-[810px]:w-[min(400px,calc(100%-96px))] min-[810px]:gap-6 min-[810px]:px-6 min-[810px]:pt-6 min-[810px]:pb-7">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 min-[700px]:gap-1">
              <p className="text-xs text-[#61646b] min-[700px]:text-sm min-[700px]:text-white/60">
                Select project
              </p>
              <h3 className="text-base font-semibold leading-snug text-foreground min-[700px]:text-lg min-[810px]:text-white">
                Available for projects
              </h3>
              <p className="hidden text-sm leading-relaxed text-foreground-muted min-[700px]:block min-[700px]:text-white/80">
                Share a few details, and I&apos;ll get back with a clear
                response.
              </p>
            </div>
            <div className="hero-enter hero-enter-badge shrink-0">
              <Link
                href="/contact"
                aria-label="Start a project"
                className="block rounded-xl bg-white p-2.5 text-foreground transition-opacity hover:opacity-90 min-[810px]:p-3"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 min-[810px]:h-6 min-[810px]:w-6"
                  aria-hidden
                >
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-enter hero-enter-marquee">
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
