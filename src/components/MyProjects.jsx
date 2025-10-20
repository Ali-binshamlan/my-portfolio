import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaCode, FaRocket } from "react-icons/fa";
import { projects } from "./MyProjectsData";

// متحركات التحويم للبطاقة (تم تعديل قيم التحويم لتناسب الحجم الأصغر)
const cardHoverVariants = {
  hover: {
    scale: 1.03, // تكبير طفيف
    y: -5, // ارتفاع طفيف للأعلى
    rotate: -0.5, // دوران خفيف جداً
    boxShadow: "0 15px 30px -12px rgba(244, 114, 182, 0.4)", // ظل وردي
    transition: {
      duration: 0.3,
    },
  },
};

export default function MyProjects() {
  const navigate = useNavigate();

  return (
    <section
      id="projects"
      className="relative bg-gray-950 py-16 px-4 lg:px-12 text-gray-100 overflow-hidden" // ⬅️ تقليل padding
    >
      {/* خلفية متحركة - نقاط شهابية متوهجة (لا تغيير لتبقى مؤثرة) */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-pink-500 rounded-full opacity-30 blur-2xl"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0.5,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 1.2,
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 15 + i * 3,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <h2
        className="text-4xl font-extrabold text-center mb-12 relative z-10 
                     bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg"
      >
        My Creative Portfolio
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
        {" "}
        {/* ⬅️ تقليل gap وعرض max */}
        {projects.slice(0, 4).map((project, index) => (
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
            whileHover={{
              scale: 1.03,
              y: -5,
              rotate: -0.5,
              boxShadow: "0 15px 30px -12px rgba(244, 114, 182, 0.4)",
              transition: { duration: 0.3 },
            }}
            className="relative bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-xl overflow-visible
             flex flex-col border border-gray-700/50 cursor-pointer"
          >
            {/* لمعة زجاجية */}
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

            {/* الصورة */}
            <div className="w-full h-40 bg-gray-800/80 flex items-center justify-center p-4 border-b border-gray-700/50">
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
