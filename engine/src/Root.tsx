import React from "react";
import { Composition } from "remotion";
import "@fontsource/inter/900.css";
import "@fontsource/inter/600.css";
import { Main } from "./Main";
import { NvidiaV4 } from "./videos/NvidiaV4";
import { JoshuaBell } from "./videos/JoshuaBell";
import { Sonntag, SONNTAG_FRAMES } from "./videos/Sonntag";
import { Tuer10, TUER10_FRAMES } from "./videos/Tuer10";
import { Februar, FEBRUAR_FRAMES } from "./videos/Februar";
// DURATION: set durationInFrames = ceil(voiceover_seconds * 30). Use --props or edit per video.
export const Root: React.FC = () => <>
  <Composition id="Main" component={Main} width={720} height={1280} fps={30} durationInFrames={60} />
  <Composition id="NvidiaV4" component={NvidiaV4} width={720} height={1280} fps={30} durationInFrames={661} />
  <Composition id="Februar" component={Februar} width={720} height={1280} fps={30} durationInFrames={FEBRUAR_FRAMES} />
  <Composition id="Tuer10" component={Tuer10} width={720} height={1280} fps={30} durationInFrames={TUER10_FRAMES} />
  <Composition id="Sonntag" component={Sonntag} width={720} height={1280} fps={30} durationInFrames={SONNTAG_FRAMES} />
  <Composition id="JoshuaBell" component={JoshuaBell} width={720} height={1280} fps={30} durationInFrames={1646} />
</>;
