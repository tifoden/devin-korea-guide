// Checks every href/src in _site: internal files and #anchors must exist; external URLs must answer 2xx/3xx.
// Usage: node scripts/check-links.mjs [--no-external]
import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, dirname } from "node:path";

const ROOT = new URL("../_site/", import.meta.url).pathname;
const checkExternal = !process.argv.includes("--no-external");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

const pages = await walk(ROOT);
const ids = new Map();
const links = [];
for (const file of pages) {
  const html = await readFile(file, "utf8");
  const url = "/" + relative(ROOT, file).replace(/index\.html$/, "");
  ids.set(url, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) links.push({ from: url, href: m[1].replaceAll("&amp;", "&") });
}

const failures = [];
const external = new Map();
for (const { from, href } of links) {
  if (/^(mailto|tel):/.test(href)) continue;
  if (/^https?:\/\//.test(href)) { if (!external.has(href)) external.set(href, from); continue; }
  const [pathPart, hash] = href.split("#");
  const target = pathPart === "" ? from : new URL(pathPart, "http://x" + from).pathname;
  const fsPath = join(ROOT, target);
  const st = await stat(fsPath).catch(() => null);
  const ok = st && (st.isFile() || (await stat(join(fsPath, "index.html")).catch(() => null)));
  if (!ok) { failures.push(`${from} → ${href} (missing file)`); continue; }
  if (hash && !(ids.get(target)?.has(decodeURIComponent(hash)))) failures.push(`${from} → ${href} (missing #${hash})`);
}

let externalOk = 0;
if (checkExternal) {
  await Promise.all([...external].map(async ([url, from]) => {
    try {
      const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "user-agent": "devin-korea-guide-link-check" } });
      if (res.status >= 400) failures.push(`${from} → ${url} (HTTP ${res.status})`); else externalOk++;
    } catch (e) { failures.push(`${from} → ${url} (${e.message})`); }
  }));
}

console.log(`pages: ${pages.length}, links: ${links.length}, external unique: ${external.size}${checkExternal ? `, external ok: ${externalOk}` : " (skipped)"}`);
if (failures.length) { console.error("FAIL\n" + failures.join("\n")); process.exit(1); }
console.log("all links ok");
