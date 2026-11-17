import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaArrowUp } from "react-icons/fa";

const socials = [
  { href: "https://github.com/Ali-binshamlan", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/ali-bin-shamlan-ba6237341/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://wa.me/966531015711", icon: FaWhatsapp, label: "WhatsApp" },
  { href: "mailto:alishamlan47@gmail.com", icon: FaEnvelope, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10 bg-gradient-to-b from-transparent to-black/60 overflow-hidden">
      {/* نص ضخم بمنظور ثلاثي الأبعاد كأرضية */}
      <div className="pointer-events-none select-none absolute inset-x-0 -bottom-6 flex justify-center" style={{ perspective: 600 }} aria-hidden>
        <span
          className="font-black tracking-tighter text-[18vw] leading-none bg-gradient-to-b from-purple-500/25 to-transparent bg-clip-text text-transparent"
          style={{ transform: "rotateX(45deg)", transformOrigin: "bottom" }}
        >
          ALI.DEV
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3 items-start">
        <div>
          <p className="font-bold text-xl text-white">
            Ali Bin Shamlan<span className="text-purple-400">.</span>
          </p>
          <p className="text-gray-400 mt-2">Software Engineer (Next.js) · Riyadh, Saudi Arabia</p>
        </div>

        <div className="font-mono text-sm text-gray-400 bg-gray-950/60 border border-white/10 rounded-xl p-4">
          <p><span className="text-green-400">$</span> echo $STATUS</p>
          <p className="text-gray-200 mt-1">
            Open to new opportunities <span className="inline-block w-2 h-4 align-middle bg-purple-400 animate-pulse" />
          </p>
        </div>

        <div className="flex md:justify-end gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -4, rotateX: 15 }}
              whileTap={{ y: 2 }}
              style={{ boxShadow: "0 5px 0 #1e1b4b, 0 12px 25px rgba(124,58,237,.35)", transformPerspective: 400 }}
              className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/10 text-gray-200 hover:text-white"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Ali Bin Shamlan. Built with React, Three.js & Framer Motion.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-purple-500/20 text-gray-300"
        >
          <FaArrowUp size={11} /> Back to top
        </button>
      </div>
    </footer>
  );
}
