"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const career = [
  "한양대학교 의과대학 졸업",
  "한양대학교병원 성형외과 수련",
  "컬럼비아대학교(뉴욕) 펠로우십",
  "전) 원진성형외과 공동원장",
  "전) 신데렐라성형외과 대표원장",
  "전) 연세탑성형외과 대표원장",
  "전) 갤러리아성형외과 대표원장",
  "현) 서울미즈병원 성형외과 과장",
];

const memberships = [
  "대한성형외과학회 정회원",
  "대한미용성형외과학회 정회원",
  "대한두개안면성형외과학회 정회원",
];

/* ── Career timeline item — dot fills in, line draws ── */
function TimelineItem({
  text,
  index,
  isInView,
  isLast,
  isCurrent,
}: {
  text: string;
  index: number;
  isInView: boolean;
  isLast: boolean;
  isCurrent: boolean;
}) {
  const delay = index * 0.15 + 0.3;

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative flex items-start gap-4 pb-4"
    >
      {/* Vertical connector line + dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot — fills gold when visible */}
        <motion.div
          initial={{ scale: 0, backgroundColor: "rgba(201,168,76,0.15)" }}
          animate={
            isInView
              ? { scale: 1, backgroundColor: "rgba(201,168,76,1)" }
              : {}
          }
          transition={{ delay: delay + 0.1, duration: 0.4, ease: "easeOut" }}
          className="relative z-10 h-[9px] w-[9px] rounded-full"
        />

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: delay + 0.2, duration: 0.4, ease: "easeOut" }}
            className="mt-0.5 h-full w-px origin-top bg-gold/30"
            style={{ minHeight: "20px" }}
          />
        )}
      </div>

      {/* Text */}
      <span
        className={`text-sm leading-relaxed ${
          isCurrent ? "font-semibold text-charcoal" : "text-charcoal/60"
        }`}
      >
        {text}
      </span>
    </motion.li>
  );
}

/* ── Membership item with hover highlight ── */
function MembershipItem({ text }: { text: string }) {
  return (
    <motion.p
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group cursor-default text-sm leading-relaxed text-charcoal/50 transition-colors duration-300 hover:text-charcoal/80"
    >
      <span className="relative inline-block">
        {text}
        <span className="absolute bottom-0 left-0 h-px w-0 bg-gold/50 transition-all duration-300 group-hover:w-full" />
      </span>
    </motion.p>
  );
}

/* ── Animated border that traces around the photo ── */
function AnimatedBorder({ isInView }: { isInView: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.rect
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        stroke="rgba(201,168,76,0.6)"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════════════════════════ */
export default function DoctorSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  /* Parallax for profile image */
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="doctor" ref={ref} className="w-full bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <p
            className="mb-2 text-sm tracking-[0.15em] text-gold italic"
            style={{
              fontFamily: "var(--font-serif), 'Playfair Display', serif",
            }}
          >
            Specialist Doctor
          </p>
          <h2 className="mb-4 text-3xl font-bold text-charcoal sm:text-4xl">
            의료진 소개
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-charcoal/50">
            당신만의 자연스러운 아름다움을 위해 끊임없이 노력하는 의료진을
            소개합니다.
          </p>
        </motion.div>

        {/* Content: photo + info */}
        <div className="flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-20">
          {/* Large editorial photo with parallax + animated border */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] w-full overflow-hidden md:w-[45%]"
          >
            <AnimatedBorder isInView={isInView} />
            <motion.div
              className="absolute inset-[-10%]"
              style={{ y: imageY }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/images/doctor/profile.jpg"
                alt="노승형 과장"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </motion.div>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex w-full flex-col justify-center md:w-[55%]"
          >
            <h3 className="mb-2 text-2xl font-bold text-charcoal sm:text-3xl">
              노승형 과장
            </h3>
            <p className="mb-8 text-sm tracking-wide text-charcoal/50">
              성형외과 전문의 &middot; 25년 경력
            </p>

            {/* Career timeline */}
            <ul className="mb-10">
              {career.map((item, i) => (
                <TimelineItem
                  key={item}
                  text={item}
                  index={i}
                  isInView={isInView}
                  isLast={i === career.length - 1}
                  isCurrent={item.startsWith("현)")}
                />
              ))}
            </ul>

            {/* Society memberships with hover */}
            <div className="border-t border-charcoal/10 pt-6">
              <p className="mb-3 text-xs tracking-[0.1em] text-charcoal/40 uppercase">
                학회 활동
              </p>
              <div className="space-y-1">
                {memberships.map((m) => (
                  <MembershipItem key={m} text={m} />
                ))}
              </div>
            </div>

            {/* Philosophy quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
              className="mt-8 border-l-2 border-gold/40 pl-5"
            >
              <span
                className="block text-3xl leading-none text-gold/50"
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-serif), 'Playfair Display', serif",
                }}
              >
                &ldquo;
              </span>
              <p
                className="-mt-3 text-sm leading-relaxed text-charcoal/70 italic"
                style={{
                  fontFamily: "var(--font-serif), 'Playfair Display', serif",
                }}
              >
                수술은 기술이 아니라 철학입니다. 환자의 원래 아름다움을 살려
                자연스럽게, 그리고 안전하게.
              </p>
              <p className="mt-2 text-right text-xs font-medium tracking-wide text-gold">
                — 노승형
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
