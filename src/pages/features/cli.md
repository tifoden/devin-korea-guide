---
title: Devin CLI
navTitle: Devin CLI
description: 터미널에서 쓰는 로컬 코딩 에이전트. 설치, /handoff로 클라우드에 넘기기, 샌드박스, 아직 지원하지 않는 기능까지 공식 문서로 정리했습니다.
permalink: /features/cli/
series: 제품
seriesNumber: "Devin CLI"
parentLabel: 제품
parentUrl: /features/
crumb: "Devin CLI"
statusLabel: 초안 · 앰버서더 검토 대기
verifiedAt: 2026-11-08T02:14:00+09:00
sources:
  - title: "Devin CLI"
    url: https://docs.devin.ai/work-with-devin/devin-cli
  - title: "Devin CLI quickstart"
    url: https://docs.devin.ai/cli/index
  - title: "Devin Cloud in the Devin CLI"
    url: https://docs.devin.ai/cli/cloud
  - title: "Devin CLI handoff"
    url: https://docs.devin.ai/cli/handoff
  - title: "Devin CLI sandbox"
    url: https://docs.devin.ai/cli/sandbox
  - title: "Fusion in Devin CLI"
    url: https://docs.devin.ai/cli/fusion
  - title: "Devin CLI (product page)"
    url: https://devin.ai/cli
---

Devin CLI는 **내 터미널에서 실행되는 로컬 코딩 에이전트**입니다. 내 저장소와 셸, 도구를 그대로 쓰고, 오래 걸리는 작업은 `/handoff`로 클라우드 세션에 넘길 수 있습니다. 공식 문서는 macOS, Linux, WSL, Windows를 지원한다고 적고 있습니다([Devin CLI](https://docs.devin.ai/work-with-devin/devin-cli)).

## 이럴 때 고릅니다

- **편집기보다 터미널이 편할 때.** 기능 구현, 버그 수정, 코드 리뷰, 질문, 자동화 작업을 터미널에서 합니다.
- **이미 쓰는 설정을 가져오고 싶을 때.** 공식 제품 페이지는 <span lang="en">“AGENTS.md rules, MCP servers, and Claude Code plugins (skills, hooks, subagent profiles) load as-is.”</span>라고 적고 있습니다([devin.ai/cli](https://devin.ai/cli)).
- **로컬에서 시작해 클라우드로 넘기고 싶을 때.** `/handoff`는 대화 맥락과 현재 git 브랜치를 묶어 클라우드 세션을 만듭니다. 반대로 클라우드 세션의 PR 브랜치를 `/pickup`으로 가져와 로컬에서 이어 갈 수도 있습니다.
- **파일과 네트워크 접근을 엄격히 묶고 싶을 때.** `--sandbox`로 운영체제 수준의 격리를 켭니다.

## 설치와 시작

macOS·Linux·WSL에서는 공식 설치 스크립트를 씁니다. macOS는 Homebrew로도 설치할 수 있습니다.

```bash
curl -fsSL https://cli.devin.ai/install.sh | bash
```

Windows는 PowerShell에서 공식 설치 프로그램(x86_64, ARM64)을 실행하고, 설치 뒤에는 PowerShell, Windows Terminal, Git Bash에서 쓸 수 있습니다. 클라우드 기능을 쓰려면 `devin auth login`으로 로그인합니다. 정확한 설치 명령은 바뀔 수 있으니 [공식 Quickstart](https://docs.devin.ai/cli/index)를 기준으로 하세요.

## 로컬과 클라우드 오가기

| 명령 | 하는 일 |
|---|---|
| `devin --cloud` | 터미널에서 클라우드 Devin 세션을 시작합니다. `-p`로 프롬프트 하나만 보내고 끝낼 수도 있습니다 |
| `/handoff` | 지금 로컬 세션을 맥락과 브랜치째 클라우드 세션으로 넘깁니다. 설명 없이 실행하면 하던 일을 이어 갑니다 |
| `/pickup` | 클라우드 세션의 PR 브랜치를 체크아웃해 로컬 세션으로 이어 갑니다 |

Claude Code, Codex 같은 다른 에이전트에서 넘길 때는 오픈소스 Devin Handoff 플러그인을 씁니다.

::: src
[Devin Cloud in the Devin CLI](https://docs.devin.ai/cli/cloud), [Devin CLI handoff](https://docs.devin.ai/cli/handoff), [Hand off to Devin Cloud from Any Agent](https://docs.devin.ai/work-with-devin/devin-handoff)
:::

## 샌드박스

`--sandbox`로 실행하면 허용한 경로만 쓸 수 있고 나머지는 읽기 전용이 되며, 네트워크도 제한할 수 있습니다. 샌드박스를 만들 수 없는 환경에서는 샌드박스 없이 실행하지 않고 **시작을 거부**합니다([Devin CLI sandbox](https://docs.devin.ai/cli/sandbox)).

## 알아 둘 제약

- **클라우드 계정 기능 일부 미지원:** 공식 문서에 <span lang="en">“Devin CLI does not yet support Knowledge, Playbooks, or Secrets from your Devin account.”</span>라고 적혀 있습니다([Quickstart](https://docs.devin.ai/cli/index)).
- **Desktop 번들 설치:** Devin Desktop에 묶인 CLI 설치는 Legacy Windsurf Enterprise와 Devin Enterprise 플랜에서 쓸 수 있고, 관리자가 팀 설정에서 먼저 켜야 합니다.
- **Fusion:** CLI에서 Fusion을 쓰려면 유료 플랜과 CLI 3000.10.20 이상이 필요합니다. 자세한 조건은 [모델](/models/) 페이지에 있습니다. 공식 제품 페이지의 비용 비교 수치는 측정 조건이 붙은 홍보 자료라 이 가이드에서는 옮기지 않았습니다.

함께 보기: [Devin Cloud](/features/cloud/) · [Devin Desktop](/features/desktop/)
