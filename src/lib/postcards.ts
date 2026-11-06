import type { MailKey } from "./mail-styles";

export type CardTheme = {
  mail?: MailKey; // legacy single-preset theme
  canvas?: MailKey;
  paper?: MailKey;
  emblem?: MailKey;
  titleFont?: MailKey;
};

export type FontKey = "serif" | "script" | "mono" | "sans";

export type ChildEnvelope = {
  id: string;
  title: string;
  body: string;
  author?: string;
  recipient?: string;
  theme?: CardTheme;
  locked?: boolean;
  clue?: string;
  passphrase?: string;
  /** Up to 3 manual sheets for the child letter. */
  pages?: string[];
  /** Attached photos (data URLs). */
  images?: string[];
  /** Zero-based sheet index for each image. */
  imagePages?: number[];
  /** Per-sheet audio clips (NOT theme background audio). */
  pageAudios?: { name: string; src: string }[];
  /** Zero-based sheet index for each audio clip. */
  audioPages?: number[];
  /** Which parent sheet this child envelope icon is pinned to (0-based, default 0 = tray). */
  pinnedToSheet?: number;
};

export type Postcard = {
  id: string;
  title: string;
  body: string;
  author?: string;
  recipient?: string;
  createdAt: number;
  images: string[];
  audio?: { name: string; src: string } | undefined;
  /** Audio clips pinned to individual letter sheets. */
  pageAudios?: { name: string; src: string }[];
  /** Zero-based sheet index for each audio clip in pageAudios. */
  audioPages?: number[];
  autoplay?: boolean;
  theme?: CardTheme;
  bodyStyle?: { color?: string; font?: FontKey };
  /** Manually authored sheets; each entry is one fixed letter page. */
  pages?: string[];
  /** Zero-based sheet index for each image in images. */
  imagePages?: number[];
  archived?: boolean;
  private?: boolean;
  childEnvelopes?: ChildEnvelope[];
};

export type Profile = { name: string; email: string; bio: string; defaultRecipient?: string };

/** Fixed-size letter pagination: one page is visible at a time, up to 19 pages. */
export const LETTER_PAGE_CHARACTERS = 420;
export const MAX_LETTER_PAGES = 19;
export const MAX_LETTER_CHARACTERS = LETTER_PAGE_CHARACTERS * MAX_LETTER_PAGES;
export const MAX_LETTER_TITLE_CHARACTERS = 90;

export const paginateLetter = (body: string) => {
  if (!body) return [""];
  const pages: string[] = [];
  let start = 0;
  while (start < body.length && pages.length < MAX_LETTER_PAGES) {
    const limit = Math.min(start + LETTER_PAGE_CHARACTERS, body.length);
    let end = limit;
    if (limit < body.length) {
      const breakAt = body.slice(start, limit).search(/\s(?=[^\s]*$)/);
      if (breakAt > LETTER_PAGE_CHARACTERS * 0.55) end = start + breakAt;
    }
    pages.push(body.slice(start, end).trim());
    start = end;
    while (/\s/.test(body[start] ?? "")) start += 1;
  }
  return pages.length ? pages : [""];
};

export type AppThemeKey = "paper" | "dark" | "cyber" | "matcha" | "pastel" | "lotus";

export const APP_THEMES: { key: AppThemeKey; label: string; swatch: string }[] = [
  { key: "paper", label: "Default Paper", swatch: "#faf7f2" },
  { key: "dark", label: "Dark Slate", swatch: "#121316" },
  { key: "cyber", label: "Cyber Neon", swatch: "#0d0f18" },
  { key: "matcha", label: "Matcha Latte", swatch: "#edf2ea" },
  { key: "pastel", label: "Cute Pastel", swatch: "#fff0f4" },
  { key: "lotus", label: "Blossom Lotus", swatch: "#f7e9ec" },
];

export const FONTS: Record<FontKey, { label: string; css: string }> = {
  serif: { label: "Serif", css: '"Fraunces", Georgia, serif' },
  script: { label: "Handwritten", css: '"Caveat", cursive' },
  mono: { label: "Monospace", css: '"IBM Plex Mono", monospace' },
  sans: { label: "Clean Sans", css: '"Karla", system-ui, sans-serif' },
};

export const defaultCardTheme = (): CardTheme => ({
  mail: "parchment",
  canvas: "parchment",
  paper: "parchment",
  emblem: "parchment",
  titleFont: "parchment",
});

const KEY = "postcards.v1";
const PKEY = "postcards.profile";
const TKEY = "postcards.theme";

export const seed: Postcard[] = [];

const safe = <T>(k: string, fb: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fb;
  } catch {
    return fb;
  }
};
const save = (k: string, v: unknown) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
    return true;
  } catch {
    return false;
  }
};

export const loadCards = () => safe<Postcard[]>(KEY, seed).filter((card) => card.id !== "s1" && card.id !== "s2");
export const saveCards = (c: Postcard[]) => save(KEY, c);
export const loadProfile = () => safe<Profile>(PKEY, { name: "Traveler", email: "", bio: "", defaultRecipient: "you" });
export const saveProfile = (p: Profile) => save(PKEY, p);
export const loadTheme = () => safe<AppThemeKey>(TKEY, "paper");
export const saveTheme = (t: AppThemeKey) => save(TKEY, t);

export const readFile = (f: File) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(f);
  });

export type SortKey = "new" | "old" | "az";
export function filterCards(
  cards: Postcard[],
  o: { q: string; sort: SortKey; day: string | null; view: "all" | "archive" | "private" },
) {
  const q = o.q.trim().toLowerCase();
  return cards
    .filter((c) =>
      o.view === "archive" ? c.archived : o.view === "private" ? c.private && !c.archived : !c.archived,
    )
    .filter((c) => !q || c.title.toLowerCase().includes(q) || c.body.toLowerCase().includes(q) || (c.author && c.author.toLowerCase().includes(q)) || (c.recipient && c.recipient.toLowerCase().includes(q)))
    .filter((c) => !o.day || dayKey(c.createdAt) === o.day)
    .sort((a, b) =>
      o.sort === "az" ? a.title.localeCompare(b.title) : o.sort === "old" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt,
    );
}
export const dayKey = (t: number) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};
