import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";

// مجسم رئيسي متوهج يتشوّه بنعومة (مثل نماذج المعارض ثلاثية الأبعاد)
function CoreBlob() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.25;
    ref.current.rotation.x += delta * 0.1;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.35}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.38}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

// حلقة زجاجية تدور حول المجسم
function GlassRing() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.4) * 0.15;
    ref.current.rotation.z = t * 0.3;
  });
  return (
    <mesh ref={ref} scale={2.1}>
      <torusGeometry args={[1, 0.06, 32, 128]} />
      <meshPhysicalMaterial
        color="#f9a8d4"
        emissive="#db2777"
        emissiveIntensity={0.25}
        metalness={0.9}
        roughness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.1}
        iridescence={1}
        iridescenceIOR={1.6}
      />
    </mesh>
  );
}

// مجسمات صغيرة طائرة حول المشهد
function Satellite({ position, color, geometry = "octa", speed = 1 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.6 * speed;
    ref.current.rotation.y += delta * 0.4 * speed;
  });
  return (
    <Float speed={2 * speed} floatIntensity={2} rotationIntensity={1}>
      <mesh ref={ref} position={position} scale={0.32}>
        {geometry === "octa" && <octahedronGeometry args={[1, 0]} />}
        {geometry === "box" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {geometry === "knot" && <torusKnotGeometry args={[0.7, 0.25, 128, 16]} />}
        {geometry === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// تحريك الكاميرا بلطف مع حركة الماوس (Parallax)
function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#f472b6" />
      <pointLight position={[4, 2, -2]} intensity={30} color="#60a5fa" />

      <CoreBlob />
      <GlassRing />

      <Satellite position={[-2.1, 1.5, -0.5]} color="#f59e0b" geometry="octa" />
      <Satellite position={[2.1, -1.4, 0.2]} color="#22d3ee" geometry="knot" speed={0.7} />
      <Satellite position={[1.9, 1.8, -1]} color="#f472b6" geometry="box" speed={1.2} />
      <Satellite position={[-1.9, -1.7, 0.5]} color="#a3e635" geometry="dodeca" speed={0.9} />

      <Sparkles count={80} scale={[8, 6, 4]} size={2.5} speed={0.4} color="#c4b5fd" />

      <CameraRig />
    </Canvas>
  );
}
