This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

저번 스터디할 때 제가 말한 말을 정정해야 할거 같아 채팅으로 남깁니다.

제가 카카오 커머스에서 리액트 훅 폼을 빼고 자체 라이브러리를 사용한다고 했는데, 리액트와 뷰 프로젝트가 공존하는 문제도 있지만 유효성 검사를 다른 라이브러리로 했는데 그렇게 되면 폼 상태 관리와 폼 유효성 검사가 분리 돼서 같은 폼 데이터 관리라는 공통된 관심사가 있음에도 따로 관리를 해줘야하고, 양쪽 타입 호환성에 대한 문제로 사용하지 않았다고 합니다.
지금은 내부 규칙을 세워 유효성 검사 함수를 공통 파일로 빼고, 타입 문제는 중간에 인터페이스를 둔 상태로 리액트에서는 리액트 훅 폼, 뷰에서는 내부에서 개발한 라이브러리로 폼 데이터 관리를 한다고 하네요. 태영님 말씀처럼 리액트 훅 폼과 유효성 검사 함수를 따로 관리하더라도 결합도에 문제는 현재 없는거 같습니다.
사실 유효성 검사 함수를 따로 뺀다는 말이랑 중간에 인터페이스를 뒀다는 말이 이해가 안가는데 직접 물어본게 아니라 서버 개발자인 지인을 통해 물어본거라 혼자 찾아보고 있습니다ㅠㅠ

제가 확실하지 않은 상황에서 너무 가볍게 말을 한것 같네요. 덕분에 잘못된 지식도 고치고 더 배울수 있었습니다. 감사합니다!!



