import { motion } from "framer-motion";

// يظهر العنصر وكأنه ينقلب نحو المشاهد من العمق
export default function Reveal3D({ children, delay = 0, className = "", from = "bottom" }) {
  const initial =
    from === "left"
      ? { opacity: 0, rotateY: 35, x: -60, z: -200 }
      : from === "right"
      ? { opacity: 0, rotateY: -35, x: 60, z: -200 }
      : { opacity: 0, rotateX: 35, y: 60, z: -200 };
  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        initial={initial}
        whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, x: 0, y: 0, z: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 60, damping: 16, delay }}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
