---
title: Devin의 모델, Fusion, Adaptive 구분하기
navTitle: 모델
description: SWE 계열 모델, 두 모델을 짝짓는 Fusion, 모델을 고르는 Adaptive는 서로 다른 개념입니다. 공식 문서로 확인한 이름과 제공 조건만 정리했습니다.
permalink: /models/
series: 모델
seriesNumber: "개요"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-09T22:00:00+09:00
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
  - title: Introducing SWE-2
    url: https://cognition.com/blog/swe-2
  - title: Devin Fusion (product page)
    url: https://devin.ai/fusion
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

공식 제품 페이지를 한국어로 옮긴 [Fusion 페이지](/models/fusion/)에서 작업 분담과 공개 벤치마크를 그림으로 볼 수 있습니다.

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

<h2 id="swe">SWE 계열 모델</h2>

[AI Models](https://docs.devin.ai/desktop/models) 문서는 SWE 계열을 “소프트웨어 엔지니어링 작업에 맞춰 만든 Cognition 자체 프런티어 모델”로 소개합니다. SWE-2와 SWE-2 Flash는 각각 Medium, High, Max 세 가지 추론 강도(reasoning effort)로 제공됩니다. 공식 홈페이지 내비게이션의 SWE 항목은 별도 제품 페이지가 아니라 Cognition 블로그의 [Introducing SWE-2](https://cognition.com/blog/swe-2) 글로 연결됩니다.

### SWE-2

- **위상**: 모델 문서는 “Cognition's software engineering model”로, 출시 글은 “지금까지 가장 앞선 코딩 모델”로 소개합니다(2026.09.10 발표).
- **기반 모델**: 출시 글에 따르면 2.8T 파라미터 모델 Kimi K3에서 사후 학습했고, SWE-1.7의 학습 인프라와 방법을 이어받아 강화 학습(RL)을 수조 파라미터 규모로 처음 키웠습니다. 모든 추론 강도를 한 번의 RL 실행에서 함께 학습하는 알고리즘이 핵심 변화라고 설명합니다.
- **공개된 벤치마크**(Cognition 발표 수치): FrontierCode 1.1 Main 50.0%, DeepSWE 1.1 73.0%, Terminal-Bench 2.1 92.8%, Terminal-Bench 4.0 27.3%. 같은 표에서 SWE-1.7은 각각 42.0%, 37.7%, 81.5%, 7.6%입니다.
- **효율**: FrontierCode 1.1 Main에서 SWE-2 medium은 SWE-1.7보다 점수가 높으면서 턴 수는 58%, 평균 비용은 81% 적었다고 합니다. 실행당 평균 단계는 SWE-1.7 127, SWE-2 medium 53, high 80, max 98이며, 첫 실제 수정까지의 단계 중앙값은 18(SWE-1.7은 48)입니다.
- **추론 강도별 차이**: 출시 글은 medium이 단순·중간 난도 작업에 빠르고 비용 효율적이며, high와 max는 계획과 탐색, 검증을 더 많이 해 복잡한 작업에 유리하다고 설명합니다.
- **제공 범위**: 출시 글 기준 Devin Desktop과 CLI에서 바로 쓸 수 있고, Devin Web과 Fusion에도 순차 적용 중이라고 밝혔습니다. 공식 [Fusion](/models/fusion/) 페이지의 예시에서는 SWE-2가 sidekick 역할을 맡습니다.

### SWE-2 Flash

- 모델 문서 기준 Devin Desktop과 Devin CLI에서 쓸 수 있고, **Devin Cloud에서는 쓸 수 없습니다.**
- Medium, High, Max 세 변형이 있습니다. 문서 원문: <span lang="en">“SWE-2 Flash Medium is available on the Free plan. SWE-2 Flash High and Max require a paid plan.”</span>
- 파라미터 수, 컨텍스트 길이, 벤치마크 수치는 확인한 공식 자료에 나오지 않아 적지 않았습니다.

### 이전 세대와 보조 모델

- **SWE-1.7**: 모델 문서가 “이전 플래그십 소프트웨어 엔지니어링 모델”이라고 부르는 직전 세대입니다.
- **SWE-1.6**: 소프트웨어 엔지니어링 에이전트용 이전 세대 모델입니다. CLI 설정 예시에는 `swe-1-6-fast`라는 모델 ID로 나옵니다.
- **SWE-1.5**: 공식 블로그가 소개한 빠른 에이전트 모델입니다. 블로그는 수천억 개 파라미터 규모이며 주요 모델보다 최대 13배 빠르다고 밝혔고, 발표 당시 Windsurf(현재 Devin Desktop)용으로 최적화되었다고 설명했습니다.
- **SWE-1-mini**: Desktop의 Tab(자동 완성 제안)을 구동하며 실시간 지연 시간에 맞춰 최적화되었습니다.
- **swe-grep**: 컨텍스트 검색과 Fast Context를 구동합니다.
- **swe-check**: 흔한 코드 문제를 빠르게 훑는 Quick Review를 구동합니다.

CLI에서 `swe` 같은 짧은 이름은 항상 해당 계열의 최신 버전을 가리킵니다.

::: src
[AI Models](https://docs.devin.ai/desktop/models), [Models (Devin CLI)](https://docs.devin.ai/cli/models), [Introducing SWE-2](https://cognition.com/blog/swe-2), [Introducing SWE-1.5](https://devin.ai/blog/swe-1-5)
:::

### 확인하지 못한 것

- **“SWE Flash”라는 이름은 공식 문서에서 찾지 못했습니다.** 공식 이름은 **SWE-2 Flash**입니다.
- SWE-2 Flash의 파라미터 수, 컨텍스트 길이, 그리고 SWE-2의 컨텍스트 길이는 확인한 공식 자료에 나오지 않아 적지 않았습니다.
- 위 벤치마크와 비용 수치는 Cognition이 발표한 값이며 이 가이드가 직접 측정하지 않았습니다.
- 확인일 기준 같은 모델 문서 안에 SWE-2 Flash 프로모션 공지가 두 가지(‘2026년 12월 4일까지 무료’와 ‘2026년 11월 18일까지 25% 할인’) 함께 실려 있고, SWE-2 가격 공지도 두 가지가 함께 있습니다. 공지가 서로 엇갈리므로 이 가이드는 어느 쪽도 지금 받을 수 있는 혜택으로 안내하지 않습니다. 실제 가격은 사용 전에 모델 선택기와 공식 문서에서 직접 확인해야 합니다.

::: tip 모델보다 지시문부터
공식 CLI 문서도 여러 모델을 직접 써 보라고 권합니다. 다만 결과가 나쁠 때는 모델을 바꾸기 전에 지시문의 범위와 완료 기준을 먼저 점검해 보는 편이 원인을 찾기 쉽습니다.
:::
