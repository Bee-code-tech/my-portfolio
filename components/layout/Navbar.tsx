"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";

function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface md:hidden"
    >
      <span className="relative block h-3.5 w-5">
        <span
          className={`absolute left-0 block h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "top-[6px] rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute left-0 top-[6px] block h-0.5 w-5 rounded-full bg-foreground transition-all duration-200 ease-out ${
            open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 block h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "top-[6px] -rotate-45" : "top-3"
          }`}
        />
      </span>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPill, setIsPill] = useState(true);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const accordion = accordionRef.current;
    if (!accordion) return;

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== accordion || event.propertyName !== "grid-template-rows") {
        return;
      }

      if (!menuOpen) {
        setIsPill(true);
      }
    };

    accordion.addEventListener("transitionend", onTransitionEnd);
    return () => accordion.removeEventListener("transitionend", onTransitionEnd);
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) {
        setMenuOpen(false);
        setIsPill(true);
      }
    };

    closeOnDesktop();
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }

    setIsPill(false);
    setMenuOpen(true);
  };

  const desktopWrapped = scrolled;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        className={`mx-auto flex w-full max-w-6xl flex-col border border-border bg-card px-5 py-3 shadow-[0_4px_24px_rgba(18,18,24,0.06)] transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:rounded-full md:px-6 md:py-3.5 ${
          isPill ? "rounded-full" : "rounded-[1.75rem]"
        } ${
          desktopWrapped
            ? ""
            : "md:border-transparent md:bg-transparent md:shadow-none"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl"
          >
            {siteConfig.brand}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-card transition-opacity hover:opacity-90 md:inline-flex"
            >
              {siteConfig.availability.cta}
            </Link>

            <HamburgerButton open={menuOpen} onClick={toggleMenu} />
          </div>
        </div>

        <div
          ref={accordionRef}
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border/60 pt-3 pb-1">
              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <li
                    key={link.href}
                    className={`transform transition-[opacity,transform] duration-300 ease-out ${
                      menuOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-2 opacity-0"
                    }`}
                    style={{
                      transitionDelay: menuOpen ? `${80 + index * 45}ms` : "0ms",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-2 py-3 text-base font-medium text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div
                className={`mt-2 transform px-2 pb-2 transition-[opacity,transform] duration-300 ease-out ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen
                    ? `${80 + navLinks.length * 45}ms`
                    : "0ms",
                }}
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-card transition-opacity hover:opacity-90"
                >
                  {siteConfig.availability.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
