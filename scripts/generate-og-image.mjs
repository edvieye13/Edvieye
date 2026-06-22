import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const W = 1200;
const H = 630;

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// ── Background: white → light blue gradient ──────────────────────────
const bg = ctx.createLinearGradient(0, 0, W, H);
bg.addColorStop(0, '#ffffff');
bg.addColorStop(0.55, '#f7fbff');
bg.addColorStop(1, '#eef5ff');
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

// Radial highlight top-left
const hl = ctx.createRadialGradient(0, 0, 0, 0, 0, 700);
hl.addColorStop(0, 'rgba(56,189,248,0.13)');
hl.addColorStop(1, 'rgba(255,255,255,0)');
ctx.fillStyle = hl;
ctx.fillRect(0, 0, W, H);

// Bottom-right purple accent
const pr = ctx.createRadialGradient(W, H, 0, W, H, 600);
pr.addColorStop(0, 'rgba(111,76,230,0.10)');
pr.addColorStop(1, 'rgba(255,255,255,0)');
ctx.fillStyle = pr;
ctx.fillRect(0, 0, W, H);

// ── Top accent bar ───────────────────────────────────────────────────
const barGrad = ctx.createLinearGradient(0, 0, W, 0);
barGrad.addColorStop(0, '#1a4fff');
barGrad.addColorStop(0.5, '#0a84d8');
barGrad.addColorStop(1, '#6f4ce6');
ctx.fillStyle = barGrad;
ctx.fillRect(0, 0, W, 6);

// ── Subtle grid lines ────────────────────────────────────────────────
ctx.strokeStyle = 'rgba(26,79,255,0.05)';
ctx.lineWidth = 1;
for (let x = 0; x <= W; x += 60) {
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
}
for (let y = 0; y <= H; y += 60) {
  ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
}

// ── Border ───────────────────────────────────────────────────────────
ctx.strokeStyle = 'rgba(26,79,255,0.12)';
ctx.lineWidth = 2;
ctx.strokeRect(1, 1, W - 2, H - 2);

// Inner accent border
ctx.strokeStyle = 'rgba(0,212,255,0.08)';
ctx.lineWidth = 1;
ctx.strokeRect(12, 12, W - 24, H - 24);

// ── Logo ─────────────────────────────────────────────────────────────
const logoPath = resolve(ROOT, 'public', 'edvieye-logo-transparent.png');
const logo = await loadImage(readFileSync(logoPath));
const logoSize = 170;
const logoX = 72;
const logoY = H / 2 - logoSize / 2 - 20;
ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

// ── Brand name ───────────────────────────────────────────────────────
const textX = logoX + logoSize + 40;

// "EDVIEYE" — large gradient text
ctx.save();
const nameGrad = ctx.createLinearGradient(textX, 0, textX + 500, 0);
nameGrad.addColorStop(0, '#0f1b35');
nameGrad.addColorStop(0.5, '#1a4fff');
nameGrad.addColorStop(1, '#0a84d8');
ctx.fillStyle = nameGrad;
ctx.font = 'bold 86px Arial, sans-serif';
ctx.fillText('EDVIEYE', textX, 220);
ctx.restore();

// Tagline line under brand
const lineY = 240;
ctx.strokeStyle = 'rgba(0,212,255,0.4)';
ctx.lineWidth = 2;
ctx.beginPath(); ctx.moveTo(textX, lineY); ctx.lineTo(textX + 620, lineY); ctx.stroke();

// ── Sub-headline ──────────────────────────────────────────────────────
ctx.fillStyle = '#1a4fff';
ctx.font = 'bold 34px Arial, sans-serif';
ctx.fillText('AI-Powered School ERP', textX, 292);

// ── Description ───────────────────────────────────────────────────────
ctx.fillStyle = '#5f6f85';
ctx.font = '22px Arial, sans-serif';
ctx.fillText('Smart Attendance · Fee Automation · Predictive Analytics', textX, 340);
ctx.fillText('Parent Portal · GPS Tracking · Real-time Dashboards', textX, 372);

// ── Tagline pill ──────────────────────────────────────────────────────
const pillX = textX;
const pillY = 410;
const pillW = 320;
const pillH = 42;
const pillR = 8;

ctx.fillStyle = 'rgba(26,79,255,0.08)';
ctx.strokeStyle = 'rgba(26,79,255,0.25)';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.roundRect(pillX, pillY, pillW, pillH, pillR);
ctx.fill(); ctx.stroke();

// Decorative dots
ctx.fillStyle = '#1a4fff';
ctx.beginPath(); ctx.arc(pillX + 20, pillY + 21, 4, 0, Math.PI * 2); ctx.fill();
ctx.beginPath(); ctx.arc(pillX + pillW - 20, pillY + 21, 4, 0, Math.PI * 2); ctx.fill();

ctx.fillStyle = '#1a4fff';
ctx.font = 'bold 16px Arial, sans-serif';
ctx.fillText('AI Flow, Education Glow', pillX + 34, pillY + 27);

// ── "Made in India" badge ─────────────────────────────────────────────
const badgeX = pillX + pillW + 18;
const badgeY = pillY;
const badgeW = 196;

ctx.fillStyle = 'rgba(255,153,0,0.07)';
ctx.strokeStyle = 'rgba(255,153,0,0.32)';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.roundRect(badgeX, badgeY, badgeW, pillH, pillR);
ctx.fill(); ctx.stroke();

// Mini India tricolor flag
const fx = badgeX + 14;
const fy = pillY + 12;
const fw = 22;
const fh = 18;
ctx.fillStyle = '#FF9933';
ctx.fillRect(fx, fy, fw, fh / 3);
ctx.fillStyle = '#ffffff';
ctx.fillRect(fx, fy + fh / 3, fw, fh / 3);
ctx.fillStyle = '#138808';
ctx.fillRect(fx, fy + (fh / 3) * 2, fw, fh / 3);
// Ashoka wheel (simple circle)
ctx.strokeStyle = '#000080';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.arc(fx + fw / 2, fy + fh / 2, 3, 0, Math.PI * 2);
ctx.stroke();
// Flag border
ctx.strokeStyle = 'rgba(0,0,0,0.15)';
ctx.lineWidth = 0.5;
ctx.strokeRect(fx, fy, fw, fh);

ctx.fillStyle = '#b45309';
ctx.font = 'bold 15px Arial, sans-serif';
ctx.fillText('Made in India', fx + fw + 10, badgeY + 27);

// ── Website URL ───────────────────────────────────────────────────────
ctx.fillStyle = '#0a84d8';
ctx.font = 'bold 18px Arial, sans-serif';
ctx.fillText('edvieye.com', textX, 502);

// ── Feature chips at bottom ───────────────────────────────────────────
const chips = ['AI Vision', 'Fee Automation', 'ML Analytics', 'Parent Portal', 'GPS Live', 'HR Ready'];
let cx2 = 72;
const cy2 = H - 52;

chips.forEach(chip => {
  const tw = ctx.measureText(chip).width;
  const cw = tw + 28;
  const ch = 32;

  ctx.fillStyle = 'rgba(10,132,216,0.07)';
  ctx.strokeStyle = 'rgba(10,132,216,0.28)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(cx2, cy2, cw, ch, 6);
  ctx.fill(); ctx.stroke();

  ctx.fillStyle = '#0a84d8';
  ctx.font = '13px Arial, sans-serif';
  ctx.fillText(chip, cx2 + 14, cy2 + 21);

  cx2 += cw + 10;
});

// ── Save OG image ─────────────────────────────────────────────────────
const outDir = resolve(ROOT, 'public');
mkdirSync(outDir, { recursive: true });
const out = resolve(outDir, 'edvieye-og-image.png');
writeFileSync(out, canvas.toBuffer('image/png'));
console.log(`✓ OG image saved → ${out}`);

// ── Favicon 32×32 ────────────────────────────────────────────────────
const favCanvas = createCanvas(32, 32);
const favCtx = favCanvas.getContext('2d');
favCtx.drawImage(logo, 0, 0, 32, 32);
writeFileSync(resolve(outDir, 'favicon.png'), favCanvas.toBuffer('image/png'));
console.log('✓ favicon.png saved');

// ── Apple touch icon 180×180 ─────────────────────────────────────────
const appleCanvas = createCanvas(180, 180);
const appleCtx = appleCanvas.getContext('2d');
appleCtx.fillStyle = '#ffffff';
appleCtx.fillRect(0, 0, 180, 180);
appleCtx.drawImage(logo, 10, 10, 160, 160);
writeFileSync(resolve(outDir, 'apple-touch-icon.png'), appleCanvas.toBuffer('image/png'));
console.log('✓ apple-touch-icon.png saved');

// ── 192×192 for Android / PWA manifest ───────────────────────────────
const androidCanvas = createCanvas(192, 192);
const androidCtx = androidCanvas.getContext('2d');
androidCtx.fillStyle = '#ffffff';
androidCtx.fillRect(0, 0, 192, 192);
androidCtx.drawImage(logo, 16, 16, 160, 160);
writeFileSync(resolve(outDir, 'icon-192.png'), androidCanvas.toBuffer('image/png'));
console.log('✓ icon-192.png saved');
