// Series "Emre" (3 clips): shared wrapper, looks, helper props and sets. Palette = Dusk & Honey (engine/src/brand.ts).
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, Easing, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Box, Cyl, Ball, CanvasPlane, INK } from "../style/toon";
import { Look } from "../style/puppet";
import { Person, seg, lerp, clamp, V3, Sign, Lights } from "../style/kit";
import { Floor, WallDoor, SideWall, Glow, Plant, Frame, WindowCity, Lamp, Rug, Shelf, Dust } from "../style/props";
import { FaceGroup, hand } from "../style/extra";
import { crowd, rnd } from "./jb-common";

export const FPS = 30, LEAD = 6, TAIL = 8, WALK = 3.4;
export type Ctx = { t: number; f: number };
export type Trans = "ghost" | "zoom" | "flash" | "whip";
export { seg, lerp, clamp, rnd, crowd };
export const P = { Y1: "#FFE6A8", Y2: "#F2B84B", Y3: "#C98A22", Y4: "#7A5214", C1: "#F5A5A0", C2: "#E4675F", C3: "#B04440", C4: "#6A2425", T1: "#9ADBD2", T2: "#3AA89E", T3: "#247A75", T4: "#124745", V1: "#A9A2E6", V2: "#6C5FC7", V3: "#41377F", V4: "#211B52", K1: "#FAF0DC", K2: "#EBDCBA", K3: "#C7B58F", K4: "#8A7B58" };

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
    <AbsoluteFill style={{ opacity: first || trans === "flash" || trans === "whip" ? 1 : k, transform: `translateX(${tx}px) scale(${sc})`, background: bg, filter: `saturate(1.1) contrast(1.05)${blur > 0.2 ? ` blur(${blur.toFixed(1)}px)` : ""}` }}>
      <ThreeCanvas width={720} height={1280} camera={{ fov: 60, position: [0, 2, 8], near: 0.1, far: 200 }} gl={{ antialias: true }}>
        <color attach="background" args={[bg]} />{children({ t, f })}
      </ThreeCanvas>
      {!first && trans === "flash" ? <AbsoluteFill style={{ background: "#fff", opacity: 1 - clamp(f / 7) }} /> : null}
    </AbsoluteFill>
  );
};

/* ---------- word timing helper: first token containing `needle` at/after token index `from` ---------- */
export type W = { word: string; start: number; end: number };
export const wordAt = (words: W[], script: string[]) => (needle: string, from = 0) => {
  const n = needle.toLowerCase(); const i = script.findIndex((w, k) => k >= from && w.toLowerCase().includes(n));
  return i < 0 ? words[Math.min(from, words.length - 1)].start : words[i].start;
};

/* ---------- looks (series cast; heads: unique seeds for the main cast, NPC_SEED crowd) ---------- */
export const jonas: Look = { skin: "#f1d0b0", body: P.C2, outfit: "hoodie", hair: "short", hairColor: "#3a2616", shoe: P.V4, seed: 21, sleeve: P.C2, pants: P.V3, brows: 1.25, ears: true, stubble: true };
export const emre: Look = { skin: "#d9a67a", body: P.T3, outfit: "blazer", shirt: "#ffffff", hair: "swept", hairColor: "#1d1410", shoe: P.V4, seed: 31, sleeve: P.T3, pants: P.V4, brows: 1.3, ears: true, mustache: "#1d1410", badge: P.Y2, flower: P.Y2 };
export const opa: Look = { skin: "#eac4a2", body: P.T2, outfit: "shirt", hair: "grey", hairColor: "#bdbdc8", glasses: true, shoe: P.K4, seed: 41, sleeve: P.T2, pants: P.K4, brows: 1.6, ears: true, scarf: P.C2 };
export const frau: Look = { skin: "#eac4a2", body: P.V2, outfit: "hoodie", hair: "none", turban: P.K1, shoe: P.V4, seed: 51, sleeve: P.V2, pants: P.V4, lashes: true, brows: 1.0, ears: true };
export const chef: Look = { skin: "#f1d0b0", body: P.V4, outfit: "suit", tie: P.C2, shirt: "#ffffff", hair: "grey", hairColor: "#9a9aa8", shoe: "#0b0d1a", seed: 61, sleeve: P.V4, pants: P.V4, brows: 1.7, ears: true, mustache: "#6b6b78" };
export const lagerchefin: Look = { skin: "#d9a67a", body: P.Y3, outfit: "hoodie", hair: "bob", hairColor: "#2a1a12", shoe: P.K4, seed: 71, sleeve: P.Y3, pants: P.V3, lashes: true, brows: 1.2, ears: true, glasses: true };
export const mutter: Look = { skin: "#d9a67a", body: P.C3, outfit: "blazer", shirt: P.K1, hair: "bob", hairColor: "#5a3420", shoe: P.V4, seed: 81, sleeve: P.C3, pants: P.V4, lashes: true, brows: 1.0, ears: true, earring: P.Y2 };

/* ---------- small helper props ---------- */
// phone held at the ear (puppet hand IK -> prop glued with hand())
export const Phone: React.FC<{ h: number; flip?: boolean; at?: [number, number]; glow?: string }> = ({ h, flip = false, at = [0.2, 0.72], glow = P.T1 }) => (
  <Box p={hand(h, at, 0, flip, 0.24)} s={[0.16, 0.36, 0.05]} color="#1b1b2a" line={2} rot={[0, 0, flip ? 0.15 : -0.15]} />
);
export const talkTilt = (t: number, on: boolean, a = 0.03) => (on ? Math.sin(t * 7.3) * a + Math.sin(t * 3.1) * a * 0.6 : 0);
export const StaticClock: React.FC<{ p: V3; r?: number; hh: number; mm: number }> = ({ p, r = 0.8, hh, mm }) => (
  <CanvasPlane p={p} s={[r * 2, r * 2]} px={[300, 300]} draw={(c, W, H) => {
    c.clearRect(0, 0, W, H); c.fillStyle = P.K1; c.strokeStyle = INK; c.lineWidth = 14; c.beginPath(); c.arc(W / 2, H / 2, W / 2 - 10, 0, 7); c.fill(); c.stroke();
    c.lineWidth = 6; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; c.beginPath(); c.moveTo(W / 2 + Math.sin(a) * 112, H / 2 - Math.cos(a) * 112); c.lineTo(W / 2 + Math.sin(a) * 128, H / 2 - Math.cos(a) * 128); c.stroke(); }
    const ah = ((hh % 12) + mm / 60) / 12 * Math.PI * 2, am = mm / 60 * Math.PI * 2; c.lineCap = "round";
    c.lineWidth = 12; c.beginPath(); c.moveTo(W / 2, H / 2); c.lineTo(W / 2 + Math.sin(ah) * 66, H / 2 - Math.cos(ah) * 66); c.stroke();
    c.lineWidth = 8; c.strokeStyle = P.C3; c.beginPath(); c.moveTo(W / 2, H / 2); c.lineTo(W / 2 + Math.sin(am) * 104, H / 2 - Math.cos(am) * 104); c.stroke();
    c.fillStyle = INK; c.beginPath(); c.arc(W / 2, H / 2, 9, 0, 7); c.fill();
  }} />
);
// poster on a wall / floating card that pops in (k 0..1)
export const Poster: React.FC<{ p: V3; s: [number, number]; k: number; draw: (c: CanvasRenderingContext2D, W: number, H: number) => void; rot?: V3 }> = ({ p, s, k, draw, rot }) => (
  <CanvasPlane p={p} s={[s[0] * k + 0.001, s[1] * k + 0.001]} rot={rot} px={[Math.round(s[0] * 200), Math.round(s[1] * 200)]} frame={INK} draw={draw} />
);
export const drawText = (txt: string, bg: string, fg: string, size: number, sub?: string) => (c: CanvasRenderingContext2D, W: number, H: number) => {
  c.fillStyle = bg; c.fillRect(0, 0, W, H); c.fillStyle = fg; c.font = `800 ${size}px Inter, Arial`; c.textAlign = "center"; c.textBaseline = "middle";
  const ls = txt.split("\n"); ls.forEach((l, i) => c.fillText(l, W / 2, H / 2 + (i - (ls.length - 1) / 2) * size * 1.08 - (sub ? size * 0.2 : 0)));
  if (sub) { c.font = `600 ${size * 0.42}px Inter, Arial`; c.fillStyle = fg; c.globalAlpha = 0.75; c.fillText(sub, W / 2, H / 2 + size * 0.95); c.globalAlpha = 1; }
};

/* ---------- overlay card (Einblendung): quiet glass pill, top area ---------- */
export const InfoCard: React.FC<{ a: number; b: number; t: number; title: string; body?: string; big?: string; top?: number }> = ({ a, b, t, title, body, big, top = 130 }) => {
  const k = interpolate(t, [a, a + 0.5, b - 0.4, b], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  if (k <= 0.001) return null;
  return (
    <div style={{ position: "absolute", left: 44, right: 44, top, opacity: k, transform: `translateY(${(1 - k) * -16}px)`, padding: "26px 30px", borderRadius: 26, background: "rgba(20,14,52,.62)", border: "1.5px solid rgba(250,240,220,.28)", boxShadow: "0 12px 40px rgba(6,4,24,.45)", fontFamily: "Inter, Arial", color: "#FAF0DC", textAlign: "center" }}>
      <div style={{ width: 34, height: 3, borderRadius: 2, background: "#F2B84B", margin: "0 auto 14px" }} />
      <div style={{ fontWeight: 600, fontSize: 22, letterSpacing: "0.26em", textTransform: "uppercase", color: "#F2B84B" }}>{title}</div>
      {big ? <div style={{ fontWeight: 600, fontSize: 64, lineHeight: 1.1, marginTop: 10 }}>{big}</div> : null}
      {body ? <div style={{ fontWeight: 500, fontSize: 30, lineHeight: 1.32, marginTop: 12, opacity: 0.92 }}>{body}</div> : null}
    </div>
  );
};

/* ================= SETS ================= */
// Jonas' living room at night (camera usually looks toward -z). Sofa left, window with night city, wall clock.
export const Living: React.FC<{ t: number; hh?: number; mm?: number }> = ({ t, hh = 9, mm = 40 }) => (<>
  <Lights warm="#EBDCBA" />
  <Floor kind="plank" a={P.K4} b={P.K3} w={30} d={24} unit={1.6} />
  <WallDoor z={-7} W={30} kind="plain" a={P.V3} b={P.V3} base={P.V4} />
  <SideWall x={-7} kind="plain" a={P.V3} b={P.V3} /><SideWall x={7} kind="plain" a={P.V3} b={P.V3} />
  <WindowCity p={[3.4, 3.9, -6.9]} s={[3.6, 3.4]} dusk />
  <StaticClock p={[-2.6, 5.1, -6.9]} r={0.62} hh={hh} mm={mm} />
  <Frame p={[0.4, 4.0, -6.9]} s={[1.5, 2.0]} art={1} />
  <Rug p={[0, 0.02, -2.6]} s={[6, 3.8]} a={P.V2} b={P.C3} />
  {/* sofa */}
  <group position={[-1.6, 0, -4.0]}>
    <Box p={[0, 0.55, 0]} s={[4.4, 0.7, 1.7]} color={P.C3} /><Box p={[0, 1.35, -0.75]} s={[4.4, 1.0, 0.35]} color={P.C3} />
    <Box p={[-2.35, 0.9, 0]} s={[0.4, 1.1, 1.7]} color={P.C4} /><Box p={[2.35, 0.9, 0]} s={[0.4, 1.1, 1.7]} color={P.C4} />
    <Box p={[1.45, 1.05, -0.3]} s={[0.9, 0.7, 0.3]} color={P.Y2} rot={[0, 0, 0.15]} />
  </group>
  <Box p={[0.9, 0.35, -2.2]} s={[1.5, 0.7, 1.0]} color={P.K3} /><Cyl p={[0.9, 0.78, -2.2]} rt={0.3} h={0.14} color="#fff" />
  <Lamp p={[3.2, 0, -5.4]} h={3.4} color={P.Y1} /><Glow p={[3.2, 3.2, -5.4]} r={2.8} color="rgba(255,214,140,1)" o={0.22} />
  <Plant p={[5.4, 0, -5.4]} s={1.4} pot={P.Y3} /><Shelf p={[-5.4, 2.1, -6.8]} w={2.2} rows={3} seed={3} wood={P.K4} />
  <Dust t={t} n={10} area={[6, 5, 5]} color="rgba(255,236,190,.8)" />
</>);

// small flat (Emre): kitchenette, fridge (door opens), bed, window, desk with laptop
export const Flat: React.FC<{ t: number; fridge?: number }> = ({ t, fridge = 0 }) => (<>
  <Lights warm="#FFE6A8" />
  <Floor kind="plank" a={P.K3} b={P.K2} w={30} d={24} unit={1.6} />
  <WallDoor z={-7} W={30} kind="plain" a={P.T2} b={P.T2} base={P.T4} />
  <SideWall x={-7} kind="plain" a={P.T2} b={P.T2} /><SideWall x={7} kind="plain" a={P.T2} b={P.T2} />
  <WindowCity p={[2.6, 4.0, -6.9]} s={[3.2, 3.4]} dusk />
  <Frame p={[-2.4, 4.2, -6.9]} s={[1.4, 1.9]} art={2} />
  {/* fridge */}
  <group position={[-4.4, 0, -6.0]}>
    <Box p={[0, 2.0, 0]} s={[1.9, 4.0, 1.4]} color={P.K1} />
    <group position={[-0.95, 2.0, 0.7]} rotation={[0, -fridge * 1.7, 0]}><Box p={[0.95, 0, 0]} s={[1.9, 3.8, 0.12]} color={P.K2} /><Box p={[1.6, 0, 0.1]} s={[0.1, 1.0, 0.1]} color={P.K4} /></group>
    {fridge > 0.05 ? <>{[0.9, 2.0, 3.0].map((y) => <Box key={y} p={[0, y, 0.1]} s={[1.7, 0.06, 1.2]} color={P.T1} />)}<Glow p={[0, 2.0, 0.3]} r={1.6} color="rgba(200,240,255,1)" o={0.35 * fridge} /></> : null}
  </group>
  <Box p={[3.6, 0.55, -5.6]} s={[3.2, 0.1, 1.4]} color={P.K4} /><Box p={[2.2, 0.28, -5.6]} s={[0.1, 0.56, 1.3]} color={P.K4} /><Box p={[5.0, 0.28, -5.6]} s={[0.1, 0.56, 1.3]} color={P.K4} />
  <Rug p={[0, 0.02, -2.4]} s={[5, 3.4]} a={P.Y3} b={P.T3} />
  <Plant p={[5.6, 0, -2.4]} s={1.2} pot={P.C3} /><Lamp p={[-5.6, 0, -2.0]} h={3.2} color={P.Y1} />
  <Dust t={t} n={8} area={[6, 5, 5]} color="rgba(255,236,190,.8)" />
</>);

// street with 3 rows of houses, numbered doors. doors: [{x, num, open, color}]
export const Street: React.FC<{ t: number; dusk?: boolean; open?: number; num?: string; opens?: [number, number, number]; nums?: [string, string, string]; day?: boolean }> = ({ t, dusk, open = 0, num = "10", opens, nums }) => {
  const wall = dusk ? P.V3 : P.K3, wall2 = dusk ? P.V4 : P.K2, roof = dusk ? P.C4 : P.C3;
  const ops = opens ?? [0, open, 0], ns = nums ?? [String(Number(num) - 1), num, String(Number(num) + 1)];
  return (<>
    <Lights warm={dusk ? "#F5A5A0" : "#FFF6E3"} />
    <Floor kind="tile" a={dusk ? P.V4 : P.K3} b={dusk ? P.V3 : P.K2} w={40} d={40} unit={2.2} />
    {[-7, 0, 7].map((x, i) => (
      <group key={x} position={[x, 0, -7]}>
        <Box p={[0, 2.6, 0]} s={[6.4, 5.2, 2.4]} color={i === 1 ? P.K1 : wall} /><Box p={[0, 5.5, 0]} s={[6.8, 0.6, 2.6]} color={roof} />
        <Box p={[0, 6.4, 0]} s={[5.4, 1.1, 2.2]} color={roof} />
        {[-2.0, 2.0].map((wx) => <Box key={wx} p={[wx, 3.5, 1.22]} s={[1.1, 1.3, 0.1]} color={dusk ? P.Y1 : P.T1} line={2} />)}
        {dusk ? [-2.0, 2.0].map((wx) => <Glow key={"g" + wx} p={[wx, 3.5, 1.5]} r={1.2} color="rgba(255,214,140,1)" o={0.4} />) : null}
        <Box p={[0, 1.5, 1.0]} s={[1.9, 3.1, 0.1]} color={P.V4} line={2} />
        <group position={[-0.9, 0, 1.25]} rotation={[0, -ops[i] * 1.5, 0]}><Box p={[0.9, 1.5, 0]} s={[1.8, 3.0, 0.14]} color={i === 1 ? P.Y3 : P.C3} line={3} /><Ball p={[1.5, 1.5, 0.12]} r={0.1} color={P.Y1} /></group>
        <Sign p={[1.9, 2.6, 1.3]} s={[0.9, 0.7]} text={ns[i]} bg={P.K1} fg="#111" size={110} />
      </group>
    ))}
    <Box p={[0, 0.05, -4.4]} s={[40, 0.06, 0.4]} color={P.K3} line={1} />
    {dusk ? null : <Glow p={[0, 8, -10]} r={9} color="rgba(255,226,170,1)" o={0.3} />}
    <Plant p={[-4.0, 0, -4.0]} s={1.0} pot={P.C3} /><Plant p={[3.6, 0, -4.0]} s={1.0} pot={P.Y3} />
    <Dust t={t} n={10} area={[8, 6, 6]} color="rgba(255,240,200,.8)" />
  </>);
};

/* ---- extra series props ---- */
export const Dog: React.FC<{ p: V3; flip?: boolean; bark?: number; t: number }> = ({ p, flip, bark = 0, t }) => (
  <group position={p} scale={[flip ? -1 : 1, 1, 1]}>
    <Ball p={[0, 0.7, 0]} r={0.55} s={[1.5, 0.9, 0.9]} color={P.Y3} /><Ball p={[0.85, 1.05 + bark * 0.05, 0]} r={0.4} color={P.Y3} />
    <Box p={[1.2, 0.95, 0]} s={[0.4, 0.25, 0.3]} color={P.Y4} /><Ball p={[1.45, 1.0, 0]} r={0.09} color={INK} />
    <Box p={[0.8, 1.45, 0.2]} s={[0.15, 0.4, 0.12]} color={P.Y4} rot={[0, 0, 0.3]} /><Box p={[0.8, 1.45, -0.2]} s={[0.15, 0.4, 0.12]} color={P.Y4} rot={[0, 0, 0.3]} />
    {[[-0.5, 0.2], [-0.5, -0.2], [0.5, 0.2], [0.5, -0.2]].map(([x, z], i) => <Cyl key={i} p={[x, 0.2, z]} rt={0.09} h={0.4} color={P.Y4} line={2} />)}
    <Box p={[-0.95, 1.0 + Math.sin(t * 14) * 0.12, 0]} s={[0.5, 0.1, 0.1]} color={P.Y4} rot={[0, 0, 0.7]} />
  </group>
);
export const Cake: React.FC<{ p: V3; s?: number }> = ({ p, s = 1 }) => (
  <group position={p} scale={s}><Cyl p={[0, 0.15, 0]} rt={0.55} h={0.3} color={P.K2} /><Cyl p={[0, 0.42, 0]} rt={0.42} h={0.25} color={P.C1} /><Cyl p={[0, 0.7, 0]} rt={0.05} h={0.3} color={P.Y1} line={1} /><Glow p={[0, 0.95, 0]} r={0.25} color="rgba(255,200,90,1)" o={0.9} /></group>
);
export const Pallets: React.FC<{ p: V3; n?: number; color?: string }> = ({ p, n = 4, color = P.Y3 }) => (
  <group position={p}>{Array.from({ length: n }, (_, i) => <React.Fragment key={i}><Box p={[0, 0.12 + i * 0.95, 0]} s={[1.8, 0.18, 1.3]} color={P.Y4} line={2} /><Box p={[0, 0.65 + i * 0.95, 0]} s={[1.6, 0.78, 1.1]} color={color} line={3} /></React.Fragment>)}</group>
);
export const CarBox: React.FC<{ p: V3; color?: string; rotY?: number }> = ({ p, color = P.C2, rotY = 0 }) => (
  <group position={p} rotation={[0, rotY, 0]}><Box p={[0, 0.65, 0]} s={[3.6, 0.8, 1.5]} color={color} /><Box p={[-0.2, 1.3, 0]} s={[2.0, 0.65, 1.3]} color={P.T1} line={3} />
    {[-1.1, 1.1].map((x) => [-0.78, 0.78].map((z) => <Cyl key={x + "" + z} p={[x, 0.32, z]} rt={0.36} h={0.2} color={INK} rot={[Math.PI / 2, 0, 0]} />))}
    <Glow p={[1.9, 0.7, 0]} r={1.4} color="rgba(255,230,150,1)" o={0.5} /></group>
);
// warehouse / depot (Emre's old job)
export const Lager: React.FC<{ t: number }> = ({ t }) => (<>
  <Lights warm="#EBDCBA" />
  <Floor kind="tile" a={P.K3} b={P.K4} w={30} d={24} unit={2.4} />
  <WallDoor z={-7} W={30} kind="plain" a={P.K4} b={P.K4} base={P.V4} /><SideWall x={-7} kind="plain" a={P.K4} b={P.K4} /><SideWall x={7} kind="plain" a={P.K4} b={P.K4} />
  <Shelf p={[-4.2, 0, -6.2]} w={3.4} rows={5} seed={5} wood={P.Y4} /><Shelf p={[4.2, 0, -6.2]} w={3.4} rows={5} seed={9} wood={P.Y4} />
  <Pallets p={[-1.6, 0, -4.8]} n={3} /><Pallets p={[1.6, 0, -4.6]} n={2} color={P.T3} />
  <Box p={[0, 0.03, -2.5]} s={[12, 0.04, 0.3]} color={P.Y2} line={1} />
  <Sign p={[0, 6.0, -6.8]} s={[3.4, 0.9]} text="LAGER" bg={P.Y2} fg="#111" size={110} />
  <Dust t={t} n={10} area={[6, 5, 5]} color="rgba(255,240,200,.7)" />
</>);
// night road with skyline (car scenes)
export const NightRoad: React.FC<{ t: number }> = ({ t }) => (<>
  <Lights warm="#A9A2E6" />
  <Floor kind="tile" a={P.V4} b={"#1b1442"} w={60} d={40} unit={3} />
  {Array.from({ length: 9 }, (_, i) => <Box key={i} p={[-14 + i * 3.8, 2 + (i % 3) * 1.6, -11 - (i % 2) * 2]} s={[3.2, 4 + (i % 3) * 3.2, 2.4]} color={[P.V3, P.V4, P.T4][i % 3]} />)}
  {Array.from({ length: 9 }, (_, i) => Array.from({ length: 5 }, (_, k) => <Box key={i + "-" + k} p={[-14 + i * 3.8 + ((k % 2) - 0.5) * 1.2, 1.2 + k * 1.1, -9.7 - (i % 2) * 2]} s={[0.5, 0.5, 0.05]} color={(i * 5 + k) % 3 ? P.Y1 : P.V4} line={0} />))}
  <Box p={[0, 0.02, -3.0]} s={[60, 0.04, 3.6]} color="#24205a" line={0} />
  {Array.from({ length: 12 }, (_, i) => <Box key={i} p={[((i * 4 - t * 6) % 48) - 24, 0.05, -3.0]} s={[1.6, 0.05, 0.12]} color={P.Y2} line={0} />)}
</>);

export { Person, Box, Cyl, Ball, CanvasPlane, INK, Sign, FaceGroup, hand, Floor, WallDoor, SideWall, Glow, Plant, Frame, WindowCity, Lamp, Rug, Shelf, Dust };
export type { V3 };
