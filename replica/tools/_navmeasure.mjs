// Official devin.ai nav: computed tab styles, logo size, hover/current treatment, Product popup Models links.
import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); await p.bringToFront();
for (const url of ["https://devin.ai/", "https://devin.ai/desktop"]) {
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const r = await p.evaluate(() => {
    const pick = (el) => { if (!el) return null; const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return { tag: el.tagName, cls: el.className?.baseVal ?? el.className, text: el.textContent.trim().slice(0, 30), font: s.fontFamily.slice(0, 40), size: s.fontSize, weight: s.fontWeight, ls: s.letterSpacing, lh: s.lineHeight, pad: s.padding, color: s.color, bg: s.backgroundColor, radius: s.borderRadius, trans: s.transition.slice(0, 120), h: r.height, w: r.width, x: r.x, y: r.y, gap: getComputedStyle(el.parentElement).gap }; };
    const header = document.querySelector("header") || document.querySelector("nav");
    const items = [...header.querySelectorAll("nav a, nav button")].filter((e) => e.getBoundingClientRect().width > 0).slice(0, 14).map(pick);
    const logo = header.querySelector("a svg, a img");
    return { header: pick(header), logo: logo && { ...pick(logo), parent: pick(logo.closest("a")) }, items, current: [...header.querySelectorAll("[aria-current],[data-active],[data-state=open]")].map(pick) };
  });
  console.log(url, JSON.stringify(r, null, 1));
  // hover
  const tab = p.locator("header nav a", { hasText: "Pricing" }).first();
  if (await tab.count()) { await tab.hover(); await p.waitForTimeout(400); console.log("hover Pricing", JSON.stringify(await tab.evaluate((e) => { const s = getComputedStyle(e); return { color: s.color, bg: s.backgroundColor, op: s.opacity, td: s.textDecorationLine }; }))); }
  const trig = p.locator("header button", { hasText: "Product" }).first();
  await trig.hover(); await p.waitForTimeout(200);
  console.log("hover Product", JSON.stringify(await trig.evaluate((e) => { const s = getComputedStyle(e); return { color: s.color, bg: s.backgroundColor, op: s.opacity, expanded: e.getAttribute("aria-expanded") }; })));
  await trig.click(); await p.waitForTimeout(400);
  console.log("open Product", JSON.stringify(await trig.evaluate((e) => { const s = getComputedStyle(e); return { color: s.color, bg: s.backgroundColor, op: s.opacity, expanded: e.getAttribute("aria-expanded"), chevron: e.querySelector("svg") && getComputedStyle(e.querySelector("svg")).transform }; })));
  const links = await p.evaluate(() => [...document.querySelectorAll("a")].filter((a) => a.getBoundingClientRect().height > 0 && a.getBoundingClientRect().top < 400).map((a) => [a.textContent.trim().slice(0, 40), a.getAttribute("href")]));
  console.log("popup links", JSON.stringify(links));
  const popup = await p.evaluate(() => { const h = [...document.querySelectorAll("*")].filter((e) => /^(Surfaces|Models|Platform|Features)$/.test(e.textContent.trim()) && e.children.length === 0).map((e) => { const s = getComputedStyle(e); return { t: e.textContent, size: s.fontSize, weight: s.fontWeight, color: s.color, ls: s.letterSpacing, tt: s.textTransform }; }); const l = [...document.querySelectorAll("a")].find((a) => a.textContent.trim() === "Fusion"); const s = l && getComputedStyle(l); return { headings: h, link: s && { size: s.fontSize, weight: s.fontWeight, color: s.color, pad: s.padding, lh: s.lineHeight, h: l.getBoundingClientRect().height } }; });
  console.log("popup styles", JSON.stringify(popup));
}
await ctx.close(); process.exit(0);
