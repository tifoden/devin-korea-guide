// Close-timing diagnostic: official devin.ai vs ours on the heavy home page (rAF-sampled opacity after Escape).
import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); await p.bringToFront();
const sample = (sel) => p.evaluate((sel) => new Promise((res) => { const el = document.querySelector(sel); const seq = []; const t0 = performance.now(); (function f() { seq.push([Math.round(performance.now() - t0), el ? +(+getComputedStyle(el).opacity).toFixed(2) : -1]); performance.now() - t0 < 700 ? requestAnimationFrame(f) : res(seq); })(); }), sel);
const fps = () => p.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); (function f() { n++; performance.now() - t0 < 1000 ? requestAnimationFrame(f) : res(n); })(); }));
await p.goto("https://devin.ai/", { waitUntil: "networkidle", timeout: 60000 });
console.log("official fps", await fps());
await p.locator("nav button", { hasText: "Product" }).first().click(); await p.waitForTimeout(400);
const sel = await p.evaluate(() => { const d = [...document.querySelectorAll("div")].find((e) => /fixed/.test(e.className) && /backdrop-blur/.test(e.className)); if (d) d.setAttribute("data-diag", ""); return !!d; });
await p.keyboard.press("Escape");
console.log("official backdrop found", sel, JSON.stringify((await sample("[data-diag]")).filter((_, i) => i % 3 === 0)));
for (const path of ["/", "/overview/"]) {
  await p.goto("http://localhost:8080" + path, { waitUntil: "networkidle" });
  await p.mouse.move(1300, 800);
  console.log("ours", path, "fps", await fps());
  await p.locator(".nav-trigger").first().focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(400);
  await p.keyboard.press("Escape");
  console.log("ours", path, "panel", JSON.stringify((await sample(".nav-trigger + .nav-panel")).filter((_, i) => i % 3 === 0)));
}
await ctx.close(); process.exit(0);
