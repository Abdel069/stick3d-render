// STARTER composition. Claude: copy the scene pattern from src/examples/NvidiaDemo.tsx, replace S1.. with scenes for the NEW script.
// Inputs per video (made by the pipeline): public/words.json (word timings), public/script.json (script tokens WITH punctuation), public/mix.wav (voice+SFX).
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing, Audio, staticFile } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Look } from "./style/puppet";
import { Rig, Person, Lights, seg, lerp, clamp } from "./style/kit";
import { Floor, WallDoor, Plant } from "./style/props";
import words from "../public/words.json";
import SCRIPT from "../public/script.json";

export const FPS = 30, LEAD = 6, TAIL = 8;
export const WALK = 3.4; // walk-cycle phase per world unit => feet never slide
export const hero: Look = { skin: "#fbe3c8", body: "#3f7bff", outfit: "shirt", hair: "short", hairColor: "#1b1b2a", shoe: "#1b1b2a" };
export type Ctx = { t: number; f: number };

export const Scene: React.FC<{ start: number; end: number; first?: boolean; trans?: "ghost" | "zoom" | "flash"; bg: string; children: (c: Ctx) => React.ReactNode }> = ({ start, end, first, trans = "ghost", bg, children }) => {
  const from = Math.round(start * FPS) - (first ? 0 : LEAD), dur = Math.round(end * FPS) - from + TAIL;
  return <Sequence from={from} durationInFrames={dur} layout="none"><Inner from={from} first={first} trans={trans} bg={bg} children={children} /></Sequence>;
};
const Inner: React.FC<{ from: number; first?: boolean; trans: string; bg: string; children: (c: Ctx) => React.ReactNode }> = ({ from, first, trans, bg, children }) => {
  const f = useCurrentFrame(), t = (f + from) / FPS;
  const k = first ? 1 : clamp(f / (LEAD + 2));
  const sc = !first && trans === "zoom" ? lerp(1.35, 1, Easing.out(Easing.cubic)(k)) : 1;
  return (
    <AbsoluteFill style={{ opacity: first ? 1 : trans === "flash" ? 1 : k, transform: `scale(${sc})`, background: bg, filter: "saturate(1.32) contrast(1.07) brightness(1.02)" }}>
      <ThreeCanvas width={720} height={1280} camera={{ fov: 64, position: [0, 2, 8], near: 0.1, far: 120 }} gl={{ antialias: true }}>
        <color attach="background" args={[bg]} />{children({ t, f })}
      </ThreeCanvas>
      {!first && trans === "flash" ? <AbsoluteFill style={{ background: "#fff", opacity: 1 - clamp(f / 7) }} /> : null}
    </AbsoluteFill>
  );
};

type G = { text: string; a: number };
type W = { word: string; start: number; end: number };
const makeGroups = (words: W[], SCRIPT: string[]): G[] => {
  const g: G[] = []; let cur: number[] = [];
  const flush = () => { if (cur.length) { g.push({ text: cur.map((i) => String(SCRIPT[i]).replace(/[.,!?;:\u201e\u201c"]$/, "").replace(/^[\u201e\u201c"]/, "")).join(" "), a: words[cur[0]].start }); cur = []; } };
  words.forEach((_, i) => { cur.push(i); if (cur.length === 2 || /[.,!?;:]$/.test(String(SCRIPT[i]))) flush(); });
  flush(); return g;
};
const groups0 = makeGroups(words as W[], SCRIPT as string[]);
export const Captions: React.FC<{ words?: W[]; script?: string[]; labelAt?: (t: number) => string | undefined }> = ({ words: ws, script: sc, labelAt }) => {
  // v6 captions: quiet, modern, editorial. Medium-weight cream sentence case, soft shadow, thin honey rule, numbers in honey. No stroke.
  const groups = React.useMemo(() => (ws && sc ? makeGroups(ws, sc) : groups0), [ws, sc]);
  const f = useCurrentFrame(), t = f / FPS;
  const idx = groups.findIndex((g, i) => t >= g.a - 0.02 && t < (groups[i + 1]?.a ?? 99) - 0.02); const g = groups[Math.max(0, idx)];
  const k = interpolate(t - g.a, [0, 0.16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const maxLen = Math.max(...String(g.text).split(/\s+/).map((w: string) => w.length), 4);
  const fs = Math.min(54, Math.floor(600 / (maxLen * 0.6)));
  const parts = String(g.text).split(" "), label = labelAt ? labelAt(g.a + 0.01) : undefined;
  if (idx < 0 && t < groups[0].a - 0.02) return null;
  const lastEnd = (ws ?? (words as W[]))[(ws ?? (words as W[])).length - 1].end; if (ws && t > lastEnd + 0.7) return null;
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 420, background: "linear-gradient(to top, rgba(14,11,40,.5), rgba(14,11,40,0))" }} />
      <div style={{ position: "absolute", left: 40, right: 40, bottom: 250, textAlign: "center", opacity: k, transform: `translateY(${(1 - k) * 12}px)` }}>
        {label ? <div style={{ fontFamily: "Inter, Arial", fontWeight: 600, fontSize: 20, letterSpacing: "0.28em", color: "#F2B84B", marginBottom: 12, textTransform: "uppercase" }}>{label}</div> : <div style={{ width: 34, height: 3, borderRadius: 2, background: "#F2B84B", margin: "0 auto 16px", opacity: 0.95 }} />}
        <div style={{ fontFamily: "Inter, Arial", fontWeight: 600, fontSize: fs, lineHeight: 1.15, letterSpacing: "0.015em", color: "#FAF0DC", textShadow: "0 2px 18px rgba(8,6,30,.7), 0 1px 3px rgba(8,6,30,.55)" }}>
          {parts.map((w, i) => <span key={i} style={{ color: /[0-9$]/.test(w) ? "#F2B84B" : undefined }}>{w}{i < parts.length - 1 ? " " : ""}</span>)}
        </div>
      </div>
    </>
  );
};

const Demo = ({ t, f }: Ctx) => (<>
  <Rig t={t} t0={0} t1={2} from={[1.5, 1.7, 7]} to={[0.4, 1.9, 5]} lookFrom={[0, 2, 0]} lookTo={[0, 2, 0]} />
  <Lights /><Floor kind="plank" a="#8a4a28" b="#7a3f22" unit={2} /><WallDoor z={-7} W={26} kind="wood" a="#b2713d" b="#a2662f" door={{ x: 4.6, w: 2.4, h: 4.2 }} base="#5a2e18" /><Plant p={[-3, 0, -4]} />
  <Person p={[0, 0, 0]} h={3.6} look={hero} f={f} pose={{ mood: "smile" }} />
</>);

export const Main: React.FC = () => {
  const f = useCurrentFrame(); void f; void seg;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* <Audio src={staticFile("mix.wav")} />  <- enable once public/mix.wav exists */}
      <Scene first start={0} end={2} bg="#925b32">{(c) => <Demo {...c} />}</Scene>
      <Captions />
    </AbsoluteFill>
  );
};
void Audio; void staticFile;
