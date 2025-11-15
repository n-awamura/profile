# Next.js移行作業 - AIへの依頼プロンプト

このファイルには、AI（Cursor、Claude等）に対してNext.js移行作業を依頼する際のプロンプトテンプレートが含まれています。

---

## 🚀 全体作業を一括で依頼する場合

```
@new_profile_nextjs フォルダ内の静的サイト（index.html、life.html）を、Next.js 15 (App Router)に移行してください。

MIGRATION_PLAN.mdに記載された仕様書に従って、以下の作業を順番に実施してください：

1. Next.jsプロジェクトの初期化（TypeScript、Tailwind CSS使用）
2. 既存ファイルをpast_filesに退避
3. Tailwind設定（カスタムカラー、グリッド、レスポンシブ設定）
4. Google Fonts設定（Noto Sans JP、Roboto、Barlow Condensed）
5. 全コンポーネントの作成（Header、Footer、Timeline等）
6. データ層の構築（timeline.ts、blogs.ts、life.ts）
7. トップページ（page.tsx）とLifeページ（life/page.tsx）の実装
8. 画像最適化（next/imageの使用）
9. Note.com埋め込み機能の実装
10. レスポンシブ対応（800px以下でモバイル表示）
11. SEO設定（メタタグ、Open Graph）
12. ビルドテストと動作確認

既存のデザインを完全に再現し、型安全性とパフォーマンスを重視してください。
作業中に判断が必要な場合は、ベストプラクティスに従って進めてください。
```

---

## 📝 段階的に依頼する場合

### フェーズ1: プロジェクトセットアップ

```
@new_profile_nextjs 

MIGRATION_PLAN.mdのフェーズ1を実施してください：

1. Next.js 15プロジェクトを初期化（TypeScript、Tailwind CSS、App Router使用）
2. 既存のindex.html、life.html、cssフォルダをpast_filesフォルダに移動
3. imgフォルダをpublic/imgに移動
4. 必要な依存パッケージをインストール
5. 基本的なディレクトリ構造（src/components、src/data、src/types、src/utils）を作成

完了後、作業内容を報告してください。
```

### フェーズ2: デザインシステムの構築

```
@new_profile_nextjs 

MIGRATION_PLAN.mdのフェーズ2を実施してください：

1. tailwind.config.tsにカスタムカラーパレットを追加：
   - site-white: #F8F8F6
   - site-green: #859A93
   - site-yellow: #FDCB6E
   - site-navy: #2C3E50
   - site-light-green: #E7EAE7

2. 10カラムのグリッドシステムを設定

3. レスポンシブブレークポイント（800px）を設定

4. Google Fonts（Noto Sans JP、Roboto、Barlow Condensed）をnext/font/googleで設定

5. app/globals.cssにグローバルスタイルを定義（リセットCSS、スムーズスクロール等）

past_files/css/style.cssを参照して、デザインを忠実に再現してください。
```

### フェーズ3: 共通コンポーネントの作成

```
@new_profile_nextjs 

MIGRATION_PLAN.mdのフェーズ3を実施してください。
past_files/index.htmlとlife.htmlを参照し、以下のコンポーネントを作成：

1. src/components/Header.tsx
   - ロゴ（img/logo.svg）
   - ソーシャルアイコン（X、LinkedIn、Facebook）
   - Side B / Side Aリンク（ページによって切り替え）

2. src/components/Footer.tsx
   - About、Blogへのリンク
   - コピーライト表示

3. src/components/GlobalNavigation.tsx
   - About、Blogセクションへのアンカーリンク

4. src/components/ToTop.tsx
   - ページトップへ戻るボタン

全て型安全なTypeScriptで実装し、既存デザインを完全に再現してください。
```

### フェーズ4: トップページコンポーネントの作成

```
@new_profile_nextjs 

MIGRATION_PLAN.mdのフェーズ3続きを実施してください。
past_files/index.htmlを参照し、以下のコンポーネントを作成：

1. src/components/Greeting.tsx
   - グリーティング画像とテキストオーバーレイ
   - "Awa"の部分を黄色でハイライト

2. src/components/AboutSection.tsx
   - プロフィール表示（画像、名前、肩書き）
   - 各サブセクション（活動の軸、これまでとこれから、スキルと特長、言語）

3. src/components/Timeline.tsx
   - 職歴タイムライン表示
   - 現在の職は塗りつぶしドット、過去は白抜きドット
   - 縦線での接続

4. src/components/BlogSection.tsx
   - ブログセクション全体のレイアウト

5. src/components/BlogCard.tsx
   - ブログカード表示（画像、タイトル、説明）

6. src/components/NoteEmbed.tsx
   - Note.comのiframe埋め込み
   - スクリプト読み込み（next/script使用）

全て既存デザインを忠実に再現してください。
```

### フェーズ5: Lifeページコンポーネントの作成

```
@new_profile_nextjs 

MIGRATION_PLAN.mdのフェーズ3続きを実施してください。
past_files/life.htmlを参照し、以下のコンポーネントを作成：

1. src/components/LifeSection.tsx
   - 各趣味セクション（Music、Taiwan、Elephant、Euro Vintage、Vibe Coding）
   - 左右2カラムレイアウト
   - レスポンシブ対応（800px以下で縦積み）

既存デザインを完全に再現してください。
```

### フェーズ6: データ層の構築

```
@new_profile_nextjs 

MIGRATION_PLAN.mdのフェーズ4を実施してください。
past_filesを参照し、以下のデータファイルと型定義を作成：

1. src/types/index.ts
   - TimelineItem型
   - BlogEntry型
   - LifeSection型
   - SocialLink型

2. src/data/timeline.ts
   - タイムラインデータ（Ubie、freee、ユニファ、パロアルト研究所）
   - 型安全な配列として定義

3. src/data/blogs.ts
   - ブログ記事データ（freee社活動まとめ、Ubie ResearchOps等）

4. src/data/life.ts
   - ライフページの各セクションデータ

全てTypeScriptで型安全に実装してください。
```

### フェーズ7: ページの実装

```
@new_profile_nextjs 

MIGRATION_PLAN.mdのフェーズ5を実施してください：

1. src/app/page.tsx（トップページ）
   - Greeting、About、Blogセクションを配置
   - メタデータ設定（title、description）

2. src/app/life/page.tsx（Lifeページ）
   - LifeSectionコンポーネントを使用
   - 導入文と結び文を配置
   - メタデータ設定

3. src/app/layout.tsx（ルートレイアウト）
   - Header、Footer配置
   - Google Fonts設定
   - 共通メタデータ

past_filesを参照し、既存の構造とコンテンツを完全に再現してください。
```

### フェーズ8: 最終調整とテスト

```
@new_profile_nextjs 

MIGRATION_PLAN.mdのフェーズ6、7を実施してください：

1. 画像最適化（next/imageの使用）
2. レスポンシブデザインの最終確認（800px以下でモバイル表示）
3. スムーズスクロールの動作確認
4. Note.com埋め込みの動作確認
5. 全リンクの動作確認
6. ホバーエフェクトの再現
7. SEO設定（Open Graph、メタタグ）
8. ビルドテスト（npm run build）
9. 型エラーのチェック（tsc --noEmit）

past_files/index.htmlとlife.htmlと見た目が完全に一致するよう調整してください。
問題があれば修正し、最終的な動作確認を行ってください。
```

---

## 🔧 個別機能の実装を依頼する場合

### Tailwind設定のみ

```
@new_profile_nextjs 

tailwind.config.tsを設定してください：

1. past_files/css/style.cssのカラーパレットをTailwindに移行
2. 10カラムのグリッドシステムを設定
3. レスポンシブブレークポイント（mobile: max 800px、desktop: 801px+）を追加
4. カスタムフォント（Noto Sans JP、Roboto、Barlow Condensed）の設定

既存のデザインシステムを完全に再現してください。
```

### Headerコンポーネントのみ

```
@new_profile_nextjs 

past_files/index.htmlのヘッダー部分を参照し、src/components/Header.tsxを作成してください：

- ロゴ画像（/img/logo.svg）へのリンク
- ソーシャルアイコン（X、LinkedIn、Facebook）
- Side B / Side Aリンク（propsでページを判別）
- レスポンシブ対応
- 既存デザインの完全再現

TypeScriptで型安全に実装してください。
```

### Timelineコンポーネントのみ

```
@new_profile_nextjs 

past_files/index.htmlのタイムライン部分を参照し、以下を作成：

1. src/types/index.ts に TimelineItem型を定義
2. src/data/timeline.ts にタイムラインデータを作成
3. src/components/Timeline.tsx を実装
   - ドット（現在は塗りつぶし、過去は白抜き）
   - 縦線での接続
   - ライトグリーン背景
   - レスポンシブ対応

既存デザインを完全に再現してください。
```

### Note.com埋め込みのみ

```
@new_profile_nextjs 

Note.comの埋め込み機能を実装してください：

1. src/components/NoteEmbed.tsx を作成
   - iframeでNote記事を埋め込み
   - next/scriptでnote.com/scripts/embed.jsを読み込み
   - propsでnoteId、heightを受け取る
   - 型安全に実装

2. 使用例をコメントで追加

past_files/index.htmlのNote埋め込み部分を参考にしてください。
```

---

## 🐛 デバッグ・修正を依頼する場合

### デザインの不一致修正

```
@new_profile_nextjs 

現在の実装と past_files/index.html のデザインを比較し、以下を修正してください：

1. カラーが一致しているか確認
2. フォントサイズ、行間が一致しているか確認
3. レイアウト（グリッド、余白）が一致しているか確認
4. レスポンシブ動作（800px以下）が一致しているか確認
5. ホバーエフェクトが一致しているか確認

差異があれば全て修正し、完全に一致させてください。
```

### ビルドエラー修正

```
@new_profile_nextjs 

npm run build でエラーが発生しています。
以下を確認・修正してください：

1. TypeScript型エラーの解消
2. 未使用のimportの削除
3. next.config.tsの設定確認
4. 画像パスの確認
5. 依存関係の確認

ビルドが成功するまで修正してください。
```

### レスポンシブ対応の修正

```
@new_profile_nextjs 

past_files/index.html と past_files/life.html のレスポンシブ動作（800px以下）を確認し、
現在のNext.js実装が完全に一致するよう修正してください：

1. グリッドが1カラムに変わるか
2. 画像サイズが適切に調整されるか
3. フォントサイズが変わるか
4. 余白・マージンが適切か
5. Footerのレイアウトが正しいか

全ての不一致を修正してください。
```

---

## 📊 確認・レポートを依頼する場合

### 進捗確認

```
@new_profile_nextjs 

MIGRATION_PLAN.mdの進捗状況を確認し、報告してください：

1. 完了した項目
2. 未完了の項目
3. 発生している問題
4. 次に実施すべき作業

マイグレーションチェックリストを参照してください。
```

### デザイン比較

```
@new_profile_nextjs 

past_files/index.html と現在の実装を比較し、以下をレポートしてください：

1. 完全に一致している部分
2. まだ実装されていない部分
3. デザインが異なる部分
4. 修正が必要な部分

具体的な差異をリストアップしてください。
```

---

## 💡 使用上のヒント

1. **段階的に依頼する**
   - 大規模な作業は段階的に分けて依頼すると、問題が発生しても対処しやすい
   - 各フェーズ完了後に確認してから次へ進む

2. **参照を明示する**
   - `@new_profile_nextjs` でフォルダ全体を参照
   - `past_files/index.html` など具体的なファイルを指定

3. **期待する結果を明確に**
   - "既存デザインを完全に再現"
   - "型安全に実装"
   - "レスポンシブ対応"
   など、具体的な要件を記載

4. **問題が発生したら**
   - エラーメッセージを共有
   - 期待する動作と実際の動作を説明
   - 関連ファイルを参照させる

---

**作成日**: 2025年11月14日  
**用途**: Next.js移行作業をAIに依頼する際のプロンプトテンプレート集



