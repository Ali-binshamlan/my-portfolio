import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { projects } from "./MyProjectsData";

export default function MyProjects() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="bg-gray-50 py-16 px-6 lg:px-20">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14">
        My Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="w-full h-48 bg-white p-4 flex items-center justify-center overflow-hidden rounded-t-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-700 mb-5 flex-grow whitespace-pre-line">
                {project.description}
              </p>



              <div className="mt-auto flex gap-4 flex-wrap">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    Live Demo
                  </a>
                )}

                {project.detailsUrl && (
                  <button
                    onClick={() => navigate(project.detailsUrl)}
                    className="px-5 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold"
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
