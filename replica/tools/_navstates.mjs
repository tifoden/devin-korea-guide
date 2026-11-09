// Official nav: hover / open / current treatment and Product popup links (Models group hrefs).
import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); await p.bringToFront();
const st = (l) => l.evaluate((e) => { const s = getComputedStyle(e); return { color: s.color, bg: s.backgroundColor, op: s.opacity, weight: s.fontWeight, td: s.textDecorationLine, trans: s.transition.slice(0, 80), cur: e.getAttribute("aria-current"), exp: e.getAttribute("aria-expanded") }; });
for (const url of ["https://devin.ai/", "https://devin.ai/pricing", "https://devin.ai/desktop"]) {
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const nav = p.locator("nav").first();
  for (const t of ["Pricing", "Customers"]) { const l = nav.locator("a", { hasText: t }).first(); console.log(url, "rest", t, JSON.stringify(await st(l))); }
  const pr = nav.locator("a", { hasText: "Pricing" }).first(); await pr.hover(); await p.waitForTimeout(300); console.log(url, "hover Pricing", JSON.stringify(await st(pr)));
  const trig = nav.locator("button", { hasText: "Product" }).first();
  await trig.hover(); await p.waitForTimeout(600);
  console.log(url, "hover Product", JSON.stringify(await st(trig)), "popupOpenOnHover", await p.evaluate(() => !!document.querySelector("[data-popup-open]")));
  await p.mouse.move(700, 600); await p.waitForTimeout(500);
  await trig.click(); await p.waitForTimeout(500);
  console.log(url, "open Product", JSON.stringify(await st(trig)));
  if (url.endsWith("/")) {
    console.log("popup links", JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("a")].filter((a) => { const r = a.getBoundingClientRect(); return r.height > 0 && r.top > 50 && r.top < 420; }).map((a) => [a.textContent.trim().slice(0, 30), a.getAttribute("href")]))));
    console.log("popup heads", JSON.stringify(await p.evaluate(() => [...document.querySelectorAll("*")].filter((e) => /^(Surfaces|Models|Platform|Features)$/.test(e.textContent.trim()) && !e.children.length).map((e) => { const s = getComputedStyle(e); return [e.textContent, s.fontSize, s.fontWeight, s.color, s.textTransform, s.letterSpacing]; }))));
    const f = p.locator("a", { hasText: /^Fusion$/ }).first();
    console.log("popup link style", JSON.stringify(await f.evaluate((e) => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { size: s.fontSize, weight: s.fontWeight, color: s.color, pad: s.padding, h: r.height, radius: s.borderRadius }; })));
    await f.hover(); await p.waitForTimeout(300); console.log("popup link hover", JSON.stringify(await st(f)));
    await p.screenshot({ path: "/home/ubuntu/research/motion/official-product-open.png", clip: { x: 0, y: 0, width: 1440, height: 420 } });
  }
  await p.keyboard.press("Escape");
}
await ctx.close(); process.exit(0);
