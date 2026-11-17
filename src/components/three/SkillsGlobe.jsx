import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// توزيع المهارات على سطح كرة (توزيع فيبوناتشي)
function fibonacciSphere(n, r) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const t = golden * i;
    return new THREE.Vector3(Math.cos(t) * rad * r, y * r, Math.sin(t) * rad * r);
  });
}

// يدير الكرة ويُسقط موضع كل مهارة على الشاشة لتحريك عناصر HTML فوق المشهد
function Globe({ points, labelRefs, paused }) {
  const group = useRef();
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!paused.current) g.rotation.y += delta * 0.25;
    g.rotation.x += (state.pointer.y * 0.4 - g.rotation.x) * 0.05;
    g.updateMatrixWorld();
    const { width, height } = state.size;
    points.forEach((p, i) => {
      const el = labelRefs.current[i];
      if (!el) return;
      tmp.copy(p).applyMatrix4(g.matrixWorld);
      const depth = (tmp.z + 2.3) / 4.6; // 0 = خلف، 1 = أمام
      tmp.project(state.camera);
      const x = (tmp.x * 0.5 + 0.5) * width;
      const y = (-tmp.y * 0.5 + 0.5) * height;
      const scale = (0.6 + depth * 0.6) * (width < 600 ? 0.7 : 1);
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      el.style.opacity = String(0.25 + depth * 0.75);
      el.style.zIndex = String(Math.round(depth * 100));
      el.style.filter = depth < 0.35 ? "blur(1px)" : "none";
    });
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial color="#7c3aed" emissive="#6d28d9" emissiveIntensity={0.6} roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  );
}

export default function SkillsGlobe({ skills }) {
  const points = useMemo(() => fibonacciSphere(skills.length, 2.3), [skills.length]);
  const labelRefs = useRef([]);
  const paused = useRef(false);

  return (
    <div className="relative w-full h-full overflow-hidden isolate">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={40} color="#f472b6" />
        <pointLight position={[-4, -3, 2]} intensity={30} color="#60a5fa" />
        <Globe points={points} labelRefs={labelRefs} paused={paused} />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none">
        {skills.map((s, i) => (
          <div
            key={s.name}
            ref={(el) => (labelRefs.current[i] = el)}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            className="absolute left-0 top-0 pointer-events-auto flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-full bg-gray-900/70 border border-white/10 backdrop-blur text-sm font-semibold text-gray-100 shadow-lg shadow-purple-500/20 hover:border-purple-400 select-none will-change-transform"
            style={{ opacity: 0 }}
          >
            <span className="text-lg">{s.icon}</span>
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}
