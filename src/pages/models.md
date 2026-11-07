---
title: Devin의 모델, Fusion, Adaptive 구분하기
navTitle: 모델
description: SWE 계열 모델, 두 모델을 짝짓는 Fusion, 모델을 고르는 Adaptive는 서로 다른 개념입니다. 공식 문서로 확인한 이름과 제공 조건만 정리했습니다.
permalink: /models/
series: 모델
seriesNumber: "개요"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T00:54:00+09:00
sources:
  - title: AI Models (Devin Desktop)
    url: https://docs.devin.ai/desktop/models
  - title: Fusion in Devin Desktop
    url: https://docs.devin.ai/desktop/fusion
  - title: Models (Devin CLI)
    url: https://docs.devin.ai/cli/models
  - title: Fusion in Devin CLI
    url: https://docs.devin.ai/cli/fusion
  - title: Adaptive (Devin Desktop)
    url: https://docs.devin.ai/desktop/adaptive
  - title: Introducing SWE-1.5
    url: https://devin.ai/blog/swe-1-5
  - title: Your First Session
    url: https://docs.devin.ai/get-started/first-run
---

Devin을 쓰다 보면 SWE-2, Fusion, Adaptive, Agent 같은 이름이 한 화면에 함께 나옵니다. 이름은 비슷해 보여도 가리키는 대상이 다릅니다. 이 페이지는 공식 문서에 나온 이름을 기준으로 이 넷을 구분합니다.

<div class="reading-guide" role="note" aria-label="이 페이지를 읽는 법">
<p class="reading-guide__title">이 페이지를 읽는 법</p>
<ul>
<li><strong>표시 없는 본문</strong>은 공식 문서를 요약한 내용입니다.</li>
<li class="is-tip"><strong>필자 제안</strong>은 공식 문서에 없는 필자의 의견입니다.</li>
<li>모델 목록, 가격, 프로모션은 자주 바뀝니다. 이 페이지에는 가격표를 옮기지 않았습니다. 실제 값은 Devin Desktop이나 Devin CLI의 모델 선택기와 공식 문서에서 확인하세요.</li>
</ul>
</div>

## 네 가지 개념

| 이름 | 무엇인가 | 고르는 곳 |
| --- | --- | --- |
| SWE 계열 (SWE-2 등) | Cognition이 만든 모델 계열 | 모델 선택기 |
| Fusion | 단일 모델이 아니라 lead 모델과 sidekick 모델을 짝지은 페어 계열 | 모델 선택기 |
| Adaptive | 작업에 맞춰 모델을 고르는 라우팅 방식 | 모델 선택기 |
| Ask / Agent | 모델이 아니라 세션의 작업 모드 | 새 세션 화면 |

::: src
[AI Models](https://docs.devin.ai/desktop/models), [Fusion in Devin Desktop](https://docs.devin.ai/desktop/fusion), [Models (Devin CLI)](https://docs.devin.ai/cli/models), [Your First Session](https://docs.devin.ai/get-started/first-run)
:::

## Fusion: 두 모델이 함께 일하는 방식

Fusion을 고르면 모든 세션에서 두 모델이 함께 일합니다.

- **Lead**: 프런티어 모델입니다. 계획, 설계 결정, 조사, 정확성이 중요한 작업을 맡고 결과를 검토합니다.
- **Sidekick**: 더 작고 효율적인 모델입니다. lead의 계획에 따라 코드를 쓰고, 빌드와 테스트를 돌리고, 변경을 검증합니다.

공식 문서는 대부분의 사용자에게 Fusion을 권하며, 프런티어 모델만 쓸 때보다 비용을 낮추는 것이 목적이라고 설명합니다. Fusion은 하나의 모델이 아니라 여러 lead·sidekick 조합의 계열이고, 사용량은 ACU(Agent Compute Unit)로 계량합니다.

**제공 조건** ([Fusion in Devin Desktop](https://docs.devin.ai/desktop/fusion) 원문: <span lang="en">“Fusion is available on paid plans in Devin CLI 3000.10.20+ and Devin Desktop 3.10.0+. It's not included in free or trial tiers.”</span>)

- 유료 플랜에서 쓸 수 있습니다. 무료·체험 등급에는 포함되지 않습니다.
- 최소 버전: Devin CLI 3000.10.20 이상, Devin Desktop 3.10.0 이상.
- 레거시 또는 크레딧 기반 요금제(레거시 크레딧 과금 Enterprise 포함)에서는 쓸 수 없습니다.
- Desktop에서는 Devin Local 세션의 모델 선택기에서 고릅니다. `/model`, `/fusion` 명령은 CLI 전용입니다.

::: src
[Fusion in Devin Desktop](https://docs.devin.ai/desktop/fusion), [Fusion in Devin CLI](https://docs.devin.ai/cli/fusion)
:::

## Adaptive

CLI 문서는 Adaptive를 모델 설정의 **라우팅(Adaptive routing)** 으로 소개하고, Desktop 문서에도 별도 Adaptive 페이지가 있습니다. Fusion처럼 두 모델을 짝짓는 방식과는 다른 기능입니다. 라우팅 기준의 세부 사항은 공식 Adaptive 문서를 참고하세요.

::: src
[Models (Devin CLI)](https://docs.devin.ai/cli/models), [Adaptive](https://docs.devin.ai/desktop/adaptive)
:::

## SWE 계열 모델

공식 모델 문서에 나오는 Cognition 자체 모델 이름은 다음과 같습니다.

- **SWE-2**: [AI Models](https://docs.devin.ai/desktop/models) 문서의 “The following models are available in Devin Desktop and Devin CLI” 목록에 있습니다. 같은 문서에 가격 공지가 서로 다르게 두 가지 실려 있어, 이 가이드는 어느 쪽도 현재 혜택으로 안내하지 않습니다(아래 ‘확인하지 못한 것’ 참고).
- **SWE-2 Flash**: Medium, High, Max 세 가지 변형이 있습니다. [AI Models](https://docs.devin.ai/desktop/models) 문서는 <span lang="en">“SWE-2 Flash Medium is available on the Free plan. SWE-2 Flash High and Max require a paid plan.”</span>이라고 적고 있습니다.
- **SWE-1.6**: CLI 설정 예시에 `swe-1-6-fast`라는 모델 ID로 나옵니다.
- **SWE-1.5**: 공식 블로그가 소개한 빠른 에이전트 모델입니다. 블로그는 수천억 개 파라미터 규모의 모델이며 주요 모델보다 최대 13배 빠르다고 밝혔습니다. 발표 당시 Windsurf(현재 Devin Desktop)용으로 최적화되었다고 설명했습니다.
- **swe-grep, swe-check**: 모델 문서의 SWE 계열 항목에 함께 나오는 이름입니다.

CLI에서 `swe` 같은 짧은 이름은 항상 해당 계열의 최신 버전을 가리킵니다.

::: src
[AI Models](https://docs.devin.ai/desktop/models), [Models (Devin CLI)](https://docs.devin.ai/cli/models), [Introducing SWE-1.5](https://devin.ai/blog/swe-1-5)
:::

### 확인하지 못한 것

- **“SWE Flash”라는 이름은 공식 문서에서 찾지 못했습니다.** 공식 이름은 **SWE-2 Flash**입니다.
- SWE-2와 SWE-2 Flash의 파라미터 수, 컨텍스트 길이 같은 사양은 확인한 공식 자료에 나오지 않아 적지 않았습니다.
- 확인일 기준 같은 모델 문서 안에 SWE-2 Flash 프로모션 공지가 두 가지(‘2026년 12월 4일까지 무료’와 ‘2026년 11월 18일까지 25% 할인’) 함께 실려 있고, SWE-2 가격 공지도 두 가지가 함께 있습니다. 공지가 서로 엇갈리므로 이 가이드는 어느 쪽도 지금 받을 수 있는 혜택으로 안내하지 않습니다. 실제 가격은 사용 전에 모델 선택기와 공식 문서에서 직접 확인해야 합니다.

::: tip 모델보다 지시문부터
공식 CLI 문서도 여러 모델을 직접 써 보라고 권합니다. 다만 결과가 나쁠 때는 모델을 바꾸기 전에 지시문의 범위와 완료 기준을 먼저 점검해 보는 편이 원인을 찾기 쉽습니다.
:::
