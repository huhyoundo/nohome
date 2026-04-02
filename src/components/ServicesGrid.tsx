"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const services = [
  {
    title: "눈성형",
    desc: "쌍꺼풀, 눈매교정, 상·하안검, 재수술",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M4 20C4 20 10 10 20 10C30 10 36 20 36 20C36 20 30 30 20 30C10 30 4 20 4 20Z"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="4" stroke="#c9a84c" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "코성형",
    desc: "콧대, 코끝, 비중격, 재수술",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 6V28"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 32C14 28 16 26 20 26C24 26 26 28 26 32"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 34C14 32 16 32 20 32C24 32 26 32 28 34"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "가슴성형",
    desc: "보형물, 지방이식, 거상, 재수술",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M8 16C8 10 14 8 20 14C26 8 32 10 32 16C32 24 20 34 20 34C20 34 8 24 8 16Z"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    title: "안면윤곽",
    desc: "광대, 사각턱, 이마·턱 보형물",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M12 8C8 14 8 24 14 32C16 34 18 36 20 36C22 36 24 34 26 32C32 24 32 14 28 8"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M12 8C14 6 18 5 20 5C22 5 26 6 28 8"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "동안성형",
    desc: "실리프팅, 안면거상, 필러/보톡스",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="18" r="10" stroke="#c9a84c" strokeWidth="2" fill="none" />
        <path
          d="M14 16C14 16 16 14 20 14C24 14 26 16 26 16"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 22C16 22 18 24 20 24C22 24 24 22 24 22"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 28V34"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 31L20 34L24 31"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "재수술",
    desc: "눈·코·가슴 재수술 전문",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M28 12L12 28"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 12L28 28"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="14" stroke="#c9a84c" strokeWidth="2" fill="none" />
        <path
          d="M30 14L34 10M10 30L6 34"
          stroke="#c9a84c"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32 12L36 8"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function ServicesGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" ref={ref} className="w-full bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* ── Section header ── */}
        <div className="mb-14 text-center">
          <motion.span
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mb-4 inline-block text-xs font-semibold tracking-[0.2em] text-gold"
          >
            PROCEDURES
          </motion.span>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mb-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: "'Playfair Display', 'Noto Serif KR', serif",
            }}
          >
            시술 안내
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-base text-white/60"
          >
            25년 경험으로 완성한 전문 시술
          </motion.p>
        </div>

        {/* ── 3x2 grid (2x3 on mobile) ── */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={3 + i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group relative rounded-xl border-t-2 border-gold bg-[#1e1e2a] px-5 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] sm:px-7 sm:py-10"
            >
              <div className="mb-5">{s.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
