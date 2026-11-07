---
title: Devin Cloud
navTitle: Devin Cloud
description: 클라우드 VM에서 혼자 작업을 끝내고 PR로 돌려주는 Devin의 기본 환경. 언제 고르는지, 시작 순서, 접근 조건을 공식 문서로 정리했습니다.
permalink: /features/cloud/
series: 제품
seriesNumber: "Devin Cloud"
parentLabel: 제품
parentUrl: /features/
crumb: "Devin Cloud"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T02:14:00+09:00
sources:
  - title: "Introducing Devin"
    url: https://docs.devin.ai/get-started/devin-intro
  - title: "Your First Session"
    url: https://docs.devin.ai/get-started/first-run
  - title: "Ask Devin"
    url: https://docs.devin.ai/work-with-devin/ask-devin
  - title: "Devin Cloud (product page)"
    url: https://devin.ai/cloud
  - title: "Self-serve plans"
    url: https://docs.devin.ai/admin/billing/self-serve
  - title: "Automations"
    url: https://docs.devin.ai/product-guides/automations
  - title: "Local Hands for Devin Cloud Sessions"
    url: https://docs.devin.ai/work-with-devin/local-hands
  - title: "Testing & Video Recordings"
    url: https://docs.devin.ai/work-with-devin/testing-and-recordings
  - title: "Devin environment setup"
    url: https://docs.devin.ai/onboard-devin/environment
  - title: "Devin Memory and Dreaming"
    url: https://docs.devin.ai/product-guides/memory
  - title: "Devin Skills"
    url: https://docs.devin.ai/product-guides/skills
  - title: "Devin Dynamic Workflows"
    url: https://docs.devin.ai/work-with-devin/dynamic-workflows
---

Devin Cloud는 Devin이 **자기 클라우드 가상 머신(VM)** 에서 코드를 쓰고, 실행하고, 테스트하는 환경입니다. 웹 앱(app.devin.ai), Slack·Teams, API, 그리고 Devin Desktop·CLI에서 세션을 시작할 수 있습니다. 내 컴퓨터가 꺼져 있어도 세션은 계속됩니다. 공식 제품 페이지는 이를 <span lang="en">“Close your laptop. Come back to finished PRs.”</span>라고 소개합니다([devin.ai/cloud](https://devin.ai/cloud)).

## 이럴 때 고릅니다

- **몇 시간짜리 작업을 맡기고 다른 일을 할 때.** 공식 소개 문서는 <span lang="en">“if you can do it in three hours, Devin can most likely do it”</span>을 기준으로 듭니다([Introducing Devin](https://docs.devin.ai/get-started/devin-intro)). 아주 어려운 작업은 단계로 나누라고 권합니다.
- **결과를 PR과 녹화로 받고 싶을 때.** Devin은 PR을 만든 뒤 앱을 실행하고 브라우저로 조작하며 녹화해 보내 줄 수 있습니다. 리뷰를 돕는 근거이고 CI를 대신하지는 않습니다.
- **여러 작업을 동시에 돌릴 때.** 세션마다 VM이 따로 있어서 병렬로 진행됩니다.
- **이벤트에 반응하게 하고 싶을 때.** Automations로 Slack 메시지, GitHub·GitLab 이벤트, Linear, PagerDuty, 웹훅, 일정에서 세션을 자동으로 시작합니다.

빠르게 질문만 하거나 내 편집기 안에서 함께 고치고 싶다면 [Devin Desktop](/features/desktop/)이나 [Devin CLI](/features/cli/)가 더 가깝습니다.

## 시작 순서

1. app.devin.ai에서 가입하고 GitHub·GitLab 같은 소스 코드 저장소를 연결합니다.
2. 저장소를 **인덱싱**하고 **환경을 설정**합니다. 공식 문서는 첫 세션 전에 이 두 단계를 먼저 하라고 안내합니다([Your First Session](https://docs.devin.ai/get-started/first-run)). 환경은 스냅샷으로 저장되고, 이후 세션은 모두 그 스냅샷에서 시작합니다.
3. **Ask**로 질문하고 계획을 세운 뒤 **Agent**로 실행합니다. Ask는 코드를 바꾸지 않습니다. 공식 문서는 범위가 다 정해진 계획이 없다면 Ask부터 시작하라고 권합니다.
4. 세션을 지켜보다 필요하면 끼어들고, 끝나면 PR과 녹화를 검토합니다.

자세한 첫 작업 흐름은 [Devin으로 첫 작업 시작하기](/guides/first-task/)에 정리했습니다.

## 함께 쓰는 기능

| 기능 | 하는 일 | 알아 둘 제약 |
|---|---|---|
| Local Hands | 클라우드 세션이 내 컴퓨터에서 셸 명령과 파일 작업을 합니다 | 세션 소유자 본인, 같은 계정의 Desktop·CLI, 조직 설정, 도구 호출마다 승인이 필요합니다. 화면·마우스는 제어하지 않습니다. 일정 실행 세션, 자동화, 승인할 사용자가 없는 서비스 사용자 API 세션, 보안 프로필 세션, 네이티브 배포가 꺼진 조직에서는 쓸 수 없고 점진 배포 중입니다 |
| Memory | 선호와 교정을 노트로 남겨 다음 세션에 이어 씁니다 | 조직 안에서도 개인 단위이며 팀과 공유되지 않습니다 |
| Skills | `SKILL.md`로 반복 절차를 가르칩니다 | 저장소의 `.agents/skills/` 또는 Customize 페이지에 둡니다 |
| 환경 스냅샷 | Devin이 제안한 블루프린트를 승인하면 빌드가 스냅샷을 만듭니다 | 비밀값은 Secrets에 저장합니다 |
| Dynamic Workflows | Python 스크립트로 여러 세션에 일을 나누고 결과를 합칩니다 | 판단이 필요한 독립 단위가 대략 다섯 개 이상일 때 적합하다고 안내합니다 |

::: src
[Local Hands](https://docs.devin.ai/work-with-devin/local-hands), [Memory](https://docs.devin.ai/product-guides/memory), [Skills](https://docs.devin.ai/product-guides/skills), [Environment](https://docs.devin.ai/onboard-devin/environment), [Dynamic Workflows](https://docs.devin.ai/work-with-devin/dynamic-workflows), [Automations](https://docs.devin.ai/product-guides/automations), [Testing & Video Recordings](https://docs.devin.ai/work-with-devin/testing-and-recordings)
:::

## 접근 조건

- **요금제:** 공식 문서 기준 self-serve 요금제는 Free, Pro(월 $20, 1인), Max(월 $200, 1인), Teams(월 최소 $80, 최대 200명)입니다. Pro와 Max는 여러 사람이 나눠 쓸 수 없습니다([Self-serve plans](https://docs.devin.ai/admin/billing/self-serve)). 최신 가격은 [devin.ai/pricing](https://devin.ai/pricing)이 기준입니다.
- **실행 플랫폼:** 기본 환경은 Linux VM입니다. 공식 제품 페이지는 <span lang="en">“Devin verifies its own work on Linux, Windows, or Android”</span>라고 적고 있고, macOS VM은 블루프린트에 `runs-on: macos`를 지정해 씁니다. 조직과 배포 형태에 따라 따로 켜야 할 수 있습니다.
- **세션 모드:** Ask와 Agent는 모델이 아니라 세션 모드입니다. 모델 구분은 [모델](/models/) 페이지를 보세요.

::: tip 처음에는 작은 저장소 하나로
환경 설정이 잘 되어 있을수록 세션이 빨리 시작되고 결과도 안정적입니다. 처음에는 테스트 명령이 분명한 저장소 하나로 스냅샷을 만들어 보는 편이 좋습니다. (필자 제안)
:::
