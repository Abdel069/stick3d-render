#!/usr/bin/env python3
"""usage: build_dialog.py <workdir> [lead=3.2] [tail=7.5]
workdir/lines.json = [{"speaker":"Jonas","text":"..."}...]; workdir/lines/L01.mp3.. (one recording per line, same order).
Trims each line, joins with natural gaps, aligns words per line (Whisper, $WHISPER_PY), writes
engine/public/{voice.wav,words.json,script.json} and workdir/timeline.json = [{speaker,text,start,end,tok0,tok1}] (seconds, token range in script.json)."""
import sys, os, json, subprocess, shutil, wave
import numpy as np
work = os.path.abspath(sys.argv[1]); lead = float(sys.argv[2]) if len(sys.argv) > 2 else 3.2; tail = float(sys.argv[3]) if len(sys.argv) > 3 else 7.5
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SR = 44100
lines = json.load(open(os.path.join(work, "lines.json"))); wpy = os.environ["WHISPER_PY"]
tmp = os.path.join(work, "tmp"); os.makedirs(tmp, exist_ok=True)
def rd(p):
    w = wave.open(p); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768; w.close(); return a
sil = "silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04"
tl, words, toks, chunks, t = [], [], [], [np.zeros(int(lead * SR), dtype=np.float32)], lead
prev = None
for i, ln in enumerate(lines, 1):
    src = os.path.join(work, "lines", f"L{i:02d}.mp3"); out = os.path.join(tmp, f"L{i:02d}.wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-ar", str(SR), "-ac", "1", "-af", f"{sil},areverse,{sil},areverse", out], check=True)
    a = rd(out); d = len(a) / SR
    if prev is not None:
        gap = 0.3 if ln["speaker"] != prev else 0.4; chunks.append(np.zeros(int(gap * SR), dtype=np.float32)); t += gap
    tf = os.path.join(tmp, f"L{i:02d}.txt"); open(tf, "w").write(ln["text"]); jf = os.path.join(tmp, f"L{i:02d}.json")
    if not os.path.exists(jf): subprocess.run([wpy, os.path.join(root, "tools", "voice", "align_de.py"), out, tf, jf, "de"], check=True, stdout=subprocess.DEVNULL)
    ws = json.load(open(jf)); tk = ln["text"].split(); assert len(ws) == len(tk), (i, len(ws), len(tk))
    tl.append({"speaker": ln["speaker"], "text": ln["text"], "start": round(t, 3), "end": round(t + d, 3), "tok0": len(toks), "tok1": len(toks) + len(tk)})
    for w in ws: words.append({"word": w["word"], "start": round(w["start"] + t, 3), "end": round(w["end"] + t, 3)})
    toks += tk; chunks.append(a); t += d; prev = ln["speaker"]
chunks.append(np.zeros(int(tail * SR), dtype=np.float32)); t += tail
y = np.concatenate(chunks); y = y / max(1e-6, np.abs(y).max()) * 0.92
pub = os.path.join(root, "engine", "public"); os.makedirs(pub, exist_ok=True); wf = os.path.join(pub, "voice.wav")
w = wave.open(wf, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype(np.int16).tobytes()); w.close()
json.dump(words, open(os.path.join(pub, "words.json"), "w")); json.dump(toks, open(os.path.join(pub, "script.json"), "w"))
json.dump(tl, open(os.path.join(work, "timeline.json"), "w"), ensure_ascii=False, indent=1)
print(f"OK {len(lines)} lines, {len(toks)} tokens, total {t:.2f}s = {int(t*30)+1} frames")
