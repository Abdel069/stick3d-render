// Clip "Februar" (Gen Z cut). Scenes are authored in v1 time; warp.json maps the new narration onto them; slow zoom breathing + crash punches on hot words.
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Grade } from "../style/kit";
import { Captions } from "../Main";
import { Scene, FPS, P, W, InfoCard, buildZoom, ZoomWrap } from "./sn-common";
import { C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13, C14, C15, C16, warp } from "./sn-c";
import words from "../../public/februar/words.json";
import script from "../../public/februar/script.json";

const zoom = buildZoom(words as W[], script as string[], ["Cheat", "Endgegner", "storniert", "Döner", "Level", "Quote"]);
const OLD_C = [0, 2.3, 4.9, 8.1, 10.0, 14.7, 20.1, 25.9, 31.3, 36.6, 44.2, 50.4, 55.6, 60.5, 64.4, 71.4, 83];
export const FEBRUAR_FRAMES = Math.ceil(warp.neu(OLD_C[OLD_C.length - 1]) * FPS) + 1;
export const Februar: React.FC = () => {
  const f = useCurrentFrame(), t = f / FPS;
  const c = OLD_C.map((x) => warp.neu(x));
  const sc = (i: number, bg: string, trans: "ghost" | "zoom" | "flash" | "whip", el: (x: { t: number; f: number }) => React.ReactNode, first = false) => <Scene key={i} first={first} start={c[i]} end={c[i + 1]} bg={bg} trans={trans} warp={warp.old}>{el}</Scene>;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("februar/mix.wav")} />
      <ZoomWrap z={zoom}>
        {sc(0, P.K3, "ghost", (x) => <C1 {...x} />, true)}
        {sc(1, P.T3, "ghost", (x) => <C2 {...x} />)}
        {sc(2, P.T3, "whip", (x) => <C3 {...x} />)}
        {sc(3, P.V3, "flash", (x) => <C4 {...x} />)}
        {sc(4, P.T3, "ghost", (x) => <C5 {...x} />)}
        {sc(5, P.T3, "zoom", (x) => <C6 {...x} />)}
        {sc(6, P.V4, "ghost", (x) => <C7 {...x} />)}
        {sc(7, P.K4, "whip", (x) => <C8 {...x} />)}
        {sc(8, P.K4, "ghost", (x) => <C9 {...x} />)}
        {sc(9, P.T3, "zoom", (x) => <C10 {...x} />)}
        {sc(10, P.K3, "whip", (x) => <C11 {...x} />)}
        {sc(11, P.T3, "ghost", (x) => <C12 {...x} />)}
        {sc(12, P.T3, "zoom", (x) => <C13 {...x} />)}
        {sc(13, P.T3, "flash", (x) => <C14 {...x} />)}
        {sc(14, P.T3, "ghost", (x) => <C15 {...x} />)}
        {sc(15, P.V3, "ghost", (x) => <C16 {...x} />)}
      </ZoomWrap>
      <Grade t={t} shaft={false} tint="rgba(255,255,255,0)" />
      <InfoCard a={warp.neu(79.0)} b={warp.neu(82.2)} t={t} title="Teil 3 von 3" body="Weiter mit: Sonntag, 21:40 Uhr." top={150} />
      <Captions words={words as W[]} script={script as string[]} />
    </AbsoluteFill>
  );
};
