"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

/* ── Card entrance variants (staggered, slight rotation) ── */
const cardEntrance = {
  hidden: { opacity: 0, y: 60, rotate: 2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

const services = [
  {
    num: "01",
    title: "눈성형",
    desc: "쌍꺼풀, 눈매교정, 상·하안검, 재수술",
    detail: "원라인교정 · 눈밑지방 재배치 · 앞트임",
    en: "Eye Surgery",
    img: "/images/assets/service-eyes.png",
  },
  {
    num: "02",
    title: "코성형",
    desc: "콧대, 코끝, 비중격, 재수술",
    detail: "실리콘 · 자가늑연골 · 비개방",
    en: "Rhinoplasty",
    img: "/images/assets/service-nose.png",
  },
  {
    num: "03",
    title: "가슴성형",
    desc: "보형물, 지방이식, 거상, 재수술",
    detail: "반달거상 · 물방울 · 라운드",
    en: "Breast Surgery",
    img: "/images/assets/service-breast.png",
  },
  {
    num: "04",
    title: "안면윤곽",
    desc: "광대, 사각턱, 이마·턱 보형물",
    detail: "3D CT 분석 · 비대칭 교정",
    en: "Facial Contouring",
    img: "/images/assets/service-face.png",
  },
  {
    num: "05",
    title: "동안성형",
    desc: "실리프팅, 안면거상, 필러·보톡스",
    detail: "울쎄라 · 슈링크 · 볼륨필러",
    en: "Anti-Aging",
    img: undefined,
  },
  {
    num: "06",
    title: "재수술",
    desc: "눈·코·가슴 재수술 전문",
    detail: "원인 분석 · 맞춤 플랜 · 자연스러운 교정",
    en: "Revision Surgery",
    img: undefined,
  },
];

/* ── Interactive service card with 3D tilt ── */
function ServiceCard({
  s,
  index,
  isInView,
}: {
  s: (typeof services)[number];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = ((centerY - y) / centerY) * 8;
      setTilt({ rotateX, rotateY });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      custom={3 + index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardEntrance}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex min-h-[200px] cursor-pointer flex-col justify-end overflow-hidden rounded-sm bg-cream p-6"
      style={{
        perspective: "800px",
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.4s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Gold border reveal animation */}
      <div
        className="pointer-events-none absolute inset-0 rounded-sm"
        style={{
          border: "2px solid transparent",
          borderImage: isHovered
            ? "linear-gradient(135deg, #c9a84c 0%, #d4b65e 50%, #c9a84c 100%) 1"
            : "none",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* Animated gold border corners (draw effect) */}
      <span
        className="pointer-events-none absolute left-0 top-0 block"
        style={{
          width: isHovered ? "100%" : "0%",
          height: "2px",
          background: "linear-gradient(90deg, #c9a84c, #d4b65e)",
          transition: "width 0.4s ease-out",
        }}
      />
      <span
        className="pointer-events-none absolute right-0 top-0 block"
        style={{
          width: "2px",
          height: isHovered ? "100%" : "0%",
          background: "linear-gradient(180deg, #d4b65e, #c9a84c)",
          transition: "height 0.4s ease-out 0.15s",
        }}
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 block"
        style={{
          width: isHovered ? "100%" : "0%",
          height: "2px",
          background: "linear-gradient(270deg, #c9a84c, #d4b65e)",
          transition: "width 0.4s ease-out 0.3s",
        }}
      />
      <span
        className="pointer-events-none absolute bottom-0 left-0 block"
        style={{
          width: "2px",
          height: isHovered ? "100%" : "0%",
          background: "linear-gradient(0deg, #d4b65e, #c9a84c)",
          transition: "height 0.4s ease-out 0.45s",
        }}
      />

      {/* Background shimmer on hover */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(201,168,76,0.08) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: isHovered ? "shimmer 1.5s ease-in-out infinite" : "none",
          backgroundPosition: isHovered ? undefined : "200% 0",
        }}
      />

      {/* Service icon image or decorative square */}
      {s.img ? (
        <div className="absolute right-4 top-4 h-16 w-16 overflow-hidden rounded-sm opacity-40 transition-opacity duration-300 group-hover:opacity-70">
          <Image
            src={s.img}
            alt={s.title}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
      ) : (
        <div className="absolute right-4 top-4 h-12 w-12 rounded-sm border border-gold/30 transition-colors duration-300 group-hover:border-gold" />
      )}

      {/* Number badge */}
      <span className="mb-auto text-[11px] font-medium tracking-widest text-gold/60 uppercase">
        {s.num}
      </span>

      {/* English subtitle */}
      <p
        className="mb-1 text-[11px] tracking-[0.15em] text-light-gray/60"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
        }}
      >
        {s.en}
      </p>

      {/* Title */}
      <h3 className="mb-1.5 text-xl font-bold tracking-tight text-charcoal">
        {s.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-light-gray">{s.desc}</p>

      {/* Detail row */}
      <p className="mt-1 text-xs leading-relaxed text-light-gray/60">{s.detail}</p>

      {/* Inline shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="services"
      ref={ref}
      className="w-full bg-white py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* ── Section header ── */}
        <div className="mb-10 md:mb-14">
          <motion.h2
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fade}
            className="mb-2 text-3xl text-charcoal sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            Our Services
          </motion.h2>

          <motion.p
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fade}
            className="mb-2 text-xl font-bold tracking-tight text-charcoal sm:text-2xl"
          >
            시술 안내
          </motion.p>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fade}
            className="text-xs tracking-[0.2em] text-light-gray"
          >
            Challenges. Solutions. For All Cases.
          </motion.p>
        </div>

        {/* ── 3x2 image-card grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} index={i} isInView={isInView} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          custom={10}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          className="mt-10 text-center"
        >
          <p className="text-sm text-light-gray">자세한 상담은</p>
          <a
            href="tel:024709114"
            className="mt-1 inline-block text-lg font-bold tracking-wide text-gold transition-colors hover:text-gold-light"
          >
            02-470-9114
          </a>
        </motion.div>
      </div>
    </section>
  );
}
