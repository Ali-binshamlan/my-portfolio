import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Text3D, Center, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import fontUrl from "three/examples/fonts/helvetiker_bold.typeface.json?url";

// ---------- كود يُكتب حرفاً حرفاً على شاشة اللابتوب ----------
const C = {
  kw: "#c792ea",
  var: "#82aaff",
  str: "#c3e88d",
  prop: "#f07178",
  punc: "#89ddff",
  fn: "#ffcb6b",
  cm: "#5c6773",
  txt: "#d6deeb",
};

const CODE = [
  [["// portfolio.tsx", C.cm]],
  [["const ", C.kw], ["developer", C.var], [" = {", C.punc]],
  [["  name", C.prop], [": ", C.punc], ['"Ali Bin Shamlan"', C.str], [",", C.punc]],
  [["  role", C.prop], [": ", C.punc], ['"Software Engineer"', C.str], [",", C.punc]],
  [["  stack", C.prop], [": [", C.punc], ['"Next.js"', C.str], [", ", C.punc], ['"React"', C.str], [", ", C.punc], ['"TS"', C.str], ["],", C.punc]],
  [["  based", C.prop], [": ", C.punc], ['"Riyadh, SA"', C.str], [",", C.punc]],
  [["};", C.punc]],
  [],
  [["export default function ", C.kw], ["App", C.fn], ["() {", C.punc]],
  [["  return ", C.kw], ["<", C.punc], ["Experience ", C.fn], ["in3D ", C.prop], ["/>", C.punc], [";", C.punc]],
  [["}", C.punc]],
];
const TOTAL_CHARS = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

function useCodeTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return { canvas, ctx: canvas.getContext("2d"), tex };
  }, []);
}

function drawCode(ctx, visible, blink) {
  const W = 1024, H = 640;
  ctx.fillStyle = "#0b1020";
  ctx.fillRect(0, 0, W, H);
  // شريط علوي للمحرر
  ctx.fillStyle = "#141a2e";
  ctx.fillRect(0, 0, W, 54);
  ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(32 + i * 30, 27, 9, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#8b93b5";
  ctx.font = "22px monospace";
  ctx.fillText("portfolio.tsx — VS Code", 140, 35);

  ctx.font = "bold 36px monospace";
  let left = visible;
  let caret = null;
  CODE.forEach((line, i) => {
    const y = 108 + i * 48;
    ctx.fillStyle = "#3b4261";
    ctx.fillText(String(i + 1).padStart(2, " "), 14, y);
    let x = 78;
    for (const [t, color] of line) {
      if (left <= 0) break;
      const part = t.slice(0, left);
      ctx.fillStyle = color;
      ctx.fillText(part, x, y);
      x += ctx.measureText(part).width;
      left -= part.length;
    }
    if (left > 0) left -= 1;
    else if (!caret) caret = [x, y];
  });
  if (blink && caret) {
    ctx.fillStyle = "#a78bfa";
    ctx.fillRect(caret[0] + 2, caret[1] - 30, 18, 38);
  }
}

function Laptop() {
  const { ctx, tex } = useCodeTexture();
  const state = useRef({ chars: 0, acc: 0, hold: 0 });
  const keys = useRef();

  useFrame((s, delta) => {
    const st = state.current;
    st.acc += delta;
    if (st.acc < 0.035) return;
    st.acc = 0;
    if (st.chars < TOTAL_CHARS) st.chars += 1;
    else if ((st.hold += 1) > 90) {
      st.chars = 0;
      st.hold = 0;
    }
    drawCode(ctx, st.chars, Math.floor(s.clock.elapsedTime * 2) % 2 === 0);
    tex.needsUpdate = true;
  });

  // لوحة مفاتيح بمفاتيح مُكررة (Instanced)
  const keyMatrices = useMemo(() => {
    const m = [];
    const o = new THREE.Object3D();
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 13; c++) {
        o.position.set(-1.32 + c * 0.22, 0.075, -0.55 + r * 0.22);
        o.updateMatrix();
        m.push(o.matrix.clone());
      }
    return m;
  }, []);

  return (
    <group>
      {/* القاعدة */}
      <RoundedBox args={[3.2, 0.12, 2.1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#2a2d3e" metalness={0.85} roughness={0.25} />
      </RoundedBox>
      <instancedMesh
        ref={(m) => {
          if (!m || keys.current) return;
          keyMatrices.forEach((mat, i) => m.setMatrixAt(i, mat));
          m.instanceMatrix.needsUpdate = true;
          keys.current = m;
        }}
        args={[null, null, keyMatrices.length]}
      >
        <boxGeometry args={[0.18, 0.03, 0.18]} />
        <meshStandardMaterial color="#14161f" emissive="#7c3aed" emissiveIntensity={0.15} roughness={0.6} />
      </instancedMesh>
      <mesh position={[0, 0.065, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 0.5]} />
        <meshStandardMaterial color="#1b1e2b" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* الشاشة */}
      <group position={[0, 0.06, -1.03]} rotation={[-0.25, 0, 0]}>
        <RoundedBox args={[3.2, 2.05, 0.08]} radius={0.05} smoothness={4} position={[0, 1.02, 0]}>
          <meshStandardMaterial color="#2a2d3e" metalness={0.85} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 1.04, 0.045]}>
          <planeGeometry args={[3.0, 1.875]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        {/* توهج الشاشة */}
        <pointLight position={[0, 1, 0.8]} intensity={6} color="#8b5cf6" distance={4} />
      </group>
    </group>
  );
}

// ---------- رموز برمجية ثلاثية الأبعاد طائرة ----------
function Symbol3D({ text, position, color, size = 0.45, speed = 1 }) {
  const ref = useRef();
  useFrame((s) => {
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.6 * speed) * 0.5;
  });
  return (
    <Float speed={1.8 * speed} floatIntensity={1.4} rotationIntensity={0.4}>
      <group ref={ref} position={position}>
        <Center>
          <Text3D font={fontUrl} size={size} height={0.16} bevelEnabled bevelSize={0.015} bevelThickness={0.03} curveSegments={6}>
            {text}
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} metalness={0.6} roughness={0.2} />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

// ---------- يتفاعل المشهد مع الماوس والتمرير ----------
function Rig({ children }) {
  const ref = useRef();
  useFrame((s) => {
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    const g = ref.current;
    g.rotation.y += (s.pointer.x * 0.35 - 0.35 + scroll * 0.9 - g.rotation.y) * 0.06;
    g.rotation.x += (-s.pointer.y * 0.12 + scroll * 0.25 - g.rotation.x) * 0.06;
    g.position.y += (scroll * 1.6 - 0.35 - g.position.y) * 0.08;
    const sc = (s.size.width < 600 ? 0.68 : 1) * (1 - scroll * 0.25);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, sc, 0.08));
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 6.6], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} />
      <pointLight position={[-4, 1, 3]} intensity={30} color="#f472b6" />
      <pointLight position={[4, 2, -2]} intensity={30} color="#60a5fa" />

      <Rig>
        <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.1}>
          <Laptop />
        </Float>
        <Symbol3D text="</>" position={[-2.2, 2.0, -0.6]} color="#a78bfa" size={0.5} />
        <Symbol3D text="{ }" position={[2.1, 2.2, -0.8]} color="#f472b6" speed={0.8} />
        <Symbol3D text="=>" position={[2.2, -0.3, 0.6]} color="#22d3ee" size={0.4} speed={1.2} />
        <Symbol3D text="( )" position={[-2.2, -0.2, 0.5]} color="#f59e0b" size={0.4} speed={0.9} />
        <Symbol3D text=";" position={[0.2, 2.9, -1.4]} color="#a3e635" size={0.5} speed={1.1} />
      </Rig>

      <Sparkles count={70} scale={[9, 6, 4]} size={2.2} speed={0.4} color="#c4b5fd" />
    </Canvas>
  );
}
