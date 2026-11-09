import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const page = await b.contexts()[0].newPage();
await page.setViewportSize({ width: 1440, height: 900 });
for (const n of ["cloud", "desktop", "cli", "mobile", "review", "security", "oncall"]) {
  await page.goto(`http://localhost:8080/features/${n}/`, { waitUntil: "networkidle" });
  const r = await page.evaluate(() => {
    const m = {};
    const w = document.createTreeWalker(document.querySelector(".official, .official-app"), NodeFilter.SHOW_TEXT);
    while (w.nextNode()) { const t = w.currentNode; if (!/[가-힣]/.test(t.data)) continue; const f = getComputedStyle(t.parentElement).fontFamily; if (/^"?Pretendard/.test(f)) continue; const k = f.slice(0, 70); (m[k] ||= [0, t.parentElement.tagName + "." + t.parentElement.className.slice(0, 50)])[0]++; }
    let chain = [];
    const el = [...document.querySelectorAll("span")].find((e) => e.textContent.trim() === "10,000+");
    for (let a = el; a; a = a.parentElement) { const s = getComputedStyle(a); if (+s.opacity < 1 || s.filter !== "none" || s.maskImage !== "none") chain.push([a.tagName, a.className.slice(0, 60), s.opacity, s.filter, s.maskImage.slice(0, 40)]); }
    return { m, chain: el ? chain : null };
  });
  console.log(n, JSON.stringify(r.m), r.chain ? "CHAIN " + JSON.stringify(r.chain) : "");
}
await page.close(); process.exit(0);
