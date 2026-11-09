// Motion checks: FAQ accordion, sticky-card dimming, in-view reveals, Product panel transition + scrim, reduced motion.
import { chromium } from "playwright-core";
import { serve } from "./static-server.mjs";
const server = await serve(new URL("../_site/", import.meta.url).pathname);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.connectOverCDP(process.env.CDP_URL || "http://localhost:29229");
const contexts = [];
const b = {
  newPage: async (o = {}) => { const c = await browser.newContext(o); contexts.push(c); const p = await c.newPage(); await p.bringToFront(); return p; },
  close: async () => { for (const c of contexts) await c.close(); server.close(); },
};
let pass = 0, fail = 0;
const check = (n, ok, d = "") => { ok ? pass++ : fail++; console.log(`${ok ? "PASS" : "FAIL"} ${n}${ok ? "" : " — " + d}`); };
const page = await b.newPage({ viewport: { width: 1440, height: 900 } });

for (const slug of ["desktop", "cli"]) {
  await page.goto(`${base}/features/${slug}/`, { waitUntil: "networkidle" });
  const t = page.locator("[data-acc-trigger]").nth(1);
  const panel = page.locator(`#${await t.getAttribute("aria-controls")}`);
  check(`${slug} faq closed initially`, (await t.getAttribute("aria-expanded")) === "false" && (await panel.evaluate((p) => p.inert)));
  await t.scrollIntoViewIfNeeded();
  const h0 = await panel.evaluate((p) => p.getBoundingClientRect().height);
  await t.click();
  const mid = await (async () => { await page.waitForTimeout(80); return panel.evaluate((p) => p.getBoundingClientRect().height); })();
  await page.waitForTimeout(350);
  const h1 = await panel.evaluate((p) => p.getBoundingClientRect().height);
  check(`${slug} faq opens by click with height transition`, (await t.getAttribute("aria-expanded")) === "true" && h0 < 2 && h1 > 20 && mid > h0 && mid < h1, `h0=${h0} mid=${mid} h1=${h1}`);
  const op = await panel.locator("[data-acc-fade]").first().evaluate((e) => getComputedStyle(e).opacity);
  check(`${slug} faq answer visible`, +op > 0.7, op);
  await t.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(300);
  check(`${slug} faq closes with Enter`, (await t.getAttribute("aria-expanded")) === "false");
  await page.keyboard.press(" "); await page.waitForTimeout(300);
  check(`${slug} faq opens with Space`, (await t.getAttribute("aria-expanded")) === "true");
  const d = await t.locator("path").getAttribute("d");
  check(`${slug} faq icon switches to minus`, d === (await t.locator("path").getAttribute("data-d-open")));
}

await page.goto(`${base}/features/desktop/`, { waitUntil: "networkidle" });
const rev = page.locator(".reveal-pending");
const n = await rev.count();
check("desktop reveal targets pending below fold", n >= 4, String(n));
if (n) {
  const first = rev.first();
  check("desktop reveal starts hidden", (await first.evaluate((e) => getComputedStyle(e).opacity)) === "0");
  for (let i = 0; i < n; i++) { await rev.nth(i).evaluate((e) => e.scrollIntoView({ block: "center" })); await page.waitForTimeout(150); }
  await page.waitForTimeout(1200);
  const st = await page.$$eval(".reveal-pending", (els) => els.map((e) => getComputedStyle(e).opacity + "/" + getComputedStyle(e).transform));
  check("desktop reveal completes in view", st.slice(0, 4).every((s) => s === "1/none"), st.join(" "));
}

await page.goto(`${base}/features/cloud/`, { waitUntil: "networkidle" });
const dims = await page.evaluate(async () => {
  const ovs = [...document.querySelectorAll("[data-dim-cap]")];
  const out = [];
  for (const y of [0, 2400, 3200, 4200]) { scrollTo(0, ovs[0].parentElement.getBoundingClientRect().top + scrollY - 300 + y); await new Promise((r) => setTimeout(r, 120)); out.push(ovs.map((o) => (+o.style.opacity).toFixed(2)).join(",")); }
  return { caps: ovs.map((o) => o.dataset.dimCap).join(","), out };
});
check("cloud stacked-card dim ramps to captured caps", dims.out[0].split(",").every((v) => v === "0.00") && dims.out[3] === dims.caps.split(",").map((v) => (+v).toFixed(2)).join(","), JSON.stringify(dims));

// Dropdown timing is sampled on /overview/: the home replica's collage animations drop this VM's software renderer to ~14 fps (devin.ai itself: ~9 fps), which stretches any 0.1s transition.
await page.goto(`${base}/overview/`, { waitUntil: "networkidle" });
const trig = page.locator(".nav-trigger").first();
await trig.click();
const sample = await page.evaluate(() => new Promise((res) => { const p = document.querySelector(".nav-trigger + .nav-panel"); const s = document.querySelector(".nav-scrim"); const seq = []; const t0 = performance.now(); (function f() { seq.push([Math.round(performance.now() - t0), +getComputedStyle(p).opacity, +getComputedStyle(s).opacity]); performance.now() - t0 < 250 ? requestAnimationFrame(f) : res(seq); })(); }));
check("panel + scrim fully open after transition", sample.at(-1)[1] === 1 && sample.at(-1)[2] === 1, JSON.stringify(sample.slice(-1)));
check("html.nav-panel-open set", await page.evaluate(() => document.documentElement.classList.contains("nav-panel-open")));
const scrimBf = await page.evaluate(() => getComputedStyle(document.querySelector(".nav-scrim")).backdropFilter);
check("scrim backdrop blur 4px", scrimBf === "blur(4px)", scrimBf);
await page.keyboard.press("Escape"); await page.waitForTimeout(800);
const escOp = await page.evaluate(() => [+getComputedStyle(document.querySelector(".nav-trigger + .nav-panel")).opacity, +getComputedStyle(document.querySelector(".nav-scrim")).opacity]);
check("Escape: panel + scrim faded out", escOp[0] < 0.05 && escOp[1] < 0.05, JSON.stringify(escOp));
const esc = await page.evaluate(() => [document.documentElement.classList.contains("nav-panel-open"), getComputedStyle(document.querySelector(".nav-trigger + .nav-panel")).display, getComputedStyle(document.querySelector(".nav-scrim")).visibility]);
check("Escape closes panel and scrim", !esc[0] && esc[1] === "none" && esc[2] === "hidden", JSON.stringify(esc));
await page.goto(`${base}/overview/`, { waitUntil: "networkidle" });
const dots = await page.evaluate(() => getComputedStyle(document.querySelector(".status-dot")).animationName + " " + getComputedStyle(document.querySelector(".window__list li")).animationName);
check("overview status pulse + list fade-in-up", dots === "pulse dt-fade-in-up", dots);
const lis = await page.$$eval(".window__list li", (els) => els.map((e) => getComputedStyle(e).opacity));
await page.waitForTimeout(800);
const lis2 = await page.$$eval(".window__list li", (els) => els.map((e) => getComputedStyle(e).opacity));
check("overview list ends fully visible", lis2.every((o) => o === "1"), lis2.join(","));

const rm = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await rm.goto(`${base}/features/desktop/`, { waitUntil: "networkidle" });
check("reduced motion: no pending reveals", (await rm.locator(".reveal-pending").count()) === 0);
await rm.goto(`${base}/overview/`, { waitUntil: "networkidle" });
const rmLi = await rm.$$eval(".window__list li", (els) => els.map((e) => getComputedStyle(e).opacity));
check("reduced motion: overview list visible immediately", rmLi.every((o) => o === "1"), rmLi.join(","));
await rm.locator(".nav-trigger").first().click();
check("reduced motion: panel opaque immediately, no scrim", (await rm.evaluate(() => getComputedStyle(document.querySelector(".nav-trigger + .nav-panel")).opacity)) === "1" && (await rm.evaluate(() => getComputedStyle(document.querySelector(".nav-scrim")).display)) === "none");
await rm.goto(`${base}/features/security/`, { waitUntil: "networkidle" });
const tri = await rm.$$eval("[class*='triageSequence']", (els) => els.map((e) => getComputedStyle(e).animationName));
check("reduced motion: security triage animation off", tri.length > 0 && tri.every((x) => x === "none"), tri.join(","));

const cls = await (async () => {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const out = {};
  for (const r of ["/", "/overview/", "/models/fusion/", "/features/cloud/", "/features/desktop/", "/features/cli/", "/features/mobile/", "/features/review/", "/features/security/", "/features/oncall/"]) {
    await p.goto(base + r, { waitUntil: "networkidle" });
    out[r] = await p.evaluate(async () => {
      let v = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) v += e.value; }).observe({ type: "layout-shift", buffered: true });
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      await new Promise((r) => setTimeout(r, 400));
      return +v.toFixed(4);
    });
  }
  return out;
})();
check("CLS < 0.1 on home, overview, Fusion + 7 feature pages (load + full scroll)", Object.values(cls).every((v) => v < 0.1), JSON.stringify(cls));
console.log("CLS", JSON.stringify(cls));
console.log(`${pass}/${pass + fail} motion checks passed`);
await b.close();
process.exit(fail ? 1 : 0);
