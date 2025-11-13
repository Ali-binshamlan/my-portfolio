import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCode, FaRocket } from "react-icons/fa";
import { projects } from "./MyProjectsData";

// متحركات التحويم للبطاقة (تم تعديل قيم التحويم لتناسب الحجم الأصغر)
const cardHoverVariants = {
  hover: {
    scale: 1.03, 
    y: -5, 
    rotate: -0.5, // دوران خفيف جداً
    boxShadow: "0 15px 30px -12px rgba(244, 114, 182, 0.3)", // ظل وردي أخف
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
      className="relative bg-gray-950 py-16 px-4 lg:px-12 text-gray-100 overflow-hidden mt-0 md:mt-10" // ⬅️ تقليل الـ padding
    >
      {/* خلفية متحركة - نقاط شهابية متوهجة (تقليل Opacity) */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none"> {/* ⬅️ تقليل الشفافية */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-pink-500 rounded-full opacity-30 blur-xl" // ⬅️ تقليل الحجم والتوهج
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0.5 
            }}
            animate={{ 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 1.2 
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

      {/* العنوان الرئيسي */}
      <h2 className="text-4xl font-extrabold text-center mb-12 relative z-10 {/* ⬅️ تقليل حجم الخط و الـ margin */}
                     bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
        My Portfolio Showcase
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10"> {/* ⬅️ تقليل الـ gap وعرض max */}
        {/* عرض جميع المشاريع */}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 90 }} // ⬅️ تسريع بسيط
            viewport={{ once: true, amount: 0.3 }}
            
            variants={cardHoverVariants}
            whileHover="hover"
            
            className=" rounded-2xl shadow-lg overflow-hidden
                       flex flex-col border border-gray-700/50 transition duration-300 transform 
                       group relative hover:border-pink-500/80 cursor-pointer" 
          >
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}