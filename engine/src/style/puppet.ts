// 2D stick-figure puppet v3: thick bean body, thin sticks, shading, physics-driven transforms, nervous acting.
export type Look = {
  skin: string; body: string; outfit?: "suit" | "leather" | "blazer" | "hoodie" | "shirt"; tie?: string; shirt?: string;
  hair?: "none" | "short" | "bob" | "swept" | "grey"; hairColor?: string; glasses?: boolean; badge?: string; hat?: string; shoe?: string; seed?: number /* unique head for main characters; undefined = shared NPC head */; mustache?: string;
  /* v5.1 main-character details */ sleeve?: string; pants?: string; stubble?: boolean; freckles?: boolean; ears?: boolean; brows?: number; lashes?: boolean; lips?: string; earring?: string; bowtie?: string; scarf?: string; patch?: string; flower?: string; sneakers?: boolean;
};
export type Arms = "down" | "up" | "hold" | "point" | "head" | "chest" | "box" | "shrug";
export type Pose = {
  t: number; walk?: number /* phase radians */; speed?: number /* 0..1 stride amplitude */; mood?: "grin" | "smile" | "shock" | "deadpan" | "worry" | "angry" | "laugh" | "gulp";
  arms?: Arms; armK?: number; armR?: [number, number]; armL?: [number, number]; armRK?: number; armLK?: number; /* IK hand targets in puppet-height units: x from body centre (screen right +), y from feet up */ nerv?: number; sweat?: number; squash?: number; tilt?: number; lookX?: number; flip?: boolean; hunch?: number; air?: number;
};
export const INK = "#0b0d1a";
const sh = (c: CanvasRenderingContext2D, color: string, f: () => void) => { c.save(); f(); c.restore(); };
// v5: deformed head (not a perfect circle). Main characters get a unique seed, NPCs share NPC_SEED so crowds look uniform.
export const NPC_SEED = 7;
const rr = (seed: number, k: number) => { const x = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
const headShape = (seed: number) => {
  const a2 = 0.05 + rr(seed, 1) * 0.07, a3 = 0.03 + rr(seed, 2) * 0.06, a5 = 0.015 + rr(seed, 3) * 0.03, p2 = rr(seed, 4) * 6.28, p3 = rr(seed, 5) * 6.28, p5 = rr(seed, 6) * 6.28;
  const main = seed !== NPC_SEED, sx = main ? 0.84 + rr(seed, 7) * 0.1 : 0.92 + rr(seed, 7) * 0.2, sy = main ? 1.16 + rr(seed, 8) * 0.14 : 0.94 + rr(seed, 8) * 0.14, eyeL = 0.92 + rr(seed, 9) * 0.3, eyeR = 0.92 + rr(seed, 10) * 0.3, gap = 0.34 + rr(seed, 11) * 0.1, mx = (rr(seed, 12) - 0.5) * 16, nx = (rr(seed, 13) - 0.5) * 10;
  const f = (t: number) => (1 + a2 * Math.cos(2 * t + p2) + a3 * Math.cos(3 * t + p3) + a5 * Math.cos(5 * t + p5));
  return { f, sx, sy, eyeL, eyeR, gap, mx, nx, tooth: rr(seed, 14) > 0.5 };
};
export function drawPuppet(c: CanvasRenderingContext2D, W: number, H: number, look: Look, p: Pose) {
  c.clearRect(0, 0, W, H); c.save();
  const hs = headShape(look.seed ?? NPC_SEED);
  const S = W / 400, cx = W / 2, feetY = H * 0.983, nerv = p.nerv ?? 0;
  const sq = p.squash ?? 0, tilt = p.tilt ?? 0;
  if (p.flip) { c.translate(W, 0); c.scale(-1, 1); }
  // shiver: whole-body jitter
  const jx = nerv > 0.5 ? Math.sin(p.t * 2.9) * 1.6 * S * (nerv - 0.5) * 2 : 0, jy = 0;
  c.translate(cx + jx, feetY + jy); c.rotate(tilt); c.scale(1 - sq * 0.55, 1 + sq); c.translate(-cx, -feetY);
  c.lineCap = "round"; c.lineJoin = "round"; c.strokeStyle = INK;
  const w = p.walk, amp = p.speed ?? 0, moving = w !== undefined && amp > 0;
  const breath = Math.sin(p.t * 0.12) * 0.012, hunch = p.hunch ?? 0;
  const bodyTopBase = H * 0.43, bodyH = H * 0.245 * (1 + breath), bodyW = W * 0.34;
  const bob = moving ? Math.abs(Math.sin(w!)) * 9 * S * amp : 0;
  const bodyTop = bodyTopBase - bob + hunch * 8 * S;
  const shoe = look.shoe ?? INK;
  // legs
  for (const s of [-1, 1]) {
    const ph = moving ? Math.sin(w! + (s > 0 ? Math.PI : 0)) : 0, lift = moving ? Math.max(0, Math.cos(w! + (s > 0 ? Math.PI : 0))) : 0;
    const sw = moving ? ph * 52 * S * amp : s * 12 * S + (p.air ? s * 14 * S : 0);
    const x0 = cx + s * 19 * S, y0 = bodyTop + bodyH - 10 * S, fy = feetY - 12 * S - (moving ? lift * 14 * S * amp : 0) - (p.air ?? 0) * 18 * S;
    const legPath = () => { c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo(x0 + sw * 0.2, (y0 + fy) / 2, x0 + sw, fy); };
    if (look.pants) { c.lineWidth = 11.5 * S; legPath(); c.stroke(); c.strokeStyle = look.pants; c.lineWidth = 6.5 * S; legPath(); c.stroke(); c.strokeStyle = INK; } else { c.lineWidth = 8 * S; legPath(); c.stroke(); }
    c.fillStyle = shoe; c.lineWidth = 5 * S; c.beginPath(); c.ellipse(x0 + sw + 12 * S, fy + 6 * S, 25 * S, 11 * S, 0, 0, 7); c.fill(); c.stroke();
    if (look.sneakers) { c.strokeStyle = "#fff"; c.lineWidth = 4 * S; c.beginPath(); c.ellipse(x0 + sw + 12 * S, fy + 8 * S, 23 * S, 8 * S, 0, 0.15, Math.PI - 0.15); c.stroke(); c.strokeStyle = INK; c.lineWidth = 3 * S; c.beginPath(); c.moveTo(x0 + sw + 4 * S, fy - 2 * S); c.lineTo(x0 + sw + 14 * S, fy - 3 * S); c.stroke(); }
  }
  // arms
  const mode = p.arms ?? "down", ak = p.armK ?? 1;
  const hr = W * 0.275;
  const hyBase = bodyTop - hr * 0.5, hxBase = cx + hunch * 14 * S;
  for (const s of [-1, 1]) {
    const swing = moving ? Math.sin(w! + (s > 0 ? 0 : Math.PI)) * 30 * S * amp : 0;
    const sx = cx + s * bodyW * 0.46, sy = bodyTop + bodyH * 0.22;
    let ex = sx + s * 30 * S, ey = bodyTop + bodyH * 1.22 + swing * 0.3, bend = 12 * S;
    const tremble = nerv ? Math.sin(p.t * 3.1 + s) * 5 * S * nerv : 0;
    const target = (tx: number, ty: number) => { ex = ex + (tx - ex) * ak; ey = ey + (ty - ey) * ak; };
    if (mode === "up") target(sx + s * 20 * S, sy - 150 * S);
    if (mode === "head") { target(hxBase + s * hr * 0.98, hyBase + hr * 0.05); bend = 40 * S; }
    if (mode === "chest") target(cx + s * 14 * S, bodyTop + bodyH * 0.38);
    if (mode === "hold") target(cx + s * 30 * S, bodyTop + bodyH * 0.5);
    if (mode === "box") target(cx + s * 52 * S, bodyTop + bodyH * 0.6);
    if (mode === "shrug") target(sx + s * 52 * S, sy + 24 * S);
    if (mode === "point" && s > 0) target(sx + 150 * S, sy - 14 * S);
    const ik = s > 0 ? p.armR : p.armL, ikK = s > 0 ? (p.armRK ?? 1) : (p.armLK ?? 1);
    if (ik) { const tx = cx + ik[0] * H, ty = (0.983 - ik[1]) * H; ex = ex + (tx - ex) * ikK; ey = ey + (ty - ey) * ikK; bend = 14 * S; }
    ex += tremble; ey += tremble * 0.6;
    const armPath = () => { c.beginPath(); c.moveTo(sx, sy); c.quadraticCurveTo((sx + ex) / 2 + s * bend, (sy + ey) / 2 + 12 * S, ex, ey); };
    if (look.sleeve) { c.lineWidth = 11 * S; armPath(); c.stroke(); c.strokeStyle = look.sleeve; c.lineWidth = 6 * S; armPath(); c.stroke(); c.strokeStyle = INK; } else { c.lineWidth = 7.5 * S; armPath(); c.stroke(); }
    if (look.sleeve) { c.fillStyle = look.skin; c.lineWidth = 4.5 * S; c.beginPath(); c.arc(ex, ey, 12.5 * S, 0, 7); c.fill(); c.stroke(); } else { c.fillStyle = INK; c.beginPath(); c.arc(ex, ey, 12 * S, 0, 7); c.fill(); }
  }
  // torso
  const torso = () => { const bw = bodyW / 2, bt = bodyTop, bb = bodyTop + bodyH; c.beginPath(); c.moveTo(cx - bw, bt + 24 * S); c.quadraticCurveTo(cx - bw * 1.18, bt + bodyH * 0.55, cx - bw * 0.72, bb); c.quadraticCurveTo(cx, bb + 14 * S, cx + bw * 0.72, bb); c.quadraticCurveTo(cx + bw * 1.18, bt + bodyH * 0.55, cx + bw, bt + 24 * S); c.quadraticCurveTo(cx, bt - 14 * S, cx - bw, bt + 24 * S); };
  c.lineWidth = 10 * S; c.fillStyle = look.body; torso(); c.fill();
  c.save(); torso(); c.clip();
  const o = look.outfit ?? "shirt"; c.lineWidth = 6 * S;
  if (o === "suit" || o === "blazer") {
    c.fillStyle = look.shirt ?? "#f4f4f4"; c.beginPath(); c.moveTo(cx - 28 * S, bodyTop - 4 * S); c.lineTo(cx + 28 * S, bodyTop - 4 * S); c.lineTo(cx, bodyTop + bodyH * 0.64); c.closePath(); c.fill(); c.stroke();
    if (look.tie && o === "suit") { const sway = Math.sin(p.t * 0.2) * 3 * S + (moving ? Math.sin(w!) * 5 * S : 0); c.fillStyle = look.tie; c.beginPath(); c.moveTo(cx, bodyTop + 8 * S); c.lineTo(cx + 14 * S, bodyTop + 34 * S); c.lineTo(cx + sway, bodyTop + bodyH * 0.74); c.lineTo(cx - 14 * S, bodyTop + 34 * S); c.closePath(); c.fill(); c.stroke(); }
    c.beginPath(); c.moveTo(cx - 40 * S, bodyTop - 6 * S); c.lineTo(cx, bodyTop + bodyH * 0.68); c.lineTo(cx + 40 * S, bodyTop - 6 * S); c.stroke();
    c.fillStyle = INK; for (const k of [0.8, 0.92]) { c.beginPath(); c.arc(cx, bodyTop + bodyH * k, 4.5 * S, 0, 7); c.fill(); }
    c.fillStyle = "rgba(255,255,255,.55)"; c.fillRect(cx - bodyW * 0.35, bodyTop + bodyH * 0.35, 18 * S, 6 * S); // pocket square
  } else if (o === "leather") {
    c.fillStyle = "#eceef5"; c.beginPath(); c.moveTo(cx - 30 * S, bodyTop - 4 * S); c.lineTo(cx + 30 * S, bodyTop - 4 * S); c.lineTo(cx, bodyTop + bodyH * 0.58); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = "#3a3d4a";
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(cx + s * 44 * S, bodyTop - 8 * S); c.lineTo(cx + s * 7 * S, bodyTop + 22 * S); c.lineTo(cx + s * 11 * S, bodyTop + bodyH + 6); c.lineTo(cx + s * bodyW, bodyTop + bodyH); c.closePath(); c.fill(); c.stroke(); }
    c.strokeStyle = "#9aa0b8"; c.lineWidth = 4 * S; c.beginPath(); c.moveTo(cx - 8 * S, bodyTop + bodyH * 0.45); c.lineTo(cx - 12 * S, bodyTop + bodyH * 0.95); c.moveTo(cx + 8 * S, bodyTop + bodyH * 0.45); c.lineTo(cx + 12 * S, bodyTop + bodyH * 0.95); c.stroke();
    c.fillStyle = "rgba(255,255,255,.22)"; c.beginPath(); c.ellipse(cx - bodyW * 0.3, bodyTop + bodyH * 0.3, 10 * S, 28 * S, 0.3, 0, 7); c.fill(); // leather shine
  } else if (o === "hoodie") {
    c.fillStyle = "rgba(0,0,0,.18)"; c.beginPath(); c.ellipse(cx, bodyTop + 6 * S, 46 * S, 18 * S, 0, 0, 7); c.fill();
    c.strokeStyle = "#fff"; c.lineWidth = 4 * S; c.beginPath(); c.moveTo(cx - 12 * S, bodyTop + 16 * S); c.lineTo(cx - 12 * S, bodyTop + 70 * S); c.moveTo(cx + 12 * S, bodyTop + 16 * S); c.lineTo(cx + 12 * S, bodyTop + 70 * S); c.stroke();
  } else { c.fillStyle = "rgba(255,255,255,.3)"; c.beginPath(); c.ellipse(cx - 34 * S, bodyTop + 44 * S, 14 * S, 42 * S, 0.2, 0, 7); c.fill(); c.strokeStyle = "rgba(0,0,0,.25)"; c.lineWidth = 4 * S; c.beginPath(); c.moveTo(cx - 20 * S, bodyTop + bodyH * 0.8); c.quadraticCurveTo(cx, bodyTop + bodyH * 0.68, cx + 24 * S, bodyTop + bodyH * 0.8); c.stroke(); }
  // form shading (right side darker, bottom darker)
  const g = c.createLinearGradient(cx - bodyW / 2, 0, cx + bodyW / 2, 0); g.addColorStop(0, "rgba(255,255,255,.10)"); g.addColorStop(0.55, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,20,.34)"); c.fillStyle = g; c.fillRect(cx - bodyW, bodyTop - 20, bodyW * 2, bodyH + 40);
  c.restore();
  c.lineWidth = 10 * S; torso(); c.stroke();
  if (look.patch) { c.fillStyle = "#FAF0DC"; c.strokeStyle = INK; c.lineWidth = 4 * S; c.beginPath(); c.arc(cx - bodyW * 0.2, bodyTop + bodyH * 0.55, 15 * S, 0, 7); c.fill(); c.stroke(); c.fillStyle = INK; c.font = `900 ${22 * S}px Arial`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(look.patch, cx - bodyW * 0.2, bodyTop + bodyH * 0.55 + 1 * S); }
  if (look.bowtie) { c.fillStyle = look.bowtie; c.strokeStyle = INK; c.lineWidth = 4.5 * S; const by = bodyTop + 8 * S; for (const s2 of [-1, 1]) { c.beginPath(); c.moveTo(cx, by); c.lineTo(cx + s2 * 26 * S, by - 12 * S); c.lineTo(cx + s2 * 26 * S, by + 12 * S); c.closePath(); c.fill(); c.stroke(); } c.beginPath(); c.arc(cx, by, 6 * S, 0, 7); c.fill(); c.stroke(); }
  if (look.flower) { c.fillStyle = look.flower; c.strokeStyle = INK; c.lineWidth = 3.5 * S; c.beginPath(); c.arc(cx + bodyW * 0.3, bodyTop + bodyH * 0.2, 8 * S, 0, 7); c.fill(); c.stroke(); c.fillStyle = INK; c.beginPath(); c.arc(cx + bodyW * 0.3, bodyTop + bodyH * 0.2, 2.5 * S, 0, 7); c.fill(); }
  if (look.scarf) { const sway = Math.sin(p.t * 0.2) * 4 * S + (moving ? Math.sin(w!) * 6 * S : 0); c.fillStyle = look.scarf; c.strokeStyle = INK; c.lineWidth = 5 * S; c.beginPath(); c.ellipse(cx, bodyTop + 4 * S, bodyW * 0.46, 15 * S, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.moveTo(cx + 8 * S, bodyTop + 14 * S); c.lineTo(cx + 34 * S + sway, bodyTop + bodyH * 0.62); c.lineTo(cx + 12 * S + sway, bodyTop + bodyH * 0.66); c.lineTo(cx - 2 * S, bodyTop + 16 * S); c.closePath(); c.fill(); c.stroke(); c.strokeStyle = "rgba(255,255,255,.35)"; c.lineWidth = 3 * S; c.beginPath(); c.moveTo(cx + 14 * S + sway * 0.8, bodyTop + bodyH * 0.45); c.lineTo(cx + 26 * S + sway, bodyTop + bodyH * 0.5); c.stroke(); c.strokeStyle = INK; }
  if (look.badge) { const sw = Math.sin(p.t * 0.15) * 2 * S + (moving ? Math.sin(w!) * 4 * S : 0); c.fillStyle = "#fff"; c.strokeStyle = INK; c.lineWidth = 4 * S; c.fillRect(cx + 22 * S + sw, bodyTop + bodyH * 0.42, 36 * S, 46 * S); c.strokeRect(cx + 22 * S + sw, bodyTop + bodyH * 0.42, 36 * S, 46 * S); c.fillStyle = look.badge; c.fillRect(cx + 26 * S + sw, bodyTop + bodyH * 0.42 + 4 * S, 28 * S, 11 * S); c.fillStyle = "#99a"; c.fillRect(cx + 28 * S + sw, bodyTop + bodyH * 0.42 + 22 * S, 24 * S, 4 * S); c.fillRect(cx + 28 * S + sw, bodyTop + bodyH * 0.42 + 31 * S, 16 * S, 4 * S); }
  // head
  const hy = hyBase + Math.sin(p.t * 0.12) * 1.5 * S + (moving ? Math.sin((w ?? 0) * 2) * 3 * S * amp : 0), hx = hxBase;
  const hc = look.hairColor ?? "#2a1a12", hair = look.hair ?? "none";
  const headR = (a: number) => (hair === "bob" ? 0.88 : 1) * hr * hs.f(a);
  const headPath = () => { c.beginPath(); for (let i = 0; i <= 56; i++) { const a = i / 56 * Math.PI * 2, r = headR(a); const x = hx + r * Math.cos(a) * hs.sx, y = hy + r * Math.sin(a) * hs.sy; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); };
  c.lineWidth = 11 * S;
  if (hair === "bob") { c.fillStyle = hc; c.beginPath(); c.ellipse(hx, hy + hr * 0.18, hr * 1.05, hr * 1.12, 0, 0, 7); c.fill(); c.stroke(); }
  if (look.ears) { c.fillStyle = look.skin; c.lineWidth = 7 * S; for (const s2 of [-1, 1]) { const ea = s2 > 0 ? 0 : Math.PI; c.beginPath(); c.ellipse(hx + s2 * headR(ea) * hs.sx * 0.99, hy + hr * 0.12, hr * 0.17, hr * 0.24, s2 * 0.2, 0, 7); c.fill(); c.stroke(); } }
  c.fillStyle = look.skin; headPath(); c.fill();
  c.save(); headPath(); c.clip();
  const hg = c.createRadialGradient(hx - hr * 0.35, hy - hr * 0.35, hr * 0.1, hx, hy, hr * 1.1); hg.addColorStop(0, "rgba(255,255,255,.28)"); hg.addColorStop(0.6, "rgba(0,0,0,0)"); hg.addColorStop(1, "rgba(60,20,0,.25)"); c.fillStyle = hg; c.fillRect(hx - hr, hy - hr, hr * 2, hr * 2);
  if (nerv > 0.2 || p.mood === "shock" || p.mood === "worry") { c.fillStyle = `rgba(255,90,90,${0.18 + nerv * 0.2})`; for (const s of [-1, 1]) { c.beginPath(); c.ellipse(hx + s * hr * 0.55, hy + hr * 0.3, hr * 0.2, hr * 0.12, 0, 0, 7); c.fill(); } }
  c.restore(); c.strokeStyle = INK; c.lineWidth = 11 * S; headPath(); c.stroke();
  if (look.earring) { c.fillStyle = look.earring; c.lineWidth = 4 * S; for (const s2 of [-1, 1]) { c.beginPath(); c.arc(hx + s2 * headR(s2 > 0 ? 0 : Math.PI) * hs.sx * 0.97, hy + hr * 0.4, 8 * S, 0, 7); c.fill(); c.stroke(); } }
  if (hair !== "none" && hair !== "bob") {
    c.fillStyle = hair === "grey" ? "#a9aab4" : hc; c.lineWidth = 8 * S; c.beginPath(); for (let i = 0; i <= 24; i++) { const a = Math.PI * (1.04 + 0.92 * i / 24), r = headR(a) - 4 * S; const x = hx + r * Math.cos(a) * hs.sx, y = hy + r * Math.sin(a) * hs.sy; i ? c.lineTo(x, y) : c.moveTo(x, y); }
    if (hair === "swept") c.quadraticCurveTo(hx + hr * 0.35, hy - hr * 0.7, hx - hr * 0.95, hy - hr * 0.18); else c.quadraticCurveTo(hx, hy - hr * 0.3, hx - hr * 0.95, hy - hr * 0.3);
    c.fill(); c.stroke();
    c.strokeStyle = "rgba(255,255,255,.25)"; c.lineWidth = 4 * S; c.beginPath(); c.arc(hx, hy, hr * 0.78, Math.PI * 1.2, Math.PI * 1.45); c.stroke(); c.strokeStyle = INK;
  }
  if (hair === "bob") { c.fillStyle = hc; c.lineWidth = 7 * S; c.beginPath(); c.arc(hx, hy - hr * 0.1, hr * 0.85, Math.PI * 1.03, Math.PI * 1.97); c.quadraticCurveTo(hx, hy - hr * 0.4, hx - hr * 0.82, hy - hr * 0.1); c.fill(); }
  // face
  c.lineWidth = 6 * S; c.strokeStyle = INK; const m = p.mood ?? "smile";
  const blink = (p.t % 100) > 96, eyeY = hy + hr * 0.03, ex0 = hx - hr * hs.gap, ex1 = hx + hr * hs.gap;
  const dartX = (nerv ? Math.sin(p.t * 0.33) * 6 * S * nerv : 0) + (p.lookX ?? 0) * 7 * S;
  const eye = (ex: number, k = 1) => {
    if (m === "grin" || m === "laugh") { c.beginPath(); c.arc(ex, eyeY + 9 * S, 16 * S, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); return; }
    if (blink) { c.beginPath(); c.moveTo(ex - 14 * S, eyeY); c.lineTo(ex + 14 * S, eyeY); c.stroke(); return; }
    const r = (m === "shock" ? 23 * S : 14.5 * S) * k; c.fillStyle = "#fff"; c.beginPath(); c.arc(ex, eyeY, r, 0, 7); c.fill(); c.stroke();
    c.fillStyle = INK; c.beginPath(); c.arc(ex + dartX, eyeY + 1, m === "shock" ? 4.5 * S : 5.8 * S, 0, 7); c.fill();
    c.fillStyle = "#fff"; c.beginPath(); c.arc(ex + dartX - 1.5 * S, eyeY - 1.5 * S, 1.6 * S, 0, 7); c.fill();
  };
  eye(ex0, hs.eyeL); eye(ex1, hs.eyeR);
  if (look.brows) { c.strokeStyle = hc; c.lineWidth = 6.5 * S * look.brows; for (const [ex, k] of [[ex0, hs.eyeL], [ex1, hs.eyeR]] as [number, number][]) { c.beginPath(); c.moveTo(ex - 15 * S, eyeY - 27 * S * k); c.quadraticCurveTo(ex, eyeY - 36 * S * k, ex + 15 * S, eyeY - 27 * S * k); c.stroke(); } c.strokeStyle = INK; }
  if (look.lashes) { c.lineWidth = 4 * S; for (const [ex, sgn] of [[ex0, -1], [ex1, 1]] as [number, number][]) for (let i = 0; i < 3; i++) { const a = -0.9 + i * 0.5; c.beginPath(); c.moveTo(ex + sgn * 8 * S + Math.cos(a) * 12 * S * sgn, eyeY + Math.sin(a) * 12 * S - 2 * S); c.lineTo(ex + sgn * 8 * S + Math.cos(a) * 22 * S * sgn, eyeY + Math.sin(a) * 22 * S - 2 * S); c.stroke(); } }
  if (look.freckles) { c.fillStyle = "rgba(150,70,30,.6)"; for (let i = 0; i < 8; i++) { const sg = i % 2 ? 1 : -1; c.beginPath(); c.arc(hx + sg * hr * (0.42 + (i % 3) * 0.1), hy + hr * (0.3 + (i % 4) * 0.045), 2.6 * S, 0, 7); c.fill(); } }
  if (look.stubble) { c.fillStyle = "rgba(40,25,15,.5)"; for (let i = 0; i < 26; i++) { const a = Math.PI * (0.18 + 0.64 * (i / 25)), r = headR(a) * (0.72 + (i % 3) * 0.07); c.beginPath(); c.arc(hx + Math.cos(a) * r * hs.sx, hy + Math.sin(a) * r * hs.sy, 2.1 * S, 0, 7); c.fill(); } }
  c.fillStyle = "rgba(160,70,40,.0)";
  c.fillStyle = "rgba(255,90,110,.28)"; for (const s2 of [-1, 1]) { c.beginPath(); c.ellipse(hx + s2 * hr * 0.62 * hs.sx, hy + hr * 0.42, hr * 0.16, hr * 0.1, 0, 0, 7); c.fill(); }
  c.fillStyle = "rgba(160,70,40,.35)"; c.strokeStyle = "rgba(60,20,10,.55)"; c.lineWidth = 3.5 * S; c.beginPath(); c.ellipse(hx + hs.nx * S, hy + hr * 0.26, 9 * S, 7 * S, 0, 0, 7); c.fill(); c.stroke(); c.strokeStyle = INK;
  c.lineWidth = 6 * S; c.strokeStyle = INK; c.beginPath();
  if (m === "angry") { c.moveTo(ex0 - 20 * S, eyeY - 32 * S); c.lineTo(ex0 + 16 * S, eyeY - 17 * S); c.moveTo(ex1 + 20 * S, eyeY - 32 * S); c.lineTo(ex1 - 16 * S, eyeY - 17 * S); }
  else if (m === "worry" || m === "gulp") { const tw = nerv ? Math.sin(p.t * 0.7) * 3 * S : 0; c.moveTo(ex0 - 16 * S, eyeY - 16 * S + tw); c.lineTo(ex0 + 16 * S, eyeY - 32 * S); c.moveTo(ex1 + 16 * S, eyeY - 16 * S - tw); c.lineTo(ex1 - 16 * S, eyeY - 32 * S); }
  else if (m === "shock") { c.moveTo(ex0 - 16 * S, eyeY - 40 * S); c.lineTo(ex0 + 16 * S, eyeY - 40 * S); c.moveTo(ex1 - 16 * S, eyeY - 40 * S); c.lineTo(ex1 + 16 * S, eyeY - 40 * S); }
  else if (m === "deadpan") { c.moveTo(ex0 - 16 * S, eyeY - 26 * S); c.lineTo(ex0 + 16 * S, eyeY - 22 * S); c.moveTo(ex1 - 16 * S, eyeY - 22 * S); c.lineTo(ex1 + 16 * S, eyeY - 26 * S); }
  c.stroke();
  const my = hy + hr * 0.5, mxo = hs.mx * S; c.beginPath();
  if (m === "grin" || m === "laugh") { c.fillStyle = "#fff"; c.roundRect(hx - 34 * S, my - 12 * S, 68 * S, m === "laugh" ? 46 * S : 30 * S, 9 * S); c.fill(); c.stroke(); c.lineWidth = 3 * S; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(hx + i * 13 * S, my - 12 * S); c.lineTo(hx + i * 13 * S, my + 18 * S); c.stroke(); } }
  else if (m === "shock") { c.fillStyle = "#3a1020"; c.ellipse(hx, my + 8 * S, 13 * S, 21 * S, 0, 0, 7); c.fill(); c.stroke(); }
  else if (m === "worry" || m === "gulp") { const wob = nerv ? Math.sin(p.t * 1.9) * 3 * S : 0; c.moveTo(hx - 26 * S, my + 12 * S); c.quadraticCurveTo(hx, my - 6 * S + wob, hx + 26 * S, my + 12 * S); c.stroke(); }
  else if (m === "angry") { c.moveTo(hx - 26 * S, my + 14 * S); c.quadraticCurveTo(hx, my - 8 * S, hx + 26 * S, my + 14 * S); c.stroke(); }
  else if (m === "deadpan") { c.moveTo(hx - 20 * S, my + 4 * S); c.lineTo(hx + 20 * S, my + 4 * S); c.stroke(); }
  else { c.arc(hx + mxo, my - 14 * S, 30 * S, 0.35, Math.PI - 0.35); c.stroke(); if (look.lips) { c.strokeStyle = look.lips; c.lineWidth = 9 * S; c.beginPath(); c.arc(hx + mxo, my - 14 * S, 30 * S, 0.5, Math.PI - 0.5); c.stroke(); c.strokeStyle = INK; c.lineWidth = 6 * S; c.beginPath(); c.arc(hx + mxo, my - 14 * S, 30 * S, 0.35, Math.PI - 0.35); c.stroke(); }  }
  if (look.mustache) { const my2 = hy + hr * 0.37, mc = hx + mxo * 0.4; c.fillStyle = look.mustache; c.strokeStyle = INK; c.lineWidth = 4 * S; c.beginPath(); c.moveTo(mc, my2 - 3 * S); c.quadraticCurveTo(mc - 20 * S, my2 - 16 * S, mc - 50 * S, my2 + 6 * S); c.quadraticCurveTo(mc - 52 * S, my2 + 16 * S, mc - 38 * S, my2 + 12 * S); c.quadraticCurveTo(mc - 20 * S, my2 + 4 * S, mc, my2 + 8 * S); c.quadraticCurveTo(mc + 20 * S, my2 + 4 * S, mc + 38 * S, my2 + 12 * S); c.quadraticCurveTo(mc + 52 * S, my2 + 16 * S, mc + 50 * S, my2 + 6 * S); c.quadraticCurveTo(mc + 20 * S, my2 - 16 * S, mc, my2 - 3 * S); c.closePath(); c.fill(); c.stroke(); }
  if (look.glasses) { c.lineWidth = 6 * S; c.fillStyle = "rgba(190,225,255,.28)"; for (const ex of [ex0, ex1]) { c.beginPath(); c.arc(ex, eyeY, 28 * S, 0, 7); c.fill(); c.stroke(); } c.beginPath(); c.moveTo(ex0 + 28 * S, eyeY); c.lineTo(ex1 - 28 * S, eyeY); c.stroke(); }
  // sweat: drops sliding down the face + flung drops
  const sw = p.sweat ?? 0;
  if (sw > 0) {
    c.fillStyle = "#9bdcff"; c.strokeStyle = "#3f8fc4"; c.lineWidth = 3 * S;
    for (let k = 0; k < 3; k++) {
      const u = ((p.t * 0.035 + k / 3) % 1), x = hx + hr * (0.7 + 0.1 * k) * (k % 2 ? -1 : 1), y = hy - hr * 0.6 + u * hr * 1.4, r = (1 - u * 0.5) * 11 * S * sw;
      c.beginPath(); c.moveTo(x, y - r * 1.6); c.quadraticCurveTo(x + r, y, x, y + r * 0.6); c.quadraticCurveTo(x - r, y, x, y - r * 1.6); c.fill(); c.stroke();
    }
    if (sw > 0.6) for (let k = 0; k < 2; k++) { const u = ((p.t * 0.06 + k * 0.5) % 1), dir = k ? -1 : 1, x = hx + dir * (hr + u * 70 * S), y = hy - hr * 0.5 - Math.sin(u * Math.PI) * 40 * S + u * u * 60 * S; c.globalAlpha = 1 - u; c.beginPath(); c.arc(x, y, 6 * S, 0, 7); c.fill(); c.globalAlpha = 1; }
  }
  if (look.hat) { // baseball cap: dome following the head blob + brim
    c.fillStyle = look.hat; c.lineWidth = 8 * S; c.beginPath();
    for (let i = 0; i <= 24; i++) { const a = Math.PI * (1.08 + 0.84 * i / 24), r = headR(a) + 5 * S; const x = hx + r * Math.cos(a) * hs.sx, y = hy + r * Math.sin(a) * hs.sy - 3 * S; i ? c.lineTo(x, y) : c.moveTo(x, y); }
    c.lineTo(hx - hr * 0.78, hy - hr * 0.34); c.quadraticCurveTo(hx, hy - hr * 0.5, hx + hr * 0.78, hy - hr * 0.34); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(hx + hr * 0.62, hy - hr * 0.36, hr * 0.62, hr * 0.13, 0.06, 0, 7); c.fill(); c.stroke();
    c.fillStyle = "rgba(255,255,255,.35)"; c.beginPath(); c.ellipse(hx - hr * 0.25, hy - hr * 0.78, hr * 0.22, hr * 0.07, -0.4, 0, 7); c.fill(); }
  c.restore();
}
