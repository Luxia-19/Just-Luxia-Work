import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu, SlidersHorizontal, Plus, X, Music, Image as ImageIcon, Play, Pause, Trash2, Archive,
  Lock, LockOpen, Share2, Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Mail, MailOpen, Pencil, Palette, Crown,
} from "lucide-react";
import {
  type Postcard, type Profile, type SortKey, type AppThemeKey, type CardTheme, type FontKey, type ChildEnvelope,
  APP_THEMES, FONTS, defaultCardTheme,
  loadCards, saveCards, loadProfile, saveProfile, loadTheme, saveTheme, readFile, filterCards, dayKey,
  LETTER_PAGE_CHARACTERS, MAX_LETTER_TITLE_CHARACTERS, MAX_LETTER_PAGES, paginateLetter,
} from "@/lib/postcards";
import { MAIL_CSS, MAIL_THEMES, MAIL_THEME_INKS, MAIL_BODY_FONTS, MAIL_TITLE_FONTS, SAKURA_BRANCH_ASSET, SAKURA_WAX_SEAL_ASSET, SAKURA_HANKO_ASSET, mailTheme, downloadMail, type MailKey } from "@/lib/mail-styles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Postcard Notes — a personal postcard diary" },
      { name: "description", content: "Write atmospheric postcard notes with photos, themes and background audio." },
      { property: "og:title", content: "Postcard Notes" },
      { property: "og:description", content: "A personal diary of postcards with photos and sound." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

const fmt = (t: number) =>
  new Date(t).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
const STRICT_MAIL_THEMES = MAIL_THEMES.filter((theme) => theme.category === "Strict");
const PREMIUM_MAIL_THEMES = MAIL_THEMES.filter((theme) => theme.premium && theme.category !== "Strict");
const STANDARD_MAIL_THEMES = MAIL_THEMES.filter((theme) => !theme.premium && theme.category !== "Strict");
const postcardParts = (theme?: CardTheme) => {
  const fallback = theme?.mail ?? "parchment";
  return {
    canvas: theme?.canvas ?? fallback,
    paper: theme?.paper ?? fallback,
    emblem: theme?.emblem ?? fallback,
    titleFont: theme?.titleFont ?? fallback,
  };
};
const postcardTextStyle = (theme?: CardTheme, bodyStyle?: Postcard["bodyStyle"]): React.CSSProperties => {
  const parts = postcardParts(theme);
  return {
    "--l-head": MAIL_TITLE_FONTS[parts.titleFont].family,
    ...(bodyStyle?.color ? { "--l-ink": bodyStyle.color } : {}),
    ...(bodyStyle?.font ? { "--l-font": FONTS[bodyStyle.font].css } : {}),
  } as React.CSSProperties;
};

function App() {
  const [cards, setCards] = useState<Postcard[]>([]);
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", bio: "" });
  const [theme, setTheme] = useState<AppThemeKey>("paper");
  const [ready, setReady] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [open, setOpen] = useState<Postcard | null>(null);
  type EditTarget = "new" | { card: Postcard; openTheme?: boolean } | null;
  const [editing, setEditing] = useState<EditTarget>(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("new");
  const [day, setDay] = useState<string | null>(null);
  const [view, setView] = useState<"all" | "archive" | "private">("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCards(loadCards()); setProfile(loadProfile()); setTheme(loadTheme()); setReady(true);
  }, []);
  useEffect(() => { if (ready) saveCards(cards); }, [cards, ready]);
  useEffect(() => { if (ready) saveProfile(profile); }, [profile, ready]);
  useEffect(() => {
    document.documentElement.dataset["theme"] = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (ready) saveTheme(theme);
  }, [theme, ready]);

  const shown = useMemo(() => filterCards(cards, { q, sort, day, view }), [cards, q, sort, day, view]);
  const pageCount = Math.max(1, Math.ceil(shown.length / 9));
  const currentPage = Math.min(page, pageCount);
  const pageCards = shown.slice((currentPage - 1) * 9, currentPage * 9);
  useEffect(() => { setPage(1); }, [q, sort, day, view]);
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);
  const update = (c: Postcard) => { setCards((cs) => cs.map((x) => (x.id === c.id ? c : x))); setOpen(c); };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <style dangerouslySetInnerHTML={{ __html: MAIL_CSS }} />
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <IconBtn label="Open settings" onClick={() => setLeft(true)}><Menu /></IconBtn>
        <h1 className="font-display text-2xl italic tracking-tight">Postcard Notes</h1>
        <IconBtn label="Search and filter" onClick={() => setRight(true)}><SlidersHorizontal /></IconBtn>
      </header>
      <div className="airmail-edge h-1.5 opacity-70" />

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6">
        {(view !== "all" || day || q) && (
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {view !== "all" && <Chip onClear={() => setView("all")}>{view === "archive" ? "Archive" : "Private notes"}</Chip>}
            {day && <Chip onClear={() => setDay(null)}>Date filter</Chip>}
            {q && <Chip onClear={() => setQ("")}>“{q}”</Chip>}
          </div>
        )}
        {shown.length === 0 ? (
          <div className="mt-24 text-center text-muted-foreground">
            <Mail className="mx-auto mb-3 size-10 opacity-50" />
            <p className="font-display text-xl">No postcards here yet.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageCards.map((c, i) => <CardSnippet key={c.id} c={c} i={i} onClick={() => setOpen(c)} onEdit={() => setEditing({ card: c, openTheme: false })} />)}
          </div>
        )}
        {pageCount > 1 && (
          <nav aria-label="Postcard pages" className="mt-8 flex items-center justify-center gap-3 text-sm">
            <button disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md border border-border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
            <span className="text-muted-foreground">Page {currentPage} of {pageCount}</span>
            <button disabled={currentPage === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className="rounded-md border border-border px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
          </nav>
        )}
      </main>

      <button
        aria-label="New postcard"
        onClick={() => setEditing("new")}
        className="fixed bottom-6 right-6 z-30 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform duration-300 hover:scale-105"
      >
        <Plus className="size-6" />
      </button>

      <Drawer side="left" open={left} onClose={() => setLeft(false)}>
        <div className="flex items-center gap-3">
          <div className="grid size-14 place-items-center rounded-full bg-accent font-display text-2xl">
            {(profile.name || "?")[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-lg">{profile.name || "Your name"}</p>
            <p className="truncate text-sm text-muted-foreground">{profile.email || "no email"}</p>
          </div>
        </div>
        <Section title="Account">
          <Field label="Your name (Sender)" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
          <Field label="Default recipient" value={profile.defaultRecipient ?? ""} onChange={(v) => setProfile({ ...profile, defaultRecipient: v })} />
          <Field label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
          <label className="block text-sm">
            <span className="text-muted-foreground">Bio</span>
            <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={3}
              className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </label>
        </Section>
        <Section title="App theme">
          <div className="grid grid-cols-2 gap-2">
            {APP_THEMES.map((t) => (
              <button key={t.key} onClick={() => setTheme(t.key)}
                className={`flex items-center gap-2 rounded-md border px-2.5 py-2 text-left text-xs transition-colors ${theme === t.key ? "border-primary bg-accent font-medium" : "border-border hover:bg-muted"}`}>
                <span className="size-4 shrink-0 rounded-full border border-border" style={{ background: t.swatch }} />
                {t.label}
              </button>
            ))}
          </div>
        </Section>
        <Section title="Sharing">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Share2 className="size-4" /> Open a postcard to share it</div>
        </Section>
      </Drawer>

      <Drawer side="right" open={right} onClose={() => setRight(false)}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles & notes"
            className="w-full rounded-md border border-input bg-card py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <Section title="Sort">
          {([["new", "Newest first"], ["old", "Oldest first"], ["az", "Title A–Z"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setSort(k)}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm ${sort === k ? "bg-accent font-medium" : "hover:bg-muted"}`}>{l}</button>
          ))}
        </Section>
        <Section title="Calendar">
          <MiniCal cards={cards} day={day} setDay={setDay} />
        </Section>
        <Section title="Collections">
          {([["all", "All postcards", Mail], ["archive", "Archive", Archive], ["private", "Private notes", Lock]] as const).map(([k, l, I]) => (
            <button key={k} onClick={() => setView(k)}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${view === k ? "bg-accent font-medium" : "hover:bg-muted"}`}>
              <I className="size-4" />{l}
            </button>
          ))}
        </Section>
      </Drawer>

      {open && (
        <EnvelopeView c={open} onClose={() => setOpen(null)} onChange={update}
          onEdit={(openTheme) => setEditing({ card: open, openTheme })}
          onDelete={() => { setCards((cs) => cs.filter((x) => x.id !== open.id)); setOpen(null); }} />
      )}
      {editing && (
        <Editor
          initial={editing === "new" ? null : editing.card}
          initialShowTheme={editing !== "new" && !!editing.openTheme}
          author={profile.name}
          defaultRecipient={profile.defaultRecipient}
          onClose={() => setEditing(null)}
          onSave={(c) => {
            setCards((cs) => (cs.some((x) => x.id === c.id) ? cs.map((x) => (x.id === c.id ? c : x)) : [c, ...cs]));
            if (open && editing !== "new" && editing.card.id === open.id) {
              setOpen(c);
            }
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function IconBtn({ label, onClick, type = "button", children }: { label: string; onClick: () => void; type?: "button" | "submit" | "reset"; children: React.ReactNode }) {
  return <button type={type} aria-label={label} onClick={onClick} className="grid size-10 place-items-center rounded-full hover:bg-muted [&_svg]:size-5">{children}</button>;
}
function Chip({ children, onClear }: { children: React.ReactNode; onClear: () => void }) {
  return <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1">{children}<button aria-label="Clear" onClick={onClear}><X className="size-3.5" /></button></span>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mt-6 space-y-2"><h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h3>{children}</div>;
}
function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm"><span className="text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function Drawer({ side, open, onClose, children }: { side: "left" | "right"; open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}>
      <div onClick={onClose} className={`absolute inset-0 bg-foreground/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute top-0 h-full w-80 max-w-[85vw] overflow-y-auto border-border bg-background p-5 shadow-lift transition-transform duration-300
        ${side === "left" ? `left-0 border-r ${open ? "translate-x-0" : "-translate-x-full"}` : `right-0 border-l ${open ? "translate-x-0" : "translate-x-full"}`}`}>
        <div className="mb-4 flex justify-end"><IconBtn label="Close" onClick={onClose}><X /></IconBtn></div>
        {children}
      </aside>
    </div>
  );
}

function CardSnippet({ c, i, onClick, onEdit }: { c: Postcard; i: number; onClick: () => void; onEdit: () => void }) {
  const parts = postcardParts(c.theme);
  return (
    <div style={{ rotate: `${((i % 3) - 1) * 0.6}deg` }} className="group relative aspect-[3/2] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
      <button onClick={onClick}
        className={`mt-${parts.canvas} mail-letter relative h-full w-full overflow-hidden rounded-md text-left`}>
        <div className={`mt-${parts.paper} flex h-full flex-col p-5`} style={postcardTextStyle(c.theme, c.bodyStyle)}>
          <div className={`mt-${parts.emblem} absolute right-4 top-4 grid h-14 w-12 place-items-center text-xl outline-2 -outline-offset-4 outline-dashed outline-current/40`} style={{ rotate: "4deg" }}>
            {mailTheme(parts.emblem).emoji}
          </div>
          <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-widest opacity-60">
            <span>{fmt(c.createdAt)}</span>
            <span className="truncate max-w-[50%] text-right font-medium">To {c.recipient?.trim() || "you"}</span>
          </div>
          <h2 className="m-head mt-2 line-clamp-2 pr-14 text-2xl leading-tight">{c.title || "Untitled"}</h2>
          <p className="mt-2 line-clamp-2 text-sm opacity-75">{c.body}</p>
          <div className="mt-auto flex gap-2 pt-3 pr-10 text-xs">
            {c.private && <span className="m-badge flex items-center gap-1 rounded-full px-2 py-1"><Lock className="size-3" />Private</span>}
            {(c.audio || c.pageAudios?.length) && <span className="m-badge flex items-center gap-1 rounded-full px-2 py-1"><Music className="size-3" />Audio</span>}
            {c.images.length > 0 && <span className="m-badge flex items-center gap-1 rounded-full px-2 py-1"><ImageIcon className="size-3" />{c.images.length} photo{c.images.length > 1 ? "s" : ""}</span>}
          </div>
          {parts.paper === "sakura-sumi" && <img className="sakura-hanko sakura-card-hanko" src={SAKURA_HANKO_ASSET} alt="" />}
        </div>
      </button>
      <button type="button" aria-label={`Edit postcard ${c.title || "Untitled"}`} title="Edit postcard" onClick={onEdit}
        className={`mt-${parts.emblem} absolute bottom-3 right-3 z-10 grid size-8 place-items-center rounded-full border border-current/25 shadow-sm transition-transform hover:scale-105`}>
        <Pencil className="size-4" />
      </button>
    </div>
  );
}

/* ---------- Audio bar with seek + autoplay toggle ---------- */
function AudioBar({ audio, audioRef, autoplay, onToggleAutoplay, dark }: {
  audio: { name: string; src: string };
  audioRef: React.RefObject<HTMLAudioElement | null>;
  autoplay: boolean;
  onToggleAutoplay: () => void;
  dark?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setPct(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    setPlaying(!a.paused);
    return () => { a.removeEventListener("timeupdate", onTime); a.removeEventListener("play", onPlay); a.removeEventListener("pause", onPause); };
  }, [audioRef]);
  const seek = (v: number) => {
    const a = audioRef.current;
    if (a?.duration) a.currentTime = (v / 100) * a.duration;
  };
  return (
    <div className={`flex items-center gap-3 rounded-full border px-3 py-2 ${dark ? "border-current/30 bg-black/20" : "border-border bg-secondary"}`}>
      <button aria-label={playing ? "Pause" : "Play"} onClick={() => (playing ? audioRef.current?.pause() : audioRef.current?.play())}
        className={`grid size-8 shrink-0 place-items-center rounded-full ${dark ? "bg-current/90 text-black" : "bg-primary text-primary-foreground"}`}
        style={dark ? { background: "currentColor" } : undefined}>
        {playing ? <Pause className="size-4" style={dark ? { color: "#000" } : undefined} /> : <Play className="size-4" style={dark ? { color: "#000" } : undefined} />}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs">{audio.name}</p>
        <input type="range" min={0} max={100} step={0.1} value={pct} aria-label="Seek"
          onChange={(e) => seek(Number(e.target.value))}
          className="mt-1 h-1 w-full cursor-pointer accent-current" />
      </div>
      <button aria-label="Toggle autoplay" title="Autoplay on open" onClick={onToggleAutoplay}
        className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${autoplay ? "border-current font-bold" : "border-current/40 opacity-60"}`}>
        Auto
      </button>
    </div>
  );
}

/* ---------- Nested Envelope Password & Clue Challenge Modal ---------- */
function NestedLockModal({
  child,
  onUnlock,
  onClose,
}: {
  child: ChildEnvelope;
  onUnlock: () => void;
  onClose: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const expected = (child.passphrase ?? "").trim().toLowerCase();
    const provided = answer.trim().toLowerCase();

    if (provided === expected) {
      setError("");
      onUnlock();
    } else {
      setShake(true);
      setError("Incorrect answer. Please check your clue and try again.");
      window.setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-xl border border-border bg-card p-6 text-card-foreground shadow-lift transition-all duration-300 ${shake ? "animate-shake" : ""}`}
      >
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-amber-500/20 text-amber-500">
          <Lock className="size-6" />
        </div>

        <h3 className="text-center font-display text-xl font-semibold">
          {child.title ? `“${child.title}”` : "Secret Envelope"}
        </h3>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          This envelope is password-protected.
        </p>

        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Clue from sender
          </p>
          <p className="mt-1 font-serif text-sm italic text-foreground">
            {child.clue?.trim() || "Do you know who sent this?"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground">
              Your Answer / Passphrase:
            </label>
            <input
              type="text"
              autoFocus
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Me"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm font-medium outline-none transition-colors focus:ring-2 focus:ring-primary"
            />
            {error && (
              <p className="mt-1 text-center text-xs font-medium text-destructive">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-input px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Unlock & Open
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Child Envelope Opening & Reading Modal (multi-sheet, 85% size) ---------- */
function ChildEnvelopeModal({
  child,
  parentAuthor,
  onClose,
}: {
  child: ChildEnvelope;
  parentAuthor: string;
  onClose: () => void;
}) {
  const [stage, setStage] = useState<"sealed" | "opening" | "open">("open");
  const [childPage, setChildPage] = useState(0);
  const [childPhotosOut, setChildPhotosOut] = useState(false);
  const [childLightbox, setChildLightbox] = useState<string | null>(null);
  const parts = postcardParts(child.theme);
  const m = mailTheme(parts.emblem);
  const childPages = child.pages?.length ? child.pages : [child.body || ""];
  const lastChildPage = childPages.length - 1;

  const unseal = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    window.setTimeout(() => setStage("open"), 1350);
  };

  const renderChildSheet = (page: number) => {
    const pImgs = (child.images ?? [])
      .map((src, i) => ({ src, page: child.imagePages?.[i] ?? 0, i }))
      .filter((x) => x.page === page);
    const pAudios = (child.pageAudios ?? [])
      .map((a, i) => ({ a, page: child.audioPages?.[i] ?? 0, i }))
      .filter((x) => x.page === page);
    return (
      <div>
        {page === 0 && <h3 className="m-head mb-4 text-xl leading-tight" style={{ fontFamily: MAIL_TITLE_FONTS[parts.titleFont].family }}>{child.title || "Secret Note"}</h3>}
        <p className="m-body whitespace-pre-wrap text-base leading-relaxed opacity-90">{childPages[page]}</p>
        <div className="m-div mt-4" />
        {pAudios.length > 0 && (
          <div className="mt-2 space-y-1">
            {pAudios.map(({ a, i }) => (
              <div key={i} className="media-emblem media-emblem-audio rounded-md p-2 shadow-sm backdrop-blur-sm">
                <p className="mb-1 flex items-center gap-1 truncate text-[10px] uppercase tracking-wider opacity-70"><Music className="size-3 shrink-0" />{a.name}</p>
                <audio controls preload="metadata" src={a.src} aria-label={`Play ${a.name}`} className="h-8 w-52 max-w-full" />
              </div>
            ))}
          </div>
        )}
        {pImgs.length > 0 && (
          <div className="page-pin absolute bottom-5 right-5">
            <button aria-label="Open photos" onClick={() => setChildPhotosOut((v) => !v)} className="media-emblem media-emblem-photo grid size-10 shrink-0 place-items-center rounded-full text-xl transition-transform duration-300 hover:scale-110"><ImageIcon className="size-4" /></button>
            {childPhotosOut && (
              <div className="flex gap-2 overflow-x-auto px-1 py-2">
                {pImgs.map(({ src, i }, idx) => (
                  <button key={i} onClick={() => setChildLightbox(src)} className="photo-card photo-pull shrink-0" style={{ animationDelay: `${idx * 90}ms`, ["--r" as string]: `${((idx % 3) - 1) * 4}deg` }}>
                    <img src={src} alt="" className="h-20 w-16 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`mt-${parts.canvas} fixed inset-0 z-[65] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md`}
      onClick={onClose}
    >
      {childLightbox && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-md" onClick={() => setChildLightbox(null)}>
          <img src={childLightbox} alt="" onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full rounded-md shadow-lift" />
          <button aria-label="Close photo" className="glass absolute right-4 top-4 grid size-9 place-items-center rounded-full"><X className="size-4" /></button>
        </div>
      )}
      {stage !== "open" ? (
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-6">
          <div className="env-scene">
            <div
              role="button"
              tabIndex={0}
              aria-label="Break seal to open nested envelope"
              onClick={unseal}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && unseal()}
              className={`env ${stage === "opening" ? "is-opening" : ""}`}
            >
              <div className="env-back" />
              <div
                className={`env-letter mt-${parts.paper}`}
                style={{ "--l-head": MAIL_TITLE_FONTS[parts.titleFont].family } as React.CSSProperties}
              >
                <div className="ld">Secret Note</div>
                <div className="lt">{child.title || "Untitled"}</div>
              </div>
              <div className="env-pocket" />
              <div className={`env-stamp mt-${parts.emblem}`}>{m.emoji}</div>
              <div className="env-addr">
                To {child.recipient?.trim() || "you"}, From {child.author?.trim() || parentAuthor || "Traveler"}
              </div>
              <div className="env-flap">
                <div className="env-flap-face">
                  {parts.canvas === "sakura-sumi" && <img className="sakura-branch" src={SAKURA_BRANCH_ASSET} alt="" />}
                </div>
                <div className={`env-seal mt-${parts.emblem}`}>
                  {parts.emblem === "sakura-sumi" ? <img className="sakura-wax-seal" src={SAKURA_WAX_SEAL_ASSET} alt="" /> : m.seal}
                </div>
              </div>
            </div>
          </div>

          <p className={`text-sm text-primary-foreground/90 ${stage === "sealed" ? "animate-pulse" : "opacity-0"}`}>
            Tap the seal to reveal the secret letter
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-primary-foreground/75 underline underline-offset-4 hover:text-primary-foreground"
          >
            ← Return to main letter
          </button>
        </div>
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`mt-${parts.paper} mail-letter letter-in mx-auto flex w-[min(90vw,900px)] flex-col rounded-lg shadow-lift`}
          style={{ ...postcardTextStyle(child.theme), maxHeight: "min(88vh,840px)", overflowY: "auto" } as React.CSSProperties}
        >
          <div className="flex items-start justify-between gap-3 p-5 pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest opacity-60">
                <MailOpen className="size-3" />
                <span>Secret Letter · Sheet {childPage + 1}/{childPages.length}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider opacity-75">
                To {child.recipient?.trim() || "you"} · From {child.author?.trim() || parentAuthor || "Traveler"}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close secret envelope"
              onClick={onClose}
              className="grid size-8 place-items-center rounded-full hover:bg-black/10 dark:hover:bg-white/10"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="m-div mx-5" />

          <div className="relative flex-1 px-5 pb-4 pt-3">
            {renderChildSheet(childPage)}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-current/15 p-4">
            <button
              type="button"
              disabled={childPage === 0}
              onClick={() => { setChildPage((p) => Math.max(0, p - 1)); setChildPhotosOut(false); }}
              className="rounded-md border border-current/30 px-3 py-1.5 text-xs font-medium hover:bg-foreground/5 disabled:opacity-40"
            >← Prev</button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-current/30 px-3 py-1.5 text-xs font-medium hover:bg-foreground/5"
            >← Back to main letter</button>
            <button
              type="button"
              disabled={childPage === lastChildPage}
              onClick={() => { setChildPage((p) => Math.min(lastChildPage, p + 1)); setChildPhotosOut(false); }}
              className="rounded-md border border-current/30 px-3 py-1.5 text-xs font-medium hover:bg-foreground/5 disabled:opacity-40"
            >Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 3D envelope unsealing → letter ---------- */
function EnvelopeView({ c, onClose, onChange, onEdit, onDelete }: {
  c: Postcard; onClose: () => void; onChange: (c: Postcard) => void; onEdit: (openTheme?: boolean) => void; onDelete: () => void;
}) {
  const [stage, setStage] = useState<"sealed" | "opening" | "open">("open");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeLockChild, setActiveLockChild] = useState<ChildEnvelope | null>(null);
  const [activeViewingChild, setActiveViewingChild] = useState<ChildEnvelope | null>(null);
  const [unlockedChildIds, setUnlockedChildIds] = useState<Set<string>>(new Set());
  const [poppingChildId, setPoppingChildId] = useState<string | null>(null);
  const [photosOut, setPhotosOut] = useState(false);
  const [letterPage, setLetterPage] = useState(0);
  const [sheetTurn, setSheetTurn] = useState<{ direction: "next" | "prev"; from: number; to: number } | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const parts = postcardParts(c.theme);
  const m = mailTheme(parts.emblem);
  const letterPages = useMemo(() => c.pages?.length ? c.pages : paginateLetter(c.body), [c.pages, c.body]);
  const lastPage = letterPages.length - 1;
  const currentLetterPage = Math.min(letterPage, lastPage);
  const turnPage = (direction: "next" | "prev") => {
    if (sheetTurn) return;
    const nextPage = direction === "next" ? Math.min(lastPage, currentLetterPage + 1) : Math.max(0, currentLetterPage - 1);
    if (nextPage === currentLetterPage) return;
    setSheetTurn({ direction, from: currentLetterPage, to: nextPage });
    window.setTimeout(() => {
      setLetterPage(nextPage);
      setSheetTurn(null);
    }, direction === "prev" ? 850 : 700);
  };

  const renderSheet = (page: number, className: string) => {
    const pageImages = c.images
      .map((src, index) => ({ src, index, page: c.imagePages?.[index] ?? 0 }))
      .filter((image) => image.page === page);
    const pageAudios = (c.pageAudios ?? [])
      .map((audio, index) => ({ audio, index, page: c.audioPages?.[index] ?? 0 }))
      .filter((clip) => clip.page === page);
    const depth = className.includes("sheet-eject") ? 0 : Math.min(3, Math.max(0, lastPage - page));
    return (
      <div className={`${className} sheet-depth-${depth}`}>
        {page === 0 && <h2 className="m-head mb-5 text-2xl leading-tight">{c.title || "Untitled"}</h2>}
        {page === 0 && parts.paper === "sakura-sumi" && <img className="sakura-hanko" src={SAKURA_HANKO_ASSET} alt="" />}
        <p className="m-body whitespace-pre-wrap text-base leading-relaxed">{letterPages[page]}</p>
        <div className="m-div mt-6" />
        {pageAudios.length > 0 && (
          <div className="page-audio-pin space-y-1">
            {pageAudios.map(({ audio, index }) => (
                <div key={index} className="media-emblem media-emblem-audio rounded-md p-2 shadow-sm backdrop-blur-sm">
                <p className="mb-1 flex items-center gap-1 truncate text-[10px] uppercase tracking-wider opacity-70"><Music className="size-3 shrink-0" />{audio.name}</p>
                <audio controls preload="metadata" src={audio.src} aria-label={`Play ${audio.name}`} className="h-8 w-52 max-w-full" />
              </div>
            ))}
          </div>
        )}
        {pageImages.length > 0 && (
          <div className="page-pin absolute bottom-5 right-5">
            <button aria-label="Open photos" onClick={() => setPhotosOut((v) => !v)} className="media-emblem media-emblem-photo grid size-12 shrink-0 place-items-center rounded-full text-xl transition-transform duration-300 hover:scale-110"><ImageIcon className="size-5" /></button>
            {photosOut && page === currentLetterPage && <div className="flex gap-3 overflow-x-auto px-1 py-2">
              {pageImages.map(({ src, index }, i) => <button key={index} onClick={() => setLightbox(src)} className="photo-card photo-pull shrink-0" style={{ animationDelay: `${i * 90}ms`, ["--r" as string]: `${((i % 3) - 1) * 4}deg` }}><img src={src} alt="" className="h-24 w-20 object-cover" /></button>)}
            </div>}
          </div>
        )}
        {/* Child envelope icon carrier — exact media-emblem texture */}
        {(() => {
          const pinnedChildren = (c.childEnvelopes ?? []).filter((child) => child.pinnedToSheet === page);
          if (!pinnedChildren.length) return null;
          return (
            <div className={`page-env-pin ${pageAudios.length > 0 ? "has-audio" : ""}`}>
              {pinnedChildren.map((child) => {
                const cp = postcardParts(child.theme);
                const cm = mailTheme(cp.emblem);
                const isUnlocked = unlockedChildIds.has(child.id);
                const isLocked = child.locked && !isUnlocked;
                const isPopping = poppingChildId === child.id;
                return (
                  <button
                    key={child.id}
                    type="button"
                    aria-label={`Open child envelope: ${child.title || "Secret Note"}`}
                    className={`media-emblem media-emblem-child relative grid size-12 shrink-0 place-items-center rounded-full text-xl transition-all duration-300 hover:scale-110 shadow-sm backdrop-blur-sm cursor-pointer${isPopping ? " child-env-popping" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLocked) {
                        setActiveLockChild(child);
                      } else {
                        setPoppingChildId(child.id);
                        window.setTimeout(() => {
                          setActiveViewingChild(child);
                          setPoppingChildId(null);
                        }, 480);
                      }
                    }}
                  >
                    <Mail className="size-5" />
                    <span className="absolute -bottom-1 -right-1 text-[11px] select-none" title={child.title}>{cm.emoji}</span>
                    {isLocked && (
                      <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-amber-500 text-black shadow">
                        <Lock className="size-2.5" />
                      </span>
                    )}
                    {child.locked && isUnlocked && (
                      <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-emerald-600 text-white shadow">
                        <LockOpen className="size-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })()}
      </div>
    );
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const on = () => setPlaying(!a.paused);
    a.addEventListener("play", on); a.addEventListener("pause", on);
    return () => { a.removeEventListener("play", on); a.removeEventListener("pause", on); };
  }, [c.audio?.src]);

  const unsealDuration = 1350;

  const unseal = () => {
    if (stage !== "sealed") return;
    if (c.audio?.src && c.autoplay !== false) audioRef.current?.play().catch(() => {});
    setStage("opening");
    window.setTimeout(() => setStage("open"), unsealDuration);
  };

  const share = async () => {
    const to = c.recipient?.trim() || "you"; const from = c.author?.trim() || "Traveler"; const text = `To: ${to}\nFrom: ${from}\n\n${c.title}\n\n${c.body}`;
    if (navigator.share) await navigator.share({ title: c.title, text }).catch(() => {});
    else await navigator.clipboard.writeText(text);
  };
  const exportMail = () => downloadMail({ ...c, recipient: c.recipient?.trim() || "you", author: c.author?.trim() || "Traveler", mail: parts.canvas, components: parts, bodyStyle: { color: c.bodyStyle?.color, font: c.bodyStyle?.font ? FONTS[c.bodyStyle.font].css : undefined } });

  return (
    <div className={`mt-${parts.canvas} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/60 p-4 backdrop-blur-sm`} onClick={onClose}>
      {c.audio && <audio ref={audioRef} src={c.audio.src} loop />}
      {c.audio && stage !== "sealed" && (
        <button onClick={(e) => { e.stopPropagation(); const a = audioRef.current; if (a) a.paused ? a.play() : a.pause(); }}
          aria-label={playing ? "Pause music" : "Play music"}
          className="glass fixed right-4 top-4 z-[55] flex max-w-[60vw] items-center gap-2 rounded-full px-3 py-1.5 text-xs shadow-lift">
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          <span className="truncate">{c.audio.name}</span>
        </button>
      )}

      {stage !== "open" ? (
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-8">
          <div className="env-scene">
            <div role="button" tabIndex={0} aria-label="Break the seal and open the letter" onClick={unseal}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && unseal()}
              className={`env ${stage === "opening" ? "is-opening" : ""}`}>
              <div className="env-back" />
              <div className={`env-letter mt-${parts.paper}`} style={{ "--l-head": MAIL_TITLE_FONTS[parts.titleFont].family } as React.CSSProperties}>
                <div className="ld">{fmt(c.createdAt)}</div>
                <div className="lt">{c.title || "Untitled"}</div>
              </div>
              <div className="env-pocket" />
              <div className={`env-stamp mt-${parts.emblem}`}>{m.emoji}</div>
              <div className="env-addr">To {c.recipient?.trim() || "you"}, From {c.author?.trim() || "Traveler"}</div>
              <div className="env-flap">
                <div className="env-flap-face">{parts.canvas === "sakura-sumi" && <img className="sakura-branch" src={SAKURA_BRANCH_ASSET} alt="" />}</div>
                <div className={`env-seal mt-${parts.emblem}`}>
                  {parts.emblem === "sakura-sumi" ? <img className="sakura-wax-seal" src={SAKURA_WAX_SEAL_ASSET} alt="" /> : m.seal}
                </div>
              </div>
            </div>
          </div>
          <p className={`text-sm text-primary-foreground/85 ${stage === "sealed" ? "animate-pulse" : "opacity-0"}`}>
            Tap the envelope to break the seal
          </p>
          <div className="flex gap-3 text-sm">
            <button onClick={onClose} className="text-primary-foreground/80 underline underline-offset-4">Back to board</button>
            <button onClick={exportMail} className="text-primary-foreground/80 underline underline-offset-4">✨ Export Interactive Mail (.html)</button>
          </div>
        </div>
      ) : (
        <div onClick={(e) => e.stopPropagation()} style={postcardTextStyle(c.theme, c.bodyStyle)}
          className={`mt-${parts.paper} mail-letter reader-letter letter-in mx-auto flex w-[96vw] max-w-[1440px] flex-col overflow-visible rounded-lg`}>
          <div className="space-y-3 p-5 pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest opacity-60">{fmt(c.createdAt)} · To {c.recipient?.trim() || "you"} · From {c.author?.trim() || "Traveler"}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <IconBtn label="Change theme" onClick={() => onEdit(true)}><Palette /></IconBtn>
                <IconBtn label="Close" onClick={onClose}><X /></IconBtn>
              </div>
            </div>
            {c.audio && (
              <AudioBar audio={c.audio} audioRef={audioRef} autoplay={c.autoplay !== false} dark
                onToggleAutoplay={() => onChange({ ...c, autoplay: c.autoplay === false })} />
            )}
            <div className="m-div" />
          </div>
          <div className="reader-page flex-1 px-5 pb-5">
            <button aria-label="Previous letter page" disabled={currentLetterPage === 0}
              onClick={() => turnPage("prev")} className="reader-page-nav left" />
            <button aria-label="Next letter page" disabled={currentLetterPage === lastPage}
              onClick={() => turnPage("next")} className="reader-page-nav right" />
            <div className="reader-page-stack">
              {sheetTurn ? sheetTurn.direction === "next"
                ? <>
                    {renderSheet(sheetTurn.to, "reader-page-sheet reader-page-under")}
                    {renderSheet(sheetTurn.from, "reader-page-sheet sheet-eject-next")}
                  </>
                : <>
                    {renderSheet(sheetTurn.from, "reader-page-sheet reader-page-under")}
                    {renderSheet(sheetTurn.to, "reader-page-sheet sheet-eject-prev")}
                  </>
                : renderSheet(currentLetterPage, "reader-page-sheet")}
            </div>
          </div>
          {(c.childEnvelopes?.length ?? 0) > 0 && (
            <div className="border-t border-current/15 px-5 py-4">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest opacity-75">
                  <Mail className="size-3.5" /> Envelopes inside ({c.childEnvelopes!.length}/3)
                </p>
                <span className="text-[11px] opacity-60">Tap to inspect or unlock</span>
              </div>
              <div className="child-env-tray">
                {c.childEnvelopes!.filter((child) => (child.pinnedToSheet ?? -1) < 0).map((child, idx) => {
                  const cp = postcardParts(child.theme);
                  const cm = mailTheme(cp.emblem);
                  const isUnlocked = unlockedChildIds.has(child.id);
                  const isLocked = child.locked && !isUnlocked;
                  return (
                    <div
                      key={child.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (isLocked) {
                          setActiveLockChild(child);
                        } else {
                          setPoppingChildId(child.id);
                          window.setTimeout(() => { setActiveViewingChild(child); setPoppingChildId(null); }, 480);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          if (isLocked) setActiveLockChild(child);
                          else { setPoppingChildId(child.id); window.setTimeout(() => { setActiveViewingChild(child); setPoppingChildId(null); }, 480); }
                        }
                      }}
                      aria-label={`Open child envelope: ${child.title || `Envelope ${idx + 1}`}`}
                      className={`child-env-card mt-${cp.canvas}${poppingChildId === child.id ? " child-env-popping" : ""}`}
                    >
                      <div className="child-env-inner">
                        <div className="child-env-flap" />
                        <div className="child-env-pocket" />
                        <div className={`child-env-seal mt-${cp.emblem}`}>{cm.seal}</div>
                        <div className={`child-env-stamp mt-${cp.emblem}`}>{cm.emoji}</div>
                        <div className="child-env-title">{child.title || `Envelope ${idx + 1}`}</div>
                        {isLocked && (
                          <div className="child-lock-badge">
                            <Lock className="size-2.5 text-amber-300" />
                            <span>Locked</span>
                          </div>
                        )}
                        {child.locked && isUnlocked && (
                          <div className="child-lock-badge !bg-emerald-950/85 !text-emerald-300">
                            <LockOpen className="size-2.5" />
                            <span>Unlocked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2 border-t border-current/20 p-4 text-sm">
            <Act onClick={exportMail}>✨ Export Interactive Mail (.html)</Act>
            <Act onClick={() => onEdit(false)}><Pencil className="size-4" />Edit</Act>
            <Act onClick={share}><Share2 className="size-4" />Share</Act>
            <Act onClick={() => onChange({ ...c, private: !c.private })}><Lock className="size-4" />{c.private ? "Make public" : "Make private"}</Act>
            <Act onClick={() => onChange({ ...c, archived: !c.archived })}><Archive className="size-4" />{c.archived ? "Unarchive" : "Archive"}</Act>
            <Act danger onClick={() => confirm("Delete this postcard?") && onDelete()}><Trash2 className="size-4" />Delete</Act>
          </div>
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/40 p-4 backdrop-blur-md" onClick={(e) => { e.stopPropagation(); setLightbox(null); }}>
          <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full rounded-md shadow-lift" />
          <button aria-label="Close photo" className="glass absolute right-4 top-4 grid size-10 place-items-center rounded-full"><X className="size-5" /></button>
        </div>
      )}

      {activeLockChild && (
        <NestedLockModal
          child={activeLockChild}
          onUnlock={() => {
            setUnlockedChildIds((prev) => new Set([...prev, activeLockChild.id]));
            const target = activeLockChild;
            setActiveLockChild(null);
            setPoppingChildId(target.id);
            window.setTimeout(() => { setActiveViewingChild(target); setPoppingChildId(null); }, 480);
          }}
          onClose={() => setActiveLockChild(null)}
        />
      )}

      {activeViewingChild && (
        <ChildEnvelopeModal
          child={activeViewingChild}
          parentAuthor={c.author || "Traveler"}
          onClose={() => setActiveViewingChild(null)}
        />
      )}
    </div>
  );
}

function Act({ onClick, children, danger }: { onClick: () => void; children: React.ReactNode; danger?: boolean }) {
  return <button type="button" onClick={onClick} className={`flex items-center gap-1.5 rounded-md border border-current/30 px-3 py-1.5 hover:bg-foreground/5 ${danger ? "text-destructive" : ""}`}>{children}</button>;
}

/* ---------- Child Envelope Editor List (Max 3) ---------- */
function ChildEnvelopeEditorList({
  childEnvelopes = [],
  currentSheet = 0,
  defaultAuthor,
  defaultRecipient,
  onChange,
}: {
  childEnvelopes?: ChildEnvelope[];
  currentSheet?: number;
  defaultAuthor: string;
  defaultRecipient: string;
  onChange: (children: ChildEnvelope[]) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addChild = () => {
    if (childEnvelopes.length >= 3) return;
    const newChild: ChildEnvelope = {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      author: defaultAuthor,
      recipient: defaultRecipient,
      theme: defaultCardTheme(),
      locked: false,
      clue: "Do you know me?",
      passphrase: "Me",
      pinnedToSheet: currentSheet,
    };
    onChange([...childEnvelopes, newChild]);
    setExpandedId(newChild.id);
  };

  const removeChild = (id: string) => {
    onChange(childEnvelopes.filter((c) => c.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const updateChild = (id: string, patch: Partial<ChildEnvelope>) => {
    onChange(childEnvelopes.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const updateChildTheme = (id: string, part: keyof CardTheme, val: MailKey) => {
    const cur = childEnvelopes.find((c) => c.id === id);
    if (!cur) return;
    const curTheme = cur.theme ?? defaultCardTheme();
    updateChild(id, {
      theme: { ...curTheme, [part]: val, mail: val },
    });
  };

  return (
    <div className="space-y-2 rounded-md border border-border bg-background p-3 text-sm">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Mail className="size-3.5" /> Envelopes Inside ({childEnvelopes.length}/3)
          </p>
          <p className="text-[10px] text-muted-foreground">
            Include up to 3 secret child envelopes with themes & password clues
          </p>
        </div>
        {childEnvelopes.length < 3 && (
          <button
            type="button"
            onClick={addChild}
            className="flex items-center gap-1 rounded-md border border-dashed border-input px-2.5 py-1 text-xs font-medium hover:bg-muted"
          >
            <Plus className="size-3.5" /> Add Envelope
          </button>
        )}
      </div>

      {childEnvelopes.map((child, idx) => {
        const parts = postcardParts(child.theme);
        const m = mailTheme(parts.emblem);
        const isExpanded = expandedId === child.id;

        return (
          <div key={child.id} className="rounded-md border border-border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : child.id)}
                className="flex flex-1 items-center gap-2 text-left font-medium text-xs sm:text-sm"
              >
                <span>{m.emoji}</span>
                <span className="truncate">{child.title || `Child Envelope #${idx + 1}`}</span>
                {child.locked && (
                  <span className="flex items-center gap-0.5 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                    <Lock className="size-2.5" /> Locked
                  </span>
                )}
                <ChevronDown className={`ml-auto size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>
              <button
                type="button"
                aria-label={`Remove envelope ${idx + 1}`}
                onClick={() => removeChild(child.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>

            {isExpanded && (
              <div className="mt-3 space-y-3 border-t border-border/60 pt-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-muted-foreground">Envelope Title</span>
                    <input
                      type="text"
                      value={child.title}
                      onChange={(e) => updateChild(child.id, { title: e.target.value })}
                      placeholder="e.g. Secret Note"
                      className="mt-1 w-full rounded border border-input bg-background px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-primary"
                    />
                  </label>
                  <label className="block">
                    <span className="text-muted-foreground">To (Recipient)</span>
                    <input
                      type="text"
                      value={child.recipient ?? ""}
                      onChange={(e) => updateChild(child.id, { recipient: e.target.value })}
                      placeholder="e.g. Es"
                      className="mt-1 w-full rounded border border-input bg-background px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-primary"
                    />
                  </label>
                </div>

                {/* Multi-sheet editor — up to 3 sheets */}
                {(() => {
                  const childPages = child.pages?.length ? child.pages : [child.body || ""];
                  const MAX_CHILD_PAGES = 3;
                  const MAX_CHILD_CHARS = 420;
                  const [editChildPage, setEditChildPage] = [
                    child._editPage ?? 0,
                    (p: number) => updateChild(child.id, { _editPage: p } as any),
                  ];
                  const curPage = Math.min(editChildPage, childPages.length - 1);
                  const curText = childPages[curPage] ?? "";
                  const updateChildPage = (text: string) => {
                    const next = [...childPages];
                    next[curPage] = text.slice(0, MAX_CHILD_CHARS);
                    updateChild(child.id, { pages: next, body: next.join("\n\n") });
                  };
                  const addChildSheet = () => {
                    if (childPages.length >= MAX_CHILD_PAGES) return;
                    const next = [...childPages, ""];
                    updateChild(child.id, { pages: next, body: next.join("\n\n") });
                    updateChild(child.id, { _editPage: next.length - 1 } as any);
                  };
                  return (
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-muted-foreground">Secret Note (Sheet {curPage + 1}/{childPages.length})</span>
                        <button type="button" disabled={childPages.length >= MAX_CHILD_PAGES} onClick={addChildSheet}
                          className="rounded border border-dashed border-input px-2 py-0.5 text-[10px] hover:bg-muted disabled:opacity-40">+ Sheet</button>
                      </div>
                      <textarea
                        rows={3}
                        value={curText}
                        onChange={(e) => updateChildPage(e.target.value)}
                        placeholder="Write secret message on this sheet..."
                        className="mt-1 w-full rounded border border-input bg-background p-2.5 outline-none focus:ring-1 focus:ring-primary"
                      />
                      <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>{curText.length}/{MAX_CHILD_CHARS}</span>
                        {childPages.length > 1 && (
                          <div className="flex gap-1">
                            <button type="button" disabled={curPage === 0} onClick={() => updateChild(child.id, { _editPage: Math.max(0, curPage - 1) } as any)} className="rounded border border-input px-1.5 disabled:opacity-40">‹</button>
                            <button type="button" disabled={curPage === childPages.length - 1} onClick={() => updateChild(child.id, { _editPage: Math.min(childPages.length - 1, curPage + 1) } as any)} className="rounded border border-input px-1.5 disabled:opacity-40">›</button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Theme customization */}
                <div className="rounded border border-border/80 bg-background/50 p-2.5">
                  <p className="mb-2 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                    Envelope Theme (Matches Model Envelope)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      ["canvas", "Outer Canvas", parts.canvas],
                      ["paper", "Letter Paper", parts.paper],
                      ["emblem", "Stamp & Seal", parts.emblem],
                    ] as const).map(([part, label, value]) => (
                      <label key={part} className="block">
                        <span className="mb-1 block text-muted-foreground text-[10px]">{label}</span>
                        <select
                          value={value}
                          onChange={(e) => updateChildTheme(child.id, part, e.target.value as MailKey)}
                          className="w-full rounded border border-input bg-card px-2 py-1 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                        >
                          <optgroup label="Standard Themes">
                            {STANDARD_MAIL_THEMES.map((t) => (
                              <option key={t.key} value={t.key}>{t.emoji} {t.label}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Premium Themes">
                            {PREMIUM_MAIL_THEMES.map((t) => (
                              <option key={t.key} value={t.key}>✦ {t.emoji} {t.label}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Strict Sector">
                            {STRICT_MAIL_THEMES.map((t) => (
                              <option key={t.key} value={t.key}>⚡ {t.emoji} {t.label}</option>
                            ))}
                          </optgroup>
                        </select>
                      </label>
                    ))}
                    <label className="block">
                      <span className="mb-1 block text-muted-foreground text-[10px]">Title Font</span>
                      <select
                        value={parts.titleFont}
                        onChange={(e) => updateChildTheme(child.id, "titleFont", e.target.value as MailKey)}
                        className="w-full rounded border border-input bg-card px-2 py-1 text-[11px] outline-none focus:ring-1 focus:ring-primary"
                      >
                        <optgroup label="Standard Title Fonts">
                          {STANDARD_MAIL_THEMES.map((t) => (
                            <option key={t.key} value={t.key}>{MAIL_TITLE_FONTS[t.key].label}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Premium Title Fonts">
                          {PREMIUM_MAIL_THEMES.map((t) => (
                            <option key={t.key} value={t.key}>✦ {MAIL_TITLE_FONTS[t.key].label}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Strict Sector Fonts">
                          {STRICT_MAIL_THEMES.map((t) => (
                            <option key={t.key} value={t.key}>⚡ {MAIL_TITLE_FONTS[t.key].label}</option>
                          ))}
                        </optgroup>
                      </select>
                    </label>
                  </div>
                </div>

                {/* Photos for child envelope */}
                <div className="rounded border border-border/60 bg-background/40 p-2.5">
                  <p className="mb-2 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">Attached Photos (up to 3)</p>
                  <label className="flex cursor-pointer items-center gap-1.5 rounded border border-dashed border-input px-2 py-1.5 text-[11px] hover:bg-muted">
                    <ImageIcon className="size-3.5" />Add photo to child envelope
                    <input type="file" accept="image/*" hidden onChange={async (e) => {
                      const fs = e.target.files; if (!fs) return;
                      const imgs = child.images ?? [];
                      if (imgs.length >= 3) return;
                      const urls = await Promise.all([...fs].slice(0, 3 - imgs.length).map((f) => new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.readAsDataURL(f); })));
                      const curImgPage = (child as any)._editPage ?? 0;
                      updateChild(child.id, {
                        images: [...imgs, ...urls],
                        imagePages: [...(child.imagePages ?? imgs.map(() => 0)), ...urls.map(() => curImgPage)],
                      });
                    }} />
                  </label>
                  {(child.images?.length ?? 0) > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {child.images!.map((src, i) => (
                        <div key={i} className="relative">
                          <img src={src} alt="" className="size-12 rounded object-cover" />
                          <select value={child.imagePages?.[i] ?? 0}
                            onChange={(e) => updateChild(child.id, { imagePages: child.images!.map((_, j) => j === i ? Number(e.target.value) : (child.imagePages?.[j] ?? 0)) })}
                            className="mt-0.5 w-12 rounded border border-input bg-background px-1 py-0.5 text-[10px]">
                            {(child.pages?.length ? child.pages : [""]).map((_, pi) => <option key={pi} value={pi}>S{pi + 1}</option>)}
                          </select>
                          <button type="button" aria-label="Remove photo" onClick={() => updateChild(child.id, { images: child.images!.filter((_, j) => j !== i), imagePages: (child.imagePages ?? child.images!.map(() => 0)).filter((_, j) => j !== i) })}
                            className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-foreground text-background"><X className="size-2.5" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Per-sheet audio for child envelope (no theme audio) */}
                <div className="rounded border border-border/60 bg-background/40 p-2.5">
                  <p className="mb-2 font-bold uppercase tracking-wider text-muted-foreground text-[10px]">Sheet Audio (up to 3, no theme audio)</p>
                  <label className="flex cursor-pointer items-center gap-1.5 rounded border border-dashed border-input px-2 py-1.5 text-[11px] hover:bg-muted">
                    <Music className="size-3.5" />Add page audio
                    <input type="file" accept="audio/*" hidden onChange={async (e) => {
                      const f = e.target.files?.[0]; if (!f) return;
                      const audios = child.pageAudios ?? [];
                      if (audios.length >= 3) return;
                      const src = await new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.readAsDataURL(f); });
                      const curAudPage = (child as any)._editPage ?? 0;
                      updateChild(child.id, {
                        pageAudios: [...audios, { name: f.name, src }],
                        audioPages: [...(child.audioPages ?? audios.map(() => 0)), curAudPage],
                      });
                    }} />
                  </label>
                  {(child.pageAudios?.length ?? 0) > 0 && (
                    <div className="mt-2 space-y-1">
                      {child.pageAudios!.map((aud, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px]">
                          <Music className="size-3 shrink-0" />
                          <span className="min-w-0 flex-1 truncate">{aud.name}</span>
                          <select value={child.audioPages?.[i] ?? 0}
                            onChange={(e) => updateChild(child.id, { audioPages: child.pageAudios!.map((_, j) => j === i ? Number(e.target.value) : (child.audioPages?.[j] ?? 0)) })}
                            className="rounded border border-input bg-background px-1 py-0.5 text-[10px]">
                            {(child.pages?.length ? child.pages : [""]).map((_, pi) => <option key={pi} value={pi}>S{pi + 1}</option>)}
                          </select>
                          <button type="button" aria-label="Remove audio" onClick={() => updateChild(child.id, { pageAudios: child.pageAudios!.filter((_, j) => j !== i), audioPages: (child.audioPages ?? child.pageAudios!.map(() => 0)).filter((_, j) => j !== i) })}><X className="size-3" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pin to parent sheet — attached to current sheet */}
                <div className="flex items-center justify-between rounded border border-border/60 bg-background/40 p-2.5 text-xs">
                  <div>
                    <p className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">📌 Sheet Attachment</p>
                    <p className="mt-0.5 text-muted-foreground">
                      {child.pinnedToSheet !== undefined ? (
                        <span>Attached to <strong className="text-foreground">Sheet {child.pinnedToSheet + 1}</strong></span>
                      ) : (
                        <span>Placed in <strong className="text-foreground">tray below letter</strong></span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {child.pinnedToSheet !== currentSheet && (
                      <button
                        type="button"
                        onClick={() => updateChild(child.id, { pinnedToSheet: currentSheet })}
                        className="rounded border border-primary/40 bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary hover:bg-primary/20"
                      >
                        Attach to Sheet {currentSheet + 1}
                      </button>
                    )}
                    {child.pinnedToSheet !== undefined && (
                      <button
                        type="button"
                        onClick={() => updateChild(child.id, { pinnedToSheet: undefined })}
                        className="rounded border border-input px-2 py-1 text-[11px] text-muted-foreground hover:bg-muted"
                      >
                        Move to Tray
                      </button>
                    )}
                  </div>
                </div>

                {/* Privacy & Password */}
                <div className="rounded border border-amber-500/20 bg-amber-500/5 p-2.5">
                  <label className="flex cursor-pointer items-center gap-2 font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={!!child.locked}
                      onChange={(e) => updateChild(child.id, { locked: e.target.checked })}
                    />
                    <span>Require Secret Password & Clue 🔒</span>
                  </label>
                  {child.locked && (
                    <div className="mt-2.5 space-y-2 border-t border-amber-500/20 pt-2">
                      <label className="block">
                        <span className="text-muted-foreground">Clue / Question (shown when tapped)</span>
                        <input
                          type="text"
                          value={child.clue ?? ""}
                          onChange={(e) => updateChild(child.id, { clue: e.target.value })}
                          placeholder="e.g. Do you know me? or Who am I?"
                          className="mt-1 w-full rounded border border-input bg-background px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-primary"
                        />
                      </label>
                      <label className="block">
                        <span className="text-muted-foreground">Correct Secret Answer / Code</span>
                        <input
                          type="text"
                          value={child.passphrase ?? ""}
                          onChange={(e) => updateChild(child.id, { passphrase: e.target.value })}
                          placeholder="e.g. Me"
                          className="mt-1 w-full rounded border border-input bg-background px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-primary"
                        />
                        <span className="mt-0.5 block text-[10px] text-muted-foreground">
                          Receiver must enter this text (case-insensitive) to unlock & open this envelope.
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Editor with postcard theme customizer ---------- */
function Editor({ initial, initialShowTheme = false, author, defaultRecipient, onClose, onSave }: {
  initial: Postcard | null; initialShowTheme?: boolean; author: string; defaultRecipient?: string; onClose: () => void; onSave: (c: Postcard) => void;
}) {
  const [c, setC] = useState<Postcard>(() => {
    const base = initial ?? {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      author: author || "Traveler",
      recipient: defaultRecipient || "you",
      createdAt: Date.now(),
      images: [],
      theme: defaultCardTheme(),
    };
    return {
      ...base,
      author: base.author || author || "Traveler",
      recipient: base.recipient || defaultRecipient || "you",
      pages: base.pages?.length ? base.pages : paginateLetter(base.body),
      imagePages: base.imagePages ?? base.images.map(() => 0),
      pageAudios: base.pageAudios ?? [],
      audioPages: base.audioPages ?? (base.pageAudios ?? []).map(() => 0),
    };
  });
  const [editPage, setEditPage] = useState(0);
  const [showTheme, setShowTheme] = useState(initialShowTheme);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const th = c.theme ?? defaultCardTheme();
  const parts = postcardParts(th);
  const updateThemePart = (part: "canvas" | "paper" | "emblem" | "titleFont", value: MailKey) => setC((x) => ({
    ...x,
    theme: { ...defaultCardTheme(), ...x.theme, [part]: value },
  }));
  const updateBodyStyle = (patch: Partial<NonNullable<Postcard["bodyStyle"]>>) => setC((x) => ({
    ...x,
    bodyStyle: { ...x.bodyStyle, ...patch },
  }));
  const bodyColor = c.bodyStyle?.color ?? MAIL_THEME_INKS[parts.paper];
  const bodyFont = c.bodyStyle?.font ? FONTS[c.bodyStyle.font].css : MAIL_BODY_FONTS[parts.paper];
  const pages = c.pages?.length ? c.pages : [""];
  const currentEditPage = Math.min(editPage, pages.length - 1);
  const currentPageText = pages[currentEditPage] ?? "";

  const updatePageText = (text: string) => setC((x) => {
    const nextPages = [...(x.pages?.length ? x.pages : [""])];
    nextPages[currentEditPage] = text.slice(0, LETTER_PAGE_CHARACTERS);
    return { ...x, pages: nextPages, body: nextPages.join("\n\n") };
  });
  const addSheet = () => {
    if (pages.length >= MAX_LETTER_PAGES) return;
    setC((x) => ({ ...x, pages: [...(x.pages?.length ? x.pages : [""]), ""], body: [...(x.pages?.length ? x.pages : [""]), ""].join("\n\n") }));
    setEditPage(pages.length);
  };

  const addImages = async (fs: FileList | null) => {
    if (!fs) return;
    const urls = await Promise.all([...fs].map(readFile));
    setC((x) => ({
      ...x,
      images: [...x.images, ...urls],
      imagePages: [...(x.imagePages ?? x.images.map(() => 0)), ...urls.map(() => currentEditPage)],
    }));
  };
  const addAudio = async (fs: FileList | null) => {
    const f = fs?.[0]; if (!f) return;
    setC((x) => ({ ...x, audio: { name: f.name, src: "" }, autoplay: true }));
    const src = await readFile(f);
    setC((x) => ({ ...x, audio: { name: f.name, src } }));
  };
  const addPageAudio = async (fs: FileList | null) => {
    const f = fs?.[0]; if (!f) return;
    const src = await readFile(f);
    setC((x) => ({
      ...x,
      pageAudios: [...(x.pageAudios ?? []), { name: f.name, src }],
      audioPages: [...(x.audioPages ?? (x.pageAudios ?? []).map(() => 0)), currentEditPage],
    }));
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/40 p-4" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...c,
            recipient: c.recipient?.trim() || "you",
            author: c.author?.trim() || author || "Traveler",
          });
        }}
        className="max-h-full w-full max-w-lg space-y-4 overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lift">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">{initial ? "Edit postcard" : "New postcard"}</h2>
          <div className="flex gap-1">
            <IconBtn label="Theme customizer" onClick={() => setShowTheme((v) => !v)}><Palette /></IconBtn>
            <IconBtn label="Close" onClick={onClose}><X /></IconBtn>
          </div>
        </div>

        <button type="button" aria-expanded={previewExpanded}
          aria-label={previewExpanded ? "Collapse postcard preview" : "Expand postcard preview"}
          onClick={() => setPreviewExpanded((value) => !value)}
          className={`mt-${parts.canvas} mail-letter relative w-full overflow-hidden rounded-md p-3 text-left transition-all duration-300 ${previewExpanded ? "min-h-72" : "aspect-[3/2]"}`}>
          <div className={`mt-${parts.paper} preview-paper relative flex h-full flex-col overflow-hidden rounded-sm p-4`} style={postcardTextStyle(th, c.bodyStyle)}>
            <div className="flex items-center justify-between gap-2 pr-10 text-[10px] uppercase tracking-widest opacity-60">
              <span className="truncate">Preview · {mailTheme(parts.canvas).label}</span>
              <span className="shrink-0">To: {c.recipient?.trim() || "you"} · From: {c.author?.trim() || author || "Traveler"}</span>
            </div>
            <span className={`mt-${parts.emblem} absolute right-4 top-4 text-xl`} aria-hidden="true">{mailTheme(parts.emblem).emoji}</span>
            <h3 className="m-head mt-2 text-2xl leading-tight" style={{ fontFamily: MAIL_TITLE_FONTS[parts.titleFont].family }}>{c.title || "Untitled"}</h3>
            <p className={`mt-2 whitespace-pre-wrap text-sm opacity-85 ${previewExpanded ? "max-h-40 overflow-y-auto" : "line-clamp-2"}`}
              style={{ color: bodyColor, fontFamily: bodyFont }}>{currentPageText || "Your note preview"}</p>
            <div className="mt-auto">
              <div className="m-div mb-2" />
              <span className="flex items-center justify-end gap-1 pt-1 text-[10px] uppercase tracking-wide opacity-60">
                {previewExpanded ? "Collapse" : "Expand"}{previewExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
              </span>
            </div>
          </div>
        </button>

        <input autoFocus required maxLength={MAX_LETTER_TITLE_CHARACTERS} value={c.title} onChange={(e) => setC({ ...c, title: e.target.value.slice(0, MAX_LETTER_TITLE_CHARACTERS) })} placeholder="Title" className={`mt-${parts.paper} w-full border-b border-input bg-transparent py-2 text-xl outline-none focus:border-primary`} style={{ color: "var(--l-accent)", fontFamily: MAIL_TITLE_FONTS[parts.titleFont].family }}
        />
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs">
            <span className="mb-1 block font-medium text-muted-foreground">To (who to send)</span>
            <input
              value={c.recipient ?? ""}
              onChange={(e) => setC({ ...c, recipient: e.target.value })}
              placeholder="e.g. Es (default: you)"
              className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block font-medium text-muted-foreground">From (who it's from)</span>
            <input
              value={c.author ?? ""}
              onChange={(e) => setC({ ...c, author: e.target.value })}
              placeholder="e.g. Luxia (default: Traveler)"
              className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>
        <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm">
          <span>Sheet {currentEditPage + 1} of {pages.length}</span>
          <button type="button" disabled={pages.length >= MAX_LETTER_PAGES} onClick={addSheet}
            className="rounded-md border border-input px-2 py-1 text-xs hover:bg-muted disabled:opacity-40">Add new sheet</button>
        </div>
        <textarea maxLength={LETTER_PAGE_CHARACTERS} value={currentPageText} onChange={(e) => updatePageText(e.target.value)} rows={6} placeholder="Write on this sheet" style={{ color: bodyColor, fontFamily: bodyFont }}
          className="w-full rounded-md border border-input bg-background px-3 py-2 font-display outline-none focus:ring-2 focus:ring-ring" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Pages continue only when you add a sheet.</span>
          <span>{currentPageText.length} / {LETTER_PAGE_CHARACTERS} characters</span>
        </div>
        <section aria-label="Pre-test styling" className="space-y-2 rounded-md border border-border bg-background p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pre-test styling</h3>
            <button type="button" onClick={() => setC((x) => ({ ...x, bodyStyle: undefined }))}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">Use paper defaults</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex min-w-0 items-center justify-between gap-2 rounded-md border border-border px-2 py-1.5 text-xs">
              <span>Body color</span>
              <input aria-label="Preview body color" type="color" value={bodyColor} onChange={(e) => updateBodyStyle({ color: e.target.value })}
                className="size-7 cursor-pointer rounded border-0 bg-transparent p-0" />
            </label>
            <label className="flex min-w-0 items-center gap-2 rounded-md border border-border px-2 py-1.5 text-xs">
              <span>Body font</span>
              <select aria-label="Preview body font" value={c.bodyStyle?.font ?? "theme"}
                onChange={(e) => updateBodyStyle({ font: e.target.value === "theme" ? undefined : e.target.value as FontKey })}
                className="min-w-0 flex-1 bg-transparent text-right outline-none">
                <option value="theme">Paper default</option>
                {Object.entries(FONTS).map(([key, font]) => <option key={key} value={key}>{font.label}</option>)}
              </select>
            </label>
          </div>
          <p className="text-[11px] text-muted-foreground">Changes preview on the card above and are saved with this note.</p>
        </section>
        {pages.length > 1 && (
          <div className="flex items-center justify-between gap-2 text-sm">
            <button type="button" disabled={currentEditPage === 0} onClick={() => setEditPage((p) => Math.max(0, p - 1))}
              className="rounded-md border border-input px-3 py-1.5 disabled:opacity-40">Previous sheet</button>
            <span className="text-muted-foreground">{pages.filter(Boolean).length} written</span>
            <button type="button" disabled={currentEditPage === pages.length - 1} onClick={() => setEditPage((p) => Math.min(pages.length - 1, p + 1))}
              className="rounded-md border border-input px-3 py-1.5 disabled:opacity-40">Next sheet</button>
          </div>
        )}

        {showTheme && (
          <div className="space-y-3 rounded-md border border-border bg-background p-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground"><Crown className="size-3.5 text-amber-600" />Combine postcard elements</p>
              <span className="text-[10px] text-muted-foreground">{STANDARD_MAIL_THEMES.length} standard · {PREMIUM_MAIL_THEMES.length} premium · {STRICT_MAIL_THEMES.length} strict</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {([
                ["canvas", "Outer canvas", parts.canvas],
                ["paper", "Letter paper", parts.paper],
                ["emblem", "Stamp & emblem", parts.emblem],
              ] as const).map(([part, label, value]) => (
                <label key={part} className="min-w-0 text-xs">
                  <span className="mb-1 block text-muted-foreground">{label}</span>
                  <select aria-label={label} value={value} onChange={(e) => updateThemePart(part, e.target.value as MailKey)}
                    className="w-full rounded-md border border-input bg-card px-2 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring">
                    <optgroup label={`Standard · ${STANDARD_MAIL_THEMES.length} themes`}>
                      {STANDARD_MAIL_THEMES.map((preset) => <option key={preset.key} value={preset.key}>{preset.emoji} {preset.label}</option>)}
                    </optgroup>
                    <optgroup label={`Premium · ${PREMIUM_MAIL_THEMES.length} exclusive`}>
                      {PREMIUM_MAIL_THEMES.map((preset) => <option key={preset.key} value={preset.key}>✦ {preset.emoji} {preset.label}</option>)}
                    </optgroup>
                    <optgroup label={`Strict Sector · ${STRICT_MAIL_THEMES.length} extra animations`}>
                      {STRICT_MAIL_THEMES.map((preset) => <option key={preset.key} value={preset.key}>⚡ {preset.emoji} {preset.label}</option>)}
                    </optgroup>
                  </select>
                </label>
              ))}
              <label className="min-w-0 text-xs">
                <span className="mb-1 block text-muted-foreground">Title font</span>
                <select aria-label="Title font style" value={parts.titleFont} onChange={(e) => updateThemePart("titleFont", e.target.value as MailKey)}
                  className="w-full rounded-md border border-input bg-card px-2 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring">
                  <optgroup label={`Standard title fonts · ${STANDARD_MAIL_THEMES.length}`}>
                    {STANDARD_MAIL_THEMES.map((preset) => <option key={preset.key} value={preset.key}>{MAIL_TITLE_FONTS[preset.key].label} · {preset.label}</option>)}
                  </optgroup>
                  <optgroup label={`Premium title fonts · ${PREMIUM_MAIL_THEMES.length}`}>
                    {PREMIUM_MAIL_THEMES.map((preset) => <option key={preset.key} value={preset.key}>✦ {MAIL_TITLE_FONTS[preset.key].label} · {preset.label}</option>)}
                  </optgroup>
                  <optgroup label={`Strict Sector title fonts · ${STRICT_MAIL_THEMES.length}`}>
                    {STRICT_MAIL_THEMES.map((preset) => <option key={preset.key} value={preset.key}>⚡ {MAIL_TITLE_FONTS[preset.key].label} · {preset.label}</option>)}
                  </optgroup>
                </select>
              </label>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input py-3 hover:bg-muted">
            <ImageIcon className="size-4" />Add photos
            <input type="file" accept="image/*" multiple hidden onChange={(e) => addImages(e.target.files)} />
          </label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input py-3 hover:bg-muted">
            <Music className="size-4" />{c.audio ? "Replace theme audio" : "Add theme audio"}
            <input type="file" accept="audio/*" hidden onChange={(e) => addAudio(e.target.files)} />
          </label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input py-3 hover:bg-muted">
            <Music className="size-4" />Add page audio
            <input type="file" accept="audio/*" hidden onChange={(e) => addPageAudio(e.target.files)} />
          </label>
        </div>
        {c.audio && (
          <div className="flex items-center justify-between rounded-md bg-secondary px-3 py-2 text-sm">
            <span className="truncate"><Music className="mr-1 inline size-4" />{c.audio.name}</span>
            <span className="flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-1 text-xs">
                <input type="checkbox" checked={!!c.autoplay} onChange={(e) => setC({ ...c, autoplay: e.target.checked })} />Autoplay
              </label>
              <button type="button" aria-label="Remove audio" onClick={() => setC({ ...c, audio: undefined })}><X className="size-4" /></button>
            </span>
          </div>
        )}
        {(c.pageAudios?.length ?? 0) > 0 && (
          <div className="space-y-2 rounded-md border border-border bg-background p-3 text-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Page audio pins</p>
            {c.pageAudios!.map((audio, i) => (
              <div key={`${audio.name}-${i}`} className="flex items-center gap-2">
                <Music className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{audio.name}</span>
                <select aria-label={`Assign audio ${i + 1} to sheet`} value={c.audioPages?.[i] ?? 0}
                  onChange={(e) => setC({ ...c, audioPages: c.pageAudios!.map((_, j) => j === i ? Number(e.target.value) : (c.audioPages?.[j] ?? 0)) })}
                  className="rounded border border-input bg-background px-1 py-0.5 text-xs">
                  {pages.map((_, pageIndex) => <option key={pageIndex} value={pageIndex}>Sheet {pageIndex + 1}</option>)}
                </select>
                <button type="button" aria-label="Remove page audio" onClick={() => setC({
                  ...c,
                  pageAudios: c.pageAudios!.filter((_, j) => j !== i),
                  audioPages: (c.audioPages ?? c.pageAudios!.map(() => 0)).filter((_, j) => j !== i),
                })}><X className="size-4" /></button>
              </div>
            ))}
          </div>
        )}
        {c.images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {c.images.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} alt="" className="size-16 rounded object-cover" />
                <select aria-label={`Assign image ${i + 1} to sheet`} value={c.imagePages?.[i] ?? 0}
                  onChange={(e) => setC({ ...c, imagePages: c.images.map((_, j) => j === i ? Number(e.target.value) : (c.imagePages?.[j] ?? 0)) })}
                  className="mt-1 w-16 rounded border border-input bg-background px-1 py-0.5 text-[10px]">
                  {pages.map((_, pageIndex) => <option key={pageIndex} value={pageIndex}>Sheet {pageIndex + 1}</option>)}
                </select>
                <button type="button" aria-label="Remove photo" onClick={() => setC({ ...c, images: c.images.filter((_, j) => j !== i), imagePages: (c.imagePages ?? c.images.map(() => 0)).filter((_, j) => j !== i) })}
                  className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-foreground text-background"><X className="size-3" /></button>
              </div>
            ))}
          </div>
        )}
        <ChildEnvelopeEditorList
          childEnvelopes={c.childEnvelopes}
          currentSheet={currentEditPage}
          defaultAuthor={author || "Traveler"}
          defaultRecipient={defaultRecipient || "you"}
          onChange={(childEnvelopes) => setC((prev) => ({ ...prev, childEnvelopes }))}
        />

        <button disabled={!!c.audio && !c.audio.src} className="w-full rounded-md bg-primary py-2.5 font-medium text-primary-foreground disabled:opacity-50">
          {initial ? "Save changes" : "Send to diary"}
        </button>
      </form>
    </div>
  );
}

function MiniCal({ cards, day, setDay }: { cards: Postcard[]; day: string | null; setDay: (d: string | null) => void }) {
  const [m, setM] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const has = useMemo(() => new Set(cards.map((c) => dayKey(c.createdAt))), [cards]);
  const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  const lead = m.getDay();
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-2 flex items-center justify-between text-sm">
        <button aria-label="Previous month" onClick={() => setM(new Date(m.getFullYear(), m.getMonth() - 1, 1))}><ChevronLeft className="size-4" /></button>
        <span className="font-display">{m.toLocaleString(undefined, { month: "long", year: "numeric" })}</span>
        <button aria-label="Next month" onClick={() => setM(new Date(m.getFullYear(), m.getMonth() + 1, 1))}><ChevronRight className="size-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {"SMTWTFS".split("").map((d, i) => <span key={i} className="text-muted-foreground">{d}</span>)}
        {Array.from({ length: lead }).map((_, i) => <span key={"b" + i} />)}
        {Array.from({ length: days }, (_, i) => {
          const k = `${m.getFullYear()}-${m.getMonth()}-${i + 1}`;
          const sel = day === k;
          return (
            <button key={k} onClick={() => setDay(sel ? null : k)}
              className={`relative aspect-square rounded ${sel ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              {i + 1}
              {has.has(k) && !sel && <span className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
