// Downloads the NB International Pro webfonts served publicly on https://devin.ai/desktop
// into src/assets/fonts/official/ for local review builds.
// The files are commercially licensed (Neubau, "All rights reserved") and are git-ignored.
// Do not commit them until redistribution rights are confirmed in writing.
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "https://devin.ai/_next/static/immutable/media/";
const FILES = {
  "NBInternationalPro_Light-s.p.2ha41b_ddzi59.woff2": "nb-international-pro-light.woff2",
  "NBInternationalPro_Regular-s.p.1zobv4yb0l45-.woff2": "nb-international-pro-regular.woff2",
};
const outDir = new URL("../src/assets/fonts/official/", import.meta.url);
await mkdir(outDir, { recursive: true });

for (const [remote, local] of Object.entries(FILES)) {
  const res = await fetch(BASE + remote);
  if (!res.ok) throw new Error(`${res.status} ${BASE + remote}`);
  await writeFile(new URL(local, outDir), Buffer.from(await res.arrayBuffer()));
  console.log(`saved ${local}`);
}
