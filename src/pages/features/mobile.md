---
title: Devin Mobile
navTitle: Mobile
description: Devin Mobile은 아직 출시 전, 대기자 명단 단계입니다. 공식 페이지가 소개하는 방향과 지금 휴대폰에서 할 수 있는 일을 구분해 정리했습니다.
permalink: /features/mobile/
series: 제품
seriesNumber: "Mobile"
parentLabel: 제품
parentUrl: /features/
crumb: "Mobile"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T02:14:00+09:00
sources:
  - title: "Devin Mobile (waitlist page)"
    url: https://devin.ai/mobile
  - title: "Devin Review"
    url: https://docs.devin.ai/work-with-devin/devin-review
  - title: "Slack integration"
    url: https://docs.devin.ai/integrations/slack
  - title: "Devin macOS support"
    url: https://docs.devin.ai/onboard-devin/environment/macos-support
---

::: caution 현재 상태: 대기자 명단 단계
2026-11-08 기준 공식 페이지 [devin.ai/mobile](https://devin.ai/mobile)은 <span lang="en">“Join the waitlist for early access”</span>라고 안내합니다. 내려받을 수 있는 앱으로 확인되지 않았고, 공식 문서(docs.devin.ai)에서도 모바일 앱 사용법 문서를 찾지 못했습니다. 이 가이드는 Devin Mobile을 출시된 제품으로 소개하지 않습니다.
:::

## 공식 페이지가 소개하는 방향

아래는 대기자 명단 페이지에 적힌 **계획된 사용 모습**입니다. 출시 시점, 지원 기기, 요금 조건은 공개되지 않았습니다.

| 공식 페이지 문구 | 뜻 |
|---|---|
| <span lang="en">“Start from your phone, Devin runs in the cloud and keeps working wherever you are”</span> | 휴대폰에서 세션을 시작하고, 실제 작업은 클라우드 VM에서 진행 |
| <span lang="en">“Get a notification when a session needs you”</span> | 세션이 사람의 확인을 기다릴 때 알림 |
| <span lang="en">“review and merge the PR right in the app”</span> | 앱 안에서 PR 검토와 병합 |
| <span lang="en">“Start a live voice session and go back and forth with Devin”</span> | 음성으로 Devin과 대화 |

모두 [devin.ai/mobile](https://devin.ai/mobile)의 문구입니다.

## 지금 휴대폰에서 할 수 있는 것

앱이 없어도, 이미 확인된 기능 중 휴대폰에서 쓸 만한 경로가 있습니다.

- **Slack·Teams에서 Devin 호출:** 공식 문서는 Slack이나 Teams 스레드에서 Devin을 태그해 작업을 맡기는 방법을 안내합니다. 휴대폰의 Slack 앱에서도 같은 스레드를 쓸 수 있습니다.
- **웹 앱:** app.devin.ai는 웹 앱이라 휴대폰 브라우저로 세션을 볼 수 있습니다. 다만 공식 문서가 모바일 브라우저 사용을 따로 보장하지는 않습니다. (필자 확인 범위 밖)
- **PR 리뷰:** 공개 PR은 Devin 계정 없이도 Devin Review로 볼 수 있습니다.

## 헷갈리기 쉬운 점

Devin이 **iOS 앱을 만들고 iOS Simulator에서 테스트하는 기능**(macOS VM)은 Devin Mobile과 다른 이야기입니다. 그 기능은 [Devin Cloud](/features/cloud/)의 실행 환경에 속합니다.

::: tip 출시 소식은 공식 페이지에서
출시 여부와 조건은 바뀔 수 있습니다. 이 가이드는 공식 페이지에서 상태가 바뀌는 것을 확인한 뒤에 내용을 고칩니다. (필자 제안)
:::
