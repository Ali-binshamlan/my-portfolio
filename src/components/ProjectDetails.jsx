import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./three/TiltCard";
import { projects } from "./MyProjectsData";
import {
  FaExternalLinkAlt,
  FaPlayCircle,
  FaCodeBranch,
  FaPuzzlePiece,
  FaMicrochip,
  FaCamera,
  FaRocket,
} from "react-icons/fa";


export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const [modalImage, setModalImage] = useState(null);

  // منع التمرير عند فتح المودال
  useEffect(() => {
    document.body.style.overflow = modalImage ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modalImage]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          Project not found
        </motion.p>
      </div>
    );
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, type: "spring", stiffness: 80 },
    },
  };

  const screenshotVariants = {
    hidden: { opacity: 0, scale: 0.85, rotateX: 45, z: -150 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      z: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.06,
      rotateY: -12,
      rotateX: 6,
      z: 40,
      boxShadow: "20px 25px 40px rgba(168, 85, 247, 0.45)",
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      opacity: 1,
      backdropFilter: "blur(6px)",
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3 },
    },
  };

  const modalImageVariants = {
    hidden: { scale: 0.6, opacity: 0, rotateY: -90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 100 },
    },
    exit: { scale: 0.6, opacity: 0, rotateY: 90, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen text-gray-100 py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden mt-0 md:mt-10 ">
      {/* خلفية متوهجة */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-[140px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      <motion.div
        className="max-w-5xl mx-auto space-y-10 relative z-10"
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        {/* كارد المشروع الرئيسي */}
        <motion.div variants={sectionVariants}>
        <TiltCard max={6} className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center gap-6 border border-white/10 shadow-[0_30px_80px_-30px_rgba(139,92,246,0.7)]">
          {project.image && (
            <motion.div className="h-full w-full flex items-center justify-center overflow-hidden rounded-xl border border-gray-700/50">
              <motion.img
                src={project.image}
                alt={project.title}
                className="  w-auto object-contain  shadow-xl transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              />
            </motion.div>
          )}

          <div className="text-center" style={{ transform: "translateZ(40px)" }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ textShadow: "0 1px 0 #6d28d9, 0 2px 0 #5b21b6, 0 3px 0 #4c1d95, 0 4px 0 #3b0764, 0 12px 25px rgba(124,58,237,0.6)" }}>
              {project.title}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-pink-600 text-white px-7 py-3 rounded-full font-bold hover:bg-pink-700 transition shadow-lg transform hover:scale-105"
                >
                  <FaRocket /> Live Demo
                </a>
              )}
              {project.ved && (
                <a
                  href={project.ved}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-purple-500 text-purple-400 px-7 py-3 rounded-full font-bold hover:bg-purple-900/50 transition transform hover:scale-105"
                >
                  <FaPlayCircle /> How It Works
                </a>
              )}
            </div>
          </div>
        </TiltCard>
        </motion.div>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <motion.section
            variants={sectionVariants}
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-pink-700/50"
          >
            <h2 className="text-3xl font-bold mb-6 text-pink-400 flex items-center gap-3">
              <FaCamera /> Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
              {project.screenshots.map((src, i) => (
                <motion.div
                  key={i}
                  variants={screenshotVariants}
                  whileHover="hover"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-xl border border-gray-700 shadow-md cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                    onClick={() => setModalImage(src)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Key Features */}
        {project.keyFeatures?.length > 0 && (
          <motion.div
            variants={sectionVariants}
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-700/50 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-purple-400">
              <FaCodeBranch /> Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {project.keyFeatures.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {f}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Challenges */}
        {project.challenges?.length > 0 && (
          <motion.div
            variants={sectionVariants}
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-pink-700/50 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-pink-400">
              <FaPuzzlePiece /> Challenges & Solutions
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {project.challenges.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {c}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <motion.div
            variants={sectionVariants}
            className="bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-700/50 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3 text-purple-400">
              <FaMicrochip /> Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(236,72,153,0.8)",
                  }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-purple-700/70 text-purple-200 px-3 py-1 rounded-full text-sm cursor-pointer shadow-md"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 cursor-pointer"
            style={{ perspective: 1400 }}
            onClick={() => setModalImage(null)}
          >
            <motion.img
              variants={modalImageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              src={modalImage}
              alt="Screenshot"
              className="max-w-[95vw] max-h-[95vh] rounded-xl shadow-2xl border border-gray-700/70"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
