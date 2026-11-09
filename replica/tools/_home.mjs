// Full-page official home vs guide home, desktop + mobile, after scrolling through so in-view motion has settled.
import { chromium } from "playwright-core";
const R = "/home/ubuntu/research/replica/";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = await b.newContext();
const p = await ctx.newPage(); await p.bringToFront();
for (const [w, v] of [[1440, "desktop"], [390, "mobile"]]) {
  await p.setViewportSize({ width: w, height: v === "desktop" ? 900 : 844 });
  for (const [url, path] of [["https://devin.ai/", `${R}home-${v}-official.png`], ["http://localhost:8080/", `${R}ours/home-${v}.png`]]) {
    await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < Math.min(H, 16000); y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(120); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
    await p.screenshot({ path, fullPage: true, timeout: 120000 });
    console.log(v, url, H);
  }
}
await ctx.close(); process.exit(0);
