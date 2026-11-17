import { useEffect, useRef, useState, Suspense } from "react";

// يركّب مشهد WebGL فقط عندما يكون ظاهراً على الشاشة لتوفير الأداء
export default function InView({ children, className = "", rootMargin = "200px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return (
    <div ref={ref} className={className}>
      {visible && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
}
