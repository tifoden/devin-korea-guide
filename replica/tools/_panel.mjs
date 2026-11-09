// Sample official Product panel (desktop) and mobile menu open motion.
import { chromium } from "playwright-core";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0];
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await ctx.newPage();
  await p.setViewportSize({ width: w, height: h });
  await p.goto(process.argv[2] || "https://devin.ai/desktop", { waitUntil: "networkidle", timeout: 60000 });
  const r = await p.evaluate(async (w) => {
    const btn = w > 600 ? [...document.querySelectorAll("button")].find((b) => /^Product/.test(b.innerText.trim()))
      : [...document.querySelectorAll("header button, nav button")].find((b) => /menu/i.test(b.getAttribute("aria-label") || "") || b.querySelector("svg"));
    if (!btn) return "no button";
    btn.click();
    const t0 = performance.now(); const seq = []; let el = null;
    while (performance.now() - t0 < 600) {
      await new Promise(requestAnimationFrame);
      if (!el) { const a = [...document.querySelectorAll("a")].find((a) => /Devin CLI/.test(a.innerText) && a.getBoundingClientRect().height > 0 && a.getBoundingClientRect().top > 0); if (a) { el = a; let x = a; while (x.parentElement && x.parentElement.getBoundingClientRect().height < (w > 600 ? 600 : 2000) && x.parentElement !== document.body) x = x.parentElement; el = x; } }
      if (el) { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); const a = getComputedStyle([...el.querySelectorAll("a")][0]); seq.push([Math.round(performance.now() - t0), (+s.opacity).toFixed(2), s.transform.slice(0, 40), Math.round(r.top), Math.round(r.height), s.clipPath.slice(0, 30), (+a.opacity).toFixed(2), a.transform.slice(0, 30)]); }
    }
    const s = el && getComputedStyle(el);
    return { btn: btn.outerHTML.slice(0, 120), el: el && el.tagName + "." + (el.className + "").slice(0, 160), tr: s && s.transition.slice(0, 200), an: s && s.animation.slice(0, 120), bg: s && s.backgroundColor, shadow: s && s.boxShadow.slice(0, 120), radius: s && s.borderRadius, seq: seq.filter((_, i) => i % 2 === 0).slice(0, 14) };
  }, w);
  console.log(w, JSON.stringify(r, null, 0));
  await p.close();
}
process.exit(0);
