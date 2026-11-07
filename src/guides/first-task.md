---
title: Devin으로 첫 작업 시작하기
navTitle: 첫 작업 시작하기
description: 저장소 연결부터 첫 지시문, 결과 검토까지. 처음 Devin 세션을 열기 전에 알아 두면 좋은 순서를 공식 문서를 바탕으로 정리했습니다.
permalink: /guides/first-task/
series: 입문
seriesNumber: "01"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-07T23:13:00+09:00
sources:
  - title: Introducing Devin
    url: https://docs.devin.ai/get-started/devin-intro
  - title: Your First Session
    url: https://docs.devin.ai/get-started/first-run
  - title: When to Use Devin
    url: https://docs.devin.ai/essential-guidelines/when-to-use-devin
  - title: Instructing Devin Effectively
    url: https://docs.devin.ai/essential-guidelines/instructing-devin-effectively
  - title: Good vs. Bad Instructions
    url: https://docs.devin.ai/essential-guidelines/good-vs-bad-instructions
  - title: Devin environment setup
    url: https://docs.devin.ai/onboard-devin/environment
  - title: Index a Repository
    url: https://docs.devin.ai/onboard-devin/index-repo
  - title: Devin GitHub integration
    url: https://docs.devin.ai/integrations/gh
  - title: Usage
    url: https://docs.devin.ai/admin/billing/usage
---

Devin은 코드를 작성하고, 실행하고, 테스트하는 자율형 AI 소프트웨어 엔지니어입니다. 공식 문서는 Devin에게 맡길 일을 고를 때 쓸 만한 기준 하나를 제시합니다. **직접 하면 세 시간 안에 끝낼 수 있는 일이라면 Devin도 대부분 해낼 수 있다**는 것입니다.

이 글은 그 기준에 맞는 첫 작업을 고르고, 지시문을 쓰고, 결과를 검토하기까지의 흐름을 따라갑니다. 웹 앱(app.devin.ai)에서 세션을 여는 경우를 기준으로 설명합니다.

<div class="reading-guide" role="note" aria-label="이 글을 읽는 법">
<p class="reading-guide__title">이 글을 읽는 법</p>
<ul>
<li><strong>표시 없는 본문</strong>은 공식 문서를 요약하거나 옮긴 내용입니다. 단락 아래 ‘근거’에 해당 문서를 링크했습니다.</li>
<li class="is-tip"><strong>필자 제안</strong>은 공식 문서에 없는 필자의 의견입니다.</li>
<li class="is-exercise"><strong>가상 실습</strong>은 설명을 위해 지어낸 예제로, 실제 저장소나 사례가 아닙니다.</li>
</ul>
</div>

## 시작하기 전에 준비할 것

공식 문서는 첫 세션을 열기 전에 저장소를 **인덱싱**하고 **환경을 설정**해 두라고 안내합니다. 그보다 먼저 Devin이 저장소에 접근할 수 있어야 합니다.

1. **Git 연결.** Settings > Connections에서 GitHub, GitLab, Bitbucket, Azure DevOps 가운데 하나를 연결하고, Devin이 접근할 저장소를 고릅니다. 엔터프라이즈 조직이라면 관리자가 Settings > Repositories에서 조직마다 저장소 접근을 따로 허용해야 합니다.
2. **환경 설정.** Devin은 저장소가 클론되고 도구와 의존성이 설치된 리눅스 가상 머신에서 일합니다. 이 상태를 **스냅샷**으로 만들어 두면 모든 세션이 같은 상태에서 출발합니다. 공식 문서는 환경 설정을 Devin의 성과를 끌어올리는 데 가장 효과가 큰 일로 꼽습니다. 가장 간단한 방법은 세션에서 `Set up your environment for this repo.`라고 요청한 뒤, Devin이 제안하는 설정 카드를 검토하고 승인하는 것입니다.
3. **인덱싱.** 환경에 추가한 저장소는 자동으로 인덱싱됩니다. 인덱싱은 Ask Devin과 DeepWiki 같은 코드 검색·이해 기능에 쓰이며, 환경 설정과는 별개의 과정입니다.

API 키 같은 민감한 값은 설정 편집기의 Secrets 탭에 암호화된 Secret으로 저장하고 `$VARIABLE_NAME` 형식으로 참조합니다. Devin은 저장소를 보고 필요한 도구와 의존성을 추론할 수 있지만, 자격 증명은 스스로 알아낼 수 없습니다.

::: src
[Your First Session](https://docs.devin.ai/get-started/first-run), [Devin environment setup](https://docs.devin.ai/onboard-devin/environment), [Index a Repository](https://docs.devin.ai/onboard-devin/index-repo), [Devin GitHub integration](https://docs.devin.ai/integrations/gh)
:::

::: tip 비밀값은 대화창에 붙여 넣지 않기
지시문은 세션 기록에 남습니다. 키나 비밀번호는 대화에 직접 적지 말고 Secrets로 등록한 다음 이름으로만 언급하는 습관을 들이면 안전합니다.
:::

## 첫 작업 고르기

공식 문서는 작업이 Devin에게 맞는지 판단할 때 세 가지를 물어보라고 합니다.

- **성공 기준을 분명히 말할 수 있는가?** 테스트, CI, 린트처럼 결과를 확인할 수단이 있는 작업일수록 성과가 좋습니다.
- **맥락이 충분한가?** 참고할 파일, 기존 패턴, 문서, 예시를 함께 줄수록 좋습니다.
- **나누면 나아지는가?** 큰 작업은 서로 이어지는 작은 세션 여러 개로 나눕니다.

시작과 끝이 분명하고 완료 조건이 명시된 작업, 예를 들어 ‘기존 패턴과 같게 맞추고 테스트를 통과시키는’ 일이 좋은 작업입니다.

::: src
[When to Use Devin](https://docs.devin.ai/essential-guidelines/when-to-use-devin), [Introducing Devin](https://docs.devin.ai/get-started/devin-intro)
:::

::: tip 첫 작업은 답을 이미 아는 일로
결과를 평가하려면 무엇이 정답인지 알아야 합니다. 첫 세션에는 직접 해결해 본 적 있는 작은 일을 맡겨 보세요. 테스트가 이미 있는 함수의 버그 수정이나 빠진 단위 테스트 추가 같은 일이면 Devin의 결과를 자신의 기준과 나란히 놓고 비교하기 쉽습니다.
:::

## Ask로 계획하고 Agent로 실행하기

세션을 시작하면 **Ask**와 **Agent** 두 모드를 고를 수 있습니다.

- **Ask**는 코드를 바꾸지 않고 질문하고 계획을 세우는 가벼운 모드입니다. 코드가 어떻게 동작하는지 묻거나, 구현 전에 작업 범위를 정할 때 씁니다.
- **Agent**는 코드를 작성하고 명령을 실행하고 웹을 탐색하며, 풀 리퀘스트를 만들기까지 작업을 끝까지 수행하는 자율 모드입니다.

공식 문서는 계획이 완전히 정해지지 않았다면 Ask로 시작하라고 권합니다. Ask 대화에서 **Construct a Devin Prompt**로 범위가 정리된 지시문을 만들고, **Send to Devin**을 눌러 Agent 모드로 넘기는 흐름입니다. Agent 세션을 열 때는 작업할 저장소를 선택합니다. 그래야 Devin이 올바른 브랜치에서 출발하고, 올바른 저장소에 풀 리퀘스트를 만듭니다.

::: src
[Your First Session](https://docs.devin.ai/get-started/first-run)
:::

## 에이전트 고르기

메시지 입력창의 에이전트 선택기로 세션을 실행할 에이전트를 정합니다. 공식 문서의 설명을 옮기면 다음과 같습니다.

| 에이전트 | 이럴 때 | 비용에 관한 문서 설명 |
| --- | --- | --- |
| Lite | 범위가 분명한 단순한 작업 | 가장 낮음 |
| Normal | 기본값. 일상적인 작업 | 비용과 성능의 균형 |
| Ultra | 가장 어려운 작업 | 성능이 가장 높고 비용도 훨씬 큼 |
| Fusion | 프런티어 모델 수준의 결과가 필요할 때 | 프런티어 모델과 비용 효율적인 모델을 짝지어 비용을 낮춤 |
| SWE-2 | Cognition이 직접 만든 소프트웨어 엔지니어링 모델. 추론 강도를 Medium, High, Max 중에서 고름 | 연구 프리뷰. 비용 언급 없음 |

관리자가 쓸 수 있는 에이전트를 정하기 때문에 모든 선택지가 보이지 않을 수도 있습니다. 에이전트는 세션 도중에도 바꿀 수 있으며, 다음 메시지부터 적용됩니다. 무엇을 골라야 할지 모르겠다면 기본 에이전트로 충분하다고 문서는 안내합니다.

::: src
[Your First Session — Choosing an agent](https://docs.devin.ai/get-started/first-run)
:::

## 지시문 쓰기

공식 문서가 가장 강조하는 원칙은 **가능한 한 구체적으로** 쓰라는 것입니다. 동료에게 일을 맡길 때 사양을 건네듯 Devin에게도 같은 수준의 설명을 주라는 뜻입니다. 잘 쓴 지시문에는 대체로 네 가지가 들어 있습니다.

1. 어느 저장소에서 무엇을 위해 하는 일인지, **맥락**
2. 작업을 논리적인 단위로 나눈 **단계별 지시**
3. 무엇을 하면 끝난 것인지, **명확한 성공 기준**
4. 따라야 할 **기존 코드와 패턴**

문서에 실린 예시를 우리말로 옮기면 차이가 분명합니다. 아래는 결과가 나쁘기 쉬운 지시문입니다. 어떤 통계를 넣을지, 데이터를 어디서 가져올지, 어떤 기존 패턴을 따를지가 모두 빠져 있습니다.

```text
사용자 통계 엔드포인트를 추가해 줘.
```

같은 일을 이렇게 맡기면 경로와 응답 형식, 데이터 출처, 참고할 코드, 테스트 요구 사항이 모두 드러납니다.

```text
/users/stats 엔드포인트를 새로 만들어 사용자 수와 평균 가입 기간을 담은 JSON을 반환하게 해 줘.
기존 PostgreSQL의 users 테이블을 사용해.
응답 구조는 statsController.js에 있는 /orders/stats 엔드포인트를 참고해.
새 엔드포인트가 StatsController.test.js 스위트로 검증되게 해 줘.
```

입력창에서 `@`를 입력하면 저장소(@Repos), 파일(@Files), 스킬(@Skills), 비밀값(@Secrets), 이전 세션(@Sessions) 등을 지정할 수 있습니다. 무엇을 가리키는지 분명해져 지시문의 모호함이 줄어듭니다.

::: src
[Instructing Devin Effectively](https://docs.devin.ai/essential-guidelines/instructing-devin-effectively), [Good vs. Bad Instructions](https://docs.devin.ai/essential-guidelines/good-vs-bad-instructions), [Your First Session — Using @ Mentions](https://docs.devin.ai/get-started/first-run)
:::

::: tip 코드 속 이름은 번역하지 않기
파일명, 함수명, 명령어, 오류 메시지는 코드에 적힌 그대로 옮기는 편이 좋습니다. 우리말로 풀어 쓰면 사람에게는 읽기 편해도, 저장소에서 그 이름을 찾아야 하는 쪽에서는 단서가 사라집니다.
:::

## 가상 실습: 작은 버그 하나 맡기기

::: exercise 저장소, 파일, 버그 모두 설명을 위해 지어낸 것입니다
가상의 사내 도구 저장소 `example/order-admin`에서 주문 목록 화면의 주문 일시가 한국 시간이 아닌 UTC로 보인다고 가정합니다. 이 버그를 Devin에게 맡기는 지시문은 이렇게 쓸 수 있습니다.

```text
example/order-admin 저장소에서 주문 목록의 주문 일시가 UTC로 표시되는 문제를 고쳐 줘.

- 날짜 표시는 src/utils/formatDate.ts의 formatKST()를 그대로 써. 새 날짜 라이브러리는 추가하지 마.
- 고칠 곳은 src/pages/orders/OrderTable.tsx 한 곳이야.
- 완료 조건:
  1. npm test -- OrderTable 이 통과할 것
  2. 2026-01-01T15:00:00Z 주문이 "2026. 1. 2. 00:00"으로 보이는지 확인하는 테스트를 추가할 것
  3. 브라우저에서 /orders 화면을 열고 스크린샷으로 결과를 보여 줄 것
- 작업을 시작하기 전에 계획을 짧게 먼저 알려 줘.
```

이 지시문을 앞에서 본 원칙에 비춰 보면 다음과 같습니다.

- **맥락:** 저장소와 고칠 파일을 짚었습니다.
- **판단을 대신 내림:** 쓸 함수를 정하고 새 라이브러리는 막았습니다. 공식 문서도 중요한 결정은 사람이 내려 주라고 권합니다.
- **성공 기준:** 통과할 테스트, 새로 추가할 테스트, 화면 확인 방법을 적었습니다.
- **스스로 검증:** Devin은 셸, IDE, 브라우저를 갖춘 환경에서 일하므로 앱을 띄워 직접 확인하게 할 수 있습니다.
:::

## 세션이 진행되는 동안

Devin의 작업 공간에는 Shell, IDE, Browser가 있습니다. 실행되는 명령과 로그를 지켜볼 수 있고, 필요하면 IDE에서 직접 코드를 고치거나 명령을 실행해 작업을 넘겨받을 수도 있습니다.

사용량은 Devin이 실제로 한 일에 따라 쌓입니다. 계획, 맥락 수집, 작업 실행, 브라우저 동작, 코드 실행 같은 행동의 수와 복잡도, 그리고 가상 머신 시간이 포함됩니다. 엔터프라이즈 고객은 ACU(Agent Compute Unit)를, 셀프서브 고객은 요금제에 포함된 양을 먼저 쓰고 그다음 선불 온디맨드 크레딧을 씁니다.

- 사용자의 답을 기다리거나, 테스트 실행을 기다리거나, 저장소를 설정·클론하는 동안에는 가상 머신 유지에 드는 소량을 빼고 사용량이 거의 늘지 않습니다.
- 세션은 기본적으로 5분 동안 아무 활동이 없으면 잠듭니다. 잠든 동안에는 사용량이 늘지 않고, 메시지를 보내면 다시 깨어납니다.
- 공식 문서가 권하는 사용량 관리법은 범위가 분명한 작업을 맡기고, 지시문과 세션을 짧게 유지하는 것입니다.

::: src
[Introducing Devin — The Devin Interface](https://docs.devin.ai/get-started/devin-intro), [Usage](https://docs.devin.ai/admin/billing/usage)
:::

::: tip 방향이 어긋나면 일찍 말하기
Devin이 처음에 공유한 계획이 의도와 다르면 그 자리에서 바로잡는 편이 낫습니다. 다 만든 뒤에 되돌리는 것보다 대화 몇 줄로 방향을 고치는 쪽이 시간도 사용량도 덜 듭니다.
:::

## 끝난 뒤: 검토와 회고

작업이 끝나면 결과를 검토할 차례입니다. 공식 문서는 CI 상태와 Devin이 사람에게 넘긴 판단 사항을 확인하고, 풀 리퀘스트를 병합할지 사람이 결정하라고 안내합니다. Devin Review를 켜 두면 사람이 보기 전에 버그를 먼저 잡아낼 수 있습니다.

회고에는 **Session Insights**가 유용합니다. 세션 화면에서 **Generate Analysis**를 누르면 진행 과정의 타임라인, 다음에 반영할 피드백, 비슷한 작업에 다시 쓸 수 있도록 다듬은 지시문을 받을 수 있습니다. 세션 중에 바로잡은 내용은 Memory 기능으로 저장되어 다음 세션에 반영되고, 반복되는 절차는 스킬로 만들어 두면 매번 같은 설명을 되풀이하지 않아도 됩니다.

::: src
[When to Use Devin — Post-Task Review](https://docs.devin.ai/essential-guidelines/when-to-use-devin), [Your First Session — After Your Session](https://docs.devin.ai/get-started/first-run)
:::

::: tip 동료의 풀 리퀘스트처럼 읽기
Devin이 만든 풀 리퀘스트도 팀원의 것과 같은 기준으로 리뷰하세요. 테스트가 통과했다는 사실만으로 변경 범위나 설계가 적절한지까지 보장되지는 않습니다.
:::

## 알아 둘 한계

공식 문서가 스스로 밝힌 주의점도 함께 기억해 두면 좋습니다.

- Devin이 문서에 적힌 대로 정확히 동작하지 않거나, 문서가 최신 상태가 아닐 수 있다고 공식 문서에 명시되어 있습니다.
- 대부분의 작업을 처리할 수 있지만 극도로 어려운 작업은 예외로 둡니다. 세 시간을 넘길 만한 일은 작은 세션으로 나누라고 권합니다.
- 시각적인 작업에서는 디자인 명세나 Figma 파일을 받아 구현할 수는 있지만, 미적 판단을 스스로 만들어 내지는 않는다고 설명합니다. ‘더 보기 좋게’ 같은 지시 대신 구체적인 명세를 주어야 합니다.
- 세션 사용량 한도에 자주 걸린다면 작업이 너무 복잡하다는 신호일 수 있고, 개발 환경 때문에 막힌다면 환경 설정을 다시 살펴보라고 안내합니다.

::: src
[Introducing Devin](https://docs.devin.ai/get-started/devin-intro), [Instructing Devin Effectively](https://docs.devin.ai/essential-guidelines/instructing-devin-effectively), [When to Use Devin](https://docs.devin.ai/essential-guidelines/when-to-use-devin)
:::
