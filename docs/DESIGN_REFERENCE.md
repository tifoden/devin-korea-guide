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

## 6a. Navigation (re-measured 2026-11-09 ~22:00 KST on devin.ai/, /pricing, /desktop at 1440×900; `replica/tools/_navmeasure.mjs`, `_navstates.mjs`)

| Item | Observed (devin.ai) | Implementation |
| --- | --- | --- |
| Bar | product pages: fixed 52px; home: 94px incl. a promo announcement strip | `.site-header` sticky 52 / 60. The announcement strip is **not** reproduced (it is a credits promotion; see owner rule) |
| Logo | `h-5 w-[76px]` → 76×20px | Owner-supplied `src/assets/brand/devin-korea-logo.svg` (unmodified, 773×120 viewBox) as `<img alt="Devin 한국어 가이드">`, `height: 20px` (≈129px wide). Footer uses the same file at 32px. Favicon unchanged |
| Item text | 14px, weight 400, letter-spacing normal, line-height 19.6px, colour `#000` (`#191919` on /pricing) | `.nav-link` 14px / 400 / normal / 19.6px, `--black`. Identical on all five tabs (test `navstyle/desktop …`) |
| Item box | h 28, radius 200px. Links `padding: 1px 12px 0`; dropdown buttons `1px 8px 0 12px` (+ chevron, 4px gap) | same values: `.nav-link` `1px 12px 0`, `.nav-trigger` `1px 8px 0 12px` |
| Hover | background `rgba(0,0,0,.06)`, colour unchanged, `color, background-color .15s cubic-bezier(.4,0,.2,1)` | same |
| Open trigger | same `rgba(0,0,0,.06)` while `aria-expanded="true"` | same |
| Current page | none: on /pricing the Pricing link has transparent bg, weight 400, no underline, no `aria-current` | **no visual current state at all** (previous `.06` pill and mobile dot removed). `aria-current="page"` kept for assistive tech only |
| Items | Product · Solutions · Resources (dropdowns) · Customers · Pricing · Blog | `src/_data/nav.js`: 개요(/ — the home replica; logo also links /) · 제품 ▾ · 모델 ▾ · 활용사례 · 스타트업 프로그램. "시작하기" removed from the bar (first-task guide linked from the footer and the home note). Rule unchanged: add an entry only when its page or section exists |
| Mobile | 36px menu button, full-height panel | unchanged; both dropdowns are accordions inside the disclosure menu |

### 6b. Product / Models dropdowns (observed 2026-11-09 KST; adapted)

| Aspect | Official (observed) | This guide |
| --- | --- | --- |
| Open | mouse hover opens (`aria-expanded="true"` on hover), click also opens; Escape closes | mouse hover opens on `(hover: hover) and (pointer: fine)` desktops, leave closes after 150ms; click / Enter / Space / ArrowDown open; Escape closes and returns focus; outside click and Tab-out close; touch = tap only. Only one panel open at a time |
| Motion | popup opacity / height / translate `.1s cubic-bezier(0,0,.2,1)`; backdrop `blur(4px)` fading over .1s | unchanged from the motion pass (§7): opacity + 4px translate .1s, same scrim |
| Groups | one sheet: Surfaces · Features · Platform · **Models** (Fusion → /fusion, SWE → cognition.com/blog/swe-2, Evals → cognition.com/frontiercode) | 제품: 사용 환경 · 업무 기능 · 전체 보기. 모델 (separate trigger per owner request): 모델 선택 → Fusion (/models/fusion/), 타사 모델 (/models/third-party/, owner-supplied subtitle kept verbatim incl. "SpaceXSI") · SWE 계열 → SWE-2, SWE-2 Flash, SWE-1.7 · 보조 모델 (anchors on /models/) · 모델 개요 전체 보기 |
| Group heading | 14px / 400, `oklab(0 0 0 / .56)`, no uppercase | 14px / 400, `--text-secondary` (raised for 4.5:1) |
| Link | 16px / 400, `#000`, padding `4px 0`, radius 4px; hover colour `rgb(49,124,255)`, no background | 16px label, hover colour `#317cff`, no background, no current-page background; plus a 13px Korean description and 44px touch target |
| Panel | full-width sheet | anchored 560px card (fewer links) |

### 6c. Home and model routes (2026-11-09 KST)

- `/` is now a Korean replica of https://devin.ai/ (`replica/src/home-main.html`, `replica/i18n/home.json`, layout `replica.njk`): hero + product collage, customer logo marquee, "동료들이 가장 아끼는 동료" 5-card grid, 01–04 workflow sections, integrations grid, Recently shipped list, enterprise security grid, final CTA — official order, local assets (`src/assets/official/`), official animations, reduced motion honoured. The promo announcement strip lives in the official header, outside `<main>`, and is not reproduced.
- `/` is the 개요 tab (owner decision 2026-11-09). The old guide overview content was deleted; `/overview/` is a static redirect to `/` (meta refresh + `location.replace`, `noindex`, canonical `/`), and footer links to it were removed.
- `/models/third-party/` is a white landing page (not a replica): official utilities (`page-container`, `text-h2`, bordered sections, 42px pill CTAs) plus `.tp-*` cards/chips in `site.css`. Data: `src/_data/thirdPartyModels.js`, the 259 TEAMS_TIER_PRO labels from the docs page's `modelCostData`, grouped into 53 families across 9 providers (Cognition, Anthropic, OpenAI, Google, xAI, DeepSeek, Kimi, GLM, NVIDIA). Variant suffixes render as chips; `is_recommended` renders as 문서 추천. Prices and promo windows are not shown (only the owner-requested SWE-2 / SWE-2 Flash availability notes).
- `/models/fusion/` replicates https://devin.ai/fusion. No dedicated SWE page exists (`devin.ai/swe`, `/swe-2`, `/models`, `/evals` → 404; the official nav links SWE to a blog post), so SWE stays as anchored sections on `/models/`.
- Official mock UIs are drawn at a fixed pixel size and scaled into an `aspect-ratio` box by JS on devin.ai. `build.py` marks them `data-fit-w` and `motion.js` rescales with a ResizeObserver so they shrink on mobile like the official page.
- Home Slack-thread link colour `#088bd7` (3.6:1) darkened to `#0b6aa6` for AA.

## 7. Motion (measured 2026-11-09 KST, Chrome via CDP, 1440×900 and 390×844)

Measured with `replica/tools/_motion.mjs`, `_motion2.mjs`, `_panel2.mjs` and `_stack.mjs` (computed styles sampled every animation frame or every ~50 ms). Raw JSON is kept outside the repo in `research/motion/`.

| Area | Observed on devin.ai | Used in this guide |
| --- | --- | --- |
| Default transition | `--default-transition-duration: .15s`, `cubic-bezier(.4,0,.2,1)` | `--ease` = same curve; `--dur: .2s` for links/buttons (official buttons use `duration-200`) |
| Button / nav hover | opacity → `.8` (`hover:opacity-80`), 0.2s; secondary text colour fades to 56% black | Unchanged: primary button and links fade to `.8` |
| Header | product pages: fixed, 52px, `#f8f8f8`, no blur, no border. Home: 94px including the announcement strip | Sticky, `--header-h` unchanged (guide header, not the official one) |
| Product dropdown | Base UI popup: full-width sheet under the bar; `opacity`, `height`, `translate` 0.1s `cubic-bezier(0,0,.2,1)`; enters from 4px above (top 48→52px); fixed backdrop with `backdrop-filter: blur(4px)` fading in over 0.1s, `pointer-events: none`; closes in ~0.1s | Card-style panel kept (grouped layout from §6b). Desktop: `opacity` + `translate: 0 -4px` 0.1s `--ease-out` with `@starting-style` and `display … allow-discrete` so it also animates out; new `.nav-scrim` (blur 4px, 0.1s fade, no pointer events). Mobile menu unchanged (no motion observed there worth copying) |
| Page / route transitions | None (full page loads, no View Transitions) | None |
| Hero text | No entrance animation: h1, lead and buttons are opacity 1 from the first frame | None on text |
| Product mock rows (Desktop) | Rows start at `opacity:0; translateY(8px)` (a card at 6px), inline `transition: opacity .45s <delay>, transform .45s` with delays .08s, .17s, .26s…; triggered as soon as the group enters the viewport (sampled at 98% viewport height); ~450 ms `ease` | `data-reveal` from the capture; `motion.js` observes each group (`IntersectionObserver`, threshold 0, rootMargin −8% bottom); same 0.45s `ease`, official per-row delays; rows already on screen at load are left static |
| Stacked cards (Cloud) | `lg:` sticky cards pinned at 120 + 24px·n; white overlay opacity grows 0.1 per 100px scrolled after a card pins, capped at .95/.95/.9/.45/0 | Same rule in `motion.js` (caps read from the capture as `data-dim-cap`); off when the container is not sticky (mobile) |
| FAQ (Desktop, CLI) | Div rows, `grid-template-rows` 0fr↔1fr 0.2s ease-out + answer opacity 0.2s; plus/minus icon swaps | Same classes toggled by `motion.js`; rows get `role="button"`, `tabindex=0`, `aria-expanded`, `aria-controls`; closed answers are `inert`; Enter/Space work |
| FAQ (Security) | Native `<details>`; 64→182px with no height animation | Native `<details>`, unchanged |
| Security workflow | `Vj0Jqq_triage-stream` 6.4s linear infinite, `Vj0Jqq_remediate-sequence` 8s, `@property --security-triage-progress`; official CSS disables them under reduced motion | Static override removed, official animation runs; disabled under reduced motion by the official rule |
| Logo marquees / home collage | `new-home-logo-scroll` linear infinite 54s, 67.5s, 108s, 114s; `hero-collage-pan` 55–242s; `hm-shimmer` 2.5s, `pulse` 2s, `shine` 5s, `sc-blink` .8s | Replica pages keep whatever official classes they contain. The guide home has no logo strip (no customer claims on the home page), so no marquee was added |
| Home preview window | (official equivalent: animated product mocks; `dt-fade-in-up` keyframes .35s, 6px) | Chapter rows use `dt-fade-in-up` .35s `--ease-out`, 120ms + 40ms·n stagger, once at load; status dot uses official `pulse` 2s `cubic-bezier(.4,0,.6,1)` |
| Counters | None found animating (numbers are static text) | None |
| Reduced motion | Official CSS stops its own keyframe animations | Global rule: transitions off, animations reduced to .01ms × 1; no reveals (content shown immediately), no scrim |

Layout stability: all motion uses `opacity`/`transform`/`translate` only. Cumulative Layout Shift measured by `tests/motion.mjs` while loading and scrolling each page stays below 0.03.

## 8. Deliberately not reused

Devin logo mark, customer logos, product screenshots, "Download/Login/Get a demo" calls to action, and pricing. These would imply an official publication, an endorsement, or functions that this site doesn't have.
