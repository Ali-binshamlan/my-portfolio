import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";

function Spin({ children, speed = [0.3, 0.5, 0] }) {
  const ref = useRef();
  useFrame((_, d) => {
    ref.current.rotation.x += d * speed[0];
    ref.current.rotation.y += d * speed[1];
    ref.current.rotation.z += d * speed[2];
  });
  return <group ref={ref}>{children}</group>;
}

const metal = (color) => (
  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} metalness={0.8} roughness={0.2} />
);

// جيروسكوب: حلقات متداخلة تدور (للخبرة العملية)
function Gyro() {
  return (
    <>
      <Spin speed={[0.4, 0.2, 0]}>
        <mesh><torusGeometry args={[1.8, 0.05, 16, 120]} />{metal("#a78bfa")}</mesh>
      </Spin>
      <Spin speed={[0, 0.5, 0.3]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.45, 0.05, 16, 120]} />{metal("#f472b6")}</mesh>
      </Spin>
      <Spin speed={[0.6, 0, 0.4]}>
        <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[1.1, 0.05, 16, 120]} />{metal("#60a5fa")}</mesh>
      </Spin>
      <Float speed={2} floatIntensity={0.8}>
        <Spin speed={[0.3, 0.8, 0]}>
          <mesh><octahedronGeometry args={[0.55, 0]} />{metal("#f59e0b")}</mesh>
        </Spin>
      </Float>
    </>
  );
}

// كرة أرضية سلكية مع أقمار تدور (للتواصل)
function Globe() {
  return (
    <>
      <Spin speed={[0, 0.25, 0]}>
        <mesh><icosahedronGeometry args={[1.5, 2]} /><meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.5} /></mesh>
        <mesh><sphereGeometry args={[1.35, 48, 48]} /><meshStandardMaterial color="#1e1b4b" emissive="#4c1d95" emissiveIntensity={0.4} roughness={0.3} /></mesh>
      </Spin>
      {[["#f472b6", 2.2, 0.6], ["#22d3ee", 2.6, -0.4], ["#a3e635", 2.0, 1.1]].map(([c, r, tilt], i) => (
        <group key={i} rotation={[tilt, 0, tilt / 2]}>
          <Spin speed={[0, 0.6 + i * 0.25, 0]}>
            <mesh position={[r, 0, 0]}><sphereGeometry args={[0.14, 24, 24]} />{metal(c)}</mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r, 0.008, 8, 128]} /><meshBasicMaterial color={c} transparent opacity={0.35} /></mesh>
          </Spin>
        </group>
      ))}
    </>
  );
}

// بلورة متموجة (لصفحة المشاريع)
function Crystal() {
  return (
    <Float speed={1.5} floatIntensity={1} rotationIntensity={0.8}>
      <Spin speed={[0.2, 0.4, 0]}>
        <mesh scale={1.3}>
          <torusKnotGeometry args={[0.9, 0.3, 200, 32]} />
          <MeshDistortMaterial color="#ec4899" emissive="#7c3aed" emissiveIntensity={0.35} metalness={0.7} roughness={0.15} distort={0.25} speed={2} />
        </mesh>
      </Spin>
    </Float>
  );
}

const variants = { gyro: Gyro, globe: Globe, crystal: Crystal };

export default function MiniScene({ variant = "gyro" }) {
  const Content = variants[variant];
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 5]} intensity={1.5} />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#f472b6" />
      <pointLight position={[4, 2, -2]} intensity={30} color="#60a5fa" />
      <Content />
      <Sparkles count={40} scale={[6, 5, 3]} size={2} speed={0.4} color="#c4b5fd" />
    </Canvas>
  );
}
