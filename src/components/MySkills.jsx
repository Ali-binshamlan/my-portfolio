import { motion } from "framer-motion";
import TiltCard from "./three/TiltCard";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap } from "react-icons/fa";
import {
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiTailwindcss,
  SiAxios,
  SiApollographql,
} from "react-icons/si";
import { MdDesignServices, MdSpeed } from "react-icons/md";

const iconMap = {
  HTML5: <FaHtml5 className="text-orange-400" />,
  CSS3: <FaCss3Alt className="text-blue-500" />,
  "JavaScript (ES6+)": <FaJs className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-400" />,
  "React.js": <FaReact className="text-cyan-300" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  Redux: <SiRedux className="text-purple-400" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-300" />,
  "React Router": <FaReact className="text-pink-400" />,
  "Bootstrap 5": <FaBootstrap className="text-indigo-400" />,
  Axios: <SiAxios className="text-sky-400" />,
  "REST APIs": <SiApollographql className="text-gray-300" />,
  "Responsive Design": <MdDesignServices className="text-pink-400" />,
  "App Performance Optimization": <MdSpeed className="text-green-400" />,
};

const skillCategories = [
  {
    title: "Core Skills",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React.js",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "React Router",
      "Bootstrap 5",
    ],
  },
  {
    title: "API & Networking",
    skills: ["Axios", "REST APIs"],
  },
  {
    title: "Additional Expertise",
    skills: ["Responsive Design", "App Performance Optimization"],
  },
];

export default function MySkills() {
  return (
    <section
      id="skills"
      className="text-gray-100 py-20 px-6 lg:px-20"
    >
      <h2 className="text-4xl font-extrabold text-center text-white mb-14">
        My Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <TiltCard className="bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_60px_-20px_rgba(139,92,246,0.45)] border border-white/10 hover:border-purple-500 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-purple-400 mb-6">
              {category.title}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {category.skills.map((skill, i) => (
                <div
                  key={i}
                  style={{ transform: "translateZ(30px)" }}
                  className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-3 rounded-xl text-gray-200 font-medium hover:bg-gray-700 transition"
                >
                  {iconMap[skill] || <span className="text-xl">🎯</span>}
                  <span>{skill}</span>
                </div>
              ))}
            </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
