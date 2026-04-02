"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #c9a84c, #d4b65e, #c9a84c)",
        boxShadow: "0 0 8px rgba(201, 168, 76, 0.5)",
      }}
    />
  );
}
