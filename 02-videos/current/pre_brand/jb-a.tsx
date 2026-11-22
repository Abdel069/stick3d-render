// Joshua Bell video, part A (scenes 1-5): the station, the setup, the rush, the seven, the coins.
import React from "react";
import { Easing } from "remotion";
import { Box, Cyl, Ball, CanvasPlane, Surface, INK } from "../style/toon";
import { Person, Lights, Clock, Sign, V3 } from "../style/kit";
import { Floor, WallDoor, SideWall, Glow, Shaft, Plant, Frame, WindowCity, Lamp, Cabinet, Dust, Rug, Shelf } from "../style/props";
import { Cam, Key, camAt, FaceGroup, hand, Bench, Bin, StreetSign, Mug } from "../style/extra";
import { Ctx, WALK, busker, woman, crowd, rnd, Violin, Case, Notes, Player, Walker, toWorld, seg, lerp, clamp } from "./jb-common";

/* ============ S1  0 - 3.65  "Morgens, Berufsverkehr, ein U-Bahnhof in Washington." ============ */
const K1: Key[] = [
  { t: 0, pos: [0.6, 11.5, 12.5], look: [0, 1, -3], fov: 56 },
  { t: 1.9, pos: [0.2, 6.2, 11.2], look: [0, 2.2, -3], fov: 56 },
  { t: 3.7, pos: [0.8, 3.5, 9.4], look: [0, 3.0, -3], fov: 58 },
  { t: 4.0, pos: [0.9, 3.4, 9.2], look: [0, 3.0, -3], fov: 58 },
];
const crowd1 = Array.from({ length: 20 }, (_, i) => { const x0 = (rnd(i) - 0.5) * 3.2, xe = (rnd(i, 1) - 0.5) * 15, T = 8.5; return { p0: [x0, 0, -9.2] as V3, v: [(xe - x0) / T, 0, 14.4 / T] as V3, ts: -6.5 + i * 0.42, look: crowd[i % 8], h: 3.1 + rnd(i, 2) * 0.6, hold: i % 3 === 0 }; });
export const S1 = ({ t, f }: Ctx) => (<>
  <Cam t={t} keys={K1} />
  <Lights warm="#ffe2b0" />
  <Floor kind="tile" a="#a8bcc4" b="#9bb0b9" unit={1.8} w={34} d={34} />
  <WallDoor z={-8} W={34} kind="brick" a="#1f6f7d" b="#1a6270" door={{ x: 0, w: 5, h: 5.2 }} base="#0e3a45" unit={1.1} />
  <SideWall x={-9} kind="brick" a="#1f6f7d" b="#1a6270" unit={1.1} /><SideWall x={9} kind="brick" a="#1f6f7d" b="#1a6270" unit={1.1} />
  {/* the bright morning outside the entrance */}
  <WindowCity p={[0, 3.6, -9.6]} s={[9, 7.4]} /><Glow p={[0, 3.2, -8.4]} r={6.5} color="rgba(255,200,120,1)" o={0.55} />
  <Shaft p={[0, 4, -5]} s={[4.4, 11]} rot={[0.5, 0, 0]} color="255,214,140" o={0.2} />
  <Sign p={[0, 6.7, -7.85]} s={[6.6, 1.2]} text="WASHINGTON D.C." bg="#0f3b52" fg="#ffffff" size={92} />
  <Sign p={[-6.4, 5.4, -7.85]} s={[2.2, 1.2]} text="METRO" bg="#c8202f" fg="#fff" size={80} /><Sign p={[6.4, 5.4, -7.85]} s={[2.2, 1.2]} text="AUSGANG" bg="#168a4a" fg="#fff" size={60} />
  <Clock p={[3.9, 5.6, -7.85]} r={0.7} t={t} speed={1} />
  {[-4.6, 4.6].map((x) => <React.Fragment key={x}><Cyl p={[x, 4.5, -4.8]} rt={0.5} h={9} color="#2a7f8d" /><Cyl p={[x, 0.25, -4.8]} rt={0.62} h={0.5} color="#ffc23a" /></React.Fragment>)}
  {[-6.5, 6.5].map((x) => <Box key={x} p={[x, 0.55, -5.6]} s={[0.35, 1.1, 1.0]} color="#9aa7b8" />)}
  {[-5.7, 5.7].map((x) => <Glow key={"g" + x} p={[x, 1.15, -5.6]} r={0.3} color="rgba(60,255,120,1)" o={0.8} />)}
  <Frame p={[-7.4, 3.2, -7.85]} s={[1.6, 2.2]} art={1} /><Frame p={[7.6, 3.4, -7.85]} s={[1.6, 2.2]} art={2} />
  <Bench p={[-6.9, 0, -2.6]} rotY={Math.PI / 2} /><Bench p={[6.9, 0, -1.2]} rotY={-Math.PI / 2} />
  <Bin p={[-7.8, 0, -5.0]} /><Bin p={[7.8, 0, -4.4]} color="#2f6fa8" /><Plant p={[-3.0, 0, -7.2]} s={1.3} /><Plant p={[3.0, 0, -7.2]} s={1.3} />
  <Cabinet p={[-8.3, 0, 1.4]} color="#e2a43a" w={1.3} /><Lamp p={[-7.5, 0, 3.4]} h={3.2} color="#ffe9a8" /><Lamp p={[7.5, 0, 2.6]} h={3.2} color="#ffe9a8" />
  <Rug p={[0, 0.02, -6.4]} s={[7, 2.4]} a="#2a7f8d" b="#ffc23a" />
  <Box p={[0, 0.03, -3.4]} s={[18, 0.04, 0.35]} color="#ffd23a" line={1} />
  <Dust t={t} area={[7, 7, 5]} color="rgba(255,240,200,.9)" />
  {crowd1.map((c, i) => <Walker key={i} p0={c.p0} v={c.v} ts={c.ts} t={t} f={f} look={c.look} h={c.h} hold={c.hold} i={i} />)}
</>);

/* ============ S2  3.65 - 9.05  "Ein Mann in Jeans und Basecap stellt seinen Geigenkasten offen auf den Boden und beginnt zu spielen." ============ */
const K2: Key[] = [
  { t: 3.5, pos: [7.2, 2.0, 9.4], look: [2.4, 2.4, 0], fov: 60 },
  { t: 5.1, pos: [2.8, 1.3, 8.2], look: [0.1, 2.0, 0.3], fov: 56 },
  { t: 6.4, pos: [1.6, 2.4, 7.2], look: [0.7, 1.1, 0.9], fov: 54 },
  { t: 7.6, pos: [1.0, 3.1, 7.0], look: [0.2, 2.2, 0.4], fov: 52 },
  { t: 9.3, pos: [0.4, 3.4, 5.6], look: [-0.1, 3.0, 0], fov: 46 },
];
const H2 = 3.5, P0x = -0.3, CP: V3 = [1.3, 0, 1.2];
const X2 = (t: number) => lerp(6.6, P0x, seg(t, 3.65, 5.35, Easing.inOut(Easing.sin)));
export const S2 = ({ t, f }: Ctx) => {
  const x = X2(t), P: V3 = [x, 0, 0], moving = t < 5.4, dist = 6.9 * seg(t, 3.65, 5.35, Easing.inOut(Easing.sin));
  const cam = camAt(t, K2).pos;
  const crouch = seg(t, 5.6, 5.95, Easing.inOut(Easing.sin)) * (1 - seg(t, 6.9, 7.3, Easing.inOut(Easing.sin)));
  const lower = seg(t, 5.75, 6.3, Easing.inOut(Easing.sin)), open = seg(t, 6.5, 7.1, Easing.out(Easing.back(1.3)));
  const carrying = t < 6.3;
  const handC = hand(H2, [0.2, 0.3], 0, true, 0.1), floorLoc: V3 = [CP[0] - P0x, 0.18, CP[2]];
  const caseLoc: V3 = [lerp(handC[0], floorLoc[0], lower), lerp(handC[1] - 0.5, floorLoc[1], lower), lerp(handC[2], floorLoc[2], lower)];
  const take = seg(t, 7.0, 7.7, Easing.inOut(Easing.sin)), up = seg(t, 7.7, 8.5, Easing.inOut(Easing.sin));
  const inCase: V3 = [CP[0], 0.55, CP[2]], low = toWorld(P, hand(H2, [-0.2, 0.38], 0, false, 0.14), cam);
  return (<>
    <Cam t={t} keys={K2} />
    <Lights warm="#ffe0b8" />
    <Floor kind="tile" a="#d9c8a6" b="#cdbb98" unit={2.2} w={34} d={34} />
    <Box p={[0, 0.03, 2.6]} s={[22, 0.05, 0.55]} color="#f3c53a" line={1} />
    <WallDoor z={-6} W={30} kind="brick" a="#c79a63" b="#bd8f58" base="#6e4a2a" unit={1.2} />
    <SideWall x={-8} kind="brick" a="#c79a63" b="#bd8f58" unit={1.2} /><SideWall x={8} kind="brick" a="#c79a63" b="#bd8f58" unit={1.2} />
    <Box p={[-0.2, 4.5, -4.6]} s={[2.4, 9, 1.8]} color="#6f93a8" /><Sign p={[-0.2, 6.2, -3.66]} s={[1.9, 1.0]} text="B" bg="#1f4a66" fg="#ffd23a" size={110} />
    <Frame p={[-4.6, 3.4, -5.9]} s={[2.4, 3.2]} art={0} /><Frame p={[4.4, 3.2, -5.9]} s={[2.4, 3.2]} art={1} /><Frame p={[7.4, 3.6, -5.9]} s={[1.6, 2.2]} art={2} />
    <Bench p={[-5.4, 0, -4.2]} /><Bin p={[5.8, 0, -3.8]} /><Plant p={[-6.8, 0, -2.2]} s={1.3} /><Plant p={[6.6, 0, -1.2]} s={1.2} />
    <StreetSign p={[3.6, 0, -4.4]} a="AUSGANG" h={4.4} /><Lamp p={[-7.0, 0, 1.8]} h={3.2} color="#ffe9a8" />
    <Rug p={[0.4, 0.02, 0.6]} s={[6.4, 4.2]} a="#6f93a8" b="#ffd23a" />
    <Shaft p={[2.4, 4.5, -2]} s={[2.6, 10]} rot={[0, 0, 0.4]} color="255,214,150" o={0.2} /><Glow p={[P0x, 0.1, 0.2]} r={2.2} color="rgba(255,226,170,1)" o={0.28} />
    <Dust t={t} area={[6, 6, 4]} color="rgba(255,236,190,.9)" />
    {/* the case: carried -> set down -> opens */}
    {carrying ? <FaceGroup p={P}><Box p={caseLoc} s={[1.9, 0.9, 0.35]} color="#241a18" rot={[0, 0, 0.12]} /></FaceGroup> : <Case p={CP} open={open} rotY={0} />}
    {t >= 6.5 && t < 7.0 ? <Violin p={inCase} s={0.9} rot={[0, 0, Math.PI / 2]} /> : null}
    {t >= 7.0 && t < 7.7 ? <Violin p={[lerp(inCase[0], low[0], take), lerp(inCase[1], low[1], take), lerp(inCase[2], low[2], take)]} s={lerp(0.9, 0.875, take)} rot={[0, 0, lerp(Math.PI / 2, 1.25, take)]} /> : null}
    {t < 7.7 ? <Person p={P} h={H2} look={busker} f={f} pose={{ mood: t < 6.3 ? "deadpan" : "smile", walk: moving ? dist * WALK : undefined, speed: moving ? 1 : 0, flip: t < 6.5, squash: -0.3 * crouch, hunch: 0.7 * crouch,
      armR: carrying ? [0.2, 0.3] : t > 6.7 ? [0.4, 0.13] : undefined, armRK: carrying ? (moving ? 1 : 0.8) : seg(t, 6.6, 6.9), lookX: t < 5.35 ? -1 : t < 6.4 ? 0.3 : 0 }} />
      : <Player P={P} h={H2} look={busker} f={f} t={t} k={up} mood="smile" />}
    {t > 8.3 ? <Notes p={[P0x - 0.5, 3.2, 0.2]} t={t} /> : null}
  </>);
};

/* ============ S3  9.05 - 13.6  "Bach. Fast eine Dreiviertelstunde lang. Über tausend Menschen laufen vorbei." ============ */
const K3: Key[] = [
  { t: 8.9, pos: [-6.2, 2.6, 8.8], look: [-1.0, 2.9, 0], fov: 58 },
  { t: 11.2, pos: [-1.6, 3.1, 9.4], look: [1.0, 3.0, 0], fov: 54 },
  { t: 13.8, pos: [2.6, 3.4, 9.0], look: [1.2, 3.1, 0], fov: 52 },
];
const crowd3 = Array.from({ length: 22 }, (_, i) => ({ x0: rnd(i) * 30, dir: i % 4 === 0 ? 1 : -1, v: 2.3 + rnd(i, 3) * 1.3, z: [-2.8, -1.8, 3.4, 4.4][i % 4], look: crowd[(i + 3) % 8], h: 3.1 + rnd(i, 4) * 0.5, hold: i % 3 === 1 }));
export const S3 = ({ t, f }: Ctx) => {
  const prog = seg(t, 10.1, 11.0, Easing.inOut(Easing.cubic)), cnt = Math.round(1000 * seg(t, 11.6, 13.4, Easing.inOut(Easing.quad)));
  return (<>
    <Cam t={t} keys={K3} />
    <Lights warm="#d6e8ff" />
    <Floor kind="tile" a="#8fa3b6" b="#8398ad" unit={1.8} w={40} d={30} />
    <WallDoor z={-6.5} W={44} kind="brick" a="#2f5f92" b="#2a5687" base="#13304f" unit={1.1} />
    <Surface p={[0, 9, 0]} s={[44, 30]} rot={[Math.PI / 2, 0, 0]} kind="plain" a="#27456a" b="#27456a" />
    {[-13, -7, 5, 11, 17].map((x) => <React.Fragment key={x}><Cyl p={[x, 4.5, -5.6]} rt={0.5} h={9} color="#4f7fb5" /><Cyl p={[x, 0.25, -5.6]} rt={0.62} h={0.5} color="#ffc23a" /></React.Fragment>)}
    {/* wall clock does 3/4 of a turn on "Dreiviertelstunde", people counter runs on "tausend" */}
    <Clock p={[-0.2, 6.5, -6.35]} r={0.95} t={0.5 + prog * 1.31} speed={1} />
    <CanvasPlane p={[3.0, 6.3, -6.35]} s={[4.6, 1.9]} px={[460, 190]} frame="#0b0d1a" draw={(c, W, H) => { c.fillStyle = "#07121e"; c.fillRect(0, 0, W, H); c.fillStyle = "#7fe8ff"; c.font = "800 38px Inter, Arial"; c.textAlign = "center"; c.fillText("VORBEIGEGANGEN", W / 2, 46); c.fillStyle = "#ffd23a"; c.font = "900 104px Inter, Arial"; c.fillText(cnt >= 1000 ? "1.000+" : String(cnt), W / 2, 142); }} />
    <Glow p={[3.0, 6.3, -6.0]} r={3.2} color="rgba(60,200,255,1)" o={0.22} />
    <Sign p={[-5.4, 5.8, -6.35]} s={[3.4, 1.0]} text="BACH — LIVE" bg="#7a1d2e" fg="#ffe9a8" size={70} />
    <Frame p={[7.6, 4.2, -6.35]} s={[2.2, 3.0]} art={2} /><Frame p={[-9.6, 4.2, -6.35]} s={[2.2, 3.0]} art={0} /><Frame p={[13, 4, -6.35]} s={[2.4, 3.2]} art={1} />
    <Bench p={[-3.4, 0, -5.0]} /><Bin p={[6.6, 0, -5.2]} color="#2f6fa8" /><Plant p={[-8, 0, -5.4]} s={1.3} /><Plant p={[9.6, 0, -5.2]} s={1.3} /><Cabinet p={[-11, 0, -5.4]} w={1.4} color="#e2a43a" /><Lamp p={[4.4, 0, -4.6]} h={3.4} color="#cde8ff" />
    <Box p={[0, 0.03, 1.8]} s={[40, 0.05, 0.4]} color="#ffd23a" line={1} />
    <Shaft p={[1.0, 4.5, -2]} s={[2.4, 10]} rot={[0, 0, -0.35]} color="190,225,255" o={0.16} /><Dust t={t} area={[8, 6, 4]} color="rgba(210,235,255,.9)" />
    {crowd3.map((c, i) => { const xx = (((c.x0 + c.dir * c.v * (t - 9)) % 30) + 30) % 30 - 15; return <WalkerAt key={i} x={xx} c={c} t={t} f={f} i={i} />; })}
    <Player P={[1.2, 0, 0.4]} h={3.5} look={busker} f={f} t={t} mood="smile" />
    <Case p={[2.9, 0, 1.3]} open={1} rotY={-0.2} coins={[[-0.4, 0.05], [0.5, -0.1]]} />
    <Notes p={[0.7, 3.3, 0.6]} t={t} />
  </>);
};
const WalkerAt: React.FC<{ x: number; c: { dir: number; v: number; z: number; look: any; h: number; hold: boolean }; t: number; f: number; i: number }> = ({ x, c, t, f, i }) => {
  const P: V3 = [x, 0, c.z], flip = c.dir < 0;
  return (<>
    <Person p={P} h={c.h} look={c.look} f={f + i * 7} pose={{ walk: (x + 30) * WALK, speed: 1, flip, mood: "deadpan", armR: c.hold ? [0.24, 0.5] : undefined, armRK: c.hold ? 1 : 0 }} />
    {c.hold ? <FaceGroup p={P}><Box p={hand(c.h, [0.2, 0.55], 0, flip, 0.12)} s={[0.14, 0.26, 0.04]} color="#1b1b2a" line={1} /></FaceGroup> : null}
  </>);
};

/* ============ S4  13.6 - 15.45  "Sieben bleiben eine Minute stehen." (high angle, only 7 stop) ============ */
const K4: Key[] = [
  { t: 13.4, pos: [3.5, 12.5, 7.5], look: [0, 0.6, 0.2], fov: 50 },
  { t: 15.7, pos: [1.2, 9.2, 8.2], look: [0, 1.0, 0.2], fov: 46 },
];
const stop7 = Array.from({ length: 7 }, (_, j) => { const a = -0.9 + j * 0.3, side = j % 2 ? 1 : -1; return { sx: side * (7 + j), tx: Math.sin(a) * 3.0 - 0.2, tz: 0.9 + Math.cos(a) * 1.7 - 1.0 + (j % 3) * 0.35, t0: 13.0 + j * 0.05, ta: 13.9 + j * 0.17, look: crowd[j % 8] }; });
export const S4 = ({ t, f }: Ctx) => {
  const ring = seg(t, 14.4, 15.4, Easing.linear);
  return (<>
    <Cam t={t} keys={K4} />
    <Lights warm="#fff0d0" />
    <Floor kind="tile" a="#b9c3d1" b="#aab5c5" unit={1.6} w={34} d={30} />
    <Box p={[0, 0.03, 4.6]} s={[34, 0.05, 0.7]} color="#ffcf2e" line={1} />
    <WallDoor z={-8} W={34} kind="brick" a="#8a4fb0" b="#7f46a4" base="#3a1f52" unit={1.1} />
    {/* track pit with rails behind a platform edge */}
    <Box p={[0, -0.5, -4.8]} s={[34, 1.0, 4.6]} color="#15151e" />{[-5.5, -4.1].map((z) => <Box key={z} p={[0, 0.03, z]} s={[34, 0.06, 0.12]} color="#c9ced6" line={1} />)}
    <Box p={[0, 0.02, -2.2]} s={[34, 0.06, 0.3]} color="#ffcf2e" line={1} />
    {[-6, 6].map((x) => <Cyl key={x} p={[x, 4.5, -7.0]} rt={0.45} h={9} color="#a266d0" />)}
    <Sign p={[0, 5.5, -7.9]} s={[5.4, 1.1]} text="BAHNSTEIG 2" bg="#2b1d44" fg="#ffd23a" size={78} /><Bench p={[-7.2, 0, 2.6]} rotY={Math.PI / 2} /><Bin p={[7.6, 0, 2.2]} /><Plant p={[-8.5, 0, -1.6]} s={1.2} /><Plant p={[8.5, 0, -1.8]} s={1.2} />
    <Lamp p={[-7.8, 0, 6]} h={3.2} color="#ffe9a8" /><Frame p={[-3.6, 3.4, -7.9]} s={[2, 2.8]} art={1} /><Frame p={[3.8, 3.4, -7.9]} s={[2, 2.8]} art={0} />
    {/* timer ring on the floor: one minute fills on "Minute" */}
    <CanvasPlane p={[-0.2, 0.05, 0.9]} rot={[-Math.PI / 2, 0, 0]} s={[8, 8]} px={[512, 512]} draw={(c, W, H) => { c.clearRect(0, 0, W, H); const k = ring; if (k <= 0) return; c.lineCap = "round"; c.strokeStyle = INK; c.lineWidth = 34; c.beginPath(); c.arc(W / 2, H / 2, 214, -Math.PI / 2, -Math.PI / 2 + k * Math.PI * 2); c.stroke(); c.strokeStyle = "#ffd23a"; c.lineWidth = 22; c.stroke(); }} />
    <Dust t={t} area={[6, 6, 4]} color="rgba(255,240,200,.9)" />
    {/* regular flow keeps walking past */}
    {Array.from({ length: 9 }, (_, i) => <Walker key={i} p0={[i % 2 ? -9 : 9, 0, 3.8 + (i % 3) * 0.7] as V3} v={[(i % 2 ? 1 : -1) * (2.4 + rnd(i) * 1.2), 0, 0] as V3} ts={12.6 + i * 0.35} t={t} f={f} look={crowd[(i + 2) % 8]} h={3.2} hold={i % 2 === 0} i={i} />)}
    <Player P={[-0.2, 0, -0.9]} h={3.5} look={busker} f={f} t={t} mood="smile" />
    <Case p={[1.5, 0, 0.3]} open={1} rotY={-0.15} coins={[[-0.4, 0.05]]} /><Notes p={[-0.6, 3.3, -0.4]} t={t} />
    {stop7.map((s, j) => {
      const k = seg(t, s.t0, s.ta, Easing.out(Easing.quad)), px = lerp(s.sx, s.tx, k), pz = lerp(3.6, s.tz, k), P: V3 = [px, 0, pz];
      const dist = Math.abs(s.sx - px) + Math.abs(3.6 - pz), stopped = t >= s.ta, pop = seg(t, s.ta, s.ta + 0.22, Easing.out(Easing.back(3)));
      return (<React.Fragment key={j}>
        <Person p={P} h={3.2} look={s.look} f={f + j * 5} pose={{ walk: stopped ? undefined : dist * WALK, speed: stopped ? 0 : 1 - k * 0.5, flip: s.sx > 0, mood: stopped ? "smile" : "deadpan", lookX: stopped ? (px > -0.2 ? -1 : 1) : 0, squash: stopped ? -0.05 * Math.exp(-(t - s.ta) * 6) : 0 }} />
        {stopped ? <FaceGroup p={[px, 3.7, pz]}><CanvasPlane p={[0, 0.3 * pop, 0.1]} s={[0.8 * pop + 0.001, 0.8 * pop + 0.001]} px={[128, 128]} draw={(c, W, H) => { c.clearRect(0, 0, W, H); c.fillStyle = "#ffd23a"; c.strokeStyle = INK; c.lineWidth = 10; c.beginPath(); c.arc(W / 2, H / 2, 54, 0, 7); c.fill(); c.stroke(); c.fillStyle = INK; c.font = "900 80px Inter, Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(String(j + 1), W / 2, H / 2 + 4); }} /></FaceGroup> : null}
      </React.Fragment>);
    })}
  </>);
};

/* ============ S5  15.45 - 22.1  "Zusammen kommen 32 Dollar in den Kasten, dazu ein Zwanziger von einer einzigen Frau, die ihn erkennt." ============ */
const CP5: V3 = [0.9, 0, 0.9], MP5: V3 = [-0.8, 0, -0.5];
const K5: Key[] = [
  { t: 15.3, pos: [2.2, 1.9, 10.6], look: [-0.1, 1.5, 0.6], fov: 52 },
  { t: 17.8, pos: [1.8, 2.0, 10.6], look: [0.5, 1.5, 0.8], fov: 50 },
  { t: 19.2, pos: [3.6, 2.6, 10.4], look: [2.4, 1.9, 1.2], fov: 50 },
  { t: 20.8, pos: [2.8, 3.1, 9.2], look: [2.9, 2.9, 1.4], fov: 44 },
  { t: 22.3, pos: [2.9, 3.2, 7.4], look: [2.9, 3.0, 1.4], fov: 38 },
];
const COIN = [{ L: 15.75, v: 1, dx: -0.6 }, { L: 15.98, v: 5, dx: 0.5 }, { L: 16.2, v: 1, dx: 0.1 }, { L: 16.42, v: 10, dx: -0.3 }, { L: 16.65, v: 5, dx: 0.4 }, { L: 16.9, v: 10, dx: 0.0 }];
const TF = 0.55, G = 18;
export const S5 = ({ t, f }: Ctx) => {
  const landed = COIN.filter((c) => t >= c.L), total = landed.reduce((s, c) => s + c.v, 0);
  const billT = 19.1, billLand = 20.3, bk = clamp((t - billT) / (billLand - billT));
  const wx = lerp(6.5, 2.9, seg(t, 18.3, 19.0, Easing.inOut(Easing.sin))), wMove = t > 18.3 && t < 19.0, recog = t > 21.3;
  const jump = t > 21.45 ? Math.exp(-(t - 21.45) * 7) : 0, wAnt = seg(t, 21.2, 21.4) * (1 - seg(t, 21.4, 21.5));
  return (<>
    <Cam t={t} keys={K5} />
    <Lights warm="#ffe0b0" />
    <Floor kind="tile" a="#d2c3a4" b="#c6b793" unit={2.0} w={34} d={30} />
    <WallDoor z={-6} W={30} kind="brick" a="#b8744a" b="#ad6a42" base="#5a3320" unit={1.2} />
    <SideWall x={-7} kind="brick" a="#b8744a" b="#ad6a42" unit={1.2} />
    <Cyl p={[-3.4, 4.5, -4.4]} rt={0.55} h={9} color="#6f93a8" /><Cyl p={[4.2, 4.5, -4.6]} rt={0.55} h={9} color="#6f93a8" /><Frame p={[0.4, 3.6, -5.9]} s={[2.4, 3.0]} art={1} /><Frame p={[-5.0, 3.4, -5.9]} s={[1.8, 2.4]} art={0} />
    <Bench p={[-4.8, 0, -3.2]} /><Bin p={[5.8, 0, -3.8]} /><Plant p={[6.8, 0, -1.0]} s={1.2} /><Lamp p={[-6.0, 0, 0.8]} h={3.2} color="#ffe9a8" /><Rug p={[0.5, 0.02, 0.4]} s={[6, 3.6]} a="#6f93a8" b="#ffd23a" /><Cabinet p={[-6.4, 0, -4.8]} w={1.3} color="#e2a43a" /><Shelf p={[5.8, 0, -5.6]} w={2.2} rows={3} seed={4} wood="#5a3320" />
    <Shaft p={[0.8, 4.5, -2]} s={[2.4, 10]} rot={[0, 0, 0.35]} color="255,214,150" o={0.2} /><Dust t={t} area={[5, 5, 4]} color="rgba(255,236,190,.9)" />
    <Glow p={[CP5[0], 0.6, CP5[2]]} r={1.6} color="rgba(255,210,120,1)" o={0.3} />
    {/* chalk tally board in the world */}
    <Box p={[-2.2, 0.9, 0.3]} s={[1.5, 1.2, 0.1]} color="#1d3a2a" /><Box p={[-2.6, 0.3, 0.3]} s={[0.1, 0.6, 0.1]} color="#5a3320" line={2} /><Box p={[-1.8, 0.3, 0.3]} s={[0.1, 0.6, 0.1]} color="#5a3320" line={2} />
    <CanvasPlane p={[-2.2, 0.92, 0.37]} s={[1.3, 1.0]} px={[260, 200]} draw={(c, W, H) => { c.fillStyle = "#1d3a2a"; c.fillRect(0, 0, W, H); c.fillStyle = "#e9f5ea"; c.font = "800 34px Inter, Arial"; c.textAlign = "center"; c.fillText("SPENDEN", W / 2, 46); c.font = "900 96px Inter, Arial"; c.fillStyle = "#ffd23a"; c.fillText("$" + (total + (t >= billLand ? 20 : 0)), W / 2, 142); }} />
    <Player P={MP5} h={3.5} look={busker} f={f} t={t} mood="smile" /><Notes p={[-1.2, 3.3, -0.2]} t={t} n={4} />
    <Case p={CP5} open={1} rotY={-0.1} coins={landed.map((c, i) => [c.dx * 0.6 + (i % 2) * 0.05, (i % 3) * 0.12 - 0.12] as [number, number])} />
    {/* coin tossers pass in front and flick coins into the case on a real parabola */}
    {COIN.map((c, i) => {
      const dir = i % 2 ? 1 : -1, tr = c.L - TF, xr = CP5[0] + c.dx - dir * 1.4, spd = 2.6, ts = tr - 2.2, x0 = xr - dir * spd * 2.2;
      const P: V3 = [x0 + dir * spd * (t - ts), 0, 1.9], swing = seg(t, tr - 0.25, tr, Easing.out(Easing.quad)) * (1 - seg(t, tr + 0.05, tr + 0.35));
      const rel: V3 = [x0 + dir * spd * (tr - ts), 1.7, 1.9], tgt: V3 = [CP5[0] + c.dx * 0.6, 0.4, CP5[2]];
      const v: V3 = [(tgt[0] - rel[0]) / TF, (tgt[1] - rel[1] + 0.5 * G * TF * TF) / TF, (tgt[2] - rel[2]) / TF], dt = t - tr, fl = clamp(dt, 0, TF);
      return (<React.Fragment key={i}>
        {t > ts && t < tr + 3 ? <Person p={P} h={3.3} look={crowd[(i * 3 + 1) % 8]} f={f + i * 9} pose={{ walk: spd * (t - ts) * WALK, speed: 1, flip: dir < 0, mood: "smile", armR: [0.35, 0.58], armRK: swing }} /> : null}
        {dt > 0 && dt < TF ? <Cyl p={[rel[0] + v[0] * fl, rel[1] + v[1] * fl - 0.5 * G * fl * fl, rel[2] + v[2] * fl]} rt={0.14} h={0.04} color="#ffcf3f" line={1} rot={[t * 14, 0, t * 5]} /> : null}
      </React.Fragment>);
    })}
    {/* the woman and the twenty */}
    {t > 18.2 ? <Person p={[wx + jump * 0.5, 0, 1.6]} h={3.5} look={woman} f={f + 40} pose={{ walk: wMove ? (6.5 - wx) * WALK : undefined, speed: wMove ? 1 : 0, flip: true, mood: recog ? "shock" : t > 19.2 ? "smile" : "deadpan", lookX: wMove ? 0 : -1,
      armR: t > 18.9 && t < 19.4 ? [-0.3, 0.42] : undefined, armRK: seg(t, 18.9, 19.1) * (1 - seg(t, 19.2, 19.4)), arms: recog ? "head" : undefined, armK: seg(t, 21.35, 21.55), squash: -0.18 * wAnt + 0.1 * jump, air: jump > 0.2 ? 1 : 0, nerv: recog ? 0.3 : 0, sweat: 0 }} /> : null}
    {t >= billT && t < billLand + 0.4 ? (() => { const bx = lerp(wx - 1.1, CP5[0] + 0.1, Easing.inOut(Easing.sin)(bk)) + Math.sin(bk * 9) * 0.35 * (1 - bk), by = lerp(1.6, 0.42, bk * bk), flat = bk > 0.98;
      return <group position={[bx, by, lerp(1.8, CP5[2], bk)]} rotation={[flat ? 0 : Math.sin(bk * 8) * 0.9, bk * 6, flat ? 0 : Math.cos(bk * 7) * 0.5]}><Box p={[0, 0, 0]} s={[0.95, 0.02, 0.45]} color="#7bc47f" line={2} /><CanvasPlane p={[0, 0.013, 0]} rot={[-Math.PI / 2, 0, 0]} s={[0.9, 0.4]} px={[180, 80]} draw={(c, W, H) => { c.fillStyle = "#7bc47f"; c.fillRect(0, 0, W, H); c.fillStyle = "#1d5a2a"; c.font = "900 56px Inter, Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("$20", W / 2, H / 2); }} /></group>; })() : null}
    {t >= billLand + 0.4 ? <group position={[CP5[0] + 0.1, 0.42, CP5[2]]}><Box p={[0, 0, 0]} s={[0.95, 0.02, 0.45]} color="#7bc47f" line={2} /></group> : null}
    {recog ? <FaceGroup p={[wx + jump * 0.5, 4.3, 1.6]}><Glow p={[0, 0, 0]} r={0.1} color="rgba(255,255,255,1)" o={0} /><CanvasPlane p={[0.6, 0.2, 0.2]} s={[0.9 * seg(t, 21.45, 21.7, Easing.out(Easing.back(3))) + 0.001, 0.9 * seg(t, 21.45, 21.7, Easing.out(Easing.back(3))) + 0.001]} px={[128, 128]} draw={(c, W, H) => { c.clearRect(0, 0, W, H); c.font = "900 120px Inter, Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.lineWidth = 16; c.strokeStyle = INK; c.strokeText("!", W / 2, H / 2); c.fillStyle = "#ffd23a"; c.fillText("!", W / 2, H / 2); }} /></FaceGroup> : null}
  </>);
};
void Ball; void Mug; void Violin; void Person;
