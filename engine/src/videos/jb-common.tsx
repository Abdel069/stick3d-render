// Joshua Bell video (German) - shared helpers: scene wrapper, looks, violin/bow/case props, walkers, notes.
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Box, Cyl, Ball, CanvasPlane, INK } from "../style/toon";
import { Look } from "../style/puppet";
import { Person, seg, lerp, clamp, V3 } from "../style/kit";
import { Glow } from "../style/props";
import { FaceGroup, hand } from "../style/extra";

export const FPS = 30, LEAD = 6, TAIL = 8, WALK = 3.4;
export type Ctx = { t: number; f: number };
export type Trans = "ghost" | "zoom" | "flash" | "whip";
// scene cuts (seconds) taken from the word timings of words.json
export const CUTS = [0, 3.65, 9.05, 13.6, 15.45, 22.1, 27.55, 32.3, 36.35, 40.55, 45.15, 49.9];

export const Scene: React.FC<{ start: number; end: number; first?: boolean; trans?: Trans; bg: string; children: (c: Ctx) => React.ReactNode }> = ({ start, end, first, trans = "ghost", bg, children }) => {
  const from = Math.round(start * FPS) - (first ? 0 : LEAD), dur = Math.round(end * FPS) - from + TAIL;
  return <Sequence from={from} durationInFrames={dur} layout="none"><Inner from={from} first={first} trans={trans} bg={bg} children={children} /></Sequence>;
};
const Inner: React.FC<{ from: number; first?: boolean; trans: Trans; bg: string; children: (c: Ctx) => React.ReactNode }> = ({ from, first, trans, bg, children }) => {
  const f = useCurrentFrame(), t = (f + from) / FPS;
  const k = first ? 1 : clamp(f / (LEAD + 2)), ke = Easing.out(Easing.cubic)(k);
  const sc = !first && trans === "zoom" ? lerp(1.35, 1, ke) : 1;
  const tx = !first && trans === "whip" ? (1 - ke) * 720 : 0, blur = !first && trans === "whip" ? (1 - ke) * 14 : 0;
  return (
    <AbsoluteFill style={{ opacity: first || trans === "flash" || trans === "whip" ? 1 : k, transform: `translateX(${tx}px) scale(${sc})`, background: bg, filter: `saturate(1.32) contrast(1.07) brightness(1.02)${blur > 0.2 ? ` blur(${blur.toFixed(1)}px)` : ""}` }}>
      <ThreeCanvas width={720} height={1280} camera={{ fov: 60, position: [0, 2, 8], near: 0.1, far: 200 }} gl={{ antialias: true }}>
        <color attach="background" args={[bg]} />{children({ t, f })}
      </ThreeCanvas>
      {!first && trans === "flash" ? <AbsoluteFill style={{ background: "#fff", opacity: 1 - clamp(f / 7) }} /> : null}
    </AbsoluteFill>
  );
};
export const yawTo = (cam: V3, p: V3) => Math.atan2(cam[0] - p[0], cam[2] - p[2]);
export const toWorld = (p: V3, loc: V3, cam: V3): V3 => { const y = yawTo(cam, p); return [p[0] + loc[0] * Math.cos(y) + loc[2] * Math.sin(y), p[1] + loc[1], p[2] - loc[0] * Math.sin(y) + loc[2] * Math.cos(y)]; };

/* ---------- looks ---------- */
export const busker: Look = { skin: "#f1d0b0", body: "#3f74c4", outfit: "shirt", hair: "short", hairColor: "#2a1a12", hat: "#d9382c", shoe: "#2a1a12" };
export const tux: Look = { skin: "#f1d0b0", body: "#15151e", outfit: "suit", tie: "#e5233a", shirt: "#ffffff", hair: "short", hairColor: "#2a1a12", shoe: "#0b0d1a" };
export const woman: Look = { skin: "#e9bf9a", body: "#8e3fb8", outfit: "blazer", shirt: "#ffffff", hair: "bob", hairColor: "#4a2a1a", glasses: true, shoe: "#2a1a12" };
export const crowd: Look[] = [
  { skin: "#fbe3c8", body: "#e53e3e", outfit: "hoodie", hair: "short", hairColor: "#222" }, { skin: "#c98e62", body: "#22a867", outfit: "shirt", hair: "bob", hairColor: "#1a1010" },
  { skin: "#fbe3c8", body: "#f0b429", outfit: "suit", tie: "#1d2f66", hair: "grey" }, { skin: "#8d5a3a", body: "#7c4dff", outfit: "hoodie", hair: "swept", hairColor: "#111", glasses: true },
  { skin: "#f6d6bd", body: "#2d3142", outfit: "suit", tie: "#ff3b3b", hair: "short", hairColor: "#3b2a1a" }, { skin: "#e0b48c", body: "#ff7a29", outfit: "shirt", hair: "bob", hairColor: "#5a3420" },
  { skin: "#fbe3c8", body: "#2f8cff", outfit: "blazer", shirt: "#fff", hair: "swept", hairColor: "#c47a2a" }, { skin: "#a86b45", body: "#ff4fa0", outfit: "hoodie", hair: "short", hairColor: "#111", glasses: true },
];
export const rnd = (i: number, k = 0) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };

/* ---------- violin, bow, case, notes ---------- */
export const Violin: React.FC<{ p: V3; s?: number; rot?: V3 }> = ({ p, s = 1, rot }) => (
  <group position={p} rotation={rot} scale={s}>
    <Ball p={[0, 0, 0]} r={0.3} s={[1, 1.35, 0.3]} color="#b4561f" ink={0.06} />
    <Box p={[0, 0.66, 0]} s={[0.09, 0.62, 0.06]} color="#2a1608" line={2} />
    <Ball p={[0, 1.0, 0]} r={0.07} color="#b4561f" ink={0.04} />
    <Box p={[0, -0.12, 0.1]} s={[0.22, 0.03, 0.02]} color="#f3d48a" line={1} />
  </group>
);
export const Bow: React.FC<{ p: V3; s?: number; rot?: V3 }> = ({ p, s = 1, rot }) => (
  <group position={p} rotation={rot} scale={s}>
    <Box p={[0, 0, 0]} s={[1.5, 0.035, 0.035]} color="#6b3a1a" line={2} /><Box p={[0.05, -0.05, 0]} s={[1.4, 0.012, 0.02]} color="#fff6e0" line={1} />
  </group>
);
// open violin case on the floor; open: 0..1, coins: number of coins lying inside
export const Case: React.FC<{ p: V3; open: number; rotY?: number; coins?: [number, number][]; empty?: boolean }> = ({ p, open, rotY = 0, coins = [], empty }) => (
  <group position={p} rotation={[0, rotY, 0]}>
    <Box p={[0, 0.18, 0]} s={[2.3, 0.36, 0.95]} color="#241a18" />
    <Box p={[0, 0.365, 0]} s={[2.1, 0.02, 0.75]} color="#a3213a" line={1} />
    {empty ? null : <Violin p={[0, 0.5, 0]} s={0.0001} />}
    <group position={[0, 0.36, -0.475]} rotation={[-open * 1.95, 0, 0]}>
      <Box p={[0, 0.09, 0.475]} s={[2.3, 0.18, 0.95]} color="#2f2220" />
      <Box p={[0, -0.005, 0.475]} s={[2.1, 0.02, 0.75]} color="#a3213a" line={1} />
    </group>
    {coins.map(([x, z], i) => <Cyl key={i} p={[x, 0.4, z]} rt={0.12} h={0.03} color="#ffcf3f" line={1} />)}
  </group>
);
// rising music notes (sprites facing the camera)
export const Notes: React.FC<{ p: V3; t: number; n?: number; color?: string; amp?: number }> = ({ p, t, n = 5, color = "#ffffff", amp = 1 }) => (
  <FaceGroup p={p}>
    {Array.from({ length: n }, (_, k) => {
      const ph = (t * 0.45 + k / n) % 1, a = Math.sin(ph * Math.PI);
      return <CanvasPlane key={k} p={[Math.sin(ph * 5 + k * 2) * 0.55 * amp - ph * 0.5, 0.4 + ph * 2.6 * amp, 0.3]} s={[0.55, 0.55]} px={[96, 96]} draw={(c, W, H) => {
        c.clearRect(0, 0, W, H); c.globalAlpha = Math.min(1, a * 1.6); c.font = "900 84px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.lineWidth = 9; c.strokeStyle = INK; c.strokeText(k % 2 ? "♪" : "♫", W / 2, H / 2); c.fillStyle = color; c.fillText(k % 2 ? "♪" : "♫", W / 2, H / 2);
      }} />;
    })}
  </FaceGroup>
);

/* ---------- the busker playing (shared by several scenes) ---------- */
// returns pose + children (violin + bow) for a standing player at P
export const Player: React.FC<{ P: V3; h: number; look: Look; f: number; t: number; k?: number; mood?: "smile" | "deadpan" | "grin" | "worry" | "shock" | "laugh" | "gulp" | "angry"; flip?: boolean; lookX?: number }> = ({ P, h, look, f, t, k = 1, mood = "smile", flip = false, lookX = 0 }) => {
  const sw = Math.sin(t * 6.9), bowX = 0.16 + 0.11 * sw, hf = flip ? -1 : 1;
  const lT: [number, number] = [-0.22, lerp(0.35, 0.58, k)], rT: [number, number] = [lerp(0.2, bowX, k), lerp(0.3, 0.5 + 0.015 * sw, k)];
  return (<>
    <Person p={P} h={h} look={look} f={f} pose={{ mood, armL: lT, armR: rT, armLK: 1, armRK: 1, flip, lookX, tilt: 0.09 * k + 0.03 * Math.sin(t * 1.7), squash: 0.015 * Math.sin(t * 3.1) }} />
    <FaceGroup p={P}>
      <Violin p={hand(h, [-0.2, lerp(0.38, 0.56, k)], 0, flip, 0.14) as V3} s={h * 0.25} rot={[0, 0, 1.25 * hf]} />
      <Bow p={hand(h, [rT[0] - 0.01, rT[1] - 0.01], 0, flip, 0.2)} s={h * 0.24} rot={[0, 0, 0.04 * hf]} />
    </FaceGroup>
  </>);
};

/* ---------- a person walking on a straight path ---------- */
export const Walker: React.FC<{ p0: V3; v: V3; ts: number; t: number; f: number; look: Look; h?: number; hold?: boolean; i?: number }> = ({ p0, v, ts, t, f, look, h = 3.4, hold, i = 0 }) => {
  const u = Math.max(0, t - ts), P: V3 = [p0[0] + v[0] * u, 0, p0[2] + v[2] * u], dist = Math.hypot(v[0], v[2]) * u, flip = v[0] < -0.05;
  return (<>
    <Person p={P} h={h} look={look} f={f + i * 7} pose={{ walk: dist * WALK, speed: 1, flip, mood: "deadpan", armR: hold ? [0.24, 0.44] : undefined, armRK: hold ? 1 : 0, nerv: 0 }} />
    {hold ? <FaceGroup p={P}><Box p={hand(h, [0.24, 0.4], 0, flip, 0.12)} s={[0.34, 0.5, 0.12]} color={["#3b2a1a", "#1b1b2a", "#7a4a2a"][i % 3]} line={2} /></FaceGroup> : null}
  </>);
};
export const glowFloor = (p: V3, r: number, color: string, o = 0.4) => <Glow p={p} r={r} color={color} o={o} />;
export { seg, lerp, clamp };
