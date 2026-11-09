import { chromium } from "playwright-core";
const OUT = "/home/ubuntu/research/replica/ours/";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0];
for (const spec of process.argv.slice(2)) {
  const [name, w] = spec.split(":");
  const p = await ctx.newPage();
  await p.setViewportSize({ width: +w || 1440, height: 900 });
  await p.goto(`http://localhost:8080/features/${name}/`, { waitUntil: "networkidle" });
  for (let y = 0; y < 12000; y += 700) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
  const info = await p.evaluate(() => ({ H: document.documentElement.scrollHeight, ow: document.documentElement.scrollWidth - innerWidth, broken: [...document.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.src).slice(0, 5) }));
  await p.screenshot({ path: `${OUT}${name}-${w > 600 ? "desktop" : "mobile"}.png`, fullPage: true });
  console.log(name, w, JSON.stringify(info));
  await p.close();
}
process.exit(0);
