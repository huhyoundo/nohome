"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const videos = [
  { title: "원라인교정, 한 번에 눈매까지?", views: "12,400" },
  { title: "반달 가슴거상의 모든 것", views: "8,900" },
  { title: "쌍꺼풀 재수술, 이것만 알면 됩니다", views: "15,200" },
  { title: "코성형 보형물 종류 비교", views: "6,700" },
  { title: "실리프팅 vs 안면거상, 뭐가 다를까?", views: "9,300" },
  { title: "눈밑지방 재배치 수술 과정", views: "11,100" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
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

/* ── Video thumbnail card ── */
function VideoCard({
  video,
  index,
  isInView,
}: {
  video: (typeof videos)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-charcoal">
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white/20">
            <span className="ml-1 text-lg text-white">&#9654;</span>
          </div>
        </div>

        {/* Hover scale effect on thumbnail */}
        <div className="absolute inset-0 bg-charcoal transition-transform duration-500 group-hover:scale-105" />

        {/* Re-render play button above the scaled bg */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-white/20">
            <span className="ml-1 text-lg text-white">&#9654;</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <h4 className="text-sm font-bold leading-snug text-charcoal transition-colors duration-200 group-hover:text-gold">
          {video.title}
        </h4>
        <p className="mt-1 text-xs text-light-gray">
          조회수 {video.views}회
        </p>
      </div>
    </motion.div>
  );
}

export default function YouTubeSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="media"
      ref={ref}
      className="w-full bg-cream py-16 md:py-20"
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
            NOH TV
          </motion.h2>

          <motion.p
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fade}
            className="mb-2 text-xl font-bold tracking-tight text-charcoal sm:text-2xl"
          >
            노닥!nodak!
          </motion.p>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fade}
            className="text-sm text-light-gray"
          >
            코성형에 대한 유익한 정보를 영상으로 만나보세요
          </motion.p>
        </div>

        {/* ── Video grid: 1 col mobile, 2 col tablet, 3 col desktop ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <VideoCard
              key={video.title}
              video={video}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          custom={8}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fade}
          className="mt-10 text-center"
        >
          <a
            href="https://www.youtube.com/@nodak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-gold transition-colors duration-200 hover:text-gold-light"
          >
            더 많은 영상 보기 &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
