import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0];
for (const [v, w] of [["desktop", 1440], ["mobile", 390]]) {
  const p = await ctx.newPage();
  await p.setViewportSize({ width: w, height: 900 });
  await p.goto("https://app.devin.ai/review", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(1500);
  const H = await p.evaluate(async () => {
    const sc = [...document.querySelectorAll(".overflow-y-auto")].sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
    for (let y = 0; y < sc.scrollHeight; y += 600) { sc.scrollTop = y; await new Promise((r) => setTimeout(r, 80)); }
    sc.scrollTop = 0;
    for (let e = sc; e && e !== document.documentElement; e = e.parentElement) { e.style.height = "auto"; e.style.maxHeight = "none"; e.style.overflow = "visible"; }
    document.documentElement.style.overflow = "visible"; document.body.style.height = "auto";
    return sc.scrollHeight;
  });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `/home/ubuntu/research/replica/review-${v}-official.png`, fullPage: true });
  console.log(v, H); await p.close();
}
process.exit(0);
