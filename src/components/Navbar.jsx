// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaHome, FaBriefcase, FaProjectDiagram, FaCode, FaEnvelope, FaDownload } from "react-icons/fa";

const CV_URL = "/Ali-Bin-Shamlan_CV.pdf";

const links = [
  { id: "home", label: "Home", icon: FaHome },
  { id: "experience", label: "Experience", icon: FaBriefcase },
  { id: "projects", label: "Projects", icon: FaProjectDiagram },
  { id: "skills", label: "Skills", icon: FaCode },
  { id: "contact", label: "Contact", icon: FaEnvelope },
];

// صورة علي الشخصية بإطار متوهج يدور
function Avatar({ size = 36 }) {
  return (
    <span className="relative grid place-items-center shrink-0" style={{ width: size, height: size }} aria-hidden>
      <motion.span
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#a855f7,#ec4899,#f59e0b,#a855f7)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <img
        src="/avatar-nav.jpg"
        alt=""
        className="relative rounded-full object-cover border-2 border-gray-950 transition-transform duration-300 group-hover:scale-110"
        style={{ width: size - 4, height: size - 4 }}
      />
      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-gray-950" />
    </span>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // إخفاء الشريط عند النزول وإظهاره عند الصعود
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    setHidden(y > prev && y > 240);
  });

  // تتبّع القسم الظاهر حالياً
  useEffect(() => {
    if (!onHome) {
      setActive(location.pathname.startsWith("/projects") ? "projects" : location.pathname.toLowerCase() === "/contact" ? "contact" : "");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [onHome, location.pathname]);

  const go = (id) => {
    if (!onHome) {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ===== سطح المكتب ===== */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="hidden md:block fixed top-3 inset-x-0 z-50 px-6"
      >
        <nav
          aria-label="Main"
          style={{ transformPerspective: 900 }}
          className={`mx-auto max-w-5xl flex items-center justify-between gap-6 rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "bg-gray-950/70 px-4 py-2 shadow-[0_8px_0_rgba(30,27,75,0.7),0_20px_50px_-10px_rgba(124,58,237,0.5)]"
              : "bg-gray-900/30 px-5 py-3 shadow-[0_10px_40px_-15px_rgba(124,58,237,0.5)]"
          }`}
        >
          <button onClick={() => go("home")} className="flex items-center gap-3 group" aria-label="Go to top">
            <Avatar size={38} />
            <span className="font-bold text-white tracking-tight">
              Ali<span className="text-purple-400">.</span>
              <span className="hidden lg:inline text-gray-400 font-medium"> Bin Shamlan</span>
            </span>
          </button>

          <ul className="flex items-center gap-1 rounded-xl bg-white/[0.03] border border-white/5 p-1">
            {links.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-purple-400 ${
                    active === id ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700 shadow-[0_4px_0_#3b0764,0_8px_20px_rgba(168,85,247,0.45)]"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </li>
            ))}
          </ul>

          <motion.a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ y: 3 }}
            style={{ boxShadow: "0 4px 0 #831843, 0 10px 25px rgba(236,72,153,.35)" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-b from-pink-500 to-pink-700 text-white text-sm font-semibold"
          >
            <FaDownload size={12} /> CV
          </motion.a>
        </nav>
      </motion.header>

      {/* ===== الجوال: شريط علوي صغير ===== */}
      <AnimatePresence>
        {!hidden && (
          <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-2 inset-x-3 z-50 flex items-center justify-between rounded-2xl border border-white/10 bg-gray-950/70 backdrop-blur-xl px-3 py-2 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)]"
          >
            <button onClick={() => go("home")} className="flex items-center gap-2 group" aria-label="Go to top">
              <Avatar size={32} />
              <span className="font-bold text-white">
                Ali<span className="text-purple-400">.</span>
              </span>
            </button>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ boxShadow: "0 3px 0 #831843" }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-b from-pink-500 to-pink-700 text-white text-xs font-semibold"
            >
              <FaDownload size={10} /> CV
            </a>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ===== الجوال: شريط سفلي (Dock) ===== */}
      <motion.nav
        aria-label="Sections"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.2 }}
        className="md:hidden fixed bottom-3 inset-x-3 z-50 rounded-2xl border border-white/10 bg-gray-950/80 backdrop-blur-xl shadow-[0_-6px_30px_-10px_rgba(124,58,237,0.6)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {links.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  aria-label={label}
                  aria-current={isActive ? "true" : undefined}
                  className="relative w-full flex flex-col items-center gap-0.5 py-2"
                >
                  <motion.span
                    animate={{ y: isActive ? -10 : 0, scale: isActive ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className={`grid place-items-center w-9 h-9 rounded-xl transition-colors ${
                      isActive
                        ? "bg-gradient-to-b from-purple-500 to-purple-700 text-white shadow-[0_4px_0_#3b0764,0_10px_20px_rgba(168,85,247,0.55)]"
                        : "text-gray-400"
                    }`}
                  >
                    <Icon size={15} />
                  </motion.span>
                  <span className={`text-[10px] font-medium -mt-1 ${isActive ? "text-purple-300" : "text-gray-500"}`}>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
