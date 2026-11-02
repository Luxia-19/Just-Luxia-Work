/**
 * Tactile mail themes + envelope anatomy CSS.
 * The same CSS string powers the in-app envelope and the exported .html file,
 * so both render the identical animation and textures.
 */
export type MailKey = "matcha" | "neon" | "lotus" | "parchment" | "velvet";

export const MAIL_THEMES: { key: MailKey; label: string; emoji: string; seal: string; swatch: [string, string] }[] = [
  { key: "matcha", label: "Ceremonial Matcha", emoji: "🍵", seal: "🌿", swatch: ["#e2eadf", "#7a9371"] },
  { key: "neon", label: "Neon Slate", emoji: "🌌", seal: "⚡", swatch: ["#0c0d12", "#22d3ee"] },
  { key: "lotus", label: "Sacred Lotus & Silk", emoji: "🌸", seal: "🪷", swatch: ["#f7e9ec", "#d89ba8"] },
  { key: "parchment", label: "Antique Parchment & Gold", emoji: "📜", seal: "✒", swatch: ["#f4ecd8", "#8b2c1f"] },
  { key: "velvet", label: "Midnight Velvet", emoji: "🔮", seal: "☾", swatch: ["#101426", "#a5b4fc"] },
];

export const mailTheme = (k: MailKey) => MAIL_THEMES.find((m) => m.key === k) ?? MAIL_THEMES[3]!;

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .13 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const LINEN = "repeating-linear-gradient(0deg, rgba(60,80,50,.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(60,80,50,.05) 0 1px, transparent 1px 3px)";
const GRID = "linear-gradient(rgba(56,189,248,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.07) 1px, transparent 1px)";
const STAIN = "radial-gradient(ellipse at 20% 30%, rgba(140,95,40,.18), transparent 45%), radial-gradient(ellipse at 80% 75%, rgba(120,80,30,.16), transparent 50%), radial-gradient(circle at 60% 15%, rgba(150,110,50,.1), transparent 30%)";
const SILK = "linear-gradient(115deg, rgba(255,255,255,.35), transparent 30%, rgba(255,255,255,.25) 55%, transparent 80%)";
const STARS = "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.7), transparent), radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,.5), transparent), radial-gradient(1.5px 1.5px at 40% 80%, rgba(199,210,254,.6), transparent), radial-gradient(1px 1px at 85% 65%, rgba(255,255,255,.6), transparent)";

export const MAIL_CSS = `
.mt-matcha{--env-bg:#e2eadf;--env-tex:${NOISE},${LINEN};--env-line:#7a9371;--env-ink:#3f5236;--env-border:2px dashed #7a9371;--seal-bg:radial-gradient(circle at 35% 30%,#a8bf9c,#5f7a55 70%);--seal-ring:#4b6243;--glow:none;
 --l-bg:#f3f7f1;--l-tex:${NOISE};--l-ink:#1f2d1b;--l-accent:#5f7a55;--l-font:"Fraunces",Georgia,serif;--l-head:"Caveat",cursive;--l-border:1px solid #c9d6c2;--l-div:"❦ ❦ ❦"}
.mt-neon{--env-bg:#0c0d12;--env-tex:${NOISE},linear-gradient(135deg,rgba(34,211,238,.06),transparent 40%,rgba(236,72,153,.07));--env-line:rgba(6,182,212,.55);--env-ink:#67e8f9;--env-border:1px solid rgba(6,182,212,.4);--seal-bg:radial-gradient(circle at 35% 30%,#f0abfc,#db2777 70%);--seal-ring:#22d3ee;--glow:0 0 14px rgba(34,211,238,.55),0 0 28px rgba(236,72,153,.35);
 --l-bg:#141620;--l-tex:${GRID};--l-tex-size:22px 22px;--l-ink:#38bdf8;--l-accent:#f472b6;--l-font:"IBM Plex Mono",monospace;--l-head:"IBM Plex Mono",monospace;--l-border:1px solid rgba(56,189,248,.35);--l-div:"// ──── //"}
.mt-lotus{--env-bg:#f7e9ec;--env-tex:${NOISE},${SILK};--env-line:#d89ba8;--env-ink:#8c4a5c;--env-border:3px double #d89ba8;--seal-bg:radial-gradient(circle at 35% 30%,#f4c6d0,#c0727f 70%);--seal-ring:#b76e79;--glow:none;
 --l-bg:#fdf6f7;--l-tex:${NOISE},${SILK};--l-ink:#4a1c2b;--l-accent:#b76e79;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid #efd3d9;--l-div:"✿ ❀ ✿"}
.mt-parchment{--env-bg:#f4ecd8;--env-tex:${NOISE},${STAIN};--env-line:#b89a68;--env-ink:#6b4e2e;--env-border:none;--seal-bg:radial-gradient(circle at 35% 30%,#c4483a,#7a1f16 70%);--seal-ring:#5e160f;--glow:none;
 --l-bg:#fbf7ee;--l-tex:${NOISE},${STAIN};--l-ink:#3d2b1f;--l-accent:#8a6d3b;--l-font:"Fraunces",Georgia,serif;--l-head:"Pinyon Script","Caveat",cursive;--l-border:1px solid #e5d6b5;--l-div:"~ ✦ ~"}
.mt-velvet{--env-bg:#101426;--env-tex:${NOISE},${STARS};--env-line:rgba(129,140,248,.35);--env-ink:#c7d2fe;--env-border:1px solid rgba(129,140,248,.3);--seal-bg:radial-gradient(circle at 35% 30%,#e0e7ff,#818cf8 75%);--seal-ring:#c7d2fe;--glow:0 0 18px rgba(165,180,252,.45);
 --l-bg:#181e36;--l-tex:${NOISE},${STARS};--l-ink:#e0e7ff;--l-accent:#a5b4fc;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid rgba(165,180,252,.25);--l-div:"· ☾ ·"}

.env-scene{perspective:1200px;width:min(340px,86vw);aspect-ratio:3/2;position:relative;margin-top:110px}
.env{position:absolute;inset:0;cursor:pointer;transform-style:preserve-3d;transition:transform .4s ease;filter:drop-shadow(0 30px 40px rgba(0,0,0,.5)) drop-shadow(0 8px 12px rgba(0,0,0,.3))}
.env:not(.is-flap):hover{transform:translateY(-4px) rotate(-.6deg)}
.env-back,.env-pocket,.env-flap-face{background-color:var(--env-bg);background-image:var(--env-tex)}
.env-back{position:absolute;inset:0;border-radius:6px;filter:brightness(.78)}
.env-letter{position:absolute;left:6%;right:6%;top:5%;bottom:6%;border-radius:3px;padding:14px 16px;z-index:2;overflow:hidden;
 background-color:var(--l-bg);background-image:var(--l-tex);background-size:var(--l-tex-size,auto);color:var(--l-ink);font-family:var(--l-font);border:var(--l-border);
 box-shadow:0 2px 6px rgba(0,0,0,.25);transition:transform .8s cubic-bezier(.33,1,.45,1)}
.env-letter .ld{font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.6}
.env-letter .lt{font-family:var(--l-head);color:var(--l-accent);font-size:22px;line-height:1.1;margin-top:4px}
.env.is-slide .env-letter{transform:translateY(-85%) scale(1.02)}
.env-pocket{position:absolute;inset:0;z-index:3;border-radius:6px;clip-path:polygon(0 0,50% 52%,100% 0,100% 100%,0 100%);border:var(--env-border);box-shadow:var(--glow)}
.env-pocket::before{content:"";position:absolute;inset:0;background:linear-gradient(to top right,transparent calc(50% - 1px),var(--env-line) 50%,transparent calc(50% + 1px)) left bottom/50% 100% no-repeat,linear-gradient(to top left,transparent calc(50% - 1px),var(--env-line) 50%,transparent calc(50% + 1px)) right bottom/50% 100% no-repeat;opacity:.55}
.env-pocket::after{content:"";position:absolute;inset:0;background:linear-gradient(165deg,rgba(255,255,255,.18),transparent 45%,rgba(0,0,0,.12))}
.env-flap{position:absolute;left:0;right:0;top:0;height:56%;z-index:5;transform-origin:top center;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.45,.05,.3,1),z-index 0s .3s}
.env-flap-face{position:absolute;inset:0;clip-path:polygon(0 0,100% 0,50% 100%);border-radius:6px 6px 0 0;filter:brightness(1.07)}
.env-flap-face::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.2),rgba(0,0,0,.15))}
.env.is-flap .env-flap{transform:perspective(1200px) rotateX(180deg);z-index:1}
.env-seal{position:absolute;left:50%;bottom:-20px;width:44px;height:44px;margin-left:-22px;border-radius:50%;background:var(--seal-bg);display:grid;place-items:center;font-size:20px;color:#fff;
 box-shadow:0 0 0 3px var(--seal-ring) inset,0 3px 8px rgba(0,0,0,.45),var(--glow);transition:opacity .25s;backface-visibility:hidden}
.mt-parchment .env-seal{border-radius:46% 54% 50% 50%/52% 48% 52% 48%}
.env.is-flap .env-seal{opacity:0}
.env-stamp{position:absolute;right:12px;top:10px;z-index:4;width:40px;height:48px;display:grid;place-items:center;font-size:20px;transform:rotate(4deg);
 background:var(--l-bg);color:var(--l-accent);outline:2px dashed var(--env-line);outline-offset:-4px;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.env-mark{position:absolute;right:42px;top:20px;z-index:4;width:58px;height:58px;border-radius:50%;border:2px solid var(--env-ink);opacity:.22;box-shadow:0 0 0 6px transparent,0 0 0 8px currentColor;color:var(--env-ink)}
.env-addr{position:absolute;left:12%;bottom:16%;z-index:4;font-family:var(--l-head);color:var(--env-ink);font-size:17px;opacity:.85}
.mt-parchment .env-back,.mt-parchment .env-pocket{-webkit-mask:radial-gradient(circle at 3px 3px,transparent 1.5px,#000 2px) -3px -3px/7px 7px}

.mail-letter{background-color:var(--l-bg);background-image:var(--l-tex);background-size:var(--l-tex-size,auto);color:var(--l-ink);font-family:var(--l-font);border:var(--l-border);box-shadow:0 30px 60px -20px rgba(0,0,0,.55)}
.mail-letter .m-head{font-family:var(--l-head);color:var(--l-accent)}
.mail-letter .m-div::before{content:var(--l-div);display:block;text-align:center;color:var(--l-accent);letter-spacing:.4em;opacity:.7}
.mt-neon .mail-letter .m-head,.mt-neon.mail-letter .m-head{text-shadow:0 0 10px rgba(56,189,248,.6)}
.mt-velvet .mail-letter .m-head,.mt-velvet.mail-letter .m-head{text-shadow:0 0 14px rgba(165,180,252,.5)}
.m-badge{background:color-mix(in oklab,var(--l-accent) 18%,transparent);color:var(--l-accent);border:1px solid color-mix(in oklab,var(--l-accent) 40%,transparent)}
.glass{background:rgba(255,255,255,.14);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.25);color:#fff}
@keyframes photo-pull{from{transform:translateY(70%) rotate(-8deg) scale(.6);opacity:0}to{transform:translateY(0) rotate(var(--r,0deg)) scale(1);opacity:1}}
.photo-pull{animation:photo-pull .55s cubic-bezier(.22,1,.36,1) both}
.photo-card{background:#fff;padding:4px 4px 12px;box-shadow:0 4px 10px rgba(0,0,0,.3)}
@keyframes letter-in{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
.letter-in{animation:letter-in .5s cubic-bezier(.22,1,.36,1) both}
`;

/** Map legacy themes (pre-texture) onto a mail theme. */
export function mailKeyFrom(theme?: { mail?: MailKey; bg?: string; border?: string }): MailKey {
  if (theme?.mail) return theme.mail;
  const bg = theme?.bg ?? "";
  if (bg.includes("#1b2340")) return "velvet";
  if (bg.includes("#141126") || theme?.border === "neon") return "neon";
  if (bg.includes("#ffeef3")) return "lotus";
  if (bg.includes("#eef3e6")) return "matcha";
  return "parchment";
}

const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

export type ExportInput = {
  title: string; body: string; author?: string; createdAt: number; images: string[];
  audio?: { name: string; src: string }; autoplay?: boolean; mail: MailKey;
};

/** Build a single self-contained, offline HTML file with the same envelope animation. */
export function buildMailHtml(c: ExportInput): string {
  const m = mailTheme(c.mail);
  const date = new Date(c.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const data = JSON.stringify({ images: c.images, autoplay: c.autoplay !== false }).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(c.title || "A letter for you")}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400&family=Caveat:wght@400;600&family=IBM+Plex+Mono&family=Pinyon+Script&display=swap">
<style>*{box-sizing:border-box}html,body{margin:0;min-height:100%}body{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;font-family:Georgia,serif;
background:radial-gradient(ellipse at top,#3b3430,#171412 70%);color:#fff;overflow-x:hidden}
button{font:inherit;cursor:pointer}
${MAIL_CSS}
.hint{margin-top:34px;font-size:14px;opacity:.75;letter-spacing:.05em;animation:pulse 2s infinite}@keyframes pulse{50%{opacity:.35}}
#audioBadge{position:fixed;top:16px;right:16px;border-radius:999px;padding:8px 14px;font-size:13px;display:none;align-items:center;gap:8px;z-index:20}
#letter{display:none;width:min(720px,100%);max-height:88vh;overflow:auto;border-radius:10px;padding:28px;position:relative}
#letter h1{font-size:40px;line-height:1.1;margin:6px 0 14px;font-weight:400}#letter .d{font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.6}
#letter p.b{white-space:pre-wrap;font-size:18px;line-height:1.7}
.foot{display:flex;align-items:flex-end;gap:12px;margin-top:28px;min-height:60px}
.pocket{width:48px;height:48px;border-radius:50%;font-size:22px;flex-shrink:0;transition:transform .3s}.pocket:hover{transform:scale(1.1)}
.photos{display:flex;gap:10px;overflow-x:auto;padding:6px 4px}.photos img{width:76px;height:92px;object-fit:cover;display:block}
#lb{position:fixed;inset:0;display:none;place-items:center;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:30;padding:20px}
#lb img{max-width:100%;max-height:100%;border-radius:6px;box-shadow:0 20px 50px rgba(0,0,0,.6)}</style></head>
<body class="mt-${c.mail}">
${c.audio?.src ? `<audio id="bg" loop src="${c.audio.src}"></audio><button id="audioBadge" class="glass" aria-label="Toggle music"><span id="aIcon">❚❚</span><span>${esc(c.audio.name)}</span></button>` : ""}
<div id="stage" style="display:flex;flex-direction:column;align-items:center">
 <div class="env-scene"><div class="env" id="env" role="button" aria-label="Open the letter" tabindex="0">
  <div class="env-back"></div>
  <div class="env-letter"><div class="ld">${esc(date)}</div><div class="lt">${esc(c.title || "Untitled")}</div></div>
  <div class="env-pocket"></div>
  <div class="env-mark"></div><div class="env-stamp">${m.emoji}</div>
  <div class="env-addr">for you${c.author ? `, from ${esc(c.author)}` : ""}</div>
  <div class="env-flap"><div class="env-flap-face"></div><div class="env-seal">${m.seal}</div></div>
 </div></div>
 <div class="hint" id="hint">Tap the envelope to break the seal</div>
</div>
<article id="letter" class="mail-letter">
 <div class="d">${esc(date)}${c.author ? " · " + esc(c.author) : ""}</div>
 <h1 class="m-head">${esc(c.title || "Untitled")}</h1>
 <div class="m-div"></div>
 <p class="b">${esc(c.body)}</p>
 <div class="m-div"></div>
 ${c.images.length ? `<div class="foot"><button class="pocket m-badge" id="pocket" aria-label="Open photo envelope">💌</button><div class="photos" id="photos"></div></div>` : ""}
</article>
<div id="lb"><img alt=""></div>
<script>(function(){var D=${data};var env=document.getElementById('env'),a=document.getElementById('bg'),badge=document.getElementById('audioBadge'),icon=document.getElementById('aIcon'),opened=false;
function sync(){if(icon&&a)icon.textContent=a.paused?'▶':'❚❚'}
if(a){a.addEventListener('play',sync);a.addEventListener('pause',sync);badge.onclick=function(){a.paused?a.play():a.pause()}}
function open(){if(opened)return;opened=true;if(a&&D.autoplay){a.play().catch(function(){});}if(badge)badge.style.display='flex';sync();
document.getElementById('hint').style.display='none';env.classList.add('is-flap');
setTimeout(function(){env.classList.add('is-slide')},620);
setTimeout(function(){document.getElementById('stage').style.display='none';var l=document.getElementById('letter');l.style.display='block';l.classList.add('letter-in')},1550)}
env.addEventListener('click',open);env.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});
var p=document.getElementById('pocket'),ph=document.getElementById('photos'),lb=document.getElementById('lb');
if(p)p.onclick=function(){if(ph.childElementCount){ph.innerHTML='';return}D.images.forEach(function(src,i){var b=document.createElement('button');b.className='photo-card photo-pull';b.style.border='0';b.style.setProperty('--r',((i%3)-1)*4+'deg');b.style.animationDelay=i*90+'ms';var im=document.createElement('img');im.src=src;b.appendChild(im);b.onclick=function(){lb.querySelector('img').src=src;lb.style.display='grid'};ph.appendChild(b)})};
lb.onclick=function(){lb.style.display='none'}})();</script>
</body></html>`;
}

export function downloadMail(c: ExportInput) {
  const blob = new Blob([buildMailHtml(c)], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(c.title || "letter").replace(/[^\w-]+/g, "-").toLowerCase()}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
