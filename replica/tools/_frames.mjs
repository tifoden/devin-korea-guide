// Frame sequences (official vs ours): Product dropdown open, Desktop mock-row reveal, Desktop FAQ open, Cloud stacked-card dim.
import { chromium } from "playwright-core";
const OUT = "/home/ubuntu/research/motion/frames/";
const OURS = process.env.OURS || "http://localhost:8080";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); await p.bringToFront();
const shots = async (tag, times, clip, act) => {
  const t0 = Date.now(); if (act) await act();
  for (const t of times) { const w = t - (Date.now() - t0); if (w > 0) await p.waitForTimeout(w); await p.screenshot({ path: `${OUT}${tag}-${String(t).padStart(4, "0")}.png`, clip }); }
};
for (const [who, url] of [["official", "https://devin.ai/desktop"], ["ours", `${OURS}/features/desktop/`]]) {
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(800);
  const trig = who === "official" ? p.locator("button[data-base-ui-navigation-menu-trigger]", { hasText: "Product" }) : p.locator(".nav-trigger").first();
  await shots(`dropdown-${who}`, [0, 40, 80, 120, 250], { x: 0, y: 0, width: 1440, height: 420 }, () => trig.click());
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  // mock rows: scroll the group into view
  const row = who === "official" ? p.locator("button.hm-hover.items-start").first() : p.locator("[data-reveal='8']").first();
  const box0 = await row.evaluate((e) => { const r = e.parentElement.getBoundingClientRect(); return { top: r.top + scrollY, x: r.left, w: r.width, h: r.height }; });
  const y = Math.max(0, box0.top - 300);
  await shots(`reveal-${who}`, [0, 150, 300, 450, 700], { x: Math.max(0, box0.x - 20), y: 300 - 20, width: Math.min(700, box0.w + 40), height: Math.min(420, box0.h + 40) }, () => p.evaluate((y) => scrollTo(0, y), y));
  // FAQ
  const q = who === "official" ? p.locator("div.cursor-pointer.border-t").nth(1) : p.locator("[data-acc]").nth(1);
  await q.evaluate((e) => scrollTo(0, e.getBoundingClientRect().top + scrollY - 200));
  await p.waitForTimeout(300);
  await shots(`faq-${who}`, [0, 60, 120, 200, 400], { x: 0, y: 150, width: 1440, height: 420 }, () => q.click({ position: { x: 20, y: 20 } }));
}
for (const [who, url] of [["official", "https://devin.ai/cloud"], ["ours", `${OURS}/features/cloud/`]]) {
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const top = await p.evaluate(() => { const o = document.querySelector("div.absolute.inset-0.pointer-events-none.bg-white"); return o.parentElement.getBoundingClientRect().top + scrollY; });
  for (const d of [0, 600, 1200, 1800]) { await p.evaluate((y) => scrollTo(0, y), top - 300 + 300 + d); await p.waitForTimeout(400); await p.screenshot({ path: `${OUT}stack-${who}-${String(d).padStart(4, "0")}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } }); }
}
await ctx.close();
process.exit(0);
