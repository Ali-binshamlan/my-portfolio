import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

// شيدر هولوغرام: يحافظ على الصورة واضحة مع خطوط مسح ضوئية وتوهج على الحواف
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragment = /* glsl */ `
  uniform sampler2D map;
  uniform float time;
  uniform float reveal;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(map, vUv);
    if (c.a < 0.04) discard;
    // ظهور تدريجي من الأسفل للأعلى
    float edge = smoothstep(reveal - 0.04, reveal, vUv.y);
    if (vUv.y > reveal) discard;
    // خطوط مسح أفقية
    float lines = 0.5 + 0.5 * sin(vUv.y * 420.0 - time * 6.0);
    // شريط ضوئي يتحرك للأعلى
    float band = smoothstep(0.0, 0.03, 0.03 - abs(fract(time * 0.18) - vUv.y));
    vec3 tint = vec3(0.65, 0.45, 1.0);
    vec3 col = mix(c.rgb, c.rgb * tint * 1.25, 0.12);
    col += tint * 0.06 * lines;
    col += vec3(0.75, 0.6, 1.0) * band * 0.22;
    col += vec3(0.85, 0.7, 1.0) * edge * 0.9;
    float flicker = 0.96 + 0.04 * sin(time * 40.0);
    gl_FragColor = vec4(col * flicker, c.a);
  }
`;

function Avatar() {
  const tex = useTexture("/avatar-full.png");
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const mat = useRef();
  const group = useRef();
  const uniforms = useMemo(() => ({ map: { value: tex }, time: { value: 0 }, reveal: { value: 0 } }), [tex]);
  const H = 3.3;
  const W = H * (560 / 1731);

  useFrame((s, d) => {
    const u = mat.current.uniforms;
    u.time.value = s.clock.elapsedTime;
    u.reveal.value = Math.min(1.02, u.reveal.value + d * 0.45);
    const target = Math.sin(s.clock.elapsedTime * 0.5) * 0.28 + s.pointer.x * 0.25;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.05;
  });

  return (
    <group ref={group}>
      <mesh position={[0, H / 2 + 0.06, 0]}>
        <planeGeometry args={[W, H]} />
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// منصة مضيئة دوّارة مع مخروط ضوئي
function Platform() {
  const ring1 = useRef();
  const ring2 = useRef();
  useFrame((_, d) => {
    ring1.current.rotation.z += d * 0.6;
    ring2.current.rotation.z -= d * 0.9;
  });
  const coneMat = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 4;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, "rgba(167,139,250,0)");
    g.addColorStop(1, "rgba(167,139,250,0.35)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 128);
    const t = new THREE.CanvasTexture(canvas);
    return new THREE.MeshBasicMaterial({
      map: t,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  return (
    <group>
      <mesh position={[0, 1.6, 0]} material={coneMat}>
        <cylinderGeometry args={[0.55, 1.05, 3.2, 48, 1, true]} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[1.15, 1.25, 0.12, 64]} />
        <meshStandardMaterial color="#1b1530" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={ring1} position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.16, 64, 1, 0, Math.PI * 1.5]} />
        <meshBasicMaterial color="#e9d5ff" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.82, 0.86, 64, 1, 0, Math.PI]} />
        <meshBasicMaterial color="#f472b6" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <Float speed={2} floatIntensity={0.3}>
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.3, 0.012, 8, 96]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HologramAvatar() {
  return (
    <Canvas
      camera={{ position: [0, 1.7, 5.3], fov: 40 }}
      onCreated={({ camera }) => camera.lookAt(0, 1.55, 0)} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 3, 3]} intensity={20} color="#c4b5fd" />
      <group position={[0, -0.15, 0]}>
        <Platform />
        <Avatar />
        <Sparkles count={45} scale={[2.4, 3.4, 2.4]} position={[0, 1.7, 0]} size={2.5} speed={0.5} color="#d8b4fe" />
      </group>
    </Canvas>
  );
}
