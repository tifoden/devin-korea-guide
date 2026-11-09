import postcss from "postcss";
import { readFileSync, writeFileSync } from "node:fs";
const dir = new URL("./app/", import.meta.url).pathname;
const files = ["app-initial-D3Ou5BxJ.css", "app-initial-CYH_ujyX.css", "main-DxGdbSuW.css", "prose-styles-BVuXaJ--.css"];
const ROOTISH = /^(:root|:host|html|body)(?![\w-])/;
const WRAP = /^\.(light|dark)(?![\w-])/;
const scope = (sel) => { sel = sel.trim(); if (ROOTISH.test(sel)) return sel.replace(ROOTISH, ".official-app"); if (WRAP.test(sel)) return `.official-app${sel}, .official-app ${sel}`; return `.official-app ${sel}`; };
let out = "";
for (const f of files) {
  const root = postcss.parse(readFileSync(dir + f, "utf8"));
  root.walkAtRules("layer", (at) => { if (at.nodes) at.replaceWith(at.nodes); else at.remove(); });
  root.walkAtRules("font-face", (at) => { if (!/Excalifont/.test(at.toString())) at.remove(); else at.walkDecls("src", (d) => { d.value = "url(/assets/official/app__Excalifont-Regular.woff2) format(\"woff2\")"; }); });
  root.walkRules((r) => { if (r.parent?.type === "atrule" && /keyframes/.test(r.parent.name)) return; r.selectors = r.selectors.map(scope); });
  out += root.toString() + "\n";
}
out += `.official-app{--font-sans:"Pretendard Variable",Pretendard,system-ui,sans-serif;font-family:"Pretendard Variable",Pretendard,system-ui,sans-serif;word-break:keep-all;}\n.official-app code,.official-app .font-mono{font-family:geistMono,ui-monospace,monospace;}\n`;
writeFileSync(new URL("../src/assets/official/official-app.css", import.meta.url), out);
console.log("wrote", out.length);
