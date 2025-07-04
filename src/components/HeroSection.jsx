import { motion } from "framer-motion";
import { FaFolderOpen, FaFileAlt } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-6 max-w-5xl mx-auto gap-6">
      {/* الصورة مع التدرج */}
      <motion.div
        className="flex-shrink-0 rounded-full p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/profile.jpg"
          alt="Ali profile"
          className="w-36 h-36 md:w-60 md:h-60 rounded-full object-cover transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        />
      </motion.div>

      {/* النص مع الأزرار */}
      <motion.div
        className="text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-6">
          Hi, I'm Ali
        </h1>
        <p className="text-black text-2xl font-semibold mb-4">
          Front-End Developer
        </p>
        <p className="text-gray-800 text-lg leading-relaxed max-w-xl mb-6">
          Front-End Developer specializing in React.js with a background in Computer Engineering. Strong
          experience in building modern, responsive, and user-focused web applications. Skilled in
          transforming UI/UX designs into high-performance, interactive interfaces using HTML, CSS,
          JavaScript, and modern front-end tools like React Router, Axios, Redux, and Tailwind CSS.
          Bootstrap 5, Passionate about clean code, performance, and continuous learning.
        </p>

        {/* الأزرار */}
        <div className="flex gap-5">
          {/* زر المشاريع */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-purple-600 text-white px-7 py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition"
          >
            <FaFolderOpen size={22} />
            View My Projects
          </motion.a>

          {/* زر السيرة */}
          <motion.a
            href="https://drive.google.com/file/d/18_gnwyhdea0MMuhQLXtNo_1RsUdmvRO-/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 border-2 border-purple-600 text-purple-600 px-7 py-3 rounded-lg font-semibold shadow-lg hover:bg-purple-600 hover:text-white transition"
          >
            <FaFileAlt size={22} />
            View Resume
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
