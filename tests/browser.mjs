// Browser checks with a real Chromium: layout overflow, axe (WCAG 2.2 AA), keyboard focus, fonts, screenshots.
// Uses CDP_URL (default http://localhost:29229) to reuse an already running Chrome.
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { serve } from "./static-server.mjs";

const ROOT = new URL("../_site/", import.meta.url).pathname;
const OUT = new URL("../screenshots/", import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const server = await serve(ROOT);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.connectOverCDP(process.env.CDP_URL || "http://localhost:29229");

const PAGES = [
  { name: "home", path: "/", nav: "개요" },
  { name: "article", path: "/guides/first-task/", nav: "" },
  { name: "features", path: "/features/", nav: "제품" },
  ...["cloud", "desktop", "cli", "mobile", "review", "security", "oncall"].map((n) => ({ name: `features-${n}`, path: `/features/${n}/`, nav: "제품" })),
  { name: "models", path: "/models/", nav: "모델" },
  { name: "models-fusion", path: "/models/fusion/", nav: "모델" },
  { name: "models-third-party", path: "/models/third-party/", nav: "모델" },
  { name: "use-cases", path: "/use-cases/", nav: "활용사례" },
  { name: "startups", path: "/startups/", nav: "스타트업 프로그램" },
];
const VIEWPORTS = [{ name: "desktop", width: 1440, height: 900, dpr: 1 }, { name: "mobile", width: 390, height: 844, dpr: 2 }];
const results = [];
let failed = 0;
const check = (label, ok, detail = "") => { results.push({ label, ok, detail }); if (!ok) failed++; console.log(`${ok ? "PASS" : "FAIL"} ${label}${detail ? " — " + detail : ""}`); };

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dpr, hasTouch: vp.name === "mobile" });
  const page = await context.newPage();
  for (const p of PAGES) {
    const tag = `${p.name}/${vp.name}`;
    const res = await page.goto(base + p.path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    check(`${tag} HTTP 200`, res.status() === 200);

    const info = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      h1: document.querySelectorAll("h1").length,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      nb: [...document.fonts].some((f) => /nbInternational/i.test(f.family)),
      uiFonts: [...document.querySelectorAll("h1, h2, .nav-link, .btn, .callout, .prose p, .note__label, .reading-guide__title, .breadcrumb ol, .meta-list dt, .src__label, .mono-label, .prose th")].map((el) => getComputedStyle(el).fontFamily.split(",")[0]).filter((f) => !/Pretendard/.test(f)),
      currentNav: [...document.querySelectorAll('.site-nav > ul > li > a[aria-current="page"], .site-nav .nav-trigger.is-current')].filter((el) => !el.classList.contains("nav-fallback")).map((el) => el.firstChild.textContent.trim()),
      panelCurrent: [...document.querySelectorAll('.nav-panel a[aria-current="page"]')].map((a) => a.getAttribute("href")),
      pretendard: [...document.fonts].some((f) => /Pretendard/.test(f.family) && f.status === "loaded"),
      mono: [...document.fonts].some((f) => f.family.replace(/"/g, "") === "geistMono" && f.status === "loaded") || (!!document.querySelector(".page-replica") && !document.querySelector("main code, main pre, main .font-mono")),
      bodyFont: getComputedStyle(document.body).fontFamily,
      proseSize: getComputedStyle(document.querySelector(".prose") || document.body).fontSize,
      smallTargets: [...document.querySelectorAll("a, button, summary")].filter((el) => {
        const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
        return r.width > 0 && s.display !== "inline" && (r.height < 24 || r.width < 24);
      }).map((el) => el.textContent.trim().slice(0, 20)),
    }));
    check(`${tag} lang=ko`, info.lang === "ko");
    check(`${tag} single h1`, info.h1 === 1, `h1=${info.h1}`);
    check(`${tag} no horizontal overflow`, info.overflow <= 0, `overflow=${info.overflow}px`);
    check(`${tag} fonts: Pretendard + Geist Mono loaded, no NB International`, !info.nb && info.pretendard && info.mono, JSON.stringify({ nb: info.nb, pretendard: info.pretendard, mono: info.mono }));
    check(`${tag} Korean UI text uses Pretendard (h1/h2/nav/buttons/callouts/prose)`, info.uiFonts.length === 0, info.uiFonts.join(", "));
    check(`${tag} nav current = ${p.nav}`, info.currentNav.join() === p.nav, info.currentNav.join());
    if (p.path.startsWith("/features/")) check(`${tag} product panel marks ${p.path} current`, info.panelCurrent.join() === p.path, info.panelCurrent.join());
    check(`${tag} block-level targets ≥ 24px`, info.smallTargets.length === 0, info.smallTargets.join(", "));
    if (p.name === "article") check(`${tag} prose font-size 17px`, info.proseSize === "17px", info.proseSize);

    await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } await new Promise((r) => setTimeout(r, 1000)); scrollTo(0, 0); });
    check(`${tag} in-view reveals all completed after scrolling`, await page.evaluate(() => [...document.querySelectorAll(".reveal-pending")].every((e) => getComputedStyle(e).opacity === "1")));
    // Contrast is checked at rest: looping official mock animations (e.g. Security remediate-sequence) pass through faded frames by design.
    await page.emulateMedia({ reducedMotion: "reduce" });
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    check(`${tag} axe WCAG A/AA violations = 0`, axe.violations.length === 0, axe.violations.map((v) => `${v.id}(${v.nodes.length})`).join(", "));

    await page.emulateMedia({ reducedMotion: null });
    await page.screenshot({ path: `${OUT}${p.name}-${vp.name}.png`, fullPage: true });
    await page.screenshot({ path: `${OUT}${p.name}-${vp.name}-fold.png` });
  }

  // Keyboard: skip link first, visible focus ring on each of the first 12 tab stops.
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => ({ cls: document.activeElement.className, top: document.activeElement.getBoundingClientRect().top }));
  check(`keyboard/${vp.name} first Tab = visible skip link`, first.cls === "skip-link" && first.top >= 0, JSON.stringify(first));
  await page.keyboard.press("Enter");
  check(`keyboard/${vp.name} skip link moves focus to main`, await page.evaluate(() => document.activeElement.id === "main"));
  const stops = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    stops.push(await page.evaluate(() => { const el = document.activeElement; const s = getComputedStyle(el); return { text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 24), outline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2 }; }));
  }
  check(`keyboard/${vp.name} focus ring on first 12 tab stops`, stops.every((s) => s.outline), stops.map((s) => `${s.text}${s.outline ? "" : "(no ring)"}`).join(" | "));
  await page.keyboard.press("Tab");
  await page.screenshot({ path: `${OUT}keyboard-focus-${vp.name}.png` });

  // Article: TOC link scrolls target into view below the sticky header; table region is focusable.
  await page.goto(base + "/guides/first-task/", { waitUntil: "networkidle" });
  const tocLink = page.locator(".toc__list a").nth(3);
  await tocLink.click();
  await page.waitForTimeout(300);
  const tocResult = await page.evaluate(() => { const id = decodeURIComponent(location.hash.slice(1)); const el = document.getElementById(id); const sub = document.querySelector(".subnav"); const header = Math.max(document.querySelector(".site-header").getBoundingClientRect().bottom, sub && sub.offsetParent ? sub.getBoundingClientRect().bottom : 0); const top = el.getBoundingClientRect().top; return { id, top: Math.round(top), header: Math.round(header) }; });
  await page.waitForTimeout(300);
  check(`article/${vp.name} TOC active state follows scroll`, await page.evaluate(() => document.querySelector(".toc__list a[aria-current]")?.hash === location.hash));
  check(`article/${vp.name} TOC link lands below sticky header`, tocResult.top >= tocResult.header && tocResult.top < 400, JSON.stringify(tocResult));
  const table = await page.evaluate(() => { const w = document.querySelector(".table-wrap"); return w ? { tabindex: w.getAttribute("tabindex"), scrollable: w.scrollWidth > w.clientWidth } : null; });
  check(`article/${vp.name} table wrapper focusable`, table && table.tabindex === "0", JSON.stringify(table));

  const below = () => page.evaluate(() => { const el = document.getElementById(decodeURIComponent(location.hash.slice(1))); const sub = document.querySelector(".subnav"); const bar = Math.max(document.querySelector(".site-header").getBoundingClientRect().bottom, sub && sub.offsetParent ? sub.getBoundingClientRect().bottom : 0); return { id: el.id, top: Math.round(el.getBoundingClientRect().top), bar: Math.round(bar) }; });
  if (vp.name === "mobile") {
    // Article section tabs
    const subVisible = await page.locator(".subnav").isVisible();
    check(`article/mobile section tabs visible`, subVisible);
    await page.goto(base + "/guides/first-task/", { waitUntil: "networkidle" });
    await page.locator(".subnav__link").nth(4).click();
    await page.waitForTimeout(600);
    const sr = await below();
    check(`article/mobile section tab lands below header + tabs`, sr.top >= sr.bar && sr.top < sr.bar + 120, JSON.stringify(sr));
    check(`article/mobile active section tab marked`, await page.evaluate(() => document.querySelector(".subnav__link[aria-current]")?.hash === location.hash));
    await page.screenshot({ path: `${OUT}article-mobile-tabs.png` });
    // Mobile menu: keyboard open, focus loop, Escape
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.focus(".menu-toggle");
    await page.keyboard.press("Enter");
    const opened = await page.evaluate(() => ({ exp: document.querySelector(".menu-toggle").getAttribute("aria-expanded"), focus: document.activeElement.textContent.trim(), panel: getComputedStyle(document.getElementById("site-menu")).display }));
    check(`menu/mobile Enter opens menu and focuses first link`, opened.exp === "true" && opened.focus === "개요" && opened.panel === "flex", JSON.stringify(opened));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}home-mobile-menu.png` });
    const n = await page.evaluate(() => [...document.querySelectorAll("#site-menu a, #site-menu button")].filter((el) => el.getClientRects().length).length);
    for (let i = 0; i < n; i++) await page.keyboard.press("Tab");
    check(`menu/mobile Tab loops back to toggle`, await page.evaluate(() => document.activeElement.classList.contains("menu-toggle")));
    await page.keyboard.press("Escape");
    const closed = await page.evaluate(() => ({ exp: document.querySelector(".menu-toggle").getAttribute("aria-expanded"), focus: document.activeElement.className }));
    check(`menu/mobile Escape closes and returns focus`, closed.exp === "false" && closed.focus === "menu-toggle", JSON.stringify(closed));
    await page.locator(".menu-toggle").click();
    const trig = page.locator("#site-menu .nav-trigger").first();
    check(`menu/mobile product group collapsed on non-product page`, (await trig.getAttribute("aria-expanded")) === "false");
    await trig.click();
    const grp = await page.evaluate(() => ({ exp: document.querySelector(".nav-trigger").getAttribute("aria-expanded"), heads: [...document.querySelectorAll(".nav-panel__heading")].filter((h) => h.getClientRects().length).map((h) => h.textContent), links: [...document.querySelectorAll(".nav-panel__link")].filter((a) => a.getClientRects().length).length, overflow: document.getElementById("site-menu").scrollWidth - document.getElementById("site-menu").clientWidth }));
    check(`menu/mobile tap expands grouped product list`, grp.exp === "true" && grp.heads.join() === "사용 환경,업무 기능" && grp.links === 7 && grp.overflow <= 0, JSON.stringify(grp));
    await page.screenshot({ path: `${OUT}nav-mobile-product.png` });
    await page.locator("#site-menu .nav-panel__link", { hasText: "Devin Review" }).click();
    await page.waitForURL("**/features/review/");
    await page.waitForLoadState("networkidle");
    const rv = await page.evaluate(() => ({ exp: document.querySelector(".menu-toggle").getAttribute("aria-expanded"), cur: document.querySelector(".nav-trigger.is-current")?.firstChild.textContent }));
    check(`menu/mobile product link navigates and closes menu`, rv.exp === "false" && rv.cur === "제품", JSON.stringify(rv));
    await page.locator(".menu-toggle").click();
    check(`menu/mobile product group auto-expanded on product page`, (await trig.getAttribute("aria-expanded")) === "true");
    await page.locator("#site-menu .nav-panel__overview").first().click();
    await page.waitForURL("**/features/");
    await page.waitForLoadState("networkidle");
    const mr = await page.evaluate(() => ({ path: location.pathname, cur: document.querySelector(".nav-trigger.is-current")?.firstChild.textContent, exp: document.querySelector(".menu-toggle").getAttribute("aria-expanded") }));
    check(`menu/mobile overview link navigates to /features/ and closes menu`, mr.path === "/features/" && mr.exp === "false", JSON.stringify(mr));
    check(`menu/mobile product section marked current`, mr.cur === "제품", JSON.stringify(mr));
    await page.locator(".subnav__list a", { hasText: "요금제와 접근" }).click();
    await page.waitForTimeout(700);
    const fr = await page.evaluate(() => { const t = document.getElementById("요금제와-접근").getBoundingClientRect().top; const bar = document.querySelector(".subnav").getBoundingClientRect().bottom; return { t, bar }; });
    check(`menu/mobile features tab lands below header+tabs`, fr.t >= fr.bar && fr.t < fr.bar + 60, JSON.stringify(fr));
  } else {
    check(`article/desktop section tabs hidden (sidebar TOC instead)`, !(await page.locator(".subnav").isVisible()));
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.locator(".site-nav a", { hasText: "활용사례" }).click();
    await page.waitForURL("**/use-cases/");
    await page.waitForLoadState("networkidle");
    check(`nav/desktop 활용사례 navigates and is current`, await page.evaluate(() => location.pathname === "/use-cases/" && document.querySelector('.site-nav a[aria-current="page"]')?.textContent.trim() === "활용사례"));
    await page.locator(".toc__list a", { hasText: "대규모 마이그레이션" }).click();
    await page.waitForTimeout(700);
    const dr = await page.evaluate(() => { const t = document.getElementById("대규모-마이그레이션").getBoundingClientRect().top; const bar = document.querySelector("[data-header]").getBoundingClientRect().bottom; return { t, bar }; });
    check(`nav/desktop TOC link lands below header`, dr.t >= dr.bar && dr.t < dr.bar + 60, JSON.stringify(dr));
    await page.screenshot({ path: `${OUT}use-cases-desktop-toc.png` });
    // Product dropdown: click, keyboard, Escape, focus return, outside click, Tab out, navigation.
    await page.goto(base + "/", { waitUntil: "networkidle" });
    const trig = page.locator(".nav-trigger").first();
    const state = () => page.evaluate(() => { const t = document.querySelector(".nav-trigger"); const p = document.getElementById(t.getAttribute("aria-controls")); const r = p.getBoundingClientRect(); return { exp: t.getAttribute("aria-expanded"), shown: getComputedStyle(p).display !== "none", focus: document.activeElement.textContent.trim().slice(0, 16), cls: document.activeElement.className, right: r.right, vw: innerWidth, bg: getComputedStyle(p).backgroundColor }; });
    check(`dropdown/desktop closed by default`, (await state()).exp === "false" && !(await state()).shown);
    await trig.hover();
    await page.waitForTimeout(150);
    check(`dropdown/desktop mouse hover opens (official devin.ai behaviour)`, (await state()).shown);
    await page.mouse.move(1200, 700);
    await page.waitForTimeout(400);
    check(`dropdown/desktop mouse leave closes`, (await state()).exp === "false");
    await trig.click();
    await page.waitForTimeout(150);
    const o1 = await state();
    check(`dropdown/desktop click opens white panel inside viewport`, o1.exp === "true" && o1.shown && o1.right <= o1.vw && o1.bg === "rgb(255, 255, 255)", JSON.stringify(o1));
    await page.screenshot({ path: `${OUT}nav-desktop-product.png` });
    await page.mouse.click(1200, 600);
    check(`dropdown/desktop outside click closes`, (await state()).exp === "false");
    await trig.focus();
    await page.keyboard.press("Enter");
    const k1 = await state();
    check(`dropdown/desktop Enter opens and focuses first link`, k1.exp === "true" && k1.focus.startsWith("Devin Cloud"), JSON.stringify(k1));
    await page.keyboard.press("ArrowDown");
    check(`dropdown/desktop ArrowDown moves to next link`, (await state()).focus.startsWith("Devin Desktop"));
    await page.keyboard.press("Escape");
    const e1 = await state();
    check(`dropdown/desktop Escape closes and returns focus to trigger`, e1.exp === "false" && e1.cls.includes("nav-trigger"), JSON.stringify(e1));
    await page.keyboard.press("Space");
    check(`dropdown/desktop Space toggles open`, (await state()).exp === "true");
    await page.keyboard.press("Escape");
    await page.keyboard.press("ArrowDown");
    check(`dropdown/desktop ArrowDown on trigger opens`, (await state()).exp === "true");
    const nTab = await page.locator("#product-menu a").count();
    for (let i = 0; i < nTab; i++) await page.keyboard.press("Tab");
    const t1 = await state();
    check(`dropdown/desktop Tab past last link closes panel`, t1.exp === "false" && t1.focus === "모델", JSON.stringify(t1));
    await trig.click();
    await page.locator(".nav-panel__link", { hasText: "Devin CLI" }).click();
    await page.waitForURL("**/features/cli/");
    await page.waitForLoadState("networkidle");
    const n1 = await page.evaluate(() => ({ cur: document.querySelector(".nav-trigger.is-current")?.firstChild.textContent, exp: document.querySelector(".nav-trigger").getAttribute("aria-expanded"), crumb: [...document.querySelectorAll(".breadcrumb li")].map((l) => l.textContent.trim()).join(">"), replica: !!document.querySelector(".page-replica") }));
    check(`dropdown/desktop link navigates; trigger current, panel closed, breadcrumb`, n1.cur === "제품" && n1.exp === "false" && (n1.crumb === "홈>제품>Devin CLI" || (n1.crumb === "" && n1.replica)), JSON.stringify(n1));
    await trig.click();
    await page.screenshot({ path: `${OUT}nav-desktop-product-current.png` });
    await page.keyboard.press("Escape");
    for (const w of [1024, 1280]) {
      await page.setViewportSize({ width: w, height: 800 });
      await trig.click();
      const wv = await page.evaluate(() => { const docs = document.querySelector(".site-header__docs").getBoundingClientRect(); const last = [...document.querySelectorAll(".site-nav > ul > li")].pop().getBoundingClientRect(); const p = document.querySelector(".nav-panel").getBoundingClientRect(); return { overlap: last.right > docs.left, panelRight: p.right, vw: innerWidth, overflow: document.documentElement.scrollWidth - innerWidth }; });
      check(`dropdown/desktop ${w}px: nav fits, panel in viewport, no overflow`, !wv.overlap && wv.panelRight <= wv.vw && wv.overflow <= 0, JSON.stringify(wv));
      await page.keyboard.press("Escape");
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    // Models dropdown + official nav metrics: identical tab text, no current-page background.
    await page.goto(base + "/use-cases/", { waitUntil: "networkidle" });
    const mt = page.locator(".nav-trigger", { hasText: "모델" });
    await mt.focus();
    await page.keyboard.press("Enter");
    const m1 = await page.evaluate(() => ({ exp: document.querySelector('[aria-controls="models-menu"]').getAttribute("aria-expanded"), links: [...document.querySelectorAll("#models-menu .nav-panel__label")].map((l) => l.textContent), focus: document.activeElement.textContent.trim().slice(0, 12) }));
    check(`models/desktop Enter opens Models panel: Fusion, 타사 모델 directly under it, SWE family`, m1.exp === "true" && m1.links.slice(0, 2).join() === "Fusion,타사 모델" && ["SWE-2", "SWE-2 Flash"].every((n) => m1.links.includes(n)) && m1.focus.startsWith("Fusion"), JSON.stringify(m1));
    check(`models/desktop 타사 모델 subtitle verbatim`, await page.evaluate(() => [...document.querySelectorAll('#models-menu .nav-panel__link')].find((a) => a.getAttribute("href") === "/models/third-party/")?.querySelector(".nav-panel__desc").textContent === "OpenAI, Anthropic, Google, SpaceXSI 및 오픈소스 최신 모델에 액세스"));
    await page.keyboard.press("Escape");
    check(`models/desktop Escape closes and returns focus`, await page.evaluate(() => document.activeElement.getAttribute("aria-controls") === "models-menu" && document.activeElement.getAttribute("aria-expanded") === "false"));
    await mt.click();
    await page.waitForTimeout(150);
    check(`models/desktop click opens; only one panel open`, await page.evaluate(() => [...document.querySelectorAll(".nav-trigger")].map((t) => t.getAttribute("aria-expanded")).join() === "false,true"));
    await page.locator("#models-menu .nav-panel__link", { hasText: "Fusion" }).click();
    await page.waitForURL("**/models/fusion/");
    await page.mouse.move(1200, 700);
    await page.waitForTimeout(400);
    for (const path of ["/", "/use-cases/", "/models/fusion/", "/models/third-party/", "/features/cli/"]) {
      await page.goto(base + path, { waitUntil: "networkidle" });
      await page.mouse.move(1200, 700);
      const nm = await page.evaluate(() => [...document.querySelectorAll(".site-nav > ul > li > .nav-link")].filter((e) => e.getClientRects().length).map((e) => { const s = getComputedStyle(e); return { t: e.firstChild.textContent.trim(), k: [s.fontSize, s.fontWeight, s.letterSpacing, s.lineHeight, e.getBoundingClientRect().height].join("/"), bg: s.backgroundColor, cur: e.matches('[aria-current], .is-current') }; }));
      check(`navstyle/desktop ${path} tabs = 개요,제품,모델,활용사례,스타트업 프로그램 with identical 14px/400/normal/19.6px/28`, nm.map((n) => n.t).join() === "개요,제품,모델,활용사례,스타트업 프로그램" && nm.every((n) => n.k === "14px/400/normal/19.6px/28"), JSON.stringify(nm));
      check(`navstyle/desktop ${path} current tab has no background`, nm.some((n) => n.cur) && nm.every((n) => n.bg === "rgba(0, 0, 0, 0)"), JSON.stringify(nm.filter((n) => n.cur)));
    }
    await page.goto(base + "/overview/", { waitUntil: "load" });
    await page.waitForURL(base + "/", { timeout: 5000 }).catch(() => {});
    check(`redirect/desktop /overview/ → / (개요)`, await page.evaluate(() => location.pathname === "/" && document.querySelector('.site-nav a[aria-current="page"]')?.textContent.trim() === "개요"));
    check(`logo/desktop links to / (개요)`, await page.evaluate(() => document.querySelector(".wordmark").getAttribute("href") === "/"));
    await page.goto(base + "/models/third-party/", { waitUntil: "networkidle" });
    const tp = await page.evaluate(() => ({ providers: [...document.querySelectorAll("[data-provider] h2")].map((h) => h.textContent.trim()), families: document.querySelectorAll("[data-family]").length, chips: document.querySelectorAll("[data-family] .tp-chip").length, fusion: !!document.querySelector('.tp-fusion a[href="/models/fusion/"]') }));
    check(`third-party/desktop lists 9 providers, 53 families, Fusion recommended block`, tp.providers.join() === "Cognition,Anthropic,OpenAI,Google,xAI,DeepSeek,Kimi (Moonshot AI),GLM (Z.ai),NVIDIA" && tp.families === 53 && tp.fusion, JSON.stringify(tp));
    const logo = await page.evaluate(() => { const i = document.querySelector(".wordmark__logo"); const r = i.getBoundingClientRect(); return { h: r.height, alt: i.alt, ok: i.complete && i.naturalWidth > 0 }; });
    check(`navstyle/desktop logo 20px high with accessible name`, logo.h === 20 && logo.alt === "Devin 한국어 가이드" && logo.ok, JSON.stringify(logo));
  }
  await context.close();
}

await writeFile(`${OUT}results.json`, JSON.stringify(results, null, 2));
server.close();
await browser.close().catch(() => {});
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
