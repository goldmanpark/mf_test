# Module Federation Test
webpack기초, react심화 공부를 겸함

#### 현재까지 완료한 기능들
- host <-> remote 모듈 공유
- typescript <-> javascript 파일 간 호환
- 기본 react모듈 share

#### 실패(불가능)한 기능들
- import함수에 param넣어 동적으로 remote 모듈 불러오기: 불가능. 동일 app내에서는 가능하나 remote는 웹팩이 번들링을 못함.
- png등 파일 번들링: 다시 시도할것

#### 앞으로 추가할 기능들
- host를 정점으로 하는 redux 체계
- remote app이 꺼져 있어도 host는 작동하게끔(dynamic remote)
- 간이 nodejs서버를 이용하여 세션 테스트
