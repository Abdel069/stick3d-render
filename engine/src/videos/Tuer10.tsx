// Clip "Tuer10" (Gen Z cut). Scenes are authored in v1 time; warp.json maps the new narration onto them; slow zoom breathing + crash punches on hot words.
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Grade } from "../style/kit";
import { Captions } from "../Main";
import { Scene, FPS, P, W, InfoCard, buildZoom, ZoomWrap } from "./sn-common";
import { B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14, B15, warp } from "./sn-b";
import words from "../../public/tuer10/words.json";
import script from "../../public/tuer10/script.json";

const zoom = buildZoom(words as W[], script as string[], ["GTA", "Mail", "Brutus", "Flamingo", "Senf", "unterschreibt", "Level"]);
const OLD_C = [0, 3.7, 6.7, 14.0, 22.6, 26.9, 33.6, 37.3, 41.4, 44.6, 48.9, 54.7, 61.8, 66.5, 68.9, 79.6];
export const TUER10_FRAMES = Math.ceil(warp.neu(OLD_C[OLD_C.length - 1]) * FPS) + 1;
export const Tuer10: React.FC = () => {
  const f = useCurrentFrame(), t = f / FPS;
  const c = OLD_C.map((x) => warp.neu(x));
  const sc = (i: number, bg: string, trans: "ghost" | "zoom" | "flash" | "whip", el: (x: { t: number; f: number }) => React.ReactNode, first = false) => <Scene key={i} first={first} start={c[i]} end={c[i + 1]} bg={bg} trans={trans} warp={warp.old}>{el}</Scene>;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("tuer10/mix.wav")} />
      <ZoomWrap z={zoom}>
        {sc(0, P.K4, "ghost", (x) => <B1 {...x} />, true)}
        {sc(1, P.T3, "whip", (x) => <B2 {...x} />)}
        {sc(2, P.K3, "zoom", (x) => <B3 {...x} />)}
        {sc(3, P.K3, "ghost", (x) => <B4 {...x} />)}
        {sc(4, P.K3, "flash", (x) => <B5 {...x} />)}
        {sc(5, P.K3, "ghost", (x) => <B6 {...x} />)}
        {sc(6, P.T3, "whip", (x) => <B7 {...x} />)}
        {sc(7, P.T3, "ghost", (x) => <B8 {...x} />)}
        {sc(8, P.T3, "zoom", (x) => <B9 {...x} />)}
        {sc(9, P.T3, "ghost", (x) => <B10 {...x} />)}
        {sc(10, P.T3, "whip", (x) => <B11 {...x} />)}
        {sc(11, P.K3, "zoom", (x) => <B12 {...x} />)}
        {sc(12, P.K3, "ghost", (x) => <B13 {...x} />)}
        {sc(13, P.T3, "ghost", (x) => <B14 {...x} />)}
        {sc(14, P.T3, "flash", (x) => <B15 {...x} />)}
      </ZoomWrap>
      <Grade t={t} shaft={false} tint="rgba(255,255,255,0)" />
      <InfoCard a={warp.neu(75.6)} b={warp.neu(79.4)} t={t} title="Teil 2 von 3" body="Der steinige Weg. Weiter mit: Der Februar." top={150} />
      <Captions words={words as W[]} script={script as string[]} />
    </AbsoluteFill>
  );
};
