import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { projects } from "./MyProjectsData";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const [modalImage, setModalImage] = useState(null);

  // منع التمرير عند فتح المودال
  useEffect(() => {
    if (modalImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // تنظيف عند إغلاق المودال أو تفكيك المكون
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalImage]);

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
          <div className="flex gap-4 mt-4">
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

            {project.ved && (
              <a
                href={project.ved}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold"
              >
                Show How It Works
              </a>
            )}
          </div>
        </div>
      </div>

      {/* قسم صور الواجهات مع التكبير عند الضغط */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="mt-10 bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-left">
            Project Screenshots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.screenshots.map((src, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-gray-300 shadow-sm cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => setModalImage(src)}
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-64 object-contain bg-gray-50"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal لتكبير الصورة */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-gray-100 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Enlarged screenshot"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
            loading="lazy"
            onClick={(e) => e.stopPropagation()} // لمنع غلق المودال عند الضغط على الصورة نفسها
          />
        </div>
      )}

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
