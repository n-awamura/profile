# 既存リポジトリ (n-awamura/new_profile) へのデプロイ手順

このドキュメントは、現在の Next.js プロジェクトを既存の GitHub Pages リポジトリ `n-awamura/new_profile` に置き換える手順をまとめたものです。

## 現状の確認

- **既存リポジトリ**: `n-awamura/new_profile`
- **ローカルディレクトリ**: `/Users/elephant/Documents/new_profile_2`
- **カスタムドメイン**: `n-awamura.com`
- **置き換え元**: `/Users/elephant/Documents/new_profile_nextjs`（このプロジェクト）

## 前提条件

- 既存の静的サイトのバックアップを取る
- 現在の `new_profile_2` が Git リポジトリに接続されている
- デプロイ後は Next.js による静的サイトに完全に置き換わる

---

## ステップ1: Next.js プロジェクトの設定

### 1-1. next.config.ts の確認・修正

`/Users/elephant/Documents/new_profile_nextjs/next.config.ts` を以下のように設定：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静的エクスポートを有効化
  images: {
    unoptimized: true, // GitHub Pagesでは画像最適化が使えないため
  },
  // カスタムドメイン (n-awamura.com) を使用するため、basePath と assetPrefix は不要
};

export default nextConfig;
```

**重要**: カスタムドメインを使用しているため、`basePath` や `assetPrefix` の設定は **不要** です。

### 1-2. .nojekyll ファイルの作成

GitHub Pages でアンダースコア始まりのファイルを正しく扱うために必要：

```bash
cd /Users/elephant/Documents/new_profile_nextjs
touch public/.nojekyll
```

### 1-3. GitHub Actions ワークフローファイルの作成

`.github/workflows/deploy.yml` を作成：

```bash
cd /Users/elephant/Documents/new_profile_nextjs
mkdir -p .github/workflows
```

以下の内容で `.github/workflows/deploy.yml` を作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

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

### 1-4. ローカルビルドのテスト

デプロイ前に、ビルドが成功することを確認：

```bash
cd /Users/elephant/Documents/new_profile_nextjs
npm run build
```

成功すると、`out` ディレクトリに静的ファイルが生成されます。

---

## ステップ2: 既存リポジトリのバックアップ

念のため、現在の `new_profile_2` をバックアップ：

```bash
cd /Users/elephant/Documents
cp -r new_profile_2 new_profile_2_backup_$(date +%Y%m%d)
```

---

## ステップ3: 新しいプロジェクトを既存リポジトリに統合

### 3-1. 既存リポジトリの .git ディレクトリを保存

```bash
cd /Users/elephant/Documents/new_profile_2
cp -r .git /tmp/new_profile_git_backup
```

### 3-2. 既存ディレクトリの内容をクリア（.git 以外）

```bash
cd /Users/elephant/Documents/new_profile_2
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
```

### 3-3. 新しいプロジェクトをコピー

```bash
rsync -av --exclude='.git' --exclude='node_modules' --exclude='.next' /Users/elephant/Documents/new_profile_nextjs/ /Users/elephant/Documents/new_profile_2/
```

### 3-4. 依存関係のインストール

```bash
cd /Users/elephant/Documents/new_profile_2
npm install
```

### 3-5. ビルドテスト

```bash
cd /Users/elephant/Documents/new_profile_2
npm run build
```

---

## ステップ4: GitHub リポジトリの設定変更

### 4-1. GitHub Pages の設定を変更

1. GitHub で `n-awamura/new_profile` リポジトリに移動
2. **Settings** > **Pages** に移動
3. **Source** を **GitHub Actions** に変更

**注意**: これを行わないと、GitHub Actions によるデプロイが機能しません。

---

## ステップ5: デプロイ

### 5-1. 変更をコミット

```bash
cd /Users/elephant/Documents/new_profile_2
git add .
git commit -m "Migrate to Next.js with GitHub Actions deployment"
```

### 5-2. プッシュ

```bash
git push origin main
```

**注意**: ブランチ名が `master` の場合は `git push origin master` を使用してください。

### 5-3. GitHub Actions の実行確認

1. GitHub で `n-awamura/new_profile` リポジトリに移動
2. **Actions** タブをクリック
3. "Deploy to GitHub Pages" ワークフローが実行されているか確認
4. 成功すると、緑のチェックマークが表示されます

### 5-4. デプロイされたサイトの確認

数分後、以下のURLでサイトにアクセス：

- **カスタムドメイン**: `https://n-awamura.com`
- **GitHub Pages デフォルトURL**: `https://n-awamura.github.io/new_profile/`

---

## トラブルシューティング

### GitHub Actions が失敗する

#### 原因1: Pages の Source 設定が間違っている
- **Settings** > **Pages** > **Source** が **GitHub Actions** になっているか確認

#### 原因2: パーミッションエラー
- ワークフローファイルの `permissions` セクションが正しく設定されているか確認

#### 原因3: ビルドエラー
- ローカルで `npm run build` が成功するか確認
- Actions タブでエラーログを確認

### CSSや画像が読み込まれない

#### 原因: カスタムドメインの設定が反映されていない
1. `public/CNAME` ファイルが存在し、`n-awamura.com` が記載されているか確認
2. GitHub の **Settings** > **Pages** > **Custom domain** で `n-awamura.com` が設定されているか確認

### カスタムドメインで404エラー

#### 原因: DNS設定の問題
1. ドメインのDNS設定を確認
2. 以下のAレコードが設定されているか確認：
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. DNS変更が反映されるまで数時間〜48時間かかる場合があります

### 古いサイトが表示される

#### 原因: ブラウザキャッシュ
- ブラウザのキャッシュをクリア、またはシークレットモードでアクセス

---

## ロールバック手順（問題が発生した場合）

### バックアップから復元

```bash
cd /Users/elephant/Documents
rm -rf new_profile_2
cp -r new_profile_2_backup_YYYYMMDD new_profile_2
cd new_profile_2
git push origin main --force
```

**注意**: `--force` は既存の履歴を上書きするため、慎重に実行してください。

---

## デプロイ後の確認項目

- [ ] トップページ（`/`）が正しく表示される
- [ ] Side B（`/life`）が正しく表示される
- [ ] グローバルナビゲーション（About, Blog）が機能する
- [ ] "to Side A/B" ボタンが機能する
- [ ] SNSリンクが機能する
- [ ] 画像が正しく表示される
- [ ] モバイル表示が正しい
- [ ] リーディングモードでナビゲーションが読み取れる

---

## 今後の更新フロー

今後、サイトを更新する場合：

1. `/Users/elephant/Documents/new_profile_2` で変更を加える
2. `git add .` でステージング
3. `git commit -m "説明"` でコミット
4. `git push origin main` でプッシュ
5. GitHub Actions が自動的にビルド＆デプロイ

---

## 参考情報

- **リポジトリ**: https://github.com/n-awamura/new_profile
- **カスタムドメイン**: https://n-awamura.com
- **GitHub Pages デフォルト**: https://n-awamura.github.io/new_profile/

---

## まとめ

この手順により、既存の静的サイトを Next.js ベースの新しいサイトに置き換えることができます。GitHub Actions を使用することで、以後は `main` ブランチへのプッシュだけで自動的にデプロイされます。

