---
title: Devin 기능 한눈에 보기
navTitle: 기능
description: Devin Cloud, Desktop, CLI, Review부터 Security, Oncall, Automations까지. 공식 문서로 확인한 기능을 쓰는 곳과 쓸 때로 나눠 정리했습니다.
permalink: /features/
series: 기능
seriesNumber: "개요"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T00:54:00+09:00
sources:
  - title: Introducing Devin
    url: https://docs.devin.ai/get-started/devin-intro
  - title: Your First Session
    url: https://docs.devin.ai/get-started/first-run
  - title: Devin Desktop FAQ
    url: https://docs.devin.ai/desktop/devin-desktop-faq
  - title: Devin in Devin Desktop
    url: https://docs.devin.ai/desktop/devin
  - title: Agent Command Center
    url: https://docs.devin.ai/desktop/agent-command-center
  - title: Devin CLI Quickstart
    url: https://docs.devin.ai/cli/index
  - title: Devin Review
    url: https://docs.devin.ai/work-with-devin/devin-review
  - title: Devin Security 2.0
    url: https://docs.devin.ai/work-with-devin/security-2-0
  - title: Devin Oncall
    url: https://docs.devin.ai/product-guides/devin-oncall
  - title: Automations
    url: https://docs.devin.ai/product-guides/automations
  - title: Ask Devin
    url: https://docs.devin.ai/work-with-devin/ask-devin
  - title: DeepWiki repository wikis
    url: https://docs.devin.ai/work-with-devin/deepwiki
  - title: Self-serve plans
    url: https://docs.devin.ai/admin/billing/self-serve
  - title: Devin Mobile (waitlist page)
    url: https://devin.ai/mobile
---

Devin은 하나의 앱이 아니라 여러 곳에서 쓰는 제품군입니다. 공식 Desktop FAQ는 제품을 **Devin Cloud, Devin Desktop, Devin CLI, Devin Review** 네 가지로 묶어 설명합니다. 이 페이지는 먼저 이 네 가지 ‘쓰는 곳’을 정리하고, 그 위에서 동작하는 업무 기능(보안, 장애 대응, 자동화 등)을 이어서 소개합니다.

<div class="reading-guide" role="note" aria-label="이 페이지를 읽는 법">
<p class="reading-guide__title">이 페이지를 읽는 법</p>
<ul>
<li><strong>표시 없는 본문</strong>은 공식 문서를 요약한 내용이고, 단락 아래 ‘근거’에 문서를 링크했습니다.</li>
<li class="is-tip"><strong>필자 제안</strong>은 공식 문서에 없는 필자의 의견입니다.</li>
<li>요금과 제공 범위는 자주 바뀝니다. 결정하기 전에 반드시 공식 문서를 다시 확인하세요.</li>
</ul>
</div>

## 쓰는 곳: 네 가지 제품

| 제품 | 하는 일 | 쓰기 좋은 때 | 접근 조건 |
| --- | --- | --- | --- |
| Devin Cloud | 클라우드 VM에서 Devin 세션을 실행합니다. Ask 모드로 계획하고 Agent 모드로 실행합니다. | 노트북을 닫아도 계속 진행돼야 하는 작업, PR까지 맡길 작업 | app.devin.ai 계정, 저장소 연결 |
| Devin Desktop | Windsurf의 새 이름입니다(2026년 6월 2일 전환). Agent Command Center에서 로컬·클라우드 에이전트를 한곳에서 관리합니다. | 편집기 안에서 직접 코드를 보며 에이전트와 일할 때 | Devin Desktop 앱 설치 |
| Devin CLI | 터미널에서 도는 로컬 코딩 에이전트입니다. 필요하면 작업을 클라우드 세션으로 넘길(handoff) 수 있습니다. | 터미널 중심으로 일하거나 로컬 환경이 꼭 필요할 때 | macOS, Linux, WSL, Windows |
| Devin Review | PR의 변경을 묶어 설명하고 잠재적 버그를 표시합니다. PR에 `/devin review`라고 댓글을 달면 한 건만 리뷰할 수도 있습니다. | 사람 리뷰 전에 변경을 이해하고 위험한 부분을 먼저 찾을 때 | GitHub(Enterprise Server·Cloud 포함), GitLab(Self-Managed 포함). 원문: <span lang="en">“available for PRs on GitHub repositories … and merge requests on GitLab repositories”</span> |

::: src
[Devin Desktop FAQ](https://docs.devin.ai/desktop/devin-desktop-faq), [Your First Session](https://docs.devin.ai/get-started/first-run), [Agent Command Center](https://docs.devin.ai/desktop/agent-command-center), [Devin CLI Quickstart](https://docs.devin.ai/cli/index), [Devin Review](https://docs.devin.ai/work-with-devin/devin-review)
:::

Desktop 안에서 클라우드 Devin에게 일을 넘기는 기능은 self-serve Desktop 플랜(Pro, Max, Teams)에 포함되어 있고, 접근 권한은 점진적으로 배포되고 있습니다(원문: <span lang="en">“Devin is included with every self-serve Devin Desktop plan (Pro, Max, Teams)”</span>, <span lang="en">“Access to Devin Cloud is rolling out gradually.”</span>). Enterprise 사용자는 관리자에게 확인하라고 안내합니다.

::: src
[Devin in Devin Desktop](https://docs.devin.ai/desktop/devin)
:::

### 모바일은 아직 대기자 명단 단계

공식 사이트의 Devin Mobile 페이지는 2026년 11월 8일 확인 기준 **대기자 명단(waitlist) 신청** 페이지입니다. 휴대폰에서 세션을 시작하고 알림을 받아 PR을 리뷰·병합하는 화면을 소개하지만, 일반 출시된 앱으로 안내하지는 않습니다(원문: <span lang="en">“Join the waitlist for Devin Mobile … Join the waitlist for early access”</span>). 이 가이드도 모바일을 별도 출시 제품으로 표기하지 않습니다.

::: src
[Devin Mobile](https://devin.ai/mobile)
:::

## 일하는 방식: Ask와 Agent

새 세션에는 두 모드가 있습니다. **Ask**는 코드를 바꾸지 않고 코드베이스를 탐색하고 계획을 세우는 가벼운 모드이고, **Agent**는 실제로 작업을 수행하는 모드입니다. 공식 문서는 계획이 완전히 정해져 있지 않다면 Ask로 계획을 만든 뒤 Agent로 실행하라고 권합니다. 모드는 모델과 다른 개념입니다. 모델은 [모델 페이지](/models/)에서 따로 다룹니다.

::: src
[Your First Session](https://docs.devin.ai/get-started/first-run), [Ask Devin](https://docs.devin.ai/work-with-devin/ask-devin)
:::

## 업무 기능

### Devin Security 2.0

저장소를 스캔해 취약점을 찾고, 조직 전체의 Findings 페이지에서 결과를 검토하며, 취약점 수정을 Devin에게 맡길 수 있습니다. 앱의 `/security`에서 시작합니다. 조직에 보안 스캔 접근 권한이 있어야 하고, 역할에 따라 스캔 시작·관리 권한이 다릅니다.

::: src
[Devin Security 2.0](https://docs.devin.ai/work-with-devin/security-2-0)
:::

### Devin Oncall

알림, 버그 리포트, 장애가 발생하면 바로 조사·수정·완화를 시작합니다. 공식 문서는 Oncall을 들어오는 문제를 조사하고 고치는 **Responders**와, 알림·버그·장애의 원인 경향을 보여 주는 **Reports**로 나눠 설명합니다.

::: src
[Devin Oncall](https://docs.devin.ai/product-guides/devin-oncall)
:::

### Automations

Slack 메시지, GitHub 웹훅, Linear 티켓 변경, 일정, 사용자 정의 웹훅 같은 외부 이벤트에 Devin 세션을 연결합니다. 자동화는 트리거와 액션으로 이뤄지고, 조건과 사전 점검(Preflight)을 덧붙일 수 있습니다. 예를 들어 `#bugs` 채널 메시지나 CI 실패를 트리거로 쓸 수 있습니다.

::: src
[Automations](https://docs.devin.ai/product-guides/automations)
:::

### Ask Devin과 DeepWiki

Ask Devin은 코드베이스에 질문하고 작업을 계획하는 기능이고, DeepWiki는 저장소마다 아키텍처 다이어그램과 문서, 소스 링크를 자동으로 만듭니다. 둘 다 저장소 인덱싱을 바탕으로 동작합니다.

::: src
[Ask Devin](https://docs.devin.ai/work-with-devin/ask-devin), [DeepWiki repository wikis](https://docs.devin.ai/work-with-devin/deepwiki)
:::

::: tip 기능은 하나씩 늘리기
처음부터 자동화와 보안 스캔을 모두 켜기보다, Cloud 세션 몇 번으로 지시문 쓰는 감을 익힌 뒤 Review나 Automations를 더하는 편이 결과를 판단하기 쉽습니다.
:::

## 요금제와 접근

공식 self-serve 요금제는 네 가지입니다. 가격은 확인일 기준이며 바뀔 수 있습니다.

| 플랜 | 대상 | 가격 | 인원 |
| --- | --- | --- | --- |
| Free | Devin을 시험해 보는 개인 | 무료 | 1명 |
| Pro | 개인 사용자 | 월 $20 | 1명 |
| Max | 사용량이 많은 개인 | 월 $200 | 1명 |
| Teams | 함께 쓰는 팀 | 월 $80부터 | 최대 200명 |

표의 가격은 공식 문서의 표기(<span lang="en">“$20/month”, “$200/month”, “$80/month minimum”, “Up to 200”</span>)를 옮긴 것입니다. Pro와 Max는 개인 플랜이라 여러 사람이 나눠 쓸 수 없고, 여러 명이 하나의 구독을 쓰려면 Teams가 필요합니다. Enterprise는 별도 계약입니다.

::: src
[Self-serve plans](https://docs.devin.ai/admin/billing/self-serve)
:::

처음이라면 [첫 작업 시작하기](/guides/first-task/)부터 읽어 보세요.
