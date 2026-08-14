# Ai Bina — Hebrew AI News Blog — Implementation Plan (Static HTML)

**Goal:** A Vercel-deployed, Hebrew (RTL) plain-HTML blog named **Ai Bina** that publishes weekly AI-news summary posts, styled with a dark neon look matching the provided logo. No build tooling — plain `.html`/`.css` files served as-is.

**Architecture:** Zero-build static site. One shared stylesheet (`assets/style.css`). Each weekly post is its own hand-written `posts/YYYY-MM-DD.html` file that duplicates the shared header/footer markup (accepted tradeoff — no templating layer). `index.html` lists all editions and is updated by hand each week. `vercel.json` enables clean URLs (`/posts/2026-08-14` instead of `.html`). Weekly update = copy the previous post file, edit the content, add a link on `index.html`, `git push` (Vercel auto-deploys).

> **Note:** an earlier draft of this plan used Next.js. The user explicitly chose plain static HTML instead — no npm, no framework, no build step — accepting that each new week means copying the previous post file and hand-editing the homepage list.

**Tech Stack:** HTML5, one CSS file (no preprocessor), Google Fonts (`Secular One` + `Heebo`) via `<link>`, Vercel static hosting.

**Spec:** No separate spec document. Requirements captured in "Source Requirements" below.

## Source Requirements (from the user)

1. Blog for the **Ai Bina** brand, deployed on **Vercel**.
2. Entirely in **Hebrew** (RTL) — UI chrome and content.
3. Visual identity from `assets/ai_bina_logo.jpeg` (neon wordmark) and `assets/main_picture.jpeg` (hero image with Rafael branding — intentional, see Audience note).
4. Content: weekly AI-news summary posts. First post's content is the full text of `/Users/alexkomanov/Downloads/ai_news_summary_he.md` (26 items in 3 categories).
5. Updated **once a week** — workflow documented in `UPDATING.md`.
6. **Plain static HTML** — no framework, no build tooling.
7. Readers are the Rafael team, but treat this as a **regular public blog** — no access protection, nothing sensitive.
8. Git remote: `https://github.com/AlexKomanov/ai-bina.git`.

## Design Direction

Same neon identity as the logo: glowing cyan/blue letterforms with a purple tint on near-black.

- Tokens: `--bg:#05060a` `--surface:#0d1220` `--border:#1c2a45` `--text:#e6edf7` `--muted:#8b9bb8` `--neon-cyan:#38e1ff` `--neon-blue:#4f8dff` `--neon-purple:#a855f7`.
- Type: **Secular One** for display/headings (used sparingly), **Heebo** for body text.
- Signature element: a thin animated cyan→blue→purple gradient line under the sticky header (the "power cable" feeding the sign), frozen under `prefers-reduced-motion`.
- Restraint: hero image + signature line are the only loud elements; cards and body text stay flat and calm.
- Bidi: English/code terms inside Hebrew sentences wrapped in `<code>` get `direction:ltr; unicode-bidi:isolate` so they don't scramble; plain embedded Latin words (model names) rely on the browser's own bidi algorithm, which handles short Latin runs inside RTL text correctly without extra markup.

## File Structure (end state)

```
ai-bina/
├── PLAN.md
├── UPDATING.md
├── vercel.json                  # cleanUrls: true
├── index.html                   # hero + editions list
├── posts/
│   └── 2026-08-14.html          # first weekly post
├── assets/
│   ├── style.css                # shared stylesheet
│   ├── ai_bina_logo.jpeg        # existing — referenced directly
│   ├── main_picture.jpeg        # existing — referenced directly
│   └── ...                      # other existing images, unused, left as-is
```

---

### Task 1: Shared stylesheet

**Files:** Create `assets/style.css`

Implements every token and rule from "Design Direction": CSS custom properties, `.neon-text`, `.neon-line` (with `@keyframes neon-flow` and `prefers-reduced-motion` override), `code`/`.ltr` bidi isolation, header/footer layout, hero image framing, edition-card hover glow, `.post-body` typography (`h2` purple category headings, `h3` cyan item headings, `p`, `strong`), responsive breakpoint for narrow screens, visible `:focus-visible` outline.

- [ ] Write `assets/style.css`.
- [ ] Commit: `git add assets/style.css && git commit -m "feat: shared neon RTL stylesheet"`

### Task 2: Homepage

**Files:** Create `index.html`

`<html lang="he" dir="rtl">`; `<head>` with charset, viewport, title "Ai Bina — חדשות AI", meta description, Google Fonts preconnect + `<link>` for Secular One + Heebo, `<link rel="stylesheet" href="/assets/style.css">`. Body: sticky header (logo linking to `/`, tagline, `.neon-line`), hero image (`/assets/main_picture.jpeg`), "גיליונות שבועיים" heading, `<ul>` of edition cards (one entry: 2026-08-14, linking to `/posts/2026-08-14`), footer.

- [ ] Write `index.html`.
- [ ] Commit: `git add index.html && git commit -m "feat: homepage with hero and editions list"`

### Task 3: First weekly post

**Files:** Create `posts/2026-08-14.html`

Same header/footer as `index.html`. Article: back-link to `/`, `<h1 class="neon-text">` "סיכום חדשות ה־AI — שבוע 14 באוגוסט 2026", then the **full, verbatim** content of `/Users/alexkomanov/Downloads/ai_news_summary_he.md` (26 items) transcribed to semantic HTML: each `##` category → `<h2>`, each `### N. Title` → `<h3>N. Title</h3>`, each item's sentence group → one `<p>` with `<br>` between sentences (preserving the source's line-break structure), `**bold**` → `<strong>`, `` `code` `` → `<code>`. No paraphrasing — every fact, name, and number from the source file must appear unchanged.

- [ ] Write `posts/2026-08-14.html`.
- [ ] Verify against source: every one of the 26 `### N.` headings present, in order, with matching category groupings.
- [ ] Commit: `git add posts/2026-08-14.html && git commit -m "feat: first weekly post — 2026-08-14 edition"`

### Task 4: Clean URLs + weekly workflow doc

**Files:** Create `vercel.json`, `UPDATING.md`

`vercel.json`: `{ "cleanUrls": true, "trailingSlash": false }` so `/posts/2026-08-14.html` serves at `/posts/2026-08-14`.

`UPDATING.md` (Hebrew): weekly steps — copy `posts/<last-date>.html` to `posts/<new-date>.html`, replace the `<h1>` title and the article body content, add a new `<li>` card at the top of `index.html`'s edition list linking to `/posts/<new-date>`, preview with `open index.html` or `npx serve`, then `git add -A && git commit -m "post: גיליון <date>" && git push` for Vercel to auto-deploy.

- [ ] Write `vercel.json`.
- [ ] Write `UPDATING.md`.
- [ ] Commit: `git add vercel.json UPDATING.md && git commit -m "chore: clean URLs and weekly update workflow"`

### Task 5: Local verification

- [ ] Serve the directory locally (`npx serve .` or `python3 -m http.server`) and check: homepage renders RTL with hero + logo + animated line; `/posts/2026-08-14` (or `/posts/2026-08-14.html` if not using the dev server's clean-URL rewriting) renders all 26 items grouped under 3 category headings; embedded English terms and `<code>` spans read correctly inside RTL sentences; page is usable on a narrow (mobile-width) viewport.
- [ ] Fix any issues found, commit fixes.

### Task 6: Deploy to Vercel

- [ ] `git push -u origin main` to `https://github.com/AlexKomanov/ai-bina.git`.
- [ ] Deploy preview: `npx vercel deploy --yes` (login with `npx vercel login` first if needed — user email akomanov88@gmail.com). Open the preview URL, verify homepage and `/posts/2026-08-14`.
- [ ] Deploy production: `npx vercel deploy --prod --yes`. Report the URL.
- [ ] Connect GitHub → Vercel (`npx vercel git connect https://github.com/AlexKomanov/ai-bina.git`, or via the Vercel dashboard) so future `git push` to `main` auto-deploys — this is what `UPDATING.md`'s weekly workflow relies on.
- [ ] No access protection — public blog, as decided.
