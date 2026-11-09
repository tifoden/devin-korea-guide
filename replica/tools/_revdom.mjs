import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0];
const p = await ctx.newPage();
await p.setViewportSize({ width: 1440, height: 9000 });
await p.goto("https://app.devin.ai/review", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1500);
const html = await p.evaluate(async () => {
  const sc = [...document.querySelectorAll(".overflow-y-auto")].sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
  for (let y = 0; y < sc.scrollHeight; y += 400) { sc.scrollTop = y; await new Promise((r) => setTimeout(r, 150)); }
  await new Promise((r) => setTimeout(r, 1000));
  return document.body.innerHTML;
});
await writeFile("/home/ubuntu/research/replica/review-dom.html", html);
console.log("len", html.length);
process.exit(0);
