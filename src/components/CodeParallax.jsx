import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const C = { kw: "text-[#c792ea]", fn: "text-[#ffcb6b]", str: "text-[#c3e88d]", var: "text-[#82aaff]", cm: "text-gray-500", p: "text-[#89ddff]" };

const windows = [
  {
    file: "useScroll3D.ts",
    lines: [
      [["export function ", C.kw], ["useScroll3D", C.fn], ["() {", C.p]],
      [["  const ", C.kw], ["{ scrollY }", C.var], [" = ", C.p], ["useScroll", C.fn], ["();", C.p]],
      [["  return ", C.kw], ["useTransform", C.fn], ["(scrollY, [0, 1], [0, 360]);", C.p]],
      [["}", C.p]],
    ],
    pos: "left-[3%] top-[12%]",
    depth: 1.4,
    rot: -18,
  },
  {
    file: "page.tsx",
    lines: [
      [["// Next.js 15 · App Router", C.cm]],
      [["export default async function ", C.kw], ["Page", C.fn], ["() {", C.p]],
      [["  const ", C.kw], ["data", C.var], [" = await ", C.kw], ["fetch", C.fn], ["(API);", C.p]],
      [["  return ", C.kw], ["<", C.p], ["Dashboard ", C.fn], ["data", C.var], ["={data} />", C.p]],
      [["}", C.p]],
    ],
    pos: "right-[4%] top-[6%]",
    depth: 0.8,
    rot: 16,
  },
  {
    file: "terminal",
    terminal: true,
    lines: [
      [["$ ", C.str], ["npm run build", "text-gray-200"]],
      [["✓ ", C.str], ["Compiled successfully", "text-gray-400"]],
      [["✓ ", C.str], ["Lighthouse: 100 / 100", "text-gray-400"]],
      [["$ ", C.str], ["git push ", "text-gray-200"], ["origin main", C.var]],
    ],
    pos: "left-[24%] bottom-[4%]",
    depth: 1.1,
    rot: 8,
  },
];

function CodeWindow({ w, progress }) {
  const y = useTransform(progress, [0, 1], [180 * w.depth, -180 * w.depth]);
  const rotateY = useTransform(progress, [0, 0.5, 1], [w.rot * 1.8, w.rot * 0.4, -w.rot]);
  const rotateX = useTransform(progress, [0, 1], [18, -12]);
  return (
    <motion.div
      style={{ y, rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`absolute ${w.pos} hidden sm:block w-[340px] lg:w-[400px] rounded-xl overflow-hidden border border-white/10 bg-[#0b1020]/90 backdrop-blur shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),0_0_50px_-10px_rgba(139,92,246,0.5)]`}
    >
      <div className="flex items-center gap-1.5 px-3 h-8 bg-[#141a2e] border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-gray-400">{w.file}</span>
      </div>
      <pre className="p-4 font-mono text-[12px] lg:text-[13px] leading-6 whitespace-pre overflow-hidden">
        {w.lines.map((line, i) => (
          <div key={i} className="flex">
            {!w.terminal && <span className="w-6 text-gray-600 select-none">{i + 1}</span>}
            <span>
              {line.map(([t, cls], j) => (
                <span key={j} className={cls}>{t}</span>
              ))}
            </span>
          </div>
        ))}
      </pre>
    </motion.div>
  );
}

// شريط بين الأقسام: نوافذ كود تتحرك بعمق مختلف مع التمرير + نص ضخم يتحرك أفقياً
export default function CodeParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const bigX = useTransform(progress, [0, 1], ["10%", "-45%"]);
  const bigX2 = useTransform(progress, [0, 1], ["-45%", "5%"]);
  const midScale = useTransform(progress, [0.2, 0.5, 0.8], [0.8, 1, 0.9]);
  const midOpacity = useTransform(progress, [0.15, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const midRotX = useTransform(progress, [0.2, 0.5], [50, 0]);

  return (
    <section ref={ref} className="relative h-[110vh] overflow-hidden" style={{ perspective: 1400 }} aria-label="Code showcase">
      <motion.p
        style={{ x: bigX }}
        className="absolute top-[18%] whitespace-nowrap font-mono font-black text-[16vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(167,139,250,0.18)] select-none"
        aria-hidden
      >
        {"<Code /> {Design} => Ship()"}
      </motion.p>
      <motion.p
        style={{ x: bigX2 }}
        className="absolute bottom-[14%] whitespace-nowrap font-mono font-black text-[10vw] leading-none text-white/[0.03] select-none"
        aria-hidden
      >
        {"const future = await build(idea);"}
      </motion.p>

      {windows.map((w) => (
        <CodeWindow key={w.file} w={w} progress={progress} />
      ))}

      <motion.div
        style={{ scale: midScale, opacity: midOpacity, rotateX: midRotX }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <span className="font-mono text-sm text-purple-300 mb-3">{"/* what I do */"}</span>
        <h2
          className="text-4xl md:text-7xl font-extrabold text-white max-w-4xl leading-tight"
          style={{ textShadow: "0 1px 0 #6d28d9,0 2px 0 #5b21b6,0 3px 0 #4c1d95,0 4px 0 #3b0764,0 18px 35px rgba(124,58,237,.6)" }}
        >
          I turn <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">ideas</span> into fast,
          beautiful <span className="font-mono text-sky-300">{"<code/>"}</span>
        </h2>
      </motion.div>
    </section>
  );
}
