# Next.js Auth Form

認証フォーム機能を実装したモダンなNext.jsアプリケーションです。ユーザー登録、ログイン機能を備えた認証システムのサンプル実装です。

## 概要

このプロジェクトは、Next.jsを使用した認証システムの基本的な実装方法を示しています。フォームハンドリング、バリデーション、認証状態管理などの機能を含んでいます。

## 技術スタック

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![React Hook Form](https://img.shields.io/badge/-React_Hook_Form-EC5990?style=flat&logo=react&logoColor=white)
![Zod](https://img.shields.io/badge/-Zod-3068B7?style=flat&logo=zod&logoColor=white)
![Supabase](https://img.shields.io/badge/-Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)

- **言語**: TypeScript
- **フレームワーク**: Next.js 15 (App Router)
- **スタイリング**: Tailwind CSS
- **フォーム**: React Hook Form
- **バリデーション**: Zod
- **データベース**: Supabase

## Getting Started

### 前提条件
- Node.js 18.0.0以上
- npm、yarn、またはpnpm

### 環境構築手順

1. リポジトリをクローンします:
```bash
git clone https://github.com/yourusername/auth-form-with-nextjs.git
cd auth-form-with-nextjs
```

2. 依存関係をインストールします:
```bash
npm install
# または
yarn install
# または
pnpm install
```

3. 環境変数を設定します:
`.env.local`ファイルをプロジェクトのルートに作成し、必要な環境変数を設定します。
```
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

4. 開発サーバーを起動します:
```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細については[LICENSE](LICENSE)ファイルを参照してください。
