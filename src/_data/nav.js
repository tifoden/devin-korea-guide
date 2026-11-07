// Primary navigation. Add an entry only when the page or section it points to exists.
// `match` marks a whole URL prefix as current; `section` is an in-page id used for scroll-spy on that page.
export default [
  { label: "개요", url: "/", section: "overview" },
  { label: "가이드", url: "/guides/first-task/", match: "/guides/" },
  { label: "다룰 내용", url: "/#roadmap", section: "roadmap" },
  { label: "편집 기준", url: "/#editorial", section: "editorial" },
];
