---
title: Devin Review
navTitle: Devin Review
description: PR의 변경을 묶어 설명하고 버그 가능성을 짚어 주는 리뷰 도구. 지원 Git 제공자, 시작 방법, 베타 기능을 공식 문서로 정리했습니다.
permalink: /features/review/
series: 제품
seriesNumber: "Devin Review"
parentLabel: 제품
parentUrl: /features/
crumb: "Devin Review"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T02:14:00+09:00
sources:
  - title: "Devin Review"
    url: https://docs.devin.ai/work-with-devin/devin-review
  - title: "Self-serve plans"
    url: https://docs.devin.ai/admin/billing/self-serve
  - title: "Quick Review"
    url: https://docs.devin.ai/desktop/quick-review
  - title: "Devin Security (product page)"
    url: https://devin.ai/security
---

Devin Review는 **풀 리퀘스트(PR)를 이해하고 검토하도록 돕는 도구**입니다. 공식 문서는 <span lang="en">“Devin Review groups related changes in a pull request, explains them alongside the diff, and flags potential bugs.”</span>라고 설명합니다([Devin Review](https://docs.devin.ai/work-with-devin/devin-review)). 버그는 확신 정도(confidence)로 구분해 표시합니다.

## 이럴 때 고릅니다

- **큰 PR을 빨리 파악해야 할 때.** 관련 있는 변경끼리 묶어 diff 옆에 설명합니다.
- **사람 리뷰 전에 한 번 걸러 내고 싶을 때.** 자동 리뷰(auto-review)를 켜면 PR이 올라올 때마다 검토합니다.
- **Devin이 만든 PR을 검토할 때.** 세션의 PR 카드에서 **Analyze**를 누르면 리뷰가 시작됩니다.
- **커밋 전 로컬 변경을 보고 싶을 때**는 Review가 아니라 Desktop의 [Quick Review](/features/desktop/)가 맞습니다.

## 시작 방법

1. **PR 하나만 리뷰:** Devin과 연결된 GitHub 저장소의 열린 PR에 `/devin review`라고 댓글을 답니다. 자동 리뷰를 켜지 않아도 됩니다.
2. **URL로 열기:** GitHub.com PR 주소의 `github.com`을 `devinreview.com`으로 바꾸면 Devin Review에서 열립니다. 비공개 PR은 먼저 Devin에 로그인해야 합니다.
3. **자동 리뷰:** 저장소 단위로 auto-review를 켜면 새 PR과 이후 push를 검토합니다.

## 지원 범위

| 제공자 | 지원 내용 |
|---|---|
| GitHub (GitHub.com, Enterprise Server, Enterprise Cloud) | PR 리뷰 전체. 댓글, 리뷰, 병합, 채팅에서 코드 수정 같은 쓰기 기능은 GitHub App 연결이 필요합니다 |
| GitLab (Self-Managed 포함) | 머지 리퀘스트(MR) 리뷰 |
| Azure DevOps, Bitbucket Data Center, Bitbucket Cloud | diff, 분석, 댓글, 자동 리뷰 |

공식 문서에 따르면 <span lang="en">“Public PRs don't require a Devin account.”</span> 공식 self-serve 요금제 문서는 Free 플랜에도 Devin Review 접근이 포함된다고 적고 있습니다([Self-serve plans](https://docs.devin.ai/admin/billing/self-serve)).

## 베타 기능

Custom reviewers, Autoapprover, review-context instructions는 공식 문서에서 **베타**로 표시되어 있습니다. 팀 정책에 넣기 전에 문서의 현재 상태를 확인하세요.

## 보안 리뷰와의 관계

공식 Devin Security 페이지는 Devin Review가 diff마다 보안 문제를 짚는다고 소개합니다. 저장소 전체의 취약점 스캔과 수정 배정은 [Devin Security](/features/security/)에서 다룹니다.

::: tip 리뷰 결과는 판단 재료로
Devin Review의 지적은 사람이 확인할 출발점입니다. 병합 판단과 책임은 팀의 리뷰 규칙을 따르는 편이 안전합니다. (필자 제안)
:::
