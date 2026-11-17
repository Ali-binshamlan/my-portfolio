import { motion } from "framer-motion";

// عنوان بنص ثلاثي الأبعاد (طبقات ظل تعطي عمقاً) يدخل بدوران من المنظور
const depth = Array.from({ length: 8 })
  .map((_, i) => `0 ${i + 1}px 0 hsl(270 60% ${28 - i * 2}%)`)
  .join(", ");

export default function Heading3D({ children, className = "", as = "h2" }) {
  const Tag = motion[as];
  return (
    <div style={{ perspective: 800 }}>
      <Tag
        initial={{ opacity: 0, rotateX: -80, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 70, damping: 14 }}
        style={{
          textShadow: `${depth}, 0 18px 30px rgba(124,58,237,0.55)`,
          transformOrigin: "50% 100%",
        }}
        className={`font-extrabold text-center text-white tracking-tight ${className}`}
      >
        {children}
      </Tag>
    </div>
  );
}
