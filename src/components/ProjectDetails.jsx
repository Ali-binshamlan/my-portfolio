import { useParams } from "react-router-dom";
import { projects } from "./MyProjectsData";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project)
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        Project not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* الصورة الرئيسية */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-6">
        <img
          src={project.image}
          alt={project.title}
          className="max-w-full max-h-96 object-contain rounded-lg"
        />
        <h1 className="text-3xl font-bold text-purple-700 mt-4">
          {project.title}
        </h1>
        <p className="text-gray-700 mt-2">{project.description}</p>
      </div>

      {/* قسم صور الواجهات */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Project Screenshots
          </h2>
          <div className="flex gap-4 overflow-x-auto px-2">
            {project.screenshots.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${project.title} screenshot ${index + 1}`}
                className="h-32 rounded-lg cursor-pointer object-contain border border-gray-300 hover:border-purple-600 transition"
              />
            ))}
          </div>
        </section>
      )}

      {/* باقي تفاصيل المشروع */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {project.keyFeatures.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Development Challenges & Solutions
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {project.challenges.map((challenge, i) => (
            <li key={i}>{challenge}</li>
          ))}
        </ul>
      </section>

      <section>
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
      </section>
    </div>
  );
}
