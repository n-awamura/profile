# レイアウト修正フィードバック

作成日: 2025年11月15日

元のHTML/CSSとの乖離を解消するための追加修正項目。

---

## 修正項目一覧

### 1. ヘッダー

#### 1-1. "to Side B" のフォント種類とサイズ
- **現状**: `text-2xs` (0.8rem) + `font-semibold` + `uppercase`
- **元**: `font-size: 0.75rem` (12px) + `letter-spacing: 0.03em`
- **修正**: `text-xs` (0.75rem) に変更、`tracking-wider` → `tracking-[0.03em]`

**参照**: `past_files/css/style.css` L104-108

```css
.side-b-link {
    font-size: 0.75rem;
    color: var(--green);
    letter-spacing: 0.03em;
}
```

#### 1-2. SNSアイコンの配置と距離
- **現状**: `gap-2` (0.5rem = 8px)
- **元**: `gap: 0.5rem` (8px) は同じだが、配置が異なる可能性
- **修正**: 配置を確認し、元のHTMLと同じ構造にする

**参照**: `past_files/css/style.css` L110-126

```css
.social-icons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.social-icon {
    display: block;
    width: 20px;
    height: 20px;
}
```

#### 1-3. ヘッダーの下に区切り線は不要
- **現状**: 区切り線が表示されている
- **元**: 区切り線なし
- **修正**: `border-bottom` や `border-t` を削除

#### 1-4. ヘッダー直下の "About" と "Blog" のフォント種類とサイズ
- **現状**: 異なるフォント設定
- **元**: `font-size: 0.75rem` + `letter-spacing: 0.03em` + `color: var(--green)`
- **修正**: GlobalNavigation コンポーネントのスタイルを修正

**参照**: `past_files/css/style.css` L143-150

```css
.nav-link {
    color: var(--green);
    text-decoration: none;
    font-size: 0.75rem;
    display: block;
    text-align: left;
    letter-spacing: 0.03em;
}
```

#### 1-5. グローバルナビゲーション下の区切り線も不要
- **現状**: 区切り線が表示されている
- **元**: 区切り線なし
- **修正**: `border-bottom` を削除

---

### 2. グリーティング

#### 2-1. 画像の上のフォント種類とサイズ
- **現状**: 異なるフォント設定
- **元**: `font-family: 'Barlow Condensed'` + `font-weight: 700` + `font-size: 1.5rem` (24px)
- **修正**: `font-display font-bold text-2xl` → `font-display font-bold text-[1.5rem]`

**参照**: `past_files/css/style.css` L175-186

```css
.greeting-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--green);
    margin: 0;
    white-space: nowrap;
}
```

---

### 3. プロフィール情報内

#### 3-1. "上部のSNS" のフォントと色
- **現状**: 異なる色やスタイル
- **元**: リンクは `color: inherit` + hover で `text-decoration: underline` + `opacity: 0.8`
- **修正**: グローバルリンクスタイルを適用

**参照**: `past_files/css/style.css` L10-20

```css
a {
    color: inherit;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
    opacity: 0.8;
}
```

#### 3-2. "その他（抜粋）" のフォントとスタイル
- **現状**: 異なるスタイル
- **元**: `font-size: 0.9rem` + `font-weight: 500`
- **修正**: Timeline コンポーネント内の "その他" セクションのスタイルを調整

**参照**: `past_files/css/style.css` L641-653

```css
.timeline-other-title {
    font-size: 0.9rem;
    color: var(--navy);
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.timeline-other-description {
    font-size: 0.85rem;
    color: var(--navy);
    margin: 0;
    line-height: 1.5;
}
```

---

### 4. About セクション

#### 4-1. セクションタイトルは左端のみに出ている形
- **現状**: 10カラムグリッドで col-3 と col-7 に分かれている
- **元**: タイトルは左端のみ（10カラムグリッドの col-8 は空白、col-1 が About、col-1 が Blog）
- **修正**: About セクションのタイトル表示を左端のみにする

**参照**: `past_files/index.html` L70-71

```html
<section class="about" id="about">
    <h2 class="about-title">About</h2>
```

元のHTMLでは、Aboutセクションのタイトルはグリッドを使わず、単独で表示されている。

#### 4-2. 活動の軸などのサブセクションは左と右が5:5の幅
- **現状**: 10カラムグリッドで col-3 と col-7
- **元**: `.subsection1` で `grid-template-columns: 1fr 1fr` (5:5)
- **修正**: SubSection コンポーネントのグリッドを `grid-cols-2` に変更

**参照**: `past_files/css/style.css` L474-483

```css
.subsection1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 996px;
    width: 100%;
    margin: 0 auto;
    align-items: start;
}
```

#### 4-3. 箇条書きが変。縦の中央揃えでなく、上揃えにして
- **現状**: 箇条書きが中央揃え
- **元**: `align-items: start` で上揃え
- **修正**: `items-center` → `items-start`

**参照**: `past_files/css/style.css` L474-483

```css
.subsection1 {
    ...
    align-items: start;
}
```

---

### 5. Blog セクション

#### 5-1. セクションタイトルは左端のみに出ている形
- **現状**: 10カラムグリッドで col-3 と col-7 に分かれている
- **元**: タイトルは左端のみ
- **修正**: Blog セクションのタイトル表示を左端のみにする

**参照**: `past_files/index.html` L209-210

```html
<section class="blog" id="blog">
    <h2 class="blog-title">Blog</h2>
```

元のHTMLでは、Blogセクションのタイトルもグリッドを使わず、単独で表示されている。

---

### 6. フッター

#### 6-1. 白背景になっているところなど全体的に変
- **現状**: `bg-site-white` + `border-t` などが設定されている
- **元**: 背景色は `var(--white)` (#F8F8F6) で、区切り線なし
- **修正**: 元のフッタースタイルを忠実に再現

**参照**: `past_files/css/style.css` L1060-1087

```css
footer {
    padding: 1rem 0 1.5rem 0;
}

footer .grid {
    align-items: center;
}

.footer-nav {
    color: var(--green);
    text-decoration: none;
    font-size: 0.75rem;
    display: block;
    text-align: left;
    letter-spacing: 0.03em;
}

.footer-nav:hover {
    color: var(--navy);
}

.footer-copyright {
    font-size: 0.5rem;
    color: var(--green);
    text-align: right;
    margin: 0;
    white-space: nowrap;
}
```

元のフッターは：
- 背景色: `var(--white)` (body と同じ)
- 区切り線なし
- padding: `1rem 0 1.5rem 0`
- 10カラムグリッド: col-1 (About) + col-1 (Blog) + col-4 (空白) + col-4 (Copyright)

---

## 実装の優先順位

### 高優先度
1. About セクションタイトルを左端のみに（グリッド削除）
2. Blog セクションタイトルを左端のみに（グリッド削除）
3. SubSection のグリッドを 5:5 に変更
4. フッターの背景色と区切り線を修正

### 中優先度
1. ヘッダーの "to Side B" フォントサイズ修正
2. グローバルナビゲーションのフォント修正
3. グリーティングのフォントサイズ修正
4. 箇条書きの上揃え修正

### 低優先度
1. "上部のSNS" のスタイル微調整
2. "その他（抜粋）" のスタイル微調整
3. 区切り線の削除

---

## 修正対象ファイル

1. `src/components/Header.tsx`
   - "to Side B" のフォントサイズ
   - 区切り線の削除

2. `src/components/GlobalNavigation.tsx`
   - フォントサイズと letter-spacing
   - 区切り線の削除

3. `src/components/Greeting.tsx`
   - フォントサイズを `text-[1.5rem]` に変更

4. `src/components/AboutSection.tsx`
   - セクションタイトルのグリッド削除
   - SubSection のグリッドを `grid-cols-2` に変更
   - 箇条書きの上揃え

5. `src/components/BlogSection.tsx`
   - セクションタイトルのグリッド削除

6. `src/components/Footer.tsx`
   - 背景色と区切り線の修正
   - padding の調整

7. `src/app/globals.css`
   - リンクのグローバルスタイル確認

---

## 完了条件

- [ ] ヘッダーの "to Side B" フォントが 0.75rem
- [ ] ヘッダー下の区切り線がない
- [ ] グローバルナビゲーションのフォントが 0.75rem
- [ ] グローバルナビゲーション下の区切り線がない
- [ ] グリーティングのフォントが 1.5rem
- [ ] About セクションタイトルが左端のみ
- [ ] SubSection のグリッドが 5:5
- [ ] 箇条書きが上揃え
- [ ] Blog セクションタイトルが左端のみ
- [ ] フッターの背景色が正しい
- [ ] フッターの区切り線がない
- [ ] フッターの padding が正しい

---

**次のステップ**: このフィードバックに基づいて、各コンポーネントを修正してください。



