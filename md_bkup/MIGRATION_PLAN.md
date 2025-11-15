# Next.js 移行手順書・仕様書

## プロジェクト概要

現在の静的HTML/CSSサイト（Norihisa Awamuraのポートフォリオサイト）をNext.js 15（App Router）に移行する。

## 現在のサイト構造

### ページ構成
- **index.html**: メインページ（About、Blogセクション）
- **life.html**: サイドBページ（趣味・個人的な活動紹介）

### 主な機能
- レスポンシブデザイン（800px以下でモバイル対応）
- Google Fonts（Noto Sans JP、Roboto、Barlow Condensed）
- Material Design Icons
- Note.com埋め込み
- タイムライン表示
- グリッドシステム（10カラム）
- カスタムカラーパレット（CSS Variables）
- SVG画像の使用
- ソーシャルメディアリンク
- ページ内スムーズスクロール

### アセット
- **CSS**: `css/style.css`（約1100行）
- **画像**: `img/`フォルダ内（SVG、PNG、JPG）
- **その他**: CNAME（GitHub Pages用）

---

## 移行後の技術スタック

### フレームワーク・ライブラリ
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**（スタイリング）

### パッケージマネージャー
- **npm** または **pnpm**（推奨: pnpm）

### デプロイ
- **Vercel**（推奨）または Netlify、GitHub Pages（静的エクスポート）

---

## ディレクトリ構造（移行後）

```
new_profile_nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト（Google Fonts設定）
│   │   ├── page.tsx                # トップページ（旧index.html）
│   │   ├── life/
│   │   │   └── page.tsx            # ライフページ（旧life.html）
│   │   └── globals.css             # グローバルスタイル（Tailwind + カスタム）
│   ├── components/
│   │   ├── Header.tsx              # ヘッダーコンポーネント
│   │   ├── Footer.tsx              # フッターコンポーネント
│   │   ├── GlobalNavigation.tsx    # グローバルナビゲーション
│   │   ├── Greeting.tsx            # グリーティングセクション
│   │   ├── AboutSection.tsx        # Aboutセクション
│   │   ├── BlogSection.tsx         # Blogセクション
│   │   ├── Timeline.tsx            # タイムライン表示
│   │   ├── BlogCard.tsx            # ブログカード
│   │   ├── NoteEmbed.tsx           # Note.com埋め込み
│   │   ├── ToTop.tsx               # Topへ戻るボタン
│   │   └── LifeSection.tsx         # Lifeページのセクション
│   ├── data/
│   │   ├── timeline.ts             # タイムラインデータ
│   │   ├── blogs.ts                # ブログデータ
│   │   └── life.ts                 # ライフページのデータ
│   ├── types/
│   │   └── index.ts                # TypeScript型定義
│   └── utils/
│       └── constants.ts            # 定数（カラーパレット、URL等）
├── public/
│   ├── img/                        # 画像ファイル（移行）
│   └── CNAME                       # ドメイン設定（GitHub Pages用）
├── past_files/                     # 旧ファイル保存用
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── .gitignore
└── README.md
```

---

## 移行手順

### フェーズ1: プロジェクトセットアップ

1. **Next.jsプロジェクトの初期化**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
   ```
   - TypeScript: Yes
   - Tailwind CSS: Yes
   - App Router: Yes
   - Import alias: `@/*`

2. **既存ファイルの退避**
   - 既存の `index.html`、`life.html`、`css/` を `past_files/` に移動（参照用）

3. **依存パッケージのインストール**
   ```bash
   npm install
   ```

4. **画像ファイルの移行**
   - `img/` フォルダを `public/img/` に移動

### フェーズ2: デザインシステムの構築

5. **Tailwind CSSの設定**
   - `tailwind.config.ts` にカスタムカラーパレット追加
   - 既存のCSS Variablesを移行
   - グリッドシステムの再現（10カラムグリッド）
   - レスポンシブブレークポイント（800px）の設定

6. **Google Fontsの統合**
   - `next/font/google` を使用
   - Noto Sans JP、Roboto、Barlow Condensedの読み込み
   - `app/layout.tsx` で設定

7. **グローバルスタイルの構築**
   - `app/globals.css` に共通スタイルを定義
   - リセットCSS
   - カスタムスクロール動作

### フェーズ3: コンポーネント化

8. **共通コンポーネントの作成**
   - `Header.tsx`: ロゴ、ソーシャルアイコン、Side B/Aリンク
   - `Footer.tsx`: フッターナビゲーション、コピーライト
   - `GlobalNavigation.tsx`: About、Blogへのリンク
   - `ToTop.tsx`: ページトップへ戻るボタン

9. **トップページコンポーネント**
   - `Greeting.tsx`: グリーティングセクション
   - `AboutSection.tsx`: プロフィール、活動情報
   - `Timeline.tsx`: 職歴タイムライン
   - `BlogSection.tsx`: ブログ記事一覧
   - `BlogCard.tsx`: ブログカード表示
   - `NoteEmbed.tsx`: Note.com埋め込み（iframe）

10. **Lifeページコンポーネント**
    - `LifeSection.tsx`: 各趣味セクション（Music、Taiwan、Elephant等）

### フェーズ4: データ層の構築

11. **データファイルの作成**
    - `data/timeline.ts`: タイムラインデータの型安全な配列
    - `data/blogs.ts`: ブログ記事データ
    - `data/life.ts`: ライフページのセクションデータ

12. **TypeScript型定義**
    - `types/index.ts`: 
      - TimelineItem型
      - BlogEntry型
      - LifeSection型
      - SocialLink型

### フェーズ5: ページ構築

13. **トップページ (`app/page.tsx`)**
    - Greetingセクション
    - Aboutセクション
    - Blogセクション
    - メタデータ設定（title、description）

14. **Lifeページ (`app/life/page.tsx`)**
    - 趣味セクション一覧
    - メタデータ設定

15. **ルートレイアウト (`app/layout.tsx`)**
    - HTML構造
    - Google Fonts設定
    - 共通メタデータ
    - Header、Footerの配置

### フェーズ6: 機能実装

16. **スムーズスクロール**
    - `scroll-behavior: smooth` の設定
    - アンカーリンク対応

17. **外部埋め込み**
    - Note.comのiframe埋め込み
    - スクリプト読み込み（`next/script`）

18. **レスポンシブ対応**
    - Tailwindのブレークポイントを使用
    - モバイル/デスクトップでのレイアウト切り替え

19. **画像最適化**
    - `next/image` の使用
    - SVGファイルの適切な処理

### フェーズ7: 最適化とテスト

20. **パフォーマンス最適化**
    - 画像の最適化設定
    - フォントの最適化
    - バンドルサイズの確認

21. **SEO対応**
    - メタタグの設定
    - Open Graph対応
    - sitemap.xml、robots.txt の生成

22. **アクセシビリティ確認**
    - セマンティックHTML
    - ARIA属性の適切な使用
    - キーボードナビゲーション

23. **ブラウザテスト**
    - デスクトップ（Chrome、Firefox、Safari、Edge）
    - モバイル（iOS Safari、Android Chrome）
    - レスポンシブ表示の確認

### フェーズ8: デプロイ準備

24. **環境変数の設定**
    - `.env.local` の作成（必要に応じて）

25. **ビルドテスト**
    ```bash
    npm run build
    npm run start
    ```

26. **デプロイ設定**
    - Vercelの場合: 自動デプロイ設定
    - GitHub Pagesの場合: 静的エクスポート設定
      ```javascript
      // next.config.ts
      output: 'export',
      images: { unoptimized: true }
      ```

27. **CNAMEファイルの配置**
    - カスタムドメイン使用時は `public/CNAME` を確認

---

## 重要な実装ポイント

### 1. カスタムカラーパレットの移行

**元のCSS Variables:**
```css
:root {
    --white: #F8F8F6;
    --green: #859A93;
    --yellow: #FDCB6E;
    --navy: #2C3E50;
    --light-green: #E7EAE7;
}
```

**Tailwind Config:**
```typescript
colors: {
  'site-white': '#F8F8F6',
  'site-green': '#859A93',
  'site-yellow': '#FDCB6E',
  'site-navy': '#2C3E50',
  'site-light-green': '#E7EAE7',
}
```

### 2. グリッドシステムの移行

**元のグリッド:**
- 10カラムグリッド
- 24pxのgap

**Tailwind実装:**
```tsx
<div className="grid grid-cols-10 gap-6">
  <div className="col-span-8"></div>
  <div className="col-span-1"></div>
  <div className="col-span-1"></div>
</div>
```

### 3. レスポンシブブレークポイント

**Tailwind Config:**
```typescript
screens: {
  'mobile': { 'max': '800px' },
  'desktop': '801px',
}
```

### 4. Note.com埋め込みの処理

**コンポーネント例:**
```tsx
import Script from 'next/script';

export function NoteEmbed({ noteId, height = 400 }: { noteId: string; height?: number }) {
  return (
    <>
      <iframe
        className="note-embed"
        src={`https://note.com/embed/notes/${noteId}`}
        height={height}
        style={{ border: 0, display: 'block', width: '100%' }}
      />
      <Script src="https://note.com/scripts/embed.js" strategy="lazyOnload" />
    </>
  );
}
```

### 5. タイムラインデータの型定義

```typescript
export interface TimelineItem {
  period: string;
  company: string;
  companyUrl: string;
  isCurrent: boolean;
}

export const timelineData: TimelineItem[] = [
  {
    period: '2024年3月〜',
    company: 'Ubie株式会社',
    companyUrl: 'https://ubie.life/',
    isCurrent: true,
  },
  // ...
];
```

---

## デザインの再現度

### 完全に再現する要素
- レイアウト構造
- カラーパレット
- タイポグラフィ
- グリッドシステム
- レスポンシブ動作
- アニメーション（ホバー効果等）
- タイムライン表示
- Note.com埋め込み

### 改善する要素
- 画像の最適化（next/image）
- フォントの読み込み最適化
- コードの保守性（コンポーネント化）
- 型安全性（TypeScript）
- SEO最適化
- ビルド時最適化

---

## マイグレーションチェックリスト

### デザイン・レイアウト
- [ ] カラーパレットの一致
- [ ] フォントの一致
- [ ] グリッドレイアウトの再現
- [ ] レスポンシブデザインの再現
- [ ] ヘッダー/フッターの再現
- [ ] グリーティングセクションの再現
- [ ] タイムラインの再現
- [ ] ブログカードの再現

### 機能
- [ ] ページ内リンク動作
- [ ] 外部リンク動作
- [ ] Note.com埋め込み表示
- [ ] ソーシャルアイコンリンク
- [ ] To Topボタン動作
- [ ] ホバーエフェクト

### 技術
- [ ] TypeScript型定義
- [ ] コンポーネント化完了
- [ ] データ分離完了
- [ ] 画像最適化
- [ ] フォント最適化
- [ ] SEO対応
- [ ] アクセシビリティ対応

### テスト
- [ ] デスクトップ表示確認
- [ ] モバイル表示確認（800px以下）
- [ ] 各種ブラウザ確認
- [ ] リンク動作確認
- [ ] ページ遷移確認
- [ ] ビルド成功確認

### デプロイ
- [ ] 本番ビルド成功
- [ ] デプロイ完了
- [ ] カスタムドメイン設定（必要な場合）
- [ ] SSL証明書確認

---

## パフォーマンス目標

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5秒
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Lighthouse スコア目標
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## 保守・運用

### 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# Lint
npm run lint

# 型チェック
npx tsc --noEmit
```

### コンテンツ更新方法
1. **タイムライン更新**: `src/data/timeline.ts` を編集
2. **ブログ追加**: `src/data/blogs.ts` に新規エントリー追加
3. **ライフページ更新**: `src/data/life.ts` を編集

### 画像追加方法
1. `public/img/` に画像を配置
2. コンポーネントで `next/image` を使用して参照

---

## トラブルシューティング

### Note.com埋め込みが表示されない
- スクリプトの読み込みタイミングを確認
- `next/script` の `strategy` を調整

### 画像が表示されない
- `next/image` のパスを確認
- 静的エクスポート時は `unoptimized: true` を設定

### スタイルが適用されない
- Tailwind の `content` 設定を確認
- カスタムCSSの読み込み順序を確認

### ビルドエラー
- TypeScript型エラーを確認
- 未使用のimportを削除
- `next.config.ts` の設定を確認

---

## 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vercel Deployment](https://vercel.com/docs)

---

## 完了条件

1. すべての静的ページがNext.jsで再現されている
2. デザインが元のサイトと視覚的に一致している
3. すべてのリンクと機能が正常に動作している
4. レスポンシブデザインが正しく機能している
5. ビルドエラーがない
6. 本番環境にデプロイされている
7. Lighthouse スコアが目標値を達成している

---

**作成日**: 2025年11月14日  
**対象プロジェクト**: Norihisa Awamura Portfolio Website  
**移行元**: 静的HTML/CSS  
**移行先**: Next.js 15 (App Router) + TypeScript + Tailwind CSS



