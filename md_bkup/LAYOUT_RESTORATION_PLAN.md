# レイアウト再現計画

## 概要

元のHTML/CSSで実現していたレイアウトとの乖離を解消し、完全に再現するための実装計画。

作成日: 2025年11月14日

---

## 元のレイアウトとの主な乖離ポイント

### 1. **コンテナ幅とグリッドシステムの違い**
- **元**: `max-width: 996px` の固定コンテナ + 10カラムグリッド（gap: 24px）
- **現状**: Tailwind のデフォルト `max-w-screen-2xl` を使用し、996px の制約がない

### 2. **ヘッダーの構造**
- **元**: 高さ96px固定、ロゴ96x96、右側にSide B/Aリンク + SNSアイコン（縦配置）
- **現状**: 異なる配置・サイズの可能性

### 3. **グローバルナビゲーション**
- **元**: 10カラムグリッドで col-8（空白）+ col-1（About）+ col-1（Blog）の配置
- **現状**: 独自の実装

### 4. **グリーティングセクション**
- **元**: 388x388の象SVG + 中央にオーバーレイテキスト（`position: absolute`）
- **元テキスト**: `font-family: 'Barlow Condensed'`, `font-size: 1.5rem`, `color: var(--green)`, "Awa"部分が `var(--yellow)`

### 5. **Aboutセクションのレイアウト**
- **元**: `.subsection1` で 2分割グリッド（`grid-template-columns: 1fr 1fr`）、gap: 2rem
- **左**: プロフィール（画像144x144円形 + テキスト）
- **右**: タイムライン（背景 `var(--light-green)`、border-radius: 8px、padding: 1.5rem）

### 6. **タイムラインのスタイル**
- **元**: 縦線 + ドット（現在は塗りつぶし、過去は白抜き）、max-width: 280px
- **フォント**: period 0.8rem、company 0.9rem

### 7. **副業案内ボックス**
- **元**: `background-color: var(--light-green)`、border-radius: 8px、padding: 1rem

### 8. **Blogセクション**
- **元**: `.subsection1` で 2分割、各記事は以下のいずれか
  - **Noteカード**: iframe埋め込み（height: 400px） + 下部に説明文
  - **外部記事カード**: 画像オーバーレイ（高さ200px）+ グラデーション + 白文字タイトル + 説明文

### 9. **Lifeページ（life.html）**
- **元**: 各セクション（Music、Taiwan、Elephant等）は `.subsection1` で 2分割
- **左**: テキスト説明（0.9rem）
- **右**: 画像 or Note埋め込み（50%幅、キャプション 0.8rem）
- **モバイル**: 縦積み、left-contentに `margin-bottom: 2rem`

### 10. **To Topボタン**
- **元**: 24x24のSVG、中央配置、ホバーで色変化（filter）

### 11. **フッター**
- **元**: 10カラムグリッド、col-1（About）+ col-1（Blog）+ col-4（空白）+ col-4（Copyright）
- **Copyright**: `font-size: 0.5rem`、右揃え

### 12. **レスポンシブ（800px以下）**
- **コンテナ**: `max-width: 450px`
- **subsection1**: 1カラムに変更、gap調整
- **プロフィール**: 縦積み
- **Taiwan等のセクション**: left-content に `margin-bottom: 2rem`
- **Blog**: gap: 4rem
- **Footer**: flexに変更、Copyrightは `font-size: 0.4rem`、`max-width: 60%`

### 13. **フォントとカラー**
- **元**: Noto Sans JP / Roboto / Barlow Condensed
- **カラー**: `--white: #F8F8F6`, `--green: #859A93`, `--yellow: #FDCB6E`, `--navy: #2C3E50`, `--light-green: #E7EAE7`
- **本文**: `color: var(--navy)`, `font-size: 0.9rem` 多用

---

## レイアウト再現計画

### **フェーズ1: グローバル設定の修正**

#### 1. `src/app/globals.css` の調整
- [ ] body のデフォルトカラーを `#2C3E50`（--navy）に変更
- [ ] フォントサイズベースを 16px（rem計算）に統一
- [ ] スムーズスクロール（`scroll-behavior: smooth`）を追加
- [ ] リンクのデフォルトスタイル設定
  - `color: inherit`
  - `text-decoration: none`
  - hover で `text-decoration: underline` + `opacity: 0.8`

#### 2. コンテナ幅の統一
- [ ] 全ページで `max-w-[996px]` + `px-6` を適用
- [ ] グリッドは `grid-cols-10 gap-6`（24px = 1.5rem）

#### 3. `tailwind.config.ts` の微調整
- [ ] `container` クラスに `max-width: 996px` を追加
- [ ] カスタムフォントサイズを追加（0.75rem、0.8rem、0.85rem、0.9rem等）
  ```typescript
  fontSize: {
    'xs': '0.75rem',      // 12px
    '2xs': '0.8rem',      // 12.8px
    'sm': '0.9rem',       // 14.4px
    'base': '1rem',       // 16px
    // ...
  }
  ```

---

### **フェーズ2: Header の完全再現**

#### 4. `src/components/Header.tsx` の修正
- [ ] 高さ `h-24`（96px）
- [ ] ロゴ: `w-24 h-24`（96x96）
- [ ] 右側レイアウト: `flex-col items-end justify-between h-full pt-2 pr-2 pb-0`
- [ ] Side B/A リンク: `text-xs text-site-green tracking-wider`
- [ ] SNSアイコン: `w-5 h-5`（20px）、`gap-2`

**参照元**: `past_files/css/style.css` L73-134

---

### **フェーズ3: GlobalNavigation の再現**

#### 5. `src/components/GlobalNavigation.tsx` の修正
- [ ] セクション全体: `mt-6`（1.5rem）、`bg-site-white`
- [ ] 10カラムグリッド: `grid-cols-10 gap-6 px-6`
- [ ] 構成: col-8（空白）+ col-1（About）+ col-1（Blog）
- [ ] リンクスタイル: `text-xs text-site-green tracking-wider`
- [ ] ホバー: `hover:text-site-navy`

**参照元**: `past_files/css/style.css` L136-154

---

### **フェーズ4: Greeting の完全再現**

#### 6. `src/components/Greeting.tsx` の修正
- [ ] 中央配置: `text-center mt-8`
- [ ] SVG画像: `w-[388px] h-[388px]`
- [ ] レスポンシブ: `mobile:w-[min(388px,80vw)] mobile:h-[min(388px,80vw)]`
- [ ] テキストオーバーレイ: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`
- [ ] フォント: `font-display font-bold text-2xl text-site-green whitespace-nowrap`
- [ ] "Awa"部分: `text-site-yellow` でハイライト

**参照元**: `past_files/css/style.css` L156-190

---

### **フェーズ5: AboutSection の2分割レイアウト再現**

#### 7. `src/components/AboutSection.tsx` の修正

**セクション全体**
- [ ] セクション: `mt-6`
- [ ] タイトル: `font-body font-thin text-[1.75rem] text-site-green tracking-wider`
- [ ] subsection1: `grid grid-cols-2 gap-8 mt-8`（2rem = gap-8）
- [ ] レスポンシブ: `mobile:grid-cols-1 mobile:gap-0`

**左側プロフィール**
- [ ] グリッドレイアウト: `grid grid-cols-[2fr_3fr] gap-4`
- [ ] プロフィール画像: `w-36 h-36 rounded-full`（144px）
- [ ] 日本語名: `text-xl font-light`
- [ ] 英語名: `text-base font-light`
- [ ] 説明文: `text-sm`（0.9rem相当）

**右側タイムライン**
- [ ] コンテナ: `bg-site-light-green rounded-lg p-6 flex justify-center`
- [ ] タイムライン本体: `max-w-[280px]`

**その他のsubsection**
- [ ] 各subsection間: `mt-16`（4rem）
- [ ] subsection-title: `text-[1.1rem] text-site-green font-normal mb-4`
- [ ] Material Icons arrow: デスクトップのみ `after:content-['\e5cc']`（要Material Icons読み込み）
- [ ] 活動説明文: `text-[0.9rem] text-site-navy leading-relaxed mb-4`

**副業案内ボックス**
- [ ] `bg-site-light-green rounded-lg p-4 mt-8`
- [ ] 段落間隔: `space-y-2`

**言語リスト**
- [ ] `flex flex-col gap-2`
- [ ] 各項目: `pl-4 before:content-['•'] before:absolute before:left-0`
- [ ] 太字: `font-semibold`

**スキルリスト**
- [ ] `list-none pl-4 space-y-2`
- [ ] 各項目: `relative pl-4 before:content-['•'] before:absolute before:left-0`

**参照元**: `past_files/css/style.css` L192-206, L474-677

---

### **フェーズ6: Timeline の詳細再現**

#### 8. `src/components/Timeline.tsx` の修正
- [ ] ドット: `w-3 h-3 border-2 border-site-green rounded-full absolute left-0 top-1`
- [ ] 塗りつぶし（現在）: `bg-site-green`
- [ ] 白抜き（過去）: `bg-site-white`
- [ ] 縦線: `absolute left-[5px] top-3 w-px h-[calc(100%+1rem)] bg-site-green`
- [ ] コンテンツ: `ml-12`（3rem）
- [ ] period: `text-[0.8rem] text-site-navy mb-1`
- [ ] company: `text-[0.9rem] text-site-navy`
- [ ] 項目間隔: `mb-8`（2rem）
- [ ] その他セクション: `mt-16 text-[0.85rem]`

**参照元**: `past_files/css/style.css` L560-653

---

### **フェーズ7: BlogSection の2分割レイアウト再現**

#### 9. `src/components/BlogSection.tsx` の修正

**セクション全体**
- [ ] セクション: `mt-16`（4rem）
- [ ] タイトル: `font-body font-thin text-[1.75rem] text-site-green tracking-wider`
- [ ] subsection1: `grid grid-cols-2 gap-8 mt-8`
- [ ] レスポンシブ: `mobile:grid-cols-1 mobile:gap-16`

**Noteカード型**
- [ ] iframe高さ: `h-[400px]`
- [ ] 説明文: `text-[0.9rem] text-site-navy leading-relaxed mt-3`
- [ ] 各記事セット: `flex flex-col gap-3`

**外部記事カード型（BlogCard.tsx）**
- [ ] カード高さ: `h-[200px]`
- [ ] border-radius: `rounded-lg`
- [ ] shadow: `shadow-md`
- [ ] オーバーレイ: `absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6`
- [ ] タイトル: `text-[0.8rem] font-medium text-white leading-tight`
- [ ] ホバー: `hover:text-site-yellow hover:underline`

**参照元**: `past_files/css/style.css` L208-461

---

### **フェーズ8: LifePage の2分割レイアウト再現**

#### 10. `src/components/LifeSection.tsx` の修正

**各セクション**
- [ ] タイトル: `text-[1.75rem] text-site-green mb-4`（border-bottomなし）
- [ ] subsection1: `grid grid-cols-2 gap-8 mt-16`
- [ ] レスポンシブ: `mobile:grid-cols-1 mobile:gap-0`

**左側**
- [ ] テキスト: `text-[0.9rem] text-site-navy leading-relaxed`
- [ ] レスポンシブ: `mobile:mb-8`

**右側**
- [ ] 画像幅: `w-1/2`（50%）
- [ ] キャプション: `text-[0.8rem] text-site-navy/80 mt-4`
- [ ] Note埋め込み高さ: `h-[210px]`
- [ ] レスポンシブ画像: `mobile:w-full`

**導入文・結び文**
- [ ] `text-[0.9rem] text-site-navy/80`
- [ ] 導入文: `mt-12 mb-8`（モバイル: `mobile:mt-12 mobile:mb-8`）
- [ ] 結び文: `mt-24 mb-16`

**参照元**: `past_files/index.html` L43-119, `past_files/css/style.css` L853-1035

---

### **フェーズ9: ToTop & Footer の再現**

#### 11. `src/components/ToTop.tsx` の修正
- [ ] コンテナ: `text-center my-8`（上2rem、下1rem）
- [ ] SVG: `w-6 h-6`（24px）
- [ ] ホバーエフェクト: CSS filter で色変化
  ```css
  .to-top-link:hover img {
    filter: brightness(0) saturate(100%) invert(59%) sepia(8%) saturate(1167%) hue-rotate(119deg) brightness(95%) contrast(89%);
  }
  ```

**参照元**: `past_files/css/style.css` L1037-1057

#### 12. `src/components/Footer.tsx` の修正
- [ ] グリッド: `grid grid-cols-10 gap-6`
- [ ] About: `col-span-1`
- [ ] Blog: `col-span-1`
- [ ] 空白: `col-span-4`
- [ ] Copyright: `col-span-4 text-[0.5rem] text-site-green text-right`
- [ ] リンクスタイル: `text-xs text-site-green tracking-wider hover:text-site-navy`
- [ ] レスポンシブ: `mobile:flex mobile:justify-between mobile:items-center`
- [ ] レスポンシブCopyright: `mobile:text-[0.4rem] mobile:max-w-[60%]`

**参照元**: `past_files/css/style.css` L1059-1087

---

### **フェーズ10: レスポンシブ（800px以下）の詳細調整**

#### 13. 各コンポーネントのレスポンシブ対応

**全体**
- [ ] コンテナ: `mobile:max-w-[450px]`

**Header**
- [ ] パディング維持

**GlobalNavigation**
- [ ] margin-top: `mobile:mt-0`

**Greeting**
- [ ] 画像サイズ: `mobile:w-[min(388px,80vw)] mobile:h-[min(388px,80vw)]`
- [ ] テキスト: サイズ維持 `text-2xl`

**AboutSection**
- [ ] subsection1: `mobile:grid-cols-1 mobile:gap-0`
- [ ] プロフィール: `mobile:flex-col mobile:text-center`
- [ ] Taiwan等左側: `mobile:mb-8`
- [ ] subsection間隔: 維持 `mt-16`
- [ ] subsection-title のアイコン: `mobile:after:hidden`

**BlogSection**
- [ ] subsection1: `mobile:grid-cols-1 mobile:gap-16`
- [ ] 左側: `mobile:mb-0`

**LifePage**
- [ ] 導入文: `mobile:mt-12 mobile:mb-8`
- [ ] 左側: `mobile:mb-8`

**Footer**
- [ ] `mobile:flex mobile:justify-between`
- [ ] Copyright: `mobile:text-[0.4rem] mobile:max-w-[60%] mobile:leading-tight`

**参照元**: `past_files/css/style.css` L853-1035

---

### **フェーズ11: 細部の調整**

#### 14. フォントサイズの統一

Tailwind のカスタム設定を追加:

```typescript
// tailwind.config.ts
fontSize: {
  'xs': '0.75rem',      // 12px
  '2xs': '0.8rem',      // 12.8px  (timeline-period等)
  'sm-plus': '0.85rem', // 13.6px  (timeline-other等)
  'sm': '0.9rem',       // 14.4px  (activity-description等)
  'base': '1rem',       // 16px
  'md': '1.1rem',       // 17.6px  (subsection-title)
  'lg': '1.25rem',      // 20px    (japanese-name)
  'xl': '1.5rem',       // 24px    (greeting-text)
  '2xl': '1.75rem',     // 28px    (about-title, blog-title)
}
```

#### 15. Spacing の統一
- [ ] 0.5rem → `gap-2`, `p-2`, `m-2`
- [ ] 1rem → `gap-4`, `p-4`, `m-4`
- [ ] 1.5rem → `gap-6`, `p-6`, `m-6`
- [ ] 2rem → `gap-8`, `p-8`, `m-8`
- [ ] 4rem → `gap-16`, `mt-16`

#### 16. Shadow と Border-radius
- [ ] `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)` → `shadow-md`
- [ ] `border-radius: 8px` → `rounded-lg`

#### 17. Material Icons の導入（オプション）
- [ ] `<link>` タグで Material Icons を読み込み
- [ ] subsection-title の `::after` で `\e5cc`（menu-right）を表示
- [ ] デスクトップのみ表示、モバイルで非表示

---

### **フェーズ12: 最終確認**

#### 18. ビジュアル比較
- [ ] デスクトップ（996px）で元のHTMLとNext.js版を並べて比較
- [ ] モバイル（450px以下）で同様に比較
- [ ] 以下の要素を重点チェック:
  - コンテナ幅
  - グリッド配置
  - フォントサイズ
  - 色
  - 余白（margin/padding）
  - border-radius
  - shadow

#### 19. インタラクション確認
- [ ] リンクのホバー効果（underline + opacity: 0.8）
- [ ] To Topボタンのスムーズスクロール
- [ ] To Topボタンのホバー色変化
- [ ] Note埋め込みの読み込み
- [ ] レスポンシブの動作（800px境界）

#### 20. パフォーマンス確認
- [ ] Lighthouse スコア測定
- [ ] 画像最適化の確認
- [ ] フォント読み込みの確認

---

## 実装の優先順位

### 高優先度（レイアウト骨格）
1. コンテナ幅（996px）
2. 2分割グリッド（subsection1）
3. ヘッダー高さ・構造（96px）
4. グリーティング（388x388 + オーバーレイテキスト）
5. タイムライン背景ボックス

### 中優先度（細部スタイル）
1. フォントサイズ統一
2. タイムラインのドット・線
3. Blogカードのオーバーレイ
4. 副業案内ボックス
5. Footer の10カラムグリッド

### 低優先度（仕上げ）
1. Material Icons（subsection-title）
2. To Topボタンの filter ホバー
3. レスポンシブの細かい margin 調整
4. リンクのホバー opacity

---

## トラブルシューティング

### コンテナ幅が効かない
- `max-w-[996px]` と `mx-auto` が両方設定されているか確認
- 親要素に `w-full` があるか確認

### グリッドが崩れる
- `grid-cols-10` と `gap-6` の設定を確認
- 子要素の `col-span-*` が正しいか確認

### フォントサイズが異なる
- Tailwind の設定を確認
- ブラウザのデフォルトフォントサイズ（16px）を確認

### レスポンシブが動作しない
- `mobile:` プレフィックスが正しく設定されているか確認
- `tailwind.config.ts` の `screens` 設定を確認

---

## 参考ファイル

- 元のHTML: `past_files/index.html`, `past_files/life.html`
- 元のCSS: `past_files/css/style.css`
- 現在の実装: `src/components/`, `src/app/`

---

## 完了条件

- [ ] デスクトップ（996px）で元のHTMLと視覚的に一致
- [ ] モバイル（450px以下）で元のHTMLと視覚的に一致
- [ ] すべてのインタラクションが正常に動作
- [ ] Lighthouse スコアが目標値を達成
- [ ] レスポンシブが800px境界で正しく切り替わる

---

**次のステップ**: このチェックリストに従って、フェーズ1から順に実装を進めてください。

