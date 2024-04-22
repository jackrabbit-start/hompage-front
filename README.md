## 할일

1. ~~Nextjs 14 배포 및 사용~~
2. 공식문서 읽으면서 진행하기
3. firebase 배포 해보기 (추후)
4. aws EC2 배포해보기 (추후)
5. aws 백앤드(fastApi) 올려서 연동
6. three.js 사용해보기
7. 홈페이지 기능 생각해보기(재밋는걸로)

## Getting Started

First, run the development server:

```bash
yarn install
yarn build
yarn dev
```

## FrameWork

react + Nextjs14 (AppRouter)

## hompage (deploy on Vercel)

https://hompage-front.vercel.app/

## architecture (design pattern) 고민 중 굳이?

FSD(Feature Sliced Design)

> app > pages > widgets > features > entities > shares

```typescript
src // fsd 구조로 짤 주 폴더
├── app // 전역적 관리 (레이아웃, api 설정, 전역 디자인 설정 등)
├── entities // 역할단위
├── features // 역할의 모임 단위
├── pages // widget 들이 모인것
├── shared // UI 키트, type설정, api통신 ,util 등
└── widgets // feature의 모임
app
├── layout.tsx
└── page.tsx

```

## CSS

tailwind css

### 문제점들

1. vercel 배포 등 env 키 저장시 setting - Actions secrets and variables - Repository secrets 해야 맨처음 env에 저장된다.(이거때문에 firebase 도 안된걸지도?)
