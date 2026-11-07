---
title: Devin 기능 한눈에 보기
navTitle: 제품
description: Devin의 제품과 기능을 공식 메뉴의 묶음대로 정리한 개요입니다. 제품마다 별도 페이지로 이어집니다.
permalink: /features/
series: 기능
seriesNumber: "개요"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T02:14:00+09:00
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
  - title: Local Hands for Devin Cloud Sessions
    url: https://docs.devin.ai/work-with-devin/local-hands
  - title: Devin CLI handoff
    url: https://docs.devin.ai/cli/handoff
  - title: Hand off to Devin Cloud from Any Agent
    url: https://docs.devin.ai/work-with-devin/devin-handoff
  - title: Agent Client Protocol (Devin Desktop)
    url: https://docs.devin.ai/desktop/acp
  - title: Devin macOS support
    url: https://docs.devin.ai/onboard-devin/environment/macos-support
  - title: Android emulator support
    url: https://docs.devin.ai/onboard-devin/environment/android-emulation
  - title: Devin CLI sandbox
    url: https://docs.devin.ai/cli/sandbox
  - title: Testing & Video Recordings
    url: https://docs.devin.ai/work-with-devin/testing-and-recordings
  - title: Quick Review
    url: https://docs.devin.ai/desktop/quick-review
  - title: Devin Desktop changelog
    url: https://docs.devin.ai/desktop/changelog
  - title: Devin Memory and Dreaming
    url: https://docs.devin.ai/product-guides/memory
  - title: Devin Skills
    url: https://docs.devin.ai/product-guides/skills
  - title: Devin environment setup
    url: https://docs.devin.ai/onboard-devin/environment
  - title: Devin environment blueprints
    url: https://docs.devin.ai/onboard-devin/environment/blueprints
  - title: Devin Code Scans
    url: https://docs.devin.ai/work-with-devin/code-scans
  - title: Devin Dynamic Workflows
    url: https://docs.devin.ai/work-with-devin/dynamic-workflows
  - title: "@devindevelopers: 20 things you might not know Devin can do (X thread, first post)"
    url: https://x.com/devindevelopers/status/2118851585707053162
---

Devin은 하나의 앱이 아니라 여러 곳에서 쓰는 제품군입니다. 공식 Desktop FAQ는 제품을 **Devin Cloud, Devin Desktop, Devin CLI, Devin Review** 네 가지로 묶어 설명합니다. 공식 사이트 메뉴는 여기에 Mobile을 더해 사용 환경으로 묶고, Review·Security·Oncall을 기능으로 둡니다. 이 페이지는 그 묶음대로 각 제품 페이지를 안내하고, 여러 제품에 걸친 기능과 공식 개발자 계정이 소개한 보조 기능을 이어서 정리합니다.

<div class="reading-guide" role="note" aria-label="이 페이지를 읽는 법">
<p class="reading-guide__title">이 페이지를 읽는 법</p>
<ul>
<li><strong>표시 없는 본문</strong>은 공식 문서를 요약한 내용이고, 단락 아래 ‘근거’에 문서를 링크했습니다.</li>
<li class="is-tip"><strong>필자 제안</strong>은 공식 문서에 없는 필자의 의견입니다.</li>
<li>요금과 제공 범위는 자주 바뀝니다. 결정하기 전에 반드시 공식 문서를 다시 확인하세요.</li>
</ul>
</div>

## 제품별 페이지

공식 사이트의 Product 메뉴는 사용 환경(Surfaces)으로 Devin Cloud, Devin Desktop, Devin CLI, Mobile을 묶고, Review·Security·Oncall은 기능(Features)으로 따로 둡니다. 이 가이드도 같은 묶음을 따릅니다. 제품마다 하는 일, 고르는 때, 시작 순서, 접근 조건을 별도 페이지에 정리했습니다.

### 사용 환경

| 제품 | 한 줄 요약 | 이럴 때 | 접근 조건 요약 |
| --- | --- | --- | --- |
| [Devin Cloud](/features/cloud/) | 클라우드 VM에서 혼자 작업하고 PR로 돌려줍니다. Ask로 계획, Agent로 실행 | 몇 시간짜리 작업, 병렬 작업, 이벤트 자동화 | app.devin.ai 계정, 저장소 연결 |
| [Devin Desktop](/features/desktop/) | Windsurf의 새 이름(2026년 6월 2일 전환). 로컬·클라우드 에이전트를 한 화면에서 관리 | 편집기에서 직접 보며 에이전트와 일할 때 | full seat 사용자. 앱 설치 |
| [Devin CLI](/features/cli/) | 터미널의 로컬 코딩 에이전트. `/handoff`로 클라우드에 넘김 | 터미널 중심 작업, 로컬 환경이 꼭 필요할 때 | macOS, Linux, WSL, Windows |
| [Mobile](/features/mobile/) | 휴대폰에서 세션을 시작하고 알림을 받는 앱 | 출시 전. 대기자 명단 단계 | 공식 페이지 원문: <span lang="en">“Join the waitlist for early access”</span> |

### 업무 기능

| 기능 | 한 줄 요약 | 이럴 때 | 접근 조건 요약 |
| --- | --- | --- | --- |
| [Devin Review](/features/review/) | PR 변경을 묶어 설명하고 잠재적 버그를 표시 | 사람 리뷰 전에 변경을 이해하고 위험한 곳을 찾을 때 | GitHub(Enterprise Server·Cloud 포함), GitLab(Self-Managed 포함). 공개 PR은 계정 불필요 |
| [Devin Security](/features/security/) | Security 2.0. 취약점 스캔, Findings 관리, Fix with Devin | 조직 저장소의 취약점을 모아 보고 고칠 때 | 조직의 보안 스캔 접근과 역할 권한 |
| [Devin Oncall](/features/oncall/) | 알림·버그·인시던트를 먼저 조사하고 고치거나 넘김 | 반복 알림 조사, 야간 1차 대응 | 조직별 1회 설정, Oncall 관리 권한 |

::: src
[Devin Desktop FAQ](https://docs.devin.ai/desktop/devin-desktop-faq), [Devin CLI Quickstart](https://docs.devin.ai/cli/index), [Devin Review](https://docs.devin.ai/work-with-devin/devin-review), [Devin Security 2.0](https://docs.devin.ai/work-with-devin/security-2-0), [Devin Oncall](https://docs.devin.ai/product-guides/devin-oncall), [Devin Mobile](https://devin.ai/mobile)
:::

공식 메뉴의 DeepWiki, Automations, Cost Controls, Analytics, Plugins, Outposts, Windows·macOS VM은 별도 페이지로 나누지 않았습니다. 이 가이드에서는 관련 제품 페이지나 아래 절에서 다룹니다. Fusion과 SWE 같은 모델은 [모델](/models/) 페이지에 있습니다.

## 일하는 방식: Ask와 Agent

새 세션에는 두 모드가 있습니다. **Ask**는 코드를 바꾸지 않고 코드베이스를 탐색하고 계획을 세우는 가벼운 모드이고, **Agent**는 실제로 작업을 수행하는 모드입니다. 공식 문서는 계획이 완전히 정해져 있지 않다면 Ask로 계획을 만든 뒤 Agent로 실행하라고 권합니다. 모드는 모델과 다른 개념입니다. 모델은 [모델 페이지](/models/)에서 따로 다룹니다.

::: src
[Your First Session](https://docs.devin.ai/get-started/first-run), [Ask Devin](https://docs.devin.ai/work-with-devin/ask-devin)
:::

## 여러 제품에 걸친 기능

### Automations

Slack 메시지, GitHub·GitLab 이벤트, Linear, PagerDuty, 일정, 사용자 정의 웹훅 같은 외부 이벤트에 Devin 세션을 연결합니다. 자동화는 트리거와 액션으로 이뤄지고, 조건과 사전 점검(Preflight)을 덧붙일 수 있습니다. 보안 스캔을 정기적으로 돌릴 때도 씁니다. 자세한 쓰임은 [Devin Cloud](/features/cloud/)와 [Devin Security](/features/security/)에 있습니다.

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

## 공식 계정이 소개한 기능, 문서로 다시 보기

Devin 공식 개발자 계정(@devindevelopers)은 X 스레드에서 “20 things you might not know Devin can do”라는 제목으로 기능 20가지를 소개했습니다. 이 절은 그중 관련 있는 기능을 다섯 묶음으로 나누고, **스레드 문장은 짧게 인용만 하고 기능 설명과 제약은 현재 공식 문서로 다시 확인한 내용**으로 적었습니다. 스레드는 홍보 성격의 소개이므로, 문서에서 확인되지 않은 표현은 옮기지 않았습니다.

### 로컬과 클라우드를 잇기

- **Local Hands**: 클라우드 세션이 내 컴퓨터에서 셸 명령을 실행하고 파일을 읽고 고칠 수 있게 합니다. 다만 무제한 접근이 아닙니다. 세션 소유자 본인이어야 하고, 같은 계정으로 로그인한 Devin Desktop이나 CLI가 필요하며, 조직의 Local Hands 설정이 켜져 있어야 하고, 도구 호출마다 승인을 받습니다. 화면·키보드·마우스는 제어하지 않습니다. 승인할 사용자가 없는 세션(일정 실행 세션, 자동화, 승인할 사용자가 없는 서비스 사용자 API 세션), 보안 프로필을 쓰는 세션, 네이티브 배포가 꺼진 조직에서는 쓸 수 없고, 아직 점진 배포 중입니다.
- **Handoff**: CLI에서 `/handoff`를 실행하면 대화 맥락과 현재 git 브랜치를 묶어 클라우드 세션으로 넘깁니다. 로컬에서 계획하고 오래 걸리는 구현은 클라우드에 맡기는 식으로 쓸 수 있습니다. Claude Code, Codex 같은 다른 에이전트에서는 오픈소스 Devin Handoff 플러그인으로 넘깁니다.
- **Agent Command Center**: Devin Desktop 안에서 로컬 에이전트와 클라우드 Devin 세션을 한 화면에서 관리합니다. ACP(Agent Client Protocol)를 지원하는 서드파티 에이전트도 여기서 실행할 수 있습니다. 문서 기준 Free, Pro, Max, Teams에서 쓸 수 있고 Enterprise는 기본적으로 꺼져 있습니다. 외부 ACP 에이전트를 쓰면 과금과 약관은 해당 제공사와의 관계로 넘어갑니다.

스레드 원문: <span lang="en">“Devin Cloud can run commands on your machine.”</span> ([@devindevelopers 게시물: Local Hands](https://x.com/devindevelopers/status/2118851585707053162)), <span lang="en">“Plan locally, then hand the build to a cloud session.”</span> ([@devindevelopers 게시물: Handoff](https://x.com/devindevelopers/status/2118851596750635513)), <span lang="en">“Start and manage local and cloud agents from one screen.”</span> ([@devindevelopers 게시물: Agent Command Center](https://x.com/devindevelopers/status/2118851618456174879)). 스레드의 ‘ACP 에이전트 40개 이상’은 게시 시점의 숫자라 옮기지 않았습니다.

::: src
[Local Hands for Devin Cloud Sessions](https://docs.devin.ai/work-with-devin/local-hands), [Devin CLI handoff](https://docs.devin.ai/cli/handoff), [Hand off to Devin Cloud from Any Agent](https://docs.devin.ai/work-with-devin/devin-handoff), [Agent Command Center](https://docs.devin.ai/desktop/agent-command-center), [Agent Client Protocol](https://docs.devin.ai/desktop/acp)
:::

### 실행 환경과 플랫폼

- **macOS VM과 iOS Simulator**: 블루프린트에 `runs-on: macos`를 지정하면 Devin이 Xcode와 iOS Simulator로 iOS·macOS 앱을 빌드하고 테스트하며, TestFlight 업로드도 안내되어 있습니다. Dedicated SaaS 배포는 계정 팀을 통해 켜야 합니다.
- **Android 에뮬레이터**: 세션 안의 에뮬레이터에서 Android 앱을 빌드·실행하고, 주요 흐름을 눌러 보며 녹화로 결과를 남길 수 있습니다.
- **CLI 샌드박스**: `--sandbox`로 실행하면 운영체제 수준에서 쓸 수 있는 경로와 네트워크를 제한합니다. 샌드박스를 만들 수 없는 환경에서는 CLI가 샌드박스 없이 실행하지 않고 시작을 거부합니다.

스레드는 특정 기기의 접힌·펼친 화면 테스트까지 언급하지만([@devindevelopers 게시물: macOS and iOS VMs](https://x.com/devindevelopers/status/2118851587611201626)), 현재 공식 문서에서는 그 내용을 확인하지 못해 일반적인 iOS Simulator 지원으로만 적었습니다. Android는 [@devindevelopers 게시물: Android Testing](https://x.com/devindevelopers/status/2118851594821189705), 샌드박스는 [@devindevelopers 게시물: Sandboxing](https://x.com/devindevelopers/status/2118851598659022976)에서 소개되었습니다.

::: src
[Devin macOS support](https://docs.devin.ai/onboard-devin/environment/macos-support), [Android emulator support](https://docs.devin.ai/onboard-devin/environment/android-emulation), [Devin CLI sandbox](https://docs.devin.ai/cli/sandbox)
:::

### 검증 근거 남기기

- **테스트 녹화**: PR을 만든 뒤 Devin이 앱을 실행하고 브라우저로 직접 조작하며 화면을 녹화하고, 중요한 순간에 텍스트 주석을 달아 영상으로 보냅니다. 리뷰어가 동작을 빠르게 확인하도록 돕는 근거이며, CI의 자동 테스트를 대신하지는 않습니다.
- **Quick Review**: Devin Desktop에서 Devin Local 에이전트가 만든 로컬 변경을 별도 에이전트가 다시 검토해, 커밋하기 전에 편집기 안에 의견을 보여 줍니다. 가격은 요금제에 따라 다릅니다.
- **Since last seen 보기**: Desktop 변경 기록(changelog)에 따르면 로컬 세션의 Changes 탭에 파일별 diff와 “Since last seen” 범위가 추가되어, 마지막으로 본 뒤 바뀐 부분만 볼 수 있습니다.

스레드 원문: <span lang="en">“Devin records and annotates its own UI tests.”</span> ([@devindevelopers 게시물: Test Recordings](https://x.com/devindevelopers/status/2118851622264869316)), <span lang="en">“A second agent reviews your uncommitted diff before you commit.”</span> ([@devindevelopers 게시물: Quick Review](https://x.com/devindevelopers/status/2118851611535577192)), <span lang="en">“Review only what changed since you last looked.”</span> ([@devindevelopers 게시물: Since Last Seen Diffs](https://x.com/devindevelopers/status/2118851620301685217))

::: src
[Testing & Video Recordings](https://docs.devin.ai/work-with-devin/testing-and-recordings), [Quick Review](https://docs.devin.ai/desktop/quick-review), [Devin Desktop changelog](https://docs.devin.ai/desktop/changelog)
:::

### 반복할수록 팀에 맞춰지기

- **Memory**: 선호, 교정, 프로젝트에서 배운 점을 노트로 저장해 다음 세션에 이어 씁니다. 메모리는 조직 안에서도 **개인 단위**라 팀원과 공유되지 않습니다.
- **Skills**: 저장소의 `.agents/skills/<이름>/SKILL.md` 파일이나 Customize 페이지로 테스트, 배포, 리뷰 같은 반복 절차를 가르칩니다. 팀이 함께 쓰는 절차는 메모리가 아니라 스킬로 남기는 편이 맞습니다.
- **환경 스냅샷**: Devin이 저장소를 보고 블루프린트를 제안하면, 사람이 검토·승인한 뒤 빌드가 스냅샷을 만듭니다. 이후 세션은 저장소, 도구, 의존성, 환경 변수가 준비된 그 스냅샷에서 시작합니다. 비밀값은 Secrets에 저장합니다.

스레드 원문: <span lang="en">“Guide or correct Devin once, and future sessions apply it without being asked.”</span> ([@devindevelopers 게시물: Memory](https://x.com/devindevelopers/status/2118851600802525473)), <span lang="en">“Teach Devin your team's workflow once, then reuse it anywhere.”</span> ([@devindevelopers 게시물: Skills](https://x.com/devindevelopers/status/2118851614140403905)), 환경 설정은 [@devindevelopers 게시물: Environment Setup](https://x.com/devindevelopers/status/2118851627742552409)

::: src
[Devin Memory and Dreaming](https://docs.devin.ai/product-guides/memory), [Devin Skills](https://docs.devin.ai/product-guides/skills), [Devin environment setup](https://docs.devin.ai/onboard-devin/environment), [Devin environment blueprints](https://docs.devin.ai/onboard-devin/environment/blueprints)
:::

### 개발 수명주기 전반으로 넓히기

- **Code Scans**: 작성창에 `/scan`과 찾고 싶은 내용을 적고 저장소를 지정하면, 성능, 테스트 커버리지, 죽은 코드, 접근성 같은 문제를 찾아 결과(findings)를 내고 PR로 고칠 수 있습니다. 완료된 스캔은 새 커밋만 다시 스캔할 수 있고, Automations로 일정 실행도 됩니다. ‘Use code scans’ 권한이 필요합니다.
- **보안 수정**: Security 2.0에서 찾은 취약점을 Devin에게 배정해 수정을 맡깁니다. 조직의 보안 스캔 접근 권한과 역할 권한이 필요합니다.
- **Dynamic Workflows**: Devin이 결정적인 Python 스크립트를 작성해 여러 Devin 세션에 일을 나누고 결과를 합칩니다. 문서는 판단이 필요한 독립 단위가 대략 다섯 개 이상일 때 적합하고, 그보다 작으면 일반 세션을 권합니다.

스레드 원문: <span lang="en">“Scans can cover multiple repos, re-run on new commits, and turn findings into PRs.”</span> ([@devindevelopers 게시물: Code Scans](https://x.com/devindevelopers/status/2118851605185618134)), <span lang="en">“Turn a security finding into a tested fix PR.”</span> ([@devindevelopers 게시물: Native Security Fixes](https://x.com/devindevelopers/status/2118851607735513526)), <span lang="en">“One prompt fans out to many agents, then combines the results.”</span> ([@devindevelopers 게시물: Dynamic Workflows](https://x.com/devindevelopers/status/2118851609606148103))

::: src
[Devin Code Scans](https://docs.devin.ai/work-with-devin/code-scans), [Devin Security 2.0](https://docs.devin.ai/work-with-devin/security-2-0), [Devin Dynamic Workflows](https://docs.devin.ai/work-with-devin/dynamic-workflows)
:::

::: tip 홍보 문장과 문서 확인을 구분하기
스레드의 한 줄 소개는 기능의 존재를 알리는 데 쓰고, 실제 도입 판단은 권한·플랜·배포 상태가 적힌 공식 문서로 하는 편이 안전합니다. 스레드 마지막 게시물의 할인 코드처럼 기간이 정해진 혜택은 이 가이드에 싣지 않습니다.
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
