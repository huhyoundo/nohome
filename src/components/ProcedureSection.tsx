"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

/* ── Curtain Reveal — gold overlay slides away to reveal image ── */
function CurtainReveal({
  children,
  direction = "left-to-right",
}: {
  children: React.ReactNode;
  direction?: "left-to-right" | "top-to-bottom";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const clipFrom =
    direction === "left-to-right" ? "inset(0 0 0 0)" : "inset(0 0 0 0)";
  const clipTo =
    direction === "left-to-right"
      ? "inset(0 0 0 100%)"
      : "inset(100% 0 0 0)";

  return (
    <div ref={ref} className="relative overflow-hidden">
      {children}
      <motion.div
        initial={{ clipPath: clipFrom }}
        animate={isInView ? { clipPath: clipTo } : {}}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none absolute inset-0 z-10 bg-gold"
      />
    </div>
  );
}

/* ── Parallax Image — slower scroll speed for depth effect ── */
function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-16%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
        />
      </motion.div>
    </div>
  );
}

/* ── Hashtag with individual hover ── */
function Hashtag({ text }: { text: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative inline-block cursor-default rounded-full px-2.5 py-0.5 text-[15px] tracking-wide text-gold transition-colors duration-300 hover:bg-gold/15 hover:text-gold"
      style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
      }}
    >
      {text}
    </motion.span>
  );
}

/* ── Typing Info Item — text types in character by character ── */
function TypingInfoItem({
  text,
  isInView,
  delay,
}: {
  text: string;
  isInView: boolean;
  delay: number;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;

    let idx = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        idx += 1;
        if (idx > text.length) {
          clearInterval(interval);
          return;
        }
        setDisplayed(text.slice(0, idx));
      }, 35);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, text, delay]);

  return <span>{isInView ? displayed || "\u00A0" : "\u00A0"}</span>;
}

/* ── Info Row with animated typing ── */
function InfoRow({
  items,
  isInView,
}: {
  items: string[];
  isInView: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-wide text-charcoal/60">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && (
            <span className="inline-block h-1 w-1 rounded-full bg-gold" />
          )}
          <TypingInfoItem text={item} isInView={isInView} delay={i * 400} />
        </span>
      ))}
    </div>
  );
}

/* ── Diagram with hover glow + tooltip ── */
function DiagramImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative h-48 w-full cursor-pointer overflow-hidden rounded-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered ? { scale: 1.02 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Glow pulse */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-sm"
        animate={
          hovered
            ? {
                boxShadow: [
                  "0 0 0px rgba(201,168,76,0)",
                  "0 0 20px rgba(201,168,76,0.35)",
                  "0 0 0px rgba(201,168,76,0)",
                ],
              }
            : { boxShadow: "0 0 0px rgba(201,168,76,0)" }
        }
        transition={
          hovered
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      />

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 55vw"
        className="object-contain"
      />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-charcoal/80 px-4 py-1.5 text-xs tracking-wide text-white backdrop-blur-sm"
      >
        자세히 보기
      </motion.div>
    </motion.div>
  );
}

/* ── Fade variant ── */
const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

/* ════════════════════════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════════════════════════ */
export default function ProcedureSection() {
  const refOne = useRef<HTMLDivElement>(null);
  const refTwo = useRef<HTMLDivElement>(null);
  const isInViewOne = useInView(refOne, { once: true, amount: 0.1 });
  const isInViewTwo = useInView(refTwo, { once: true, amount: 0.1 });

  return (
    <section id="procedures" className="w-full bg-white">
      {/* ──────────────────────────────────────────────
          Block 1: 원라인교정 — text left, image right
      ────────────────────────────────────────────── */}
      <div
        ref={refOne}
        className="mx-auto flex max-w-7xl flex-col-reverse gap-6 px-6 py-14 md:flex-row md:items-stretch md:gap-10 md:py-20 lg:px-12"
      >
        {/* Left: text content */}
        <div className="flex w-full flex-col justify-center md:w-[45%]">
          <motion.p
            custom={0}
            initial="hidden"
            animate={isInViewOne ? "visible" : "hidden"}
            variants={fade}
            className="mb-3 text-[11px] tracking-[0.25em] text-light-gray uppercase"
          >
            One-Line Correction
          </motion.p>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={isInViewOne ? "visible" : "hidden"}
            variants={fade}
            className="mb-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl lg:text-5xl"
          >
            원라인교정
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInViewOne ? "visible" : "hidden"}
            variants={fade}
            className="mb-4 text-base font-medium text-charcoal/80 lg:text-lg"
          >
            뒤밑트임 + 눈매교정, 한 번의 라인으로
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            animate={isInViewOne ? "visible" : "hidden"}
            variants={fade}
            className="mb-4 max-w-lg leading-relaxed text-light-gray"
          >
            기존에는 뒤밑트임 따로, 눈매교정 따로 — 총 2번의 수술과 2번의
            회복. 노승형 과장의 원라인교정은 한 번의 수술로 뒤밑트임과
            눈매교정을 동시에 완성합니다. 수술 시간 단축, 회복 기간 절반,
            자연스러운 하나의 라인.
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate={isInViewOne ? "visible" : "hidden"}
            variants={fade}
            className="mb-5"
          >
            <InfoRow
              items={["수술시간 40분", "회복기간 5-7일", "마취 수면마취"]}
              isInView={isInViewOne}
            />
          </motion.div>

          {/* Hashtags — individual hover pills */}
          <motion.div
            custom={5}
            initial="hidden"
            animate={isInViewOne ? "visible" : "hidden"}
            variants={fade}
            className="flex flex-wrap gap-1"
          >
            <Hashtag text="#원라인교정" />
            <Hashtag text="#뒤밑트임" />
            <Hashtag text="#눈매교정" />
            <Hashtag text="#한번에" />
          </motion.div>
        </div>

        {/* Right: parallax image + diagram below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInViewOne ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex w-full flex-col gap-4 md:w-[55%]"
        >
          <CurtainReveal direction="left-to-right">
            <ParallaxImage
              src="/images/model/elegant.jpg"
              alt="원라인교정 시술"
              className="min-h-[500px] w-full flex-1"
            />
          </CurtainReveal>

          <DiagramImage
            src="/images/assets/oneline-diagram.png"
            alt="원라인교정 시술 다이어그램"
          />
        </motion.div>
      </div>

      {/* ── Thin gold divider ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="h-px w-full bg-gold/20" />
      </div>

      {/* ──────────────────────────────────────────────
          Block 2: 반달 가슴거상 — image left, text right
      ────────────────────────────────────────────── */}
      <div
        ref={refTwo}
        className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-stretch md:gap-10 md:py-20 lg:px-12"
      >
        {/* Left: parallax image + diagram below */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInViewTwo ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex w-full flex-col gap-4 md:w-[55%]"
        >
          <CurtainReveal direction="top-to-bottom">
            <ParallaxImage
              src="/images/model/side-profile.jpg"
              alt="반달 가슴거상"
              className="min-h-[500px] w-full flex-1"
            />
          </CurtainReveal>

          <DiagramImage
            src="/images/assets/moonlift-diagram.png"
            alt="반달 가슴거상 시술 다이어그램"
          />
        </motion.div>

        {/* Right: text content */}
        <div className="flex w-full flex-col justify-center md:w-[45%]">
          <motion.p
            custom={0}
            initial="hidden"
            animate={isInViewTwo ? "visible" : "hidden"}
            variants={fade}
            className="mb-3 text-[11px] tracking-[0.25em] text-light-gray uppercase"
          >
            Half-Moon Breast Lift
          </motion.p>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={isInViewTwo ? "visible" : "hidden"}
            variants={fade}
            className="mb-2 text-3xl font-bold tracking-tight text-charcoal sm:text-4xl lg:text-5xl"
          >
            반달 가슴거상
          </motion.h2>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInViewTwo ? "visible" : "hidden"}
            variants={fade}
            className="mb-4 text-base font-medium text-charcoal/80 lg:text-lg"
          >
            반만 절개해도 완벽한 리프팅
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            animate={isInViewTwo ? "visible" : "hidden"}
            variants={fade}
            className="mb-4 max-w-lg leading-relaxed text-light-gray"
          >
            기존 가슴거상은 유륜 전체를 절개하여 흉터가 크고 유륜 형태 변형
            위험이 컸습니다. 반달 가슴거상은 유륜의 절반만 반달(반구) 모양으로
            절개하여 흉터를 최소화하고, 유륜 형태와 감각을 최대한 보존하는
            노승형 과장만의 시그니처 술식입니다.
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate={isInViewTwo ? "visible" : "hidden"}
            variants={fade}
            className="mb-5"
          >
            <InfoRow
              items={[
                "수술시간 1시간 30분",
                "회복기간 1-2주",
                "마취 전신마취",
              ]}
              isInView={isInViewTwo}
            />
          </motion.div>

          {/* Hashtags — individual hover pills */}
          <motion.div
            custom={5}
            initial="hidden"
            animate={isInViewTwo ? "visible" : "hidden"}
            variants={fade}
            className="flex flex-wrap gap-1"
          >
            <Hashtag text="#반달거상" />
            <Hashtag text="#최소절개" />
            <Hashtag text="#흉터최소화" />
            <Hashtag text="#유륜보존" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
