# Devin 한국어 가이드

[Devin](https://devin.ai/) 한국어 사이트입니다.

사이트: **https://tifoden.github.io/devin-korea-guide/**

## 로컬에서 보기

Node.js 24가 필요합니다.

```bash
npm ci
npm run dev
```

GitHub Pages와 같은 하위 경로(`/devin-korea-guide/`)로 빌드하려면:

```bash
PATH_PREFIX=/devin-korea-guide/ npm run build
```

산출물은 `_site/`에 생성됩니다.

## GitHub Pages

현재는 `gh-pages` 브랜치의 정적 산출물로 배포됩니다. Actions 워크플로 레시피는 `docs/github-pages-workflow.yml`에 있습니다. (`gh` 토큰에 `workflow` 범위가 없어 `.github/workflows/`로는 올리지 못했습니다.)
