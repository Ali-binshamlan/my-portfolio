import { lazy } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiTypescript, SiRedux, SiNextdotjs, SiTailwindcss, SiAxios, SiApollographql } from "react-icons/si";
import { MdDesignServices, MdSpeed } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import TiltCard from "./three/TiltCard";
import Reveal3D from "./three/Reveal3D";
import Heading3D from "./three/Heading3D";
import InView from "./three/InView";

const SkillsGlobe = lazy(() => import("./three/SkillsGlobe"));

const iconMap = {
  JavaScript: <FaJs className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-400" />,
  HTML5: <FaHtml5 className="text-orange-400" />,
  CSS3: <FaCss3Alt className="text-blue-500" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  "React.js": <FaReact className="text-cyan-300" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-300" />,
  "Bootstrap 5": <FaBootstrap className="text-indigo-400" />,
  Redux: <SiRedux className="text-purple-400" />,
  "REST APIs": <SiApollographql className="text-gray-300" />,
  Axios: <SiAxios className="text-sky-400" />,
  Git: <FaGitAlt className="text-orange-500" />,
  GitHub: <FaGithub className="text-white" />,
  "VS Code": <VscVscode className="text-sky-500" />,
  "Responsive Web Design": <MdDesignServices className="text-pink-400" />,
  "Performance Optimization": <MdSpeed className="text-green-400" />,
};

const skillCategories = [
  { title: "Languages", skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"] },
  { title: "Frameworks & Libraries", skills: ["Next.js", "React.js", "Tailwind CSS", "Bootstrap 5", "Redux"] },
  { title: "APIs & Tools", skills: ["REST APIs", "Axios", "Git", "GitHub", "VS Code"] },
  { title: "Other Tools", skills: [], extra: ["CI/CD", "Agile", "Scrum"] },
  {
    title: "Core Competencies",
    skills: ["Responsive Web Design", "Performance Optimization"],
    extra: ["REST API Integration", "Clean Code"],
  },
];

const softSkills = ["Communication", "Problem Solving", "Teamwork", "Time Management", "Flexibility"];

const globeSkills = Object.entries(iconMap).map(([name, icon]) => ({ name, icon }));

export default function MySkills() {
  return (
    <section id="skills" className="relative scroll-mt-16 text-gray-100 py-24 px-6 lg:px-20">
      <Heading3D className="text-5xl mb-6">My Skills</Heading3D>
      <p className="text-center text-gray-400 mb-6">Drag your mouse over the globe — hover a skill to pause it</p>

      {/* كرة المهارات ثلاثية الأبعاد */}
      <InView className="h-[420px] md:h-[560px] max-w-4xl mx-auto -mb-6">
        <SkillsGlobe skills={globeSkills} />
      </InView>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => (
          <Reveal3D key={category.title} delay={index * 0.1} from={index % 2 ? "right" : "left"}>
            <TiltCard className="bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-[0_20px_60px_-20px_rgba(139,92,246,0.45)] border border-white/10 hover:border-purple-500 transition-colors duration-300">
              <h3 className="text-2xl font-bold text-purple-400 mb-6" style={{ transform: "translateZ(50px)" }}>
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ transformStyle: "preserve-3d" }}>
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    style={{ transform: "translateZ(30px)" }}
                    className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-3 rounded-xl text-gray-200 font-medium hover:bg-white/10 transition"
                  >
                    {iconMap[skill]}
                    <span>{skill}</span>
                  </div>
                ))}
                {category.extra?.map((s) => (
                  <div key={s} style={{ transform: "translateZ(30px)" }} className="px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-200 font-medium">
                    {s}
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal3D>
        ))}
      </div>

      <Reveal3D className="max-w-6xl mx-auto mt-12">
        <h3 className="text-center text-2xl font-bold text-purple-400 mb-5">Soft Skills</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {softSkills.map((s) => (
            <span key={s} className="px-5 py-2 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 border border-white/10 text-gray-200 shadow-[0_6px_0_#1f1638,0_12px_25px_rgba(124,58,237,0.35)] hover:translate-y-1 hover:shadow-[0_2px_0_#1f1638,0_6px_15px_rgba(124,58,237,0.35)] transition-all">
              {s}
            </span>
          ))}
        </div>
      </Reveal3D>
    </section>
  );
}
