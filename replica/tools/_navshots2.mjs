// Ours-only nav states after t18u/t19u: Models open (with 타사 모델) and 개요 current on /.
import { chromium } from "playwright-core";
const OUT = "/home/ubuntu/research/motion/nav/";
const b = await chromium.connectOverCDP("http://localhost:29229");
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); await p.bringToFront();
await p.goto("http://localhost:8080/", { waitUntil: "networkidle" });
await p.mouse.move(1300, 800); await p.waitForTimeout(1500);
await p.screenshot({ path: OUT + "ours-current-home-overview.png", clip: { x: 0, y: 0, width: 1440, height: 460 } });
await p.goto("http://localhost:8080/models/third-party/", { waitUntil: "networkidle" });
await p.locator(".nav-trigger", { hasText: "모델" }).hover(); await p.waitForTimeout(3000);
await p.screenshot({ path: OUT + "ours-models-open-third-party.png", clip: { x: 0, y: 0, width: 1440, height: 560 } });
await ctx.close(); process.exit(0);
