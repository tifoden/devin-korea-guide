// Sample official sticky-card dim overlays (opacity) against scroll position.
import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const p = await b.contexts()[0].newPage();
await p.setViewportSize({ width: +(process.argv[3] || 1440), height: 900 });
await p.goto(process.argv[2] || "https://devin.ai/cloud", { waitUntil: "networkidle", timeout: 60000 });
const r = await p.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const ovs = [...document.querySelectorAll("div.absolute.inset-0.pointer-events-none.bg-white")];
  const cards = ovs.map((o) => o.parentElement);
  const info = cards.map((c) => { const s = getComputedStyle(c); return { pos: s.position, top: s.top, cls: (c.className + "").slice(0, 140), h: Math.round(c.getBoundingClientRect().height) }; });
  const start = cards[0].getBoundingClientRect().top + scrollY - 400;
  const rows = [];
  for (let y = start; y < start + 5200; y += 100) {
    scrollTo(0, y); await sleep(70);
    rows.push([Math.round(y), ...cards.map((c, i) => `${Math.round(c.getBoundingClientRect().top)}/${(+getComputedStyle(ovs[i]).opacity).toFixed(2)}`)]);
  }
  return { n: ovs.length, info, ovStyle: ovs.map((o) => o.getAttribute("style") + " | tr:" + getComputedStyle(o).transition), rows };
});
console.log(JSON.stringify(r.info), "\n", r.ovStyle.join("\n "));
for (const row of r.rows) console.log(row.join("  "));
process.exit(0);
