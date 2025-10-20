import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaFileAlt } from "react-icons/fa";
import ContactForm from "./ContactForm";

export default function GetInTouch() {
  return (
    <section
      id="contact"
      className="bg-gray-950 py-20 px-6 lg:px-20 text-gray-100"
    >
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-3xl shadow-lg p-12 border border-gray-800">
        <h2 className="text-4xl font-extrabold text-center text-white mb-14">
          Get In Touch
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* نموذج الاتصال */}
          <div className="flex-1 max-w-md">
            <ContactForm />
          </div>

          {/* أزرار التواصل عمودية */}
          <div className="flex flex-col gap-6 flex-1 max-w-md">
            {/* Email */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:ali.binshamlan12@gmail.com"
              className="flex items-center gap-3 bg-purple-800 text-purple-200 shadow-md border border-purple-700 px-6 py-4 rounded-xl hover:bg-purple-700 transition font-semibold whitespace-nowrap"
            >
              <FaEnvelope className="text-xl" />
              Email Me
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://wa.me/967774945757"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-800 text-green-200 shadow-md border border-green-700 px-6 py-4 rounded-xl hover:bg-green-700 transition font-semibold whitespace-nowrap"
            >
              <FaWhatsapp className="text-xl" />
              WhatsApp
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://www.linkedin.com/in/ali-bin-shamlan-ba6237341/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-blue-800 text-blue-200 shadow-md border border-blue-700 px-6 py-4 rounded-xl hover:bg-blue-700 transition font-semibold whitespace-nowrap"
            >
              <FaLinkedin className="text-xl" />
              LinkedIn
            </motion.a>

            {/* Resume */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://drive.google.com/file/d/18_gnwyhdea0MMuhQLXtNo_1RsUdmvRO-/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-800 text-gray-200 shadow-md border border-gray-700 px-6 py-4 rounded-xl hover:bg-gray-700 transition font-semibold whitespace-nowrap"
            >
              <FaFileAlt className="text-xl" />
              Resume
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
