"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";
import { useSite } from "@/lib/site";

THREE.setConsoleFunction((type, message, ...params) => {
  if (type === "warn" && message.startsWith("THREE.Clock")) return;
  const method = console[type] ?? console.log;
  method.call(console, message, ...params);
});

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const LINK_DIST = 2.8;
const MAX_LINES = 560;
const MOUSE_Z = -3.5;

const VERT_LINES = /* glsl */ `
attribute float aProg;
attribute float aSeed;
attribute float aLevel;
attribute vec3 aEnd;
attribute float aCorner;
uniform float uThickness;
uniform float uHeight;
varying float vProg;
varying float vSeed;
varying float vLevel;
varying float vEdge;
varying vec3 vWorld;
varying vec2 vNdc;
void main() {
  vProg = aProg;
  vSeed = aSeed;
  vLevel = aLevel;
  vEdge = aCorner;
  vec4 a = modelViewMatrix * vec4(position, 1.0);
  vec4 b = modelViewMatrix * vec4(aEnd, 1.0);
  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  vec4 cA = projectionMatrix * a;
  vec4 cB = projectionMatrix * b;
  vNdc = cA.xy / cA.w;
  vec2 dir = normalize(cB.xy / cB.w - cA.xy / cA.w);
  vec2 norm = vec2(-dir.y, dir.x);
  float ndcTh = (uThickness / uHeight) * 2.0;
  vec4 pos = cA;
  pos.xy += norm * ndcTh * 0.5 * aCorner * pos.w;
  gl_Position = pos;
}
`;

const FRAG_LINES = /* glsl */ `
uniform float uTime;
uniform float uPulseSpeed;
uniform vec3 uColor;
uniform vec3 uColorSecondary;
uniform vec3 uHighlight;
uniform float uBaseAlpha;
uniform float uBandAlpha;
uniform vec3 uMouse;
uniform float uMouseStrength;
varying float vProg;
varying float vSeed;
varying float vLevel;
varying float vEdge;
varying vec3 vWorld;
varying vec2 vNdc;
void main() {
  float pulse = fract(vProg - uTime * uPulseSpeed + vSeed * 2.0);
  float band = smoothstep(0.0, 0.03, pulse) * (1.0 - smoothstep(0.03, 0.15, pulse));
  float core = smoothstep(0.9, 0.25, abs(vEdge));
  float dMouse = distance(vWorld.xy, uMouse.xy);
  float mouse = uMouseStrength * exp(-dMouse * 1.2) * 0.5;
  vec3 lineCol = mix(uColorSecondary, uColor, vLevel);
  float levelFade = mix(0.55, 1.0, vLevel);
  float mixH = clamp(band * 0.7 + mouse * 0.4, 0.0, 1.0);
  vec3 col = mix(lineCol, uHighlight, mixH);
  float cdist = length(vNdc);
  float contentFade = mix(0.8, 1.0, smoothstep(0.06, 0.5, cdist));
  float a = (uBaseAlpha + band * uBandAlpha + mouse) * core * contentFade * levelFade;
  if (a < 0.012) discard;
  gl_FragColor = vec4(col, a);
}
`;

const VERT_POINTS = /* glsl */ `
attribute float aSize;
attribute float aSeed;
uniform float uSize;
varying float vSeed;
varying vec3 vWorld;
void main() {
  vSeed = aSeed;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_PointSize = uSize * aSize * (300.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG_POINTS = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uHighlight;
uniform float uSize;
uniform float uOpacity;
uniform vec3 uMouse;
uniform float uMouseStrength;
varying float vSeed;
varying vec3 vWorld;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float alpha = smoothstep(0.5, 0.12, d);
  float twinkle = 0.7 + 0.3 * sin(uTime * (0.7 + vSeed * 1.4) + vSeed * 41.0);
  float mouse = uMouseStrength * exp(-distance(vWorld.xy, uMouse.xy) * 1.7);
  vec3 col = mix(uColor, uHighlight, clamp(mouse * 0.8, 0.0, 0.55));
  float a = alpha * twinkle * uOpacity * (0.5 + mouse * 0.55);
  if (a < 0.012) discard;
  gl_FragColor = vec4(col, a);
}
`;

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(count: number) {
  const clusters = [
    new THREE.Vector3(-8, 4, -2),
    new THREE.Vector3(9, -3, -1),
    new THREE.Vector3(-5, -6, 0),
    new THREE.Vector3(10, 6, -3),
    new THREE.Vector3(0, 0, -5),
  ];
  const nodePos = new Float32Array(count * 3);
  const nodeSize = new Float32Array(count);
  const nodeSeed = new Float32Array(count);
  const rand = mulberry32(202608);
  const pts: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number;
    if (rand() < 0.55) {
      const c = clusters[Math.floor(rand() * clusters.length)];
      const r = 1.8 + rand() * 3.2;
      const a = rand() * Math.PI * 2;
      const b = rand() * Math.PI * 2;
      x = c.x + Math.cos(a) * Math.cos(b) * r;
      y = c.y + Math.sin(a) * r;
      z = c.z + Math.sin(b) * r * 0.6;
    } else {
      x = (rand() - 0.5) * 30;
      y = (rand() - 0.5) * 20;
      z = (rand() - 0.5) * 12 - 4;
    }
    nodePos[i * 3] = x;
    nodePos[i * 3 + 1] = y;
    nodePos[i * 3 + 2] = z;
    nodeSize[i] = Math.hypot(x, y, z) < 6 && rand() < 0.3 ? 1.4 + rand() : 0.5 + rand() * 1.0;
    nodeSeed[i] = rand();
    pts.push(new THREE.Vector3(x, y, z));
  }

  const lp: number[] = [];
  const lprog: number[] = [];
  const lseed: number[] = [];
  const llevel: number[] = [];
  outer: for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      if (lp.length / 6 >= MAX_LINES) break outer;
      if (pts[i].distanceTo(pts[j]) < LINK_DIST) {
        lp.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        lprog.push(0, 1);
        lseed.push(rand(), rand());
        const lv = rand() < 0.35 ? 1 : 0;
        llevel.push(lv, lv);
      }
    }
  }

  return {
    nodePos,
    nodeSize,
    nodeSeed,
    linePos: new Float32Array(lp),
    lineProg: new Float32Array(lprog),
    lineSeed: new Float32Array(lseed),
    lineLevel: new Float32Array(llevel),
  };
}

function Network({
  lineColor,
  lineColorSecondary,
  nodeColor,
  highlight,
  lineBaseAlpha,
  lineBandAlpha,
  lineOpacity,
  lineWidth,
  pointOpacity,
  pointSize,
  blending,
  reduced,
}: {
  lineColor: string;
  lineColorSecondary: string;
  nodeColor: string;
  highlight: string;
  lineBaseAlpha: number;
  lineBandAlpha: number;
  lineOpacity: number;
  lineWidth: number;
  pointOpacity: number;
  pointSize: number;
  blending: THREE.Blending;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const gl = useThree((state) => state.gl);
  const lineColorObj = useMemo(() => new THREE.Color(lineColor), [lineColor]);
  const lineColorSecondaryObj = useMemo(
    () => new THREE.Color(lineColorSecondary),
    [lineColorSecondary],
  );
  const nodeColorObj = useMemo(() => new THREE.Color(nodeColor), [nodeColor]);
  const hlColor = useMemo(() => new THREE.Color(highlight), [highlight]);

  const count = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth < 768 ? 56 : 140),
    [],
  );
  const data = useMemo(() => buildNetwork(count), [count]);

  const mouse = useRef(new THREE.Vector3(-50, -50, 0));
  const mouseTarget = useRef(new THREE.Vector3(-50, -50, 0));
  const strength = useRef(0);
  const scroll = useRef(0);
  const pulseSpeed = useRef(0.12);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      const v = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const t = (MOUSE_Z - camera.position.z) / dir.z;
      const p = camera.position.clone().add(dir.multiplyScalar(t));
      mouseTarget.current.set(p.x, p.y, MOUSE_Z);
      strength.current = Math.min(0.55, strength.current + 0.07);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [camera]);

  const lineMat = useRef<THREE.ShaderMaterial>(null);
  const pointMat = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    strength.current = THREE.MathUtils.damp(strength.current, 0, 2, delta);
    mouse.current.lerp(mouseTarget.current, Math.min(1, delta * 2.6));

    if (group.current) {
      const s = scroll.current;
      const ut = reduced ? 0 : t;
      group.current.rotation.y = s * 0.18 + (reduced ? 0 : Math.sin(ut * 0.04) * 0.03);
      group.current.rotation.x = s * 0.08 + (reduced ? 0 : Math.cos(ut * 0.03) * 0.02);
      group.current.position.x = mouseTarget.current.x * 0.02;
      group.current.position.y = mouseTarget.current.y * 0.02;
    }

    const lm = lineMat.current;
    const pm = pointMat.current;
    if (!lm || !pm) return;
    const ut = reduced ? 0 : t;
    lm.uniforms.uTime.value = ut;
    lm.uniforms.uMouse.value.copy(mouse.current);
    lm.uniforms.uMouseStrength.value = strength.current;
    lm.uniforms.uPulseSpeed.value = pulseSpeed.current;
    lm.uniforms.uHeight.value = gl.domElement.height;
    lm.uniforms.uThickness.value = lineWidth;
    pm.uniforms.uTime.value = ut;
    pm.uniforms.uMouse.value.copy(mouse.current);
    pm.uniforms.uMouseStrength.value = strength.current;
  });

  const lineGeometry = useMemo(() => {
    const seg = data.linePos.length / 6;
    const pos = new Float32Array(seg * 6 * 3);
    const end = new Float32Array(seg * 6 * 3);
    const corner = new Float32Array(seg * 6);
    const prog = new Float32Array(seg * 6);
    const seed = new Float32Array(seg * 6);
    const level = new Float32Array(seg * 6);
    for (let s = 0; s < seg; s++) {
      const o = s * 6;
      const ax = data.linePos[o];
      const ay = data.linePos[o + 1];
      const az = data.linePos[o + 2];
      const bx = data.linePos[o + 3];
      const by = data.linePos[o + 4];
      const bz = data.linePos[o + 5];
      const aProg = data.lineProg[s * 2];
      const bProg = data.lineProg[s * 2 + 1];
      const aSeed = data.lineSeed[s * 2];
      const bSeed = data.lineSeed[s * 2 + 1];
      const quad = [
        { p: [ax, ay, az], e: [bx, by, bz], c: 1, pr: aProg, sd: aSeed },
        { p: [bx, by, bz], e: [ax, ay, az], c: 1, pr: bProg, sd: bSeed },
        { p: [bx, by, bz], e: [ax, ay, az], c: -1, pr: bProg, sd: bSeed },
        { p: [ax, ay, az], e: [bx, by, bz], c: 1, pr: aProg, sd: aSeed },
        { p: [bx, by, bz], e: [ax, ay, az], c: -1, pr: bProg, sd: bSeed },
        { p: [ax, ay, az], e: [bx, by, bz], c: -1, pr: aProg, sd: aSeed },
      ];
      for (let v = 0; v < 6; v++) {
        const vi = s * 6 + v;
        const q = quad[v];
        pos[vi * 3] = q.p[0];
        pos[vi * 3 + 1] = q.p[1];
        pos[vi * 3 + 2] = q.p[2];
        end[vi * 3] = q.e[0];
        end[vi * 3 + 1] = q.e[1];
        end[vi * 3 + 2] = q.e[2];
        corner[vi] = q.c;
        prog[vi] = q.pr;
        seed[vi] = q.sd;
        level[vi] = data.lineLevel[s];
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aEnd", new THREE.BufferAttribute(end, 3));
    g.setAttribute("aCorner", new THREE.BufferAttribute(corner, 1));
    g.setAttribute("aProg", new THREE.BufferAttribute(prog, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aLevel", new THREE.BufferAttribute(level, 1));
    return g;
  }, [data]);

  const pointGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.nodePos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(data.nodeSize, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(data.nodeSeed, 1));
    return g;
  }, [data]);

  return (
    <group ref={group}>
      <mesh geometry={lineGeometry} frustumCulled={false}>
        <shaderMaterial
          ref={lineMat}
          vertexShader={VERT_LINES}
          fragmentShader={FRAG_LINES}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={blending}
          uniforms={{
            uTime: { value: 0 },
            uPulseSpeed: { value: 0.24 },
            uThickness: { value: 2 },
            uHeight: { value: 800 },
            uColor: { value: lineColorObj },
            uColorSecondary: { value: lineColorSecondaryObj },
            uHighlight: { value: hlColor },
            uBaseAlpha: { value: lineBaseAlpha },
            uBandAlpha: { value: lineBandAlpha },
            uMouse: { value: new THREE.Vector3(-50, -50, 0) },
            uMouseStrength: { value: 0 },
            uOpacity: { value: lineOpacity },
          }}
        />
      </mesh>
      <points geometry={pointGeometry} frustumCulled={false}>
        <shaderMaterial
          ref={pointMat}
          vertexShader={VERT_POINTS}
          fragmentShader={FRAG_POINTS}
          transparent
          depthWrite={false}
          blending={blending}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: nodeColorObj },
            uHighlight: { value: hlColor },
            uSize: { value: pointSize },
            uOpacity: { value: pointOpacity },
            uMouse: { value: new THREE.Vector3(-50, -50, 0) },
            uMouseStrength: { value: 0 },
          }}
        />
      </points>
    </group>
  );
}

export function PolarBackground() {
  const { theme } = useSite();
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const [onscreen, setOnscreen] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setOnscreen(e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isDark = theme === "night";
  const lineColor = isDark ? "#2E7296" : "#B8D9EE";
  const lineColorSecondary = isDark ? "#1D5F78" : "#CFE6F5";
  const nodeColor = isDark ? "#00C8F0" : "#65B9E8";
  const highlight = isDark ? "#5DE7FF" : "#268DCA";
  const lineBaseAlpha = isDark ? 0.05 : 0.38;
  const lineBandAlpha = isDark ? 0.5 : 0.58;
  const lineOpacity = 1;
  const lineWidth = isDark ? 1.8 : 2.2;
  const pointOpacity = isDark ? 0.5 : 0.9;
  const pointSize = isDark ? 8 : 9;
  const blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;

  return (
    <div ref={wrapRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 1.5]}
        frameloop={onscreen ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Network
          lineColor={lineColor}
          lineColorSecondary={lineColorSecondary}
          nodeColor={nodeColor}
          highlight={highlight}
          lineBaseAlpha={lineBaseAlpha}
          lineBandAlpha={lineBandAlpha}
          lineOpacity={lineOpacity}
          lineWidth={lineWidth}
          pointOpacity={pointOpacity}
          pointSize={pointSize}
          blending={blending}
          reduced={reduced}
        />
      </Canvas>
      <div
        className={`absolute inset-0 bg-gradient-to-b from-night via-night/35 to-night ${
          isDark ? "opacity-50" : "opacity-10"
        }`}
      />
      <div className={`absolute inset-0 ${isDark ? "bg-grid opacity-20" : "bg-polar opacity-60"}`} />
    </div>
  );
}
