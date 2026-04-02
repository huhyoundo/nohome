"use client";

import { useState } from "react";

/* ── Icon SVGs (inline, no dependencies) ── */

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ── Sidebar Buttons Config ── */

const SIDEBAR_BUTTONS = [
  { icon: KakaoIcon, label: "카카오톡", href: "#kakao" },
  { icon: MonitorIcon, label: "온라인상담", href: "#consultation" },
  { icon: PhoneIcon, label: "전화", href: "tel:024709114" },
  { icon: CalendarIcon, label: "예약", href: "#booking" },
  { icon: MapPinIcon, label: "오시는길", href: "#location" },
] as const;

export default function FloatingSidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <aside
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-0 md:flex lg:right-6"
      aria-label="빠른 메뉴"
    >
      {/* Phone number box */}
      <a
        href="tel:024709114"
        className="mb-1 flex w-[52px] flex-col items-center justify-center bg-gold px-2 py-3 text-white transition-colors duration-200 hover:bg-gold-light"
        aria-label="전화 02-470-9114"
      >
        <span className="text-[11px] font-bold leading-tight tracking-wider">02</span>
        <span className="text-[11px] font-bold leading-tight tracking-wider">470</span>
        <span className="text-[11px] font-bold leading-tight tracking-wider">9114</span>
      </a>

      {/* Icon buttons */}
      {SIDEBAR_BUTTONS.map(({ icon: Icon, label, href }, index) => (
        <a
          key={label}
          href={href}
          className={`group relative flex h-[44px] w-[52px] items-center justify-center border border-t-0 transition-all duration-200 ${
            hoveredIndex === index
              ? "border-gold bg-white text-gold"
              : "border-border bg-white text-light-gray hover:border-gold hover:text-gold"
          }`}
          aria-label={label}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Icon />
          {/* Tooltip */}
          <span
            className={`pointer-events-none absolute right-[calc(100%+8px)] whitespace-nowrap rounded bg-charcoal px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
          >
            {label}
          </span>
        </a>
      ))}
    </aside>
  );
}
