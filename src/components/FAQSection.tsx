"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "원라인교정이 일반 눈매교정과 뭐가 다른가요?",
    a: "일반적으로 뒤밑트임과 눈매교정은 별도의 수술로 진행합니다. 원라인교정은 이 두 가지를 한 번의 수술로 동시에 진행하여 수술 횟수와 회복 기간을 절반으로 줄입니다. 하나의 라인으로 자연스러운 눈매를 완성합니다.",
  },
  {
    q: "반달 가슴거상의 흉터는 어느 정도인가요?",
    a: "유륜의 절반만 반달 모양으로 절개하므로 기존 전체 유륜절개 대비 절개 길이가 약 50% 줄어듭니다. 시간이 지나면 유륜 경계와 자연스럽게 어우러져 거의 눈에 띄지 않습니다.",
  },
  {
    q: "수술 후 회복 기간은 얼마나 걸리나요?",
    a: "시술에 따라 다르지만, 눈성형은 5-7일, 코성형은 7-10일, 가슴성형은 1-2주 정도 일상 복귀가 가능합니다. 완전한 결과는 1-3개월 후 확인하실 수 있습니다.",
  },
  {
    q: "상담은 어떻게 받을 수 있나요?",
    a: "전화(02-470-9114) 또는 카카오톡으로 간편하게 상담 예약하실 수 있습니다. 평일 10:00-19:00, 토요일 10:00-16:00에 운영합니다.",
  },
  {
    q: "재수술도 가능한가요?",
    a: "네, 노승형 과장은 25년 경력의 재수술 전문 의료진입니다. 눈, 코, 가슴 재수술 모두 가능하며, 이전 수술 상태를 정밀하게 분석한 후 최적의 방법을 제안드립니다.",
  },
  {
    q: "서울미즈병원은 어디에 있나요?",
    a: "서울 강동구 천호대로 1041에 위치해 있으며, 지하철 8호선 천호역에서 가깝습니다. 주차 공간도 마련되어 있습니다.",
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

/* ── Single FAQ accordion item ── */
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  faq: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  return (
    <motion.div
      custom={index + 2}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fade}
      className="border-b border-charcoal/10"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors duration-200"
        style={{
          borderLeft: isOpen ? "2px solid #c9a84c" : "2px solid transparent",
          paddingLeft: "16px",
        }}
      >
        <span
          className={`pr-4 text-sm font-medium leading-relaxed sm:text-base ${
            isOpen ? "text-charcoal" : "text-charcoal/80"
          }`}
        >
          {faq.q}
        </span>

        {/* Gold chevron — rotates on open */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 text-gold"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 7.5 L10 12.5 L15 7.5" />
          </svg>
        </motion.span>
      </button>

      {/* Expandable answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 pl-[18px] pr-4 text-sm leading-relaxed text-charcoal/60"
              style={{ borderLeft: "2px solid #c9a84c" }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="w-full bg-warm-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
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
            FAQ
          </motion.h2>

          <motion.p
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fade}
            className="text-xl font-bold tracking-tight text-charcoal sm:text-2xl"
          >
            자주 묻는 질문
          </motion.p>
        </div>

        {/* ── Accordion ── */}
        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
