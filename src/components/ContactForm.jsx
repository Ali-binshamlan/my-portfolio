import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
      <h3 className="text-2xl font-semibold mb-6 text-center text-white">
        Send Me a Message
      </h3>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
          className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your Email"
          className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Your Message"
          className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
}
