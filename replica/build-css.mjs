// Scopes the official devin.ai stylesheet under .official so it cannot leak into the shared guide header/footer.
import postcss from "postcss";
import { readFileSync, writeFileSync } from "node:fs";
const dir = new URL(".", import.meta.url).pathname;
const files = ["02b76k-oyybfy.css", "2fc3p2awljegv.css"];
const ROOTISH = /^(:root|:host|html|body)(?![\w-])/;
const WRAP = /^\.(light|theme-light)(?![\w-])/;
function scope(sel) {
  sel = sel.trim();
  if (ROOTISH.test(sel)) return sel.replace(ROOTISH, ".official");
  if (WRAP.test(sel)) return `.official${sel}, .official ${sel}`;
  return `.official ${sel}`;
}
let out = "";
for (const f of files) {
  const root = postcss.parse(readFileSync(dir + f, "utf8"));
  root.walkAtRules("layer", (at) => { if (at.nodes) at.replaceWith(at.nodes); else at.remove(); });
  root.walkAtRules("font-face", (at) => at.remove());
  root.walkRules((r) => {
    if (r.parent?.type === "atrule" && /keyframes/.test(r.parent.name)) return;
    r.selectors = r.selectors.map(scope);
  });
  root.walkDecls((d) => { d.value = d.value.replace(/url\(\/(assets|images)\//g, "url(/assets/official/$1__"); });
  out += root.toString() + "\n";
}
out += `.official{--font-nb-international-pro:"Pretendard Variable",Pretendard,system-ui,sans-serif;--font-inter:"Pretendard Variable",Pretendard,sans-serif;--font-inter-latin-ext:"Pretendard Variable";--font-geist-mono:geistMono;--font-ibm-plex-mono:geistMono;--font-stk-bureau-serif:"Pretendard Variable";word-break:keep-all;}\n`;
writeFileSync(new URL("../src/assets/official/official.css", import.meta.url), out);
console.log("wrote", out.length);
