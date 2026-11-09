import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
const OUT = "/home/ubuntu/research/replica/";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = b.contexts()[0];
for (const [name, url] of process.argv.slice(2).map((s) => s.split("="))) {
  const p = await ctx.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  for (let y = 0; y < 30000; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(100); }
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const css = [...document.styleSheets].map((s) => s.href).filter(Boolean);
    const inline = [...document.querySelectorAll("style")].map((s) => s.textContent).join("\n");
    const body = document.body;
    const kids = [...body.children].map((c) => `${c.tagName}.${(c.className+"").slice(0,50)} h${c.getBoundingClientRect().height|0}`);
    return { css, inlineLen: inline.length, inline, bodyCls: body.className, htmlCls: document.documentElement.className, kids, html: body.innerHTML };
  });
  await writeFile(`${OUT}${name}-dom.html`, r.html);
  await writeFile(`${OUT}${name}-inline.css`, r.inline);
  await writeFile(`${OUT}${name}-meta.json`, JSON.stringify({ css: r.css, bodyCls: r.bodyCls, htmlCls: r.htmlCls, kids: r.kids }, null, 1));
  console.log(name, "css", r.css.length, "inline", r.inlineLen, "html", r.html.length, "kids", r.kids.slice(0, 8).join(" | "));
  await p.close();
}
process.exit(0);
