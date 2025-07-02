import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap } from "react-icons/fa";
import { SiTypescript, SiRedux, SiNextdotjs, SiTailwindcss, SiAxios, SiApollographql } from "react-icons/si";
import { MdDesignServices, MdSpeed } from "react-icons/md";

const iconMap = {
  HTML5: <FaHtml5 className="text-orange-500" />,
  CSS3: <FaCss3Alt className="text-blue-600" />,
  "JavaScript (ES6+)": <FaJs className="text-yellow-500" />,
  TypeScript: <SiTypescript className="text-blue-700" />,
  "React.js": <FaReact className="text-cyan-400" />,
  "Next.js": <SiNextdotjs className="text-black" />,
  Redux: <SiRedux className="text-purple-600" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-400" />,
  "React Router": <FaReact className="text-pink-400" />,
  "Bootstrap 5": <FaBootstrap className="text-indigo-500" />,
  Axios: <SiAxios className="text-sky-600" />,
  "REST APIs": <SiApollographql className="text-gray-700" />,
  "Responsive Design": <MdDesignServices className="text-pink-500" />,
  "App Performance Optimization": <MdSpeed className="text-green-500" />,
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
      "Bootstrap 5"
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
    <section id="skills" className="bg-gradient-to-br from-purple-50 to-white py-20 px-6 lg:px-20">
      <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-14">
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
            className="bg-white p-8 rounded-3xl shadow-xl border hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-6">
              {category.title}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {category.skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-purple-50 px-4 py-3 rounded-xl text-purple-800 font-medium hover:bg-purple-100 transition"
                >
                  {iconMap[skill] || <span className="text-xl">🎯</span>}
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
