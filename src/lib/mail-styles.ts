import sakuraBranchSvg from "../components/theme-assets/sakura-sumi-branch.svg?raw";
import sakuraWaxSealSvg from "../components/theme-assets/sakura-wax-seal.svg?raw";
import sakuraHankoSvg from "../components/theme-assets/sakura-hanko.svg?raw";
import { STRICT_THEMES, STRICT_THEMES_CSS } from "./strict-themes";

/**
 * Tactile mail themes + envelope anatomy CSS.
 * The same CSS string powers the in-app envelope and the exported .html file,
 * so both render the identical animation and textures.
 */
export type MailKey =
  | "matcha" | "neon" | "lotus" | "parchment" | "velvet"
  | "spring" | "winter" | "summer" | "autumn" | "love" | "purple" | "cyber"
  | "celestial" | "alpine" | "tokyo" | "harvest" | "observatory"
  | "oasis" | "koi" | "denim" | "brulee" | "grotto"
  | "sakura-sumi" | "abyssal-nebula" | "astro-chart" | "velvet-roses" | "rainy-glass"
  | "pharaoh-papyrus" | "holographic-matrix" | "bioluminescent-trench" | "frost-evergreen" | "botanical-grimoire"
  | "custom-holographic-matrix" | "custom-sakura-sumie";

export type MailThemeCategory = "Nature" | "Night" | "Vintage" | "Premium" | "Strict";

export const MAIL_THEMES: { key: MailKey; label: string; emoji: string; seal: string; swatch: [string, string]; category: MailThemeCategory; premium?: boolean }[] = [
  { key: "matcha", label: "Ceremonial Matcha", emoji: "🍵", seal: "🌿", swatch: ["#e2eadf", "#7a9371"], category: "Nature" },
  { key: "neon", label: "Neon Slate", emoji: "🌌", seal: "⚡", swatch: ["#0c0d12", "#22d3ee"], category: "Night" },
  { key: "lotus", label: "Sacred Lotus & Silk", emoji: "🌸", seal: "🪷", swatch: ["#f7e9ec", "#d89ba8"], category: "Nature" },
  { key: "parchment", label: "Antique Parchment & Gold", emoji: "📜", seal: "✒", swatch: ["#f4ecd8", "#8b2c1f"], category: "Vintage" },
  { key: "velvet", label: "Midnight Velvet", emoji: "🔮", seal: "☾", swatch: ["#101426", "#a5b4fc"], category: "Night" },
  { key: "spring", label: "Spring Love", emoji: "✿", seal: "♥", swatch: ["#fff7fb", "#ee9ab5"], category: "Nature" },
  { key: "winter", label: "Winter Solitude", emoji: "❄", seal: "✦", swatch: ["#edf7ff", "#6f9fc7"], category: "Nature" },
  { key: "summer", label: "Summer Rendering", emoji: "☘", seal: "☀", swatch: ["#edf7df", "#5e9c63"], category: "Nature" },
  { key: "autumn", label: "Autumn Start", emoji: "❧", seal: "✦", swatch: ["#fff1df", "#c7652f"], category: "Vintage" },
  { key: "love", label: "Dear Love", emoji: "♥", seal: "♥", swatch: ["#fff1f1", "#c43d4b"], category: "Vintage" },
  { key: "purple", label: "Violet Reverie", emoji: "✦", seal: "✦", swatch: ["#f4efff", "#8b6dc7"], category: "Night" },
  { key: "cyber", label: "Cyber Blue", emoji: "⌁", seal: "◇", swatch: ["#071525", "#38bdf8"], category: "Night" },
  { key: "celestial", label: "Celestial Map Grid", emoji: "🌌", seal: "✦", swatch: ["#11102b", "#c9a65a"], category: "Night" },
  { key: "alpine", label: "Foggy Alpine Mist", emoji: "🌫️", seal: "🌲", swatch: ["#52675f", "#c4cbd0"], category: "Nature" },
  { key: "tokyo", label: "Tokyo City Nights", emoji: "🌃", seal: "✦", swatch: ["#101014", "#f02f9a"], category: "Night" },
  { key: "harvest", label: "Wild Harvest Bloom", emoji: "🍇", seal: "❧", swatch: ["#76617e", "#a5b59a"], category: "Nature" },
  { key: "observatory", label: "Starlight Observatory", emoji: "🔭", seal: "✦", swatch: ["#282a2b", "#c5a66b"], category: "Vintage" },
  { key: "oasis", label: "Desert Oasis Sandstorm", emoji: "🏜️", seal: "☼", swatch: ["#b96547", "#8bc9c2"], category: "Nature" },
  { key: "koi", label: "Koi Pond Reflection", emoji: "🎏", seal: "◉", swatch: ["#075b5b", "#f4773b"], category: "Nature" },
  { key: "denim", label: "Faded Denim Journey", emoji: "🧵", seal: "✂", swatch: ["#3c5274", "#e4dcc7"], category: "Vintage" },
  { key: "brulee", label: "Burnt Sugar Crème Brûlée", emoji: "🍮", seal: "✦", swatch: ["#9c5c28", "#f0dfc0"], category: "Vintage" },
  { key: "grotto", label: "Rainforest Grotto", emoji: "🌿", seal: "❧", swatch: ["#344f3c", "#9ba7a0"], category: "Nature" },
  { key: "sakura-sumi", label: "Sakura Sumi-e", emoji: "🌸", seal: "🌺", swatch: ["#faf6f0", "#bb7892"], category: "Premium", premium: true },
  { key: "abyssal-nebula", label: "Abyssal Nebula", emoji: "🪐", seal: "✧", swatch: ["#101020", "#9d83df"], category: "Premium", premium: true },
  { key: "astro-chart", label: "Celestial Astro-chart", emoji: "🧭", seal: "✦", swatch: ["#111a31", "#c5a45e"], category: "Premium", premium: true },
  { key: "velvet-roses", label: "Velvet & Roses", emoji: "🌹", seal: "♥", swatch: ["#f3e7e2", "#a72f42"], category: "Premium", premium: true },
  { key: "rainy-glass", label: "Rainy Glass", emoji: "🌧️", seal: "◉", swatch: ["#454f5d", "#a7c7d7"], category: "Premium", premium: true },
  { key: "pharaoh-papyrus", label: "Pharaoh's Papyrus", emoji: "𓆣", seal: "𓆣", swatch: ["#d4b77a", "#168d8c"], category: "Premium", premium: true },
  { key: "holographic-matrix", label: "Holographic Matrix", emoji: "⬡", seal: "⬡", swatch: ["#090d13", "#33f2e7"], category: "Premium", premium: true },
  { key: "bioluminescent-trench", label: "Bioluminescent Trench", emoji: "🪼", seal: "◌", swatch: ["#082a35", "#62ead9"], category: "Premium", premium: true },
  { key: "frost-evergreen", label: "Frost-bitten Evergreen", emoji: "🌲", seal: "❄", swatch: ["#dcebf0", "#7899ae"], category: "Premium", premium: true },
  { key: "botanical-grimoire", label: "Botanical Grimoire", emoji: "🌙", seal: "☼", swatch: ["#35261e", "#c39553"], category: "Premium", premium: true },
  ...STRICT_THEMES,
];

export const mailTheme = (k: MailKey) => MAIL_THEMES.find((m) => m.key === k) ?? MAIL_THEMES[3]!;
const svgDataUri = (source: string) => `data:image/svg+xml,${encodeURIComponent(source)}`;
export const SAKURA_BRANCH_ASSET = svgDataUri(sakuraBranchSvg);
export const SAKURA_WAX_SEAL_ASSET = svgDataUri(sakuraWaxSealSvg);
export const SAKURA_HANKO_ASSET = svgDataUri(sakuraHankoSvg);

export const MAIL_TITLE_FONTS: Record<MailKey, { label: string; family: string }> = {
  matcha: { label: "Bree Serif", family: '"Bree Serif", Georgia, serif' },
  neon: { label: "Orbitron", family: '"Orbitron", "Arial Black", sans-serif' },
  lotus: { label: "Pinyon Script", family: '"Pinyon Script", cursive' },
  parchment: { label: "IM Fell English", family: '"IM Fell English", Georgia, serif' },
  velvet: { label: "Cormorant Garamond", family: '"Cormorant Garamond", Georgia, serif' },
  spring: { label: "Playfair Display", family: '"Playfair Display", Georgia, serif' },
  winter: { label: "Josefin Slab", family: '"Josefin Slab", Georgia, serif' },
  summer: { label: "Amatic SC", family: '"Amatic SC", cursive' },
  autumn: { label: "Rye", family: '"Rye", Georgia, serif' },
  love: { label: "Great Vibes", family: '"Great Vibes", cursive' },
  purple: { label: "Cinzel Decorative", family: '"Cinzel Decorative", Georgia, serif' },
  cyber: { label: "Share Tech Mono", family: '"Share Tech Mono", monospace' },
  celestial: { label: "Cinzel", family: '"Cinzel", Georgia, serif' },
  alpine: { label: "Montserrat", family: '"Montserrat", Arial, sans-serif' },
  tokyo: { label: "Michroma", family: '"Michroma", Arial, sans-serif' },
  harvest: { label: "Lora", family: '"Lora", Georgia, serif' },
  observatory: { label: "Marcellus", family: '"Marcellus", Georgia, serif' },
  oasis: { label: "Rakkas", family: '"Rakkas", Georgia, serif' },
  koi: { label: "Noto Serif", family: '"Noto Serif", Georgia, serif' },
  denim: { label: "Special Elite", family: '"Special Elite", Georgia, serif' },
  brulee: { label: "Italiana", family: '"Italiana", Georgia, serif' },
  grotto: { label: "IM Fell DW Pica", family: '"IM Fell DW Pica", Georgia, serif' },
  "sakura-sumi": { label: "Kaushan Script", family: '"Kaushan Script", cursive' },
  "abyssal-nebula": { label: "Audiowide", family: '"Audiowide", sans-serif' },
  "astro-chart": { label: "Cormorant SC", family: '"Cormorant SC", Georgia, serif' },
  "velvet-roses": { label: "Bodoni Moda", family: '"Bodoni Moda", Georgia, serif' },
  "rainy-glass": { label: "Cutive Mono", family: '"Cutive Mono", monospace' },
  "pharaoh-papyrus": { label: "Almendra SC", family: '"Almendra SC", Georgia, serif' },
  "holographic-matrix": { label: "Oxanium", family: '"Oxanium", monospace' },
  "bioluminescent-trench": { label: "Splash", family: '"Splash", cursive' },
  "frost-evergreen": { label: "Julius Sans One", family: '"Julius Sans One", sans-serif' },
  "botanical-grimoire": { label: "Uncial Antiqua", family: '"Uncial Antiqua", Georgia, serif' },
  "custom-holographic-matrix": { label: "IBM Plex Mono", family: '"IBM Plex Mono", monospace' },
  "custom-sakura-sumie": { label: "Caveat", family: '"Caveat", "Pinyon Script", cursive' },
};

export const POSTCARD_FONT_STYLESHEET = "https://fonts.googleapis.com/css2?family=Almendra+SC&family=Amatic+SC&family=Audiowide&family=Bodoni+Moda&family=Bree+Serif&family=Cinzel&family=Cinzel+Decorative&family=Cormorant+Garamond&family=Cormorant+SC&family=Cutive+Mono&family=Great+Vibes&family=IM+Fell+DW+Pica&family=IM+Fell+English&family=Italiana&family=Josefin+Slab&family=Julius+Sans+One&family=Kaushan+Script&family=Lora&family=Marcellus&family=Michroma&family=Montserrat&family=Noto+Serif&family=Orbitron&family=Oxanium&family=Playfair+Display&family=Rakkas&family=Rye&family=Share+Tech+Mono&family=Special+Elite&family=Splash&family=Uncial+Antiqua&family=Fraunces:ital,wght@0,400;0,600;1,400&family=Karla:wght@400;500;700&family=Caveat:wght@400;600&family=IBM+Plex+Mono:wght@400;500&family=Pinyon+Script&display=swap";

export const MAIL_THEME_INKS: Record<MailKey, string> = {
  matcha: "#1f2d1b", neon: "#38bdf8", lotus: "#4a1c2b", parchment: "#3d2b1f",
  velvet: "#e0e7ff", spring: "#542a3a", winter: "#28445c", summer: "#29442b",
  autumn: "#59301f", love: "#54212a", purple: "#3e315c", cyber: "#bceaff",
  celestial: "#e8e2d2", alpine: "#354941", tokyo: "#f6d8e9", harvest: "#493b4e",
  observatory: "#e8e1d1", oasis: "#684432", koi: "#d8eee8", denim: "#ede7d7",
  brulee: "#56361e", grotto: "#e0e8dc", "sakura-sumi": "#39332f", "abyssal-nebula": "#e8e4f4",
  "astro-chart": "#f1e7c9", "velvet-roses": "#54252e", "rainy-glass": "#e2edf2", "pharaoh-papyrus": "#422e17",
  "holographic-matrix": "#bdfff8", "bioluminescent-trench": "#ccfbf2", "frost-evergreen": "#344b5a",
  "botanical-grimoire": "#e8d8ae",
  "custom-holographic-matrix": "#a5e8f4",
  "custom-sakura-sumie": "#3e332f",
};

export const MAIL_BODY_FONTS: Record<MailKey, string> = {
  matcha: '"Fraunces", Georgia, serif', neon: '"IBM Plex Mono", monospace', lotus: '"Fraunces", Georgia, serif',
  parchment: '"Fraunces", Georgia, serif', velvet: '"Fraunces", Georgia, serif', spring: '"Fraunces", Georgia, serif',
  winter: '"Fraunces", Georgia, serif', summer: '"Karla", system-ui, sans-serif', autumn: '"Fraunces", Georgia, serif',
  love: '"Fraunces", Georgia, serif', purple: '"Fraunces", Georgia, serif', cyber: '"IBM Plex Mono", monospace',
  celestial: '"Fraunces", Georgia, serif', alpine: '"Fraunces", Georgia, serif', tokyo: '"IBM Plex Mono", monospace',
  harvest: '"Fraunces", Georgia, serif', observatory: '"Fraunces", Georgia, serif', oasis: '"Fraunces", Georgia, serif',
  koi: '"Fraunces", Georgia, serif', denim: '"Karla", system-ui, sans-serif', brulee: '"Fraunces", Georgia, serif',
  grotto: '"Fraunces", Georgia, serif', "sakura-sumi": '"Fraunces", Georgia, serif',
  "abyssal-nebula": '"IBM Plex Mono", monospace', "astro-chart": '"Fraunces", Georgia, serif',
  "velvet-roses": '"Fraunces", Georgia, serif', "rainy-glass": '"IBM Plex Mono", monospace',
  "pharaoh-papyrus": '"Fraunces", Georgia, serif', "holographic-matrix": '"IBM Plex Mono", monospace',
  "bioluminescent-trench": '"Fraunces", Georgia, serif', "frost-evergreen": '"Karla", system-ui, sans-serif',
  "botanical-grimoire": '"Fraunces", Georgia, serif',
  "custom-holographic-matrix": '"IBM Plex Mono", monospace',
  "custom-sakura-sumie": '"Fraunces", Georgia, serif',
};

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .13 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const LINEN = "repeating-linear-gradient(0deg, rgba(60,80,50,.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(60,80,50,.05) 0 1px, transparent 1px 3px)";
const GRID = "linear-gradient(rgba(56,189,248,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.07) 1px, transparent 1px)";
const STAIN = "radial-gradient(ellipse at 20% 30%, rgba(140,95,40,.18), transparent 45%), radial-gradient(ellipse at 80% 75%, rgba(120,80,30,.16), transparent 50%), radial-gradient(circle at 60% 15%, rgba(150,110,50,.1), transparent 30%)";
const SILK = "linear-gradient(115deg, rgba(255,255,255,.35), transparent 30%, rgba(255,255,255,.25) 55%, transparent 80%)";
const STARS = "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.7), transparent), radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,.5), transparent), radial-gradient(1.5px 1.5px at 40% 80%, rgba(199,210,254,.6), transparent), radial-gradient(1px 1px at 85% 65%, rgba(255,255,255,.6), transparent)";
const PETALS = "radial-gradient(ellipse at 18% 22%, rgba(238,154,181,.28) 0 5%, transparent 6%), radial-gradient(ellipse at 78% 72%, rgba(238,154,181,.22) 0 4%, transparent 5%), radial-gradient(circle at 55% 38%, rgba(255,255,255,.7) 0 2%, transparent 3%)";
const SNOW = "radial-gradient(circle at 18% 26%, rgba(255,255,255,.9) 0 1px, transparent 2px), radial-gradient(circle at 76% 18%, rgba(255,255,255,.75) 0 2px, transparent 3px), radial-gradient(circle at 55% 78%, rgba(122,174,214,.22) 0 2px, transparent 3px)";
const LEAVES = "radial-gradient(ellipse at 18% 24%, rgba(73,121,57,.22) 0 5%, transparent 6%), radial-gradient(ellipse at 78% 68%, rgba(198,168,53,.2) 0 5%, transparent 6%), linear-gradient(120deg, transparent 45%, rgba(72,122,60,.08) 46% 48%, transparent 49%)";
const AUTUMN = "radial-gradient(ellipse at 20% 25%, rgba(199,101,47,.24) 0 5%, transparent 6%), radial-gradient(ellipse at 80% 76%, rgba(174,76,36,.2) 0 6%, transparent 7%), linear-gradient(35deg, transparent 48%, rgba(218,149,73,.16) 49% 51%, transparent 52%)";
const HEARTS = "radial-gradient(circle at 22% 28%, rgba(196,61,75,.2) 0 3%, transparent 4%), radial-gradient(circle at 76% 68%, rgba(196,61,75,.18) 0 4%, transparent 5%), linear-gradient(45deg, transparent 47%, rgba(196,61,75,.08) 48% 52%, transparent 53%)";
const VIOLET = "radial-gradient(circle at 20% 25%, rgba(139,109,199,.22) 0 4%, transparent 5%), radial-gradient(circle at 78% 70%, rgba(181,144,224,.22) 0 5%, transparent 6%), linear-gradient(135deg, transparent 48%, rgba(139,109,199,.08) 49% 51%, transparent 52%)";
const CYBER_BLUE = "linear-gradient(rgba(56,189,248,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.13) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(56,189,248,.18), transparent 30%)";
const CONSTELLATION = "linear-gradient(30deg, transparent 49.5%, rgba(201,166,90,.18) 49.7% 50%, transparent 50.2%), linear-gradient(150deg, transparent 49.5%, rgba(201,166,90,.14) 49.7% 50%, transparent 50.2%), radial-gradient(1.5px 1.5px at 18% 25%, #e5c779 45%, transparent 55%), radial-gradient(1px 1px at 72% 68%, #e5c779 45%, transparent 55%)";
const MIST = "linear-gradient(135deg, rgba(219,226,225,.2), transparent 38%, rgba(231,235,235,.22)), radial-gradient(ellipse at 70% 20%, rgba(224,231,230,.45), transparent 48%)";
const NEON_MAGENTA = "linear-gradient(115deg, transparent 35%, rgba(240,47,154,.25) 36% 38%, transparent 39%), linear-gradient(160deg, transparent 62%, rgba(240,47,154,.18) 63% 65%, transparent 66%), radial-gradient(ellipse at 85% 20%, rgba(240,47,154,.24), transparent 38%)";
const WATERCOLOR = "radial-gradient(ellipse at 18% 22%, rgba(130,92,139,.23) 0 12%, transparent 36%), radial-gradient(ellipse at 78% 70%, rgba(139,168,132,.3) 0 14%, transparent 40%)";
const BRUSHED_BRASS = "repeating-linear-gradient(175deg, rgba(225,193,126,.055) 0 1px, transparent 1px 3px), radial-gradient(ellipse at 70% 10%, rgba(197,166,107,.14), transparent 42%)";
const SAND = "repeating-linear-gradient(12deg, rgba(91,48,31,.06) 0 1px, transparent 1px 4px), radial-gradient(ellipse at 24% 74%, rgba(231,174,113,.25), transparent 43%)";
const WATER = "repeating-linear-gradient(165deg, transparent 0 8px, rgba(174,227,217,.1) 9px, transparent 11px), radial-gradient(ellipse at 50% 25%, rgba(160,226,216,.2), transparent 48%)";
const DENIM = "repeating-linear-gradient(0deg, rgba(230,225,209,.07) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(230,225,209,.07) 0 1px, transparent 1px 3px), radial-gradient(ellipse at 10% 12%, rgba(230,225,209,.16), transparent 25%)";
const CARAMEL = "linear-gradient(35deg, transparent 48%, rgba(85,42,18,.5) 49%, transparent 50%), linear-gradient(125deg, transparent 52%, rgba(85,42,18,.35) 53%, transparent 54%), radial-gradient(ellipse at 65% 18%, rgba(225,158,66,.3), transparent 40%)";
const MOSS = "radial-gradient(ellipse at 20% 20%, rgba(125,155,91,.24) 0 8%, transparent 28%), radial-gradient(ellipse at 82% 76%, rgba(57,92,65,.4) 0 10%, transparent 34%), linear-gradient(140deg, transparent 45%, rgba(176,190,179,.16) 46%, transparent 60%)";
const SAKURA_PAPER = "radial-gradient(ellipse at 92% 38%, rgba(42,35,34,.16) 0 1px, transparent 2px), linear-gradient(112deg, transparent 0 72%, rgba(97,77,65,.12) 72.2% 72.6%, transparent 72.8%), radial-gradient(ellipse at 88% 20%, rgba(191,115,143,.2) 0 4%, transparent 5%), radial-gradient(ellipse at 79% 28%, rgba(191,115,143,.16) 0 3%, transparent 4%)";
const NEBULA_PAPER = "radial-gradient(ellipse at 70% 22%, rgba(126,91,204,.42), transparent 38%), radial-gradient(ellipse at 25% 80%, rgba(59,89,177,.32), transparent 42%), radial-gradient(1px 1px at 18% 24%, #fff 50%, transparent 60%), radial-gradient(1px 1px at 82% 67%, #e8e1ff 50%, transparent 60%)";
const ASTRO_ENGRAVING = "linear-gradient(90deg, transparent 48%, rgba(207,174,99,.28) 49%, transparent 50%), linear-gradient(0deg, transparent 48%, rgba(207,174,99,.2) 49%, transparent 50%), radial-gradient(circle at 50% 50%, transparent 0 28%, rgba(207,174,99,.22) 28.5% 29%, transparent 29.5%)";
const ROSE_COTTON = "radial-gradient(ellipse at 5% 42%, rgba(153,45,57,.2) 0 2%, transparent 2.5%), radial-gradient(ellipse at 8% 50%, rgba(153,45,57,.15) 0 3%, transparent 3.5%), repeating-linear-gradient(0deg, rgba(132,94,83,.045) 0 1px, transparent 1px 4px)";
const RAIN_DROPS = "radial-gradient(ellipse at 18% 28%, rgba(220,242,249,.4) 0 1px, rgba(180,216,230,.12) 2px, transparent 7px), radial-gradient(ellipse at 74% 44%, rgba(220,242,249,.36) 0 1px, rgba(180,216,230,.12) 2px, transparent 8px), linear-gradient(180deg, transparent 72%, rgba(192,216,224,.2) 73%, rgba(192,216,224,.04) 88%, transparent 89%)";
const PAPYRUS_GRAIN = "repeating-linear-gradient(2deg, rgba(105,72,35,.12) 0 1px, transparent 1px 5px), repeating-linear-gradient(88deg, rgba(146,111,59,.08) 0 1px, transparent 1px 7px), radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(99,60,24,.24) 100%)";
const HOLO_CIRCUIT = "linear-gradient(90deg, transparent 8%, rgba(51,242,231,.42) 8.3% 8.7%, transparent 9%), linear-gradient(0deg, transparent 18%, rgba(51,242,231,.25) 18.3% 18.7%, transparent 19%), linear-gradient(135deg, transparent 47%, rgba(122,103,255,.22) 47.5% 48%, transparent 48.5%)";
const JELLYFISH_INK = "radial-gradient(ellipse at 18% 92%, rgba(104,246,224,.34) 0 4%, transparent 5%), radial-gradient(ellipse at 76% 88%, rgba(119,205,255,.25) 0 6%, transparent 7%), linear-gradient(180deg, transparent 80%, rgba(91,237,215,.15) 81%, transparent 83%)";
const FROST_CRYSTALS = "linear-gradient(135deg, transparent 8%, rgba(255,255,255,.85) 8.3%, transparent 8.8%), linear-gradient(45deg, transparent 91%, rgba(255,255,255,.7) 91.3%, transparent 91.8%), radial-gradient(circle at 8% 8%, rgba(255,255,255,.85), transparent 22%), radial-gradient(circle at 94% 92%, rgba(255,255,255,.75), transparent 24%)";
const GRIMOIRE_SYMBOLS = "radial-gradient(circle at 12% 18%, rgba(204,166,96,.3) 0 1px, transparent 2px), radial-gradient(circle at 86% 32%, rgba(204,166,96,.24) 0 1px, transparent 2px), repeating-linear-gradient(135deg, transparent 0 17px, rgba(204,166,96,.08) 18px 19px, transparent 20px 34px)";

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

.mt-spring{--env-bg:#fff7fb;--env-tex:${NOISE},${PETALS};--env-line:#ee9ab5;--env-ink:#9b4d68;--env-border:2px dashed #ee9ab5;--seal-bg:radial-gradient(circle at 35% 30%,#ffc6d8,#df7797 72%);--seal-ring:#c85f7d;--glow:none;
 --l-bg:#fffafd;--l-tex:${NOISE},${PETALS};--l-ink:#542a3a;--l-accent:#c85f7d;--l-font:"Fraunces",Georgia,serif;--l-head:"Caveat",cursive;--l-border:1px solid #f2cbd8;--l-div:"spring âœ¿ love"}
.mt-winter{--env-bg:#edf7ff;--env-tex:${NOISE},${SNOW};--env-line:#7aaed5;--env-ink:#345675;--env-border:1px solid #9fc7e3;--seal-bg:radial-gradient(circle at 35% 30%,#dff4ff,#6f9fc7 72%);--seal-ring:#477da8;--glow:0 0 12px rgba(111,159,199,.25);
 --l-bg:#f7fcff;--l-tex:${NOISE},${SNOW};--l-ink:#28445c;--l-accent:#477da8;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid #c6dfef;--l-div:"winter â„ solitude"}
.mt-summer{--env-bg:#edf7df;--env-tex:${NOISE},${LEAVES};--env-line:#6e9d5d;--env-ink:#355b31;--env-border:2px dashed #79a967;--seal-bg:radial-gradient(circle at 35% 30%,#b9df8d,#5e9c63 72%);--seal-ring:#467b4a;--glow:none;
 --l-bg:#fbfff5;--l-tex:${NOISE},${LEAVES};--l-ink:#29442b;--l-accent:#528652;--l-font:"Karla",system-ui,sans-serif;--l-head:"Caveat",cursive;--l-border:1px solid #cbe0bc;--l-div:"summer â˜˜ nature"}
.mt-autumn{--env-bg:#fff1df;--env-tex:${NOISE},${AUTUMN};--env-line:#c7652f;--env-ink:#7d3b25;--env-border:3px double #d9904a;--seal-bg:radial-gradient(circle at 35% 30%,#f0ad5e,#b44f2e 72%);--seal-ring:#8e3c24;--glow:none;
 --l-bg:#fff8ed;--l-tex:${NOISE},${AUTUMN};--l-ink:#59301f;--l-accent:#b44f2e;--l-font:"Fraunces",Georgia,serif;--l-head:"Caveat",cursive;--l-border:1px solid #edc99e;--l-div:"autumn â§ start"}
.mt-love{--env-bg:#fff1f1;--env-tex:${NOISE},${HEARTS};--env-line:#c43d4b;--env-ink:#7f2733;--env-border:2px dashed #d86570;--seal-bg:radial-gradient(circle at 35% 30%,#f07b88,#b52e40 72%);--seal-ring:#8d2030;--glow:0 0 12px rgba(196,61,75,.2);
 --l-bg:#fff8f8;--l-tex:${NOISE},${HEARTS};--l-ink:#54212a;--l-accent:#b52e40;--l-font:"Fraunces",Georgia,serif;--l-head:"Caveat",cursive;--l-border:1px solid #f0c4c8;--l-div:"dear â¤ love"}
.mt-purple{--env-bg:#f4efff;--env-tex:${NOISE},${VIOLET};--env-line:#8b6dc7;--env-ink:#55407d;--env-border:1px solid #a795d8;--seal-bg:radial-gradient(circle at 35% 30%,#d3bdf4,#795cb5 72%);--seal-ring:#62459a;--glow:0 0 14px rgba(139,109,199,.25);
 --l-bg:#fbf9ff;--l-tex:${NOISE},${VIOLET};--l-ink:#3e315c;--l-accent:#7254aa;--l-font:"Fraunces",Georgia,serif;--l-head:"Caveat",cursive;--l-border:1px solid #ded4f3;--l-div:"violet âœ¦ reverie"}
.mt-cyber{--env-bg:#071525;--env-tex:${NOISE},${CYBER_BLUE};--env-line:#38bdf8;--env-ink:#9bdcff;--env-border:1px solid rgba(56,189,248,.7);--seal-bg:radial-gradient(circle at 35% 30%,#7dd3fc,#0284c7 72%);--seal-ring:#38bdf8;--glow:0 0 14px rgba(56,189,248,.65),0 0 28px rgba(14,165,233,.35);
 --l-bg:#081a2d;--l-tex:${CYBER_BLUE};--l-tex-size:20px 20px;--l-ink:#bceaff;--l-accent:#38bdf8;--l-font:"IBM Plex Mono",monospace;--l-head:"IBM Plex Mono",monospace;--l-border:1px solid rgba(56,189,248,.5);--l-div:"// blue signal //"}
.mt-celestial{--env-bg:#11102b;--env-tex:${NOISE},${STARS},${CONSTELLATION};--env-line:#c9a65a;--env-ink:#e3ca8b;--env-border:1px solid rgba(201,166,90,.75);--seal-bg:radial-gradient(circle at 35% 30%,#f0d998,#8c6b31 75%);--seal-ring:#c9a65a;--glow:0 0 12px rgba(201,166,90,.28);
 --l-bg:#15142e;--l-tex:${STARS},${CONSTELLATION};--l-ink:#e8e2d2;--l-accent:#d6b866;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid rgba(201,166,90,.45);--l-div:"✦ · ✧ · ✦"}
.mt-alpine{--env-bg:#52675f;--env-tex:${NOISE},${MIST};--env-line:#b8c2c2;--env-ink:#e2e7e5;--env-border:1px solid rgba(211,220,220,.5);--seal-bg:radial-gradient(circle at 35% 30%,#dce4e1,#70847b 75%);--seal-ring:#b8c2c2;--glow:none;
 --l-bg:#dce1df;--l-tex:${NOISE},${MIST};--l-ink:#354941;--l-accent:#60786c;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid #c0cbc7;--l-div:"⌁ · ⌁ · ⌁"}
.mt-tokyo{--env-bg:#101014;--env-tex:${NOISE},${NEON_MAGENTA};--env-line:#f02f9a;--env-ink:#ff8dcc;--env-border:1px solid rgba(240,47,154,.7);--seal-bg:radial-gradient(circle at 35% 30%,#ffb4de,#bd176e 75%);--seal-ring:#f02f9a;--glow:0 0 15px rgba(240,47,154,.55);
 --l-bg:#171218;--l-tex:${NEON_MAGENTA};--l-ink:#f6d8e9;--l-accent:#ff4eaa;--l-font:"IBM Plex Mono",monospace;--l-head:"IBM Plex Mono",monospace;--l-border:1px solid rgba(240,47,154,.45);--l-div:"// TOKYO NIGHT //"}
.mt-harvest{--env-bg:#76617e;--env-tex:${NOISE},${WATERCOLOR};--env-line:#b2c3a7;--env-ink:#f0e9ed;--env-border:2px solid rgba(190,172,198,.7);--seal-bg:radial-gradient(circle at 35% 30%,#b5c5a5,#675271 75%);--seal-ring:#a5b59a;--glow:none;
 --l-bg:#eee9e8;--l-tex:${NOISE},${WATERCOLOR};--l-ink:#493b4e;--l-accent:#786082;--l-font:"Fraunces",Georgia,serif;--l-head:"Caveat",cursive;--l-border:1px solid #d5cbd7;--l-div:"❧ · 🍇 · ❧"}
.mt-observatory{--env-bg:#282a2b;--env-tex:${NOISE},${BRUSHED_BRASS};--env-line:#c5a66b;--env-ink:#e1c98f;--env-border:1px solid rgba(197,166,107,.6);--seal-bg:radial-gradient(circle at 35% 30%,#ead39c,#80653b 75%);--seal-ring:#c5a66b;--glow:0 0 10px rgba(197,166,107,.2);
 --l-bg:#303233;--l-tex:${BRUSHED_BRASS};--l-ink:#e8e1d1;--l-accent:#d2b579;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid rgba(197,166,107,.42);--l-div:"· · · · ·"}
.mt-oasis{--env-bg:#b96547;--env-tex:${NOISE},${SAND};--env-line:#83c5bd;--env-ink:#f5e5d5;--env-border:2px dashed #d98b69;--seal-bg:radial-gradient(circle at 35% 30%,#a7ded4,#508e88 75%);--seal-ring:#83c5bd;--glow:none;
 --l-bg:#f0dfca;--l-tex:${NOISE},${SAND};--l-ink:#684432;--l-accent:#398b84;--l-font:"Fraunces",Georgia,serif;--l-head:"Caveat",cursive;--l-border:1px solid #e4c4a4;--l-div:"☼ · ◇ · ☼"}
.mt-koi{--env-bg:#075b5b;--env-tex:${NOISE},${WATER};--env-line:#e77b46;--env-ink:#c5e5dd;--env-border:1px solid rgba(151,218,206,.5);--seal-bg:radial-gradient(circle at 35% 30%,#ffad68,#cf4b22 75%);--seal-ring:#f4773b;--glow:0 0 12px rgba(96,201,183,.22);
 --l-bg:#0d6562;--l-tex:${WATER};--l-ink:#d8eee8;--l-accent:#ff874c;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid rgba(151,218,206,.38);--l-div:"~ · 🎏 · ~"}
.mt-denim{--env-bg:#3c5274;--env-tex:${NOISE},${DENIM};--env-line:#d8d1bd;--env-ink:#eee9dc;--env-border:2px dashed #c9c2b0;--seal-bg:radial-gradient(circle at 35% 30%,#aabbd0,#405779 75%);--seal-ring:#e4dcc7;--glow:none;
 --l-bg:#344969;--l-tex:${DENIM};--l-ink:#ede7d7;--l-accent:#e4dcc7;--l-font:"Karla",system-ui,sans-serif;--l-head:"Caveat",cursive;--l-border:1px solid rgba(228,220,199,.35);--l-div:"— · — · —"}
.mt-brulee{--env-bg:#9c5c28;--env-tex:${NOISE},${CARAMEL};--env-line:#e5ba79;--env-ink:#fff0d4;--env-border:2px solid #d39a50;--seal-bg:radial-gradient(circle at 35% 30%,#f2d89e,#985323 75%);--seal-ring:#e5ba79;--glow:0 0 10px rgba(229,186,121,.2);
 --l-bg:#f0dfc0;--l-tex:${NOISE};--l-ink:#56361e;--l-accent:#9c5c28;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid #dfc59e;--l-div:"✦ · ✧ · ✦"}
.mt-grotto{--env-bg:#344f3c;--env-tex:${NOISE},${MOSS};--env-line:#9ba7a0;--env-ink:#d4dfd5;--env-border:1px solid rgba(155,167,160,.6);--seal-bg:radial-gradient(circle at 35% 30%,#b6c69c,#496a50 75%);--seal-ring:#9ba7a0;--glow:0 0 12px rgba(112,151,117,.2);
 --l-bg:#3b5843;--l-tex:${MOSS};--l-ink:#e0e8dc;--l-accent:#b2c392;--l-font:"Fraunces",Georgia,serif;--l-head:"Fraunces",Georgia,serif;--l-border:1px solid rgba(183,199,177,.35);--l-div:"❧ · 🌿 · ❧"}

.mt-sakura-sumi{--env-bg:#faf6f0;--env-tex:${NOISE},${LINEN},${SAKURA_PAPER};--env-line:#b77b85;--env-ink:#65504a;--env-border:1px solid rgba(160,105,114,.62);--seal-bg:radial-gradient(circle at 35% 28%,#f1cbbd,#a75370 75%);--seal-ring:#d3a16f;--glow:0 0 10px rgba(204,150,117,.28);--l-bg:#faf6f0;--l-tex:${NOISE},${SAKURA_PAPER};--l-ink:#39332f;--l-accent:#9b566b;--l-font:"Fraunces",Georgia,serif;--l-head:"Kaushan Script",cursive;--l-border:1px solid #d5c8af;--l-div:"✿ · ❀ · ✿"}
.mt-abyssal-nebula{--env-bg:#0d0d18;--env-tex:${NOISE},${NEBULA_PAPER};--env-line:#8e7ae0;--env-ink:#e8e2ff;--env-border:1px solid rgba(160,143,232,.55);--seal-bg:radial-gradient(circle at 35% 25%,rgba(255,255,255,.9),rgba(163,137,255,.55) 34%,rgba(54,58,125,.9) 72%);--seal-ring:#c7c3ec;--glow:0 0 18px rgba(128,108,239,.5);--l-bg:#11111f;--l-tex:${NOISE},${NEBULA_PAPER};--l-ink:#e8e4f4;--l-accent:#c2b5ff;--l-font:"IBM Plex Mono",monospace;--l-head:"Audiowide",sans-serif;--l-border:1px solid rgba(162,145,239,.42);--l-div:"✧ · · ✦ · · ✧"}
.mt-astro-chart{--env-bg:#10192d;--env-tex:${NOISE},${CONSTELLATION},${ASTRO_ENGRAVING};--env-line:#c6a45e;--env-ink:#e7d6a5;--env-border:1px solid rgba(205,174,105,.65);--seal-bg:radial-gradient(circle at 35% 28%,#f4dda1,#987238 72%);--seal-ring:#d4b86e;--glow:0 0 12px rgba(207,174,99,.35);--l-bg:#151f35;--l-tex:${NOISE},${ASTRO_ENGRAVING};--l-ink:#f1e7c9;--l-accent:#d5b66b;--l-font:"Fraunces",Georgia,serif;--l-head:"Cormorant SC",Georgia,serif;--l-border:1px solid rgba(205,174,105,.42);--l-div:"☉ · ✦ · ☽"}
.mt-velvet-roses{--env-bg:#6e2432;--env-tex:${NOISE},${ROSE_COTTON};--env-line:#d49b87;--env-ink:#f6e8df;--env-border:2px solid rgba(199,140,130,.65);--seal-bg:radial-gradient(circle at 35% 25%,#bd3947,#601522 76%);--seal-ring:#d7ad75;--glow:0 0 12px rgba(162,45,60,.32);--l-bg:#f3e7e2;--l-tex:${NOISE},${ROSE_COTTON},${SILK};--l-ink:#54252e;--l-accent:#a72f42;--l-font:"Fraunces",Georgia,serif;--l-head:"Bodoni Moda",Georgia,serif;--l-border:1px solid #ddc4b8;--l-div:"❧ · 🌹 · ❧"}
.mt-rainy-glass{--env-bg:#394450;--env-tex:${NOISE},${RAIN_DROPS};--env-line:#9dbac8;--env-ink:#e0ebf0;--env-border:1px solid rgba(183,207,218,.56);--seal-bg:radial-gradient(circle at 35% 28%,rgba(239,250,255,.9),rgba(121,160,179,.75) 68%);--seal-ring:#bed3dc;--glow:0 0 12px rgba(148,198,219,.28);--l-bg:#525e6b;--l-tex:${NOISE},${RAIN_DROPS};--l-ink:#e2edf2;--l-accent:#c1d9e3;--l-font:"Cutive Mono",monospace;--l-head:"Cutive Mono",monospace;--l-border:1px solid rgba(199,222,230,.42);--l-div:"┄ · ┄ · ┄"}
.mt-pharaoh-papyrus{--env-bg:#b89757;--env-tex:${NOISE},${PAPYRUS_GRAIN};--env-line:#197f7b;--env-ink:#533b1d;--env-border:2px solid #a47731;--seal-bg:radial-gradient(circle at 35% 28%,#e0c269,#92702e 70%);--seal-ring:#1b8984;--glow:0 0 10px rgba(191,151,57,.35);--l-bg:#dfc98e;--l-tex:${NOISE},${PAPYRUS_GRAIN},${GRIMOIRE_SYMBOLS};--l-ink:#422e17;--l-accent:#126f6a;--l-font:"Fraunces",Georgia,serif;--l-head:"Cinzel Decorative",Georgia,serif;--l-border:2px solid #b6914c;--l-div:"𓂀 · 𓆣 · 𓋹"}
.mt-holographic-matrix{--env-bg:#05090e;--env-tex:${NOISE},${HOLO_CIRCUIT};--env-line:#32e9e2;--env-ink:#b8fff9;--env-border:1px solid rgba(51,242,231,.76);--seal-bg:linear-gradient(135deg,#62fff2,#256b91 45%,#966cff);--seal-ring:#53eee3;--glow:0 0 16px rgba(51,242,231,.58),0 0 28px rgba(128,101,255,.3);--l-bg:#080e14;--l-tex:${NOISE},${HOLO_CIRCUIT};--l-ink:#bdfff8;--l-accent:#4af5e9;--l-font:"IBM Plex Mono",monospace;--l-head:"Oxanium",monospace;--l-border:1px solid rgba(51,242,231,.52);--l-div:"[ // SIGNAL // ]"}
.mt-bioluminescent-trench{--env-bg:#062630;--env-tex:${NOISE},${WATER},${JELLYFISH_INK};--env-line:#5de7d2;--env-ink:#c6fff4;--env-border:1px solid rgba(93,231,210,.48);--seal-bg:radial-gradient(circle at 35% 24%,#effffb,#5bbfae 48%,#226576 78%);--seal-ring:#9ef6e8;--glow:0 0 16px rgba(83,241,216,.5);--l-bg:#083441;--l-tex:${NOISE},${WATER},${JELLYFISH_INK};--l-ink:#ccfbf2;--l-accent:#73efdc;--l-font:"Fraunces",Georgia,serif;--l-head:"Splash",cursive;--l-border:1px solid rgba(115,239,220,.36);--l-div:"≈ · 🪼 · ≈"}
.mt-frost-evergreen{--env-bg:#8ea8b8;--env-tex:${NOISE},${SNOW},${FROST_CRYSTALS};--env-line:#7795a6;--env-ink:#f4fbff;--env-border:1px solid rgba(255,255,255,.72);--seal-bg:radial-gradient(circle at 35% 25%,#fff,#a9cad9 68%);--seal-ring:#e6f4f8;--glow:0 0 12px rgba(213,244,255,.48);--l-bg:#dcebf0;--l-tex:${NOISE},${FROST_CRYSTALS},${SNOW};--l-ink:#344b5a;--l-accent:#718fa2;--l-font:"Karla",system-ui,sans-serif;--l-head:"Julius Sans One",sans-serif;--l-border:1px solid #b9d1da;--l-div:"❄ · ✧ · ❄"}
.mt-botanical-grimoire{--env-bg:#30231d;--env-tex:${NOISE},${STAIN},${GRIMOIRE_SYMBOLS};--env-line:#bd9250;--env-ink:#dfc58e;--env-border:1px solid rgba(189,146,80,.72);--seal-bg:radial-gradient(circle at 35% 28%,#dbbb72,#704a23 72%);--seal-ring:#c6a15f;--glow:0 0 11px rgba(194,145,66,.3);--l-bg:#403128;--l-tex:${NOISE},${STAIN},${GRIMOIRE_SYMBOLS};--l-ink:#e8d8ae;--l-accent:#d4ad65;--l-font:"Fraunces",Georgia,serif;--l-head:"Uncial Antiqua",Georgia,serif;--l-border:1px solid rgba(201,165,101,.44);--l-div:"☾ · ☼ · ☽"}

.env-stamp.mt-sakura-sumi{left:10px;right:auto;top:42%;transform:rotate(-12deg);border-radius:50%;border:1px solid var(--seal-ring);box-shadow:0 0 0 3px color-mix(in srgb,var(--seal-ring) 28%,transparent)}
.env-stamp.mt-abyssal-nebula{right:18px;top:34%;width:48px;height:48px;border-radius:50%;filter:drop-shadow(0 0 10px var(--seal-ring));}
.env-stamp.mt-astro-chart{left:18px;right:auto;top:14px;width:46px;height:46px;border-radius:50%;outline:1px solid var(--env-line);outline-offset:3px}
.env-stamp.mt-velvet-roses{left:16px;right:auto;top:48%;transform:rotate(-10deg);border-radius:50% 50% 46% 54%;box-shadow:0 5px 12px rgba(52,13,20,.34)}
.env-stamp.mt-rainy-glass{right:22px;top:auto;bottom:18px;width:46px;height:46px;border-radius:50%;backdrop-filter:blur(3px);box-shadow:0 0 12px rgba(195,232,245,.25)}
.env-stamp.mt-pharaoh-papyrus{left:16px;right:auto;top:14px;width:48px;height:48px;border:2px solid #1b8984;transform:rotate(45deg)}
.env-stamp.mt-holographic-matrix{left:18px;right:auto;top:42%;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);filter:drop-shadow(0 0 9px var(--seal-ring))}
.env-stamp.mt-bioluminescent-trench{right:18px;top:auto;bottom:20px;border-radius:50%;filter:drop-shadow(0 0 10px var(--seal-ring))}
.env-stamp.mt-frost-evergreen{left:15px;right:auto;top:16px;border-radius:50%;outline:1px solid var(--seal-ring);outline-offset:3px}
.env-stamp.mt-botanical-grimoire{right:16px;top:auto;bottom:20px;border-radius:50% 50% 4px 50%;transform:rotate(45deg);outline:1px solid var(--seal-ring);outline-offset:3px}
.env-flap-face .sakura-branch{position:absolute;z-index:1;right:2%;top:1%;width:92%;height:92%;object-fit:contain;object-position:center top;pointer-events:none}
.env-seal .sakura-wax-seal{display:block;width:100%;height:100%;object-fit:contain}
.mt-sakura-sumi .env-seal{padding:1px;background:transparent;box-shadow:none}
.sakura-hanko{position:absolute;z-index:6;right:1rem;bottom:1rem;width:3rem;height:3rem;object-fit:contain;opacity:.94;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(53,31,26,.18))}
.sakura-card-hanko{right:1rem;bottom:1rem;width:2.5rem;height:2.5rem}
.mt-sakura-sumi .page-pin{bottom:4.7rem}
.env-mark.mt-sakura-sumi{left:13%;right:auto;top:28%;border-radius:50% 5% 50% 5%;transform:rotate(-24deg)}
.env-mark.mt-astro-chart,.env-mark.mt-botanical-grimoire{left:42%;right:auto;top:18%;width:72px;height:72px;border-style:dotted}
.env-mark.mt-velvet-roses{left:8%;right:auto;top:38%;border-radius:50% 5% 50% 5%;transform:rotate(-35deg)}
.env-mark.mt-rainy-glass,.env-mark.mt-bioluminescent-trench{left:44%;right:auto;top:16%;border-style:dashed;filter:drop-shadow(0 0 6px var(--env-line))}
.env-mark.mt-pharaoh-papyrus{left:12%;right:auto;top:20%;border-radius:4px;transform:rotate(45deg)}
.env-mark.mt-holographic-matrix{left:12%;right:auto;top:26%;border-radius:4px;transform:rotate(45deg);box-shadow:0 0 12px var(--env-line)}
.env-mark.mt-frost-evergreen{left:8%;right:auto;top:10%;width:72px;height:72px;border-style:dotted}
.env-seal.mt-sakura-sumi{border-radius:50% 50% 48% 52%;box-shadow:0 0 0 3px #d9b477 inset,0 3px 8px rgba(62,34,41,.35),0 0 15px rgba(204,147,122,.3)}
.env-seal.mt-abyssal-nebula{border:1px solid rgba(255,255,255,.55);box-shadow:0 0 0 3px rgba(211,202,255,.22) inset,0 4px 10px rgba(0,0,0,.45),0 0 18px rgba(139,121,227,.56)}
.env-seal.mt-astro-chart{border-radius:50%;box-shadow:0 0 0 3px #d7b86d inset,0 0 0 6px rgba(215,184,109,.3),0 4px 8px rgba(0,0,0,.4)}
.env-seal.mt-pharaoh-papyrus{border-radius:8px;transform:rotate(45deg);box-shadow:0 0 0 3px #168d8c inset,0 0 0 6px #d4ae5e,0 4px 8px rgba(54,37,12,.4)}
.env-seal.mt-holographic-matrix{clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);box-shadow:0 0 0 3px #57fff0 inset,0 0 16px #33f2e7}
.env-seal.mt-bioluminescent-trench{border:1px solid #aaffef;box-shadow:0 0 0 3px rgba(115,239,220,.25) inset,0 0 15px rgba(83,241,216,.7)}
.env-seal.mt-frost-evergreen{border-radius:50%;box-shadow:0 0 0 3px #fff inset,0 0 0 6px rgba(255,255,255,.52),0 3px 8px rgba(60,88,103,.32)}
.mt-sakura-sumi .media-emblem-photo,.mt-sakura-sumi .media-emblem-audio,.mt-sakura-sumi .media-emblem-child{border-radius:50% 4px 50% 4px}
.mt-abyssal-nebula .media-emblem-photo,.mt-abyssal-nebula .media-emblem-audio,.mt-abyssal-nebula .media-emblem-child{box-shadow:0 0 12px rgba(157,131,223,.52)}
.mt-astro-chart .media-emblem-photo,.mt-astro-chart .media-emblem-audio,.mt-astro-chart .media-emblem-child{border-style:double}
.mt-velvet-roses .media-emblem-photo,.mt-velvet-roses .media-emblem-audio,.mt-velvet-roses .media-emblem-child{border-radius:50% 50% 4px 4px}
.mt-rainy-glass .media-emblem-photo,.mt-rainy-glass .media-emblem-audio,.mt-rainy-glass .media-emblem-child{backdrop-filter:blur(5px);box-shadow:0 0 10px rgba(167,199,215,.26)}
.mt-pharaoh-papyrus .media-emblem-photo,.mt-pharaoh-papyrus .media-emblem-audio,.mt-pharaoh-papyrus .media-emblem-child{border:2px double #168d8c}
.mt-holographic-matrix .media-emblem-photo,.mt-holographic-matrix .media-emblem-audio,.mt-holographic-matrix .media-emblem-child{box-shadow:0 0 12px rgba(51,242,231,.5);border-color:#33f2e7}
.mt-bioluminescent-trench .media-emblem-photo,.mt-bioluminescent-trench .media-emblem-audio,.mt-bioluminescent-trench .media-emblem-child{box-shadow:0 0 12px rgba(98,234,217,.45)}
.mt-frost-evergreen .media-emblem-photo,.mt-frost-evergreen .media-emblem-audio,.mt-frost-evergreen .media-emblem-child{border-color:#f8ffff;box-shadow:0 0 9px rgba(255,255,255,.42)}
.mt-botanical-grimoire .media-emblem-photo,.mt-botanical-grimoire .media-emblem-audio,.mt-botanical-grimoire .media-emblem-child{border-style:double;box-shadow:0 0 0 2px rgba(195,149,83,.16)}

.env-scene{perspective:1200px;width:min(340px,86vw);aspect-ratio:3/2;position:relative;margin-top:110px}
.env{position:absolute;inset:0;cursor:pointer;transform-style:preserve-3d;transition:transform .4s ease;filter:drop-shadow(0 22px 26px rgba(0,0,0,.45)) drop-shadow(0 6px 8px rgba(0,0,0,.3))}
.env:not(.is-flap):hover{transform:translateY(-4px) rotate(-.6deg)}
.env-back,.env-pocket,.env-flap-face{background-color:var(--env-bg);background-image:var(--env-tex)}
.env-back{position:absolute;inset:0;z-index:0;border-radius:6px;filter:brightness(.78)}
.env-letter{position:absolute;left:6%;right:6%;top:5%;bottom:6%;border-radius:3px;padding:14px 16px;z-index:2;overflow:hidden;
 background-color:var(--l-bg);background-image:var(--l-tex);background-size:var(--l-tex-size,auto);color:var(--l-ink);font-family:var(--l-font);border:var(--l-border);
 box-shadow:0 2px 6px rgba(0,0,0,.25);transition:transform .65s cubic-bezier(.22,.9,.3,1);will-change:transform;backface-visibility:hidden}
.env-letter .ld{font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.6}
.env-letter .lt{font-family:var(--l-head);color:var(--l-accent);font-size:22px;line-height:1.1;margin-top:4px}
.env.is-opening .env-letter{transform:translate3d(0,-85%,0) scale(1.02);transition:transform .65s .60s cubic-bezier(.22,.9,.3,1)}
.env-pocket{position:absolute;inset:0;z-index:3;border-radius:6px;clip-path:polygon(0 0,50% 52%,100% 0,100% 100%,0 100%);border:var(--env-border);box-shadow:var(--glow);transition:opacity .35s ease, transform .35s ease}
.env-pocket::before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(to top right,transparent calc(50% - 1px),var(--env-line) 50%,transparent calc(50% + 1px)) left bottom/50% 100% no-repeat,linear-gradient(to top left,transparent calc(50% - 1px),var(--env-line) 50%,transparent calc(50% + 1px)) right bottom/50% 100% no-repeat;opacity:.22}
.env-pocket::after{content:"";position:absolute;inset:0;background:linear-gradient(165deg,rgba(255,255,255,.18),transparent 45%,rgba(0,0,0,.12))}
.env-flap{position:absolute;left:0;right:0;top:0;height:56%;z-index:5;transform-origin:top center;transform-style:preserve-3d;transition:transform .50s .10s cubic-bezier(.3,.7,.25,1),z-index 0s .35s}
.env-flap-face{position:absolute;inset:0;clip-path:polygon(0 0,100% 0,50% 100%);border-radius:6px 6px 0 0;filter:brightness(1.07)}
.env-flap-face::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.2),rgba(0,0,0,.15))}
.env.is-opening .env-flap{transform:perspective(1200px) rotateX(180deg);z-index:1}
.env-seal{position:absolute;left:50%;bottom:-20px;width:44px;height:44px;margin-left:-22px;border-radius:50%;background:var(--seal-bg);display:grid;place-items:center;font-size:20px;color:#fff;
 box-shadow:0 0 0 3px var(--seal-ring) inset,0 3px 8px rgba(0,0,0,.45),var(--glow);transition:opacity .25s;backface-visibility:hidden}
.mt-parchment .env-seal{border-radius:46% 54% 50% 50%/52% 48% 52% 48%}
.env.is-opening .env-seal{opacity:0}
.env-stamp{position:absolute;right:12px;top:10px;z-index:4;width:40px;height:48px;display:grid;place-items:center;font-size:20px;transform:rotate(4deg);
 background:var(--l-bg);color:var(--l-accent);outline:2px dashed var(--env-line);outline-offset:-4px;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.env-mark{position:absolute;right:42px;top:20px;z-index:4;width:58px;height:58px;border-radius:50%;border:2px solid var(--env-ink);opacity:.22;box-shadow:0 0 0 6px transparent,0 0 0 8px currentColor;color:var(--env-ink)}
.mt-spring .env-mark,.mt-love .env-mark,.env-mark.mt-spring,.env-mark.mt-love{border-radius:46% 54% 50% 50%;transform:rotate(12deg)}
.mt-winter .env-mark,.env-mark.mt-winter{border-style:dotted;transform:rotate(45deg) scale(.82)}
.mt-summer .env-mark,.env-mark.mt-summer{border-radius:50% 12% 50% 12%;transform:rotate(-25deg)}
.mt-autumn .env-mark,.env-mark.mt-autumn{border-radius:50% 8% 50% 8%;transform:rotate(28deg)}
.mt-purple .env-mark,.env-mark.mt-purple{border-radius:14px;transform:rotate(45deg) scale(.75)}
.mt-cyber .env-mark,.env-mark.mt-cyber{border-radius:4px;transform:rotate(45deg) scale(.78);box-shadow:0 0 0 5px transparent,0 0 14px currentColor}
.env-addr{position:absolute;left:12%;right:12%;bottom:16%;z-index:4;font-family:var(--l-head);color:var(--env-ink);font-size:16px;line-height:1.25;max-width:76%;word-break:break-word;opacity:.88}
.mt-parchment .env-pocket{box-shadow:inset 0 0 22px rgba(120,80,30,.35),inset 0 0 3px rgba(90,60,20,.5)}.mt-parchment .env-back{border-radius:4px 7px 5px 8px}

.mail-letter{background-color:var(--l-bg);background-image:var(--l-tex);background-size:var(--l-tex-size,auto);color:var(--l-ink);font-family:var(--l-font);border:var(--l-border);box-shadow:0 30px 60px -20px rgba(0,0,0,.55)}
.preview-paper{background-color:var(--l-bg);background-image:var(--l-tex);background-size:var(--l-tex-size,auto);color:var(--l-ink)}
.mail-letter.reader-letter{background:transparent;border-color:transparent;box-shadow:none}
.reader-letter{height:min(94vh,960px);min-height:0}
.reader-letter .m-body{overflow-wrap:anywhere;word-break:break-word}
.reader-letter .reader-page .m-head{font-size:1.5rem;line-height:1.15}
.reader-letter .reader-page .m-body{font-size:1rem;line-height:1.55}
.reader-page{position:relative;width:min(78vw,1040px);max-height:min(68vh,680px);min-height:0;margin:auto;overflow:visible;perspective:1800px;transform-style:preserve-3d}
.reader-page-stack{position:relative;z-index:5;height:100%;min-height:0;transform-style:preserve-3d;pointer-events:none;--sheet-eject-duration:680ms;--sheet-return-duration:820ms}
.reader-page-sheet{position:absolute;inset:0;z-index:2;height:100%;min-height:0;overflow:hidden;padding:1.25rem;border:var(--l-border);border-radius:3px;outline:1px solid color-mix(in oklab,var(--l-accent) 28%,var(--l-bg));outline-offset:-8px;background:var(--l-bg);background-image:repeating-linear-gradient(0deg,color-mix(in oklab,var(--l-accent) 3%,transparent) 0 1px,transparent 1px 5px),var(--l-tex);background-size:auto,var(--l-tex-size,auto);box-shadow:inset 0 0 22px color-mix(in oklab,var(--l-accent) 10%,transparent),0 8px 16px rgba(0,0,0,.2);transform-style:preserve-3d;backface-visibility:hidden;pointer-events:none}
.reader-page-sheet .page-audio-pin,.reader-page-sheet .page-pin,.reader-page-sheet .page-env-pin,.reader-page-sheet .child-env-sheet-pin{pointer-events:auto}
.sheet-depth-1{box-shadow:0 8px 16px rgba(0,0,0,.2),4px 4px 0 -1px var(--l-bg),5px 5px 0 -1px rgba(0,0,0,.18)}
.sheet-depth-2{box-shadow:0 8px 16px rgba(0,0,0,.2),4px 4px 0 -1px var(--l-bg),5px 5px 0 -1px rgba(0,0,0,.18),8px 8px 0 -2px var(--l-bg),9px 9px 0 -2px rgba(0,0,0,.15)}
.sheet-depth-3{box-shadow:0 8px 16px rgba(0,0,0,.2),4px 4px 0 -1px var(--l-bg),5px 5px 0 -1px rgba(0,0,0,.18),8px 8px 0 -2px var(--l-bg),9px 9px 0 -2px rgba(0,0,0,.15),12px 12px 0 -3px var(--l-bg),13px 13px 0 -3px rgba(0,0,0,.12)}
.reader-page-under{z-index:1;transform:translateY(5px) translateX(5px) rotate(.6deg);opacity:.2}
.sheet-eject-pending{z-index:3;transform-origin:50% 0%;will-change:transform,opacity}
.sheet-eject-next{z-index:3;transform-origin:50% 0%;animation:sheet-eject-next var(--sheet-eject-duration) cubic-bezier(.4,0,.8,.35) both;will-change:transform,opacity}
.sheet-eject-prev{z-index:3;transform-origin:50% 0%;animation:sheet-eject-next var(--sheet-return-duration) cubic-bezier(.4,0,.8,.35) reverse both;will-change:transform,opacity}
@keyframes sheet-eject-next{0%{transform:translateY(0) rotate(0) rotateX(0);opacity:1}35%{transform:translateY(-5%) translateX(1%) rotate(1deg) rotateX(-12deg) translateZ(50px);opacity:1}100%{transform:translateY(-48%) translateX(16%) rotate(5deg) rotateX(-62deg) translateZ(100px);opacity:0}}
.reader-page-nav{position:absolute;top:0;bottom:0;width:26%;z-index:4;opacity:0;cursor:pointer}
.reader-page-nav.left{left:0}.reader-page-nav.right{right:0}
.reader-page-nav:focus-visible{opacity:.08;outline:2px solid currentColor;outline-offset:-3px}
.reader-page .m-body{overflow-wrap:anywhere;word-break:break-word;max-height:100%;overflow:hidden}
.page-pin{position:absolute;right:1.25rem;bottom:1.25rem;z-index:5;transform:rotate(4deg);box-shadow:0 5px 12px rgba(0,0,0,.28)}
.page-pin:hover{transform:rotate(0) scale(1.06)}
.page-audio-pin{position:absolute;left:1.25rem;bottom:1.25rem;z-index:5;max-width:58%;transform:rotate(-2deg);box-shadow:0 5px 12px rgba(0,0,0,.18)}
.page-audio-pin audio{display:block;max-width:100%}
.audio-box{padding:.45rem;border:1px solid color-mix(in oklab,currentColor 20%,transparent);border-radius:6px;background:color-mix(in oklab,var(--l-bg) 75%,transparent);backdrop-filter:blur(4px);font-size:10px;max-width:260px}
.audio-box audio{display:block;height:32px;width:220px;max-width:100%}
.media-emblem{border:1px solid color-mix(in oklab,var(--l-accent) 48%,transparent);background:color-mix(in oklab,var(--l-bg) 82%,var(--l-accent) 18%);box-shadow:inset 0 0 0 2px color-mix(in oklab,var(--l-accent) 12%,transparent),0 3px 8px rgba(0,0,0,.16)}
.media-emblem-audio,.media-emblem-photo,.media-emblem-child{color:var(--l-accent)}
.media-emblem-photo svg,.media-emblem-child svg{filter:drop-shadow(0 1px 1px color-mix(in oklab,var(--l-accent) 35%,transparent))}
.mail-letter .m-head{font-family:var(--l-head);color:var(--l-accent)}
.mail-letter .m-div::before{content:"";display:block;text-align:center;color:var(--l-accent);letter-spacing:.4em;opacity:0}
.mt-neon .mail-letter .m-head,.mt-neon.mail-letter .m-head{text-shadow:0 0 10px rgba(56,189,248,.6)}
.mt-velvet .mail-letter .m-head,.mt-velvet.mail-letter .m-head{text-shadow:0 0 14px rgba(165,180,252,.5)}
.m-badge{background:color-mix(in oklab,var(--l-accent) 18%,transparent);color:var(--l-accent);border:1px solid color-mix(in oklab,var(--l-accent) 40%,transparent)}
.glass{background:rgba(255,255,255,.14);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.25);color:#fff}
@keyframes photo-pull{from{transform:translateY(70%) rotate(-8deg) scale(.6);opacity:0}to{transform:translateY(0) rotate(var(--r,0deg)) scale(1);opacity:1}}
.photo-pull{animation:photo-pull .55s cubic-bezier(.22,1,.36,1) both}
.photo-card{background:#fff;padding:4px 4px 12px;box-shadow:0 4px 10px rgba(0,0,0,.3)}
@keyframes letter-in{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
.letter-in{animation:letter-in 1s cubic-bezier(.22,1,.36,1) both}
${STRICT_THEMES_CSS}

/* Child / Nested Envelopes Tray & Cards */
.child-env-tray{display:flex;flex-wrap:wrap;gap:14px;align-items:center;padding:8px 0}
.child-env-card{position:relative;width:min(210px,100%);aspect-ratio:3/2;border-radius:6px;cursor:pointer;perspective:800px;transition:transform .25s ease,box-shadow .25s ease;box-shadow:0 4px 12px rgba(0,0,0,.22);user-select:none;flex-shrink:0}
.child-env-card:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 8px 20px rgba(0,0,0,.3)}
.child-env-inner{position:absolute;inset:0;border-radius:6px;overflow:hidden;background-color:var(--env-bg);background-image:var(--env-tex)}
.child-env-flap{position:absolute;left:0;right:0;top:0;height:55%;clip-path:polygon(0 0,100% 0,50% 100%);background-color:var(--env-bg);background-image:var(--env-tex);filter:brightness(1.08);border-radius:6px 6px 0 0}
.child-env-flap::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.22),rgba(0,0,0,.15))}
.child-env-pocket{position:absolute;inset:0;z-index:2;clip-path:polygon(0 0,50% 52%,100% 0,100% 100%,0 100%);background-color:var(--env-bg);background-image:var(--env-tex);border-radius:6px;box-shadow:inset 0 0 16px rgba(0,0,0,.18)}
.child-env-pocket::before{content:"";position:absolute;inset:0;background:linear-gradient(to top right,transparent calc(50% - 1px),var(--env-line,rgba(255,255,255,.2)) 50%,transparent calc(50% + 1px)) left bottom/50% 100% no-repeat,linear-gradient(to top left,transparent calc(50% - 1px),var(--env-line,rgba(255,255,255,.2)) 50%,transparent calc(50% + 1px)) right bottom/50% 100% no-repeat;opacity:.25}
.child-env-seal{position:absolute;left:50%;bottom:-11px;width:26px;height:26px;margin-left:-13px;border-radius:50%;background:var(--seal-bg);color:#fff;display:grid;place-items:center;font-size:12px;box-shadow:0 0 0 2px var(--seal-ring) inset,0 2px 5px rgba(0,0,0,.4);z-index:4}
.child-env-title{position:absolute;left:8px;right:8px;bottom:7px;z-index:3;font-family:var(--l-head);font-size:12px;line-height:1.2;color:var(--env-ink);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.9}
.child-env-stamp{position:absolute;right:8px;top:5px;z-index:3;font-size:13px;opacity:.85}
.child-lock-badge{position:absolute;top:5px;left:7px;z-index:5;background:rgba(0,0,0,.68);color:#fbbf24;font-size:10px;padding:2px 6px;border-radius:999px;display:flex;align-items:center;gap:3px;backdrop-filter:blur(4px);box-shadow:0 1px 3px rgba(0,0,0,.4)}
@keyframes lock-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
.animate-shake{animation:lock-shake .4s ease}
@keyframes child-env-pop-in{0%{transform:scale(0.08) translateY(28px);opacity:0;filter:brightness(2.4)}55%{transform:scale(1.07) translateY(-3px);opacity:1;filter:brightness(1.15)}100%{transform:scale(1) translateY(0);opacity:1;filter:brightness(1)}}
.child-env-popping{animation:child-env-pop-in .48s cubic-bezier(.22,.9,.3,1) both;transform-origin:center bottom}
.child-env-sheet-pin{position:absolute;bottom:36px;left:10px;z-index:10;pointer-events:auto}
.child-env-inline{width:min(118px,30vw)}
.page-env-pin{position:absolute;left:1.25rem;bottom:1.25rem;z-index:10;display:flex;gap:.5rem;align-items:center;pointer-events:auto;transform:rotate(-3deg);box-shadow:0 5px 12px rgba(0,0,0,.22);transition:transform .3s}
.page-env-pin:hover{transform:rotate(0) scale(1.06)}
.page-env-pin.has-audio{bottom:4.75rem}
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
  title: string; body: string; author?: string | undefined; recipient?: string | undefined; createdAt: number; images: string[];
  pages?: string[]; imagePages?: number[];
  pageAudios?: { name: string; src: string }[]; audioPages?: number[];
  audio?: { name: string; src: string } | undefined; autoplay?: boolean | undefined; mail: MailKey;
  components?: { canvas?: MailKey; paper?: MailKey; emblem?: MailKey; titleFont?: MailKey };
  bodyStyle?: { color?: string; font?: string };
  childEnvelopes?: {
    id: string; title: string; body: string; author?: string; recipient?: string;
    theme?: { canvas?: string; paper?: string; emblem?: string; titleFont?: string };
    locked?: boolean; clue?: string; passphrase?: string;
    pages?: string[]; images?: string[]; imagePages?: number[];
    pageAudios?: { name: string; src: string }[]; audioPages?: number[];
    pinnedToSheet?: number;
  }[];
};

/** Build a single self-contained, offline HTML file with the same envelope animation. */
export function buildMailHtml(c: ExportInput): string {
  const components = {
    canvas: c.components?.canvas ?? c.mail,
    paper: c.components?.paper ?? c.mail,
    emblem: c.components?.emblem ?? c.mail,
    titleFont: c.components?.titleFont ?? c.mail,
  };
  const m = mailTheme(components.emblem);
  const titleFont = MAIL_TITLE_FONTS[components.titleFont].family;
  const sakuraBranch = components.canvas === "sakura-sumi" ? `<img class="sakura-branch" src="${SAKURA_BRANCH_ASSET}" alt="">` : "";
  const sakuraWaxSeal = components.emblem === "sakura-sumi" ? `<img class="sakura-wax-seal" src="${SAKURA_WAX_SEAL_ASSET}" alt="">` : m.seal;
  const sakuraHanko = components.paper === "sakura-sumi" ? `<img class="sakura-hanko" src="${SAKURA_HANKO_ASSET}" alt="旅人">` : "";
  const date = new Date(c.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const pages = c.pages?.length ? c.pages : [c.body];
  const childEnvs = (c.childEnvelopes ?? []).map((ch) => ({
    id: ch.id, title: ch.title, body: ch.body, author: ch.author, recipient: ch.recipient,
    theme: ch.theme, locked: ch.locked, clue: ch.clue, passphrase: ch.passphrase,
    pages: ch.pages?.length ? ch.pages : [ch.body || ""],
    images: ch.images ?? [], imagePages: ch.imagePages ?? [],
    pageAudios: ch.pageAudios ?? [], audioPages: ch.audioPages ?? [],
    pinnedToSheet: ch.pinnedToSheet,
    swatch: mailTheme((ch.theme?.canvas ?? ch.theme?.emblem ?? "parchment") as MailKey).swatch,
    emoji: mailTheme((ch.theme?.emblem ?? "parchment") as MailKey).emoji,
    seal: mailTheme((ch.theme?.emblem ?? "parchment") as MailKey).seal,
  }));
  const data = JSON.stringify({ title: c.title, recipient: c.recipient, author: c.author, pages, images: c.images, imagePages: c.imagePages ?? [], pageAudios: c.pageAudios ?? [], audioPages: c.audioPages ?? [], autoplay: c.autoplay !== false, titleFont, bodyStyle: c.bodyStyle ?? {}, childEnvelopes: childEnvs }).replace(/</g, "\\u003c");
  const bodyVars = `${c.bodyStyle?.color ? `--l-ink:${esc(c.bodyStyle.color)};` : ""}${c.bodyStyle?.font ? `--l-font:${esc(c.bodyStyle.font)};` : ""}`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(c.title || "A letter for you")}</title>
<link rel="stylesheet" href="${POSTCARD_FONT_STYLESHEET}">
<style>*{box-sizing:border-box}html,body{margin:0;min-height:100%}body{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;font-family:Georgia,serif;
background:radial-gradient(ellipse at top,#3b3430,#171412 70%);color:#fff;overflow-x:hidden}
button{font:inherit;cursor:pointer}
${MAIL_CSS}
.hint{margin-top:34px;font-size:14px;opacity:.75;letter-spacing:.05em;animation:pulse 2s infinite}@keyframes pulse{50%{opacity:.35}}
#audioBadge{position:fixed;top:16px;right:16px;border-radius:999px;padding:8px 14px;font-size:13px;display:none;align-items:center;gap:8px;z-index:20}
#letter{display:none;width:min(1200px,96vw);height:min(94vh,960px);min-height:0;overflow:visible;border-radius:10px;padding:20px;position:relative;flex-direction:column}
#letter h1{font-size:40px;line-height:1.1;margin:6px 0 14px;font-weight:400}#letter .d{font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.6}
#letter p.b{white-space:pre-wrap;font-size:18px;line-height:1.7}
#letter .reader-page{flex:1;padding:0;min-height:0}.reader-page .m-body{max-height:100%;overflow:hidden}
.foot{display:flex;align-items:flex-end;gap:12px;margin-top:28px;min-height:60px}
.pocket{width:48px;height:48px;border-radius:50%;font-size:22px;flex-shrink:0;transition:transform .3s}.pocket:hover{transform:scale(1.1)}
.photos{display:flex;gap:10px;overflow-x:auto;padding:6px 4px}.photos img{width:76px;height:92px;object-fit:cover;display:block}
#lb{position:fixed;inset:0;display:none;place-items:center;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:30;padding:20px}
#lb img{max-width:100%;max-height:100%;border-radius:6px;box-shadow:0 20px 50px rgba(0,0,0,.6)}</style></head>
<body class="mt-${components.canvas}">
${c.audio?.src ? `<audio id="bg" loop src="${c.audio.src}"></audio><button id="audioBadge" class="glass" aria-label="Toggle music"><span id="aIcon">❚❚</span><span>${esc(c.audio.name)}</span></button>` : ""}
<div id="stage" style="display:flex;flex-direction:column;align-items:center">
 <div class="env-scene"><div class="env" id="env" role="button" aria-label="Open the letter" tabindex="0">
  <div class="env-back"></div>
  <div class="env-letter mt-${components.paper}" style="--l-head:${esc(titleFont)}"><div class="ld">${esc(date)}</div><div class="lt">${esc(c.title || "Untitled")}</div></div>
  <div class="env-pocket"></div>
  <div class="env-stamp mt-${components.emblem}">${m.emoji}</div>
  <div class="env-addr">To ${esc(c.recipient?.trim() || "you")}, From ${esc(c.author?.trim() || "Traveler")}</div>
  <div class="env-flap"><div class="env-flap-face">${sakuraBranch}</div><div class="env-seal mt-${components.emblem}">${sakuraWaxSeal}</div></div>
 </div></div>
 <div class="hint" id="hint">Tap the envelope to break the seal</div>
</div>
<article id="letter" class="mt-${components.paper} mail-letter reader-letter" style="--l-head:${esc(titleFont)};${bodyVars}">
 <div class="d">${esc(date)} · To ${esc(c.recipient?.trim() || "you")} · From ${esc(c.author?.trim() || "Traveler")}</div>
 <div class="m-div"></div>
 ${sakuraHanko}
 <div class="reader-page" id="readerPage">
  <button aria-label="Previous letter sheet" id="prev" class="reader-page-nav left"></button><button aria-label="Next letter sheet" id="next" class="reader-page-nav right"></button>
  <div class="reader-page-stack" id="sheetStack"></div>
 </div>
</article>
<div id="childEnvSection" style="width:min(1200px,96vw);margin:0 auto;padding:0 20px 20px"></div>
<div id="lb"><img alt=""></div>
<div id="childModal" style="display:none;position:fixed;inset:0;z-index:65;background:rgba(0,0,0,.82);backdrop-filter:blur(10px);align-items:center;justify-content:center;padding:16px"></div>
<div id="childLockModal" style="display:none;position:fixed;inset:0;z-index:75;background:rgba(0,0,0,.85);backdrop-filter:blur(12px);align-items:center;justify-content:center;padding:16px"></div>
<script>(function(){
var D=${data};
var env=document.getElementById('env'),a=document.getElementById('bg'),badge=document.getElementById('audioBadge'),icon=document.getElementById('aIcon'),opened=false;
var stack=document.getElementById('sheetStack'),prev=document.getElementById('prev'),next=document.getElementById('next'),lb=document.getElementById('lb'),page=0,busy=false;
var childModal=document.getElementById('childModal');
var childLockModal=document.getElementById('childLockModal');
var childEnvSection=document.getElementById('childEnvSection');
var unlocked={};

function sync(){if(icon&&a)icon.textContent=a.paused?'▶':'❚❚'}
if(a){a.addEventListener('play',sync);a.addEventListener('pause',sync);badge.onclick=function(){a.paused?a.play():a.pause()}}

function open(){
  if(opened)return;
  opened=true;
  if(a&&D.autoplay){a.play().catch(function(){});}
  if(badge)badge.style.display='flex';
  sync();
  document.getElementById('hint').style.display='none';
  env.classList.add('is-opening');
  setTimeout(function(){
    document.getElementById('stage').style.display='none';
    var l=document.getElementById('letter');
    l.style.display='flex';
    requestAnimationFrame(function(){l.classList.add('letter-in')});
    render(0);
    buildChildSection();
  },1350);
}
env.addEventListener('click',open);
env.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')open()});

function openLockModal(ch,idx,triggerEl){
  childLockModal.innerHTML='';
  childLockModal.style.display='flex';
  var box=document.createElement('div');
  box.style.cssText='background:#1c1a18;border:1px solid #3a3530;border-radius:16px;padding:28px 24px;width:min(360px,90vw);color:#e8e0d4;text-align:center';
  box.innerHTML='<div style="font-size:36px;margin-bottom:12px">🔒</div>'
    +'<h3 style="font-size:18px;margin:0 0 6px">'+(ch.title?'"'+ch.title+'"':'Secret Envelope')+'</h3>'
    +'<p style="font-size:12px;opacity:.6;margin:0 0 16px">This envelope is password-protected.</p>'
    +'<div style="border:1px solid rgba(245,165,36,.3);background:rgba(245,165,36,.08);border-radius:8px;padding:12px;margin-bottom:16px">'
    +'<p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#fbbf24;margin:0 0 6px">Clue from sender</p>'
    +'<p style="font-style:italic;margin:0;font-size:14px">'+(ch.clue||'Do you know who sent this?')+'</p></div>'
    +'<input id="childPw" type="text" placeholder="Your answer…" style="width:100%;border:1px solid #4a4540;border-radius:8px;background:#111;color:#e8e0d4;padding:10px 14px;font-size:14px;text-align:center;box-sizing:border-box;margin-bottom:8px">'
    +'<p id="childPwErr" style="color:#f87171;font-size:12px;min-height:18px;margin:0 0 12px"></p>'
    +'<div style="display:flex;gap:8px"><button id="childPwCancel" style="flex:1;border:1px solid #4a4540;background:transparent;color:#e8e0d4;border-radius:8px;padding:10px;font-size:14px;cursor:pointer">Cancel</button>'
    +'<button id="childPwSubmit" style="flex:1;background:#a07c50;border:none;color:#fff;border-radius:8px;padding:10px;font-size:14px;cursor:pointer">Unlock &amp; Open</button></div>';
  childLockModal.appendChild(box);
  var pw=box.querySelector('#childPw');var err=box.querySelector('#childPwErr');
  box.querySelector('#childPwCancel').onclick=function(){childLockModal.style.display='none'};
  childLockModal.onclick=function(e){if(e.target===childLockModal)childLockModal.style.display='none'};
  function tryUnlock(){
    var exp=(ch.passphrase||'').trim().toLowerCase();
    var got=pw.value.trim().toLowerCase();
    if(got===exp){
      unlocked[ch.id]=true;
      childLockModal.style.display='none';
      popAndOpen(ch,idx,triggerEl);
    } else {
      err.textContent='Incorrect — try again.';
      pw.style.borderColor='#f87171';
      setTimeout(function(){pw.style.borderColor='#4a4540';err.textContent=''},1600);
    }
  }
  box.querySelector('#childPwSubmit').onclick=tryUnlock;
  pw.addEventListener('keydown',function(e){if(e.key==='Enter')tryUnlock()});
  pw.focus();
}

function popAndOpen(ch,idx,triggerEl){
  if(triggerEl){
    triggerEl.style.animation='child-env-pop-in .48s cubic-bezier(.22,.9,.3,1) both';
    triggerEl.style.transformOrigin='center bottom';
  }
  setTimeout(function(){
    if(triggerEl)triggerEl.style.animation='';
    openChildLetter(ch,idx);
  },480);
}

function openChildLetter(ch,idx){
  childModal.innerHTML='';
  childModal.style.display='flex';
  var wrap=document.createElement('div');
  wrap.style.cssText='background:#f7f4ee;border-radius:12px;width:min(88vw,920px);max-height:min(86vh,820px);overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.5)';
  var cPage=0;
  var pages=ch.pages&&ch.pages.length?ch.pages:[ch.body||''];
  var lastP=pages.length-1;

  function renderCPage(){
    wrap.innerHTML='';
    var hdr=document.createElement('div');
    hdr.style.cssText='padding:16px 20px 10px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px';
    hdr.innerHTML='<div><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;opacity:.55">Secret Letter · Sheet '+(cPage+1)+'/'+pages.length+'</div>'
      +'<p style="margin:4px 0 0;font-size:11px;text-transform:uppercase;letter-spacing:.08em;opacity:.7">To '+(ch.recipient||'you')+' · From '+(ch.author||'Traveler')+'</p></div>'
      +'<button id="closeCM" style="border:none;background:transparent;cursor:pointer;font-size:20px;line-height:1;opacity:.6;padding:4px">✕</button>';
    wrap.appendChild(hdr);
    var div2=document.createElement('div');
    div2.style.cssText='height:1px;background:rgba(0,0,0,.12);margin:0 20px';
    wrap.appendChild(div2);
    var body=document.createElement('div');
    body.style.cssText='flex:1;padding:16px 20px;overflow-y:auto;position:relative';
    if(cPage===0){
      var t=document.createElement('h3');
      t.style.cssText='font-size:20px;line-height:1.2;margin:0 0 14px;font-weight:400';
      t.textContent=ch.title||'Secret Note';
      body.appendChild(t);
    }
    var txt=document.createElement('p');
    txt.style.cssText='white-space:pre-wrap;font-size:16px;line-height:1.75;margin:0;color:#2a2016';
    txt.textContent=pages[cPage]||'';
    body.appendChild(txt);

    var pAud=(ch.pageAudios||[]).filter(function(_,i){return(ch.audioPages&&ch.audioPages[i]||0)===cPage});
    pAud.forEach(function(item){
      var abox=document.createElement('div');
      abox.style.cssText='margin-top:12px;background:rgba(0,0,0,.07);border-radius:8px;padding:8px 10px';
      var lbl=document.createElement('div');
      lbl.style.cssText='font-size:10px;opacity:.65;margin-bottom:4px;color:#2a2016';
      lbl.textContent='♪ '+item.name;
      var au=document.createElement('audio');
      au.controls=true;
      au.preload='metadata';
      au.src=item.src;
      au.style.cssText='width:100%;height:28px';
      abox.append(lbl,au);
      body.appendChild(abox);
    });

    var pImgs=(ch.images||[]).filter(function(_,i){return(ch.imagePages&&ch.imagePages[i]||0)===cPage});
    if(pImgs.length){
      var photoBtn=document.createElement('button');
      photoBtn.style.cssText='position:absolute;bottom:14px;right:14px;width:40px;height:40px;border-radius:50%;border:none;cursor:pointer;font-size:18px;background:rgba(0,0,0,.12);backdrop-filter:blur(4px)';
      photoBtn.textContent='▧';
      var photoRow=document.createElement('div');
      photoRow.style.cssText='display:none;position:absolute;bottom:60px;right:14px;gap:8px;background:rgba(0,0,0,.12);padding:8px;border-radius:8px;backdrop-filter:blur(4px)';
      photoBtn.onclick=function(){photoRow.style.display=photoRow.style.display==='none'?'flex':'none'};
      pImgs.forEach(function(src){
        var b=document.createElement('button');
        b.style.cssText='border:none;padding:0;cursor:pointer;border-radius:4px;overflow:hidden';
        var im=document.createElement('img');
        im.src=src;
        im.style.cssText='width:60px;height:72px;object-fit:cover;display:block';
        b.appendChild(im);
        b.onclick=function(){
          var lbImg=lb.querySelector('img');
          if(lbImg){lbImg.src=src;lb.style.display='grid';}
        };
        photoRow.appendChild(b);
      });
      body.append(photoBtn,photoRow);
    }
    wrap.appendChild(body);

    var foot=document.createElement('div');
    foot.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 16px;border-top:1px solid rgba(0,0,0,.12)';
    var prev2=document.createElement('button');
    prev2.style.cssText='border:1px solid rgba(0,0,0,.2);background:transparent;border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer'+(cPage===0?';opacity:.4;pointer-events:none':'');
    prev2.disabled=cPage===0;
    prev2.textContent='← Prev';
    prev2.onclick=function(){if(cPage>0){cPage--;renderCPage();}};

    var back=document.createElement('button');
    back.style.cssText='border:1px solid rgba(0,0,0,.2);background:transparent;border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer';
    back.textContent='← Back';
    back.onclick=function(){childModal.style.display='none';};

    var next2=document.createElement('button');
    next2.style.cssText='border:1px solid rgba(0,0,0,.2);background:transparent;border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer'+(cPage===lastP?';opacity:.4;pointer-events:none':'');
    next2.disabled=cPage===lastP;
    next2.textContent='Next →';
    next2.onclick=function(){if(cPage<lastP){cPage++;renderCPage();}};

    foot.append(prev2,back,next2);
    wrap.appendChild(foot);
    wrap.querySelector('#closeCM').onclick=function(){childModal.style.display='none';};
  }
  renderCPage();
  childModal.appendChild(wrap);
  childModal.onclick=function(e){if(e.target===childModal)childModal.style.display='none';};
}

function sheet(n,cls){
  var el=document.createElement('div');
  var depth=cls.indexOf('sheet-eject')>=0?0:Math.min(3,Math.max(0,D.pages.length-n-1));
  el.className='reader-page-sheet '+cls+(depth?' sheet-depth-'+depth:'');
  if(n===0){
    var h=document.createElement('h2');
    h.className='m-head';
    h.style.fontFamily=D.titleFont;
    h.textContent=D.title||'Untitled';
    el.appendChild(h);
  }
  var p=document.createElement('p');
  p.className='m-body';
  p.style.color=D.bodyStyle.color||'';
  p.style.fontFamily=D.bodyStyle.font||'';
  p.textContent=D.pages[n]||'';
  el.appendChild(p);
  var line=document.createElement('div');
  line.className='m-div';
  el.appendChild(line);

  var audios=(D.pageAudios||[]).map(function(x,i){return{x:x,p:D.audioPages[i]||0}}).filter(function(x){return x.p===n});
  if(audios.length){
    var ap=document.createElement('div');
    ap.className='page-audio-pin';
    audios.forEach(function(item){
      var box=document.createElement('div');
      box.className='audio-box media-emblem media-emblem-audio';
      var label=document.createElement('div');
      label.textContent=item.x.name;
      var au=document.createElement('audio');
      au.controls=true;
      au.preload='metadata';
      au.src=item.x.src;
      box.append(label,au);
      ap.appendChild(box);
    });
    el.appendChild(ap);
  }

  var imgs=(D.images||[]).map(function(x,i){return{x:x,p:D.imagePages[i]||0}}).filter(function(x){return x.p===n});
  if(imgs.length){
    var pin=document.createElement('div');
    pin.className='page-pin';
    var pb=document.createElement('button');
    pb.className='m-badge pocket media-emblem media-emblem-photo';
    pb.setAttribute('aria-label','Open photos');
    pb.textContent='▧';
    pin.appendChild(pb);
    var photos=document.createElement('div');
    photos.className='photos';
    photos.hidden=true;
    pb.onclick=function(){
      photos.hidden=!photos.hidden;
      if(!photos.hidden){
        photos.replaceChildren();
        imgs.forEach(function(item,i){
          var b=document.createElement('button');
          b.className='photo-card photo-pull';
          b.style.setProperty('--r',((i%3)-1)*4+'deg');
          var im=document.createElement('img');
          im.src=item.x;
          b.appendChild(im);
          b.onclick=function(){
            lb.querySelector('img').src=item.x;
            lb.style.display='grid';
          };
          photos.appendChild(b);
        });
      }
    };
    pin.appendChild(photos);
    el.appendChild(pin);
  }

  /* Pinned child envelopes on this sheet — circular media-emblem carrier */
  var cenvs=(D.childEnvelopes||[]).filter(function(ch){return ch.pinnedToSheet===n});
  if(cenvs.length){
    var envPin=document.createElement('div');
    envPin.className='page-env-pin'+(audios.length?' has-audio':'');
    cenvs.forEach(function(ch,ci){
      var b=document.createElement('button');
      b.type='button';
      b.className='media-emblem media-emblem-child';
      b.setAttribute('aria-label','Open child envelope: '+(ch.title||'Secret Note'));
      b.style.cssText='width:48px;height:48px;border-radius:50%;display:grid;place-items:center;position:relative;cursor:pointer;font-size:20px;box-shadow:0 3px 8px rgba(0,0,0,.2);transition:transform .2s;flex-shrink:0';
      b.innerHTML='<span style="font-size:18px">✉</span><span style="position:absolute;bottom:-2px;right:-2px;font-size:11px">'+(ch.emoji||'✒')+'</span>'
        +(ch.locked&&!unlocked[ch.id]?'<span style="position:absolute;top:-2px;right:-2px;background:#f59e0b;color:#000;font-size:10px;width:14px;height:14px;border-radius:50%;display:grid;place-items:center;font-weight:bold">🔒</span>':'');
      b.onmouseenter=function(){b.style.transform='scale(1.1)'};
      b.onmouseleave=function(){b.style.transform='scale(1)'};
      b.onclick=function(e){
        e.stopPropagation();
        if(ch.locked&&!unlocked[ch.id])openLockModal(ch,ci,b);
        else popAndOpen(ch,ci,b);
      };
      envPin.appendChild(b);
    });
    el.appendChild(envPin);
  }

  return el;
}

function render(n){
  stack.innerHTML='';
  stack.appendChild(sheet(n,''));
  prev.disabled=n===0;
  next.disabled=n===D.pages.length-1;
}

function go(dir){
  if(busy)return;
  var to=dir==='next'?Math.min(D.pages.length-1,page+1):Math.max(0,page-1);
  if(to===page)return;
  busy=true;
  stack.innerHTML='';
  if(dir==='prev'){
    stack.appendChild(sheet(page,'reader-page-under'));
    var returning=sheet(to,'sheet-eject-pending');
    stack.appendChild(returning);
    requestAnimationFrame(function(){
      returning.classList.remove('sheet-eject-pending');
      returning.classList.add('sheet-eject-prev');
    });
  }else{
    stack.appendChild(sheet(to,'reader-page-under'));
    var leaving=sheet(page,'sheet-eject-pending');
    stack.appendChild(leaving);
    requestAnimationFrame(function(){
      leaving.classList.remove('sheet-eject-pending');
      leaving.classList.add('sheet-eject-next');
    });
  }
  setTimeout(function(){
    page=to;
    busy=false;
    render(page);
  },dir==='prev'?850:700);
}

prev.onclick=function(){go('prev')};
next.onclick=function(){go('next')};
lb.querySelector('img').onclick=function(e){e.stopPropagation()};
lb.onclick=function(e){if(e.target===lb)lb.style.display='none'};

function buildChildSection(){
  var D2=D&&D.childEnvelopes||[];
  var trayChildren=D2.filter(function(ch){return ch.pinnedToSheet===undefined||ch.pinnedToSheet===null});
  if(!trayChildren.length)return;
  var sec=childEnvSection;
  if(!sec)return;
  sec.innerHTML='';
  var hdr=document.createElement('div');
  hdr.style.cssText='display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-top:4px';
  hdr.innerHTML='<span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;opacity:.6">✉ Envelopes in Tray ('+trayChildren.length+')</span>';
  sec.appendChild(hdr);
  var tray=document.createElement('div');
  tray.style.cssText='display:flex;flex-wrap:wrap;gap:10px';
  trayChildren.forEach(function(ch,ci){
    var card=document.createElement('div');
    var tc={swatch:ch.swatch||['#f4ecd8','#8b2c1f'],emoji:ch.emoji||'✒'};
    card.style.cssText='display:inline-flex;flex-direction:column;width:min(140px,36vw);aspect-ratio:3/2;position:relative;border-radius:6px;cursor:pointer;margin:4px;vertical-align:top;background:'+tc.swatch[0]+';border:1px solid '+tc.swatch[1]+'30;box-shadow:0 2px 8px rgba(0,0,0,.18);overflow:hidden;transition:transform .2s;align-items:center;justify-content:center';
    card.innerHTML='<div style="position:absolute;top:4px;right:6px;font-size:14px;opacity:.8">'+tc.emoji+'</div>'
      +'<div style="position:absolute;bottom:6px;left:0;right:0;text-align:center;font-size:11px;font-weight:600;color:'+tc.swatch[1]+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 6px">'+(ch.title||'Envelope #'+(ci+1))+'</div>'
      +(ch.locked&&!unlocked[ch.id]?'<div style="position:absolute;top:5px;left:7px;background:rgba(0,0,0,.7);color:#fbbf24;font-size:10px;padding:2px 6px;border-radius:999px">🔒 Locked</div>':'')
      +(ch.locked&&unlocked[ch.id]?'<div style="position:absolute;top:5px;left:7px;background:rgba(0,30,0,.8);color:#6ee7b7;font-size:10px;padding:2px 6px;border-radius:999px">🔓 Open</div>':'');
    card.onmouseenter=function(){card.style.transform='scale(1.05)'};
    card.onmouseleave=function(){card.style.transform='scale(1)'};
    card.onclick=function(){
      if(ch.locked&&!unlocked[ch.id])openLockModal(ch,ci,card);
      else popAndOpen(ch,ci,card);
    };
    tray.appendChild(card);
  });
  sec.appendChild(tray);
}
})();</script>
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
