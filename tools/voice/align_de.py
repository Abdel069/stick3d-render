#!/usr/bin/env python3
"""Non-English forced word timing via Whisper (faster-whisper). usage: align_de.py audio.wav script.txt out.json [lang=de]
One output entry per whitespace token of script.txt (same indexing as script.json). Unmatched tokens are interpolated."""
import sys, json, re, difflib, unicodedata
import subprocess, numpy as np
from faster_whisper import WhisperModel
wav, scr, out = sys.argv[1:4]; lang = sys.argv[4] if len(sys.argv) > 4 else "de"
toks = open(scr).read().split()
norm = lambda s: re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKD", s.lower().replace("ß", "ss").replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")))
m = WhisperModel("small", device="cpu", compute_type="int8")
pcm = np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',wav,'-ar','16000','-ac','1','-f','f32le','-']), dtype=np.float32)
segs, _ = m.transcribe(pcm, language=lang, word_timestamps=True, vad_filter=False, condition_on_previous_text=False)
ww = [(norm(w.word), w.start, w.end) for s in segs for w in s.words if norm(w.word)]
a = [norm(t) for t in toks]; b = [w[0] for w in ww]
t0 = [None] * len(toks)
for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
    for k in range(blk.size): t0[blk.a + k] = (ww[blk.b + k][1], ww[blk.b + k][2])
# fuzzy pass for near matches inside gaps
for i, t in enumerate(toks):
    if t0[i] is None:
        lo = max([x[1] for x in t0[:i] if x] or [0]); 
        c = [(difflib.SequenceMatcher(None, a[i], w[0]).ratio(), w) for w in ww if w[1] >= lo - 0.01]
        if c:
            r, w = max(c, key=lambda x: x[0])
            if r > 0.75 and not any(x and abs(x[0] - w[1]) < 1e-6 for x in t0): t0[i] = (w[1], w[2])
# interpolate the rest between known neighbours
n = len(toks); i = 0; end_all = ww[-1][2]
while i < n:
    if t0[i] is None:
        j = i
        while j < n and t0[j] is None: j += 1
        L = t0[i - 1][1] if i > 0 else 0.0; R = t0[j][0] if j < n else end_all
        wts = [max(2, len(norm(toks[k]))) for k in range(i, j)]; tot = sum(wts); c = L
        for k, wt in zip(range(i, j), wts):
            d = (R - L) * wt / tot; t0[k] = (c, c + d); c += d
        i = j
    else: i += 1
res = [{"word": re.sub(r"[.,!?;:]$", "", toks[i]), "start": round(t0[i][0], 3), "end": round(t0[i][1], 3)} for i in range(n)]
for i in range(1, n):  # monotonic
    if res[i]["start"] < res[i - 1]["start"]: res[i]["start"] = res[i - 1]["end"]
json.dump(res, open(out, "w"), indent=1, ensure_ascii=False)
print(f"{n} tokens, {len(ww)} whisper words, last end {res[-1]['end']}s")
