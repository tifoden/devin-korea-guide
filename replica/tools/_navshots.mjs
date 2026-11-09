// Nav-state screenshots: official devin.ai vs ours (default, Product open, Models open, current page).
import { chromium } from "playwright-core";
const OUT = "/home/ubuntu/research/motion/nav/";
import { mkdirSync } from "node:fs"; mkdirSync(OUT, { recursive: true });
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); await p.bringToFront();
const clip = { x: 0, y: 0, width: 1440, height: 460 };
const shot = async (n) => { await p.waitForTimeout(1500); await p.screenshot({ path: OUT + n + ".png", clip }); };
// official
await p.goto("https://devin.ai/", { waitUntil: "networkidle", timeout: 60000 });
await p.mouse.move(1300, 800); await shot("official-default");
await p.locator("nav button", { hasText: "Product" }).first().hover(); await p.waitForTimeout(300); if ((await p.locator("nav button", { hasText: "Product" }).first().getAttribute("aria-expanded")) !== "true") await p.locator("nav button", { hasText: "Product" }).first().click(); await shot("official-product-open");
await p.mouse.move(1300, 800); await p.waitForTimeout(400);
await p.goto("https://devin.ai/pricing", { waitUntil: "networkidle", timeout: 60000 });
await p.mouse.move(1300, 800); await shot("official-current-pricing");
// ours
const base = "http://localhost:8080";
await p.goto(base + "/", { waitUntil: "networkidle" });
await p.mouse.move(1300, 800); await shot("ours-default");
await p.locator(".nav-trigger", { hasText: "제품" }).hover(); await shot("ours-product-open");
await p.mouse.move(1300, 800); await p.waitForTimeout(400);
await p.locator(".nav-trigger", { hasText: "모델" }).hover(); await shot("ours-models-open");
await p.mouse.move(1300, 800);
await p.goto(base + "/use-cases/", { waitUntil: "networkidle" });
await p.mouse.move(1300, 800); await shot("ours-current-use-cases");
await p.goto(base + "/models/fusion/", { waitUntil: "networkidle" });
await p.mouse.move(1300, 800); await shot("ours-current-models-fusion");
await ctx.close(); process.exit(0);
