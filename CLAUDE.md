<!-- TODO (보강 예정)
- 에러 발생시 멈추고 ntfy 알림 후 사용자 확인 대기 방식으로 변경
- 자동진행 vs 멈춤 두 가지 모드 구분
- /clear 후 새 세션 자동 시작 방법 개선 필요 (현재는 ntfy 알림 후 수동 트리거)
-->

## 프로젝트 개요
- 프로젝트명: 현재 폴더명 자동 사용 (basename "$PWD" 로 읽을 것)
- 기술스택: Next.js 16, TypeScript, Tailwind CSS
- 백엔드: bkend.ai (BaaS)
- 배포: Vercel
- 레벨: Dynamic

## 언어
모든 응답은 한국어로 할 것

## bkit 설정
- 온보딩 메뉴 스킵
- 세션 시작시 바로 실행할 것

## 프로젝트 초기화 규칙
최초 1회만 실행 (이미 package.json 있으면 스킵):
0. mv CLAUDE.md ..
1. npx create-next-app@latest . --yes
2. .env.local 생성 (아래 내용으로)
````
   NEXT_PUBLIC_APP_NAME=앱이름
````
3. .env.example 생성 (아래 내용으로)
````
   NEXT_PUBLIC_APP_NAME=앱이름
````
4. .gitignore에 .env.local 확인
5. mv ../CLAUDE.md .

## Git 및 Vercel 자동화 규칙
최초 1회만 실행 (.git 폴더 없으면 실행):
1. FOLDER_NAME=$(basename "$PWD")
2. gh repo create $FOLDER_NAME --public --source=. --remote=origin
3. git add . && git commit -m "init: 프로젝트 초기화"
4. git push -u origin main
5. (.vercel 폴더 없으면) vercel 실행 (수동 설정 - Y, 계정 선택, N, Enter, Enter)
6. 이후 git push 하면 Vercel 자동 배포

## 자동화 규칙
"전체자동 [기능1] [기능2]..." 라고 하면
각 기능을 순서대로 끝까지 실행할 것

순서: plan → do → analyze → iterate → report
- plan: 기능 구조 및 파일 목록 설계
- do: 실제 코드 구현
- analyze: 구현 결과 검토
- iterate: 90% 달성까지 자동 반복 (최대 5회)
- report: 완료 보고

- 중간에 사용자 확인 요청 금지
- 각 기능 시작 전 변수 설정:
````bash
  FOLDER_NAME=$(basename "$PWD")
  FEATURE="현재기능명"        # 예: 버튼클릭카운터3
  NEXT_FEATURE="다음기능명"   # 예: (없으면 빈 문자열)
````

- 기능 1개 report 완료되면:
  1. 실행 대기 목록에서 [ ] 를 [x] 로 변경
  2. npm run build
     - 성공시 → 3번으로
     - 실패시 → 에러 처리 규칙 (build 단계로 기록)
  3. git add . && git commit -m "feat: ${FEATURE} 완료"
  4. git push
  5. 남은 [ ] 기능이 있으면 → 다음 기능으로 진행
  6. 모든 기능 [x]이면 (마지막 기능):
     - curl -H "Content-Type: text/plain" -d "${FOLDER_NAME} 전체 완료! 🎉" "https://ntfy.sh/${FOLDER_NAME}"
     - "전체완료!" 출력 후 종료
  7. curl -H "Content-Type: text/plain" -d "${FOLDER_NAME} - 다음기능: ${NEXT_FEATURE} 시작해줘" "https://ntfy.sh/${FOLDER_NAME}"
  8. /clear 실행

## 에러 처리 규칙
- 에러 발생시 즉시 ERROR.md에 아래 형식으로 기록 후 3회 재시도:
````
  ## [기능명] - [날짜 시각]
  - 단계: plan / do / analyze / iterate / build 중
  - 에러 내용: (전체 에러 메시지)
  - 재시도: 1회차 / 2회차 / 3회차
  - 해결 방법:
  - 최종 결과: 성공 / 실패(다음기능으로 넘어감)
````

- 재시도마다 ERROR.md 업데이트
- error_log.txt에도 append로 누적 기록 (전체 히스토리 보존)
- 에러 수정 완료되면:
  1. git add . && git commit -m "fix: [기능명] - [에러 한 줄 요약]"
  2. git push
  3. curl -H "Content-Type: text/plain" -d "${FEATURE} 에러 발생! ERROR.md 확인" "https://ntfy.sh/${FOLDER_NAME}"
- 3회 실패시 ERROR.md 기록 후 다음 기능으로 넘어갈 것

## 커밋 규칙
- feat: 새 기능
- fix: 버그 수정
- docs: 문서
- chore: 설정 변경

## 실행 대기 기능 목록
- [x] 다크모드토글
- [ ] 글자카운터
## 완료된 기능