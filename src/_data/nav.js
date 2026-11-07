// Primary navigation. Add an entry only when the page or section it points to exists.
// `match` marks a whole URL prefix as current; `section` is an in-page id used for scroll-spy on that page.
// `menu` renders a click-to-open grouped panel (no hover dependency); `url` stays the no-JS fallback.
export default [
  { label: "개요", url: "/", section: "overview" },
  { label: "시작하기", url: "/guides/first-task/", match: "/guides/" },
  {
    label: "제품",
    url: "/features/",
    match: "/features/",
    id: "product-menu",
    menu: [
      {
        heading: "사용 환경",
        items: [
          { label: "Devin Cloud", url: "/features/cloud/", desc: "클라우드 VM에서 작업을 끝내고 PR로" },
          { label: "Devin Desktop", url: "/features/desktop/", desc: "로컬·클라우드 에이전트를 한 화면에서" },
          { label: "Devin CLI", url: "/features/cli/", desc: "터미널 에이전트와 클라우드 넘기기" },
          { label: "Mobile", url: "/features/mobile/", desc: "대기자 명단 단계", tag: "출시 전" },
        ],
      },
      {
        heading: "업무 기능",
        items: [
          { label: "Devin Review", url: "/features/review/", desc: "PR 변경 설명과 버그 표시" },
          { label: "Devin Security", url: "/features/security/", desc: "취약점 스캔과 수정 PR" },
          { label: "Devin Oncall", url: "/features/oncall/", desc: "알림·인시던트 1차 조사" },
        ],
      },
    ],
    overview: { label: "제품·기능 전체 보기", url: "/features/" },
  },
  { label: "모델", url: "/models/" },
  { label: "활용사례", url: "/use-cases/" },
  { label: "스타트업 프로그램", url: "/startups/" },
];
