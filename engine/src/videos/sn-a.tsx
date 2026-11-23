// Clip 1 "Sonntag, 21:40 Uhr" - 16 scenes locked to timeline.json / words.json (public/sonntag).
import React from "react";
import { Easing } from "remotion";
import { Calendar, ChartScreen, Clock, Lights } from "../style/kit";
import { Cam, Key } from "../style/extra";
import { Ctx, P, Person, Box, Cyl, Ball, CanvasPlane, INK, Sign, FaceGroup, hand, Floor, WallDoor, SideWall, Glow, Plant, Frame, WindowCity, Lamp, Rug, Dust, Living, Flat, Street, Phone, Poster, drawText, StaticClock, InfoCard, jonas, emre, opa, frau, chef, crowd, seg, lerp, clamp, wordAt, W, V3, talkTilt } from "./sn-common";
import words from "../../public/sonntag/words.json";
import script from "../../public/sonntag/script.json";
import TL from "../../public/sonntag/timeline.json";

const wt = wordAt(words as W[], script as string[]);
export const L = TL as { speaker: string; start: number; end: number; tok0: number; tok1: number }[];
const speaking = (t: number, i: number) => t >= L[i - 1].start && t <= L[i - 1].end;
export const labelAt = (t: number) => { const l = L.find((x) => t >= x.start - 0.05 && t <= x.end + 0.1); return l ? l.speaker : undefined; };
const sit = (x: number): V3 => [x, -0.25, -4.15];

/* ===== 1: title card + Jonas on the sofa staring at the ceiling ===== */
const K1: Key[] = [{ t: 0, pos: [-0.8, 7.2, 9.2], look: [-1.8, 1.4, -4.2], fov: 54 }, { t: 3.4, pos: [-1.4, 3.4, 6.6], look: [-1.9, 1.5, -4.2], fov: 54 }];
export const S1 = ({ t, f }: Ctx) => (<>
  <Cam t={t} keys={K1} /><Living t={t} />
  <group position={[-3.55, 1.35, -3.1]} rotation={[0, 0, -1.42]}><Person p={[0, 0, 0]} h={3.4} look={jonas} f={f} shadow={false} pose={{ mood: "deadpan", arms: "head", armK: 0.9, squash: 0.012 * Math.sin(t * 2.1), hunch: 0.2 }} /></group>
  <Glow p={[-1.6, 1.0, -4.0]} r={3.2} color="rgba(120,100,230,1)" o={0.16} />
</>);

/* ===== 2: L1 Jonas rants; the pictures pop in on Stau / Montagsmeeting / Folie ===== */
const K2: Key[] = [{ t: 3.1, pos: [0.6, 3.4, 9.6], look: [-0.4, 3.0, -4.2], fov: 54 }, { t: 7.0, pos: [0.2, 3.2, 8.2], look: [-0.2, 3.3, -4.2], fov: 52 }, { t: 10.8, pos: [-0.4, 3.1, 6.8], look: [-0.9, 3.2, -4.2], fov: 50 }];
export const S2 = ({ t, f }: Ctx) => {
  const stau = seg(t, wt("Stau"), wt("Stau") + 0.35, Easing.out(Easing.back(2.2))), meet = seg(t, wt("Montagsmeeting"), wt("Montagsmeeting") + 0.35, Easing.out(Easing.back(2.2))), fol = seg(t, wt("Folie"), wt("Folie") + 0.35, Easing.out(Easing.back(2.2)));
  return (<>
    <Cam t={t} keys={K2} /><Living t={t} />
    <Person p={sit(-1.5)} h={3.7} look={jonas} f={f} pose={{ mood: "worry", armR: [0.2, 0.7], armRK: 1, hunch: 0.5, sweat: 0.3, tilt: talkTilt(t, speaking(t, 1)), squash: 0.01 * Math.sin(t * 2.4) }} />
    <FaceGroup p={sit(-1.5)}><Box p={hand(3.7, [0.2, 0.7], 0, false, 0.24)} s={[0.16, 0.36, 0.05]} color="#1b1b2a" line={2} rot={[0, 0, -0.15]} /></FaceGroup>
    {/* three wall pictures, one per complaint */}
    <Poster p={[-3.6, 5.7, -3.0]} s={[2.0, 1.4]} k={stau} draw={(c, W, H) => { c.fillStyle = P.V3; c.fillRect(0, 0, W, H); c.fillStyle = P.K4; c.fillRect(0, H * 0.62, W, H * 0.38); for (let i = 0; i < 4; i++) { c.fillStyle = [P.C2, P.Y2, P.T2, P.C3][i]; c.fillRect(20 + i * 98, H * 0.42, 84, H * 0.26); c.fillStyle = INK; c.fillRect(30 + i * 98, H * 0.62, 18, 14); c.fillRect(70 + i * 98, H * 0.62, 18, 14); c.fillStyle = P.C1; c.fillRect(20 + i * 98 + 70, H * 0.5, 10, 10); } c.fillStyle = P.K1; c.font = "800 44px Inter, Arial"; c.textAlign = "center"; c.fillText("STAU", W / 2, 54); }} />
    <Poster p={[-0.9, 6.0, -3.0]} s={[2.0, 1.4]} k={meet} draw={(c, W, H) => { c.fillStyle = P.K1; c.fillRect(0, 0, W, H); c.fillStyle = P.V3; c.fillRect(0, 0, W, 46); c.fillStyle = P.K1; c.font = "800 30px Inter, Arial"; c.textAlign = "center"; c.fillText("MONTAG 9:00", W / 2, 33); for (let i = 0; i < 5; i++) { c.fillStyle = [P.C2, P.T2, P.Y2, P.V2, P.C3][i]; c.beginPath(); c.arc(50 + i * 75, H * 0.66, 26, 0, 7); c.fill(); c.strokeStyle = INK; c.lineWidth = 4; c.stroke(); } }} />
    <Poster p={[2.0, 5.7, -3.0]} s={[2.0, 1.4]} k={fol} draw={(c, W, H) => { c.fillStyle = P.K1; c.fillRect(0, 0, W, H); for (const [x, ttl] of [[10, "WOCHE 1"], [210, "WOCHE 2"]] as [number, string][]) { c.fillStyle = P.K2; c.fillRect(x, 12, 180, H - 24); c.strokeStyle = INK; c.lineWidth = 4; c.strokeRect(x, 12, 180, H - 24); c.fillStyle = INK; c.font = "800 24px Inter, Arial"; c.textAlign = "center"; c.fillText(ttl, x + 90, 44); c.fillStyle = P.T2; c.fillRect(x + 20, 62, 140, 70); c.fillStyle = P.C3; c.fillRect(x + 20, 144, 90, 12); c.fillRect(x + 20, 164, 120, 12); } c.fillStyle = P.C3; c.font = "800 60px Inter, Arial"; c.fillText("=", W / 2, H / 2); }} />
    <Glow p={[-0.5, 5.3, -3.2]} r={4.2} color="rgba(169,162,230,1)" o={0.14 * Math.max(stau, meet)} />
  </>);
};

/* ===== 3: L2 Emre: "klingst wie ich vor einem Jahr" - he points at his old self ===== */
const K3: Key[] = [{ t: 10.5, pos: [0.4, 3.0, 9.4], look: [0, 2.6, -4], fov: 54 }, { t: 13.4, pos: [0.0, 2.9, 8.0], look: [-0.2, 2.6, -4], fov: 52 }];
export const S3 = ({ t, f }: Ctx) => {
  const past = seg(t, 11.0, 11.5, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K3} /><Flat t={t} />
    <Person p={[1.4, 0, -3.6]} h={3.8} look={emre} f={f} pose={{ mood: "smile", armR: [-0.1, 0.55], armRK: 1, armL: [-0.55, 0.6], armLK: past, tilt: talkTilt(t, speaking(t, 2), 0.02) + 0.03, squash: 0.012 * Math.sin(t * 2.2) }} />
    {/* "vor einem Jahr": a framed memory of the tired old self */}
    <group position={[-2.6, 0, -4.4]} scale={past + 0.001}>
      <Box p={[0, 2.2, -0.2]} s={[2.6, 3.6, 0.2]} color={P.K1} line={4} /><Box p={[0, 2.2, -0.08]} s={[2.2, 3.2, 0.06]} color={P.V3} />
      <Person p={[0, 0.5, 0.1]} h={2.8} look={{ ...jonas, body: P.K4, sleeve: P.K4, stubble: true }} f={f} pose={{ mood: "deadpan", hunch: 1, arms: "chest", armK: 0.7, sweat: 0.2 }} />
      <Poster p={[0, 4.4, 0]} s={[2.4, 0.7]} k={past} draw={drawText("vor 1 Jahr", P.Y2, INK, 78)} />
    </group>
  </>);
};

/* ===== 4: L3 Jonas imagines Emre rich ===== */
const K4: Key[] = [{ t: 13.1, pos: [0.4, 3.6, 9.2], look: [-0.3, 3.6, -4], fov: 54 }, { t: 16.7, pos: [0.3, 3.5, 8.0], look: [0.0, 3.8, -4], fov: 52 }];
export const S4 = ({ t, f }: Ctx) => {
  const b = seg(t, 13.5, 14.1, Easing.out(Easing.back(2.2)));
  return (<>
    <Cam t={t} keys={K4} /><Living t={t} />
    <Person p={sit(-2.2)} h={3.7} look={jonas} f={f} pose={{ mood: "worry", arms: "chest", armK: 0.9, hunch: 0.6, tilt: talkTilt(t, speaking(t, 3)), lookX: 1 }} />
    <group position={[1.5, 5.3, -3.4]} scale={(b + 0.001) * 0.78}>
      {[[-1.2, 0.4, 0.9], [1.3, 0.5, 1.0], [0, 1.15, 1.2], [0.2, -0.45, 1.1], [-1.5, -0.3, 0.7], [1.7, -0.2, 0.7]].map(([x, y, r], i) => <Ball key={i} p={[x, y, 0]} r={r} color="#fffaf0" ink={0.04} />)}
      <Person p={[0, -0.9, 1.6]} h={2.5} look={{ ...emre, glasses: true }} f={f} pose={{ mood: "grin", arms: "up", armK: 0.8 + 0.2 * Math.sin(t * 5), squash: 0.03 * Math.sin(t * 6) }} />
      {[-1.5, 1.5].map((x, i) => <group key={x} position={[x * 1.1, -0.9, 1.7]}>{Array.from({ length: 5 + i * 2 }, (_, k) => <Cyl key={k} p={[0, 0.07 + k * 0.1, 0]} rt={0.38} h={0.08} color={P.Y2} line={1} />)}</group>)}
    </group>
    {[0, 1, 2].map((i) => { const u = (t * 0.5 + i / 3) % 1; return <Poster key={i} p={[-0.2 + i * 1.4, 5.2 + u * 1.6, -3.0]} s={[0.7, 0.7]} k={b * (1 - u)} draw={drawText("€", P.Y2, INK, 130)} />; })}
    <Glow p={[1.4, 4.8, -3.3]} r={3.4} color="rgba(242,184,75,1)" o={0.18 * b} />
  </>);
};

/* ===== 5: L4 Emre: income chart, first three weeks nearly nothing ===== */
const K5: Key[] = [{ t: 16.3, pos: [0.0, 3.2, 9.8], look: [0, 3.0, -4.4], fov: 56 }, { t: 20.0, pos: [0.4, 3.1, 8.2], look: [0.2, 3.1, -4.4], fov: 52 }, { t: 23.2, pos: [0.4, 3.0, 7.6], look: [0.0, 2.8, -4.4], fov: 50 }];
export const S5 = ({ t, f }: Ctx) => {
  const grow = seg(t, 16.9, 19.0, Easing.inOut(Easing.cubic)), mark = seg(t, wt("ersten", 34), wt("ersten", 34) + 0.4, Easing.out(Easing.back(2)));
  const hs = [0.06, 0.1, 0.14, 0.55, 0.85, 1.2, 1.55, 1.95, 2.35];
  return (<>
    <Cam t={t} keys={K5} /><Flat t={t} />
    <Box p={[0, 3.4, -5.9]} s={[6.4, 4.6, 0.2]} color={P.K1} line={4} />
    <Poster p={[0, 5.2, -5.7]} s={[5.4, 0.7]} k={1} draw={drawText("EINKOMMEN PRO WOCHE", P.K1, INK, 50)} />
    {hs.map((h, i) => <Box key={i} p={[-2.5 + i * 0.62, 1.3 + h * grow * 0.5, -5.7]} s={[0.46, Math.max(0.04, h * grow), 0.2]} color={i < 3 ? P.C3 : P.T2} line={2} />)}
    <Box p={[0, 1.27, -5.72]} s={[5.8, 0.05, 0.05]} color={INK} line={0} />
    <Poster p={[-1.5, 2.55, -5.5]} s={[2.1, 0.55]} k={mark} draw={drawText("fast nichts", P.C2, "#fff", 62)} />
    <Person p={[2.7, 0, -3.8]} h={3.8} look={emre} f={f} pose={{ mood: "smile", arms: mark > 0.5 ? "point" : "hold", armK: 0.8, tilt: talkTilt(t, speaking(t, 4), 0.02) - 0.02, squash: 0.012 * Math.sin(t * 2.2), flip: false }} />
  </>);
};

/* ===== 6: L5 Jonas: "Was?" shock ===== */
const K6: Key[] = [{ t: 22.9, pos: [-0.6, 3.3, 8.2], look: [-1.5, 3.2, -4.2], fov: 54 }, { t: 25.6, pos: [-1.2, 3.1, 5.6], look: [-1.7, 3.3, -4.2], fov: 48 }];
export const S6 = ({ t, f }: Ctx) => {
  const shock = seg(t, 23.0, 23.25, Easing.out(Easing.back(3))), drop = seg(t, 23.1, 23.9, Easing.in(Easing.quad));
  return (<>
    <Cam t={t} keys={K6} impacts={[[23.05, 0.02]]} /><Living t={t} />
    <Person p={sit(-1.7 - shock * 0.3)} h={3.8} look={jonas} f={f} pose={{ mood: "shock", arms: "head", armK: shock, air: shock * (1 - drop) * 0.3, squash: -0.1 * shock * (1 - drop), hunch: -0.2, tilt: -0.05 * shock, lookX: 0 }} />
    <FaceGroup p={[-1.6, 3.3 - drop * 2.5, -3.2]}><Box p={[0.4, 0, 0.2]} s={[0.16, 0.36, 0.05]} color="#1b1b2a" line={2} rot={[0, 0, drop * 2]} /></FaceGroup>
    <Poster p={[-0.4, 5.9, -3.0]} s={[1.3, 1.3]} k={seg(t, 23.2, 23.5, Easing.out(Easing.back(3)))} draw={drawText("?!", P.Y2, INK, 200)} />
  </>);
};

/* ===== 7: L6 flashback door ten: slammed in his face by a woman with a towel on her head ===== */
const K7: Key[] = [{ t: 25.4, pos: [-2.2, 2.8, 7.2], look: [-0.6, 2.2, -5.2], fov: 56 }, { t: 29.0, pos: [0.6, 2.8, 6.6], look: [0.1, 2.5, -5.4], fov: 52 }, { t: 33.2, pos: [0.9, 2.7, 5.6], look: [0.2, 2.4, -5.4], fov: 50 }, { t: 34.6, pos: [0.9, 2.7, 5.5], look: [0.2, 2.4, -5.4], fov: 50 }];
export const S7 = ({ t, f }: Ctx) => {
  const tFrau = wt("Frau", 54), tSlam = wt("zugeknallt", 54), tTow = wt("Handtuch", 54);
  const openK = seg(t, tFrau - 0.1, tFrau + 0.5) * (1 - seg(t, tSlam - 0.12, tSlam + 0.04, Easing.in(Easing.quad)));
  const walk = seg(t, 25.5, 28.4, Easing.inOut(Easing.sin)), x = lerp(-5.2, -0.4, walk), jerk = t > tSlam ? Math.exp(-(t - tSlam) * 6) : 0;
  const frauIn = t > tFrau - 0.1 && t < tSlam + 0.1;
  return (<>
    <Cam t={t} keys={K7} impacts={[[tSlam, 0.07]]} /><Street t={t} open={openK} num="10" />
    {frauIn ? <Person p={[0.2, 0, -5.55]} h={3.2} look={frau} f={f} pose={{ mood: "angry", arms: "point", armK: 0.6, squash: 0.02 * Math.sin(t * 9), tilt: 0.04 }} /> : null}
    <Person p={[x, 0, -4.2 - jerk * 0.2]} h={3.6} look={emre} f={f} pose={{ walk: walk < 1 && walk > 0 ? x * WALK2 : undefined, speed: walk > 0.02 && walk < 0.98 ? 1 : 0, mood: t > tSlam ? "shock" : "smile", arms: t > tFrau - 0.8 && t < tSlam ? "point" : undefined, armK: 0.7, squash: -0.07 * jerk, air: jerk * 0.15, flip: false, hunch: jerk * 0.5 }} />
    <Poster p={[0, 5.6, -4.3]} s={[1.6, 0.8]} k={seg(t, 26.2, 26.6, Easing.out(Easing.back(2)))} draw={drawText("TÜR 10", P.Y2, INK, 86)} />
    {t > tSlam && t < tSlam + 0.5 ? <Poster p={[1.0, 4.7, -4.0]} s={[1.4, 0.85]} k={seg(t, tSlam, tSlam + 0.12, Easing.out(Easing.back(3)))} draw={drawText("PENG!", P.C2, "#fff", 150)} /> : null}
    {void tTow}
  </>);
};
const WALK2 = 3.4;

/* ===== 8: L7 Jonas leans in: "Und trotzdem weitergemacht?" ===== */
const K8: Key[] = [{ t: 34.2, pos: [-0.8, 3.2, 7.4], look: [-1.6, 3.2, -4.2], fov: 52 }, { t: 36.6, pos: [-1.2, 3.1, 6.0], look: [-1.7, 3.3, -4.2], fov: 48 }];
export const S8 = ({ t, f }: Ctx) => (<>
  <Cam t={t} keys={K8} /><Living t={t} />
  <Person p={sit(-1.7)} h={3.8} look={jonas} f={f} pose={{ mood: "smile", arms: "chest", armK: 0.6, tilt: 0.1 + talkTilt(t, speaking(t, 7)), hunch: -0.3, lookX: 0 }} />
</>);

/* ===== 9a: L8 door 17: the retiree invites him in ===== */
const K9a: Key[] = [{ t: 36.3, pos: [-0.8, 2.8, 7.0], look: [-0.1, 2.5, -5.4], fov: 54 }, { t: 39.9, pos: [0.4, 2.8, 6.0], look: [0.2, 2.5, -5.4], fov: 50 }];
export const S9a = ({ t, f }: Ctx) => {
  const tRent = wt("Rentner", 82), tKomm = wt("Komm", 82), tZwei = wt("Zwei", 90);
  const openK = seg(t, tRent - 0.2, tRent + 0.4);
  const bub = seg(t, tKomm, tKomm + 0.3, Easing.out(Easing.back(2))) * (1 - seg(t, tZwei - 0.2, tZwei));
  return (<>
    <Cam t={t} keys={K9a} /><Street t={t} open={openK} num="17" />
    {openK > 0.05 ? <Person p={[0.25, 0, -5.55]} h={3.1} look={opa} f={f} pose={{ mood: "smile", arms: "point", armK: 0.6, tilt: talkTilt(t, t > tKomm, 0.04), squash: 0.015 * Math.sin(t * 5) }} /> : null}
    <Person p={[-1.7, 0, -4.2]} h={3.6} look={emre} f={f} pose={{ mood: "grin", arms: "hold", armK: 0.5, squash: 0.01 * Math.sin(t * 2.4) }} />
    <Poster p={[1.3, 4.9, -4.0]} s={[3.0, 1.2]} k={bub} draw={drawText("Komm rein, ich mach\ndir einen Tee.", P.K1, INK, 46)} />
    <Poster p={[0, 5.9, -4.3]} s={[1.7, 0.8]} k={seg(t, 36.6, 37.0, Easing.out(Easing.back(2)))} draw={drawText("TÜR 17", P.Y2, INK, 86)} />
  </>);
};

/* ===== 9b: L8 kitchen: two hours of talking, then the signature ===== */
const K9b: Key[] = [{ t: 39.7, pos: [0.0, 3.3, 8.6], look: [0, 2.4, -4.2], fov: 54 }, { t: 43.0, pos: [0.2, 3.2, 7.6], look: [0.1, 2.3, -4.2], fov: 50 }, { t: 45.9, pos: [0.0, 4.4, 6.4], look: [0.0, 1.6, -4.0], fov: 48 }];
export const S9b = ({ t, f }: Ctx) => {
  const tZwei = wt("Zwei", 90), tUnt = wt("unterschrieben", 90), sign = seg(t, tUnt - 0.2, tUnt + 0.5), tick = seg(t, tUnt + 0.3, tUnt + 0.55, Easing.out(Easing.back(3)));
  return (<>
    <Cam t={t} keys={K9b} /><Flat t={t} />
    <Box p={[0, 1.0, -3.6]} s={[4.4, 0.16, 2.0]} color={P.Y3} /><Cyl p={[-1.8, 0.5, -3.1]} rt={0.12} h={1.0} color={P.Y4} /><Cyl p={[1.8, 0.5, -3.1]} rt={0.12} h={1.0} color={P.Y4} />
    <Cyl p={[0.2, 1.3, -3.6]} rt={0.32} h={0.4} color="#fff" /><Ball p={[0.2, 1.75, -3.6]} r={0.18} color="#fff" ink={0.03} /><Cyl p={[-0.9, 1.2, -3.2]} rt={0.18} h={0.24} color={P.C2} /><Cyl p={[1.3, 1.2, -3.2]} rt={0.18} h={0.24} color={P.T2} />
    <Box p={[1.0, 1.1, -3.1]} s={[0.9, 0.03, 1.2]} color={P.K1} rot={[0, 0.2, 0]} line={2} />
    <Clock p={[-2.6, 5.4, -6.8]} r={0.9} t={t} speed={t > tZwei ? 14 : 1} />
    <Poster p={[1.4, 5.8, -6.7]} s={[2.2, 0.8]} k={seg(t, tZwei, tZwei + 0.3, Easing.out(Easing.back(2)))} draw={drawText("2 Stunden", P.Y2, INK, 80)} />
    <Person p={[-1.7, 0, -3.8]} h={3.7} look={opa} f={f} pose={{ mood: "laugh", arms: "point", armK: 0.5 + 0.4 * Math.sin(t * 3), tilt: talkTilt(t, t < tUnt, 0.06), squash: 0.02 * Math.sin(t * 6) }} />
    <Person p={[1.9, 0, -3.8]} h={3.7} look={emre} f={f} pose={{ mood: t > tUnt ? "grin" : "smile", flip: true, armR: sign > 0.05 ? [-0.2, 0.36] : undefined, armRK: sign, tilt: Math.sin(t * 2) * 0.03, squash: 0.01 * Math.sin(t * 2.4) }} />
    <Poster p={[1.2, 3.6, -3.0]} s={[1.0, 1.0]} k={tick} draw={drawText("✓", P.T2, "#fff", 170)} />
    <Glow p={[0.2, 1.6, -3.4]} r={2.6} color="rgba(255,214,140,1)" o={0.2} />
  </>);
};

/* ===== 10: L9 Jonas doubts ===== */
const K10: Key[] = [{ t: 45.5, pos: [-1.0, 3.3, 7.2], look: [-1.6, 3.2, -4.2], fov: 52 }, { t: 48.2, pos: [-1.3, 3.2, 6.2], look: [-1.7, 3.3, -4.2], fov: 49 }];
export const S10 = ({ t, f }: Ctx) => (<>
  <Cam t={t} keys={K10} /><Living t={t} />
  <Person p={sit(-1.7)} h={3.8} look={jonas} f={f} pose={{ mood: "deadpan", arms: "shrug", armK: seg(t, 45.8, 46.3), tilt: 0.1 * seg(t, 45.7, 46.2) + talkTilt(t, speaking(t, 9), 0.02), lookX: -1 }} />
  <Poster p={[-0.2, 5.6, -3.0]} s={[1.2, 1.2]} k={seg(t, 46.3, 46.6, Easing.out(Easing.back(3)))} draw={drawText("2 h?", P.Y2, INK, 170)} />
</>);

/* ===== 11: L10 the account depends on me, not on a promotion round in March ===== */
const K11: Key[] = [{ t: 47.8, pos: [0.0, 3.4, 10.0], look: [0, 3.2, -4.4], fov: 56 }, { t: 52.0, pos: [0.0, 3.4, 8.6], look: [0.0, 3.4, -4.4], fov: 52 }, { t: 57.1, pos: [0.2, 3.3, 7.8], look: [0.2, 3.3, -4.4], fov: 50 }];
export const S11 = ({ t, f }: Ctx) => {
  const tMir = wt("mir", 110), tNicht = wt("Nicht", 110), tMarz = wt("rz", 110);
  const bal = seg(t, wt("Kontostand", 110), tMir + 0.6, Easing.inOut(Easing.cubic)), cal = seg(t, tNicht, tNicht + 0.4, Easing.out(Easing.back(2))), x = seg(t, tMarz - 0.3, tMarz + 0.2, Easing.out(Easing.back(3)));
  return (<>
    <Cam t={t} keys={K11} /><Flat t={t} />
    <ChartScreen p={[-1.9, 4.2, -5.7]} s={[3.2, 2.2]} prog={bal} up label="KONTOSTAND" big={`${Math.round(120 + 3360 * bal)} €`} bigK={1} />
    <Poster p={[3.0, 4.1, -5.6]} s={[2.0, 2.2]} k={cal} draw={(c, W, H) => { c.fillStyle = P.K1; c.fillRect(0, 0, W, H); c.fillStyle = P.C3; c.fillRect(0, 0, W, 90); c.fillStyle = "#fff"; c.font = "800 62px Inter, Arial"; c.textAlign = "center"; c.fillText("MÄRZ", W / 2, 66); c.fillStyle = INK; c.font = "700 36px Inter, Arial"; c.fillText("Beförderungs-", W / 2, 180); c.fillText("runde", W / 2, 224); if (x > 0.1) { c.strokeStyle = P.C2; c.lineWidth = 22; c.beginPath(); c.moveTo(30, 110); c.lineTo(W - 30, H - 30); c.moveTo(W - 30, 110); c.lineTo(30, H - 30); c.stroke(); } }} />
    <Person p={[0.9, 0, -3.8]} h={3.9} look={emre} f={f} pose={{ mood: "grin", arms: tMir > 0 && t > tMir - 0.2 && t < tNicht ? "up" : "hold", armK: 0.7, tilt: talkTilt(t, speaking(t, 10), 0.02), squash: 0.012 * Math.sin(t * 2.2) }} />
    <Glow p={[-1.9, 4.2, -5.5]} r={3.2} color="rgba(58,168,158,1)" o={0.2 * bal} />
  </>);
};

/* ===== 12: L11 "Klingt nach Stress." ===== */
const K12: Key[] = [{ t: 56.8, pos: [-1.2, 3.2, 6.8], look: [-1.7, 3.3, -4.2], fov: 50 }, { t: 58.4, pos: [-1.5, 3.2, 6.0], look: [-1.7, 3.3, -4.2], fov: 48 }];
export const S12 = ({ t, f }: Ctx) => (<>
  <Cam t={t} keys={K12} /><Living t={t} />
  <Person p={sit(-1.7)} h={3.8} look={jonas} f={f} pose={{ mood: "worry", arms: "chest", armK: 0.8, sweat: 0.9, hunch: 0.6, nerv: 0.2 }} />
</>);

/* ===== 13: L12 Emre: "mein Stress" ===== */
const K13: Key[] = [{ t: 58.1, pos: [0.0, 3.0, 8.6], look: [0, 3.0, -4], fov: 54 }, { t: 62.0, pos: [0.0, 3.0, 7.0], look: [0, 3.2, -4], fov: 49 }];
export const S13 = ({ t, f }: Ctx) => {
  const tm = wt("mein", 134);
  return (<>
    <Cam t={t} keys={K13} /><Flat t={t} />
    <Person p={[0.2, 0, -3.8]} h={4.0} look={emre} f={f} pose={{ mood: t > tm ? "grin" : "smile", arms: t > tm - 0.1 ? "up" : "shrug", armK: seg(t, tm - 0.2, tm + 0.3, Easing.out(Easing.back(2))), tilt: talkTilt(t, speaking(t, 12), 0.03), squash: 0.015 * Math.sin(t * 2.4) }} />
    <Poster p={[0.2, 6.0, -3.6]} s={[3.6, 1.0]} k={seg(t, tm, tm + 0.3, Easing.out(Easing.back(2.5)))} draw={drawText("mein Stress", P.Y2, INK, 96)} />
    <Glow p={[0.2, 3.4, -3.9]} r={3.4} color="rgba(242,184,75,1)" o={0.2 * seg(t, tm, tm + 0.4)} />
  </>);
};

/* ===== 14: L13 Jonas sits up ===== */
const K14: Key[] = [{ t: 62.0, pos: [-1.0, 3.2, 7.0], look: [-1.6, 3.2, -4.2], fov: 51 }, { t: 64.7, pos: [-1.3, 3.3, 6.2], look: [-1.7, 3.5, -4.2], fov: 48 }];
export const S14 = ({ t, f }: Ctx) => {
  const up = seg(t, 62.4, 63.1, Easing.out(Easing.back(1.6)));
  return (<>
    <Cam t={t} keys={K14} /><Living t={t} />
    <Person p={sit(-1.7)} h={3.8 + up * 0.15} look={jonas} f={f} pose={{ mood: "smile", arms: "chest", armK: 0.5, hunch: 0.5 - up * 0.8, tilt: talkTilt(t, speaking(t, 13), 0.02), air: up * 0.1 }} />
    <Glow p={[-1.7, 3.8, -3.6]} r={3.4} color="rgba(242,184,75,1)" o={0.22 * up} />
  </>);
};

/* ===== 15: L14 plan at ten, doors from four, the invitation ===== */
const K15: Key[] = [{ t: 64.4, pos: [0.0, 3.2, 9.0], look: [0, 3.2, -4.4], fov: 55 }, { t: 68.2, pos: [0.3, 3.2, 8.0], look: [0.2, 3.2, -4.4], fov: 51 }, { t: 71.5, pos: [0.0, 3.0, 6.4], look: [0.0, 3.0, -4.2], fov: 47 }];
export const S15 = ({ t, f }: Ctx) => {
  const t10 = wt("zehn", 149), t4 = wt("vier", 149), tZu = wt("Hause", 149), tTour = wt("Tour", 149);
  const a = seg(t, t10, t10 + 0.3, Easing.out(Easing.back(2))), b = seg(t, t4, t4 + 0.3, Easing.out(Easing.back(2))), houses = seg(t, tZu - 0.4, tZu + 0.2);
  const hh = t < t4 ? 10 : 16;
  return (<>
    <Cam t={t} keys={K15} />
    {houses > 0.5 ? <Street t={t} dusk num="17" /> : <Flat t={t} />}
    <Box p={[-2.4, 3.6, -5.9]} s={[2.8, 3.6, 0.18]} color={P.K1} line={4} />
    <Poster p={[-2.4, 4.6, -5.7]} s={[2.4, 0.8]} k={a} draw={drawText("10:00 Planung", P.T2, "#fff", 56)} />
    <Poster p={[-2.4, 3.4, -5.7]} s={[2.4, 0.8]} k={b} draw={drawText("16:00 Türen", P.C2, "#fff", 62)} />
    <StaticClock p={[-2.4, 2.1, -5.7]} r={0.55} hh={hh} mm={0} />
    <Person p={[1.8, 0, -3.8]} h={3.9} look={emre} f={f} pose={{ mood: t > tTour ? "grin" : "smile", flip: true, armR: t > tTour - 0.2 ? [-0.55, 0.55] : undefined, armRK: seg(t, tTour - 0.2, tTour + 0.4), tilt: talkTilt(t, speaking(t, 14), 0.02), squash: 0.012 * Math.sin(t * 2.2) }} />
    <Poster p={[0.4, 5.9, -3.4]} s={[1.0, 1.0]} k={seg(t, tTour + 0.7, tTour + 1.0, Easing.out(Easing.back(3)))} draw={drawText("?", P.Y2, INK, 230)} />
  </>);
};

/* ===== 16: Einblendung Gallup: ten colleagues, one engaged ===== */
const K16: Key[] = [{ t: 71.1, pos: [0.0, 2.9, 7.4], look: [0, 2.3, -3.4], fov: 56 }, { t: 79.0, pos: [0.0, 2.8, 6.6], look: [0, 2.3, -3.4], fov: 54 }];
export const S16 = ({ t, f }: Ctx) => {
  const t2 = 74.9, tired = seg(t, t2, t2 + 0.8);
  return (<>
    <Cam t={t} keys={K16} /><Lights warm="#EBDCBA" />
    <Floor kind="tile" a={P.V4} b={P.V3} w={30} d={24} unit={2} /><WallDoor z={-7} W={30} kind="plain" a={P.V3} b={P.V3} base={P.V4} /><SideWall x={-7} kind="plain" a={P.V3} b={P.V3} /><SideWall x={7} kind="plain" a={P.V3} b={P.V3} />
    {Array.from({ length: 10 }, (_, i) => { const row = Math.floor(i / 5), col = i % 5, x = -2.2 + col * 1.1 + (row ? 0.55 : 0), z = -3.4 - row * 1.5, hero = i === 2;
      return <Person key={i} p={[x, 0, z]} h={hero ? 3.5 : 3.0} look={hero ? { ...emre, body: P.Y2, sleeve: P.Y2 } : { ...crowd[i % 8], body: P.K4, sleeve: P.K4, outfit: "shirt" }} f={f + i * 5} pose={{ mood: hero ? "grin" : "deadpan", arms: hero ? "up" : undefined, armK: 0.8, hunch: hero ? 0 : tired * 0.7, squash: hero ? 0.03 * Math.sin(t * 5) : 0.01 * Math.sin(t * 1.5 + i), air: hero ? 0.06 + 0.06 * Math.sin(t * 5) : 0 }} />; })}
    <Glow p={[0.0, 2.2, -3.6]} r={2.4} color="rgba(242,184,75,1)" o={0.35} />
    <Dust t={t} n={10} area={[6, 5, 4]} color="rgba(255,236,190,.7)" />
  </>);
};
export const OVERLAY = (t: number) => (<>
  <InfoCard a={71.3} b={74.8} t={t} title="Laut Gallup-Engagement-Index" body="fühlt sich nur etwa jeder zehnte Beschäftigte in Deutschland emotional stark an seinen Arbeitgeber gebunden." />
  <InfoCard a={74.9} b={78.9} t={t} title="Gallup-Engagement-Index" body="Der Rest macht oft nur Dienst nach Vorschrift." />
  <InfoCard a={0.3} b={3.2} t={t} title="Sonntag, 21:40 Uhr" body="Jonas liegt auf dem Sofa und starrt an die Decke." />
</>);
void Frame; void Lamp; void Rug; void Plant; void WindowCity; void Sign; void CanvasPlane; void Phone; void Calendar; void clamp; void StaticClock;
