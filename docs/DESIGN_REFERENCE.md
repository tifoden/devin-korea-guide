# Design reference — devin.ai/desktop

- **Source:** https://devin.ai/desktop
- **Observed:** 2026-11-07, about 23:40 KST, in Chrome via Playwright (`getComputedStyle`, `document.fonts`, `performance` resource entries) at 1440×900 and 390×844, plus the public stylesheet `https://devin.ai/_next/static/immutable/chunks/02b76k-oyybfy.css`.
- **Permission:** the site owner (Jaden, official Korean Devin ambassador) confirmed permission to reuse official styling, components and fonts. This guide is still an ambassador-led draft, not a Cognition publication. It does not use the Devin logo mark, customer logos, or product screenshots.

Labels used below:

- **Observed**: value read from computed styles or the public CSS.
- **Adapted**: observed value changed on purpose, for Korean text or WCAG 2.2 AA contrast. The reason is noted.
- **Inferred**: not measured directly; chosen to fit the observed system.

## 1. Fonts

| Role | Observed declaration | Used here |
| --- | --- | --- |
| Heading and body | `--font-heading` / `--font-body`: `var(--font-nb-international-pro), system-ui, sans-serif` → computed `nbInternationalPro, "nbInternationalPro Fallback", system-ui, sans-serif` | **Adapted (owner decision, 2026-11-07):** `"Pretendard Variable", Pretendard, …system Korean fonts` for all headings, body, nav, buttons, callouts and labels. NB International Pro is not loaded. |
| Mono labels | `--font-mono`: `var(--font-geist-mono), ui-monospace, monospace` | `geistMono` (self-hosted from the `geist` npm package, OFL 1.1), **only** for code, URLs and numerals (TOC/tab numbers). Labels that contain Korean (`.mono-label`, badges, breadcrumb, note labels, table headers) use `--font-label: var(--font-body)` at the observed 12px / .03em. |
| Product UI (inside screenshots) | `--font-product-sans`: `inter`, `interLatinExt`; `--font-product-mono`: `ibmPlexMono` | Not used. Our pages show no product UI. |
| Serif | `stkBureauSerif` is declared but no visible text used it on this page | Not used |

Observed `@font-face` rules (public CSS):

```css
@font-face{font-family:nbInternationalPro;src:url(../media/NBInternationalPro_Light-s.p.2ha41b_ddzi59.woff2)format("woff2");font-display:swap;font-weight:300;font-style:normal}
@font-face{font-family:nbInternationalPro;src:url(../media/NBInternationalPro_Regular-s.p.1zobv4yb0l45-.woff2)format("woff2");font-display:swap;font-weight:400 500;font-style:normal}
@font-face{font-family:nbInternationalPro Fallback;src:local(Arial);ascent-override:93.12%;descent-override:25.18%;line-gap-override:0.0%;size-adjust:102.45%}
@font-face{font-family:geistMono;src:url(../media/GeistMono_Regular-s.p.2tw7uc71e2v7r.woff2)format("woff2");font-display:swap;font-weight:400;font-style:normal}
```

Files served at runtime: `https://devin.ai/_next/static/immutable/media/NBInternationalPro_{Light,Regular}-….woff2` and `GeistMono_Regular-….woff2`.

Font file metadata (read with fontTools):

- `NB International Pro`: copyright Stefan Gandl / Neubau, "All rights reserved", license URL `https://neubauladen.com/terms-and-conditions-licenses/`. The subset has 500 code points and **0 Hangul syllables**.
- `Geist Mono`: SIL Open Font License 1.1, 0 Hangul syllables.

### How the fonts are handled

- **Pretendard everywhere (adapted, owner decision):** the owner asked for one consistent face for all Korean typography. Mixing NB International Pro (Latin) with Pretendard (Hangul) inside one line gave two different x-heights and stroke weights in mixed text such as "Devin으로". All text roles now use `"Pretendard Variable"` (SIL OFL 1.1, self-hosted dynamic subset). The NB files, `npm run fonts:official` and the `@font-face` rules were removed, which also removes the commercial-redistribution question.
- **Geist Mono (observed, kept intentionally):** code, URLs and numerals only. It has no Hangul; any Hangul inside a code block falls through to Pretendard (`--font-mono: geistMono, "Pretendard Variable", …`).
- **Weights:** headings use 500 (observed NB headings are 400; Pretendard 400 at 32–40px reads lighter than NB 400, so 500 is adapted). Body 400, `strong` and note titles 600.
- `tests/browser.mjs` asserts that no NB face is loaded and that h1/h2/nav/buttons/callouts/labels/prose compute to Pretendard.

## 2. Color (observed light theme, `html.light.theme-light`)

| Token | Observed | Used as |
| --- | --- | --- |
| `--bg-page` | `252 252 252` | – |
| `--bg-wash` | `248 248 248` (also nav background) | page background |
| `--bg-elevated` | `255 255 255` | cards, windows |
| `--text-primary` | `25 25 25` | body text |
| `--text-secondary` | `25 25 25 / .56` | **adapted to `.68`**: `.56` on `#f8f8f8` measures about 4.1:1, below 4.5:1 |
| `--text-tertiary` | `25 25 25 / .4` (two-tone headings, footer links) | **adapted to `.5`** and only on large text (3.5:1). Footer links use `.68`. |
| `dt-primary` (callout border, mono label) | `rgb(49 124 255)` | borders and focus ring. **As small text, adapted to `rgb(31 95 214)`** (5.5:1), because the original measures 3.8:1. |
| `--bg-blue` / `bg-dt-primary-tint` | `51 125 244 / .1` | badge background |
| `--border-primary` | `0 0 0 / .08` | card, button, and row borders |
| `--border-secondary` | `0 0 0 / .06` | page frame and section rules |
| `--tint-*` | `0 0 0 / .08 · .06 · .04` | hover and current states (inferred use) |
| `--text-green` | `0 165 88` | status dot only |
| Primary button | `bg rgb(0 0 0)`, text white | same |

`--text-link` (`13 133 185 / .85`) measures about 3.4:1 on the page background, so links are not colored. They use primary text with an underline (offset 2px), which matches the observed "Learn more in the docs" link.

## 3. Type scale (observed utility classes)

| Class | Observed | Used here |
| --- | --- | --- |
| `.text-h1` | 40px, then 52px, then 64px (lh 1.05, then 1) · −.03em · 400 | `.t-h1`, **lh adapted to 1.15 / 1.1** for wrapped Hangul |
| `.text-h2` | 32px, then 40px · lh 1.04 · −.03em | `.t-h2`, **lh adapted to 1.2**. The page's own `<h1>` uses `text-h2`, and so do ours. |
| `.text-h3` | 24px, then 32px · lh 1.2 · −.02em | `.t-h3`, lh 1.3 |
| `.text-h4` | 20px · lh 1.2 · 0 (h3 adds −.01em) | `.t-h4`, lh 1.4 |
| `.text-16` | 16px · lh 1.4 | body UI text |
| `.text-14` | 14px · lh 1.4 | nav, footer |
| `.text-mono-12` | geistMono 12px · lh 1.4 · .03em · uppercase | `.mono-label`, badges, meta labels |
| Paragraph | 16px / 22.4px, secondary | hero lead uses 16px / 1.6 (adapted) |
| Root | 16px | same |

**Article prose (adapted):** 17px, line height 1.8, `word-break: keep-all`, measure 40rem. The official page has no long-form reading text, so the long-form Korean settings are our own. 40rem is the observed `.container` step.

## 4. Layout

| Item | Observed | Used here |
| --- | --- | --- |
| `.page-container` | max-width 1400px · padding-inline 20px, then 40px, then 60px | same. The breakpoints are 48rem and 64rem (inferred from Tailwind `md`/`lg` class names). |
| Page frame | `lg:border-x` 1px `border-secondary`, padding 60px 16px (`py-12` on mobile) | `.frame` |
| Section rules | full-width `border-top`/`border-y` 1px `rgba(0,0,0,.06)` | `.band` |
| Hero | `pt-[100px] lg:pt-[140px]` measured from the viewport top (nav is `position: fixed`, 52px) | Our header is sticky (in flow), so hero padding is 40px / 64px / 88px after a 60px / 52px header. Measured H1 top: **140px desktop, 100px mobile — identical to official.** |
| Two-tone heading + content split | heading left, content right | `.split` 5fr / 7fr (inferred ratio) |
| Feature pair grid | `gap-x-2 gap-y-[60px] grid-cols-2`; h3 `text-h4 mb-2` | `.columns` (3 columns, gap 24px) |
| FAQ rows | `border-t pt-10 pb-10`, `text-h4` | `.row` (32px on desktop, 24px on mobile) |
| Pricing card grid | `gap-4` | – |

## 5. Borders and radii

- Buttons and nav buttons: `border-radius: 9999px` (computed `1.67772e+07px`). Nav links: `200px`.
- Callout, cards, badge: `4px` (`rounded`, `rounded-sm`).
- Windows: `12px` (observed `12px 0 0` where a window is clipped by the image edge). Windows that are fully visible use 12px on all corners (adapted).
- Every border is 1px.

## 6. Components

| Component | Observed | Implementation |
| --- | --- | --- |
| Primary button | black, white text, 16px, h 42, pad 0 20px | `.btn.btn--primary` |
| Secondary button | transparent, 1px `rgba(0,0,0,.08)`, text `25 25 25` | `.btn.btn--secondary` |
| Small button | 14px, h 28, pad 0 12px 1px | `.btn--sm` |
| Nav link | 14px / 1.4, `rgb(0,0,0)`, pad 1px 12px 0, h 28, radius 200px | `.nav-link`. On mobile it is 36px tall (adapted for touch). |
| Callout | 1px `rgb(49,124,255)`, 4px, pad 12px, mono label | `.callout` |
| Badge | mono 12px, pad 6px, `bg-dt-primary-tint`, 4px | `.badge` (pad 4px 6px) |
| Card | white, 1px `black/8`, 4px, pad 24px | `.card` |
| Window | white, 1px `.08`, 12px, 47px title bar, pad 0 8px, gap 12px | `.window`, exercise notes, code blocks |
| Footer | headings 14px primary; links 14px `.4` | headings same; links `.68` (adapted) |
| Focus | `focus-visible:outline-2 outline-solid outline-offset-4 outline-text-accent-primary` | `:focus-visible { outline: 2px solid accent; outline-offset: 4px }` |
| Icons | SVG icons (`/assets/images/desktop/hero/icons/*.svg`) inside product UI | Not used. Arrows are text glyphs (→ ↗). |
| Background image | `/assets/images/new-home/graphic-backgrounds/bg-1.jpg` behind product windows | Reused behind the home preview window (`src/assets/img/devin-bg-1.jpg`) |

## 6a. Navigation (observed + adapted)

| Item | Observed (devin.ai/desktop) | Implementation |
| --- | --- | --- |
| Bar | `nav.fixed … bg-dt-bg`, h 52px desktop, 60px mobile, `rgb(248,248,248)` | `.site-header` sticky, h 52 / 60 (`--header-h`), same colour |
| Items | buttons 14px / 19.6px, h 28, pad `1px 8px 0 12px`, radius 200px | `.nav-link` 14px / 19.6px, h 28, pad `1px 12px 0`, radius 200px. Current page: `aria-current="page"` + `rgba(0,0,0,.06)` pill. |
| Item source | Product / Solutions / Resources / … dropdowns | `src/_data/nav.js`. **Rule: add an entry only when its page or section exists.** Today: 개요(/), 가이드(/guides/first-task/), 다룰 내용(/#roadmap), 편집 기준(/#editorial). No dropdowns until there are ≥2 pages per group. |
| Mobile | 36px menu button, full-height panel, stacked rows with 1px separators, CTAs at bottom | `.menu-toggle` 36px disclosure (`aria-expanded`, `aria-controls`), full-height panel, 1px row rules, docs button last. Escape closes and returns focus; Tab loops inside; link click closes; resets at ≥64rem. Without JS the links stay as a horizontally scrollable row. |
| Section state | – | `assets/js/nav.js` scroll-spy sets `aria-current="location"` on in-page links (home sections, article TOC, article tabs). |
| Article section tabs (adapted) | segmented control: white active chip + 1px border, 4px radius | `.subnav` under the header on < 64rem only, generated from the article's own headings + 출처. Horizontally scrollable; the active tab scrolls into view. Desktop keeps the sticky sidebar TOC. |
| Anchor offset | – | `scroll-padding-top: header + 16px`; on mobile article pages header + tabs (45px) + 16px. Tested. |

## 7. Motion

- `--default-transition-duration: .15s`, `--default-transition-timing-function: cubic-bezier(.4,0,.2,1)`.
- Buttons use `duration-200`. Links use `transition-opacity duration-200 hover:opacity-80`.
- Used here: 0.2s with the same easing, on opacity, color and background only. No entrance or scroll animation. `prefers-reduced-motion` turns transitions off.

## 8. Deliberately not reused

Devin logo mark, customer logos, product screenshots, "Download/Login/Get a demo" calls to action, and pricing. These would imply an official publication, an endorsement, or functions that this site doesn't have.
