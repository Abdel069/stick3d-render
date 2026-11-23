// "Joshua Bell in the metro" - German, 9:16 720x1280 30fps, 11 scenes locked to words.json (voice = macOS Anna Enhanced).
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Grade } from "../style/kit";
import { Captions } from "../Main";
import { Scene, CUTS, FPS } from "./jb-common";
import { S1, S2, S3, S4, S5 } from "./jb-a";
import { S6, S7, S8, S9, S10, S11 } from "./jb-b";

const TINT = ["rgba(0,170,200,.07)", "rgba(255,170,60,.07)", "rgba(60,120,255,.08)", "rgba(170,90,230,.07)", "rgba(255,150,60,.07)", "rgba(120,70,230,.10)", "rgba(255,200,90,.08)", "rgba(255,90,70,.08)", "rgba(255,255,255,.00)", "rgba(255,190,110,.07)", "rgba(255,200,90,.09)"];
export const JoshuaBell: React.FC = () => {
  const f = useCurrentFrame(), t = f / FPS;
  const idx = Math.max(0, CUTS.findIndex((c, i) => t >= c && t < (CUTS[i + 1] ?? 99)));
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("mix.wav")} />
      <Scene first start={CUTS[0]} end={CUTS[1]} bg="#247A75">{(c) => <S1 {...c} />}</Scene>
      <Scene start={CUTS[1]} end={CUTS[2]} bg="#C7B58F" trans="whip">{(c) => <S2 {...c} />}</Scene>
      <Scene start={CUTS[2]} end={CUTS[3]} bg="#124745" trans="zoom">{(c) => <S3 {...c} />}</Scene>
      <Scene start={CUTS[3]} end={CUTS[4]} bg="#41377F" trans="ghost">{(c) => <S4 {...c} />}</Scene>
      <Scene start={CUTS[4]} end={CUTS[5]} bg="#7A5214" trans="whip">{(c) => <S5 {...c} />}</Scene>
      <Scene start={CUTS[5]} end={CUTS[6]} bg="#211B52" trans="zoom">{(c) => <S6 {...c} />}</Scene>
      <Scene start={CUTS[6]} end={CUTS[7]} bg="#6A2425" trans="flash">{(c) => <S7 {...c} />}</Scene>
      <Scene start={CUTS[7]} end={CUTS[8]} bg="#6A2425" trans="ghost">{(c) => <S8 {...c} />}</Scene>
      <Scene start={CUTS[8]} end={CUTS[9]} bg="#124745" trans="whip">{(c) => <S9 {...c} />}</Scene>
      <Scene start={CUTS[9]} end={CUTS[10]} bg="#7A5214" trans="zoom">{(c) => <S10 {...c} />}</Scene>
      <Scene start={CUTS[10]} end={CUTS[11]} bg="#211B52" trans="ghost">{(c) => <S11 {...c} />}</Scene>
      <Grade t={t} shaft={false} tint={TINT[idx]} />
      <Captions />
    </AbsoluteFill>
  );
};
