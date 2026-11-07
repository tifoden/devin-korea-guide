---
title: Devin Oncall
navTitle: Devin Oncall
description: 알림, 버그 제보, 인시던트를 먼저 조사하고 필요하면 사람에게 넘기는 Devin Oncall. Responders와 Reports, 설정 조건, 실제 고객 사례를 정리했습니다.
permalink: /features/oncall/
series: 제품
seriesNumber: "Devin Oncall"
parentLabel: 제품
parentUrl: /features/
crumb: "Devin Oncall"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T02:14:00+09:00
sources:
  - title: "Devin Oncall"
    url: https://docs.devin.ai/product-guides/devin-oncall
  - title: "Devin Oncall (product page)"
    url: https://devin.ai/oncall
  - title: "Automations"
    url: https://docs.devin.ai/product-guides/automations
  - title: "AngelList customer story"
    url: https://devin.ai/customers/angellist-oncall
  - title: "Modal customer story"
    url: https://devin.ai/customers/modal
---

Devin Oncall은 **알림, 버그 제보, 인시던트가 들어오면 Devin이 먼저 조사하고, 고치거나 완화하는 기능**입니다. 공식 문서는 Devin이 텔레메트리, 코드, 배포 이력을 보고 조사한다고 설명합니다([Devin Oncall](https://docs.devin.ai/product-guides/devin-oncall)). 공식 제품 페이지는 사람의 판단이 필요하면 심각도, 추정 원인, 권장 다음 단계를 붙여 사람에게 넘긴다고 소개합니다([devin.ai/oncall](https://devin.ai/oncall)).

## 구성

- **Responders:** 알림이나 제보가 들어오는 곳을 지켜보다가 새 이벤트마다 조사합니다. 반복되는 이벤트는 하나로 묶어, 시끄러운 알림도 한 번만 조사합니다.
  - 모니터링 도구가 Slack이나 Microsoft Teams 채널에 올리는 운영 알림
  - PagerDuty 인시던트 (조사 결과를 인시던트 노트로 남김)
  - `#eng-bugs` 같은 채널의 버그 제보와 지원 질문
- **Incidents:** 인시던트 대응을 함께합니다.
- **Reports:** 알림 임계값 조정, 반복되는 문제 유형처럼 알림과 인시던트를 만드는 원인을 정리해 보여 줍니다.

## 이럴 때 고릅니다

- 야간·주말 알림의 1차 조사를 사람보다 먼저 시작하고 싶을 때
- 같은 알림이 수십 번 울려 조사가 흩어질 때
- 어떤 알림이 반복되는지, 무엇을 고쳐야 줄어드는지 보고 싶을 때

## 설정 순서

1. 조직마다 한 번 설정합니다. 설정하면서 Devin이 텔레메트리 도구와 코드로 시스템을 익히고, 모든 Oncall 세션이 쓰는 스킬을 작성합니다.
2. 텔레메트리 도구를 하나 이상 연결합니다. 이미 Devin 환경에 있다면 **Set up without tools**를 고를 수 있습니다.
3. **Oncall** 페이지에서 **Create responder**를 누르고 이름과 유형을 정합니다. 유형은 만든 뒤 바꿀 수 없습니다.
4. 팀만의 절차가 있으면 runbook을 추가합니다. 공식 문서는 runbook이 선택 사항이라고 적고 있습니다.

## 접근 조건

설정하려면 Oncall 관리 권한이 필요하고, 조직 전체에 도구를 연결하는 일은 조직 관리자만 할 수 있습니다([Devin Oncall](https://docs.devin.ai/product-guides/devin-oncall)). Responders, Incidents, Reports는 설정을 마친 뒤 나타납니다.

## 공식 고객 사례

| 고객 | 원문 표현 | 출처 |
|---|---|---|
| AngelList | 인시던트 1차 원인 파악 비율이 20%에서 70%로 | [AngelList customer story](https://devin.ai/customers/angellist-oncall) |
| Modal | 인시던트의 약 80%에서 유용한 결과 | [Modal customer story](https://devin.ai/customers/modal) |

수치의 영문 원문과 맥락은 [활용사례](/use-cases/#장애-대응과-인시던트-조사) 페이지에 함께 적었습니다.

::: tip 처음에는 알림 채널 하나로
조사 결과를 사람이 검토하는 기간을 두고, 알림 채널 하나에서 시작해 넓히는 편이 안전합니다. (필자 제안)
:::

함께 보기: [Devin Security](/features/security/) · [Devin Cloud](/features/cloud/)
