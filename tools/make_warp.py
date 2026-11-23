#!/usr/bin/env python3
"""usage: make_warp.py <id> [dialogue]  -> engine/public/<id>/warp.json  (knots [new_time, old_time]) from old/ vs current words+script (+ timelines for dialogues)."""
import sys, json, re, difflib, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); vid = sys.argv[1]; dlg = len(sys.argv) > 2
P = os.path.join(root, "engine", "public", vid); O = os.path.join(P, "old")
nw, ns = json.load(open(f"{P}/words.json")), json.load(open(f"{P}/script.json")); ow, os_ = json.load(open(f"{O}/words.json")), json.load(open(f"{O}/script.json"))
norm = lambda w: re.sub(r"[^a-zäöüß0-9]", "", w.lower())
sm = difflib.SequenceMatcher(None, [norm(x) for x in os_], [norm(x) for x in ns], autojunk=False)
cand = []
for b in sm.get_matching_blocks():
    for d in range(b.size): cand.append((nw[b.b + d]["start"], ow[b.a + d]["start"]))
if dlg:
    nt, ot = json.load(open(f"{P}/timeline.json")), json.load(open(f"{O}/timeline.json"))
    for i in range(len(ot)):  # old line i <-> new line i+1 (new line 0 is the added hook)
        cand += [(nt[i + 1]["start"], ot[i]["start"]), (nt[i + 1]["end"], ot[i]["end"])]
    end_new, end_old = nt[-1]["end"], ot[-1]["end"]
else:
    end_new, end_old = nw[-1]["end"], ow[-1]["end"]
cand += [(0.0, 0.0), (end_new, end_old)]
cand.sort(); k = []
for n, o in cand:
    if not k or (n > k[-1][0] + 0.05 and o > k[-1][1] + 0.05): k.append((round(n, 3), round(o, 3)))
json.dump(k, open(f"{P}/warp.json", "w")); print(vid, "knots", len(k), "new end", end_new, "old end", end_old)
