#!/usr/bin/env bash
# usage: prep_narration.sh <videoId>  (needs 02-videos/<id>/voice.mp3 + script.txt, $WHISPER_PY) -> engine/public/<id>/{voice.wav,words.json,script.json}
set -e; ID=$1; ROOT="$(cd "$(dirname "$0")/.." && pwd)"; W="$ROOT/02-videos/$ID"; P="$ROOT/engine/public/$ID"; mkdir -p "$P"
ffmpeg -v error -y -i "$W/voice.mp3" -ar 44100 -ac 1 "$P/voice.wav"
"$WHISPER_PY" "$ROOT/tools/voice/align_de.py" "$P/voice.wav" "$W/script.txt" "$P/words.json" de > /dev/null
python3 -c "import json,sys;json.dump(open('$W/script.txt').read().split(),open('$P/script.json','w'),ensure_ascii=False)"
echo "PREP_DONE $ID $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$P/voice.wav")"
