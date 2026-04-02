"use client";

import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { label: "대표시술", href: "#procedures" },
  { label: "시술안내", href: "#services" },
  { label: "의료진", href: "#doctor" },
  { label: "병원시설", href: "#facility" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/98 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        {/* Navigation links row */}
        <nav className="mx-auto hidden max-w-6xl items-center justify-between px-6 lg:flex lg:h-[42px]">
          <ul className="flex items-center gap-0">
            {NAV_LINKS.slice(0, 2).map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className="relative px-4 py-2 text-[13px] font-normal tracking-wide text-light-gray transition-colors duration-200 hover:text-charcoal after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:after:w-3/4"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-0">
            {NAV_LINKS.slice(2).map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className="relative px-4 py-2 text-[13px] font-normal tracking-wide text-light-gray transition-colors duration-200 hover:text-charcoal after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:after:w-3/4"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Separator line */}
        <div className="hidden border-b border-border lg:block" />

        {/* Logo area */}
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            scrolled ? "h-[50px]" : "h-[70px]"
          }`}
        >
          {/* Mobile hamburger — left */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="absolute left-5 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-[1.5px] w-5 rounded-full bg-charcoal transition-all duration-300 ${
                mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 rounded-full bg-charcoal transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 rounded-full bg-charcoal transition-all duration-300 ${
                mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>

          {/* Center logo */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#")}
            className="flex flex-col items-center leading-tight"
          >
            <span
              className={`font-serif tracking-[0.3em] font-light transition-all duration-300 ${
                scrolled ? "text-xl" : "text-2xl"
              } text-charcoal`}
            >
              NOH
            </span>
            <span className="text-[9px] font-light tracking-[0.35em] text-light-gray uppercase">
              Plastic Surgery
            </span>
          </a>
        </div>

        {/* Bottom border of logo area */}
        <div className="border-b border-border" />
      </header>

      {/* Spacer to push content below fixed header */}
      <div className={`${scrolled ? "h-[50px]" : "h-[70px]"} transition-all duration-300 lg:h-[112px] ${scrolled ? "lg:h-[92px]" : ""}`} />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-down panel */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Mobile header with close button */}
        <div className="flex h-[60px] items-center justify-between border-b border-border px-5">
          <span className="font-serif text-lg tracking-[0.3em] font-light text-charcoal">
            NOH
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="메뉴 닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile links */}
        <ul className="px-6 py-4">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className="block border-b border-border/50 py-4 text-[14px] font-light tracking-wider text-charcoal transition-colors duration-200 hover:text-gold"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile phone number */}
        <div className="border-t border-border px-6 py-5">
          <a
            href="tel:024709114"
            className="flex items-center gap-3 text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-[14px] font-medium tracking-wider">02-470-9114</span>
          </a>
        </div>
      </div>
    </>
  );
}
