"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

/* ── Sparkle floating keyframes (injected once via style tag) ── */
const sparkleCSS = `
@keyframes sparkleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
  50%      { transform: translateY(-18px) scale(1.2); opacity: 1; }
}
`;

/* ── Sparkle positions (desktop text area) ── */
const sparkles = [
  { top: "18%", left: "72%", delay: "0s", duration: "3.4s" },
  { top: "40%", left: "85%", delay: "0.8s", duration: "4.1s" },
  { top: "62%", left: "60%", delay: "1.6s", duration: "3.8s" },
  { top: "30%", left: "50%", delay: "2.2s", duration: "4.5s" },
];

/* ── Word-reveal variant ── */
const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const wordReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Simple fade variant ── */
const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease: "easeOut" as const,
    },
  }),
};

/* ── Title words ── */
const titleWords = ["아름다움의", "시작"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageDesktopRef = useRef<HTMLDivElement>(null);

  /* Parallax: image moves slower than scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  /* Scroll indicator fade-out */
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.05);
  });

  /* Mouse-follow glow (desktop only) */
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    },
    []
  );

  /* Image hover zoom */
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <>
      {/* Inject sparkle keyframes */}
      <style dangerouslySetInnerHTML={{ __html: sparkleCSS }} />

      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-warm-white"
        onMouseMove={handleMouseMove}
      >
        {/* ── Mouse-follow glow overlay (desktop) ── */}
        <div
          className="pointer-events-none absolute inset-0 z-10 hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(201,168,76,0.08), transparent 60%)`,
            transition: "background 0.15s ease",
          }}
        />

        {/* ── Mobile layout: stacked ── */}
        <div className="flex h-full flex-col md:hidden">
          {/* Mobile text area */}
          <div className="flex flex-1 flex-col justify-end px-6 pb-6 pt-24">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fade}
              className="mb-3 text-[10px] tracking-[0.3em] text-light-gray"
            >
              NOH PLASTIC SURGERY
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={wordContainer}
              className="mb-2 flex flex-wrap gap-x-2 text-3xl font-bold leading-tight text-charcoal"
            >
              {titleWords.map((word) => (
                <span key={word} className="inline-block overflow-hidden">
                  <motion.span
                    variants={wordReveal}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fade}
              className="mb-4 text-xl font-bold tracking-tight text-charcoal"
            >
              서울미즈병원 노승형과장
            </motion.p>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fade}
              className="text-xs tracking-wide text-light-gray"
            >
              눈성형 &middot; 코성형 &middot; 가슴성형 &middot; 원라인교정
            </motion.p>
          </div>

          {/* Mobile hero image (parallax) */}
          <motion.div
            className="relative h-[55vh] w-full overflow-hidden"
            style={{ y: imageY }}
          >
            <Image
              src="/images/model/hero.jpg"
              alt="서울미즈병원 노승형과장"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 15%" }}
            />
          </motion.div>
        </div>

        {/* ── Desktop layout: side by side ── */}
        <div className="hidden h-full md:flex">
          {/* Left: white space with text */}
          <div className="relative flex w-[40%] flex-col justify-center pl-12 pr-8 lg:pl-20 lg:pr-12">
            {/* Floating sparkle particles */}
            {sparkles.map((s, i) => (
              <span
                key={i}
                className="pointer-events-none absolute text-gold"
                style={{
                  top: s.top,
                  left: s.left,
                  fontSize: "12px",
                  animation: `sparkleFloat ${s.duration} ${s.delay} ease-in-out infinite`,
                  opacity: 0.7,
                }}
              >
                ✦
              </span>
            ))}

            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fade}
              className="mb-6 text-[11px] tracking-[0.3em] text-light-gray"
            >
              NOH PLASTIC SURGERY
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={wordContainer}
              className="mb-3 flex flex-wrap gap-x-3 text-4xl font-bold leading-snug text-charcoal lg:text-5xl xl:text-6xl"
            >
              {titleWords.map((word) => (
                <span key={word} className="inline-block overflow-hidden">
                  <motion.span
                    variants={wordReveal}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fade}
              className="mb-8 text-2xl font-bold tracking-tight text-charcoal lg:text-3xl"
            >
              서울미즈병원 노승형과장
            </motion.p>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fade}
              className="text-sm tracking-widest text-light-gray"
            >
              눈성형 &middot; 코성형 &middot; 가슴성형 &middot; 원라인교정
            </motion.p>

            {/* Model recruitment popup card */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fade}
              className="absolute bottom-10 left-12 rounded-sm border border-border bg-white px-5 py-4 shadow-sm lg:left-20"
            >
              <p className="mb-0.5 text-[10px] tracking-[0.2em] text-light-gray">
                MODEL
              </p>
              <p className="text-sm font-bold text-charcoal">모델 모집</p>
              <p className="mt-1 text-[11px] text-light-gray">
                촬영 모델을 모집합니다
              </p>
            </motion.div>
          </div>

          {/* Right: hero image, edge-to-edge (parallax + hover zoom) */}
          <div
            ref={imageDesktopRef}
            className="relative w-[60%] overflow-hidden"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <motion.div
              className="relative h-full w-full"
              style={{ y: imageY }}
            >
              <Image
                src="/images/model/hero.jpg"
                alt="서울미즈병원 노승형과장"
                fill
                priority
                className="object-cover transition-transform duration-[1200ms] ease-out"
                style={{
                  objectPosition: "center 15%",
                  transform: imageHovered ? "scale(1.03)" : "scale(1)",
                }}
              />
            </motion.div>

            {/* Circle thumbnail overlay at bottom-right */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fade}
              className="absolute bottom-8 right-8 z-10 h-20 w-20 overflow-hidden rounded-full border-2 border-white shadow-lg lg:h-24 lg:w-24"
            >
              <Image
                src="/images/model/smile.jpg"
                alt="모델"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator (bouncing chevron) ── */}
        <motion.div
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: scrolled ? 0 : 1,
            y: scrolled ? 10 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-light-gray"
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.div>
      </section>
    </>
  );
}
