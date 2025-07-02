import { useParams } from "react-router-dom";
import { projects } from "./MyProjectsData";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="text-center mt-20 text-red-600">Project not found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      {/* كارد الصورة، العنوان والملخص + زر التجربة */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-6">
        {project.image && (
          <div className="w-full bg-white p-4 flex items-center justify-center overflow-hidden rounded-t-xl">
            <img
              src={project.image}
              alt={project.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">{project.title}</h1>
          <p className="text-gray-700 mb-6">{project.description}</p>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition select-none"
            >
              View Live Demo
            </a>
          )}
        </div>
      </div>

      {/* كارد Key Features */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {project.keyFeatures.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* كارد Development Challenges & Solutions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Development Challenges & Solutions
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {project.challenges.map((challenge, i) => (
            <li key={i}>{challenge}</li>
          ))}
        </ul>
      </div>

      {/* كارد Technologies Used */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
