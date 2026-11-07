// Primary navigation. Add an entry only when the page or section it points to exists.
// `match` marks a whole URL prefix as current; `section` is an in-page id used for scroll-spy on that page.
export default [
  { label: "개요", url: "/", section: "overview" },
  { label: "시작하기", url: "/guides/first-task/", match: "/guides/" },
  { label: "기능", url: "/features/" },
  { label: "모델", url: "/models/" },
  { label: "활용사례", url: "/use-cases/" },
  { label: "스타트업 프로그램", url: "/startups/" },
];
