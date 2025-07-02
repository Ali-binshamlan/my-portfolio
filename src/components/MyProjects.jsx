import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


const projects = [
  {
    id: "ai-radiologist",
    title: "AI-Radiologist (Medical Imaging Platform)",
    demo: "https://mohammed-invs7.github.io/AI_Radiologist/",
    image: "/ai-radiologist.png",
    description:
      "Responsive medical platform for uploading and analyzing X-ray images using AI. Includes authentication, routing, protected dashboards, and user/admin interfaces.",
    tech: [
      "React.js",
      "React Router",
      "Axios",
      "React Hook Form",
      "Yup",
      "Context API",
      "Bootstrap 5",
      "SweetAlert2",
      "Framer Motion",
      "JWT",
    ],
    detailsUrl: "/projects/ai-radiologist", // رابط تفاصيل المشروع (داخل الموقع)
  },
  {
    id: "ai-radiologist-admin",
    title: "AI-Radiologist Admin Dashboard",
    image: "/ai-radiologist.png",
    description:
      "Standalone admin panel for managing users, reports, and AI models. Secure routes, CRUD operations with modals, and animated user feedback.",
    tech: [
      "React.js",
      "React Router",
      "Axios",
      "Yup",
      "React Hook Form",
      "JWT",
      "Framer Motion",
      "Bootstrap 5",
      "React Toastify",
      "SweetAlert2",
    ],
    detailsUrl: "/projects/ai-radiologist-admin",
  },
  {
    id: "tarf-ecommerce",
    title: "TARF (E-Commerce Web App)",
    image: "/tarf.png",
    description:
      "Modern online store built with Next.js and Tailwind CSS. Includes product listing, detail pages, cart system, and checkout. State management handled via Redux.",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "Axios",
      "REST APIs",
      "React Toastify",
      "React Hook Form",
      "Yup",
      "Context API",
    ],
    detailsUrl: "/projects/tarf-ecommerce",
  },
  {
    id: "movie-web-app",
    title: "Movie Web App",
    demo: "https://movie-web-app-lilac.vercel.app/",
    image: "/movie.png",
    description:
      "Movie browsing web app using TMDB API. Features include category filters, genre pages, movie details, and sliders. Built with Next.js and Swiper.js.",
    tech: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Swiper.js",
      "Axios",
      "REST APIs",
    ],
    detailsUrl: "/projects/movie-web-app",
  },
];

export default function MyProjects() {
  return (
    <section id="projects" className="bg-gray-50 py-16 px-6 lg:px-20 relative">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14">
        My Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition flex flex-col"
          >
            {project.image && (
              <div className="w-full h-48 bg-white p-4 flex items-center justify-center overflow-hidden rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-purple-700 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-700 mb-6 line-clamp-3 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-sm text-purple-400 font-medium">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>

              <Link
                to={project.detailsUrl || "/"}
                className="mt-auto inline-block bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition text-center"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold 
                     bg-gradient-to-r from-purple-600 to-purple-700 
                     text-white hover:brightness-110 transition"
        >
          View All Projects <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}
