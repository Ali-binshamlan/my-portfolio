import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCode, FaRocket } from "react-icons/fa";
import { projects } from "./MyProjectsData";
import TiltCard from "./three/TiltCard";
import Heading3D from "./three/Heading3D";
import InView from "./three/InView";
import { lazy } from "react";

const MiniScene = lazy(() => import("./three/MiniScene"));

export default function MyProjects() {
  const navigate = useNavigate();

  return (
    <section
      id="projects"
      className="relative py-16 px-4 lg:px-12 text-gray-100 overflow-hidden mt-0 md:mt-10" // ⬅️ تقليل الـ padding
    >
      {/* العنوان الرئيسي */}
      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-6 mb-10">
        <div>
          <Heading3D as="h1" className="text-5xl md:text-6xl md:text-left">
            My Portfolio Showcase
          </Heading3D>
          <p className="text-gray-400 mt-4 text-center md:text-left">
            AI platforms, dashboards and consumer websites — move your mouse over a card to see it in 3D.
          </p>
        </div>
        <InView className="h-[260px] md:h-[320px]">
          <MiniScene variant="crystal" />
        </InView>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10"> {/* ⬅️ تقليل الـ gap وعرض max */}
        {/* عرض جميع المشاريع */}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 90 }} // ⬅️ تسريع بسيط
            viewport={{ once: true, amount: 0.3 }}
            
            className="h-full"
          >
            <TiltCard className={` rounded-2xl shadow-lg overflow-hidden                        flex flex-col border border-gray-700/50 transition duration-300 transform                         group relative hover:border-pink-500/80 cursor-pointer bg-gray-900/40 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(139,92,246,0.45)]`}>
            {/* لمعة زجاجية عند التحويم */}
            <div className="absolute inset-0 rounded-2xl opacity-0 transition duration-500 
                            bg-white/5 group-hover:opacity-100 pointer-events-none"></div>

            {/* منطقة الصورة */}
            <div className="w-full h-40 bg-gray-800/80 p-4 flex items-center justify-center overflow-hidden 
                            border-b border-gray-700/50 transition duration-300 group-hover:bg-gray-700"> {/* ⬅️ تقليل الارتفاع والـ padding */}
              <img
                src={project.image}
                alt={project.title}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                loading="lazy"
              />
            </div>

            {/* المحتوى */}
            <div className="p-6 flex flex-col flex-grow"> {/* ⬅️ تقليل الـ padding */}
              <h3 className="text-2xl font-bold text-purple-400 mb-2 flex items-center gap-2"> {/* ⬅️ تقليل حجم الخط والـ margin */}
                 <FaCode className="text-pink-500" size={20} /> {project.title}
              </h3>
              
              <p className="text-gray-300 mb-4 flex-grow whitespace-pre-line text-base"> {/* ⬅️ تقليل حجم الخط والـ margin */}
                {project.description}
              </p>

              {/* الأزرار */}
              <div className="mt-auto flex gap-3 flex-wrap"> {/* ⬅️ تقليل الـ gap */}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-pink-600 text-white rounded-full 
                               hover:bg-pink-700 transition font-semibold shadow-md shadow-pink-500/30" // ⬅️ تقليل الـ padding
                  >
                    <FaRocket size={14} /> Live Demo {/* ⬅️ تقليل حجم الأيقونة */}
                  </a>
                )}

                {project.detailsUrl && (
                  <button
                    onClick={() => navigate(project.detailsUrl)}
                    className="inline-flex items-center gap-2 px-5 py-2 border border-purple-500 text-purple-400 
                               rounded-full hover:bg-purple-900/50 transition font-semibold cursor-pointer" // ⬅️ تقليل الـ padding
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}