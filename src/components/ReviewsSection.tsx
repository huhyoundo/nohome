"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    procedure: "원라인교정",
    text: "눈매교정이랑 뒤밑트임 한번에 해서 회복이 빨랐어요. 자연스럽다는 말 많이 들어요.",
    name: "김○○",
    age: "20대",
    source: "성예사",
  },
  {
    procedure: "반달 가슴거상",
    text: "흉터가 진짜 거의 안 보여요. 모양도 자연스럽고 너무 만족합니다.",
    name: "이○○",
    age: "30대",
    source: "바비톡",
  },
  {
    procedure: "눈재수술",
    text: "다른 데서 한 쌍꺼풀이 마음에 안 들었는데 재수술 결과가 정말 좋아요.",
    name: "박○○",
    age: "20대",
    source: "성예사",
  },
  {
    procedure: "코성형",
    text: "코끝이 자연스럽게 올라가서 너무 예뻐요. 상담부터 수술까지 만족!",
    name: "최○○",
    age: "20대",
    source: "바비톡",
  },
  {
    procedure: "눈성형",
    text: "쌍꺼풀 라인이 딱 원하는 대로 나왔어요. 붓기도 빨리 빠졌어요.",
    name: "정○○",
    age: "30대",
    source: "성예사",
  },
  {
    procedure: "리프팅",
    text: "실리프팅 하고 얼굴선이 확 달라졌어요. 주변에서 살 빠졌냐고 해요.",
    name: "한○○",
    age: "40대",
    source: "바비톡",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

/* ── Single review card ── */
function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="mx-3 w-[280px] flex-shrink-0 rounded-sm border border-border bg-white p-5">
      {/* Gold left accent */}
      <div className="relative pl-4">
        <div className="absolute left-0 top-0 h-full w-[2px] bg-gold" />

        {/* Stars + procedure badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm text-gold">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold">
            {review.procedure}
          </span>
        </div>

        {/* Quote */}
        <p className="mb-3 text-sm leading-relaxed text-charcoal/70">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-charcoal/50">
            {review.name} ({review.age})
          </span>
          <span className="text-[11px] text-light-gray">{review.source}</span>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  /* Pause marquee on hover */
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const pause = () => setIsPaused(true);
    const resume = () => setIsPaused(false);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  /* Duplicate reviews for seamless infinite loop */
  const allReviews = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      ref={ref}
      className="w-full bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <motion.h2
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fade}
            className="mb-1 text-3xl text-charcoal sm:text-4xl"
            style={{
              fontFamily: "var(--font-serif), 'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            Real Reviews
          </motion.h2>

          <motion.p
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fade}
            className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl"
          >
            환자 후기
          </motion.p>
        </div>
      </div>

      {/* ── Marquee (full-width overflow hidden) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        ref={marqueeRef}
        className="overflow-hidden"
      >
        <div
          className="flex"
          style={{
            animation: "marqueeScroll 40s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {allReviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </motion.div>

      {/* Keyframes for marquee */}
      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
