import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// عند تغيير الصفحة: الصعود للأعلى، أو الانتقال لقسم معيّن إذا طُلب من شريط التنقل
export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const target = state?.scrollTo;
    if (!target || target === "home") {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else if (tries++ < 20) setTimeout(tick, 50);
    };
    tick();
  }, [pathname, state]);

  return null;
}
