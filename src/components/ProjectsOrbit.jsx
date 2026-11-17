import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaRocket, FaCode, FaExternalLinkAlt } from "react-icons/fa";

// بطاقة على شكل نافذة متصفح تعرض لقطة من المشروع
function BrowserCard({ project, active, onClick, width }) {
  const cover = project.screenshots?.[0] || project.image;
  const host = (() => {
    try {
      return new URL(project.demo).host;
    } catch {
      return `${project.id}.app`;
    }
  })();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={project.title}
      style={{ width, height: width * 0.68 }}
      className={`group block rounded-xl overflow-hidden border text-left transition-[border-color,box-shadow,filter] duration-500 bg-gray-950 ${
        active
          ? "border-purple-400/80 shadow-[0_0_60px_-5px_rgba(168,85,247,0.75)]"
          : "border-white/10 brightness-[0.55] hover:brightness-90"
      }`}
    >
      <div className="flex items-center gap-1.5 px-3 h-7 bg-gray-900 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 flex-1 truncate rounded bg-gray-800 px-2 text-[10px] leading-4 text-gray-400 font-mono">
          {host}
        </span>
      </div>
      <div className="relative w-full h-[calc(100%-1.75rem)] bg-gray-900">
        <img src={cover} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
        <span className="absolute bottom-2 left-3 text-white font-bold text-sm drop-shadow">
          {project.title.split("(")[0].trim()}
        </span>
      </div>
    </button>
  );
}

export default function ProjectsOrbit({ projects, title = "Featured Projects", id = "projects" }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const n = projects.length;
  const step = 360 / n;
  const [active, setActive] = useState(0);
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const mobile = vw < 768;
  const cardW = mobile ? 210 : 320;
  const radius = Math.round((cardW / 2 + (mobile ? 18 : 30)) / Math.tan(Math.PI / n));

  // التمرير يدير الحلقة: كل جزء من التمرير = مشروع
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, -step * (n - 1)]);
  const rotate = useSpring(rawRotate, { stiffness: 70, damping: 20, mass: 0.6 });
  const tiltX = useTransform(scrollYProgress, [0, 0.5, 1], [-14, -6, -14]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);
  const progressW = useTransform(scrollYProgress, (v) => `${Math.max(v, 0.02) * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActive((prev) => (prev === i ? prev : i));
  });

  // الانتقال لمشروع معيّن عن طريق تمرير الصفحة لموضعه
  const goTo = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const idx = (i + n) % n;
    window.scrollTo({ top: top + (idx / (n - 1)) * travel + 2, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e) => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r || r.top > 0 || r.bottom < window.innerHeight) return;
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const p = projects[active];
  const short = p.description.length > 190 ? p.description.slice(0, 190).trim() + "…" : p.description;

  return (
    <section id={id} ref={sectionRef} className="relative text-gray-100" style={{ height: `${n * 55 + 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col pt-14 md:pt-24 pb-24 md:pb-6">
        {/* زخارف برمجية في الخلفية */}
        <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
          <span className="absolute -left-10 top-1/4 text-[22vw] font-black font-mono text-white/[0.025] leading-none">{"</>"}</span>
          <span className="absolute right-0 bottom-10 text-[14vw] font-black font-mono text-purple-500/[0.05] leading-none">{"{ }"}</span>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.07)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        </div>

        {/* العنوان على شكل سطر أوامر */}
        <motion.div style={{ y: headingY }} className="relative z-10 text-center px-4">
          <p className="font-mono text-sm md:text-base text-purple-300/80">
            <span className="text-green-400">ali@portfolio</span>
            <span className="text-gray-500">:</span>
            <span className="text-sky-400">~/projects</span>
            <span className="text-gray-500">$ </span>
            ls --view=3d
          </p>
          <h2
            className="mt-1 md:mt-2 text-3xl md:text-6xl font-extrabold text-white tracking-tight"
            style={{ textShadow: "0 1px 0 #6d28d9,0 2px 0 #5b21b6,0 3px 0 #4c1d95,0 4px 0 #3b0764,0 5px 0 #2e1065,0 16px 30px rgba(124,58,237,.55)" }}
          >
            {title}
          </h2>
        </motion.div>

        <div className="relative z-10 flex-1 grid md:grid-cols-[1.25fr_1fr] items-center gap-4 md:gap-10 max-w-7xl w-full mx-auto px-4 md:px-10">
          {/* الحلقة ثلاثية الأبعاد */}
          <div className="relative h-[200px] md:h-full flex items-center justify-center" style={{ perspective: mobile ? 900 : 1500 }}>
            <div className="absolute bottom-[8%] w-[80%] h-16 rounded-[50%] bg-purple-600/30 blur-3xl" />
            <motion.div
              className="relative"
              style={{ transformStyle: "preserve-3d", rotateX: tiltX, width: cardW, height: cardW * 0.68 }}
            >
              <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", rotateY: rotate, z: -radius }}>
                {projects.map((proj, i) => (
                  <div
                    key={proj.id}
                    className="absolute inset-0"
                    style={{
                      transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <BrowserCard
                      project={proj}
                      width={cardW}
                      active={i === active}
                      onClick={() => (i === active ? navigate(proj.detailsUrl) : goTo(i))}
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* لوحة تفاصيل المشروع النشط */}
          <div className="relative" style={{ perspective: 1200 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, rotateX: -60, y: 30 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: 60, y: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "50% 0%" }}
                className="rounded-2xl p-4 md:p-7 bg-gray-900/50 backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(139,92,246,0.8)]"
              >
                <div className="flex items-center justify-between font-mono text-xs md:text-sm mb-3">
                  <span className="flex items-center gap-3">
                    <span className="text-purple-300">
                      {String(active + 1).padStart(2, "0")} <span className="text-gray-600">/ {String(n).padStart(2, "0")}</span>
                    </span>
                    {p.category && (
                      <span className="px-2 py-0.5 rounded-md bg-pink-500/10 border border-pink-400/20 text-pink-300 text-[11px]">{p.category}</span>
                    )}
                  </span>
                  {p.image && <img src={p.image} alt="" className="h-8 md:h-10 w-auto object-contain" />}
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-white flex items-center gap-2">
                  <FaCode className="text-pink-500 shrink-0" /> {p.title}
                </h3>
                <p className="text-gray-300 mt-3 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">{short}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.technologies?.slice(0, mobile ? 3 : 6).map((t) => (
                    <span key={t} className="font-mono text-[11px] md:text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-200 border border-purple-400/20">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap mt-4 md:mt-5">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ boxShadow: "0 5px 0 #831843, 0 14px 30px rgba(236,72,153,.35)" }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-pink-500 to-pink-700 font-semibold text-white active:translate-y-1 transition"
                    >
                      <FaRocket size={13} /> Live Demo
                    </a>
                  )}
                  {p.detailsUrl && (
                    <button
                      onClick={() => navigate(p.detailsUrl)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-400/60 text-purple-200 font-semibold hover:bg-purple-500/15 transition"
                    >
                      Details <FaExternalLinkAlt size={11} />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* التحكم والتقدم */}
            <div className="flex items-center gap-4 mt-3 md:mt-6">
              <button onClick={() => goTo(active - 1)} aria-label="Previous project" className="grid place-items-center w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-purple-500/30 transition">
                <FaArrowLeft size={13} />
              </button>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div style={{ width: progressW }} className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400" />
              </div>
              <button onClick={() => goTo(active + 1)} aria-label="Next project" className="grid place-items-center w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-purple-500/30 transition">
                <FaArrowRight size={13} />
              </button>
            </div>
            <p className="hidden md:block mt-3 font-mono text-xs text-gray-500">// scroll, use ← → keys, or click a card</p>
          </div>
        </div>
      </div>
    </section>
  );
}
