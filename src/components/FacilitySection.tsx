"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const facilities = [
  { src: "/images/interior/consultation.png", label: "상담실" },
  { src: "/images/interior/entrance.png", label: "센터 입구" },
  { src: "/images/interior/reception.png", label: "접수 데스크" },
  { src: "/images/interior/waiting.png", label: "대기실" },
  { src: "/images/interior/clinic-room.png", label: "진료실" },
  { src: "/images/interior/powder-room.png", label: "파우더룸" },
  { src: "/images/interior/hallway.png", label: "복도" },
];

/* ── Gallery image tile ── */
function GalleryTile({
  facility,
  index,
  isInView,
  delay,
  aspect,
  sizes,
  colSpan,
  onClick,
}: {
  facility: (typeof facilities)[number];
  index: number;
  isInView: boolean;
  delay: number;
  aspect: string;
  sizes: string;
  colSpan?: string;
  onClick: (idx: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`group relative overflow-hidden ${aspect} ${colSpan ?? ""}`}
      style={{ cursor: "zoom-in" }}
      onClick={() => onClick(index)}
    >
      <Image
        src={facility.src}
        alt={facility.label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
      {/* Slide-up label */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <span
          className="block translate-y-full px-4 py-3 text-xs tracking-wide text-white transition-transform duration-300 group-hover:translate-y-0"
          style={{
            background:
              "linear-gradient(transparent, rgba(0,0,0,0.5))",
          }}
        >
          {facility.label}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Lightbox modal ── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof facilities;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  /* Close on Escape, navigate with arrow keys */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const current = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
        aria-label="닫기"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
        aria-label="이전"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
        aria-label="다음"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Image container */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 mx-auto h-[70vh] w-[90vw] max-w-4xl sm:h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.label}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>

      {/* Label */}
      <div className="absolute bottom-8 left-0 right-0 z-10 text-center">
        <span className="text-sm tracking-wide text-white/70">
          {current.label}
        </span>
        <span className="ml-3 text-xs text-white/40">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </motion.div>
  );
}

export default function FacilitySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? facilities.length - 1 : prev - 1,
    );
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === facilities.length - 1 ? 0 : prev + 1,
    );
  }, []);

  return (
    <section id="facility" ref={ref} className="w-full bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Simple title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center text-sm tracking-[0.2em] text-charcoal/40 uppercase"
          style={{
            fontFamily: "var(--font-serif), 'Playfair Display', serif",
          }}
        >
          Our Space
        </motion.h2>

        {/* Masonry-style grid: 2 columns */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {/* Row 1: 2 images side by side */}
          {facilities.slice(0, 2).map((f, i) => (
            <GalleryTile
              key={f.label}
              facility={f}
              index={i}
              isInView={isInView}
              delay={i * 0.1}
              aspect="aspect-[4/3]"
              sizes="(max-width: 768px) 50vw, 45vw"
              onClick={openLightbox}
            />
          ))}

          {/* Row 2: 1 wide image spanning full width */}
          <GalleryTile
            key={facilities[2].label}
            facility={facilities[2]}
            index={2}
            isInView={isInView}
            delay={0.2}
            aspect="aspect-[21/9]"
            sizes="90vw"
            colSpan="col-span-2"
            onClick={openLightbox}
          />

          {/* Row 3: 2 images side by side */}
          {facilities.slice(3, 5).map((f, i) => (
            <GalleryTile
              key={f.label}
              facility={f}
              index={3 + i}
              isInView={isInView}
              delay={0.3 + i * 0.1}
              aspect="aspect-[4/3]"
              sizes="(max-width: 768px) 50vw, 45vw"
              onClick={openLightbox}
            />
          ))}

          {/* Row 4: 2 remaining images */}
          {facilities.slice(5, 7).map((f, i) => (
            <GalleryTile
              key={f.label}
              facility={f}
              index={5 + i}
              isInView={isInView}
              delay={0.5 + i * 0.1}
              aspect="aspect-[4/3]"
              sizes="(max-width: 768px) 50vw, 45vw"
              onClick={openLightbox}
            />
          ))}
        </div>

        {/* Facility info row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "프라이빗 상담실" },
            { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "최신 수술 장비" },
            { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "쾌적한 회복실" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
              <span className="text-xs tracking-wide text-charcoal/60">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={facilities}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
