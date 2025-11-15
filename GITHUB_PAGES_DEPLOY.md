# GitHub Pagesへのデプロイ手順

このドキュメントは、Next.jsプロジェクトをGitHub Pagesにデプロイするための手順をまとめたものです。

## 前提条件

- GitHubアカウントを持っていること
- リポジトリが作成されていること（例: `username/new_profile_nextjs`）
- ローカルでプロジェクトがビルドできること

## デプロイ方法の選択

GitHub Pagesへのデプロイには以下の2つの方法があります：

### 方法1: GitHub Actions を使った自動デプロイ（推奨）
### 方法2: 手動でビルドしてgh-pagesブランチにプッシュ

---

## 方法1: GitHub Actions を使った自動デプロイ

### 1. next.config.ts の設定

`next.config.ts` を以下のように修正：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静的エクスポートを有効化
  images: {
    unoptimized: true, // GitHub Pagesでは画像最適化が使えないため
  },
  // カスタムドメインを使わない場合は以下をコメントアウト
  // basePath: "/new_profile_nextjs",
  // assetPrefix: "/new_profile_nextjs",
};

export default nextConfig;
```

**注意**: リポジトリ名が `username.github.io` の場合、`basePath` と `assetPrefix` は不要です。それ以外の場合は、リポジトリ名に合わせて設定してください。

### 2. GitHub Actions ワークフローファイルの作成

`.github/workflows/deploy.yml` を作成：

```bash
mkdir -p .github/workflows
```

以下の内容で `.github/workflows/deploy.yml` を作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # または master

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3. .nojekyll ファイルの作成

`public/.nojekyll` ファイルを作成（GitHub Pagesでアンダースコア始まりのファイルを無視しないようにするため）：

```bash
touch public/.nojekyll
```

### 4. GitHubリポジトリの設定

1. GitHubのリポジトリページに移動
2. **Settings** > **Pages** に移動
3. **Source** を **GitHub Actions** に設定

### 5. デプロイの実行

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

プッシュすると自動的にGitHub Actionsが実行され、デプロイされます。

**デプロイ先URL**:
- `username.github.io` の場合: `https://username.github.io/`
- その他のリポジトリの場合: `https://username.github.io/new_profile_nextjs/`

---

## 方法2: 手動でビルドしてgh-pagesブランチにプッシュ

### 1. next.config.ts の設定

方法1と同じように設定します。

### 2. package.json にスクリプトを追加

`package.json` の `scripts` セクションに以下を追加：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "deploy": "next build && touch out/.nojekyll && gh-pages -d out -t true"
  }
}
```

### 3. gh-pages パッケージのインストール

```bash
npm install --save-dev gh-pages
```

### 4. .nojekyll ファイルの作成

```bash
touch public/.nojekyll
```

### 5. デプロイの実行

```bash
npm run deploy
```

このコマンドで以下が実行されます：
1. Next.jsプロジェクトをビルド
2. `out` ディレクトリに静的ファイルを生成
3. `.nojekyll` ファイルを追加
4. `gh-pages` ブランチに自動プッシュ

### 6. GitHubリポジトリの設定

1. GitHubのリポジトリページに移動
2. **Settings** > **Pages** に移動
3. **Source** を **Deploy from a branch** に設定
4. **Branch** を **gh-pages** / **/ (root)** に設定

---

## カスタムドメインを使用する場合

### 1. CNAMEファイルの作成

`public/CNAME` ファイルを作成し、カスタムドメインを記載：

```
your-domain.com
```

**注意**: 既に `public/CNAME` ファイルが存在する場合は、内容を確認して適切なドメインが設定されているか確認してください。

### 2. DNSの設定

ドメインのDNS設定で、以下のいずれかを設定：

**Aレコード**:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAMEレコード**（サブドメインの場合）:
```
username.github.io
```

### 3. next.config.ts の調整

カスタムドメインを使用する場合、`basePath` と `assetPrefix` は **不要** です：

```typescript
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // basePath と assetPrefix は削除またはコメントアウト
};
```

---

## トラブルシューティング

### 404エラーが出る

- `basePath` と `assetPrefix` の設定を確認
- リポジトリ名が `username.github.io` でない場合は、これらの設定が必要

### CSSや画像が読み込まれない

- `next.config.ts` で `images.unoptimized: true` が設定されているか確認
- `basePath` と `assetPrefix` がリポジトリ名と一致しているか確認

### GitHub Actionsが失敗する

- **Settings** > **Pages** で **Source** が **GitHub Actions** になっているか確認
- ワークフローファイルのインデントやYAML構文が正しいか確認
- `npm ci` でエラーが出る場合は、`package-lock.json` がコミットされているか確認

### アンダースコア始まりのファイルが見つからない

- `.nojekyll` ファイルが `public/` ディレクトリに存在するか確認
- GitHub Actionsを使用している場合は、ビルド後に `.nojekyll` がアップロードされているか確認

---

## ビルド確認

デプロイ前に、ローカルでビルドが成功するか確認：

```bash
npm run build
```

成功すると、`out` ディレクトリに静的ファイルが生成されます。

---

## 参考リンク

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Deploying Next.js to GitHub Pages](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#github-pages)

---

## まとめ

このプロジェクトでは、**方法1: GitHub Actions を使った自動デプロイ** を推奨します。これにより、`main` ブランチにプッシュするだけで自動的にビルドとデプロイが行われます。

手動デプロイの方が簡単に感じる場合は、**方法2** を選択しても構いません。

