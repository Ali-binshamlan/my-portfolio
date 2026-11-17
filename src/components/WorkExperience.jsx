// src/components/WorkExperience.jsx
import { lazy } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import TiltCard from "./three/TiltCard";
import Reveal3D from "./three/Reveal3D";
import Heading3D from "./three/Heading3D";
import InView from "./three/InView";

const MiniScene = lazy(() => import("./three/MiniScene"));

const timeline = [
  {
    type: "work",
    role: "Software Engineer (Next.js)",
    company: "Al-Ehtimam Office for Environmental Consulting",
    period: "Jul 2026 - Present",
    location: "Saudi Arabia · Full-time",
    points: [
      "Develop and maintain web applications using Next.js and React.js.",
      "Integrate REST APIs and optimize application performance.",
    ],
  },
  {
    type: "work",
    role: "Software Engineer (Next.js)",
    company: "Remote · Clients: Tabayyun, Drobi",
    period: "Jan 2023 - Present",
    location: "Remote",
    points: [
      "Developed responsive web interfaces for Tabayyun, an AI-powered fraud prevention platform, using Next.js.",
      "Developed the website for Drobi, a ride-hailing and delivery app in Saudi Arabia.",
      "Integrated REST APIs and improved application performance.",
    ],
  },
  {
    type: "edu",
    role: "Bachelor's Degree in Computer Engineering",
    company: "Hadramout University",
    period: "2025",
    location: "Yemen",
    points: [],
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className="relative scroll-mt-24 pt-8 pb-24 px-6 md:px-10 lg:px-20 text-gray-100 overflow-hidden">
      <Heading3D className="text-5xl mb-16">My Journey</Heading3D>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10 items-center">
        {/* خط زمني ثلاثي الأبعاد */}
        <div className="relative space-y-8 pl-10">
          <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded bg-gradient-to-b from-purple-500 via-pink-500 to-amber-400 shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
          {timeline.map((item, i) => {
            const Icon = item.type === "edu" ? FaGraduationCap : FaBriefcase;
            return (
              <Reveal3D key={i} from={i % 2 ? "right" : "left"} delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[38px] top-6 grid place-items-center w-8 h-8 rounded-full bg-gray-950 border-2 border-purple-400 text-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.9)]">
                    <Icon size={13} />
                  </span>
                  <TiltCard max={8} className="rounded-2xl p-7 bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_-25px_rgba(139,92,246,0.6)]">
                    <div style={{ transform: "translateZ(40px)" }}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-400/30 w-fit">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-pink-400 font-semibold text-lg">{item.company}</p>
                      <p className="flex items-center gap-2 text-gray-400 text-sm mt-1 mb-4">
                        <FaMapMarkerAlt size={12} /> {item.location}
                      </p>
                      {item.points.length > 0 && (
                        <ul className="space-y-2 text-gray-300">
                          {item.points.map((p, j) => (
                            <li key={j} className="flex gap-2">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </TiltCard>
                </div>
              </Reveal3D>
            );
          })}
        </div>

        {/* مشهد جيروسكوب ثلاثي الأبعاد */}
        <InView className="hidden lg:block h-[420px]">
          <MiniScene variant="gyro" />
        </InView>
      </div>
    </section>
  );
}
