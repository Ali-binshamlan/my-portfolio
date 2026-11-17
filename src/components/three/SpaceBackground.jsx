import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// نجوم تدور ببطء وتتحرك مع التمرير لإحساس بالعمق
function DriftingStars() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.01;
    ref.current.rotation.x += delta * 0.004;
    const scroll = window.scrollY || 0;
    ref.current.position.y = scroll * 0.002;
  });
  return (
    <group ref={ref}>
      <Stars radius={80} depth={60} count={3500} factor={4} saturation={0.6} fade speed={0.6} />
    </group>
  );
}

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_#0b0b17_55%,_#05050a_100%)]" />
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <DriftingStars />
      </Canvas>
    </div>
  );
}
