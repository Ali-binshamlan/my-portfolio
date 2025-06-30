// src/components/WorkExperience.jsx

import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

export default function WorkExperience() {
  const experience = {
    company: "RemoteTech",
    role: "Front-End Developer",
    period: "Jan 2024 - Present",
    location: "Remote",
    description: `
      Building modern, scalable user interfaces using React and Tailwind CSS. 
      Collaborating remotely with product designers and backend teams across multiple time zones.
      Focused on performance, accessibility, and delivering pixel-perfect UIs.
    `,
  };

  return (
    <section
      id="work-experience"
      className="bg-gray-100 py-12 px-6 md:px-10 lg:px-20"
    >
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Work Experience
      </h2>

      <motion.div
        className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-1 text-purple-600">
          <FaBriefcase size={20} />
          <h3 className="text-2xl font-semibold">{experience.role}</h3>
        </div>

        <p className="text-purple-500 font-medium">{experience.company}</p>

        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
          <span className="italic">{experience.period}</span>
          <span>•</span>
          <FaMapMarkerAlt size={14} />
          <span>{experience.location}</span>
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {experience.description}
        </p>
      </motion.div>
    </section>
  );
}
