---
title: Devin Desktop
navTitle: Devin Desktop
description: Windsurf의 새 이름. 로컬 에이전트와 클라우드 Devin을 한 화면에서 관리하는 편집기입니다. 설치, 고를 때, 요금제 조건을 공식 문서로 정리했습니다.
permalink: /features/desktop/
series: 제품
seriesNumber: "Devin Desktop"
parentLabel: 제품
parentUrl: /features/
crumb: "Devin Desktop"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T02:14:00+09:00
sources:
  - title: "Devin Desktop FAQ"
    url: https://docs.devin.ai/desktop/devin-desktop-faq
  - title: "Welcome to Devin Desktop"
    url: https://docs.devin.ai/desktop/getting-started
  - title: "Install Devin Desktop"
    url: https://docs.devin.ai/desktop/install
  - title: "Devin Local"
    url: https://docs.devin.ai/desktop/devin-local/overview
  - title: "Devin in Devin Desktop"
    url: https://docs.devin.ai/desktop/devin
  - title: "Agent Command Center"
    url: https://docs.devin.ai/desktop/agent-command-center
  - title: "Agent Client Protocol"
    url: https://docs.devin.ai/desktop/acp
  - title: "Quick Review"
    url: https://docs.devin.ai/desktop/quick-review
  - title: "Devin Desktop Previews"
    url: https://docs.devin.ai/desktop/previews
  - title: "Codemaps"
    url: https://docs.devin.ai/desktop/codemaps
  - title: "Devin Desktop (product page)"
    url: https://devin.ai/desktop
---

Devin Desktop은 **Windsurf의 새 이름**입니다. 공식 FAQ에 따르면 Windsurf가 Devin Desktop이 되면서 Agent Command Center가 기본 화면이 되었고, 기존 Windsurf IDE 기능과 설정은 그대로 남습니다([Devin Desktop FAQ](https://docs.devin.ai/desktop/devin-desktop-faq)). 편집기 안에서 직접 코딩하면서, 로컬 에이전트와 클라우드 Devin 세션을 한곳에서 관리하는 도구라고 보면 됩니다.

## 이럴 때 고릅니다

- **내 편집기에서 에이전트와 함께 고치고 싶을 때.** 기본 로컬 에이전트인 **Devin Local**은 Devin CLI와 같은 에이전트 구조를 쓰며, Code, Smart, Ask, Plan, Bypass Permissions 모드와 권한 규칙, 샌드박스, worktree를 지원합니다.
- **여러 에이전트를 한 화면에서 관리하고 싶을 때.** Agent Command Center에서 로컬 에이전트와 클라우드 Devin 세션을 함께 봅니다.
- **로컬에서 계획하고 구현은 클라우드에 넘기고 싶을 때.** 공식 문서는 로컬 에이전트와 세운 계획을 클릭 한 번으로 Devin에게 보내 구현하게 할 수 있다고 설명합니다([Devin in Devin Desktop](https://docs.devin.ai/desktop/devin)).
- **다른 회사 에이전트도 같이 쓸 때.** ACP(Agent Client Protocol)를 지원하는 서드파티 에이전트를 Agent Command Center 안에서 실행할 수 있습니다.

## 주요 기능

| 기능 | 하는 일 | 알아 둘 점 |
|---|---|---|
| Agent Command Center | 로컬·클라우드 에이전트를 한 화면에서 시작하고 관리 | Devin Desktop 2.0에서 추가된 화면입니다 |
| Devin Local | 편집기 안의 로컬 에이전트 | 하위 에이전트(Subagents)는 Preview 토글로 켭니다. Enterprise에서는 관리자가 끌 수 있습니다 |
| Quick Review | 로컬 변경을 별도 에이전트가 커밋 전에 검토 | 가격은 요금제에 따라 다릅니다 |
| Previews | 로컬 앱을 편집기나 브라우저에서 미리 보고, 요소와 콘솔 오류를 에이전트에 보냄 | Chrome, Arc 등 Chromium 계열에 맞춰져 있습니다 |
| Codemaps | 코드 실행 흐름을 공유 가능한 지도로 보여 줌 | 노드를 누르면 해당 파일·함수로 이동합니다 |
| ACP 에이전트 | 서드파티·커스텀 에이전트 실행 | Free, Pro, Max, Teams에서 쓸 수 있고 Enterprise는 기본 꺼짐. 외부 에이전트의 과금과 약관은 해당 제공사와의 관계입니다 |

::: src
[Agent Command Center](https://docs.devin.ai/desktop/agent-command-center), [Devin Local](https://docs.devin.ai/desktop/devin-local/overview), [Quick Review](https://docs.devin.ai/desktop/quick-review), [Previews](https://docs.devin.ai/desktop/previews), [Codemaps](https://docs.devin.ai/desktop/codemaps), [Agent Client Protocol](https://docs.devin.ai/desktop/acp)
:::

## 설치와 시작

1. 공식 설치 문서에서 macOS, Windows, Linux 설치 파일을 받습니다. Linux는 glibc 2.28 이상이 필요하고 deb·rpm 저장소도 제공됩니다([Install Devin Desktop](https://docs.devin.ai/desktop/install)).
2. 첫 실행 때 테마를 고르고 VS Code나 Cursor 설정을 가져온 뒤 Devin 계정으로 로그인합니다. 계정이 없으면 무료로 가입할 수 있다고 안내되어 있습니다.
3. 터미널에서 열고 싶다면 `devin-desktop` 명령을 설치합니다. 예전 `surf` 명령을 대체합니다.

이 가이드는 설치 파일을 직접 배포하지 않습니다. 내려받기는 공식 문서의 링크를 이용하세요.

## 접근 조건

- **요금제와 좌석:** 공식 FAQ는 <span lang="en">“Devin Desktop is available to users with full seats.”</span>라고 적고 있습니다. Teams 플랜에서는 full seat를 추가하면 Devin Desktop과 모든 Devin 제품에서 쓰는 사용량이 함께 열린다고 설명합니다([FAQ](https://docs.devin.ai/desktop/devin-desktop-faq)).
- **Desktop에서 클라우드 Devin 쓰기:** self-serve Pro, Max, Teams에 포함되지만 <span lang="en">“Access to Devin Cloud is rolling out gradually.”</span>라는 안내가 있습니다([Devin in Devin Desktop](https://docs.devin.ai/desktop/devin)). 기존 Windsurf Enterprise 고객에게 Devin Cloud는 별도 상품이라고 FAQ에 적혀 있습니다.
- **기존 Windsurf 사용자:** 요금과 플랜은 바뀌지 않았고 설정은 자동으로 옮겨집니다. Windsurf JetBrains 플러그인은 유지 관리 모드여서, 공식 문서는 ACP 기반 Devin으로 바꾸라고 권합니다.

함께 보기: [Devin CLI](/features/cli/) · [Devin Review](/features/review/) · [모델](/models/)
