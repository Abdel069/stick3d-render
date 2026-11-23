// Clip 1: "Sonntag, 21:40 Uhr" - dialogue Jonas / Emre (Gen Z cut). Scenes are authored in v1 time; warp.json maps the new voice onto them.
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Grade } from "../style/kit";
import { Captions } from "../Main";
import { Scene, FPS, P, wordAt, W, InfoCard, buildZoom, ZoomWrap } from "./sn-common";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9a, S9b, S10, S11, S12, S13, S14, S15, S16, L, LN, labelAt, warp } from "./sn-a";
import words from "../../public/sonntag/words.json";
import script from "../../public/sonntag/script.json";

const wtOld = wordAt(words as W[], script as string[], warp.old);
const zoom = buildZoom(words as W[], script as string[], ["GTA", "zugeknallt", "Handtuch", "Flamingo", "unterschrieben", "Kontostand", "bescheuert", "Energydrinks"]);
const OLD_C = [0, L[0].start, L[1].start, L[2].start, L[3].start, L[4].start, L[5].start, L[6].start, L[7].start, wtOld("Zwei", LN[8].tok0 + 8) - 0.1, L[8].start, L[9].start, L[10].start, L[11].start, L[12].start, L[13].start, L[13].end + 0.3, L[13].end + 7.6];
export const SONNTAG_FRAMES = Math.ceil(warp.neu(OLD_C[17]) * FPS) + 1;
export const Sonntag: React.FC = () => {
  const f = useCurrentFrame(), t = f / FPS;
  const c = OLD_C.map((x) => warp.neu(x)), W0 = warp.old;
  const sc = (i: number, bg: string, trans: "ghost" | "zoom" | "flash" | "whip", el: (x: { t: number; f: number }) => React.ReactNode, first = false) => <Scene key={i} first={first} start={c[i]} end={c[i + 1]} bg={bg} trans={trans} warp={W0}>{el}</Scene>;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("sonntag/mix.wav")} />
      <ZoomWrap z={zoom}>
        {sc(0, P.V3, "ghost", (x) => <S1 {...x} />, true)}{sc(1, P.V3, "ghost", (x) => <S2 {...x} />)}{sc(2, P.T3, "whip", (x) => <S3 {...x} />)}{sc(3, P.V3, "ghost", (x) => <S4 {...x} />)}
        {sc(4, P.T3, "whip", (x) => <S5 {...x} />)}{sc(5, P.V3, "flash", (x) => <S6 {...x} />)}{sc(6, P.K3, "zoom", (x) => <S7 {...x} />)}{sc(7, P.V3, "ghost", (x) => <S8 {...x} />)}
        {sc(8, P.K3, "zoom", (x) => <S9a {...x} />)}{sc(9, P.T3, "ghost", (x) => <S9b {...x} />)}{sc(10, P.V3, "ghost", (x) => <S10 {...x} />)}{sc(11, P.T3, "whip", (x) => <S11 {...x} />)}
        {sc(12, P.V3, "ghost", (x) => <S12 {...x} />)}{sc(13, P.T3, "ghost", (x) => <S13 {...x} />)}{sc(14, P.V3, "ghost", (x) => <S14 {...x} />)}{sc(15, P.T3, "zoom", (x) => <S15 {...x} />)}{sc(16, P.V4, "flash", (x) => <S16 {...x} />)}
      </ZoomWrap>
      <Grade t={t} shaft={false} tint="rgba(255,255,255,0)" />
      <InfoCard a={0.3} b={c[1] - 0.1} t={t} title="Sonntag, 21:40 Uhr" body="Jonas liegt auf dem Sofa und starrt an die Decke." />
      <InfoCard a={c[16] + 0.1} b={warp.neu(OLD_C[16] + 3.6)} t={t} title="Laut Gallup-Engagement-Index" body="fühlt sich nur etwa jeder zehnte Beschäftigte in Deutschland emotional stark an seinen Arbeitgeber gebunden." />
      <InfoCard a={warp.neu(OLD_C[16] + 3.7)} b={warp.neu(OLD_C[16] + 7.3)} t={t} title="Gallup-Engagement-Index" body="Der Rest macht oft nur Dienst nach Vorschrift." />
      <Captions words={words as W[]} script={script as string[]} labelAt={labelAt} />
    </AbsoluteFill>
  );
};
