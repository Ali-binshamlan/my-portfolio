// src/components/WorkExperience.jsx

import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

export default function WorkExperience() {
  const experience = {
    company: "RemoteTech",
    role: "Front-End Developer",
    period: "Jan 2023 - Present",
    location: "Remote",
    description: `
      Building modern, scalable user interfaces using Next.js and Tailwind CSS. 
      Collaborating remotely with product designers and backend teams across multiple time zones.
      Focused on performance, accessibility, and delivering pixel-perfect UIs.
    `,
  };

  // بيانات عشوائية للنجوم المتلألئة
  const stars = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 + "%",
    y: Math.random() * 100 + "%",
    size: Math.random() * 2 + 1, // حجم بين 1px و 3px
    duration: Math.random() * 5 + 3, // مدة حركة بين 3 و 8 ثواني
    delay: Math.random() * 5, // تأخير البدء
  }));

  return (
    <section className="relative bg-gray-950 py-20 px-6 md:px-10 lg:px-20 text-gray-100 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* خطوط متحركة في الخلفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map(
          (
            _,
            i // زيادة عدد الخطوط
          ) => (
            <motion.div
              key={i}
              className="absolute w-[2px] bg-purple-500/30 blur-xl rounded"
              initial={{
                x: `${Math.random() * 100}%`, // توزيع عشوائي أولي
                y: "-20%", // تبدأ من فوق الشاشة
                height: `${100 + Math.random() * 50}%`, // ارتفاع عشوائي
                rotate: Math.random() * 90 - 45, // دوران عشوائي
              }}
              animate={{
                y: "120%", // تتحرك للأسفل
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 10 + Math.random() * 10, // مدة عشوائية أطول
                ease: "linear",
                delay: i * 2 + Math.random() * 3, // تأخير عشوائي
              }}
            />
          )
        )}

        {/* نجوم متلألئة في الخلفية */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full opacity-0"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              boxShadow: "0 0 5px rgba(255,255,255,0.7)", // توهج بسيط
            }}
            animate={{
              opacity: [0, 1, 0], // تظهر وتختفي
              scale: [1, 1.2, 1], // تكبر وتصغر قليلا
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration,
              delay: star.delay,
              ease: "easeInOut",
              repeatDelay: Math.random() * 2, // تأخير عشوائي قبل التكرار
            }}
          />
        ))}
      </div>

      {/* المحتوى الرئيسي */}
      <h2
        className="relative text-5xl font-extrabold text-center mb-12 
                     bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text 
                     z-10 drop-shadow-lg"
      >
        {" "}
        {/* <--- لون متدرج ومظلل */}
        My Journey
      </h2>

      <motion.div
        className="relative z-10 bg-gray-800 rounded-xl shadow-2xl p-8 border-l-8 border-purple-500 max-w-4xl mx-auto backdrop-blur-sm" // ظل أعمق وبلور
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }} // تظهر عندما يكون 50% من العنصر مرئياً
        transition={{ duration: 1, type: "spring", stiffness: 70 }} // حركة زنبركية
      >
        {/* تأثير ضوئي خلف الكارد */}
        <div
          className="absolute inset-0 -z-10 rounded-xl opacity-20"
          style={{
            background:
              "radial-gradient(circle at 10% 10%, #a78bfa, transparent)",
          }}
        ></div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 text-purple-400">
            <FaBriefcase size={24} /> {/* حجم أكبر للأيقونة */}
            <h3 className="text-3xl font-bold text-white">
              {" "}
              {/* حجم ووزن أكبر للعنوان */}
              {experience.role}
            </h3>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-semibold italic">
            {experience.period}
          </p>
        </div>
        <p className="text-purple-500 font-bold mb-2 text-xl">
          {experience.company}
        </p>{" "}
        {/* حجم ووزن أكبر */}
        <div className="flex items-center gap-2 text-gray-400 text-base mb-6">
          {" "}
          {/* حجم أكبر للنص */}
          <FaMapMarkerAlt size={16} /> {/* حجم أكبر للأيقونة */}
          <span>{experience.location}</span>
        </div>
        <p className="text-gray-200 leading-relaxed whitespace-pre-line text-lg">
          {" "}
          {/* لون أفتح وحجم أكبر */}
          {experience.description}
        </p>
      </motion.div>
    </section>
  );
}
