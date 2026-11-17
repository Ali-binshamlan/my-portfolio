import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Text3D, Center, RoundedBox, useTexture } from "@react-three/drei";
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

// ---------- أدوات بناء الشخصية ----------
const UP = new THREE.Vector3(0, 1, 0);

// طرف (ذراع/ساق) كبسولة بين نقطتين
function Limb({ from, to, r = 0.07, children }) {
  const { pos, quat, len } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    return {
      pos: a.clone().add(b).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize()),
      len: dir.length(),
    };
  }, [from, to]);
  return (
    <mesh position={pos} quaternion={quat}>
      <capsuleGeometry args={[r, Math.max(len - r * 2, 0.01), 6, 12]} />
      {children}
    </mesh>
  );
}

const SKIN = "#9a6240";
const HAIR = "#17110e";
const NAVY = "#1c2f8f";
const NAVY_LIGHT = "#2840a8";
const BLACK = "#0d0d12";

const toon = (color) => <meshToonMaterial color={color} />;

// الرأس: صورة علي الحقيقية على سطح منحنٍ، وخلفها حجم ثلاثي الأبعاد للرأس والشعر
function Head({ headRef }) {
  const face = useTexture("/avatar-face.png");
  face.colorSpace = THREE.SRGBColorSpace;
  face.anisotropy = 8;
  const R = 0.3;
  const ARC = 1.8;
  const height = (R * ARC) / (512 / 786);
  return (
    <group ref={headRef} position={[0, 1.93, -0.2]}>
      <group position={[0, height / 2 - 0.16, 0]}>
        {/* الوجه من الصورة */}
        <mesh position={[0, 0, -R + 0.11]}>
          <cylinderGeometry args={[R, R, height, 40, 1, true, -ARC / 2, ARC]} />
          <meshBasicMaterial map={face} transparent toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// كرسي مكتب
function Chair() {
  return (
    <group position={[0, 0, -0.28]}>
      <RoundedBox args={[0.9, 0.12, 0.85]} radius={0.05} position={[0, 0.85, 0]}>
        <meshStandardMaterial color="#1c1830" roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.86, 1.05, 0.1]} radius={0.06} position={[0, 1.45, -0.44]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#1c1830" roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, 1.45, -0.385]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.02]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.6, 12]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, a, 0]}>
            <mesh position={[0.22, 0.17, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.44, 8]} />
              <meshStandardMaterial color="#2a2d3e" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0.42, 0.07, 0]}>
              <sphereGeometry args={[0.055, 12, 12]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// مكتب مع شريط إضاءة
function Desk() {
  return (
    <group>
      <RoundedBox args={[2.7, 0.08, 1.15]} radius={0.03} position={[0, 1.3, 0.62]}>
        <meshStandardMaterial color="#2b2140" roughness={0.5} metalness={0.2} />
      </RoundedBox>
      <mesh position={[0, 1.255, 1.195]}>
        <boxGeometry args={[2.66, 0.02, 0.01]} />
        <meshBasicMaterial color="#c084fc" toneMapped={false} />
      </mesh>
      {[[-1.25, 0.12], [1.25, 0.12], [-1.25, 1.12], [1.25, 1.12]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.63, z]}>
          <boxGeometry args={[0.06, 1.26, 0.06]} />
          <meshStandardMaterial color="#1a1528" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      {/* كوب قهوة */}
      <group position={[0.9, 1.42, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.07, 0.17, 20]} />
          <meshToonMaterial color="#f5f3ff" />
        </mesh>
        <mesh position={[0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.045, 0.012, 8, 16]} />
          <meshToonMaterial color="#f5f3ff" />
        </mesh>
        <mesh position={[0, 0.086, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.07, 20]} />
          <meshBasicMaterial color="#3b2416" />
        </mesh>
        <Sparkles count={10} scale={[0.15, 0.4, 0.15]} position={[0, 0.3, 0]} size={3} speed={0.6} color="#e9d5ff" />
      </group>
    </group>
  );
}

// لابتوب على المكتب: الشاشة تواجه الشخصية وظهرها يحمل شعاراً مضيئاً
function DeskLaptop({ tex }) {
  return (
    <group position={[0, 1.36, 0.6]}>
      <RoundedBox args={[0.92, 0.04, 0.62]} radius={0.015}>
        <meshStandardMaterial color="#3a3f52" metalness={0.85} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0.022, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.9, 0.36]} />
        <meshStandardMaterial color="#14161f" emissive="#7c3aed" emissiveIntensity={0.25} />
      </mesh>
      <group position={[0, 0.02, 0.3]} rotation={[0.3, 0, 0]}>
        <RoundedBox args={[0.92, 0.56, 0.03]} radius={0.015} position={[0, 0.28, 0]}>
          <meshStandardMaterial color="#3a3f52" metalness={0.85} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0.28, -0.017]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.85, 0.5]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        <group position={[0, 0.3, 0.02]}>
          <Center>
            <Text3D font={fontUrl} size={0.13} height={0.01} curveSegments={4}>
              {"</>"}
              <meshBasicMaterial color="#c084fc" toneMapped={false} />
            </Text3D>
          </Center>
        </group>
        <pointLight position={[0, 0.35, -0.4]} intensity={2.5} color="#8b5cf6" distance={1.6} />
      </group>
    </group>
  );
}

// الشخصية الكرتونية جالسة وتبرمج
function Coder({ tex }) {
  const head = useRef();
  const leftHand = useRef();
  const rightHand = useRef();
  const torso = useRef();

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    // الكتابة على الكيبورد
    leftHand.current.position.y = Math.max(0, Math.sin(t * 13)) * 0.035;
    rightHand.current.position.y = Math.max(0, Math.sin(t * 13 + 1.7)) * 0.035;
    // التنفس
    torso.current.scale.y = 1 + Math.sin(t * 1.8) * 0.012;
    // ينظر للشاشة، وأحياناً يرفع رأسه للزائر ويتبع الماوس
    const lookUp = THREE.MathUtils.smoothstep(Math.sin(t * 0.45), -0.2, 0.4);
    const targetX = THREE.MathUtils.lerp(0.22, -0.04 - s.pointer.y * 0.12, lookUp);
    const targetY = THREE.MathUtils.lerp(Math.sin(t * 0.7) * 0.06, 0.25 + s.pointer.x * 0.35, lookUp);
    head.current.rotation.x += (targetX - head.current.rotation.x) * 0.08;
    head.current.rotation.y += (targetY - head.current.rotation.y) * 0.08;
  });

  return (
    <group>
      <Chair />
      <Desk />
      <DeskLaptop tex={tex} />

      {/* الساقان والحذاء */}
      <mesh position={[0, 1.0, -0.22]}>
        <boxGeometry args={[0.58, 0.22, 0.48]} />
        {toon(BLACK)}
      </mesh>
      {[-1, 1].map((sx) => (
        <group key={sx}>
          <Limb from={[sx * 0.15, 1.0, -0.2]} to={[sx * 0.16, 1.0, 0.36]} r={0.11}>{toon("#141726")}</Limb>
          <Limb from={[sx * 0.16, 1.0, 0.38]} to={[sx * 0.17, 0.36, 0.42]} r={0.095}>{toon("#141726")}</Limb>
          <RoundedBox args={[0.17, 0.1, 0.32]} radius={0.04} position={[sx * 0.17, 0.3, 0.5]}>
            {toon(BLACK)}
          </RoundedBox>
        </group>
      ))}

      {/* الجذع: بدلة كحلية وقميص أسود وربطة عنق */}
      <group ref={torso} position={[0, 1.45, -0.24]} rotation={[0.12, 0, 0]}>
        <mesh scale={[1.12, 1, 0.72]}>
          <capsuleGeometry args={[0.29, 0.42, 8, 16]} />
          {toon(NAVY)}
        </mesh>
        <mesh position={[0, 0.17, 0.205]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.12, 0.42, 3]} />
          {toon(BLACK)}
        </mesh>
        <mesh position={[0, 0.12, 0.214]}>
          <boxGeometry args={[0.055, 0.34, 0.01]} />
          <meshToonMaterial color="#000000" />
        </mesh>
        <mesh position={[0, 0.3, 0.214]}>
          <boxGeometry args={[0.07, 0.05, 0.02]} />
          <meshToonMaterial color="#000000" />
        </mesh>
        <mesh position={[0, 0.05, 0.218]}>
          <boxGeometry args={[0.09, 0.012, 0.01]} />
          <meshStandardMaterial color="#d1d5db" metalness={1} roughness={0.2} />
        </mesh>
        {[-1, 1].map((sx) => (
          <mesh key={sx} position={[sx * 0.1, 0.16, 0.2]} rotation={[0, 0, sx * 0.38]}>
            <boxGeometry args={[0.07, 0.4, 0.02]} />
            {toon(NAVY_LIGHT)}
          </mesh>
        ))}
        {/* شارة التخرج */}
        <mesh position={[0.17, 0.12, 0.205]}>
          <boxGeometry args={[0.08, 0.03, 0.01]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* الرقبة والياقة */}
      <mesh position={[0, 1.88, -0.2]}>
        <cylinderGeometry args={[0.075, 0.085, 0.16, 16]} />
        {toon(SKIN)}
      </mesh>
      <mesh position={[0, 1.82, -0.2]}>
        <cylinderGeometry args={[0.105, 0.115, 0.07, 16]} />
        {toon(BLACK)}
      </mesh>

      <Head headRef={head} />

      {/* الذراعان واليدان على الكيبورد */}
      {[-1, 1].map((sx) => (
        <group key={sx}>
          <Limb from={[sx * 0.36, 1.7, -0.22]} to={[sx * 0.42, 1.38, 0.02]} r={0.085}>{toon(NAVY)}</Limb>
          <Limb from={[sx * 0.42, 1.38, 0.02]} to={[sx * 0.2, 1.43, 0.36]} r={0.075}>{toon(NAVY)}</Limb>
          <group ref={sx < 0 ? leftHand : rightHand}>
            <mesh position={[sx * 0.17, 1.43, 0.44]} scale={[1, 0.6, 1.25]}>
              <sphereGeometry args={[0.065, 16, 16]} />
              {toon(SKIN)}
            </mesh>
          </group>
          {sx < 0 && (
            <mesh position={[-0.215, 1.43, 0.33]} rotation={[Math.PI / 2 - 0.25, 0, 0.55]}>
              <cylinderGeometry args={[0.072, 0.072, 0.05, 16]} />
              <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.25} />
            </mesh>
          )}
        </group>
      ))}

      {/* شاشة هولوغرام عائمة تعرض الكود */}
      <Float speed={1.4} floatIntensity={0.5} rotationIntensity={0.05}>
        <group position={[1.45, 2.4, 0.2]} rotation={[0, -0.5, 0]} scale={0.82}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[1.62, 1.06]} />
            <meshBasicMaterial color="#7c3aed" transparent opacity={0.35} toneMapped={false} />
          </mesh>
          <mesh>
            <planeGeometry args={[1.5, 0.94]} />
            <meshBasicMaterial map={tex} transparent opacity={0.92} toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function CodeSource({ children }) {
  const { ctx, tex } = useCodeTexture();
  const state = useRef({ chars: 0, acc: 0, hold: 0 });
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
  return children(tex);
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
    g.rotation.y += (s.pointer.x * 0.3 - 0.32 + scroll * 0.9 - g.rotation.y) * 0.06;
    g.rotation.x += (-s.pointer.y * 0.12 + scroll * 0.25 - g.rotation.x) * 0.06;
    g.position.y += (scroll * 1.6 - g.position.y) * 0.08;
    const sc = (s.size.width < 600 ? 0.72 : 1) * (1 - scroll * 0.25);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, sc, 0.08));
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.55, 5.3], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} />
      <pointLight position={[-4, 1, 3]} intensity={10} color="#f472b6" />
      <directionalLight position={[-2, 3, 4]} intensity={0.9} color="#ffe4cc" />
      <pointLight position={[4, 2, -2]} intensity={30} color="#60a5fa" />

      <Rig>
        <group position={[0, -1.55, 0]}>
          <CodeSource>{(tex) => <Coder tex={tex} />}</CodeSource>
        </group>
        <Symbol3D text="</>" position={[-1.9, 1.75, -0.6]} color="#a78bfa" size={0.45} />
        <Symbol3D text="{ }" position={[-2.0, 0.2, 0.3]} color="#f472b6" size={0.4} speed={0.8} />
        <Symbol3D text="=>" position={[2.0, -0.6, 0.6]} color="#22d3ee" size={0.38} speed={1.2} />
        <Symbol3D text=";" position={[0.6, 2.0, -1.2]} color="#a3e635" size={0.45} speed={1.1} />
      </Rig>

      <Sparkles count={70} scale={[9, 6, 4]} size={2.2} speed={0.4} color="#c4b5fd" />
    </Canvas>
  );
}
