# Ledger: JoshuaBell (11 scenes, 49.9 s)
S1 station entrance (whip in) | S2 man arrives, case, plays | S3 lateral dolly, crowd, counter | S4 high angle, seven stop | S5 coins into case, woman $20 | S6 Stradivari pedestal orbit | S7 Bell on stage | S8 reverse shot sold-out hall | S9 split world, frames | S10 kids dragged by parents | S11 gold-framed painting pull-back.
New props: Violin, Bow, Case, Notes, Player, Walker (videos/jb-common.tsx).
Render: cloud, 20 parallel GitHub Actions slices (render.yml), ~5 min. Local CPU render ~6 fps/min: do not use.
Voice v2: ElevenLabs via Higgsfield text2speech_v2 (variant elevenlabs, voice Holden). Scenes authored in first-voice time; engine/src/videos/jb-warp.ts maps new word times to old (Scene feeds oldOf(t)). New voice 54.97 s, 1650 frames.
v3: puppet v5 (deformed heads via Look.seed, NPC_SEED shared, longer limbs, slim torso, cap), BRAND palette (engine/src/style/brand.ts; scene colours snapped), yellow captions + coral shadow, humanized script (script_v2.txt), Holden voice, 54.85 s.
v4: main characters detailed (sleeves, trousers, scarf, bowtie, lips, lashes, freckles, stubble, ears, earrings), palette v2 Dusk & Honey, grade saturate 1.1, caption auto-fit, price counter at 'rund 3,5'.
v5: quiet captions, mustache (no teeth), longer main heads, 3D violin turntable (world-space, own spin).
Series Emre (3 clips): Sonntag 78.6 s (dialogue Jonas Holden / Emre Marcus), Tuer10 75.4 s (narrator Reid), Februar 78.6 s (narrator Petra).
