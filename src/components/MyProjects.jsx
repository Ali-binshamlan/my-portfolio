import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaCode, FaRocket } from "react-icons/fa";
import { projects } from "./MyProjectsData";
import TiltCard from "./three/TiltCard";
import Heading3D from "./three/Heading3D";

export default function MyProjects() {
  const navigate = useNavigate();

  return (
    <section
      id="projects"
      className="relative py-16 px-4 lg:px-12 text-gray-100 overflow-hidden" // ⬅️ تقليل padding
    >
      <Heading3D className="text-5xl mb-14">My Creative Portfolio</Heading3D>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl rounded-2xl mx-auto relative z-10">
        {" "}
        {/* ⬅️ تقليل gap وعرض max */}
        {projects.slice(0, 6).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="h-full"
          >
            <TiltCard className={`relative bg-gray-900/50  backdrop-blur-md rounded-2xl shadow-xl overflow-visible              flex flex-col border border-gray-700/50 cursor-pointer bg-gray-900/40 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(139,92,246,0.45)]`}>
            {/* لمعة زجاجية */}
            <div className="absolute inset-0 rounded-2xl bg-white/5  opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

            {/* الصورة */}
            <div className="w-full h-40 bg-gray-800/80 flex items-center rounded-tr-2xl rounded-tl-2xl justify-center p-4 border-b border-gray-700/50">
              <img
                src={project.image}
                alt={project.title}
                className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* المحتوى */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-purple-400 mb-2 flex items-center gap-2">
                <FaCode className="text-pink-500" /> {project.title}
              </h3>
              <p className="text-gray-300 mb-4 text-base flex-grow">
                {project.description}
              </p>

              <div className="flex gap-3 flex-wrap mt-auto">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2 bg-pink-600 text-white rounded-full
                     hover:bg-pink-700 transition font-semibold shadow-md shadow-pink-500/30"
                  >
                    Live Demo
                  </a>
                )}

                {project.detailsUrl && (
                  <button
                    onClick={() => navigate(project.detailsUrl)}
                    className="flex items-center gap-2 px-5 py-2 border border-purple-500 text-purple-400
                     rounded-full hover:bg-purple-900/50 transition font-semibold"
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

      <div className="text-center mt-12 relative z-10">
        {" "}
        {/* ⬅️ تقليل الـ margin */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base // ⬅️ تقليل الـ padding وحجم الخط
                     bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white hover:brightness-125 transition shadow-lg shadow-pink-500/40 transform hover:scale-105"
        >
          View All Projects <FaArrowRight size={16} />{" "}
          {/* ⬅️ تقليل حجم الأيقونة */}
        </Link>
      </div>
    </section>
  );
}
