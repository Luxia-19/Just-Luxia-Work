# Matcha Unfolded Postcard Diary

https://github.com/Luxia-19/screenshot-match.git

### 🎯 OBJECTIVE

Re-architect the Postcard Diary application UI and standalone export generator to deliver a hyper-realistic, highly tactile 3D mail-opening experience with brand-new, rich visual theme textures for both the outer envelope and inner letter/postcard.



---



### 1. 3D REALISTIC ENVELOPE & UNSEALING ANIMATION



#### A. Envelope Anatomy (Closed State)

- Render the closed mail item as a **true physical envelope**:

  - Distinct triangular top flap, folded side pocket seams, and a delicate wax seal or vintage postage stamp in the top-right corner.

  - Multi-layered drop shadows (`shadow-2xl shadow-black/50`) and realistic paper surface grain/lighting depth.

- **Strict Interaction Rule**: The envelope rests completely sealed. It must **NEVER** open automatically.



#### B. The 3-Stage Unsealing Sequence (Triggered on Click)

When the user clicks the envelope, trigger a smooth, realistic 3D sequence:

1. **Flap Rotation**: The top triangular flap rotates upward and backward along its top edge (`transform: perspective(1200px) rotateX(180deg)` duration 0.6s).

2. **Letter Slide-Out**: The moment the flap opens, the inner postcard smoothly glides upward out of the envelope pocket (`translateY(-85%) scale(1.02)` duration 0.8s with a subtle paper-sliding ease).

3. **Atmospheric Audio**: The exact millisecond the user clicks to open, auto-play the attached background atmospheric audio (`bgAudio.play()`). Provide a subtle glassmorphic audio control badge in the header.



---



### 2. BRAND-NEW TACTILE THEME PALETTES & TEXTURES



Replace all plain flat color themes with brand-new, highly textured visual styles for both the **envelope exterior** and the **inner letter**:



#### 1. 🍵 Ceremonial Matcha (Earthy & Calming)

- **Envelope**: Subtle linen/paper texture in muted sage green (`bg-[#e2eadf]`) with dark moss dashed border stitching (`border-[#7a9371]`) and a pressed-botanical seal.

- **Letter/Postcard**: Soft matcha cream paper (`bg-[#f3f7f1]`), deep forest serif text (`text-[#1f2d1b]`), elegant script headers.



#### 2. 🌌 Neon Slate / Cyberpunk Mail (Futuristic Digital Letter)

- **Envelope**: Matte obsidian shell (`bg-[#0c0d12]`) with glowing cyan/magenta border foil lines (`border-cyan-500/40`), glowing neon wax seal.

- **Letter/Postcard**: Deep slate glassmorphism with subtle grid texture (`bg-[#141620]`), glowing cyan monospace typography (`text-[#38bdf8]`), pink accent badges.



#### 3. 🌸 Sacred Lotus & Silk (Floral & Vintage Elegance)

- **Envelope**: Soft dusty-rose parchment texture (`bg-[#f7e9ec]`) with rose-gold metallic border trims (`border-[#d89ba8]`) and a lotus flower emblem.

- **Letter/Postcard**: Creamy lotus-petal tint (`bg-[#fdf6f7]`), deep plum serif font (`text-[#4a1c2b]`), delicate floral dividers.



#### 4. 📜 Antique Parchment & Gold (Classic Vintage USB/Letter)

- **Envelope**: Aged tea-stained papyrus texture (`bg-[#f4ecd8]`) with frayed paper edges, wax seal stamp, and faded postmark rings.

- **Letter/Postcard**: Faded golden-amber paper (`bg-[#fbf7ee]`), warm espresso ink (`text-[#3d2b1f]`), classic calligraphy fonts.



#### 5. 🔮 Midnight Velvet (Intimate & Mysterious)

- **Envelope**: Rich midnight indigo (`bg-[#101426]`) with subtle silver foil border lining (`border-indigo-400/30`).

- **Letter/Postcard**: Starlight velvet cream (`bg-[#181e36]`), silver-blue text (`text-[#e0e7ff]`), atmospheric glowing details.



---



### 3. HIDDEN 💌 PHOTO ENVELOPE (FOOTER DRAWER)

- To keep the main entry text clean and undisturbed, place a small sealed envelope badge (`💌`) in the bottom-left corner of the inner postcard footer.

- Clicking `💌` triggers a subtle slide-out animation revealing small photo card thumbnails (like pulling real printed photos out of a pocket).

- Tapping any photo opens a clean lightbox modal with subtle backdrop blur.



---



### 4. EXPORT ENGINE REQUIREMENTS

- Ensure the **"✨ Export Interactive Mail (.html)"** button outputs a single, self-contained HTML file containing this exact 2-stage 3D envelope animation, active theme textures, embedded Ba

se64 audio, Base64 photos, and offline auto-play logic.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/38593381-0a0c-4d2f-9dbb-18cf48feaaa0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Cloudflare deployment

The Worker is configured as `yourluxia`. Cloudflare serves it at `https://yourluxia.<your-workers.dev-subdomain>.workers.dev`; the account subdomain must be enabled in Cloudflare and is account-specific.

Authenticate once with `npx wrangler login`, then build and deploy with:

```sh
npm run deploy:cloudflare
```

The website is public to anyone with the URL. Postcards remain in each browser's local storage and are not uploaded or synced. Exported HTML files contain their postcard content, so share those files only with intended recipients.
