// Sample official Base UI navigation popup/viewport during open and close.
import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const p = await b.contexts()[0].newPage();
await p.setViewportSize({ width: 1440, height: 900 });
await p.goto(process.argv[2] || "https://devin.ai/desktop", { waitUntil: "networkidle", timeout: 60000 });
const r = await p.evaluate(async () => {
  const btn = [...document.querySelectorAll("button[data-base-ui-navigation-menu-trigger]")].find((b) => /Product/.test(b.innerText));
  const before = new Set(document.querySelectorAll("*"));
  const sample = async (ms) => {
    const t0 = performance.now(), seq = [];
    while (performance.now() - t0 < ms) {
      await new Promise(requestAnimationFrame);
      const els = [...document.querySelectorAll("[data-open],[data-starting-style],[data-ending-style],[data-closed]")].filter((e) => !e.matches("button"));
      seq.push([Math.round(performance.now() - t0), els.map((e) => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); return `${e.tagName}:${(+s.opacity).toFixed(2)}:${s.transform.slice(0, 34)}:${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.top)}`; }).join(" | ")]);
    }
    return seq;
  };
  btn.click();
  const open = await sample(450);
  const els = [...document.querySelectorAll("[data-open]")].filter((e) => !e.matches("button"));
  const info = els.map((e) => { const s = getComputedStyle(e); return { tag: e.tagName, cls: (e.className + "").slice(0, 260), attrs: [...e.attributes].map((a) => a.name).filter((n) => n.startsWith("data")).join(","), tr: s.transition.slice(0, 220), bg: s.backgroundColor, sh: s.boxShadow.slice(0, 140), rad: s.borderRadius, bd: s.border.slice(0, 60), bf: s.backdropFilter }; });
  btn.click();
  const close = await sample(400);
  return { info, open: open.filter((_, i) => i % 2 === 0).slice(0, 14), close: close.filter((_, i) => i % 2 === 0).slice(0, 12) };
});
console.log(JSON.stringify(r.info, null, 1));
for (const x of r.open) console.log("O", x[0], x[1].slice(0, 400));
for (const x of r.close) console.log("C", x[0], x[1].slice(0, 400));
process.exit(0);
