"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 25, suffix: "+", label: "년 경력" },
  { value: 10000, suffix: "+", label: "건 수술" },
  { value: 4, suffix: "", label: "개 병원 역임" },
  { value: 98, suffix: "%", label: "만족도" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

/* ── easeOutExpo: dramatic slow-down near the end ── */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ── Counter with easeOutExpo easing ── */
function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2200;
    const startTime = performance.now();

    let rafId: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target]);

  return (
    <span>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

/* ── Animated gold line that draws from center outward ── */
function DrawLine({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="h-full w-full origin-center bg-gold/30"
      />
    </div>
  );
}

/* ── Animated background pattern ── */
function BackgroundPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="stats-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 40"
              stroke="rgba(201,168,76,0.06)"
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#stats-grid)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    </div>
  );
}

/* ── Single stat card with hover interaction ── */
function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: StatItem;
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="cursor-default text-center"
    >
      <motion.div
        animate={hovered ? { scale: 1.08 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
      >
        <motion.p
          className="mb-1 text-4xl font-semibold text-gold sm:text-5xl lg:text-6xl"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
          animate={
            hovered
              ? {
                  color: [
                    "rgb(201,168,76)",
                    "rgb(212,182,94)",
                    "rgb(201,168,76)",
                  ],
                }
              : { color: "rgb(201,168,76)" }
          }
          transition={
            hovered
              ? { duration: 0.6, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          <AnimatedCounter
            target={stat.value}
            suffix={stat.suffix}
            isInView={isInView}
          />
        </motion.p>
        <p className="text-sm tracking-wide text-charcoal/60">{stat.label}</p>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════════════════════════ */
export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative w-full bg-cream">
      <BackgroundPattern />

      {/* Top gold line — draws from center */}
      <DrawLine isInView={isInView} />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Bottom gold line — draws from center */}
      <DrawLine isInView={isInView} />
    </section>
  );
}
