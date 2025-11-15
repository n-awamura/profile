# レイアウト修正フィードバック（第5回）

作成日: 2025年11月15日

元のHTML/CSSとの視覚的な乖離を解消するための追加修正項目。

---

## 修正項目一覧

### 1. 全体の背景色

#### 1-1. 背景色が緑に寄っているので、より白に近づける
- **現状**: `bg-gradient-soft` (linear-gradient(180deg, #F8F8F6 0%, #E7EAE7 100%)) が適用されている
- **元**: `background-color: var(--white)` (#F8F8F6) のみ
- **修正**: グラデーションを削除し、単色の `#F8F8F6` にする

**参照**: `past_files/css/style.css` L29-36

```css
body {
    font-family: 'Noto Sans JP', 'Roboto', sans-serif;
    line-height: 1.5;
    color: var(--navy);
    background-color: var(--white);
    margin: 0;
    padding: 0;
}
```

元のCSSでは、body の背景色は `var(--white)` (#F8F8F6) のみで、グラデーションは使用されていない。

**修正**: `src/app/layout.tsx` の `bg-gradient-soft` を削除し、`bg-site-white` に変更する。

---

### 2. ヘッダのグローバルナビゲーション

#### 2-1. ブレーク後にヘッダとの間の margin が消失する
- **現状**: `mobile:mt-0` で上の margin が0になっている
- **元**: モバイル時は `margin-top: 0rem`
- **問題**: ヘッダとグローバルナビゲーションの間に視覚的な間隔が必要

**参照**: `past_files/css/style.css` L1000-1002

```css
.global-navigation {
    margin-top: 0rem;
}
```

元のCSSでは、モバイル時のグローバルナビゲーションの `margin-top` は `0rem` だが、ヘッダ自体の padding や height で間隔が確保されている可能性がある。

**修正**: ヘッダの高さや padding を確認し、必要に応じてグローバルナビゲーションに小さな margin を追加する。

---

### 3. About セクション

#### 3-1. 右半分と左半分の割合は 5:5
- **現状**: `grid-cols-[2fr_3fr]` で 2:3 の割合
- **元**: `.subsection1` は `grid-template-columns: 1fr 1fr` で 1:1 (5:5) の割合
- **修正**: `grid-cols-2` に変更

**参照**: `past_files/css/style.css` L475-483

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

元のCSSでは、`.subsection1` は `grid-template-columns: 1fr 1fr` で 1:1 の割合。

#### 3-2. ブレークに近づくにつれて、顔写真が円から楕円になるが、これは円を維持
- **現状**: `h-36 w-36` で固定サイズだが、親要素のグリッドが縮小すると楕円になる
- **元**: 円を維持
- **修正**: `aspect-ratio: 1 / 1` を追加し、`object-fit: cover` を維持

**参照**: `past_files/css/style.css` L504-509

```css
.profile-image img {
    width: 144px;
    height: 144px;
    border-radius: 50%;
    object-fit: cover;
}
```

元のCSSでは、`width: 144px` と `height: 144px` で固定サイズ。

**修正**: `aspect-ratio: 1 / 1` を追加し、親要素のサイズに合わせて縮小しても円を維持する。

#### 3-3. 「副業のご案内」について、上の margin が狭い
- **現状**: `mt-8` (2rem)
- **元**: より大きな margin が必要
- **修正**: `mt-12` (3rem) または `mt-16` (4rem) に変更

#### 3-4. 「副業のご案内」の背景色をプロフィール情報の会社名の部分と同じ色に
- **現状**: `bg-site-light-green` (#E7EAE7)
- **元**: タイムラインの背景色と同じ `bg-site-light-green` (#E7EAE7)
- **修正**: 現在の実装は正しい。ただし、視覚的に違う場合は色を確認

**参照**: `past_files/css/style.css` L1-8

```css
:root {
    --white: #F8F8F6;
    --green: #859A93;
    --yellow: #FDCB6E;
    --navy: #2C3E50;
    --light-green: #E7EAE7;
}
```

元のCSSでは、`--light-green` は `#E7EAE7`。

---

### 4. フッター

#### 4-1. グローバルナビゲーションと近い考え方で再現
- **現状**: `mobile:flex mobile:justify-between` で横並び
- **元**: デスクトップは10カラムグリッド（col-1 + col-1 + col-4 + col-4）、モバイルも同様
- **修正**: デスクトップと同じ10カラムグリッドを維持

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

元のCSSでは、フッターのグリッドは10カラムで、col-1 + col-1 + col-4 + col-4 = 10カラム。

**モバイル時の挙動**:

**参照**: `past_files/css/style.css` L1019-1034

```css
/* Footer copyright レスポンシブ調整 */
footer .grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.footer-copyright {
    font-size: 0.4rem;
    text-align: right;
    white-space: normal;
    word-break: break-word;
    line-height: 1.2;
    flex-shrink: 0;
    max-width: 60%;
}
```

元のCSSでは、モバイル時のフッターは `flex` レイアウトで `justify-content: space-between` を使用。

**修正**: 現在の実装に近いが、`gap` を `1rem` に戻す。

---

### 5. Blog セクション

#### 5-1. ブレーク後に、記事間の margin が一定になるようにする
- **現状**: 縦積み前の1段目と2段目の幅と、縦積み内の1記事目と2記事目の幅が違う
- **元**: モバイル時は `.blog .subsection1:first-of-type` が `gap: 4rem` で統一
- **修正**: モバイル時の記事間の margin を統一する

**参照**: `past_files/css/style.css` L918-921

```css
/* Blogの1つ目のsubsectionのみ4rem間隔 */
.blog .subsection1:first-of-type {
    gap: 4rem;
}
```

元のCSSでは、モバイル時の Blog セクションの最初の `.subsection1` は `gap: 4rem` で統一されている。

**参照**: `past_files/css/style.css` L485-488

```css
/* Blogセクションのsubsection1間隔調整 */
.blog .subsection1 + .subsection1 {
    margin-top: 4rem;
}
```

デスクトップでは、`.subsection1` 間の `margin-top` は `4rem`。

**問題**: 現在の実装では、モバイル時に縦積みになった際、記事間の margin が不均一になっている可能性がある。

**修正**: `BlogSection.tsx` で、モバイル時の記事間の margin を `space-y-16` (4rem) で統一する。

---

## 実装の優先順位

### 高優先度
1. 全体の背景色をグラデーションから単色に変更
2. About セクションの左右の割合を 5:5 に変更
3. フッターのグリッドを10カラムに維持
4. Blog セクションのモバイル時の記事間 margin を統一

### 中優先度
1. 顔写真の円を維持
2. 「副業のご案内」の上 margin を調整
3. グローバルナビゲーションのモバイル時の margin を調整

### 低優先度
1. その他の細かい調整

---

## 修正対象ファイル

1. `src/app/layout.tsx`
   - `bg-gradient-soft` を `bg-site-white` に変更

2. `src/components/GlobalNavigation.tsx`
   - モバイル時の margin を調整（必要に応じて）

3. `src/components/AboutSection.tsx`
   - `grid-cols-[2fr_3fr]` を `grid-cols-2` に変更
   - 顔写真に `aspect-ratio: 1 / 1` を追加
   - 「副業のご案内」の上 margin を調整

4. `src/components/BlogSection.tsx`
   - モバイル時の記事間 margin を統一

5. `src/components/Footer.tsx`
   - `mobile:gap-2` を `mobile:gap-4` (1rem) に変更

---

## 完了条件

- [ ] 全体の背景色が `#F8F8F6` の単色
- [ ] グローバルナビゲーションのモバイル時の margin が適切
- [ ] About セクションの左右の割合が 5:5
- [ ] 顔写真が常に円を維持
- [ ] 「副業のご案内」の上 margin が適切
- [ ] Blog セクションのモバイル時の記事間 margin が統一
- [ ] フッターのグリッドが10カラムを維持

---

## 詳細な修正内容

### 1. layout.tsx の修正

**現在のコード**:
```tsx
<body
  id="top"
  className={`${notoSans.variable} ${roboto.variable} ${barlow.variable} bg-site-light-green antialiased`}
>
  <div className="min-h-screen bg-gradient-soft">
    <Header />
    {children}
    <Footer />
  </div>
</body>
```

**修正後**:
```tsx
<body
  id="top"
  className={`${notoSans.variable} ${roboto.variable} ${barlow.variable} bg-site-white antialiased`}
>
  <div className="min-h-screen">
    <Header />
    {children}
    <Footer />
  </div>
</body>
```

`bg-gradient-soft` を削除し、`bg-site-white` を body に適用。

### 2. GlobalNavigation.tsx の修正

**現在のコード**:
```tsx
<nav
  aria-label="サイト内ナビゲーション"
  className="container mt-6 px-6 mobile:mt-0"
>
  ...
</nav>
```

**修正後**:
```tsx
<nav
  aria-label="サイト内ナビゲーション"
  className="container mt-6 px-6 mobile:mt-4"
>
  ...
</nav>
```

`mobile:mt-0` を `mobile:mt-4` (1rem) に変更し、ヘッダとの間に小さな間隔を確保。

### 3. AboutSection.tsx の修正

**現在のコード**:
```tsx
<div className="grid grid-cols-[2fr_3fr] gap-8 mobile:grid-cols-1 mobile:gap-4">
  <div className="max-w-md space-y-6">
    <div className="grid grid-cols-[2fr_3fr] items-start gap-4">
      <div className="flex items-center justify-center">
        <Image
          src="/img/me.png"
          alt="粟村倫久"
          width={144}
          height={144}
          priority
          className="h-36 w-36 rounded-full object-cover"
        />
      </div>
      ...
    </div>
  </div>
  ...
</div>
```

**修正後**:
```tsx
<div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-4">
  <div className="max-w-md space-y-6">
    <div className="grid grid-cols-[2fr_3fr] items-start gap-4">
      <div className="flex items-center justify-center">
        <Image
          src="/img/me.png"
          alt="粟村倫久"
          width={144}
          height={144}
          priority
          className="aspect-square h-36 w-36 rounded-full object-cover"
        />
      </div>
      ...
    </div>
  </div>
  ...
</div>
```

`grid-cols-[2fr_3fr]` を `grid-cols-2` に変更し、顔写真に `aspect-square` を追加。

**「副業のご案内」の修正**:

**現在のコード**:
```tsx
<div className="mt-8 rounded-lg bg-site-light-green p-4 text-sm text-site-navy">
  <p className="font-semibold text-site-navy">副業のご案内</p>
  ...
</div>
```

**修正後**:
```tsx
<div className="mt-12 rounded-lg bg-site-light-green p-4 text-sm text-site-navy">
  <p className="font-semibold text-site-navy">副業のご案内</p>
  ...
</div>
```

`mt-8` を `mt-12` (3rem) に変更。

### 4. Footer.tsx の修正

**現在のコード**:
```tsx
<div className="grid grid-cols-10 items-center gap-6 mobile:flex mobile:flex-wrap mobile:items-center mobile:justify-between mobile:gap-2">
  {NAV_LINKS.map((link) => (
    <div key={link.id} className="col-span-1">
      <Link
        href={link.href}
        className="block text-left text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
      >
        {link.label}
      </Link>
    </div>
  ))}
  <div className="col-span-4 mobile:hidden" aria-hidden="true" />
  <div className="col-span-4 text-right text-[0.5rem] text-site-green mobile:text-right mobile:text-[0.4rem] mobile:leading-tight mobile:max-w-[60%]">
    © Norihisa Awamura All rights reserved.
  </div>
</div>
```

**修正後**:
```tsx
<div className="grid grid-cols-10 items-center gap-6 mobile:flex mobile:flex-wrap mobile:items-center mobile:justify-between mobile:gap-4">
  {NAV_LINKS.map((link) => (
    <div key={link.id} className="col-span-1">
      <Link
        href={link.href}
        className="block text-left text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
      >
        {link.label}
      </Link>
    </div>
  ))}
  <div className="col-span-4 mobile:hidden" aria-hidden="true" />
  <div className="col-span-4 text-right text-[0.5rem] text-site-green mobile:text-right mobile:text-[0.4rem] mobile:leading-tight mobile:max-w-[60%]">
    © Norihisa Awamura All rights reserved.
  </div>
</div>
```

`mobile:gap-2` を `mobile:gap-4` (1rem) に変更。

### 5. BlogSection.tsx の修正

**現在のコード**:
```tsx
<section id="blog" className="mt-16">
  <h2 className="mb-6 font-body text-2xl font-light tracking-[0.03em] text-site-green">
    Blog
  </h2>

  <div className="space-y-16">
    {rows.map((row, index) => (
      <div
        key={`blog-row-${index}`}
        className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0"
      >
        {row.map((entry, columnIndex) => (
          <div
            key={entry.id}
            className={`space-y-4 ${columnIndex === 1 ? "mobile:mt-8" : ""}`}
          >
            {entry.type === "article" ? (
              <BlogCard entry={entry} />
            ) : (
              <NoteArticle entry={entry} />
            )}
          </div>
        ))}
        {row.length === 1 && <div className="hidden desktop:block" aria-hidden="true" />}
      </div>
    ))}
  </div>
</section>
```

**問題**: モバイル時に `mobile:gap-0` と `mobile:mt-8` を使用しているため、記事間の margin が不均一になっている。

**修正後**:
```tsx
<section id="blog" className="mt-16">
  <h2 className="mb-6 font-body text-2xl font-light tracking-[0.03em] text-site-green">
    Blog
  </h2>

  <div className="space-y-16">
    {rows.map((row, index) => (
      <div
        key={`blog-row-${index}`}
        className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-16"
      >
        {row.map((entry, columnIndex) => (
          <div
            key={entry.id}
            className="space-y-4"
          >
            {entry.type === "article" ? (
              <BlogCard entry={entry} />
            ) : (
              <NoteArticle entry={entry} />
            )}
          </div>
        ))}
        {row.length === 1 && <div className="hidden desktop:block" aria-hidden="true" />}
      </div>
    ))}
  </div>
</section>
```

`mobile:gap-0` を `mobile:gap-16` (4rem) に変更し、`mobile:mt-8` を削除して記事間の margin を統一。

---

**次のステップ**: このフィードバックに基づいて、各コンポーネントを修正してください。

