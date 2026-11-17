import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { projects } from "./MyProjectsData";
import ProjectsOrbit from "./ProjectsOrbit";

export default function MyProjects() {
  return (
    <>
      <ProjectsOrbit projects={projects} title="Featured Projects" />
      <div className="text-center mt-16 mb-24 relative z-10">
        <Link
          to="/projects"
          style={{ boxShadow: "0 6px 0 #4c1d95, 0 18px 40px rgba(236,72,153,.35)" }}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 active:translate-y-1 transition"
        >
          View All Projects <FaArrowRight size={14} />
        </Link>
      </div>
    </>
  );
}
