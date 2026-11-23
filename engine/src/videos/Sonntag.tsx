// Clip 1: "Sonntag, 21:40 Uhr" - dialogue Jonas / Emre. 16 scenes locked to public/sonntag/timeline.json.
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Grade } from "../style/kit";
import { Captions } from "../Main";
import { Scene, FPS, P, wordAt, W } from "./sn-common";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9a, S9b, S10, S11, S12, S13, S14, S15, S16, L, labelAt, OVERLAY } from "./sn-a";
import words from "../../public/sonntag/words.json";
import script from "../../public/sonntag/script.json";

const wt = wordAt(words as W[], script as string[]);
export const SONNTAG_FRAMES = Math.ceil(L[L.length - 1].end * FPS) + Math.ceil(7.6 * FPS);
export const Sonntag: React.FC = () => {
  const f = useCurrentFrame(), t = f / FPS;
  const c = [0, L[0].start, L[1].start, L[2].start, L[3].start, L[4].start, L[5].start, L[6].start, L[7].start, wt("Zwei", 90) - 0.1, L[8].start, L[9].start, L[10].start, L[11].start, L[12].start, L[13].start, L[13].end + 0.3, L[13].end + 7.6];
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("sonntag/mix.wav")} />
      <Scene first start={c[0]} end={c[1]} bg={P.V3}>{(x) => <S1 {...x} />}</Scene>
      <Scene start={c[1]} end={c[2]} bg={P.V3} trans="ghost">{(x) => <S2 {...x} />}</Scene>
      <Scene start={c[2]} end={c[3]} bg={P.T3} trans="whip">{(x) => <S3 {...x} />}</Scene>
      <Scene start={c[3]} end={c[4]} bg={P.V3} trans="ghost">{(x) => <S4 {...x} />}</Scene>
      <Scene start={c[4]} end={c[5]} bg={P.T3} trans="whip">{(x) => <S5 {...x} />}</Scene>
      <Scene start={c[5]} end={c[6]} bg={P.V3} trans="flash">{(x) => <S6 {...x} />}</Scene>
      <Scene start={c[6]} end={c[7]} bg={P.K3} trans="zoom">{(x) => <S7 {...x} />}</Scene>
      <Scene start={c[7]} end={c[8]} bg={P.V3} trans="ghost">{(x) => <S8 {...x} />}</Scene>
      <Scene start={c[8]} end={c[9]} bg={P.K3} trans="zoom">{(x) => <S9a {...x} />}</Scene>
      <Scene start={c[9]} end={c[10]} bg={P.T3} trans="ghost">{(x) => <S9b {...x} />}</Scene>
      <Scene start={c[10]} end={c[11]} bg={P.V3} trans="ghost">{(x) => <S10 {...x} />}</Scene>
      <Scene start={c[11]} end={c[12]} bg={P.T3} trans="whip">{(x) => <S11 {...x} />}</Scene>
      <Scene start={c[12]} end={c[13]} bg={P.V3} trans="ghost">{(x) => <S12 {...x} />}</Scene>
      <Scene start={c[13]} end={c[14]} bg={P.T3} trans="ghost">{(x) => <S13 {...x} />}</Scene>
      <Scene start={c[14]} end={c[15]} bg={P.V3} trans="ghost">{(x) => <S14 {...x} />}</Scene>
      <Scene start={c[15]} end={c[16]} bg={P.T3} trans="zoom">{(x) => <S15 {...x} />}</Scene>
      <Scene start={c[16]} end={c[17]} bg={P.V4} trans="flash">{(x) => <S16 {...x} />}</Scene>
      <Grade t={t} shaft={false} tint="rgba(255,255,255,0)" />
      {OVERLAY(t)}
      <Captions words={words as W[]} script={script as string[]} labelAt={labelAt} />
    </AbsoluteFill>
  );
};
