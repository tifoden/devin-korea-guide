# Official product-page replicas

`/features/{cloud,desktop,cli,mobile,review,security,oncall}/` are Korean replicas of the official pages
(devin.ai/cloud, /desktop, /cli, /mobile, /security, /oncall and app.devin.ai/review), verified 2026-11-09 KST.

- `src/<page>-main.html` — captured official `<main>` DOM (scroll-revealed, full page).
- `i18n/<page>.json` — exact-text English → Korean map. Unmapped strings are reported by `build.py` (code/diff content is left in English on purpose).
- `asset-map.json` — official asset URL → local file under `src/assets/official/`.
- `build.py` — emits `src/_includes/replica/<page>.html`: translation, local assets, link rewrites, static animation state,
  Mobile/Review form → external link, and accessibility adaptations (contrast, tab stops, single h1, no fake buttons).
- `build-css.mjs` / `build-app-css.mjs` — scope official CSS under `.official` / `.official-app`.
- `tools/` — capture and diagnostic scripts (official/ours screenshots, axe and font diagnostics) run against the CDP browser.

Rebuild: `python3 replica/build.py && npm run build`.
