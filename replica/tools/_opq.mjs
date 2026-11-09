import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const page = await b.contexts()[0].newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:8080/features/desktop/", { waitUntil: "networkidle" });
console.log(await page.evaluate(() => {
  const els = [...document.querySelectorAll("span.truncate")].filter((e) => e.textContent.trim() === "api: add v3 webhook router");
  const out = [els.length]; for (const el of els) for (let a = el; a; a = a.parentElement) { const s = getComputedStyle(a); if (+s.opacity < 1 || s.filter !== "none" || s.mixBlendMode !== "normal") out.push([a.tagName, a.className.slice(0, 80), (a.getAttribute("style")||"").slice(0,80), s.opacity, s.filter, s.mixBlendMode]); }
  return JSON.stringify(out);
}));
await page.close(); process.exit(0);
