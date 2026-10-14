# UNIST Online CV (Jekyll)

[sharu725/online-cv](https://github.com/sharu725/online-cv)에서 아이디어를 얻어 새로 만든 연구자용 Jekyll CV입니다.
내용은 `_data/data.yml` 하나만 고치면 됩니다.

## 구성
- 왼쪽: 프로필 카드 (사진/이니셜, 연락처, LinkedIn, 언어, 취미)
- 본문: About(+ Research Interests) · Education · Publications · Honors & Awards · Skills
  - Research Experience는 `experience`를 채우면 자동으로 나타납니다.

## 주요 기능
- UNIST 공식 색상(Navy #001B54, Emerald #44C1C4) 기본 적용 — `_config.yml`의 `accent`로 변경 가능
- 라이트/다크 모드 (OS 설정 자동 감지 + 토글)
- 스티키 상단 내비게이션 + 현재 섹션 하이라이트
- 논문: 내 이름 강조(`highlight`), 유형별 필터, PDF/Code/DOI 버튼
- 모바일 반응형, A4 인쇄 스타일 (브라우저 인쇄 → PDF로 저장)
- 외부 플러그인 없음 → GitHub Pages 기본 빌드로 바로 배포

## 실행
```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

## 배포 (GitHub Pages)
1. 저장소에 push
2. Settings → Pages → Source: `Deploy from a branch`, 브랜치 선택
3. `username.github.io/저장소이름` 형태라면 `_config.yml`의 `baseurl`을 `/저장소이름`으로 설정

## 설정 요약
| 위치 | 항목 |
|---|---|
| `_config.yml` | `accent`, `color_mode`, `sidebar_position`, `animations`, `analytics` |
| `_data/data.yml` | 모든 이력 내용. 섹션을 지우면 화면과 메뉴에서 자동으로 사라짐 |
| `assets/images/` | 프로필 사진 |
