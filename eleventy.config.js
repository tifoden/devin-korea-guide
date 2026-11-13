import { readFileSync } from "node:fs";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItContainer from "markdown-it-container";

const NOTE_KINDS = {
  tip: "팁",
  exercise: "예시",
  caution: "주의",
};

function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("replica", (name) => readFileSync(`src/_includes/replica/${name}.html`, "utf8"));
  eleventyConfig.ignores.add("src/_includes/replica/**");
  const md = markdownIt({ html: true, linkify: false, typographer: false })
    .use(markdownItAnchor, { slugify, tabIndex: false });

  for (const [kind, label] of Object.entries(NOTE_KINDS)) {
    md.use(markdownItContainer, kind, {
      render(tokens, idx) {
        const info = tokens[idx].info.trim().slice(kind.length).trim();
        if (tokens[idx].nesting === 1) {
          const title = info ? `<span class="note__title">${md.utils.escapeHtml(info)}</span>` : "";
          return `<aside class="note note--${kind}" aria-label="${label}"><p class="note__label">${label}</p>${title}\n`;
        }
        return "</aside>\n";
      },
    });
  }

  md.use(markdownItContainer, "src", {
    render(tokens, idx) {
      return tokens[idx].nesting === 1 ? '<div class="src" hidden>' : "</div>\n";
    },
  });

  const defaultTable = md.renderer.rules.table_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
  md.renderer.rules.table_open = (tokens, idx, options, env, self) =>
    '<div class="table-wrap" role="region" tabindex="0" aria-label="표 (가로 스크롤 가능)">' + defaultTable(tokens, idx, options, env, self);
  const defaultTableClose = md.renderer.rules.table_close || ((t, i, o, e, s) => s.renderToken(t, i, o));
  md.renderer.rules.table_close = (tokens, idx, options, env, self) => defaultTableClose(tokens, idx, options, env, self) + "</div>";

  const defaultFence = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) =>
    defaultFence(tokens, idx, options, env, self).replace("<pre>", '<pre tabindex="0">');

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/pretendard/dist/web/variable/woff2-dynamic-subset": "assets/fonts/pretendard/woff2-dynamic-subset",
    "node_modules/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css": "assets/fonts/pretendard/pretendardvariable-dynamic-subset.css",
  });

  eleventyConfig.addCollection("guides", (api) =>
    api.getFilteredByGlob("src/guides/*.md").filter((p) => p.data.status !== "draft-hidden")
  );

  eleventyConfig.addFilter("startsWith", (str, prefix) => String(str).startsWith(prefix));
  eleventyConfig.addFilter("koDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "long", day: "numeric" }).format(d);
  });

  eleventyConfig.addFilter("toc", (html) => {
    const items = [];
    const re = /<h2 id="([^"]+)"[^>]*>(.*?)<\/h2>/g;
    let m;
    while ((m = re.exec(html))) items.push({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") });
    return items;
  });

  eleventyConfig.addFilter("readingMinutes", (html) => {
    const chars = String(html).replace(/<[^>]+>/g, "").replace(/\s+/g, "").length;
    return Math.max(1, Math.round(chars / 500));
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
