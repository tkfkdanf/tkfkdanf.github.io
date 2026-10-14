# Online CV for Researchers (Jekyll)

**Live:** https://tkfkdanf.github.io

대학원생·연구자를 위한 한 페이지짜리 온라인 CV 템플릿입니다.
[sharu725/online-cv](https://github.com/sharu725/online-cv)에서 아이디어를 얻어 새로 만들었고,
내용은 `_data/data.yml` 파일 하나만 고치면 됩니다. GitHub Pages로 무료 배포됩니다.

## 구성
- **왼쪽 프로필 카드:** 사진(없으면 이니셜), 이메일, LinkedIn, Google Scholar, 연구실 링크, 현지 시각, 언어
- **본문:** About(+ Research Interests) · Education · Research Experience · Publications · Honors & Awards · Skills
- 비워둔 항목·섹션은 화면과 상단 메뉴에서 자동으로 사라집니다.

## 주요 기능
- UNIST 색상(Navy `#001B54`, Emerald `#44C1C4`) 기본 적용, `_config.yml`의 `accent`로 다른 색 선택 가능
- 라이트/다크 모드 (OS 설정 자동 감지 + 버튼 전환)
- 상단 고정 메뉴, 현재 보고 있는 섹션 강조
- 논문: 내 이름 밑줄 강조, Conference/Journal 필터, `Accepted` 표시, PDF·Code·DOI 버튼
- 모바일 화면 대응, 인쇄 버튼으로 A4 PDF 저장
- 별도 플러그인이 없어 GitHub Pages가 그대로 빌드

---

## 내 CV로 만들기 (따라하기)

### 1. 저장소 복사
1. 이 저장소 오른쪽 위 **Fork**를 누릅니다.
2. Fork한 저장소의 **Settings → General → Repository name**을 `내아이디.github.io` 로 바꿉니다.
   → 사이트 주소가 `https://내아이디.github.io` 가 됩니다.

> 다른 이름(예: `cv`)으로 하면 주소는 `https://내아이디.github.io/cv` 이고,
> `_config.yml`의 `baseurl`을 `"/cv"` 로 바꿔야 CSS와 사진이 제대로 나옵니다.

### 2. 내 정보로 바꾸기
| 파일 | 할 일 |
|---|---|
| `_data/data.yml` | 이름, 연락처, 학력, 논문, 수상, 스킬 등 **모든 내용** |
| `assets/images/profile.jpg` | 내 사진으로 교체 (정사각형 권장, 400×400 정도) |
| `_config.yml` | `url`을 내 사이트 주소로, 원하면 `accent`(색상) 변경 |

`data.yml` 작성 요령:
- 논문: `highlight`에 논문에 표기된 내 이름을 그대로 적으면 저자 목록에서 강조됩니다.
- 출판 전 논문은 `status: Accepted`를 붙이고, 출판되면 그 줄만 지우면 됩니다.
- LinkedIn·Google Scholar는 아이디만 적어도 되고 전체 주소를 적어도 됩니다.
  (Scholar 아이디는 프로필 주소의 `user=` 뒤 값)

### 3. GitHub Pages 켜기
저장소 **Settings → Pages**에서 Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 선택 후 Save.
1~2분 뒤 사이트가 열립니다. 이후에는 push할 때마다 자동으로 갱신됩니다.

### 서버/PC에서 git으로 수정하는 경우
```bash
git clone https://github.com/내아이디/내아이디.github.io.git
cd 내아이디.github.io
# _data/data.yml 수정 후
git add -A && git commit -m "Update CV" && git push
```
- push 할 때 Password 칸에는 GitHub 비밀번호가 아니라 **토큰**을 넣습니다.
- 토큰 만들기: <https://github.com/settings/tokens/new> → `repo` 체크 → Generate
  (Fine-grained 토큰을 쓸 때는 해당 저장소를 선택하고 **Contents: Read and write** 권한을 꼭 추가)
- push 후 GitHub Contributors에 내가 안 보이면 커밋 이메일을
  <https://github.com/settings/emails> 에 등록·인증하세요.

### 내 컴퓨터에서 미리보기 (선택)
```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

## 설정 요약
| 위치 | 항목 |
|---|---|
| `_config.yml` | `accent`(unist·indigo·blue·teal·green·orange·rose·violet·slate), `color_mode`, `sidebar_position`, `animations`, `analytics` |
| `_data/data.yml` | 모든 이력 내용 |
| `assets/css/main.css` | 디자인 (색상 토큰은 파일 위쪽 `:root`) |
