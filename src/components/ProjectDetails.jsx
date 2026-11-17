import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  FaRocket,
  FaPlayCircle,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaPuzzlePiece,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import TiltCard from "./three/TiltCard";
import Reveal3D from "./three/Reveal3D";
import Heading3D from "./three/Heading3D";
import { projects } from "./MyProjectsData";

const hostOf = (url, fallback) => {
  try {
    return new URL(url).host;
  } catch {
    return fallback;
  }
};

// لابتوب ثلاثي الأبعاد (CSS) تتحرك لقطة الموقع داخل شاشته تلقائياً
function LaptopMockup({ src, host }) {
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 500], [12, 30]);
  const rotateY = useTransform(scrollY, [0, 500], [-18, -6]);
  return (
    <div className="relative w-full" style={{ perspective: 1600 }}>
      <motion.div
        initial={{ opacity: 0, rotateX: 60, y: 80 }}
        animate={{ opacity: 1, rotateX: 12, y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.2 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative mx-auto w-full max-w-[620px]"
      >
        {/* الشاشة */}
        <div className="rounded-t-2xl bg-gradient-to-b from-gray-700 to-gray-800 p-2.5 pb-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_80px_-10px_rgba(139,92,246,0.55)]">
          <div className="rounded-lg overflow-hidden bg-gray-950 border border-black">
            <div className="flex items-center gap-1.5 px-3 h-7 bg-gray-900 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 flex-1 truncate rounded bg-gray-800 px-2 text-[10px] leading-4 text-gray-400 font-mono">{host}</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden group">
              <img
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover animate-[screen-scroll_18s_ease-in-out_infinite_alternate] group-hover:[animation-play-state:paused]"
              />
            </div>
          </div>
        </div>
        {/* القاعدة */}
        <div className="relative h-4 mx-[-6%] rounded-b-2xl bg-gradient-to-b from-gray-500 to-gray-800 shadow-[0_25px_40px_-10px_rgba(0,0,0,0.9)]">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-1.5 rounded-b-md bg-gray-900/70" />
        </div>
        <div className="absolute -bottom-10 inset-x-[10%] h-10 rounded-[50%] bg-purple-600/40 blur-2xl" />
      </motion.div>
    </div>
  );
}

// معرض لقطات بشكل Coverflow ثلاثي الأبعاد
function Coverflow({ images, title, onOpen }) {
  const [index, setIndex] = useState(0);
  const n = images.length;
  const go = useCallback((d) => setIndex((i) => (i + d + n) % n), [n]);

  return (
    <div className="relative">
      <div
        className="relative h-[260px] sm:h-[360px] md:h-[440px] flex items-center justify-center overflow-hidden"
        style={{ perspective: 1400 }}
      >
        {images.map((src, i) => {
          let offset = i - index;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const abs = Math.abs(offset);
          if (abs > 3) return null;
          return (
            <motion.button
              key={src}
              type="button"
              onClick={() => (offset === 0 ? onOpen(i) : setIndex(i))}
              aria-label={offset === 0 ? `Open screenshot ${i + 1}` : `Show screenshot ${i + 1}`}
              animate={{
                x: `${offset * 55}%`,
                rotateY: offset * -38,
                z: -abs * 180,
                scale: offset === 0 ? 1 : 0.85,
                opacity: abs > 2 ? 0 : 1 - abs * 0.25,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              style={{ zIndex: 10 - abs, transformStyle: "preserve-3d" }}
              className={`absolute w-[70%] sm:w-[55%] md:w-[46%] aspect-[16/10] rounded-xl overflow-hidden border bg-gray-900 ${
                offset === 0 ? "border-purple-400/70 shadow-[0_30px_70px_-15px_rgba(168,85,247,0.7)]" : "border-white/10"
              }`}
            >
              <img src={src} alt={`${title} screenshot ${i + 1}`} loading="lazy" className="w-full h-full object-cover object-top" />
              {offset === 0 && (
                <span className="absolute bottom-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-gray-950/70 text-white backdrop-blur">
                  <FaExpand size={13} />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      {n > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => go(-1)} aria-label="Previous screenshot" className="grid place-items-center w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-purple-500/30 transition">
            <FaArrowLeft size={13} />
          </button>
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Screenshot ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500" : "w-2 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next screenshot" className="grid place-items-center w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-purple-500/30 transition">
            <FaArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

// عارض الصور بملء الشاشة مع التنقل بالكيبورد
function Lightbox({ images, index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onMove]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      style={{ perspective: 1400 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white">
        <FaTimes />
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ rotateY: -70, opacity: 0, scale: 0.8 }}
          animate={{ rotateY: 0, opacity: 1, scale: 1 }}
          exit={{ rotateY: 70, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.35 }}
          className="max-w-[95vw] max-h-[88vh] overflow-auto rounded-xl border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={images[index]} alt="" className="w-full max-w-5xl h-auto" />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={(e) => (e.stopPropagation(), onMove(-1))} aria-label="Previous" className="absolute left-3 md:left-8 grid place-items-center w-12 h-12 rounded-full bg-white/10 hover:bg-purple-500/40 text-white">
            <FaArrowLeft />
          </button>
          <button onClick={(e) => (e.stopPropagation(), onMove(1))} aria-label="Next" className="absolute right-3 md:right-8 grid place-items-center w-12 h-12 rounded-full bg-white/10 hover:bg-purple-500/40 text-white">
            <FaArrowRight />
          </button>
          <span className="absolute bottom-5 font-mono text-sm text-gray-300">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </motion.div>
  );
}

function ListCard({ title, icon: Icon, items, accent }) {
  return (
    <Reveal3D className="h-full">
      <TiltCard max={6} className="h-full rounded-2xl p-7 bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_-25px_rgba(139,92,246,0.6)]">
        <div style={{ transform: "translateZ(35px)" }}>
          <h2 className={`flex items-center gap-3 text-2xl font-bold mb-5 ${accent}`}>
            <Icon /> {title}
          </h2>
          <ol className="space-y-3">
            {items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 text-gray-300"
              >
                <span className="shrink-0 font-mono text-xs mt-1 w-7 h-6 grid place-items-center rounded-md bg-white/5 border border-white/10 text-purple-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </motion.li>
            ))}
          </ol>
        </div>
      </TiltCard>
    </Reveal3D>
  );
}

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const idx = projects.findIndex((p) => p.id === projectId);
  const project = projects[idx];
  const [lightbox, setLightbox] = useState(null);

  const images = project ? (project.screenshots?.length ? project.screenshots : [project.image]) : [];
  const move = useCallback((d) => setLightbox((i) => (i + d + images.length) % images.length), [images.length]);
  const close = useCallback(() => setLightbox(null), []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
        <p className="font-mono text-purple-300">404 · project not found</p>
        <Link to="/projects" className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold">
          Back to projects
        </Link>
      </div>
    );
  }

  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const host = hostOf(project.demo, `${project.id}.app`);

  return (
    <div className="relative text-gray-100 px-4 md:px-8 lg:px-16 pt-24 md:pt-32 pb-24">
      {/* ===== رأس الصفحة ===== */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <button onClick={() => navigate("/projects")} className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-purple-300 mb-6">
            <FaArrowLeft size={11} /> cd ../projects
          </button>
          <div className="flex items-center gap-3 mb-4">
            {project.image && (
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-2">
                <img src={project.image} alt="" className="max-w-full max-h-full object-contain" />
              </span>
            )}
            {project.category && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 border border-pink-400/30 text-pink-300">{project.category}</span>
            )}
          </div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5"
            style={{ textShadow: "0 1px 0 #6d28d9,0 2px 0 #5b21b6,0 3px 0 #4c1d95,0 4px 0 #3b0764,0 5px 0 #2e1065,0 18px 35px rgba(124,58,237,.6)" }}
          >
            {project.title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">{project.description}</p>
          <div className="flex flex-wrap gap-4">
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ y: 4 }}
                style={{ boxShadow: "0 6px 0 #831843, 0 18px 40px rgba(236,72,153,.4)" }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-b from-pink-500 to-pink-700 text-white font-bold"
              >
                <FaRocket /> Live Demo
              </motion.a>
            )}
            {project.ved && (
              <motion.a
                href={project.ved}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ y: 4 }}
                style={{ boxShadow: "0 6px 0 #3b0764" }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-purple-500 bg-gray-950/60 text-purple-200 font-bold"
              >
                <FaPlayCircle /> How It Works
              </motion.a>
            )}
          </div>
          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8" style={{ perspective: 600 }}>
              {project.technologies.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg bg-gray-900/70 border border-white/10 text-gray-200 shadow-[0_3px_0_rgba(76,29,149,0.8)]"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>

        <LaptopMockup src={images[0]} host={host} />
      </section>

      {/* ===== المعرض ===== */}
      {images.length > 0 && (
        <section className="max-w-7xl mx-auto mt-28">
          <Heading3D className="text-4xl md:text-5xl mb-3">Screenshots</Heading3D>
          <p className="text-center text-gray-400 mb-8">Click the center image to view it full screen</p>
          <Coverflow key={project.id} images={images} title={project.title} onOpen={setLightbox} />
        </section>
      )}

      {/* ===== المميزات والتحديات ===== */}
      {(project.keyFeatures?.length > 0 || project.challenges?.length > 0) && (
        <section className="max-w-7xl mx-auto mt-28 grid md:grid-cols-2 gap-8">
          {project.keyFeatures?.length > 0 && <ListCard title="Key Features" icon={FaCheck} items={project.keyFeatures} accent="text-purple-300" />}
          {project.challenges?.length > 0 && <ListCard title="Challenges & Solutions" icon={FaPuzzlePiece} items={project.challenges} accent="text-pink-300" />}
        </section>
      )}

      {/* ===== المشروع السابق / التالي ===== */}
      <section className="max-w-7xl mx-auto mt-28 grid sm:grid-cols-2 gap-6">
        {[
          { p: prev, label: "Previous project", icon: FaArrowLeft, align: "text-left" },
          { p: next, label: "Next project", icon: FaArrowRight, align: "sm:text-right" },
        ].map(({ p, label, icon: Icon, align }) => (
          <Reveal3D key={label}>
            <Link to={p.detailsUrl} className="block">
              <TiltCard max={10} className="relative h-44 rounded-2xl overflow-hidden border border-white/10 group">
                <img src={p.screenshots?.[0] || p.image} alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-40 group-hover:opacity-60 group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-gray-950/10" />
                <div className={`relative h-full flex flex-col justify-end p-6 ${align}`} style={{ transform: "translateZ(40px)" }}>
                  <span className={`inline-flex items-center gap-2 font-mono text-xs text-purple-300 ${align.includes("right") ? "sm:justify-end" : ""}`}>
                    {label === "Previous project" && <Icon size={10} />} {label} {label === "Next project" && <Icon size={10} />}
                  </span>
                  <span className="text-2xl font-bold text-white mt-1">{p.title}</span>
                </div>
              </TiltCard>
            </Link>
          </Reveal3D>
        ))}
      </section>

      <AnimatePresence>{lightbox !== null && <Lightbox images={images} index={lightbox} onClose={close} onMove={move} />}</AnimatePresence>
    </div>
  );
}
