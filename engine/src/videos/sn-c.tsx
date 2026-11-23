// Clip 3 "Der Februar" - narrated by Petra; 16 scenes locked to public/februar/words.json.
import React from "react";
import { Easing } from "remotion";
import { Calendar, Lights } from "../style/kit";
import { Cam, Key } from "../style/extra";
import { mkWarp, Knots, Ctx, P, Person, Box, Cyl, Ball, INK, FaceGroup, hand, Floor, WallDoor, SideWall, Glow, Dust, Flat, Street, Living, Lager, Cake, Pallets, CarBox, NightRoad, Poster, drawText, StaticClock, InfoCard, emre, opa, chef, lagerchefin, crowd, seg, lerp, wordAt, W, talkTilt, V3 } from "./sn-common";
import words from "../../public/februar/words.json";
import script from "../../public/februar/script.json";

import WARP from "../../public/februar/warp.json";
export const warp = mkWarp(WARP as Knots);
export const wt = wordAt(words as W[], script as string[], warp.old);
const mv = (t: number, a: number, b: number, x0: number, x1: number) => { const k = seg(t, a, b, Easing.inOut(Easing.sin)); const x = lerp(x0, x1, k); return { x, walking: k > 0.01 && k < 0.99, phase: x * 3.4 }; };
const suit = { ...emre, body: P.V4, sleeve: P.V4, outfit: "suit" as const, tie: P.Y2, shirt: "#ffffff", badge: undefined };

/* 1 (0-2.3) three months in: it runs */
const K1: Key[] = [{ t: 0, pos: [-2.6, 3.2, 8.4], look: [-1.0, 2.6, -5.0], fov: 56 }, { t: 2.5, pos: [0.4, 3.1, 7.6], look: [0.6, 2.6, -5.0], fov: 52 }];
export const C1 = ({ t, f }: Ctx) => {
  const w = mv(t, 0.0, 2.3, -4.6, 0.8);
  return (<>
    <Cam t={t} keys={K1} /><Street t={t} num="4" />
    <Person p={[w.x, 0, -4.0]} h={3.8} look={emre} f={f} pose={{ walk: w.walking ? w.phase : undefined, speed: w.walking ? 1 : 0, mood: "grin", arms: "hold", armK: 0.5, flip: false }} />
    <Poster p={[-1.8, 5.6, -4.0]} s={[2.6, 0.9]} k={seg(t, 0.6, 1.0, Easing.out(Easing.back(2)))} draw={drawText("Monat 3", P.T2, "#fff", 76)} />
  </>);
};

/* 2 (2.3-4.9) earns more than in the depot */
const K2: Key[] = [{ t: 2.1, pos: [0.0, 3.2, 9.0], look: [0, 2.8, -4.0], fov: 54 }, { t: 5.1, pos: [0.0, 3.1, 7.6], look: [0, 2.9, -4.0], fov: 50 }];
export const C2 = ({ t, f }: Ctx) => {
  const a = seg(t, 2.6, 3.4), b = seg(t, wt("mehr"), wt("mehr") + 1.0, Easing.out(Easing.cubic));
  const stack = (x: number, n: number, col: string) => <group position={[x, 0, -3.4]}>{Array.from({ length: n }, (_, i) => <Cyl key={i} p={[Math.sin(i * 2) * 0.05, 0.1 + i * 0.16, 0]} rt={0.6} h={0.14} color={col} line={2} />)}</group>;
  return (<>
    <Cam t={t} keys={K2} /><Flat t={t} />
    {stack(-2.2, Math.round(3 * a), P.K4)}{stack(2.0, Math.round(1 + 14 * b), P.Y2)}
    <Poster p={[-2.2, 2.2, -3.0]} s={[1.6, 0.6]} k={a} draw={drawText("Lager", P.K2, INK, 62)} /><Poster p={[2.0, 5.3, -3.0]} s={[2.0, 0.6]} k={b} draw={drawText("Vertrieb", P.Y2, INK, 62)} />
    <Person p={[0, 0, -3.8]} h={3.9} look={emre} f={f} pose={{ mood: "grin", arms: "up", armK: 0.5 + 0.4 * b, squash: 0.02 * Math.sin(t * 4) }} />
  </>);
};

/* 3 (4.9-8.1) buys a suit, alarm at six */
const K3: Key[] = [{ t: 4.7, pos: [0.0, 3.2, 8.8], look: [0, 3.0, -4.0], fov: 54 }, { t: 8.3, pos: [0.0, 3.1, 7.2], look: [0, 3.1, -4.0], fov: 49 }];
export const C3 = ({ t, f }: Ctx) => {
  const tA = wt("Anzug"), ringT = wt("sechs"), swap = t > tA + 0.2, pop = seg(t, tA, tA + 0.3, Easing.out(Easing.back(2.5))) * (1 - seg(t, tA + 0.3, tA + 0.8)), ring = t > ringT ? Math.sin(t * 40) * 0.06 : 0;
  return (<>
    <Cam t={t} keys={K3} /><Flat t={t} />
    <Person p={[-0.6, 0, -3.6]} h={3.9} look={swap ? suit : emre} f={f} pose={{ mood: "grin", arms: swap ? "chest" : "hold", armK: 0.6, squash: 0.02 * Math.sin(t * 3) + pop * 0.05 }} />
    <Glow p={[-0.6, 3.2, -3.4]} r={2.6} color="rgba(242,184,75,1)" o={0.5 * pop} />
    <group position={[2.4, 4.3, -3.2]} rotation={[0, 0, ring]}><StaticClock p={[0, 0, 0]} r={0.9} hh={6} mm={0} /><Ball p={[-0.6, 0.95, 0]} r={0.26} color={P.Y2} /><Ball p={[0.6, 0.95, 0]} r={0.26} color={P.Y2} /></group>
    <Poster p={[2.4, 2.9, -3.0]} s={[1.7, 0.6]} k={seg(t, ringT, ringT + 0.3, Easing.out(Easing.back(2)))} draw={drawText("06:00", P.C2, "#fff", 70)} />
  </>);
};

/* 4 (8.1-10.0) then comes February */
const K4: Key[] = [{ t: 7.9, pos: [0.0, 3.3, 8.8], look: [0, 3.4, -4.4], fov: 54 }, { t: 10.2, pos: [0.0, 3.4, 7.4], look: [0, 3.6, -4.4], fov: 50 }];
export const C4 = ({ t, f }: Ctx) => (<>
  <Cam t={t} keys={K4} /><Living t={t} hh={7} mm={5} />
  <Calendar p={[1.4, 4.6, -3.6]} month="FEBRUAR" day="1" s={2.2} mark="X" markK={0} />
  {Array.from({ length: 22 }, (_, i) => <Ball key={i} p={[-4 + (i * 0.43) % 9, 6.5 - ((t * 1.4 + i * 0.37) % 6.5), -3.0 - (i % 4) * 0.4]} r={0.07} color="#fff" ink={0.01} />)}
  <Person p={[-1.2, 0, -3.4]} h={3.9} look={suit} f={f} pose={{ mood: "worry", arms: "chest", armK: 0.6, hunch: 0.3, lookX: 1 }} />
</>);

/* 5 (10.0-14.7) two contracts in four weeks; a customer cancels everything */
const K5: Key[] = [{ t: 9.8, pos: [0.0, 3.4, 9.4], look: [0, 3.4, -4.2], fov: 54 }, { t: 14.9, pos: [0.0, 3.3, 7.8], look: [0, 3.3, -4.2], fov: 50 }];
export const C5 = ({ t, f }: Ctx) => {
  const tSt = wt("storniert"), cut = seg(t, tSt - 0.1, tSt + 0.5, Easing.in(Easing.quad)), st = seg(t, tSt + 0.1, tSt + 0.4, Easing.out(Easing.back(3)));
  return (<>
    <Cam t={t} keys={K5} impacts={[[tSt + 0.1, 0.03]]} /><Flat t={t} />
    {[0, 1, 2, 3].map((i) => <Poster key={i} p={[-2.7 + i * 1.8, 5.4, -4.5]} s={[1.5, 1.1]} k={seg(t, 10.2 + i * 0.3, 10.5 + i * 0.3, Easing.out(Easing.back(2)))} draw={drawText(`W${i + 1}`, P.K1, INK, 70, i === 1 || i === 3 ? "Vertrag ✓" : "–")} />)}
    <Person p={[2.4, 0, -3.4]} h={3.8} look={crowd[3]} f={f} pose={{ mood: "angry", arms: "box", armK: 0.7, flip: true, squash: 0.01 * Math.sin(t * 6) }} />
    <group position={[0.6, 2.6, -3.0]}><Box p={[-0.45 - cut * 0.6, -cut * 1.8, 0]} s={[0.8, 1.1, 0.05]} color={P.K1} line={2} rot={[0, 0, -cut * 0.8]} /><Box p={[0.45 + cut * 0.6, -cut * 1.9, 0]} s={[0.8, 1.1, 0.05]} color={P.K1} line={2} rot={[0, 0, cut * 0.8]} /></group>
    <Poster p={[0.6, 3.4, -2.6]} s={[2.2, 0.8]} k={st} draw={drawText("STORNO", P.C2, "#fff", 90)} />
    <Person p={[-1.8, 0, -3.4]} h={3.8} look={suit} f={f} pose={{ mood: t > tSt ? "shock" : "smile", arms: t > tSt ? "head" : "hold", armK: 0.7, squash: t > tSt ? -0.06 : 0 }} />
  </>);
};

/* 6 (14.7-20.1) the boss and the quota */
const K6: Key[] = [{ t: 14.5, pos: [0.0, 3.4, 9.6], look: [0, 3.2, -4.4], fov: 54 }, { t: 20.3, pos: [0.0, 3.3, 7.6], look: [0, 3.2, -4.4], fov: 49 }];
export const C6 = ({ t, f }: Ctx) => {
  const tQ = wt("Quote"), tV = wt("verliert"), fall = seg(t, tV, tV + 0.9, Easing.in(Easing.quad));
  return (<>
    <Cam t={t} keys={K6} /><Flat t={t} />
    <Poster p={[-1.6, 4.9, -5.5]} s={[3.2, 2.2]} k={seg(t, tQ - 0.4, tQ, Easing.out(Easing.back(2)))} draw={(c, W2, H) => { c.fillStyle = P.K1; c.fillRect(0, 0, W2, H); c.fillStyle = INK; c.font = "800 40px Inter, Arial"; c.textAlign = "left"; c.fillText("QUOTE", 20, 54); c.strokeStyle = P.C2; c.setLineDash([14, 10]); c.lineWidth = 6; c.beginPath(); c.moveTo(20, 130); c.lineTo(W2 - 20, 130); c.stroke(); c.setLineDash([]); c.fillStyle = P.T2; c.fillRect(60, 150, 70, 130); c.fillRect(170, 190, 70, 90); c.fillRect(280, 160, 70, 120); c.fillRect(390, 200, 70, 80); }} />
    <Person p={[2.4, 0, -3.6]} h={4.0} look={chef} f={f} pose={{ mood: "angry", arms: "point", armK: 0.7, flip: true, tilt: talkTilt(t, true, 0.02) }} />
    {[0, 1, 2].map((i) => <group key={i} position={[-3.6 + i * 1.4, 0, -3.0]}><Box p={[0, 0.6, 0]} s={[1.0, 0.1, 1.0]} color={P.V2} /><Cyl p={[0, 0.3, 0]} rt={0.08} h={0.6} color={INK} />{i < 2 ? null : null}</group>)}
    <group position={[-0.6 - fall * 0.4, 0.6 - fall * 2.6, -3.0]} rotation={[0, 0, fall * 1.5]}><Box p={[0, 0, 0]} s={[1.0, 0.1, 1.0]} color={P.C2} /></group>
    <Person p={[-2.2, 0, -3.4]} h={3.6} look={{ ...suit }} f={f} pose={{ mood: t > tV ? "worry" : "deadpan", hunch: 0.5, sweat: t > tV ? 0.6 : 0 }} />
  </>);
};

/* 7 (20.1-25.9) night drive: was the retiree just luck? */
const K7: Key[] = [{ t: 19.9, pos: [-1.0, 2.8, 9.0], look: [0.0, 2.0, -3.0], fov: 54 }, { t: 26.1, pos: [1.0, 2.8, 8.0], look: [0.4, 2.2, -3.0], fov: 50 }];
export const C7 = ({ t, f }: Ctx) => {
  const x = lerp(-3.6, 2.4, seg(t, 20.0, 25.9, Easing.inOut(Easing.sin))), b = seg(t, wt("Rentner"), wt("Rentner") + 0.4, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K7} /><NightRoad t={t} />
    <CarBox p={[x, 0, -3.0]} /><Person p={[x - 0.2, 0.55, -2.7]} h={2.3} look={suit} f={f} pose={{ mood: "worry", arms: "hold", armK: 0.6, hunch: 0.4, sweat: 0.4 }} />
    <group position={[x + 0.4, 4.7, -3.2]} scale={b + 0.001}>{[[-0.8, 0.2, 0.7], [0.8, 0.3, 0.8], [0, 0.7, 0.9], [0, -0.3, 0.8]].map(([px, py, r], i) => <Ball key={i} p={[px, py, 0]} r={r} color="#fffaf0" ink={0.04} />)}<Person p={[-0.4, -0.7, 1.2]} h={1.9} look={opa} f={f} pose={{ mood: "smile" }} /><Poster p={[0.9, -0.1, 1.2]} s={[0.9, 0.9]} k={seg(t, wt("Glück"), wt("Glück") + 0.3, Easing.out(Easing.back(3)))} draw={drawText("?", P.Y2, INK, 190)} /></group>
  </>);
};

/* 8 (25.9-31.3) he calls his old boss from the depot */
const K8: Key[] = [{ t: 25.7, pos: [0.0, 3.2, 9.0], look: [0, 3.0, -4.2], fov: 54 }, { t: 31.5, pos: [0.0, 3.2, 7.6], look: [0, 3.2, -4.2], fov: 49 }];
export const C8 = ({ t, f }: Ctx) => {
  const b = seg(t, wt("Lagerchefin"), wt("Lagerchefin") + 0.4, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K8} /><Lager t={t} />
    <Person p={[-0.4, 0, -3.4]} h={3.9} look={lagerchefin} f={f} pose={{ mood: "smile", armR: [0.2, 0.72], armRK: 1, tilt: talkTilt(t, t > wt("sagt"), 0.03), squash: 0.012 * Math.sin(t * 2.4) }} />
    <FaceGroup p={[-0.4, 0, -3.4]}><Box p={hand(3.9, [0.2, 0.72], 0, false, 0.24)} s={[0.16, 0.36, 0.05]} color="#1b1b2a" line={2} rot={[0, 0, -0.15]} /></FaceGroup>
    <group position={[2.4, 5.0, -3.0]} scale={b + 0.001}>{[[-0.7, 0.1, 0.7], [0.7, 0.2, 0.8], [0, 0.6, 0.8], [0, -0.4, 0.7]].map(([px, py, r], i) => <Ball key={i} p={[px, py, 0]} r={r} color="#fffaf0" ink={0.04} />)}<Person p={[0, -0.8, 1.2]} h={2.0} look={suit} f={f} pose={{ mood: "worry", armR: [-0.2, 0.7], armRK: 1, hunch: 0.4 }} /></group>
  </>);
};

/* 9 (31.3-36.6) five years of pallets: no rejection knocks her over */
const K9: Key[] = [{ t: 31.1, pos: [0.0, 3.4, 9.4], look: [0, 3.2, -4.2], fov: 54 }, { t: 36.8, pos: [0.0, 3.3, 7.8], look: [0, 3.3, -4.2], fov: 50 }];
export const C9 = ({ t, f }: Ctx) => {
  const tAb = wt("Absage"), fly = seg(t, tAb - 0.5, tAb + 0.1, Easing.in(Easing.quad)), back = seg(t, tAb + 0.1, tAb + 0.8, Easing.out(Easing.cubic));
  return (<>
    <Cam t={t} keys={K9} impacts={[[tAb + 0.1, 0.02]]} /><Lager t={t} />
    <Pallets p={[-3.0, 0, -3.4]} n={5} />
    <Poster p={[-3.0, 5.6, -3.0]} s={[2.0, 0.7]} k={seg(t, wt("fünf"), wt("fünf") + 0.3, Easing.out(Easing.back(2)))} draw={drawText("5 Jahre", P.Y2, INK, 70)} />
    <Person p={[0.6, 0, -3.4]} h={4.0} look={lagerchefin} f={f} pose={{ mood: "grin", arms: "chest", armK: 0.7, squash: 0.012 * Math.sin(t * 2.4), tilt: talkTilt(t, true, 0.015) }} />
    <Box p={[lerp(4.6, 1.4, fly) + back * 1.8, 3.4 + back * 1.3 - fly * 0.2, -3.0]} s={[0.7, 0.04, 0.5]} color={P.K1} line={2} rot={[0, 0, 0.3 + back * 5]} />
    <Poster p={[3.0, 4.4, -3.0]} s={[1.6, 0.6]} k={seg(t, tAb - 0.6, tAb - 0.3, Easing.out(Easing.back(2)))} draw={drawText("Absage", P.C2, "#fff", 62)} />
  </>);
};

/* 10 (36.6-44.2) he hangs up, recalculates, finds the mistake */
const K10: Key[] = [{ t: 36.4, pos: [0.0, 4.4, 8.4], look: [0, 2.6, -3.8], fov: 54 }, { t: 44.4, pos: [0.0, 4.0, 6.8], look: [0, 2.8, -3.8], fov: 48 }];
export const C10 = ({ t, f }: Ctx) => {
  const err = seg(t, wt("Fehler"), wt("Fehler") + 0.4, Easing.out(Easing.back(2.5))), nul = seg(t, wt("Seit", 141), wt("Seit", 141) + 0.4, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K10} /><Flat t={t} />
    <Box p={[0, 1.1, -3.6]} s={[4.0, 0.16, 2.0]} color={P.Y3} /><Cyl p={[-1.6, 0.55, -3.2]} rt={0.12} h={1.1} color={P.Y4} /><Cyl p={[1.6, 0.55, -3.2]} rt={0.12} h={1.1} color={P.Y4} />
    <Box p={[1.2, 1.3, -3.2]} s={[0.7, 0.2, 0.9]} color={P.V4} line={3} />
    <Poster p={[-1.6, 4.6, -4.8]} s={[3.4, 2.3]} k={1} draw={(c, W2, H) => { c.fillStyle = P.K1; c.fillRect(0, 0, W2, H); c.fillStyle = INK; c.font = "800 38px Inter, Arial"; c.textAlign = "left"; c.fillText("Neukunden: ✓ ✓ ✓ ✓", 20, 60); c.fillText("Bestandskunden: 0", 20, 130); if (err > 0.1) { c.strokeStyle = P.C2; c.lineWidth = 9; c.beginPath(); c.ellipse(300, 120, 190 * err, 36, 0, 0, 7); c.stroke(); } c.fillStyle = P.C3; c.font = "700 32px Inter, Arial"; c.fillText(nul > 0.5 ? "seit Wochen keine Besuche" : "", 20, 200); }} />
    <Person p={[0.2, 0, -4.4]} h={3.8} look={suit} f={f} pose={{ mood: err > 0.5 ? "shock" : "deadpan", armR: [0.1, 0.34], armRK: 1, hunch: 0.7, tilt: 0.03 }} />
    <Poster p={[2.2, 5.0, -3.4]} s={[1.6, 1.4]} k={err} draw={drawText("!", P.Y2, INK, 230)} />
  </>);
};

/* 11 (44.2-50.4) three days later: customer one, with cake, without folder */
const K11: Key[] = [{ t: 44.0, pos: [-1.6, 2.8, 7.2], look: [-0.2, 2.5, -5.2], fov: 54 }, { t: 50.6, pos: [0.4, 2.8, 6.0], look: [0.2, 2.5, -5.2], fov: 50 }];
export const C11 = ({ t, f }: Ctx) => {
  const o = seg(t, wt("Kuchen") + 0.2, wt("Kuchen") + 0.9), w = mv(t, 44.4, 47.0, -4.6, -1.5);
  return (<>
    <Cam t={t} keys={K11} /><Street t={t} num="1" nums={["0", "1", "2"]} open={o} opens={[0, o, 0]} />
    <Poster p={[0, 5.9, -4.2]} s={[2.4, 0.8]} k={seg(t, 44.6, 45.0, Easing.out(Easing.back(2)))} draw={drawText("Kunde 1", P.Y2, INK, 76)} />
    {o > 0.05 ? <Person p={[0.25, 0, -5.55]} h={3.1} look={crowd[1]} f={f} pose={{ mood: "grin", arms: "up", armK: 0.7, squash: 0.02 * Math.sin(t * 7) }} /> : null}
    <Person p={[w.x, 0, -4.2]} h={3.7} look={suit} f={f} pose={{ walk: w.walking ? w.phase : undefined, speed: w.walking ? 1 : 0, mood: "grin", arms: "box", armK: 0.7 }} />
    <FaceGroup p={[w.x, 0, -4.2]}><Cake p={[0.55, 1.55, 0.35]} s={0.8} /></FaceGroup>
    <Box p={[-3.8, 0.12, -3.6]} s={[0.9, 0.2, 1.2]} color={P.C2} line={3} rot={[0, 0.4, 0]} />
    <Poster p={[-3.8, 1.2, -3.2]} s={[1.5, 0.5]} k={seg(t, wt("ohne"), wt("ohne") + 0.3)} draw={drawText("kein Ordner", P.K1, INK, 56)} />
  </>);
};

/* 12 (50.4-55.6) one visit -> two referrals -> seven appointments */
const K12: Key[] = [{ t: 50.2, pos: [0.0, 3.8, 9.8], look: [0, 3.6, -4.2], fov: 54 }, { t: 55.8, pos: [0.0, 3.8, 8.2], look: [0, 3.6, -4.2], fov: 50 }];
export const C12 = ({ t, f }: Ctx) => {
  const e = seg(t, wt("Empfehlungen"), wt("Empfehlungen") + 0.5), a = seg(t, wt("Termine"), wt("Termine") + 1.2);
  return (<>
    <Cam t={t} keys={K12} /><Flat t={t} />
    <Box p={[0, 4.2, -5.8]} s={[6.4, 4.6, 0.2]} color={P.K1} line={4} />
    <Ball p={[0, 5.9, -5.6]} r={0.45} color={P.Y2} /><Poster p={[0, 6.6, -5.5]} s={[1.6, 0.5]} k={1} draw={drawText("Besuch", P.K1, INK, 54)} />
    {[-1.4, 1.4].map((x, i) => <React.Fragment key={x}><Box p={[x / 2, 5.1 - 0.0, -5.62]} s={[Math.abs(x) * 0.9 * e, 0.06, 0.05]} color={INK} line={0} rot={[0, 0, x > 0 ? -0.5 : 0.5]} /><Ball p={[x * e, 4.5 + (1 - e) * 1.4, -5.6]} r={0.38} color={P.T2} /></React.Fragment>)}
    {Array.from({ length: 7 }, (_, i) => <Box key={i} p={[-2.4 + i * 0.8, 3.0, -5.6]} s={[0.6, 0.6, 0.12]} color={i < Math.round(7 * a) ? P.T2 : P.K2} line={3} />)}
    <Poster p={[0, 2.2, -5.5]} s={[2.4, 0.6]} k={e} draw={drawText("7 Termine", P.Y2, INK, 58)} />
    <Person p={[0, 0, -3.4]} h={3.8} look={suit} f={f} pose={{ mood: "grin", arms: "up", armK: 0.6, squash: 0.012 * Math.sin(t * 3) }} />
  </>);
};

/* 13 (55.6-60.5) four contracts above quota */
const K13: Key[] = [{ t: 55.4, pos: [0.0, 3.5, 9.6], look: [0, 3.4, -4.4], fov: 54 }, { t: 60.7, pos: [0.0, 3.4, 8.0], look: [0, 3.5, -4.4], fov: 50 }];
export const C13 = ({ t, f }: Ctx) => {
  const g = seg(t, 56.0, 58.4, Easing.inOut(Easing.cubic)), win = seg(t, wt("vier", 177), wt("vier", 177) + 0.5, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K13} /><Flat t={t} />
    <Box p={[0, 3.8, -5.8]} s={[6.0, 4.2, 0.2]} color={P.K1} line={4} />
    {[3, 5, 4, 6, 10].map((h, i) => <Box key={i} p={[-2.2 + i * 1.0, 2.0 + (h * 0.22 * g) / 2, -5.6]} s={[0.7, Math.max(0.03, h * 0.22 * g), 0.2]} color={i === 4 ? P.Y2 : P.T2} line={2} />)}
    <Box p={[0, 2.0 + 6 * 0.22, -5.5]} s={[5.4, 0.05, 0.05]} color={P.C2} line={0} />
    <Poster p={[2.2, 4.9, -5.3]} s={[1.9, 0.6]} k={win} draw={drawText("+4 über Quote", P.Y2, INK, 40)} />
    <Person p={[2.8, 0, -3.4]} h={3.9} look={suit} f={f} pose={{ mood: "laugh", arms: "up", armK: 0.9, air: 0.08 * win + 0.05 * Math.sin(t * 6) * win, flip: true }} />
    {Array.from({ length: 24 }, (_, i) => <Box key={i} p={[-3.5 + (i * 0.47) % 7, 7 - ((t * 2 + i * 0.31) % 7) * win, -3.0 - (i % 3)]} s={[0.12, 0.2, 0.02]} color={[P.Y2, P.C2, P.T2, P.V2][i % 4]} line={0} rot={[t * 3 + i, 0, t * 2 + i]} />)}
  </>);
};

/* 14 (60.5-64.4) a year later he leads five people */
const K14: Key[] = [{ t: 60.3, pos: [0.0, 3.2, 10.4], look: [0, 3.0, -4.0], fov: 55 }, { t: 64.6, pos: [0.0, 3.1, 8.6], look: [0, 3.0, -4.0], fov: 50 }];
export const C14 = ({ t, f }: Ctx) => (<>
  <Cam t={t} keys={K14} /><Flat t={t} />
  <Poster p={[0, 5.4, -5.0]} s={[3.6, 0.9]} k={seg(t, 60.8, 61.2, Easing.out(Easing.back(2)))} draw={drawText("Team Emre", P.Y2, INK, 84)} />
  <Person p={[0, 0, -3.0]} h={4.2} look={suit} f={f} pose={{ mood: "grin", arms: "chest", armK: 0.7, squash: 0.012 * Math.sin(t * 2.4) }} />
  {[-3.2, -1.7, 1.7, 3.2, 0].map((x, i) => <Person key={i} p={[x, 0, i === 4 ? -4.8 : -4.0]} h={3.3} look={{ ...crowd[i], scarf: P.Y2 }} f={f + i * 4} pose={{ mood: "smile", arms: i % 2 ? "up" : undefined, armK: 0.5 + 0.4 * Math.sin(t * 3 + i), squash: 0.015 * Math.sin(t * 3 + i) }} />)}
</>);

/* 15 (64.4-71.4) the sentence he tells every newcomer */
const K15: Key[] = [{ t: 64.2, pos: [0.0, 3.2, 9.0], look: [0, 3.0, -4.0], fov: 54 }, { t: 71.6, pos: [0.0, 3.1, 7.4], look: [0, 3.2, -4.0], fov: 49 }];
export const C15 = ({ t, f }: Ctx) => {
  const s = seg(t, wt("Dir"), wt("Dir") + 0.4, Easing.out(Easing.back(2))), pr = seg(t, wt("Preis"), wt("Preis") + 0.4, Easing.out(Easing.back(2.5)));
  return (<>
    <Cam t={t} keys={K15} /><Flat t={t} />
    <Person p={[-1.8, 0, -3.6]} h={4.0} look={suit} f={f} pose={{ mood: "smile", arms: "point", armK: 0.6, tilt: talkTilt(t, true, 0.02), squash: 0.012 * Math.sin(t * 2.4) }} />
    <Person p={[2.0, 0, -3.6]} h={3.4} look={{ ...crowd[5], badge: P.T2 }} f={f} pose={{ mood: t > wt("zuknallen") ? "shock" : "worry", hunch: 0.5, flip: true, sweat: 0.4, arms: t > wt("zuknallen") ? "head" : "chest", armK: 0.7 }} />
    <Poster p={[0.2, 5.8, -3.4]} s={[3.8, 1.3]} k={s} draw={drawText("Dir wird jemand eine Tür\nvor der Nase zuknallen.", P.K1, INK, 40)} />
    <Poster p={[0.2, 3.9, -3.2]} s={[2.4, 0.8]} k={pr} draw={drawText("Das gehört zum Preis.", P.Y2, INK, 40)} />
  </>);
};

/* 16 (71.4-end) a Sunday, 21:40: a friend calls who can't go on */
const K16: Key[] = [{ t: 71.2, pos: [-0.8, 3.2, 9.2], look: [-1.6, 2.8, -4.2], fov: 54 }, { t: 78.6, pos: [-1.2, 3.0, 6.6], look: [-1.6, 3.0, -4.2], fov: 48 }, { t: 82.0, pos: [-1.2, 3.0, 6.4], look: [-1.6, 3.0, -4.2], fov: 48 }];
export const C16 = ({ t, f }: Ctx) => {
  const ring = seg(t, wt("Freund"), wt("Freund") + 0.3), buzz = ring > 0 ? Math.sin(t * 38) * 0.04 : 0;
  return (<>
    <Cam t={t} keys={K16} /><Living t={t} />
    <Person p={[-1.4, -0.25, -4.15]} h={3.8} look={suit} f={f} pose={{ mood: ring > 0.5 ? "smile" : "deadpan", arms: "hold", armK: 0.6, hunch: 0.4, squash: 0.01 * Math.sin(t * 2.2) }} />
    <group position={[0.3, 2.0, -3.0]} rotation={[0, 0, buzz]}><Box p={[0, 0, 0]} s={[0.9, 1.6, 0.08]} color="#1b1b2a" line={3} /><Poster p={[0, 0, 0.06]} s={[0.78, 1.4]} k={ring} draw={(c, W2, H) => { c.fillStyle = P.V3; c.fillRect(0, 0, W2, H); c.fillStyle = P.C2; c.beginPath(); c.arc(W2 / 2, 90, 46, 0, 7); c.fill(); c.fillStyle = "#fff"; c.font = "800 34px Inter, Arial"; c.textAlign = "center"; c.fillText("Jonas", W2 / 2, 200); c.font = "600 22px Inter, Arial"; c.fillText("ruft an …", W2 / 2, 236); }} /></group>
    <Glow p={[0.3, 2.0, -2.8]} r={1.8} color="rgba(242,184,75,1)" o={0.4 * ring} />
  </>);
};
export const OVERLAY_C = (t: number) => <InfoCard a={79.0} b={82.2} t={t} title="Teil 3 von 3" body="Weiter mit: Sonntag, 21:40 Uhr." top={150} />;
void Floor; void WallDoor; void SideWall; void Dust; void Lights; void Pallets;
