import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const HeroScene = lazy(() => import("./three/HeroScene"));
import { FaFolderOpen, FaFileAlt } from "react-icons/fa";

// متحركات العناصر الأبناء (تسلسل ظهور)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 100 },
  },
};

// متحركات الحاوية لتطبيق Stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.5, staggerChildren: 0.2 },
  },
};

export default function HeroSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center p-6 mx-auto gap-10 text-white min-h-screen overflow-hidden md:pt-24 pb-24 max-w-7xl">
      {/* مشهد ثلاثي الأبعاد تفاعلي */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 h-[360px] md:h-[600px] order-first md:order-last"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-3xl" />
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </motion.div>

      {/* النص مع الأزرار */}
      <motion.div
        className="text-left relative z-10 max-w-xl md:w-1/2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <img
            src="/profile.jpg"
            alt="Ali profile"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/70 shadow-lg shadow-purple-500/40"
          />
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-purple-200 backdrop-blur">
            Available for work
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg"
          variants={itemVariants}
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Ali
          </span>
        </motion.h1>

        <motion.p
          className="text-purple-300 text-2xl font-bold mb-4 tracking-wider"
          variants={itemVariants}
        >
          Front-End Developer
        </motion.p>

        <motion.p
          className="text-gray-300 text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Front-End Developer specialized in Next.js with a proven ability to
          deliver real, production-level web applications. Skilled in building
          fast, responsive, and scalable interfaces using React, Tailwind CSS,
          and modern JavaScript tools. Worked on multiple impactful projects
          including AI platforms and admin dashboards, showcasing strong
          problem-solving skills and attention to clean, maintainable code.
          Driven by performance, user experience, and continuous improvement
        </motion.p>

        <motion.div className="flex gap-5 flex-wrap" variants={itemVariants}>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-purple-600 text-white px-7 py-3 rounded-full font-bold shadow-xl hover:bg-purple-700 transition transform"
          >
            <FaFolderOpen size={20} /> View My Projects
          </motion.a>

          <motion.a
            href="https://drive.google.com/file/d/1rN8yjFIdq-siAdwB2Nj7IjIb99Qk7Mlv/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 border-2 border-pink-500 text-pink-400 px-7 py-3 rounded-full font-bold shadow-xl hover:bg-pink-500 hover:text-white transition transform"
          >
            <FaFileAlt size={20} /> View Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
