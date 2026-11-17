import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // يفتح برنامج البريد برسالة جاهزة موجّهة إلى علي
    const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:alishamlan47@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
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
          aria-label="Your Name"
          className="w-full border border-gray-700 bg-gray-900/70 text-gray-100 rounded-xl px-4 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your Email"
          aria-label="Your Email"
          className="w-full border border-gray-700 bg-gray-900/70 text-gray-100 rounded-xl px-4 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Your Message"
          aria-label="Your Message"
          className="w-full border border-gray-700 bg-gray-900/70 text-gray-100 rounded-xl px-4 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 4, boxShadow: "0 1px 0 #3b0764" }}
          style={{ boxShadow: "0 6px 0 #3b0764, 0 15px 30px rgba(124,58,237,0.4)" }}
          type="submit"
          className="w-full bg-gradient-to-b from-purple-500 to-purple-700 text-white py-3 rounded-xl font-semibold"
        >
          {sent ? "Opening your email app…" : "Send Message"}
        </motion.button>
        {sent && (
          <p className="text-center text-sm text-gray-400" role="status">
            If nothing opened, email me directly at{" "}
            <a className="text-purple-300 underline" href="mailto:alishamlan47@gmail.com">alishamlan47@gmail.com</a>
          </p>
        )}
      </motion.form>
    </section>
  );
}
