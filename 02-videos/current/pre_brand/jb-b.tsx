// Joshua Bell video, part B (scenes 6-11): the violin's value, the stage, the sold-out hall, same music/other frame, the kids, the frame.
import React from "react";
import { Easing } from "remotion";
import { Box, Cyl, Ball, CanvasPlane, Surface, INK } from "../style/toon";
import { Person, Lights, Clock, Sign, Calendar, V3 } from "../style/kit";
import { Floor, WallDoor, SideWall, Glow, Shaft, Plant, Frame, Lamp, Dust, Rug } from "../style/props";
import { Cam, Key, camAt, FaceGroup, hand, Globe, SpotCone, Curtain, ChipStack, Card, Stars } from "../style/extra";
import { Ctx, WALK, busker, tux, woman, crowd, rnd, Violin, Bow, Notes, Player, seg, lerp, clamp } from "./jb-common";

/* ============ S6  22.1 - 27.55  "Die Geige ist eine Stradivari von 1713, rund 3,5 Millionen wert." ============ */
const orbit = (a: number, r: number, y: number, c: V3 = [0, 0, 0]): V3 => [c[0] + Math.sin(a) * r, y, c[2] + Math.cos(a) * r];
const K6: Key[] = [
  { t: 21.9, pos: orbit(-0.8, 9.6, 3.4, [0, 0, -1]), look: [0, 3.0, -1], fov: 50 },
  { t: 24.0, pos: orbit(-0.1, 9.0, 3.8, [0, 0, -1]), look: [0, 3.1, -1], fov: 48 },
  { t: 26.2, pos: orbit(0.5, 8.4, 4.0, [0, 0, -1]), look: [0.1, 3.2, -1], fov: 46 },
  { t: 27.8, pos: orbit(0.65, 8.0, 4.2, [0, 0, -1]), look: [0.1, 3.3, -1], fov: 44 },
];
export const S6 = ({ t, f }: Ctx) => {
  const spin = (t - 22.1) * 0.5, tag = seg(t, 23.0, 23.5, Easing.out(Easing.back(2.5))), yr = seg(t, 23.3, 24.2), mil = seg(t, 26.2, 27.2, Easing.inOut(Easing.cubic)), amazed = seg(t, 26.3, 26.55, Easing.out(Easing.back(2.5)));
  const price = (3.5 * mil).toFixed(1).replace(".", ",");
  return (<>
    <Cam t={t} keys={K6} />
    <Lights warm="#e8d8ff" />
    <Floor kind="marble" a="#2a1d52" b="#241a48" unit={2.4} w={34} d={30} />
    <WallDoor z={-8} W={34} kind="plain" a="#3b2670" b="#3b2670" base="#1a1034" />
    <SideWall x={-8} kind="plain" a="#33215f" b="#33215f" /><SideWall x={8} kind="plain" a="#33215f" b="#33215f" />
    {/* gallery dressing */}
    <Frame p={[-4.6, 4.6, -7.9]} s={[2.6, 3.4]} art={1} /><Frame p={[0, 5.4, -7.9]} s={[3.2, 2.2]} art={0} /><Frame p={[4.8, 4.6, -7.9]} s={[2.6, 3.4]} art={2} />
    {[-5.8, 5.8].map((x) => <React.Fragment key={x}><Cyl p={[x, 3.0, -3.4]} rt={0.4} h={6} color="#4a3590" /><Cyl p={[x, 0.15, -3.4]} rt={0.55} h={0.3} color="#ffc23a" /></React.Fragment>)}
    {[-3.4, 3.4].map((x) => <React.Fragment key={"r" + x}><Cyl p={[x, 0.6, 1.6]} rt={0.09} h={1.2} color="#ffc23a" /><Ball p={[x, 1.25, 1.6]} r={0.16} color="#ffc23a" /></React.Fragment>)}
    <Box p={[0, 0.55, 1.6]} s={[6.4, 0.05, 0.05]} color="#b3122e" line={2} />
    <Plant p={[-6.4, 0, 0.5]} s={1.2} pot="#ffc23a" /><Plant p={[6.4, 0, 0.8]} s={1.2} pot="#ffc23a" /><Rug p={[0, 0.02, -1]} s={[8, 7]} a="#4a3590" b="#b3122e" />
    <SpotCone p={[0, 10, -1]} h={10} r={2.7} color="#fff1c8" o={0.14} /><Glow p={[0, 1.4, -1]} r={2.6} color="rgba(255,225,160,1)" o={0.3} /><Dust t={t} n={18} area={[4, 8, 4]} color="rgba(255,236,190,.9)" />
    {/* pedestal + glass + the violin turning in the spotlight */}
    <Cyl p={[0, 0.9, -1]} rt={1.5} rb={1.7} h={1.8} color="#e8e0f5" /><Cyl p={[0, 1.85, -1]} rt={1.65} h={0.14} color="#ffc23a" />
    <group position={[0, 3.3, -1]} rotation={[0, spin, 0.0]}><Violin p={[0, Math.sin(t * 1.6) * 0.06, 0]} s={1.5} rot={[0, 0, 0.35]} /><Bow p={[0.8, -0.2, 0.15]} s={1.1} rot={[0.3, 0.3, 0.9]} /></group>
    {/* year plate and price tag */}
    <CanvasPlane p={[0, 1.2, 0.2]} s={[2.2 * yr + 0.001, 0.8]} px={[440, 160]} frame="#0b0d1a" draw={(c, W, H) => { c.fillStyle = "#ffc23a"; c.fillRect(0, 0, W, H); c.fillStyle = INK; c.font = "900 92px Inter, Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("1713", W / 2, H / 2 + 4); }} />
    <FaceGroup p={[0.0, 5.3 + Math.sin(t * 2) * 0.05, -0.6]}>
      <Cyl p={[0, 0.9, 0]} rt={0.02} h={1.8} color="#c9d3e0" line={1} />
      <CanvasPlane p={[0, 0, 0.1]} s={[2.8 * tag + 0.001, 1.3 * tag + 0.001]} px={[480, 225]} frame="#0b0d1a" draw={(c, W, H) => { c.fillStyle = "#fffaf0"; c.fillRect(0, 0, W, H); c.fillStyle = "#e23b3b"; c.fillRect(0, 0, W, 54); c.fillStyle = "#fff"; c.font = "900 36px Inter, Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("STRADIVARI", W / 2, 29); c.fillStyle = INK; c.font = "900 96px Inter, Arial"; c.fillText(mil > 0 ? "$" + price + " Mio" : "? Mio", W / 2, 140); }} />
    </FaceGroup>
    {/* gold piles rising with the number */}
    {[-2.6, 2.6].map((x, i) => <ChipStack key={x} p={[x, 0, 0.4]} n={Math.max(1, Math.round(14 * mil))} color={i ? "#ffc23a" : "#2fd46a"} r={0.7} />)}
    {/* a visitor gapes at the price */}
    <Person p={[-3.8, 0, 0.6]} h={3.2} look={crowd[2]} f={f} pose={{ mood: amazed > 0.3 ? "shock" : "smile", lookX: 1, flip: false, arms: amazed > 0.3 ? "head" : "chest", armK: Math.max(0.6, amazed), squash: -0.12 * Math.exp(-Math.max(0, t - 26.4) * 6) * (t > 26.4 ? 1 : 0) }} />
  </>);
};

/* ============ S7  27.55 - 32.3  "Der Mann ist Joshua Bell, einer der besten Geiger der Welt, der zwei Tage vorher ..." ============ */
const K7: Key[] = [
  { t: 27.4, pos: [-0.4, 2.2, 8.2], look: [0, 3.0, 0], fov: 50 },
  { t: 29.4, pos: [-1.4, 2.6, 8.4], look: [0, 3.5, -0.5], fov: 54 },
  { t: 31.0, pos: [1.6, 3.0, 9.4], look: [0.8, 3.6, -0.6], fov: 58 },
  { t: 32.5, pos: [3.0, 3.2, 8.4], look: [2.6, 3.6, -0.6], fov: 54 },
];
export const S7 = ({ t, f }: Ctx) => {
  const name = seg(t, 28.15, 28.6, Easing.out(Easing.back(2.5))), globe = seg(t, 29.3, 29.8, Easing.out(Easing.back(2))), cal = seg(t, 31.2, 31.7, Easing.out(Easing.back(2))), mk = seg(t, 31.5, 32.1);
  const bow = seg(t, 27.9, 28.4, Easing.inOut(Easing.sin)) * (1 - seg(t, 30.9, 31.3));
  return (<>
    <Cam t={t} keys={K7} />
    <Lights warm="#ffd9a0" />
    <Floor kind="plank" a="#8a5a2e" b="#7a4e26" unit={1.6} w={34} d={30} />
    <WallDoor z={-6} W={34} kind="wood" a="#5a1a2a" b="#4e1624" base="#2a0c14" unit={1.4} />
    <Curtain p={[-6.8, 4.6, -5.8]} s={[3.2, 9.2]} /><Curtain p={[6.8, 4.6, -5.8]} s={[3.2, 9.2]} /><Curtain p={[0, 8.7, -5.7]} s={[18, 1.8]} folds={16} />
    <CanvasPlane p={[0, 6.0, -5.8]} s={[6.0 * name + 0.001, 1.3]} px={[740, 160]} frame="#ffc23a" draw={(c, W, H) => { c.fillStyle = "#12091f"; c.fillRect(0, 0, W, H); c.fillStyle = "#ffd770"; c.font = "900 104px Inter, Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("JOSHUA BELL", W / 2, H / 2 + 4); }} />
    {[-5, -2.5, 2.5, 5].map((x) => <React.Fragment key={x}><SpotCone p={[x, 9.4, -1]} h={9.4} r={1.4} color="#fff1c8" o={0.07} /><Glow p={[x, 8.9, -0.8]} r={0.8} color="rgba(255,225,170,1)" o={0.6} /></React.Fragment>)}
    <SpotCone p={[0, 9.4, -0.2]} h={9.4} r={2.6} color="#fff1c8" o={0.16} /><Glow p={[0, 0.1, 0]} r={2.6} color="rgba(255,236,190,1)" o={0.35} />
    {/* stage dressing: piano, music stand, chairs, flowers, speakers */}
    <Box p={[-4.4, 1.0, -3.0]} s={[3.2, 0.3, 2.0]} color="#15151e" /><Box p={[-4.4, 0.55, -3.0]} s={[2.6, 0.9, 1.6]} color="#15151e" /><Box p={[-4.4, 1.55, -3.4]} s={[3.0, 0.1, 1.6]} color="#2b2b3a" rot={[-0.5, 0, 0]} />
    {[-5.8, -3.0].map((x) => <Cyl key={x} p={[x, 0.45, -1.2]} rt={0.4} h={0.9} color="#3b2a1a" />)}
    <Cyl p={[1.9, 1.0, -0.8]} rt={0.04} h={2.0} color="#2b3350" line={2} /><Box p={[1.9, 2.0, -0.8]} s={[0.9, 0.6, 0.05]} color="#fffaf0" rot={[-0.3, 0, 0]} line={2} />
    <Plant p={[6.4, 0, -2.2]} s={1.5} pot="#ffc23a" /><Plant p={[-7.0, 0, -0.4]} s={1.5} pot="#ffc23a" /><Box p={[7.3, 1.4, 1.0]} s={[1.5, 2.8, 1.3]} color="#1b1b2a" /><Ball p={[7.3, 1.9, 1.7]} r={0.42} color="#3a3a4a" />
    <Globe p={[-3.6, 4.2 * globe + 0.001, -2.4]} r={1.3 * globe + 0.001} rotY={t * 0.8} />
    {Array.from({ length: 5 }, (_, i) => <CanvasPlane key={i} p={[-3.6 + (i - 2) * 0.75, 6.3, -2.2]} s={[0.6 * globe + 0.001, 0.6 * globe + 0.001]} px={[96, 96]} draw={(c, W, H) => { c.clearRect(0, 0, W, H); c.fillStyle = "#ffd23a"; c.strokeStyle = INK; c.lineWidth = 6; c.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, r = k % 2 ? 18 : 42; c.lineTo(W / 2 + Math.cos(a) * r, H / 2 + Math.sin(a) * r); } c.closePath(); c.fill(); c.stroke(); }} />)}
    <Calendar p={[5.2, 4.8, -2.4]} month="VOR" day="2" s={1.9 * cal + 0.001} mark="TAGEN" markK={mk} />
    <Dust t={t} n={14} area={[6, 7, 3]} color="rgba(255,225,150,.9)" />
    {/* audience heads in the foreground */}
    {[10.8, 12.4].map((z, r) => Array.from({ length: 8 }, (_, i) => { const xx = -7 + i * 2 + (r % 2) * 0.8; return <React.Fragment key={r + "-" + i}><Box p={[xx, 0.8, z]} s={[1.6, 1.6, 0.3]} color="#7a0c22" line={3} /><Ball p={[xx, 1.95 + Math.sin(f * 0.07 + i + r) * 0.02, z - 0.3]} r={0.42} color={["#1b1b2a", "#2a1a12", "#3a2a4a", "#20203a"][(i + r) % 4]} /></React.Fragment>; }))}
    {/* the soloist in a tuxedo: plays, then takes a bow */}
    {bow < 0.5 ? <Player P={[0, 0, 0]} h={3.6} look={tux} f={f} t={t} mood="smile" /> : <Person p={[0, 0, 0]} h={3.6} look={tux} f={f} pose={{ mood: "grin", arms: "down", hunch: 0.9, squash: -0.1, tilt: 0.25 }} />}
    {bow < 0.5 ? <Notes p={[-0.4, 3.4, 0.4]} t={t} color="#ffe9a8" /> : null}
  </>);
};

/* ============ S8  32.3 - 36.35  "... einen Saal in Boston ausverkauft hat, Tickets um 100 Dollar." (reverse shot: the sold-out hall) ============ */
const K8: Key[] = [
  { t: 32.1, pos: [0, 4.6, 8.4], look: [0, 3.2, -6], fov: 62 },
  { t: 34.2, pos: [0.4, 4.0, 4.6], look: [0, 3.2, -6], fov: 56 },
  { t: 36.5, pos: [0.4, 3.6, 3.4], look: [0, 3.2, -6], fov: 52 },
];
export const S8 = ({ t, f }: Ctx) => {
  const stamp = seg(t, 33.55, 33.8, Easing.out(Easing.back(3.5))), tk = seg(t, 35.2, 35.7, Easing.out(Easing.back(2)));
  const cheer = t > 33.6 ? 1 : 0.3;
  return (<>
    <Cam t={t} keys={K8} impacts={[[33.6, 0.03]]} />
    <Lights warm="#ffd9b0" />
    <Floor kind="carpet" a="#5a0f22" b="#500c1e" unit={1.6} w={34} d={40} />
    <WallDoor z={-17} W={40} kind="wood" a="#6a1a2a" b="#5a1524" base="#2a0c14" unit={1.4} />
    <Curtain p={[-9, 5, -16.6]} s={[4, 10]} /><Curtain p={[9, 5, -16.6]} s={[4, 10]} />
    {/* balcony + risers */}
    <Box p={[0, 4.6, -13]} s={[22, 0.5, 3]} color="#3b0a18" /><Box p={[0, 5.2, -12.4]} s={[22, 0.9, 0.2]} color="#ffc23a" line={2} />
    {[-8, -4, 0, 4, 8].map((x) => <React.Fragment key={x}><Cyl p={[x, 8.6, -6]} rt={0.35} rb={0.2} h={0.9} color="#ffe9a8" /><Glow p={[x, 8.2, -6]} r={1.4} color="rgba(255,225,170,1)" o={0.5} /></React.Fragment>)}
    {[0, 1, 2].map((r) => Array.from({ length: 6 }, (_, i) => { const x = -6.2 + i * 2.5 + (r % 2) * 1.2, z = -2.2 - r * 2.8, y = r * 0.55, up = Math.abs(Math.sin(f * 0.35 + i * 1.3 + r)) * cheer;
      return <React.Fragment key={r + "-" + i}><Box p={[x, y + 0.7, z - 0.5]} s={[1.8, 1.4, 0.3]} color="#a3213a" line={3} /><Person p={[x, y, z]} h={3.0 - r * 0.1} look={crowd[(i + r * 3) % 8]} f={f + i * 5 + r} pose={{ mood: "grin", arms: "up", armK: 0.5 + 0.5 * up, squash: 0.03 * up }} /></React.Fragment>; }))}
    {/* SOLD OUT stamp slams on "ausverkauft" and a giant ticket arrives on "100 Dollar" */}
    <CanvasPlane p={[0, 8.6, -12]} s={[7 * stamp + 0.001, 2.5 * stamp + 0.001]} rot={[0, 0, -0.08]} px={[720, 256]} frame="#0b0d1a" draw={(c, W, H) => { c.fillStyle = "#fffaf0"; c.fillRect(0, 0, W, H); c.strokeStyle = "#e23b3b"; c.lineWidth = 18; c.strokeRect(20, 20, W - 40, H - 40); c.fillStyle = "#e23b3b"; c.font = "900 118px Inter, Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("AUSVERKAUFT", W / 2, H / 2 + 6); }} />
    <CanvasPlane p={[lerp(6, 0, tk), 5.6, -9]} s={[5.0 * (t > 35.1 ? 1 : 0.001), 2.2]} rot={[0, 0, lerp(0.5, -0.06, tk)]} px={[640, 280]} frame="#0b0d1a" draw={(c, W, H) => { c.fillStyle = "#ffd23a"; c.fillRect(0, 0, W, H); c.fillStyle = INK; c.font = "900 54px Inter, Arial"; c.textAlign = "center"; c.fillText("BOSTON  •  KONZERT", W / 2, 70); c.font = "900 150px Inter, Arial"; c.fillText("100 $", W / 2, 200); c.strokeStyle = INK; c.setLineDash([14, 12]); c.lineWidth = 6; c.beginPath(); c.moveTo(W * 0.86, 0); c.lineTo(W * 0.86, H); c.stroke(); }} />
    <Dust t={t} n={16} area={[7, 7, 4]} color="rgba(255,225,150,.9)" />
    <Shaft p={[-3, 6, -5]} s={[2.6, 12]} rot={[0, 0, 0.3]} color="255,220,160" o={0.14} />
    {/* stage lip + conductor's rail in the foreground */}
    <Box p={[0, 0.5, 6]} s={[20, 1.0, 0.5]} color="#3b0a18" line={3} /><Plant p={[-5.5, 1.0, 5.4]} s={1.1} pot="#ffc23a" /><Plant p={[5.5, 1.0, 5.4]} s={1.1} pot="#ffc23a" />
  </>);
};

/* ============ S9  36.35 - 40.55  "Gleiche Musik, gleicher Klang. Nur der Rahmen war ein anderer." (split world) ============ */
const K9: Key[] = [
  { t: 36.2, pos: [-0.5, 3.3, 10.8], look: [-0.1, 3.2, 0], fov: 54 },
  { t: 38.4, pos: [0.5, 3.3, 10.8], look: [0.1, 3.2, 0], fov: 54 },
  { t: 40.7, pos: [0, 3.6, 11.8], look: [0, 3.4, 0], fov: 54 },
];
export const S9 = ({ t, f }: Ctx) => {
  const fr = seg(t, 38.95, 39.6, Easing.out(Easing.bounce)), tg = seg(t, 38.6, 39.0, Easing.out(Easing.back(3))), glow = seg(t, 39.6, 40.2), HH = 3.2;
  return (<>
    <Cam t={t} keys={K9} />
    <Lights warm="#fff0d8" />
    {/* left: grey station, right: velvet hall, divided at x = 0 */}
    <Surface p={[-9, 0, 0]} s={[18, 30]} rot={[-Math.PI / 2, 0, 0]} kind="tile" a="#9aa6b2" b="#8f9ba8" unit={1.8} />
    <Surface p={[9, 0, 0]} s={[18, 30]} rot={[-Math.PI / 2, 0, 0]} kind="plank" a="#8a5a2e" b="#7a4e26" unit={1.6} />
    <Surface p={[-9, 4.5, -4]} s={[18, 9]} kind="brick" a="#6c7f94" b="#62758a" unit={1.1} /><Surface p={[9, 4.5, -4]} s={[18, 9]} kind="wood" a="#6a1a2a" b="#5a1524" unit={1.4} />
    <Box p={[0, 4.5, -3.9]} s={[0.14, 9, 0.3]} color="#ffc23a" line={2} />
    <Curtain p={[3.6, 4.6, -3.8]} s={[1.8, 9]} /><Curtain p={[5.6, 4.6, -3.8]} s={[1.8, 9]} />
    <Cyl p={[-3.8, 4.5, -3.4]} rt={0.4} h={9} color="#5b7a96" /><Cyl p={[-5.8, 4.5, -3.5]} rt={0.4} h={9} color="#5b7a96" /><Frame p={[-2.0, 7.4, -3.7]} s={[1.4, 1.0]} art={0} />
    <SpotCone p={[1.75, 10, 0]} h={10} r={1.9} color="#fff1c8" o={0.12} /><Glow p={[1.75, 0.1, 0]} r={2.2} color="rgba(255,236,190,1)" o={0.3} />
    <Glow p={[-1.75, 0.1, 0]} r={2.0} color="rgba(210,230,255,1)" o={0.2} /><Shaft p={[-3.6, 5, -2]} s={[1.6, 9]} rot={[0, 0, 0.3]} color="200,225,255" o={0.1} />
    <Plant p={[-3.6, 0, 0.8]} s={1.1} /><Plant p={[3.7, 0, 0.8]} s={1.1} pot="#ffc23a" /><Lamp p={[-0.9, 0, -2.2]} h={3.2} color="#cde8ff" /><Rug p={[1.75, 0.02, 0.6]} s={[3.6, 2.4]} a="#5a0f22" b="#ffc23a" />
    <Box p={[-1.75, 0.0, 1.0]} s={[1.8, 0.01, 0.8]} color="#241a18" /><Dust t={t} area={[6, 6, 4]} color="rgba(255,240,200,.9)" />
    <Player P={[-1.75, 0, 0]} h={HH} look={busker} f={f} t={t} mood="smile" /><Notes p={[-2.6, 3.0, 0.4]} t={t} amp={0.8} />
    <Player P={[1.75, 0, 0]} h={HH} look={busker} f={f} t={t} mood="smile" /><Notes p={[1.7, 3.0, 0.4]} t={t} color="#ffe9a8" amp={0.8} />
    {/* price tags + frames drop in on "Rahmen" */}
    <Sign p={[-1.75, 6.9, 0.4]} s={[1.8 * tg + 0.001, 0.8 * tg + 0.001]} text="32 $" bg="#fffaf0" fg="#111" size={90} /><Sign p={[1.75, 6.9, 0.4]} s={[1.9 * tg + 0.001, 0.8 * tg + 0.001]} text="100 $" bg="#ffd23a" fg="#111" size={90} />
    {[[-1.75, "#2b2b36", 0.1], [1.75, "#ffc23a", 0.24]].map(([x, col, th], i) => { const y = lerp(9, 0, fr); const w = 2.3, hh = 5.0, c = col as string, T = th as number, X = x as number;
      return <group key={i} position={[X, y, 0.9]}><Box p={[0, hh + T / 2 - 0.05, 0]} s={[w + T * 2, T, 0.3]} color={c} /><Box p={[0, 0.05 - T / 2 + 0.02, 0]} s={[w + T * 2, T, 0.3]} color={c} />
        <Box p={[-w / 2 - T / 2, hh / 2, 0]} s={[T, hh, 0.3]} color={c} /><Box p={[w / 2 + T / 2, hh / 2, 0]} s={[T, hh, 0.3]} color={c} />{i ? <><Ball p={[-w / 2 - T / 2, hh, 0.2]} r={0.26} color="#ffe27a" /><Ball p={[w / 2 + T / 2, hh, 0.2]} r={0.26} color="#ffe27a" /><Glow p={[0, hh / 2, 0.3]} r={3.2} color="rgba(255,215,110,1)" o={0.3 * glow} /></> : null}</group>; })}
  </>);
};

/* ============ S10  40.55 - 45.15  "Jedes Kind wollte stehen bleiben. Jedes wurde von seinen Eltern weitergezogen." ============ */
const K10: Key[] = [
  { t: 40.4, pos: [-0.4, 1.6, 10.0], look: [0.0, 2.0, 0], fov: 56 },
  { t: 43.0, pos: [0.2, 1.8, 9.2], look: [0.4, 2.1, 0], fov: 54 },
  { t: 45.4, pos: [0.6, 2.0, 8.6], look: [0.8, 2.2, 0], fov: 54 },
];
const tether = 1.9;
const pairs = [
  { stop: 41.3, kx: -1.3, vp: 1.9, z: 0.5, kid: { skin: "#fbe3c8", body: "#ff7a29", outfit: "hoodie" as const, hair: "short" as const, hairColor: "#3b2a1a" }, par: crowd[2] },
  { stop: 42.5, kx: -0.3, vp: 2.1, z: 1.6, kid: { skin: "#c98e62", body: "#ff4fa0", outfit: "hoodie" as const, hair: "bob" as const, hairColor: "#1a1010" }, par: crowd[4] },
  { stop: 43.4, kx: 0.6, vp: 2.3, z: -0.6, kid: { skin: "#fbe3c8", body: "#2f8cff", outfit: "shirt" as const, hair: "short" as const, hairColor: "#c47a2a" }, par: crowd[6] },
];
export const S10 = ({ t, f }: Ctx) => {
  return (<>
    <Cam t={t} keys={K10} />
    <Lights warm="#ffe6c8" />
    <Floor kind="tile" a="#d9c8a6" b="#cdbb98" unit={2.0} w={40} d={30} />
    <WallDoor z={-6} W={40} kind="brick" a="#d98a5a" b="#cf8050" base="#7a4326" unit={1.2} />
    <Cyl p={[-2.8, 4.5, -4.2]} rt={0.5} h={9} color="#6f93a8" /><Cyl p={[4.6, 4.5, -4.4]} rt={0.5} h={9} color="#6f93a8" /><Frame p={[0.8, 3.6, -5.9]} s={[1.8, 2.6]} art={2} /><Frame p={[-4.6, 3.4, -5.9]} s={[1.8, 2.4]} art={1} />
    <Box p={[0, 0.03, 2.9]} s={[40, 0.05, 0.5]} color="#ffcf2e" line={1} /><Rug p={[0.4, 0.02, -1.0]} s={[6, 3]} a="#6f93a8" b="#ffd23a" /><Plant p={[-4.2, 0, -3]} s={1.3} /><Plant p={[5.2, 0, -3.4]} s={1.3} /><Lamp p={[3.4, 0, -3.6]} h={3.2} color="#ffe9a8" />
    <Shaft p={[1.0, 4.5, -2]} s={[2.4, 10]} rot={[0, 0, 0.35]} color="255,214,150" o={0.2} /><Dust t={t} area={[6, 6, 4]} color="rgba(255,236,190,.9)" />
    {/* the violinist keeps playing behind them */}
    <Player P={[1.7, 0, -2.6]} h={3.3} look={busker} f={f} t={t} mood="smile" /><Notes p={[1.3, 3.2, -2.2]} t={t} n={4} amp={0.8} />
    {pairs.map((p, i) => {
      const pxStop = p.kx + tether, t0 = p.stop - 2.2, x0 = pxStop - p.vp * (p.stop - t0);
      const u = Math.max(0, t - t0), px = x0 + p.vp * u;                          // the parent never slows down
      const kX = t < p.stop ? px - tether : Math.max(p.kx, px - tether - 0.7);   // the kid plants its feet; the arm stretches, then drags it
      const walking = t < p.stop - 0.3, dragged = kX > p.kx + 0.001 && t >= p.stop, planting = !walking && !dragged;
      return (<React.Fragment key={i}>
        <Person p={[px, 0, p.z]} h={3.4} look={p.par} f={f + i * 11} pose={{ walk: p.vp * u * WALK, speed: 1, mood: "deadpan", armL: [-0.34, 0.42], armLK: 1, tilt: dragged ? 0.08 : 0 }} />
        <Person p={[kX, 0, p.z + 0.05]} h={2.0} look={p.kid} f={f + i * 5} pose={{ walk: walking || dragged ? (kX - x0) * WALK * 1.6 : undefined, speed: walking ? 1 : dragged ? 0.5 : 0, mood: dragged ? "worry" : "grin", lookX: walking ? 0.3 : 1, armR: [0.34, 0.58], armRK: 1, tilt: dragged ? -0.2 : 0, hunch: dragged ? 0.4 : 0, squash: planting ? -0.06 * Math.exp(-(t - p.stop + 0.3) * 4) : 0 }} />
      </React.Fragment>);
    })}
  </>);
};

/* ============ S11  45.15 - 49.9  "Menschen bewerten nicht den Wert, sie bewerten den Rahmen, in dem man ihn ihnen zeigt." ============ */
const K11: Key[] = [
  { t: 45.0, pos: [0, 3.4, 3.9], look: [0, 3.3, -3], fov: 42 },
  { t: 47.3, pos: [0.2, 3.6, 8.6], look: [0, 3.7, -3], fov: 54 },
  { t: 49.0, pos: [0.4, 3.9, 12.4], look: [0, 3.9, -3], fov: 56 },
  { t: 50.2, pos: [0.4, 4.0, 13.4], look: [0, 3.9, -3], fov: 56 },
];
export const S11 = ({ t, f }: Ctx) => {
  const rahmen = seg(t, 47.6, 48.3, Easing.out(Easing.back(2.5))), tag = seg(t, 48.6, 49.1, Easing.out(Easing.back(2.5))), wert = seg(t, 46.3, 46.8);
  return (<>
    <Cam t={t} keys={K11} />
    <Lights warm="#ffe9c8" />
    <Floor kind="marble" a="#e7dcc8" b="#ddd0b8" unit={2.4} w={40} d={30} />
    <WallDoor z={-5} W={40} kind="plain" a="#3a2a66" b="#3a2a66" base="#1a1034" />
    {/* the painting: a framed little stage with the busker, gold frame on a museum wall */}
    <Box p={[0, 4.2, -4.8]} s={[7.4, 8.4, 0.3]} color="#2a1d52" />
    <CanvasPlane p={[0, 4.2, -4.62]} s={[6.2, 7.4]} px={[310, 370]} draw={(c, W, H) => { const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#5aa0e8"); g.addColorStop(1, "#e8b46a"); c.fillStyle = g; c.fillRect(0, 0, W, H); c.fillStyle = "#9bb0c4"; c.fillRect(0, H * 0.78, W, H * 0.22); c.fillStyle = "#6f93a8"; c.fillRect(W * 0.1, 0, 36, H * 0.78); c.fillRect(W * 0.84, 0, 36, H * 0.78); }} />
    {(() => { const T = 0.5; const w = 6.6, hh = 7.8; return <group position={[0, 0.3, -4.5]}><Box p={[0, hh + T / 2, 0]} s={[w + T * 2, T, 0.4]} color="#ffc23a" /><Box p={[0, -T / 2 + 0.0, 0]} s={[w + T * 2, T, 0.4]} color="#ffc23a" /><Box p={[-w / 2 - T / 2, hh / 2, 0]} s={[T, hh + T, 0.4]} color="#ffc23a" /><Box p={[w / 2 + T / 2, hh / 2, 0]} s={[T, hh + T, 0.4]} color="#ffc23a" />
      {[[-1, 1], [1, 1], [-1, 0], [1, 0]].map(([sx, sy], i) => <Ball key={i} p={[sx * (w / 2 + T / 2), sy ? hh : 0, 0.25]} r={0.42} color="#ffe27a" />)}<Glow p={[0, hh / 2, 0.4]} r={5.6} color="rgba(255,200,90,1)" o={0.18 * rahmen} /></group>; })()}
    <Player P={[0, 0.3, -4.0]} h={3.6} look={busker} f={f} t={t} mood="smile" /><Notes p={[-0.4, 3.7, -3.6]} t={t} />
    {/* neighbours: the cheap frame gets a glance, the gold one gets the crowd */}
    <Frame p={[-8.6, 4.4, -4.8]} s={[2.4, 3.2]} art={1} /><Frame p={[8.6, 4.4, -4.8]} s={[2.4, 3.2]} art={2} />
    <Sign p={[4.8, 1.8, -4.4]} s={[2.4 * tag + 0.001, 1.2 * tag + 0.001]} text={"WERT\n3,5 Mio $"} bg="#fffaf0" fg="#111" size={54} />
    <Cyl p={[-3.8, 0.55, 0.4]} rt={0.09} h={1.1} color="#ffc23a" /><Cyl p={[3.8, 0.55, 0.4]} rt={0.09} h={1.1} color="#ffc23a" /><Box p={[0, 0.9, 0.4]} s={[7.6, 0.06, 0.06]} color="#b3122e" line={2} />
    <Plant p={[-6.2, 0, -2.4]} s={1.4} pot="#ffc23a" /><Plant p={[6.4, 0, -2.4]} s={1.4} pot="#ffc23a" /><Rug p={[0, 0.02, 1.6]} s={[9, 5]} a="#4a3590" b="#b3122e" />
    {/* visitors admire the frame, not the man */}
    {[[-3.0, 2.2, 5], [-1.2, 3.4, 2], [1.6, 3.0, 4], [3.4, 2.0, 6]].map(([x, z, k], i) => <Person key={i} p={[x, 0, z]} h={3.2} look={crowd[k as number]} f={f + i * 9} pose={{ mood: rahmen > 0.5 ? "grin" : "smile", lookX: (x as number) < 0 ? 1 : -1, flip: (x as number) > 0, arms: rahmen > 0.5 ? "up" : "chest", armK: 0.35 + 0.65 * rahmen, squash: 0.02 * Math.sin(f * 0.3 + i) }} />)}
    <Dust t={t} area={[6, 7, 4]} color="rgba(255,236,190,.9)" />
    <Stars p={[0, 0, -30]} s={[1, 1]} t={0} n={1} />
    <Shaft p={[-3.4, 6, -2]} s={[2.4, 11]} rot={[0, 0, 0.32]} color="255,236,170" o={0.14} />
    {void wert}{void camAt}{void Clock}{void Card}{void Curtain}{void Globe}{void hand}{void clamp}{void rnd}{void Violin}{void Bow}{void woman}{void Lights}
  </>);
};
