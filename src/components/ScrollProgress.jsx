import { motion, useScroll, useSpring } from "framer-motion";

// شريط تقدم التمرير أعلى الصفحة
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 shadow-[0_0_12px_rgba(236,72,153,0.8)]"
    />
  );
}
