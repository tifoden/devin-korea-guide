// Probe load-time hero motion, Product dropdown motion, FAQ accordion motion, hover transitions.
import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0];
const out = {};
for (const spec of process.argv.slice(2)) {
  const [name, url] = spec.split("=");
  const p = await ctx.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.addInitScript(() => {
    window.__rec = [];
    const t0 = performance.now();
    const tick = () => {
      const t = performance.now() - t0;
      if (t > 2500) return;
      const els = [...document.querySelectorAll("h1, h1 ~ p, main a[class*=rounded-full], main img, main video")].slice(0, 6);
      window.__rec.push([Math.round(t), ...els.map((e) => { const s = getComputedStyle(e); return `${e.tagName}:${(+s.opacity).toFixed(2)}:${s.transform === "none" ? "-" : s.transform.slice(19, 40)}:${s.filter === "none" ? "" : s.filter}`; })]);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await p.goto(url, { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(2600);
  const rec = await p.evaluate(() => window.__rec.filter((_, i) => i % 6 === 0).slice(0, 30));
  // dropdown
  const dd = await p.evaluate(async () => {
    const btn = [...document.querySelectorAll("header button, nav button")].find((b) => /Product|제품/.test(b.innerText));
    if (!btn) return null;
    const before = new Set(document.querySelectorAll("*"));
    btn.click();
    const seq = []; const t0 = performance.now(); let panel = null;
    while (performance.now() - t0 < 700) {
      await new Promise(requestAnimationFrame);
      if (!panel) panel = [...document.querySelectorAll("*")].find((e) => !before.has(e) && e.getBoundingClientRect().height > 150) || document.querySelector("[data-state=open][role=menu], [data-state=open]");
      if (panel) { const s = getComputedStyle(panel); const r = panel.getBoundingClientRect(); seq.push([Math.round(performance.now() - t0), (+s.opacity).toFixed(2), s.transform.slice(0, 50), Math.round(r.height), Math.round(r.top)]); }
    }
    const s = panel && getComputedStyle(panel);
    const res = { panel: panel && (panel.tagName + "." + (panel.className + "").slice(0, 120)), transition: s && s.transition.slice(0, 200), animation: s && s.animation.slice(0, 160), seq: seq.filter((_, i) => i % 3 === 0) };
    btn.click(); await new Promise((r) => setTimeout(r, 400));
    return res;
  });
  // accordion
  const acc = await p.evaluate(async () => {
    const sums = [...document.querySelectorAll("details:not([open]) > summary, main button[aria-expanded=false]")];
    const sm = sums.find((s) => s.getBoundingClientRect().height > 0);
    if (!sm) return null;
    sm.scrollIntoView({ block: "center" }); await new Promise((r) => setTimeout(r, 200));
    const host = sm.closest("details") || sm.parentElement;
    const h0 = host.getBoundingClientRect().height; sm.click();
    const seq = []; const t0 = performance.now();
    while (performance.now() - t0 < 600) { await new Promise(requestAnimationFrame); seq.push([Math.round(performance.now() - t0), Math.round(host.getBoundingClientRect().height)]); }
    const icon = sm.querySelector("svg, span:last-child");
    return { host: host.tagName + "." + (host.className + "").slice(0, 80), h0, seq: seq.filter((_, i) => i % 3 === 0), iconTransition: icon && getComputedStyle(icon).transition.slice(0, 120), iconTransform: icon && getComputedStyle(icon).transform };
  });
  // hover on first card link & primary button
  const hov = {};
  for (const [k, sel] of [["button", "main a[class*=rounded-full]"], ["card", "main a[class*=group]"], ["navlink", "header a[href*='/'], nav a[href*='/']"]]) {
    const el = p.locator(sel).first();
    if (!(await el.count())) continue;
    try {
      await el.scrollIntoViewIfNeeded({ timeout: 3000 });
      const before = await el.evaluate((e) => { const s = getComputedStyle(e); return [s.backgroundColor, s.color, s.opacity, s.boxShadow.slice(0, 40), s.transition.slice(0, 120)]; });
      await el.hover({ timeout: 3000 }); await p.waitForTimeout(400);
      const after = await el.evaluate((e) => { const s = getComputedStyle(e); const img = e.querySelector("img"); return [s.backgroundColor, s.color, s.opacity, s.boxShadow.slice(0, 40), img ? getComputedStyle(img).transform : ""]; });
      hov[k] = { before, after };
    } catch (e) { hov[k] = String(e).slice(0, 80); }
  }
  out[name] = { rec, dd, acc, hov };
  console.log(name, "rec", rec.length, "dd", !!dd, "acc", !!acc);
  await p.close();
}
await writeFile(process.env.OUT || "/home/ubuntu/research/motion/m2.json", JSON.stringify(out, null, 1));
process.exit(0);
