import { lazy } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaFileAlt, FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import ContactForm from "./ContactForm";
import TiltCard from "./three/TiltCard";
import Reveal3D from "./three/Reveal3D";
import Heading3D from "./three/Heading3D";
import InView from "./three/InView";

const MiniScene = lazy(() => import("./three/MiniScene"));

const links = [
  { label: "Email Me", href: "mailto:alishamlan47@gmail.com", icon: FaEnvelope, color: "from-purple-600 to-purple-800", edge: "#3b0764" },
  { label: "WhatsApp", href: "https://wa.me/966531015711", icon: FaWhatsapp, color: "from-green-600 to-green-800", edge: "#052e16" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ali-bin-shamlan-ba6237341/", icon: FaLinkedin, color: "from-blue-600 to-blue-800", edge: "#172554" },
  { label: "GitHub", href: "https://github.com/Ali-binshamlan", icon: FaGithub, color: "from-gray-600 to-gray-800", edge: "#111827" },
  { label: "Resume", href: "/Ali-Bin-Shamlan_CV.pdf", icon: FaFileAlt, color: "from-pink-600 to-pink-800", edge: "#500724" },
];

export default function GetInTouch() {
  return (
    <section id="contact" className="relative scroll-mt-10 py-24 px-6 lg:px-20 text-gray-100 md:pt-28">
      <Heading3D className="text-5xl mb-4">Get In Touch</Heading3D>
      <p className="flex items-center justify-center gap-2 text-gray-400 mb-6">
        <FaMapMarkerAlt /> Riyadh, Saudi Arabia
      </p>

      <InView className="h-[280px] md:h-[340px] max-w-xl mx-auto">
        <MiniScene variant="globe" />
      </InView>

      <Reveal3D className="max-w-6xl mx-auto">
        <TiltCard max={5} className="rounded-3xl p-8 md:p-12 bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(139,92,246,0.7)]">
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-10" style={{ transformStyle: "preserve-3d" }}>
            <div className="flex-1" style={{ transform: "translateZ(30px)" }}>
              <ContactForm />
            </div>

            {/* أزرار ثلاثية الأبعاد بحافة سفلية تنضغط عند الضغط */}
            <div className="flex flex-col gap-5 flex-1 justify-center" style={{ transform: "translateZ(50px)" }}>
              {links.map(({ label, href, icon: Icon, color, edge }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 5, boxShadow: `0 1px 0 ${edge}` }}
                  style={{ boxShadow: `0 6px 0 ${edge}, 0 15px 30px rgba(0,0,0,0.45)` }}
                  className={`flex items-center gap-3 bg-gradient-to-b ${color} text-white px-6 py-4 rounded-xl font-semibold border border-white/10`}
                >
                  <Icon className="text-xl" />
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </TiltCard>
      </Reveal3D>
    </section>
  );
}
