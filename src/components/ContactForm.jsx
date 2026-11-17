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
    <section className="max-w-lg mx-auto p-6 bg-gray-950/60 rounded-2xl shadow-[inset_0_2px_20px_rgba(0,0,0,0.6)] border border-white/10">
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
          className="w-full border border-gray-700 bg-gray-900/70 text-gray-100 rounded-xl px-4 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your Email"
          className="w-full border border-gray-700 bg-gray-900/70 text-gray-100 rounded-xl px-4 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Your Message"
          className="w-full border border-gray-700 bg-gray-900/70 text-gray-100 rounded-xl px-4 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 4, boxShadow: "0 1px 0 #3b0764" }}
          style={{ boxShadow: "0 6px 0 #3b0764, 0 15px 30px rgba(124,58,237,0.4)" }}
          type="submit"
          className="w-full bg-gradient-to-b from-purple-500 to-purple-700 text-white py-3 rounded-xl font-semibold"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
}
