import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
                    loading="lazy"
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
                        className="px-5 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold cursor-pointer"
                      >
                        View Details
                      </button>
                    )}
                  </div>
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
