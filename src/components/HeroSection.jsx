import { motion } from "framer-motion";
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
  // دوائر الخلفية المتحركة
  const floatingVariants = (i) => ({
    animate: {
      y: [0, 20 + i * 5, 0],
      x: [0, 10 + i * 4, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 8 + i * 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: i * 1.5,
      },
    },
  });

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center p-6 mx-auto gap-10 bg-gray-900 text-white min-h-screen overflow-hidden">
      {/* خلفية متحركة: دوائر متوهجة */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2 }}
          animate="animate"
          variants={floatingVariants(i)}
          className="absolute rounded-full filter blur-2xl pointer-events-none"
          style={{
            width: `${100 + i * 30}px`,
            height: `${100 + i * 30}px`,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, #a78bfa, transparent)"
                : "radial-gradient(circle, #f472b6, transparent)",
            top: `${10 + i * 12}%`,
            left: `${10 + i * 10}%`,
            zIndex: 0,
          }}
        />
      ))}

      {/* الصورة الرئيسية مع تدرج وظل */}
      <motion.div
        className="flex-shrink-0 rounded-full p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-2xl relative z-10"
        initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        whileHover={{
          scale: 1.05,
          rotate: [0, 2, -2, 0],
          boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)",
        }}
      >
        <img
          src="/profile.jpg"
          alt="Ali profile"
          className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* النص مع الأزرار */}
      <motion.div
        className="text-left relative z-10 max-w-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg"
          variants={itemVariants}
        >
          Hi, I'm <span className="text-pink-400">Ali</span>
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
          Front-End Developer specializing in React.js with a background in
          Computer Engineering. Strong experience in building modern,
          responsive, and user-focused web applications. Skilled in transforming
          UI/UX designs into high-performance, interactive interfaces using
          HTML, CSS, JavaScript, and modern front-end tools like React Router,
          Axios, Redux, and Tailwind CSS. Bootstrap 5, Passionate about clean
          code, performance, and continuous learning
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
            href="https://drive.google.com/file/d/18_gnwyhdea0MMuhQLXtNo_1RsUdmvRO-/view?usp=sharing"
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
