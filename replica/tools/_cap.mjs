import { chromium } from "playwright-core";
import { writeFile, mkdir } from "node:fs/promises";
const OUT = "/home/ubuntu/research/replica/";
const pages = process.argv.slice(2).map((s) => s.split("="));
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0];
for (const [name, url] of pages) {
  for (const [vp, w, h] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
    const p = await ctx.newPage();
    await p.setViewportSize({ width: w, height: h });
    await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    for (let y = 0; y < 30000; y += 700) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(120); }
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
    await p.screenshot({ path: `${OUT}${name}-${vp}-official.png`, fullPage: true });
    if (vp === "desktop") {
      const inv = await p.evaluate(() => {
        const cs = (el) => { if (!el) return null; const s = getComputedStyle(el); return { font: s.fontFamily.slice(0,60), size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, color: s.color, bg: s.backgroundColor, radius: s.borderRadius, pad: s.padding, border: s.border }; };
        const main = document.querySelector("main") || document.body;
        let secs = [...main.children]; if (secs.length < 3) secs = [...main.querySelectorAll(":scope > * > *")];
        const sections = secs.map((el) => { const r = el.getBoundingClientRect(); return {
          tag: el.tagName, cls: (el.className+"").slice(0,80), y: Math.round(r.top + scrollY), h: Math.round(r.height), bg: getComputedStyle(el).backgroundColor,
          heads: [...el.querySelectorAll("h1,h2,h3,h4")].map((x) => x.tagName + ": " + x.innerText.replace(/\s+/g," ").slice(0,120)).slice(0,14),
          text: el.innerText.replace(/\s+/g," ").slice(0,900),
          media: [...el.querySelectorAll("img,video,source,svg image")].map((m) => m.currentSrc || m.src || m.getAttribute("href") || m.poster).filter(Boolean).slice(0,20),
          buttons: [...el.querySelectorAll("a,button")].map((a) => a.innerText.trim().slice(0,40) + (a.href ? " -> " + a.href : "")).filter((t) => t.length > 3).slice(0,10),
        }; });
        return { title: document.title, H: document.documentElement.scrollHeight, sections,
          styles: { body: cs(document.body), h1: cs(document.querySelector("h1")), h2: cs(document.querySelector("h2")), h3: cs(document.querySelector("h3")), p: cs(main.querySelector("p")), btn: cs(main.querySelector("a[class*=utton],button")) },
          allMedia: [...new Set([...document.querySelectorAll("img,video,source")].map((m) => m.currentSrc || m.src || m.poster).filter(Boolean))],
          posters: [...document.querySelectorAll("video")].map((v) => v.poster).filter(Boolean) };
      });
      await writeFile(`${OUT}${name}-inventory.json`, JSON.stringify(inv, null, 1));
      console.log(name, inv.title, "H", inv.H, "sections", inv.sections.length, "media", inv.allMedia.length);
    }
    await p.close();
  }
}
process.exit(0);
