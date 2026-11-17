import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  // النص يرتفع ويتلاشى ويميل للخلف مع التمرير
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -160]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const textRotX = useTransform(scrollY, [0, 600], [0, 25]);

  return (
    <section id="home" className="relative flex flex-col md:flex-row items-center justify-center p-6 mx-auto gap-10 text-white min-h-screen overflow-hidden pt-16 md:pt-24 pb-24 max-w-7xl">
      {/* مشهد ثلاثي الأبعاد تفاعلي */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 h-[300px] md:h-[600px] order-first md:order-last"
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
        style={{ y: textY, opacity: textOpacity, rotateX: textRotX, transformPerspective: 900 }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-purple-200 backdrop-blur">
            Available for work
          </span>
          <span className="hidden sm:inline px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300 backdrop-blur">
            📍 Riyadh, Saudi Arabia
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg"
          variants={itemVariants}
        >
          Hi, I&apos;m
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent pb-2">
            Ali Bin Shamlan
          </span>
        </motion.h1>

        <motion.p
          className="text-purple-300 text-2xl font-bold mb-4 tracking-wider"
          variants={itemVariants}
        >
          Software Engineer (Next.js)
        </motion.p>

        <motion.p
          className="text-gray-300 text-base md:text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Software Engineer with 3+ years of experience building
          production-level web applications with Next.js, React, and
          TypeScript. Delivered AI platforms, admin dashboards, and
          consumer-facing websites for clients remotely and in a full-time role
          at an environmental consulting firm. Skilled in fast, responsive, and
          scalable interfaces using Tailwind CSS, REST API integration, and
          modern JavaScript tools, with a strong focus on performance, user
          experience, and clean, maintainable code.
        </motion.p>

        <motion.dl variants={itemVariants} className="grid grid-cols-3 gap-3 mb-8 max-w-md" style={{ perspective: 600 }}>
          {[
            ["3+", "Years experience"],
            ["10", "Projects"],
            ["Next.js", "Specialist"],
          ].map(([value, label]) => (
            <motion.div
              key={label}
              whileHover={{ rotateX: 12, y: -4 }}
              className="rounded-xl px-3 py-3 bg-gray-900/50 backdrop-blur border border-white/10 shadow-[0_5px_0_rgba(46,16,101,0.9),0_14px_30px_-10px_rgba(124,58,237,0.5)]"
            >
              <dt className="sr-only">{label}</dt>
              <dd className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">{value}</dd>
              <dd className="text-[11px] md:text-xs text-gray-400 mt-0.5">{label}</dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div className="flex gap-5 flex-wrap" variants={itemVariants}>
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ y: -3 }}
            whileTap={{ y: 4, boxShadow: "0 1px 0 #3b0764" }}
            style={{ boxShadow: "0 6px 0 #3b0764, 0 18px 40px rgba(168,85,247,.45)" }}
            className="flex items-center gap-3 bg-gradient-to-b from-purple-500 to-purple-700 text-white px-7 py-3 rounded-full font-bold"
          >
            <FaFolderOpen size={20} /> View My Projects
          </motion.a>

          <motion.a
            href="/Ali-Bin-Shamlan_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ y: 4 }}
            style={{ boxShadow: "0 6px 0 #500724, 0 18px 40px rgba(236,72,153,.25)" }}
            className="flex items-center gap-3 border-2 border-pink-500 bg-gray-950/60 backdrop-blur text-pink-300 px-7 py-3 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-colors"
          >
            <FaFileAlt size={20} /> View Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
