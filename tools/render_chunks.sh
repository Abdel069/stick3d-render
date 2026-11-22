#!/usr/bin/env bash
# usage: render_chunks.sh <CompId> <totalFrames> [chunk=250] [concurrency=6]   (resumable: skips finished parts)
set -u; ID=$1; N=$2; C=${3:-250}; K=${4:-6}; ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT/engine"
GL=$(cat ../.gl-flag); BR=""; [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ] && BR="--browser-executable=/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for ((a=0; a<N; a+=C)); do b=$((a+C-1)); ((b>N-1)) && b=$((N-1)); out="../99-exports/parts/p$(printf %04d $a).mp4"
  [ -s "$out" ] && { echo "skip $a-$b"; continue; }
  for try in 1 2 3; do npx remotion render "$ID" "$out" --frames=$a-$b --gl=$GL --concurrency=$K --timeout=240000 --muted --log=error "$BR" && break; echo "retry $a-$b"; rm -f "$out"; done
  if [ -s "$out" ]; then echo "PART_DONE $a-$b $(date +%T)"; else echo "PART_FAILED $a-$b $(date +%T)"; fi
done; echo ALL_DONE
