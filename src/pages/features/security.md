---
title: Devin Security
navTitle: Devin Security
description: 저장소의 취약점을 찾고 검증해 수정 PR까지 이어 주는 Devin Security 2.0. 접근 권한, 스캔 설정, 수정 흐름, Code Scans와의 차이를 정리했습니다.
permalink: /features/security/
series: 제품
seriesNumber: "Devin Security"
parentLabel: 제품
parentUrl: /features/
crumb: "Devin Security"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T02:14:00+09:00
sources:
  - title: "Devin Security 2.0"
    url: https://docs.devin.ai/work-with-devin/security-2-0
  - title: "Devin Code Scans"
    url: https://docs.devin.ai/work-with-devin/code-scans
  - title: "Automations"
    url: https://docs.devin.ai/product-guides/automations
  - title: "Devin Security (product page)"
    url: https://devin.ai/security
  - title: "Vulnerability fixes"
    url: https://devin.ai/security/vulnerability-fixes
---

Devin Security는 **저장소의 보안 취약점을 찾고, 실제로 문제가 되는지 확인하고, 수정까지 이어 주는 기능**입니다. 현재 문서 기준 이름은 **Devin Security 2.0**이며, 앱의 `/security`에서 시작합니다([Devin Security 2.0](https://docs.devin.ai/work-with-devin/security-2-0)). 공식 제품 페이지는 발견한 문제를 샌드박스에서 재현해 악용 가능성을 확인하고 실제 피해 기준으로 우선순위를 매긴다고 소개합니다([devin.ai/security](https://devin.ai/security)).

## 이럴 때 고릅니다

- **조직 전체 저장소의 취약점을 한곳에서 보고 싶을 때.** 조직 단위 **Findings** 페이지에서 저장소, 스캔, 심각도, PR 상태로 걸러 봅니다.
- **찾은 문제를 바로 고치고 싶을 때.** 결과에서 **Fix with Devin**을 누르면 수정 세션이 시작됩니다. 여러 건을 한꺼번에 맡길 수도 있습니다.
- **새 커밋만 다시 점검하고 싶을 때.** 완료된 스캔에서 **Scan new commits**를 누르면 마지막 실행 이후 커밋만 스캔합니다.

## 사용 흐름

1. `/security`에서 **Basic** 탭의 Target repository로 스캔할 저장소를 고릅니다. **Advanced** 탭에서는 스캔 프로필 같은 추가 설정을 씁니다.
2. 스캔이 끝나면 `/security/findings`에서 결과를 열어 영향받는 코드와 권장 조치를 확인합니다.
3. 결과를 **Reviewed**, 무시, 다시 **Open**으로 표시합니다. 공식 문서는 <span lang="en">“Reviewed is a finding status. It does not mean that a pull request has merged.”</span>라고 분명히 적고 있습니다. 수정 여부는 PR 상태로 확인합니다.
4. **Fix with Devin**으로 수정 세션을 시작하고, 만들어진 PR을 사람이 검토합니다.
5. 정기 스캔은 [Automations](https://docs.devin.ai/product-guides/automations)로 일정을 걸어 돌립니다.

## 접근 조건

조직에 보안 스캔 접근 권한이 있어야 하고, 역할에 따라 스캔 시작·관리, 결과 관리 권한이 나뉩니다. Security 메뉴가 보이지 않으면 관리자에게 접근 권한을 확인해 달라고 공식 문서는 안내합니다. 설정에서 고를 수 있는 옵션도 조직의 접근 범위에 따라 다릅니다.

## Code Scans와의 차이

| 구분 | Devin Security 2.0 | Code Scans |
|---|---|---|
| 찾는 것 | 취약점과 공격 표면 | 성능, 테스트 커버리지, 죽은 코드, 접근성, 컴플라이언스, 직접 정한 기준 |
| 시작 | `/security`의 스캔 설정 | 작성창에 `/scan` + 찾을 내용 + 저장소 |
| 권한 | 조직의 보안 스캔 접근 + 역할 권한 | ‘Use code scans’ 권한 + 세션 사용 권한 |

::: src
[Devin Security 2.0](https://docs.devin.ai/work-with-devin/security-2-0), [Devin Code Scans](https://docs.devin.ai/work-with-devin/code-scans)
:::

## 공개 취약점 대응 자료

공식 사이트의 [Vulnerability fixes](https://devin.ai/security/vulnerability-fixes) 페이지는 PHP, Node.js, GitLab Self-Managed 같은 공개 보안 권고에 대해 Devin으로 패치하는 스킬을 소개합니다. 영향받는 저장소를 찾고, 고쳐진 가장 가까운 버전으로 올리고, 앞뒤로 테스트를 돌려 저장소마다 PR을 하나씩 여는 흐름입니다.

## 이 가이드가 옮기지 않은 것

공식 Security 페이지에는 크레딧 신청 배너와 이름 없는 고객 인용 수치가 있습니다. 신청 조건과 맥락을 확인하지 못해 혜택이나 성과로 소개하지 않습니다.

함께 보기: [Devin Review](/features/review/) · [Devin Oncall](/features/oncall/)
