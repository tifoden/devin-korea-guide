// Probe official motion: initial hidden states, scroll-in transitions sampled over time, nav/button transitions.
import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
const OUT = process.env.OUT || "/home/ubuntu/research/motion/";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0];
for (const spec of process.argv.slice(2)) {
  const [name, url] = spec.split("=");
  const p = await ctx.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(1500);
  const r = await p.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const sig = (el) => `${el.tagName}.${(el.className + "").split(" ").slice(0, 4).join(".")}`.slice(0, 90);
    const hidden = () => [...document.querySelectorAll("main *")].filter((el) => {
      const s = getComputedStyle(el); return (+s.opacity < 0.05 || (s.transform !== "none" && el.style.transform)) && el.getBoundingClientRect().top > innerHeight;
    });
    const H = [...hidden()];
    const initial = H.slice(0, 400).map((el) => ({ sig: sig(el), inline: (el.getAttribute("style") || "").slice(0, 160), op: getComputedStyle(el).opacity, tf: getComputedStyle(el).transform, tr: getComputedStyle(el).transition.slice(0, 160) }));
    // pick first 3 hidden elements below fold with text, sample during scroll-in
    const targets = H.filter((el) => el.innerText && el.innerText.trim().length > 8 && +getComputedStyle(el).opacity < 0.05).slice(0, 3);
    const samples = [];
    for (const t of targets) {
      const top = t.getBoundingClientRect().top + scrollY;
      // scroll so element top at 85% viewport, then 70%
      let triggerAt = null;
      for (const frac of [0.98, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.6, 0.5]) {
        scrollTo(0, top - innerHeight * frac); await sleep(60);
        if (+getComputedStyle(t).opacity > 0.01 || t.style.opacity && +t.style.opacity > 0.01) { triggerAt = frac; break; }
      }
      const t0 = performance.now(); const seq = [];
      while (performance.now() - t0 < 1600) {
        const s = getComputedStyle(t); seq.push([Math.round(performance.now() - t0), (+s.opacity).toFixed(3), s.transform.slice(0, 60), s.filter]);
        await new Promise(requestAnimationFrame);
      }
      samples.push({ sig: sig(t), text: t.innerText.trim().slice(0, 40), triggerAtViewportFrac: triggerAt, seq: seq.filter((_, i) => i % 3 === 0) });
    }
    scrollTo(0, 0); await sleep(300);
    const tr = (sel) => [...document.querySelectorAll(sel)].slice(0, 3).map((el) => ({ sig: sig(el), transition: getComputedStyle(el).transition.slice(0, 200), anim: getComputedStyle(el).animation.slice(0, 160) }));
    const anims = [...document.querySelectorAll("*")].map((el) => [el, getComputedStyle(el)]).filter(([, s]) => s.animationName && s.animationName !== "none").slice(0, 40).map(([el, s]) => ({ sig: sig(el), name: s.animationName, dur: s.animationDuration, ease: s.animationTimingFunction, iter: s.animationIterationCount, delay: s.animationDelay }));
    const header = document.querySelector("header, nav"); const hs = getComputedStyle(header);
    return { initialCount: H.length, initial: initial.slice(0, 60), samples, anims,
      header: { pos: hs.position, top: hs.top, h: header.getBoundingClientRect().height, bg: hs.backgroundColor, blur: hs.backdropFilter, border: hs.borderBottom, tr: hs.transition.slice(0, 200) },
      navLinks: tr("header a, nav a"), buttons: tr("main a[class*=rounded-full], main button"), details: tr("details, summary"), cards: tr("main a[class*=group]") };
  });
  await writeFile(`${OUT}${name}.json`, JSON.stringify(r, null, 1));
  console.log(name, "hidden-below-fold", r.initialCount, "samples", r.samples.length, "anims", r.anims.length);
  await p.close();
}
process.exit(0);
