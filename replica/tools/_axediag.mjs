import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const b = await chromium.connectOverCDP("http://localhost:29229");
const page = await b.contexts()[0].newPage();
await page.setViewportSize({ width: 1440, height: 900 });
for (const n of process.argv.slice(2)) {
  await page.goto(`http://localhost:8080/features/${n}/`, { waitUntil: "networkidle" });
  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  for (const v of axe.violations) {
    console.log(n, v.id, v.nodes.length);
    const seen = new Map();
    for (const nd of v.nodes) { const k = (nd.any[0]?.data?.fgColor || "") + "/" + (nd.any[0]?.data?.bgColor || "") + " " + (nd.any[0]?.data?.contrastRatio || ""); seen.set(k, (seen.get(k) || 0) + 1); }
    if (v.id === "color-contrast") console.log("   ", [...seen].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, c]) => `${k} x${c}`).join(" | "));
    if (v.id === "color-contrast") { const by = {}; for (const nd of v.nodes) { const k = nd.any[0]?.data?.fgColor; (by[k] ||= []).push(nd.html.replace(/>[^<]*$/, ">").slice(0, 150)); } for (const [k, a] of Object.entries(by)) console.log("     ", k, a.length, "|", [...new Set(a)].slice(0, 2).join(" || ")); }
    else console.log("    e.g.", v.nodes.slice(0, 2).map((x) => x.html.slice(0, 140)).join(" || "));
  }
  const ff = await page.evaluate(() => [...document.querySelectorAll(".official h1, .official h2, .official-app h1, .official-app h2")].map((e) => [e.className.slice(0, 40), getComputedStyle(e).fontFamily.split(",")[0]]).filter((x) => !/Pretendard/.test(x[1])).slice(0, 3));
  if (ff.length) console.log(n, "fonts", JSON.stringify(ff));
}
await page.close(); process.exit(0);
