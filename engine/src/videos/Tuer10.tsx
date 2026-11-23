// Clip 2: "Tür zehn" - Emre's first weeks (narration). 15 scenes locked to public/tuer10/words.json.
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Grade } from "../style/kit";
import { Captions } from "../Main";
import { Scene, FPS, P, W } from "./sn-common";
import { B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, wt, OVERLAY_B } from "./sn-b";
import words from "../../public/tuer10/words.json";
import script from "../../public/tuer10/script.json";

export const TUER10_FRAMES = Math.ceil(79.6 * FPS);
export const Tuer10: React.FC = () => {
  const f = useCurrentFrame(), t = f / FPS;
  const c = [0, 3.7, 6.7, 14.0, 22.6, 26.9, 33.6, 37.3, 41.4, 44.6, 48.9, 54.7, 61.8, 66.5, 68.9, 79.6];
  void wt;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("tuer10/mix.wav")} />
      <Scene first start={c[0]} end={c[1]} bg={P.K4}>{(x) => <B1 {...x} />}</Scene>
      <Scene start={c[1]} end={c[2]} bg={P.T3} trans="whip">{(x) => <B2 {...x} />}</Scene>
      <Scene start={c[2]} end={c[3]} bg={P.K3} trans="zoom">{(x) => <B3 {...x} />}</Scene>
      <Scene start={c[3]} end={c[4]} bg={P.K3} trans="ghost">{(x) => <B4 {...x} />}</Scene>
      <Scene start={c[4]} end={c[5]} bg={P.K3} trans="flash">{(x) => <B5 {...x} />}</Scene>
      <Scene start={c[5]} end={c[6]} bg={P.K3} trans="ghost">{(x) => <B6 {...x} />}</Scene>
      <Scene start={c[6]} end={c[7]} bg={P.T3} trans="whip">{(x) => <B7 {...x} />}</Scene>
      <Scene start={c[7]} end={c[8]} bg={P.T3} trans="ghost">{(x) => <B8 {...x} />}</Scene>
      <Scene start={c[8]} end={c[9]} bg={P.T3} trans="zoom">{(x) => <B9 {...x} />}</Scene>
      <Scene start={c[9]} end={c[10]} bg={P.T3} trans="ghost">{(x) => <B10 {...x} />}</Scene>
      <Scene start={c[10]} end={c[11]} bg={P.T3} trans="whip">{(x) => <B11 {...x} />}</Scene>
      <Scene start={c[11]} end={c[12]} bg={P.K3} trans="zoom">{(x) => <B12 {...x} />}</Scene>
      <Scene start={c[12]} end={c[13]} bg={P.K3} trans="ghost">{(x) => <B13 {...x} />}</Scene>
      <Scene start={c[13]} end={c[14]} bg={P.T3} trans="ghost">{(x) => <B14 {...x} />}</Scene>
      <Scene start={c[14]} end={c[15]} bg={P.T3} trans="flash">{(x) => <B15 {...x} />}</Scene>
      <Grade t={t} shaft={false} tint="rgba(255,255,255,0)" />
      {OVERLAY_B(t)}
      <Captions words={words as W[]} script={script as string[]} />
    </AbsoluteFill>
  );
};
