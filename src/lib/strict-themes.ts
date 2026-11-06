/**
 * strict-themes.ts
 *
 * Strict Sector Theme Bundle (Heavy Animation):
 * 1. Holographic Matrix (Cyberpunk obsidian paper, holographic circuit foil, glowing cube bloom)
 * 2. Sakura Sumi-e (Japanese washi paper, hand-painted sumi-e cherry blossoms, petal burst, scroll unroll)
 *
 * Adapted specifically to match the model envelope geometry and multi-page reader layout.
 */

const svgUrl = (body: string, width: number, height: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${body}</svg>`)}")`;

/* =========================================================================
   1. HOLOGRAPHIC MATRIX (STRICT SECTOR)
   ========================================================================= */

const hmFoil = `<defs><linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f28ccc"/><stop offset=".23" stop-color="#4cdaef"/><stop offset=".48" stop-color="#a088dc"/><stop offset=".7" stop-color="#6cdcf0"/><stop offset="1" stop-color="#e9bfa0"/></linearGradient></defs>`;
const hmPaper = svgUrl(`<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".13"/></feComponentTransfer></filter><rect width="180" height="180" filter="url(#grain)" opacity=".6"/>`, 180, 180);
const hmCircuits = svgUrl(`${hmFoil}<g fill="none" stroke="url(#foil)" stroke-width="1.4"><path d="M12 42V10H64L76 20H156L167 12H228L239 19H300V85L290 96V177L298 189V274L289 284V356L299 367V451L290 464V500H253L242 490H161L151 499H83L70 491H12V438L21 424V338L13 327V243L22 229V143L13 133Z"/><path d="M6 55V5H55L68 14H151L165 6H236L247 14H307V79L298 94V172L305 187V282L297 296V351L307 368V459L299 473V507H247L234 498H165L151 507H77L65 499H5V431L14 415V345L6 331V236L15 224V149L6 133Z"/><path d="M22 56V28L38 14M22 86V116L30 128V196M22 278V310L29 323V393M23 451V482H60L74 489H124M192 489H228L240 482H278V461M280 417V386L289 374M280 306V277L285 263V214M282 154V126L292 113M273 27H247L234 21H187M127 28H80L69 22H43"/><path d="M11 16L34 39M8 25L28 44M290 7L276 24M309 487L286 466M300 497L279 476M8 488L30 465M19 505L40 480" stroke-width=".7"/></g><g fill="#59c5d7"><circle cx="22" cy="87" r="1.7"/><circle cx="29" cy="196" r="1.7"/><circle cx="23" cy="451" r="1.7"/><circle cx="280" cy="417" r="1.7"/><circle cx="282" cy="154" r="1.7"/></g><g stroke="#66cee2" fill="none" stroke-width=".5" opacity=".7"><circle cx="43" cy="468" r="8"/><ellipse cx="43" cy="468" rx="4" ry="8"/><path d="M35 468H51M43 460V476M35 447L40 438L45 447Z"/></g>`, 312, 512);
const hmFlap = svgUrl(`${hmFoil}<g fill="none" stroke="url(#foil)" stroke-width="1.6"><path d="M8 9L200 191L392 9M8 19L200 201L392 19M13 4L43 33L53 33L91 71L91 80L146 132L155 132L194 170M387 4L359 31L350 31L313 67L313 78L258 131L249 131L207 169"/><path d="M22 8L43 27L54 27L94 66M378 8L356 27L345 27L306 64M106 86L150 127L158 127L187 155M293 84L252 122L243 122L215 151" stroke-dasharray="3 4" stroke-width="1"/></g>`, 400, 210);
const hmCube = svgUrl(`<defs><filter id="glow"><feGaussianBlur stdDeviation="2"/></filter><linearGradient id="ice" x2="1" y2="1"><stop stop-color="#a4f8ff"/><stop offset=".5" stop-color="#05d9ff"/><stop offset="1" stop-color="#006f9b"/></linearGradient></defs><path d="M36 5L65 22V55L36 74L7 55V22Z" fill="#063b4c" opacity=".85"/><g fill="none" stroke="#00d8ff" stroke-width="4" filter="url(#glow)" opacity=".7"><path d="M36 5L65 22V55L36 74L7 55V22ZM7 22L36 40L65 22M36 40V74"/></g><g fill="none" stroke="url(#ice)" stroke-width="1.2"><path d="M36 5L65 22V55L36 74L7 55V22ZM7 22L36 40L65 22M36 40V74M36 5V38M7 55L36 38L65 55M36 14L57 26V51L36 65L15 51V26ZM15 26L36 39L57 26M36 39V65M26 21L47 33V58M15 39L36 52L57 39"/></g>`, 72, 80);
const hmStamp = svgUrl(`${hmFoil}<rect x="2" y="2" width="56" height="76" fill="#b4bfc3"/><rect x="7" y="7" width="46" height="66" fill="#15232e" stroke="url(#foil)" stroke-width="2"/><circle cx="40" cy="21" r="7" fill="none" stroke="#67bbec"/><g stroke="url(#foil)" stroke-width="3"><path d="M13 62V42M20 62V29M27 62V37M34 62V44M41 62V36M48 62V50"/></g><path d="M12 66H48" stroke="#df94df"/><text x="12" y="21" fill="#67e9ff" font-family="monospace" font-size="10">7</text>`, 60, 80);

export const hmCss = `
.mt-custom-holographic-matrix{
 --hm-paper:#0a0e14;--hm-ink:#a5e8f4;--hm-cyan:#4cdaef;--hm-pink:#f28ccc;--hm-edge:rgba(76,218,239,.42);--hm-dark:#040608;
 --hm-foil:linear-gradient(130deg,var(--hm-pink),var(--hm-cyan) 32%,var(--hm-pink) 66%,var(--hm-cyan));
 --hm-shadow:rgba(0,0,0,.82);--hm-glow:rgba(76,218,239,.45);
 --hm-blue:#2d69ff;--hm-white-light:#d9f8ff;
 --hm-bloom:radial-gradient(circle,var(--hm-white-light) 0%,rgba(76,218,239,.75) 20%,rgba(45,105,255,.45) 44%,rgba(45,105,255,.14) 60%,transparent 72%);
 --hm-safe-inline:max(24px,6%);
 --env-bg:var(--hm-paper);--env-tex:${hmPaper};--env-line:var(--hm-edge);--env-ink:var(--hm-cyan);--env-border:1px solid var(--hm-edge);
 --seal-bg:transparent;--seal-ring:transparent;--glow:0 0 16px rgba(76,218,239,.4);
 --l-bg:#0a0f16;--l-tex:${hmPaper};--l-tex-size:180px 180px;--l-ink:var(--hm-ink);--l-accent:var(--hm-cyan);--l-rule:var(--hm-edge);
 --l-font:"IBM Plex Mono",monospace;--l-head:"IBM Plex Mono",monospace;
 --l-border:1px solid var(--hm-edge);--l-edge:none;--l-div:"[ // CYBER SIGNAL // ]";--l-ornament:"◇";--l-body-leading:1.85;--l-relief:inset 0 0 32px var(--hm-shadow);--l-shadow:var(--hm-shadow);
}
.mt-custom-holographic-matrix .env-scene{perspective:1200px;width:min(340px,86vw);aspect-ratio:3/2}
.mt-custom-holographic-matrix .env-flap{position:absolute;left:0;right:0;top:0;height:56%;z-index:5;transform-origin:top center;transform-style:preserve-3d;transition:transform .50s .10s cubic-bezier(.3,.7,.25,1),z-index 0s .35s}
.mt-custom-holographic-matrix .env-letter{will-change:transform;backface-visibility:hidden;transition:transform .65s .60s cubic-bezier(.22,.9,.3,1)}
.mt-custom-holographic-matrix .env-flap-face{background-image:${hmFlap},var(--env-tex);background-size:100% 100%,180px 180px;filter:none}
.mt-custom-holographic-matrix .env-flap-face::after{opacity:.3}
.mt-custom-holographic-matrix .env-seal{width:56px;height:62px;margin-left:-28px;bottom:-28px;border-radius:0;background-image:${hmCube};background-size:contain;background-repeat:no-repeat;background-color:transparent;font-size:0;box-shadow:none;filter:drop-shadow(0 4px 8px var(--hm-glow))}
.mt-custom-holographic-matrix .env::before{content:"";position:absolute;left:50%;top:57%;width:150%;aspect-ratio:1;border-radius:50%;z-index:8;pointer-events:none;background:var(--hm-bloom);mix-blend-mode:screen;transform:translate(-50%,-50%);opacity:0;will-change:transform,opacity}
.mt-custom-holographic-matrix .env::after{content:"";position:absolute;left:50%;top:57%;width:64px;height:72px;z-index:7;pointer-events:none;background-image:${hmCube};background-size:contain;background-repeat:no-repeat;transform:translate(-50%,-50%);opacity:0;filter:drop-shadow(0 0 16px var(--hm-cyan))}
.mt-custom-holographic-matrix .env.is-opening::before,.mt-custom-holographic-matrix .env.is-flap::before{animation:hm-blue-bloom .58s ease-out both}
.mt-custom-holographic-matrix .env.is-opening::after,.mt-custom-holographic-matrix .env.is-flap::after{animation:hm-cube-relay 1.1s cubic-bezier(.2,.7,.25,1) both}
.mt-custom-holographic-matrix .env.is-opening .env-seal,.mt-custom-holographic-matrix .env.is-flap .env-seal{animation:hm-seal-unlock .32s ease-out both}
.mt-custom-holographic-matrix .env.is-opening .env-letter,.mt-custom-holographic-matrix .env.is-slide .env-letter{transform:translate3d(0,-85%,0) scale(1.02);transition:transform .65s .60s cubic-bezier(.22,.9,.3,1);animation:hm-paper-charge .85s .60s ease-out both}
.mt-custom-holographic-matrix .mail-letter.letter-in{animation:hm-letter-materialize .7s cubic-bezier(.2,.8,.25,1) both;will-change:transform,opacity;backface-visibility:hidden}
@keyframes hm-seal-unlock{0%{opacity:1;filter:drop-shadow(0 0 6px var(--hm-cyan))}65%{opacity:1;filter:drop-shadow(0 0 22px var(--hm-white-light))}100%{opacity:0}}
@keyframes hm-cube-relay{0%{opacity:0;transform:translate(-50%,-50%) scale(1)}12%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}35%{opacity:1;transform:translate(-50%,-75%) perspective(600px) rotateY(60deg) scale(1.4);filter:drop-shadow(0 0 28px var(--hm-white-light))}70%{opacity:.8;transform:translate(-50%,-145%) perspective(600px) rotateY(180deg) scale(1.7)}100%{opacity:0;transform:translate(-50%,-240%) perspective(600px) rotateY(240deg) scale(.6)}}
@keyframes hm-blue-bloom{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}25%{opacity:.92;transform:translate(-50%,-50%) scale(.8)}55%{opacity:.35;transform:translate(-50%,-50%) scale(1.2)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.4)}}
@keyframes hm-paper-charge{0%{box-shadow:0 0 12px var(--hm-cyan),inset 0 0 32px var(--hm-glow)}50%{box-shadow:0 0 44px var(--hm-blue),0 0 18px var(--hm-cyan),inset 0 0 20px var(--hm-glow)}100%{box-shadow:0 2px 6px var(--hm-shadow)}}
@keyframes hm-letter-materialize{0%{opacity:0;transform:translateY(30px) scale(.96);filter:brightness(1.7);box-shadow:0 0 42px var(--hm-blue)}55%{opacity:1;filter:brightness(1.15)}100%{opacity:1;transform:none;filter:none;box-shadow:var(--l-relief),0 30px 60px -20px var(--l-shadow)}}
.mt-custom-holographic-matrix .env-stamp{top:10px;bottom:auto;right:12px;width:40px;height:52px;background-image:${hmStamp};background-size:100% 100%;outline:2px dashed var(--hm-cyan);outline-offset:-2px;font-size:0;transform:rotate(3deg)}
.mt-custom-holographic-matrix .env-mark{display:none}
.mt-custom-holographic-matrix .env-addr{left:12%;right:12%;bottom:16%;max-width:76%;font-family:var(--l-font);color:var(--hm-cyan);font-size:14px;letter-spacing:.05em}
.mt-custom-holographic-matrix .env-pocket::after{background:linear-gradient(155deg,rgba(76,218,239,.08),transparent 50%)}
.mt-custom-holographic-matrix .mail-letter,.mt-custom-holographic-matrix.mail-letter{position:relative;isolation:isolate;border-radius:6px}
.mt-custom-holographic-matrix .mail-letter::before,.mt-custom-holographic-matrix.mail-letter::before{content:"";position:absolute;inset:4px;background-image:${hmCircuits};background-size:100% 100%;background-repeat:no-repeat;pointer-events:none;z-index:0;opacity:.85}
.mt-custom-holographic-matrix.mail-letter:not(.letter-in){padding:24px 20px;min-height:160px}
.mt-custom-holographic-matrix .mail-letter.reader-letter{max-width:min(1440px,96vw);width:100%}
.mt-custom-holographic-matrix .m-head,.mt-custom-holographic-matrix.mail-letter .m-head{font-size:24px;line-height:1.35;color:var(--hm-cyan);text-shadow:0 0 12px var(--hm-glow)}
.mt-custom-holographic-matrix .m-body{font-size:15px;color:var(--hm-ink)}
.mt-custom-holographic-matrix .m-div{background:none;opacity:.55}
.mt-custom-holographic-matrix #letter{width:min(1200px,96vw);position:relative;isolation:isolate;border-radius:6px;border:1px solid var(--hm-edge)}
.mt-custom-holographic-matrix #letter::before{content:"";position:absolute;inset:4px;background-image:${hmCircuits};background-size:100% 100%;background-repeat:no-repeat;pointer-events:none;z-index:0;opacity:.85}
@media(prefers-reduced-motion:reduce){.mt-custom-holographic-matrix .env-flap,.mt-custom-holographic-matrix .env-letter{transition:none}.mt-custom-holographic-matrix .env.is-opening::before,.mt-custom-holographic-matrix .env.is-opening::after,.mt-custom-holographic-matrix .env.is-opening .env-seal,.mt-custom-holographic-matrix .env.is-opening .env-letter,.mt-custom-holographic-matrix .mail-letter.letter-in{animation:none}}
`;

/* =========================================================================
   2. SAKURA SUMI-E (STRICT SECTOR)
   ========================================================================= */

const skPetal = (x: number, y: number, r: number, rot = 0, o = 0.85) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${r / 10})" opacity="${o}"><path d="M0 0C-6-4-7-12 0-16C7-12 6-4 0 0Z" fill="#f2b8c3" stroke="#e08fa1" stroke-width=".6"/></g>`;
const skBlossom = (x: number, y: number, r: number, rot = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${r / 10})">${[0, 72, 144, 216, 288]
    .map((a) => `<path transform="rotate(${a})" d="M0 0C-6-3-8-11-2-14L0-12L2-14C8-11 6-3 0 0Z" fill="#f6c4cd" stroke="#e397a8" stroke-width=".5"/>`)
    .join("")}<circle r="2.2" fill="#d76f86"/><g stroke="#b9506b" stroke-width=".5">${[20, 92, 164, 236, 308].map((a) => `<path transform="rotate(${a})" d="M0 0V-5"/>`).join("")}</g></g>`;
const skBud = (x: number, y: number, rot = 0) => `<ellipse cx="${x}" cy="${y}" rx="2.4" ry="3.6" transform="rotate(${rot} ${x} ${y})" fill="#e795a7"/>`;
const skInk = `stroke="#4a3f3c" fill="none" stroke-linecap="round"`;

const skPaper = svgUrl(`<filter id="f"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .55 0 0 0 0 .48 0 0 0 0 .4 0 0 0 .14 0"/></filter><rect width="220" height="220" fill="#f3ece0"/><rect width="220" height="220" filter="url(#f)"/><g stroke="#cbbba5" stroke-width=".5" fill="none" opacity=".55"><path d="M10 40C60 30 90 60 140 44M30 150C80 170 120 130 200 160M160 20C170 70 150 100 190 120M60 90C70 120 40 170 70 200"/></g>`, 220, 220);
const skFlapArt = svgUrl(`<g ${skInk}><path d="M0 18C40 24 70 46 105 58C140 70 170 66 210 92" stroke-width="5"/><path d="M60 40C70 60 74 80 92 96M120 64C140 52 158 40 180 36M150 72C160 90 176 98 196 104" stroke-width="2.4"/></g>${skBlossom(30, 26, 14, 10)}${skBlossom(70, 50, 17, 40)}${skBlossom(92, 98, 12, 5)}${skBlossom(116, 60, 13, 70)}${skBlossom(158, 72, 15, 20)}${skBlossom(184, 36, 11, 50)}${skBlossom(198, 104, 10, 0)}${skBud(54, 70, 20)}${skBud(132, 50, -30)}${skBud(176, 92, 10)}${skPetal(240, 70, 9, 40)}${skPetal(260, 140, 8, -30)}${skPetal(150, 140, 7, 70, 0.7)}`, 400, 210);
const skLetterArt = svgUrl(`<g ${skInk}><path d="M0 22C40 26 70 50 110 56C160 64 200 40 260 52C290 58 300 70 312 74" stroke-width="5"/><path d="M40 32C48 60 30 90 20 120M150 60C160 80 176 92 198 96M230 46C246 30 270 26 290 20" stroke-width="2.2"/><path d="M312 470C270 474 250 490 200 496M270 480C276 456 290 440 304 430" stroke-width="3.4"/></g>${skBlossom(22, 26, 14, 10)}${skBlossom(60, 44, 16, 30)}${skBlossom(34, 96, 12, 60)}${skBlossom(110, 56, 14, 0)}${skBlossom(170, 82, 13, 25)}${skBlossom(220, 44, 15, 70)}${skBlossom(270, 26, 12, 10)}${skBlossom(298, 66, 10, 40)}${skBud(20, 124, 10)}${skBud(200, 100, -20)}${skBud(290, 16, 40)}${skBlossom(296, 432, 12, 15)}${skBlossom(262, 484, 14, 50)}${skBlossom(214, 494, 11, 0)}${skBlossom(304, 470, 10, 30)}${skPetal(250, 130, 8, 40)}${skPetal(60, 300, 7, -20, 0.6)}${skPetal(40, 470, 8, 60)}${skPetal(180, 420, 6, 10, 0.5)}<g opacity=".12">${skBlossom(110, 280, 30, 15)}${skBlossom(270, 330, 22, 40)}</g>`, 312, 512);
const skSeal = svgUrl(`<defs><radialGradient id="g" cx=".35" cy=".3"><stop stop-color="#f3c3a8"/><stop offset=".55" stop-color="#c47c5f"/><stop offset="1" stop-color="#8a4b38"/></radialGradient></defs><path d="M36 3C52 2 69 15 70 34C71 54 56 70 36 69C15 70 1 54 3 35C2 16 18 3 36 3Z" fill="url(#g)"/><circle cx="36" cy="36" r="24" fill="none" stroke="#7a3f2e" stroke-width="1.4" opacity=".6"/><g fill="none" stroke="#fbe0cf" stroke-width="1.6" transform="translate(36 37)">${[0, 72, 144, 216, 288].map((a) => `<path transform="rotate(${a})" d="M0 0C-7-3-9-13-2-16L0-14L2-16C9-13 7-3 0 0Z"/>`).join("")}<circle r="2.6"/></g>`, 72, 72);
const skHanko = svgUrl(`<rect x="2" y="2" width="36" height="56" rx="3" fill="none" stroke="#b3322b" stroke-width="2.4"/><text x="20" y="27" text-anchor="middle" font-family="serif" font-size="18" fill="#b3322b">旅</text><text x="20" y="50" text-anchor="middle" font-family="serif" font-size="18" fill="#b3322b">人</text>`, 40, 60);
const skPetalsA = svgUrl(`${skPetal(12, 18, 11, 20)}${skPetal(44, 40, 9, -40, 0.7)}`, 60, 60);
const skPetalsB = svgUrl(`${skPetal(18, 20, 10, -60)}${skPetal(46, 44, 12, 30, 0.75)}`, 60, 60);

export const skCss = `
.mt-custom-sakura-sumie{
 --sk-paper:#f7f2ea;--sk-ink:#3e332f;--sk-pink:#f2b8c3;--sk-rose:#9e4f62;--sk-edge:#dfcebe;
 --env-bg:var(--sk-paper);--env-tex:${skPaper};--env-line:var(--sk-edge);--env-ink:var(--sk-ink);--env-border:1px solid var(--sk-edge);
 --seal-bg:transparent;--seal-ring:transparent;--glow:0 0 10px rgba(224,143,161,.3);
 --l-bg:var(--sk-paper);--l-tex:${skPaper};--l-tex-size:220px 220px;--l-ink:var(--sk-ink);--l-accent:var(--sk-rose);--l-rule:var(--sk-edge);
 --l-font:"Fraunces",Georgia,serif;--l-head:"Caveat","Pinyon Script",cursive;
 --l-border:1px solid var(--sk-edge);--l-edge:none;--l-div:"❀";--l-ornament:"✿";--l-body-leading:1.85;--l-relief:inset 0 0 26px rgba(62,51,47,.08);--l-shadow:rgba(62,51,47,.35);
}
.mt-custom-sakura-sumie .env-scene{perspective:1200px;width:min(340px,86vw);aspect-ratio:3/2}
.mt-custom-sakura-sumie .env-flap{position:absolute;left:0;right:0;top:0;height:56%;z-index:5;transform-origin:top center;transform-style:preserve-3d;transition:transform .50s .10s cubic-bezier(.3,.7,.25,1),z-index 0s .35s}
.mt-custom-sakura-sumie .env-flap-face{background-image:${skFlapArt},var(--env-tex);background-size:100% 100%,220px 220px;filter:none}
.mt-custom-sakura-sumie .env-flap-face::after{opacity:.25}
.mt-custom-sakura-sumie .env-seal{width:52px;height:52px;margin-left:-26px;bottom:-26px;border-radius:50%;background-image:${skSeal};background-size:contain;background-color:transparent;font-size:0;box-shadow:0 3px 6px rgba(62,51,47,.35)}
.mt-custom-sakura-sumie .env-seal::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:2px solid var(--sk-ink);opacity:0;pointer-events:none}
.mt-custom-sakura-sumie .env-stamp{top:10px;bottom:auto;right:12px;width:34px;height:50px;background-image:${skHanko};background-size:100% 100%;outline:none;font-size:0;transform:rotate(-2deg);opacity:.92}
.mt-custom-sakura-sumie .env-mark{display:none}
.mt-custom-sakura-sumie .env-addr{font-family:"Caveat",cursive;font-size:18px;left:12%;right:12%;bottom:16%;color:var(--sk-ink);max-width:76%}
.mt-custom-sakura-sumie .env.is-opening .env-flap,.mt-custom-sakura-sumie .env.is-flap .env-flap{transform:perspective(1200px) rotateX(180deg);z-index:1}
.mt-custom-sakura-sumie .env.is-opening .env-seal,.mt-custom-sakura-sumie .env.is-flap .env-seal{animation:sk-seal-stamp .40s ease-out both}
.mt-custom-sakura-sumie .env.is-opening .env-seal::after,.mt-custom-sakura-sumie .env.is-flap .env-seal::after{animation:sk-ink-ripple .55s ease-out both}
.mt-custom-sakura-sumie .env::before,.mt-custom-sakura-sumie .env::after,.mt-custom-sakura-sumie .env-scene::before,.mt-custom-sakura-sumie .env-scene::after{content:"";position:absolute;left:50%;top:40%;width:60px;height:60px;z-index:9;pointer-events:none;background-size:contain;background-repeat:no-repeat;opacity:0;will-change:transform,opacity;backface-visibility:hidden}
.mt-custom-sakura-sumie .env::before{background-image:${skPetalsA}}
.mt-custom-sakura-sumie .env::after{background-image:${skPetalsB}}
.mt-custom-sakura-sumie .env-scene::before{background-image:${skPetalsB}}
.mt-custom-sakura-sumie .env-scene::after{background-image:${skPetalsA}}
.mt-custom-sakura-sumie .env.is-opening::before,.mt-custom-sakura-sumie .env.is-flap::before{animation:sk-petal-a 2.2s .2s ease-out both}
.mt-custom-sakura-sumie .env.is-opening::after,.mt-custom-sakura-sumie .env.is-flap::after{animation:sk-petal-b 2.4s .25s ease-out both}
.mt-custom-sakura-sumie .env-scene:has(.env.is-opening)::before,.mt-custom-sakura-sumie .env-scene:has(.env.is-flap)::before{animation:sk-petal-c 2.3s .3s ease-out both}
.mt-custom-sakura-sumie .env-scene:has(.env.is-opening)::after,.mt-custom-sakura-sumie .env-scene:has(.env.is-flap)::after{animation:sk-petal-d 2.5s .35s ease-out both}
.mt-custom-sakura-sumie .env-letter{will-change:transform;backface-visibility:hidden;transition:transform .65s .60s cubic-bezier(.22,.9,.3,1)}
.mt-custom-sakura-sumie .env.is-opening .env-letter,.mt-custom-sakura-sumie .env.is-flap .env-letter{transform:translate3d(0,-85%,0) scale(1.02);transition:transform .65s .60s cubic-bezier(.22,.9,.3,1)}
.mt-custom-sakura-sumie .mail-letter.letter-in,.mt-custom-sakura-sumie #letter.letter-in{animation:sk-scroll-roll .75s cubic-bezier(.16,1,.3,1) both;transform-origin:50% 0;will-change:transform,opacity;backface-visibility:hidden}
@keyframes sk-seal-stamp{0%{transform:scale(1)}35%{transform:scale(1.14)}70%{transform:scale(.96);opacity:1}100%{transform:scale(1.25);opacity:0}}
@keyframes sk-ink-ripple{0%{opacity:.5;transform:scale(.9)}100%{opacity:0;transform:scale(2.4);border-width:.5px}}
@keyframes sk-petal-a{0%{opacity:0;transform:translate3d(-50%,0,0) rotate(0) scale(.6)}15%{opacity:.85}60%{transform:translate3d(-260%,-140%,0) rotate(220deg) scale(1)}100%{opacity:0;transform:translate3d(-340%,260%,0) rotate(420deg) scale(.9)}}
@keyframes sk-petal-b{0%{opacity:0;transform:translate3d(-50%,0,0) rotate(0) scale(.6)}15%{opacity:.8}55%{transform:translate3d(200%,-170%,0) rotate(-200deg) scale(1.05)}100%{opacity:0;transform:translate3d(320%,280%,0) rotate(-400deg) scale(.85)}}
@keyframes sk-petal-c{0%{opacity:0;transform:translate3d(-50%,0,0) rotate(0) scale(.5)}15%{opacity:.75}55%{transform:translate3d(-140%,-230%,0) rotate(160deg) scale(.9)}100%{opacity:0;transform:translate3d(-90%,360%,0) rotate(380deg) scale(.8)}}
@keyframes sk-petal-d{0%{opacity:0;transform:translate3d(-50%,0,0) rotate(0) scale(.5)}15%{opacity:.8}55%{transform:translate3d(90%,-250%,0) rotate(-150deg) scale(.95)}100%{opacity:0;transform:translate3d(160%,380%,0) rotate(-360deg) scale(.8)}}
@keyframes sk-scroll-roll{0%{opacity:0;transform:translate3d(0,24px,0) scale(.96)}50%{opacity:1}100%{opacity:1;transform:translate3d(0,0,0) scale(1)}}
.mt-custom-sakura-sumie .mail-letter,.mt-custom-sakura-sumie.mail-letter{position:relative;isolation:isolate;border-radius:6px}
.mt-custom-sakura-sumie .mail-letter::before,.mt-custom-sakura-sumie.mail-letter::before{content:"";position:absolute;inset:0;background-image:${skLetterArt};background-size:100% 100%;background-repeat:no-repeat;pointer-events:none;z-index:0;opacity:.92}
.mt-custom-sakura-sumie.mail-letter:not(.letter-in){padding:24px 20px;min-height:160px}
.mt-custom-sakura-sumie .mail-letter.reader-letter{max-width:min(1440px,96vw);width:100%}
.mt-custom-sakura-sumie .m-head{font-size:28px;color:var(--sk-rose)}
.mt-custom-sakura-sumie .m-div{background:none;color:var(--sk-pink);opacity:.85}
.mt-custom-sakura-sumie #letter{width:min(1200px,96vw);position:relative;isolation:isolate;padding:32px 28px}
.mt-custom-sakura-sumie #letter::before{content:"";position:absolute;inset:0;background-image:${skLetterArt};background-size:100% 100%;pointer-events:none;z-index:0;opacity:.92}
@media(prefers-reduced-motion:reduce){.mt-custom-sakura-sumie .env-flap,.mt-custom-sakura-sumie .env-letter{transition:none}.mt-custom-sakura-sumie .env.is-opening::before,.mt-custom-sakura-sumie .env.is-opening::after,.mt-custom-sakura-sumie .env-scene:has(.env.is-opening)::before,.mt-custom-sakura-sumie .env-scene:has(.env.is-opening)::after,.mt-custom-sakura-sumie .env.is-opening .env-seal,.mt-custom-sakura-sumie .env.is-opening .env-seal::after,.mt-custom-sakura-sumie .mail-letter.letter-in,.mt-custom-sakura-sumie #letter.letter-in{animation:none}}
`;

export const STRICT_THEMES_CSS = `${hmCss}\n${skCss}`;

export const STRICT_THEMES = [
  {
    key: "custom-holographic-matrix" as const,
    label: "Holographic Matrix (FX)",
    emoji: "◇",
    seal: "◇",
    swatch: ["#0a0e14", "#4cdaef"] as [string, string],
    category: "Strict" as const,
    premium: true,
    strict: true,
  },
  {
    key: "custom-sakura-sumie" as const,
    label: "Sakura Sumi-e (Petal Burst)",
    emoji: "🌸",
    seal: "✿",
    swatch: ["#f7f2ea", "#e08fa1"] as [string, string],
    category: "Strict" as const,
    premium: true,
    strict: true,
  },
];
