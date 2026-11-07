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

const PAGES = [{ name: "home", path: "/" }, { name: "article", path: "/guides/first-task/" }];
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
      nb: document.fonts.check('16px nbInternationalPro', "Devin"),
      pretendard: [...document.fonts].some((f) => /Pretendard/.test(f.family) && f.status === "loaded"),
      mono: [...document.fonts].some((f) => f.family.replace(/"/g, "") === "geistMono" && f.status === "loaded"),
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
    check(`${tag} fonts loaded (NB International Pro, Pretendard, Geist Mono)`, info.nb && info.pretendard && info.mono, JSON.stringify({ nb: info.nb, pretendard: info.pretendard, mono: info.mono }));
    check(`${tag} block-level targets ≥ 24px`, info.smallTargets.length === 0, info.smallTargets.join(", "));
    if (p.name === "article") check(`${tag} prose font-size 17px`, info.proseSize === "17px", info.proseSize);

    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    check(`${tag} axe WCAG A/AA violations = 0`, axe.violations.length === 0, axe.violations.map((v) => `${v.id}(${v.nodes.length})`).join(", "));

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
  const tocResult = await page.evaluate(() => { const id = decodeURIComponent(location.hash.slice(1)); const el = document.getElementById(id); const header = document.querySelector(".site-header").getBoundingClientRect().bottom; const top = el.getBoundingClientRect().top; return { id, top: Math.round(top), header: Math.round(header) }; });
  check(`article/${vp.name} TOC link lands below sticky header`, tocResult.top >= tocResult.header && tocResult.top < 400, JSON.stringify(tocResult));
  const table = await page.evaluate(() => { const w = document.querySelector(".table-wrap"); return w ? { tabindex: w.getAttribute("tabindex"), scrollable: w.scrollWidth > w.clientWidth } : null; });
  check(`article/${vp.name} table wrapper focusable`, table && table.tabindex === "0", JSON.stringify(table));
  await context.close();
}

await writeFile(`${OUT}results.json`, JSON.stringify(results, null, 2));
server.close();
await browser.close().catch(() => {});
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
