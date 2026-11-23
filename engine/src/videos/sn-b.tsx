// Clip 2 "Tür zehn" - narrated by Reid; 15 scenes locked to public/tuer10/words.json.
import React from "react";
import { Easing } from "remotion";
import { Calendar, Clock, Lights } from "../style/kit";
import { Cam, Key } from "../style/extra";
import { Ctx, P, Person, Box, Cyl, Ball, CanvasPlane, INK, Sign, FaceGroup, hand, Floor, WallDoor, SideWall, Glow, Plant, Frame, Rug, Dust, Flat, Street, Lager, Dog, Poster, drawText, StaticClock, InfoCard, emre, opa, frau, mutter, seg, lerp, wordAt, W, V3, talkTilt } from "./sn-common";
import words from "../../public/tuer10/words.json";
import script from "../../public/tuer10/script.json";

export const wt = wordAt(words as W[], script as string[]);
const mv = (t: number, a: number, b: number, x0: number, x1: number) => { const k = seg(t, a, b, Easing.inOut(Easing.sin)); const x = lerp(x0, x1, k); return { x, walking: k > 0.01 && k < 0.99, phase: x * 3.4, flip: x1 < x0 }; };
const bounce = (t: number, a: number) => (t > a ? Math.exp(-(t - a) * 6) : 0);

/* 1 (0-3.7) the old job: Emre stacks crates in the depot */
const K1: Key[] = [{ t: 0, pos: [0.4, 3.2, 9.6], look: [0, 2.6, -4.4], fov: 54 }, { t: 3.9, pos: [0.2, 3.0, 8.0], look: [0, 2.7, -4.2], fov: 50 }];
export const B1 = ({ t, f }: Ctx) => {
  const age = seg(t, wt("27"), wt("27") + 0.3, Easing.out(Easing.back(2.4)));
  return (<>
    <Cam t={t} keys={K1} /><Lager t={t} />
    <Person p={[0.6, 0, -3.6]} h={3.9} look={{ ...emre, badge: undefined, mustache: undefined, body: P.Y3, sleeve: P.Y3 }} f={f} pose={{ mood: "smile", arms: "box", armK: 0.9, hunch: 0.3, squash: 0.02 * Math.sin(t * 3) }} />
    <FaceGroup p={[0.6, 0, -3.6]}><Box p={[0.05, 1.95, 0.3]} s={[1.0, 0.8, 0.8]} color={P.K3} line={3} /></FaceGroup>
    <Poster p={[-1.8, 5.0, -3.0]} s={[1.5, 0.9]} k={age} draw={drawText("27", P.Y2, INK, 150)} />
  </>);
};

/* 2 (3.7-6.7) the mail */
const K2: Key[] = [{ t: 3.5, pos: [0.0, 3.4, 8.8], look: [0, 3.2, -4.4], fov: 54 }, { t: 6.9, pos: [0.0, 3.3, 7.2], look: [0, 3.3, -4.4], fov: 49 }];
export const B2 = ({ t, f }: Ctx) => {
  const m = seg(t, wt("Mail"), wt("Mail") + 0.4, Easing.out(Easing.back(2.2))), shock = seg(t, wt("Mail") + 0.5, wt("Mail") + 0.75, Easing.out(Easing.back(3)));
  return (<>
    <Cam t={t} keys={K2} /><Flat t={t} />
    <Poster p={[2.0, 4.9, -3.2]} s={[2.8, 1.8]} k={m} draw={(c, W2, H) => { c.fillStyle = P.K1; c.fillRect(0, 0, W2, H); c.fillStyle = P.V3; c.fillRect(0, 0, W2, 62); c.fillStyle = "#fff"; c.font = "700 32px Inter, Arial"; c.textAlign = "left"; c.fillText("✉  Neue Nachricht · Di 08:12", 18, 42); c.fillStyle = INK; c.font = "800 44px Inter, Arial"; c.fillText("Ihre Stelle entfällt.", 18, 150); c.fillStyle = P.C3; c.fillRect(18, 190, W2 - 36, 14); c.fillRect(18, 220, W2 - 100, 14); c.fillRect(18, 250, W2 - 60, 14); }} />
    <Person p={[-1.0, 0, -3.4]} h={3.9} look={{ ...emre, body: P.K4, sleeve: P.K4 }} f={f} pose={{ mood: shock > 0.4 ? "shock" : "smile", arms: shock > 0.4 ? "head" : "hold", armK: Math.max(0.5, shock), air: shock * 0.1, squash: -0.07 * shock, hunch: shock * 0.4, lookX: 1 }} />
  </>);
};

/* 3 (6.7-14.0) first front door, folder, 212 euro */
const K3: Key[] = [{ t: 6.5, pos: [-2.4, 3.2, 8.4], look: [-1.0, 2.6, -5.0], fov: 56 }, { t: 10.5, pos: [0.0, 3.1, 7.6], look: [0.4, 2.6, -5.0], fov: 52 }, { t: 14.2, pos: [0.6, 3.0, 6.8], look: [0.2, 2.6, -5.0], fov: 50 }];
export const B3 = ({ t, f }: Ctx) => {
  const w = mv(t, 6.8, 10.2, -5.2, -0.6), cash = seg(t, wt("212"), wt("212") + 0.4, Easing.out(Easing.back(2.2)));
  return (<>
    <Cam t={t} keys={K3} /><Street t={t} num="1" />
    <Person p={[w.x, 0, -4.0]} h={3.7} look={emre} f={f} pose={{ walk: w.walking ? w.phase : undefined, speed: w.walking ? 1 : 0, mood: "smile", arms: "hold", armK: 0.6, flip: false, squash: w.walking ? 0 : 0.01 * Math.sin(t * 2.2) }} />
    <FaceGroup p={[w.x, 0, -4.0]}><Box p={[0.45, 1.35, 0.25]} s={[0.9, 1.2, 0.2]} color={P.C2} line={3} /></FaceGroup>
    <Poster p={[2.6, 5.0, -3.6]} s={[2.6, 1.1]} k={cash} draw={drawText("212 €", P.K1, P.C3, 100, "Kontostand")} />
  </>);
};

/* 4 (14.0-22.6) door one, two and three */
const K4: Key[] = [{ t: 13.8, pos: [-6.0, 3.0, 6.8], look: [-6.4, 2.5, -5.0], fov: 52 }, { t: 16.9, pos: [-1.0, 3.0, 6.8], look: [-0.6, 2.5, -5.0], fov: 52 }, { t: 19.6, pos: [3.0, 3.0, 6.8], look: [5.2, 2.5, -5.0], fov: 52 }, { t: 22.8, pos: [5.0, 3.0, 6.2], look: [6.6, 2.5, -5.0], fov: 50 }];
export const B4 = ({ t, f }: Ctx) => {
  const t2 = wt("zwei", 36), t3 = wt("drei", 44), tAll = wt("alles"), a = mv(t, 13.9, 14.9, -8.4, -6.4), b = mv(t, t2 - 0.5, t2 + 0.2, -3.0, -0.8), c = mv(t, t3 - 0.5, t3 + 0.2, 3.2, 5.8);
  const x = t < t2 - 0.6 ? a : t < t3 - 0.6 ? b : c, o2 = seg(t, t2 + 0.6, t2 + 1.0), o3 = seg(t, t3 + 0.8, t3 + 1.2);
  return (<>
    <Cam t={t} keys={K4} impacts={[[t2 + 0.9, 0.012]]} /><Street t={t} opens={[0, o2, o3]} nums={["1", "2", "3"]} />
    <Poster p={[-6.4, 5.3, -5.4]} s={[1.9, 0.7]} k={seg(t, wt("niemand"), wt("niemand") + 0.3)} draw={drawText("niemand da", P.K1, INK, 56)} />
    {o2 > 0.1 ? <Dog p={[-0.2, 0, -5.6]} bark={Math.sin(t * 16)} t={t} flip={false} /> : null}
    {o2 > 0.1 ? <Poster p={[-1.4, 4.6, -4.0]} s={[1.6, 0.8]} k={Math.sin(t * 9) > 0 ? 1 : 0.85} draw={drawText("WUFF!", P.C2, "#fff", 100)} /> : null}
    {o3 > 0.1 ? <Person p={[6.65, 0, -5.55]} h={3.0} look={opa} f={f} pose={{ mood: "deadpan", arms: "up", armK: 0.7 + 0.3 * Math.sin(t * 7), tilt: Math.sin(t * 7) * 0.05 }} /> : null}
    {o3 > 0.1 ? <Poster p={[5.2, 5.2, -4.0]} s={[2.9, 0.8]} k={seg(t, tAll, tAll + 0.3, Easing.out(Easing.back(2)))} draw={drawText("Wir haben schon alles.", P.K1, INK, 44)} /> : null}
    <Person p={[x.x, 0, -4.1]} h={3.7} look={emre} f={f} pose={{ walk: x.walking ? x.phase : undefined, speed: x.walking ? 1 : 0, mood: t > t2 + 1 && t < t2 + 2.4 ? "shock" : t > t3 + 1 ? "worry" : "smile", arms: "hold", armK: 0.5, flip: false, squash: 0.01 * Math.sin(t * 2.2), hunch: t > t3 + 1 ? 0.4 : 0 }} />
    <Poster p={[x.x, 6.0, -4.2]} s={[1.5, 0.7]} k={1} draw={drawText(t < t2 - 0.6 ? "TÜR 1" : t < t3 - 0.6 ? "TÜR 2" : "TÜR 3", P.Y2, INK, 80)} />
  </>);
};

/* 5 (22.6-26.9) door ten: the towel woman slams the door */
const K5: Key[] = [{ t: 22.4, pos: [-1.4, 2.8, 6.8], look: [0.0, 2.4, -5.4], fov: 54 }, { t: 25.0, pos: [0.8, 2.7, 5.8], look: [0.2, 2.4, -5.4], fov: 50 }, { t: 27.2, pos: [0.9, 2.7, 5.5], look: [0.2, 2.4, -5.4], fov: 49 }];
export const B5 = ({ t, f }: Ctx) => {
  const tF = wt("Frau", 52), tSlam = wt("zu", 62) + 0.02, openK = seg(t, tF - 0.2, tF + 0.45) * (1 - seg(t, tSlam - 0.12, tSlam + 0.04, Easing.in(Easing.quad))), jerk = bounce(t, tSlam);
  return (<>
    <Cam t={t} keys={K5} impacts={[[tSlam, 0.07]]} /><Street t={t} open={openK} num="10" />
    {t > tF - 0.2 && t < tSlam + 0.05 ? <Person p={[0.25, 0, -5.55]} h={3.2} look={frau} f={f} pose={{ mood: "angry", arms: "point", armK: 0.6, squash: 0.02 * Math.sin(t * 9) }} /> : null}
    <Person p={[-0.5, 0, -4.2 - jerk * 0.2]} h={3.7} look={emre} f={f} pose={{ mood: t > tSlam ? "shock" : "grin", arms: "point", armK: 0.6, squash: -0.07 * jerk, air: jerk * 0.15, hunch: jerk * 0.5 }} />
    <Poster p={[0, 5.9, -4.2]} s={[1.7, 0.8]} k={seg(t, 22.7, 23.1, Easing.out(Easing.back(2)))} draw={drawText("TÜR 10", P.Y2, INK, 86)} />
    {t > tSlam && t < tSlam + 0.6 ? <Poster p={[1.1, 4.7, -4.0]} s={[1.4, 0.85]} k={seg(t, tSlam, tSlam + 0.12, Easing.out(Easing.back(3)))} draw={drawText("PENG!", P.C2, "#fff", 140)} /> : null}
  </>);
};

/* 6 (26.9-33.6) ten minutes on the stairs, job ads for the depot */
const K6: Key[] = [{ t: 26.7, pos: [0.0, 3.2, 8.4], look: [0, 2.2, -4.0], fov: 54 }, { t: 33.8, pos: [0.3, 3.0, 6.6], look: [0.2, 2.0, -4.0], fov: 48 }];
export const B6 = ({ t, f }: Ctx) => {
  const ad = Math.floor((t - 28) * 0.8) % 3, hs = ["Lager: Mitarbeiter gesucht", "Kommissionierer (m/w/d)", "Gabelstapler gesucht"];
  return (<>
    <Cam t={t} keys={K6} /><Street t={t} num="10" />
    {[0, 1, 2].map((i) => <Box key={i} p={[0, 0.2 + i * 0.4, -3.4 + i * 0.5]} s={[3.6, 0.4, 1.0]} color={P.K2} line={3} />)}
    <Person p={[0.1, 0.35, -3.1]} h={3.4} look={{ ...emre, badge: undefined }} f={f} pose={{ mood: "worry", arms: "chest", armK: 0.8, hunch: 0.9, sweat: 0.4, squash: 0.012 * Math.sin(t * 2.2), tilt: 0.04 }} />
    <Poster p={[1.3, 4.5, -3.2]} s={[2.8, 0.8]} k={seg(t, 28.0, 28.4, Easing.out(Easing.back(2)))} draw={drawText(hs[Math.max(0, ad)], P.K1, INK, 44)} />
    <Clock p={[-1.6, 5.2, -3.6]} r={0.8} t={t} speed={10} />
    <Poster p={[-1.4, 3.7, -3.5]} s={[1.9, 0.6]} k={seg(t, wt("zehn", 70), wt("zehn", 70) + 0.3)} draw={drawText("10 Minuten", P.Y2, INK, 60)} />
  </>);
};

/* 7 (33.6-37.3) week one, week two: no contract */
const K7: Key[] = [{ t: 33.4, pos: [0.0, 3.4, 9.2], look: [0, 3.3, -4.4], fov: 54 }, { t: 37.5, pos: [0.0, 3.3, 7.6], look: [0, 3.3, -4.4], fov: 50 }];
export const B7 = ({ t, f }: Ctx) => {
  const w1 = seg(t, wt("eins", 84), wt("eins", 84) + 0.3, Easing.out(Easing.back(2))), w2 = seg(t, wt("zwei", 84), wt("zwei", 84) + 0.3, Easing.out(Easing.back(2)));
  const card = (title: string) => (c: CanvasRenderingContext2D, W2: number, H: number) => { c.fillStyle = P.K1; c.fillRect(0, 0, W2, H); c.fillStyle = P.V3; c.fillRect(0, 0, W2, 70); c.fillStyle = "#fff"; c.font = "800 42px Inter, Arial"; c.textAlign = "center"; c.fillText(title, W2 / 2, 50); c.fillStyle = P.C2; c.font = "800 170px Inter, Arial"; c.fillText("0", W2 / 2, 220); c.fillStyle = INK; c.font = "600 34px Inter, Arial"; c.fillText("Verträge", W2 / 2, 270); };
  return (<>
    <Cam t={t} keys={K7} /><Flat t={t} />
    <Poster p={[-2.0, 4.1, -4.0]} s={[2.5, 2.7]} k={w1} draw={card("WOCHE 1")} /><Poster p={[1.2, 4.1, -4.0]} s={[2.5, 2.7]} k={w2} draw={card("WOCHE 2")} />
    <Person p={[0.0, 0, -2.4]} h={3.6} look={{ ...emre, badge: undefined }} f={f} pose={{ mood: "worry", arms: "shrug", armK: 0.8, sweat: 0.3, hunch: 0.5 }} />
  </>);
};

/* 8 (37.3-41.4) rent due, empty fridge */
const K8: Key[] = [{ t: 37.1, pos: [-1.0, 3.3, 8.6], look: [-2.0, 2.8, -4.6], fov: 54 }, { t: 41.6, pos: [-1.8, 3.2, 6.6], look: [-2.4, 2.6, -5.0], fov: 49 }];
export const B8 = ({ t, f }: Ctx) => {
  const miete = seg(t, wt("Miete"), wt("Miete") + 0.35, Easing.out(Easing.back(2.2))), fr = seg(t, wt("Kühlschrank"), wt("Kühlschrank") + 0.6), leer = seg(t, wt("leer"), wt("leer") + 0.3, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K8} /><Flat t={t} fridge={fr} />
    <Poster p={[1.4, 4.8, -4.0]} s={[2.6, 1.5]} k={miete} draw={(c, W2, H) => { c.fillStyle = P.K1; c.fillRect(0, 0, W2, H); c.fillStyle = P.C2; c.fillRect(0, 0, W2, 74); c.fillStyle = "#fff"; c.font = "800 46px Inter, Arial"; c.textAlign = "center"; c.fillText("MIETE", W2 / 2, 54); c.fillStyle = INK; c.font = "800 56px Inter, Arial"; c.fillText("fällig", W2 / 2, 160); c.strokeStyle = P.C2; c.lineWidth = 8; c.strokeRect(W2 / 2 - 110, 112, 220, 72); }} />
    <Poster p={[-3.6, 5.2, -4.2]} s={[1.3, 0.7]} k={leer} draw={drawText("leer", P.C2, "#fff", 80)} />
    <Person p={[-1.2, 0, -3.3]} h={3.7} look={{ ...emre, badge: undefined }} f={f} pose={{ mood: "worry", arms: "chest", armK: 0.8, hunch: 0.7, lookX: -1, sweat: 0.3 }} />
  </>);
};

/* 9 (41.4-44.6) mother on the phone */
const K9: Key[] = [{ t: 41.2, pos: [0.4, 3.3, 8.6], look: [0, 3.4, -4.0], fov: 54 }, { t: 44.8, pos: [0.2, 3.3, 7.0], look: [0, 3.5, -4.0], fov: 49 }];
export const B9 = ({ t, f }: Ctx) => {
  const b = seg(t, wt("Mutter"), wt("Mutter") + 0.4, Easing.out(Easing.back(2))), q = seg(t, wt("Festes"), wt("Festes") + 0.3, Easing.out(Easing.back(2.5)));
  return (<>
    <Cam t={t} keys={K9} /><Flat t={t} />
    <Person p={[-1.6, 0, -3.5]} h={3.8} look={{ ...emre, badge: undefined }} f={f} pose={{ mood: "worry", armR: [0.2, 0.72], armRK: 1, hunch: 0.4, sweat: 0.2, squash: 0.01 * Math.sin(t * 2.2) }} />
    <FaceGroup p={[-1.6, 0, -3.5]}><Box p={hand(3.8, [0.2, 0.72], 0, false, 0.24)} s={[0.16, 0.36, 0.05]} color="#1b1b2a" line={2} rot={[0, 0, -0.15]} /></FaceGroup>
    <group position={[1.9, 4.3, -3.2]} scale={b + 0.001}>{[[-0.9, 0.2, 0.7], [0.9, 0.3, 0.8], [0, 0.8, 0.9], [0, -0.4, 0.8]].map(([x, y, r], i) => <Ball key={i} p={[x, y, 0]} r={r} color="#fffaf0" ink={0.04} />)}<Person p={[0, -0.9, 1.2]} h={2.2} look={mutter} f={f} pose={{ mood: "worry", arms: "chest", armK: 0.7, tilt: talkTilt(t, true, 0.05) }} /></group>
    <Poster p={[0.4, 6.2, -3.0]} s={[3.0, 0.9]} k={q} draw={drawText("lieber was Festes?", P.K1, INK, 44)} />
  </>);
};

/* 10 (44.6-48.9) Sunday: he writes down what went wrong */
const K10: Key[] = [{ t: 44.4, pos: [0.0, 4.6, 8.0], look: [0, 2.2, -3.6], fov: 54 }, { t: 49.1, pos: [0.0, 5.0, 6.4], look: [0, 1.8, -3.4], fov: 48 }];
export const B10 = ({ t, f }: Ctx) => {
  const pages = seg(t, wt("Zwei", 112), wt("Zwei", 112) + 0.35, Easing.out(Easing.back(2.2)));
  return (<>
    <Cam t={t} keys={K10} /><Flat t={t} />
    <Box p={[0, 1.1, -3.6]} s={[4.0, 0.16, 2.0]} color={P.Y3} /><Cyl p={[-1.6, 0.55, -3.2]} rt={0.12} h={1.1} color={P.Y4} /><Cyl p={[1.6, 0.55, -3.2]} rt={0.12} h={1.1} color={P.Y4} />
    <Box p={[-0.5, 1.2, -3.4]} s={[1.5, 0.03, 1.9]} color={P.K1} line={2} rot={[0, 0.06, 0]} /><Box p={[0.5, 1.2, -3.4]} s={[1.5, 0.03, 1.9]} color={P.K1} line={2} rot={[0, -0.05, 0]} />
    {Array.from({ length: 6 }, (_, i) => <Box key={i} p={[-0.5 + (i % 2) * 1.0, 1.23, -4.1 + Math.floor(i / 2) * 0.6]} s={[1.0 * seg(t, 45 + i * 0.5, 45.5 + i * 0.5), 0.02, 0.1]} color={P.C2} line={0} />)}
    <Person p={[0, 0, -4.4]} h={3.8} look={{ ...emre, badge: undefined }} f={f} pose={{ mood: "deadpan", armR: [0.1, 0.34 + 0.01 * Math.sin(t * 8)], armRK: 1, hunch: 0.8, tilt: 0.05, squash: 0.01 * Math.sin(t * 2) }} />
    <Poster p={[0, 4.2, -3.6]} s={[2.4, 0.9]} k={pages} draw={drawText("2 Seiten", P.Y2, INK, 84)} />
  </>);
};

/* 11 (48.9-54.7) most rejections come in the first ten seconds */
const K11: Key[] = [{ t: 48.7, pos: [0.0, 3.4, 9.6], look: [0, 3.4, -4.2], fov: 54 }, { t: 54.9, pos: [0.0, 3.4, 8.0], look: [0, 3.4, -4.2], fov: 50 }];
export const B11 = ({ t, f }: Ctx) => {
  const bar = seg(t, wt("zehn", 122), wt("zehn", 122) + 1.6, Easing.inOut(Easing.cubic)), sat = seg(t, wt("Satz", 131), wt("Satz", 131) + 0.4, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K11} /><Flat t={t} />
    <Box p={[0, 3.6, -5.8]} s={[6.2, 3.6, 0.2]} color={P.K1} line={4} />
    <Poster p={[0, 4.9, -5.6]} s={[5.4, 0.6]} k={1} draw={drawText("Absagen nach Sekunden", P.K1, INK, 44)} />
    {Array.from({ length: 10 }, (_, i) => { const h = [2.0, 1.6, 0.8, 0.5, 0.3, 0.2, 0.1, 0.1, 0.05, 0.05][i] * bar; return <Box key={i} p={[-2.4 + i * 0.53, 2.1 + h / 2, -5.6]} s={[0.4, Math.max(0.03, h), 0.2]} color={i < 3 ? P.C2 : P.T2} line={2} />; })}
    <Box p={[0, 2.08, -5.62]} s={[5.6, 0.05, 0.05]} color={INK} line={0} />
    <Poster p={[1.6, 5.8, -4.6]} s={[2.8, 0.8]} k={sat} draw={drawText("erster Satz", P.Y2, INK, 66)} />
    <Person p={[2.6, 0, -3.4]} h={3.8} look={{ ...emre, badge: undefined }} f={f} pose={{ mood: "smile", arms: t > wt("Satz", 131) ? "point" : "hold", armK: 0.7, flip: true, squash: 0.01 * Math.sin(t * 2.2), tilt: talkTilt(t, true, 0.015) }} />
  </>);
};

/* 12 (54.7-61.8) the new opening line */
const K12: Key[] = [{ t: 54.5, pos: [0.0, 3.2, 8.6], look: [0, 2.8, -4.6], fov: 54 }, { t: 61.9, pos: [0.4, 3.1, 7.0], look: [0.2, 2.9, -4.6], fov: 49 }];
export const B12 = ({ t, f }: Ctx) => {
  const old = seg(t, wt("Statt"), wt("Statt") + 0.3, Easing.out(Easing.back(2))), x = seg(t, wt("Haben"), wt("Haben") + 0.8), neu = seg(t, wt("Was", 143), wt("Was", 143) + 0.35, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K12} /><Street t={t} num="12" opens={[0, 0.9, 0]} />
    <Person p={[0.25, 0, -5.55]} h={3.1} look={{ ...opa, hair: "short", hairColor: "#4a2a1a", glasses: false, body: P.V2, sleeve: P.V2 }} f={f} pose={{ mood: neu > 0.5 ? "smile" : "deadpan", arms: neu > 0.5 ? "chest" : undefined, armK: 0.6, tilt: neu > 0.5 ? 0.04 : 0 }} />
    <Person p={[-1.4, 0, -4.1]} h={3.7} look={emre} f={f} pose={{ mood: "smile", arms: "point", armK: 0.5, tilt: talkTilt(t, true, 0.02), squash: 0.012 * Math.sin(t * 2.2) }} />
    <Poster p={[-1.4, 4.9, -3.6]} s={[3.0, 0.8]} k={old} draw={(c, W2, H) => { drawText("Haben Sie kurz Zeit?", P.K2, P.K4, 48)(c, W2, H); if (x > 0) { c.strokeStyle = P.C2; c.lineWidth = 10; c.beginPath(); c.moveTo(20, H / 2); c.lineTo(20 + (W2 - 40) * x, H / 2); c.stroke(); } }} />
    <Poster p={[0.4, 6.2, -3.6]} s={[3.6, 1.4]} k={neu} draw={drawText("Was nervt Sie gerade am\nmeisten an Ihren Fixkosten?", P.Y2, INK, 40)} />
  </>);
};

/* 13 (61.8-66.5) door 17, the retiree invites him for tea */
const K13: Key[] = [{ t: 61.6, pos: [-1.0, 2.8, 7.0], look: [0.0, 2.5, -5.4], fov: 54 }, { t: 66.7, pos: [0.4, 2.8, 6.0], look: [0.2, 2.5, -5.4], fov: 50 }];
export const B13 = ({ t, f }: Ctx) => {
  const o = seg(t, wt("Tür", 154) + 0.3, wt("Tür", 154) + 1.0), tee = seg(t, wt("Tee", 154), wt("Tee", 154) + 0.35, Easing.out(Easing.back(2.4)));
  return (<>
    <Cam t={t} keys={K13} /><Street t={t} num="17" open={o} />
    {o > 0.05 ? <Person p={[0.25, 0, -5.55]} h={3.1} look={opa} f={f} pose={{ mood: "smile", arms: "point", armK: 0.6, tilt: talkTilt(t, true, 0.04) }} /> : null}
    <Person p={[-1.6, 0, -4.2]} h={3.6} look={emre} f={f} pose={{ mood: "grin", arms: "hold", armK: 0.5, squash: 0.01 * Math.sin(t * 2.4) }} />
    <Poster p={[0, 5.9, -4.3]} s={[1.7, 0.8]} k={seg(t, 61.9, 62.3, Easing.out(Easing.back(2)))} draw={drawText("TÜR 17", P.Y2, INK, 86)} />
    <Poster p={[1.5, 4.7, -3.9]} s={[1.5, 1.3]} k={tee} draw={drawText("☕", P.K1, P.C3, 150)} />
  </>);
};

/* 14 (66.5-68.9) two hours later: signature */
const K14: Key[] = [{ t: 66.3, pos: [0.0, 4.0, 8.0], look: [0, 2.2, -3.8], fov: 52 }, { t: 69.1, pos: [0.0, 4.6, 6.6], look: [0, 1.6, -3.6], fov: 47 }];
export const B14 = ({ t, f }: Ctx) => {
  const sign = seg(t, wt("unterschreibt"), wt("unterschreibt") + 0.7), tick = seg(t, wt("unterschreibt") + 0.6, wt("unterschreibt") + 0.9, Easing.out(Easing.back(3)));
  return (<>
    <Cam t={t} keys={K14} /><Flat t={t} />
    <Box p={[0, 1.0, -3.6]} s={[4.4, 0.16, 2.0]} color={P.Y3} /><Cyl p={[-1.8, 0.5, -3.1]} rt={0.12} h={1.0} color={P.Y4} /><Cyl p={[1.8, 0.5, -3.1]} rt={0.12} h={1.0} color={P.Y4} />
    <Box p={[0.4, 1.1, -3.3]} s={[1.0, 0.03, 1.3]} color={P.K1} line={2} /><Box p={[0.4, 1.13, -3.0]} s={[0.7 * sign, 0.02, 0.08]} color={P.V3} line={0} />
    <Clock p={[-2.6, 5.4, -6.8]} r={0.9} t={t} speed={14} />
    <Person p={[-1.7, 0, -3.8]} h={3.7} look={opa} f={f} pose={{ mood: "laugh", arms: "point", armK: 0.5 + 0.4 * Math.sin(t * 3), tilt: talkTilt(t, true, 0.06) }} />
    <Person p={[1.9, 0, -3.8]} h={3.7} look={emre} f={f} pose={{ mood: tick > 0.3 ? "grin" : "smile", flip: true, armR: [-0.2, 0.36], armRK: sign, squash: 0.01 * Math.sin(t * 2.4) }} />
    <Poster p={[0.4, 3.9, -3.0]} s={[1.0, 1.0]} k={tick} draw={drawText("✓", P.T2, "#fff", 170)} />
  </>);
};

/* 15 (68.9-end) first contract, rent still open, but it works */
const K15: Key[] = [{ t: 68.7, pos: [0.0, 3.2, 9.2], look: [0, 3.2, -4.2], fov: 54 }, { t: 75.0, pos: [0.0, 3.0, 7.0], look: [0, 3.4, -4.2], fov: 48 }, { t: 78.0, pos: [0.0, 3.0, 6.6], look: [0, 3.4, -4.2], fov: 47 }];
export const B15 = ({ t, f }: Ctx) => {
  const up = seg(t, wt("weiß") - 0.4, wt("weiß") + 0.4, Easing.out(Easing.back(2)));
  return (<>
    <Cam t={t} keys={K15} /><Flat t={t} />
    <Poster p={[-1.5, 4.9, -4.0]} s={[2.0, 1.1]} k={seg(t, 69, 69.4, Easing.out(Easing.back(2)))} draw={drawText("Vertrag 1", P.T2, "#fff", 64, "✓ unterschrieben")} />
    <Poster p={[1.5, 4.9, -4.0]} s={[2.0, 1.1]} k={seg(t, 71.2, 71.6, Easing.out(Easing.back(2)))} draw={drawText("Miete", P.K2, P.C3, 64, "noch offen")} />
    <Person p={[0, 0, -3.6]} h={4.0} look={emre} f={f} pose={{ mood: "grin", arms: "up", armK: 0.4 + 0.6 * up, squash: 0.02 * Math.sin(t * 5) * up, air: 0.05 * up }} />
    <Glow p={[0, 3.6, -3.8]} r={3.6} color="rgba(242,184,75,1)" o={0.3 * up} />
  </>);
};
export const OVERLAY_B = (t: number) => <InfoCard a={75.6} b={79.4} t={t} title="Teil 2 von 3" body="Der steinige Weg. Weiter mit: Der Februar." top={150} />;
void Calendar; void Lights; void Frame; void Rug; void Plant; void Sign; void Floor; void WallDoor; void SideWall; void Dust; void Ball; void CanvasPlane; void StaticClock; void (null as unknown as V3);
