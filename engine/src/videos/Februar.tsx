// Clip 3: "Der Februar" - Emre's crash and comeback (narration). 16 scenes locked to public/februar/words.json.
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Grade } from "../style/kit";
import { Captions } from "../Main";
import { Scene, FPS, P, W } from "./sn-common";
import { C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, OVERLAY_C } from "./sn-c";
import words from "../../public/februar/words.json";
import script from "../../public/februar/script.json";

export const FEBRUAR_FRAMES = Math.ceil(83 * FPS);
export const Februar: React.FC = () => {
  const f = useCurrentFrame(), t = f / FPS;
  const c = [0, 2.3, 4.9, 8.1, 10.0, 14.7, 20.1, 25.9, 31.3, 36.6, 44.2, 50.4, 55.6, 60.5, 64.4, 71.4, 83];
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("februar/mix.wav")} />
      <Scene first start={c[0]} end={c[1]} bg={P.K3}>{(x) => <C1 {...x} />}</Scene>
      <Scene start={c[1]} end={c[2]} bg={P.T3} trans="ghost">{(x) => <C2 {...x} />}</Scene>
      <Scene start={c[2]} end={c[3]} bg={P.T3} trans="whip">{(x) => <C3 {...x} />}</Scene>
      <Scene start={c[3]} end={c[4]} bg={P.V3} trans="flash">{(x) => <C4 {...x} />}</Scene>
      <Scene start={c[4]} end={c[5]} bg={P.T3} trans="ghost">{(x) => <C5 {...x} />}</Scene>
      <Scene start={c[5]} end={c[6]} bg={P.T3} trans="zoom">{(x) => <C6 {...x} />}</Scene>
      <Scene start={c[6]} end={c[7]} bg={P.V4} trans="ghost">{(x) => <C7 {...x} />}</Scene>
      <Scene start={c[7]} end={c[8]} bg={P.K4} trans="whip">{(x) => <C8 {...x} />}</Scene>
      <Scene start={c[8]} end={c[9]} bg={P.K4} trans="ghost">{(x) => <C9 {...x} />}</Scene>
      <Scene start={c[9]} end={c[10]} bg={P.T3} trans="zoom">{(x) => <C10 {...x} />}</Scene>
      <Scene start={c[10]} end={c[11]} bg={P.K3} trans="whip">{(x) => <C11 {...x} />}</Scene>
      <Scene start={c[11]} end={c[12]} bg={P.T3} trans="ghost">{(x) => <C12 {...x} />}</Scene>
      <Scene start={c[12]} end={c[13]} bg={P.T3} trans="zoom">{(x) => <C13 {...x} />}</Scene>
      <Scene start={c[13]} end={c[14]} bg={P.T3} trans="flash">{(x) => <C14 {...x} />}</Scene>
      <Scene start={c[14]} end={c[15]} bg={P.T3} trans="ghost">{(x) => <C15 {...x} />}</Scene>
      <Scene start={c[15]} end={c[16]} bg={P.V3} trans="ghost">{(x) => <C16 {...x} />}</Scene>
      <Grade t={t} shaft={false} tint="rgba(255,255,255,0)" />
      {OVERLAY_C(t)}
      <Captions words={words as W[]} script={script as string[]} />
    </AbsoluteFill>
  );
};
