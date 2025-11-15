# レイアウト修正フィードバック（第3回）

作成日: 2025年11月15日

元のHTML/CSSとの視覚的な乖離を解消するための追加修正項目。特にmarginの徹底的な再現を重視。

---

## 修正項目一覧

### 1. ヘッダー

#### 1-1. "to Side B", "About", "Blog" のフォントウェイトを1段階上げる
- **現状**: `font-light` (300)
- **元**: フォントウェイトの指定なし（デフォルト400）
- **修正**: `font-normal` (400) に変更

**参照**: `past_files/css/style.css` L104-108, L143-150

```css
.side-b-link {
    font-size: 0.75rem;
    color: var(--green);
    letter-spacing: 0.03em;
    /* font-weight の指定なし = 400 */
}

.nav-link {
    color: var(--green);
    text-decoration: none;
    font-size: 0.75rem;
    display: block;
    text-align: left;
    letter-spacing: 0.03em;
    /* font-weight の指定なし = 400 */
}
```

#### 1-2. ブレーク後の "About", "Blog" の挙動が左揃え縦並びになる問題
- **現状**: `mobile:grid-cols-1` で縦並びになっている
- **元**: モバイル時も横並びを維持（flex レイアウト）
- **修正**: モバイル時に `flex` レイアウトで `justify-content: space-between` を使用

**参照**: `past_files/css/style.css` L1019-1034

```css
/* Footer copyright レスポンシブ調整 */
footer .grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}
```

グローバルナビゲーションも同様に、モバイル時に flex で横並びを維持する必要がある。

#### 1-3. ヘッダーと Greeting 画像の間の margin が広すぎる
- **現状**: `mt-8` (2rem) + グローバルナビゲーションの `mt-6` (1.5rem)
- **元**: グローバルナビゲーション `margin-top: 1.5rem`、Greeting `margin-top: 2rem`
- **修正**: 現在の設定は正しいが、グローバルナビゲーションの padding が影響している可能性がある

**参照**: `past_files/css/style.css` L136-141, L157-160

```css
.global-navigation {
    background-color: var(--white);
    margin: 1.5rem 0 0 0;
    padding: 0;
}

.greeting {
    margin-top: 2rem;
    text-align: center;
}
```

モバイル時は `margin-top: 0rem` になる。

**参照**: `past_files/css/style.css` L1000-1002

```css
.global-navigation {
    margin-top: 0rem;
}
```

---

### 2. About セクション

#### 2-1. プロフィール内容とセクションタイトルの間の margin が広すぎる
- **現状**: `space-y-16` (4rem) がセクション全体に適用されている
- **元**: About タイトルと最初のコンテンツの間は `1.5rem`
- **修正**: セクションタイトルと最初のコンテンツの間を `1.5rem` に調整

**参照**: `past_files/css/style.css` L193-195

```css
.about {
    margin-top: 1.5rem;
}
```

セクション内の要素間は `space-y-16` (4rem) ではなく、より細かく制御する必要がある。

#### 2-2. ブレーク時に写真と紹介文が縦揃えになるが、横並びにしてほしい
- **現状**: `mobile:grid-cols-1` で縦並びになっている
- **元**: プロフィールレイアウトは `grid-template-columns: 2fr 3fr` で横並びを維持
- **修正**: モバイル時も `grid-template-columns: 2fr 3fr` を維持

**参照**: `past_files/css/style.css` L496-502

```css
.profile-layout {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 1rem;
    align-items: start;
    max-width: 450px;
}
```

元のCSSでは、プロフィールレイアウトのモバイル時の変更は記載されていない。つまり、モバイル時も横並びを維持する。

#### 2-3. サブセクションのブレーク前に ">" がつく設定が再現されていない
- **現状**: `subsection-title` クラスが適用されているが、">" が表示されない
- **元**: `.subsection-title::after` で Material Icons の `menu-right` (`\e5cc`) が表示される
- **修正**: `globals.css` の `.subsection-title::after` が正しく適用されているか確認

**参照**: `past_files/css/style.css` L692-711

```css
.subsection-title {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--green);
    margin: 0.15rem 0 1rem 0;
    line-height: 1.5;
    position: relative;
}

/* Material Design Icons menu-right (デスクトップのみ) */
.subsection-title::after {
    content: '\e5cc';
    font-family: 'Material Icons';
    font-size: 1.2rem;
    color: var(--green);
    margin-left: 0.5rem;
    vertical-align: middle;
}
```

モバイル時は非表示。

**参照**: `past_files/css/style.css` L979-982

```css
/* モバイル時はmenu-rightアイコンを非表示 */
.subsection-title::after {
    display: none;
}
```

**問題**: 現在の実装では、`SubSection` コンポーネントの `h3` に `subsection-title` クラスが適用されているが、Material Icons のフォントが読み込まれていない可能性がある。

**確認事項**:
1. `layout.tsx` で Material Icons のフォントが読み込まれているか
2. `globals.css` で `.subsection-title::after` が正しく定義されているか
3. デスクトップ時に ">" が表示されるか

---

### 3. Blog セクション

#### 3-1. 内容とセクションタイトルの間の margin が広すぎる
- **現状**: `space-y-16` (4rem) がセクション全体に適用されている
- **元**: Blog タイトルと最初のコンテンツの間は適切な間隔
- **修正**: セクションタイトルと最初のコンテンツの間を調整

**参照**: `past_files/css/style.css` L209-222

```css
.blog {
    margin-top: 4rem;
}

.blog-title {
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
    font-size: 1.75rem;
    color: var(--green);
    margin: 0;
    letter-spacing: 0.03em;
    border-bottom: none;
    padding-bottom: 0;
}
```

Blog セクション全体の `margin-top: 4rem` は正しい。タイトルと最初のコンテンツの間は、`.subsection1` の margin で調整される。

**参照**: `past_files/css/style.css` L485-488

```css
/* Blogセクションのsubsection1間隔調整 */
.blog .subsection1 + .subsection1 {
    margin-top: 4rem;
}
```

最初の `.subsection1` の前の margin は指定されていないため、デフォルトの間隔が適用される。

---

### 4. フッター

#### 4-1. ブレーク後の About, Blog が左揃え縦積みになる問題
- **現状**: `mobile:grid-cols-1` で縦並びになっている
- **元**: モバイル時も横並びを維持（flex レイアウト）
- **修正**: モバイル時に `flex` レイアウトで `justify-content: space-between` を使用

**参照**: `past_files/css/style.css` L1019-1034

```css
/* Footer copyright レスポンシブ調整 */
footer .grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}
```

元のCSSでは、フッターのモバイル時は `flex` レイアウトで横並びを維持する。

---

### 5. 全体

#### 5-1. margin の再現を徹底的に行なう

元のCSSから margin の設定を抽出し、Next.js コンポーネントに適用する。

**主要な margin 設定**:

1. **グローバルナビゲーション**:
   - デスクトップ: `margin: 1.5rem 0 0 0`
   - モバイル: `margin-top: 0rem`

2. **Greeting**:
   - `margin-top: 2rem`

3. **About セクション**:
   - `margin-top: 1.5rem`
   - セクション間: `margin-bottom: 3rem`

4. **Blog セクション**:
   - `margin-top: 4rem`
   - セクション間: `margin-bottom: 3rem`

5. **サブセクション1**:
   - `gap: 2rem`
   - Blog の `.subsection1 + .subsection1`: `margin-top: 4rem`

6. **フッター**:
   - `padding: 1rem 0 1.5rem 0`

7. **To Top**:
   - `margin: 2rem 0 1rem 0`

---

## 実装の優先順位

### 高優先度
1. フォントウェイトを `font-normal` (400) に変更（Header, GlobalNavigation）
2. モバイル時のグローバルナビゲーションとフッターを `flex` レイアウトに変更
3. About セクションのプロフィールレイアウトをモバイル時も横並びに維持
4. margin の徹底的な再現

### 中優先度
1. セクションタイトルとコンテンツの間の margin 調整
2. サブセクションタイトルの ">" 表示確認

### 低優先度
1. その他の細かい調整

---

## 修正対象ファイル

1. `src/components/Header.tsx`
   - "to Side B" のフォントウェイトを `font-normal` に変更

2. `src/components/GlobalNavigation.tsx`
   - "About", "Blog" のフォントウェイトを `font-normal` に変更
   - モバイル時に `flex` レイアウトで横並びを維持

3. `src/components/Greeting.tsx`
   - `mt-8` を維持（正しい）

4. `src/components/AboutSection.tsx`
   - `space-y-16` を削除し、個別に margin を設定
   - プロフィールレイアウトをモバイル時も横並びに維持
   - サブセクションタイトルの ">" 表示確認

5. `src/components/BlogSection.tsx`
   - `space-y-16` を削除し、個別に margin を設定

6. `src/components/Footer.tsx`
   - モバイル時に `flex` レイアウトで横並びを維持

7. `src/app/page.tsx`
   - セクション間の margin を調整

8. `src/app/globals.css`
   - `.subsection-title::after` が正しく適用されているか確認

---

## 完了条件

- [ ] "to Side B", "About", "Blog" のフォントウェイトが `font-normal` (400)
- [ ] モバイル時のグローバルナビゲーションが横並び
- [ ] モバイル時のフッターが横並び
- [ ] About セクションのプロフィールレイアウトがモバイル時も横並び
- [ ] サブセクションタイトルに ">" が表示される（デスクトップのみ）
- [ ] セクションタイトルとコンテンツの間の margin が正しい
- [ ] 全体の margin が元のCSSと一致

---

## 詳細な修正内容

### 1. Header.tsx の修正

**現在のコード**:
```tsx
<Link
  href={sideLinkHref}
  className="text-xs font-light tracking-[0.03em] text-site-green hover:text-site-navy"
>
  {sideLinkLabel}
</Link>
```

**修正後**:
```tsx
<Link
  href={sideLinkHref}
  className="text-xs font-normal tracking-[0.03em] text-site-green hover:text-site-navy"
>
  {sideLinkLabel}
</Link>
```

### 2. GlobalNavigation.tsx の修正

**現在のコード**:
```tsx
<nav aria-label="サイト内ナビゲーション" className="container mt-6 px-6">
  <div className="grid grid-cols-10 gap-6 mobile:grid-cols-1">
    <div className="col-span-8 mobile:hidden" aria-hidden="true" />
    {NAV_LINKS.map((link) => (
      <div key={link.id} className="col-span-1 mobile:col-span-1">
        <Link
          href={link.href}
          className="text-left text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
        >
          {link.label}
        </Link>
      </div>
    ))}
  </div>
</nav>
```

**修正後**:
```tsx
<nav aria-label="サイト内ナビゲーション" className="container mt-6 px-6 mobile:mt-0">
  <div className="grid grid-cols-10 gap-6 mobile:flex mobile:justify-end mobile:gap-4">
    <div className="col-span-8 mobile:hidden" aria-hidden="true" />
    {NAV_LINKS.map((link) => (
      <div key={link.id} className="col-span-1">
        <Link
          href={link.href}
          className="text-left text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
        >
          {link.label}
        </Link>
      </div>
    ))}
  </div>
</nav>
```

### 3. AboutSection.tsx の修正

**現在のコード**:
```tsx
<section id="about" className="mt-6 space-y-16">
  <h2 className="font-body text-2xl font-light tracking-[0.03em] text-site-green">
    About
  </h2>

  <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0">
    <div className="max-w-md space-y-6">
      <div className="grid grid-cols-[2fr_3fr] items-start gap-4 mobile:grid-cols-1">
        ...
      </div>
    </div>
    ...
  </div>

  <SubSection title="活動の軸">
    ...
  </SubSection>
  ...
</section>
```

**修正後**:
```tsx
<section id="about" className="mt-6">
  <h2 className="mb-6 font-body text-2xl font-light tracking-[0.03em] text-site-green">
    About
  </h2>

  <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0">
    <div className="max-w-md space-y-6">
      <div className="grid grid-cols-[2fr_3fr] items-start gap-4">
        ...
      </div>
    </div>
    ...
  </div>

  <div className="mt-16 space-y-16">
    <SubSection title="活動の軸">
      ...
    </SubSection>
    ...
  </div>
</section>
```

プロフィールレイアウトの `mobile:grid-cols-1` を削除し、モバイル時も横並びを維持。

### 4. BlogSection.tsx の修正

**現在のコード**:
```tsx
<section id="blog" className="mt-16 space-y-16">
  <h2 className="font-body text-2xl font-light tracking-[0.03em] text-site-green">
    Blog
  </h2>

  <div className="space-y-16">
    ...
  </div>
</section>
```

**修正後**:
```tsx
<section id="blog" className="mt-16">
  <h2 className="mb-6 font-body text-2xl font-light tracking-[0.03em] text-site-green">
    Blog
  </h2>

  <div className="space-y-16">
    ...
  </div>
</section>
```

### 5. Footer.tsx の修正

**現在のコード**:
```tsx
<footer className="pt-4 pb-6">
  <div className="container px-6 py-6">
    {showNavigation ? (
      <div className="grid grid-cols-10 gap-6 items-center mobile:grid-cols-1 mobile:gap-4">
        {NAV_LINKS.map((link) => (
          <div key={link.id} className="col-span-1 mobile:col-span-10">
            <Link
              href={link.href}
              className="text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
            >
              {link.label}
            </Link>
          </div>
        ))}
        <div className="col-span-4 mobile:hidden" aria-hidden="true" />
        <div className="col-span-4 text-right text-[0.5rem] text-site-green mobile:col-span-10 mobile:text-left mobile:text-[0.4rem] mobile:leading-tight">
          © Norihisa Awamura All rights reserved.
        </div>
      </div>
    ) : (
      <div className="text-[0.5rem] text-site-green mobile:text-[0.4rem]">
        © Norihisa Awamura All rights reserved.
      </div>
    )}
  </div>
</footer>
```

**修正後**:
```tsx
<footer className="pt-4 pb-6">
  <div className="container px-6 py-6">
    {showNavigation ? (
      <div className="grid grid-cols-10 gap-6 items-center mobile:flex mobile:justify-between mobile:gap-4">
        {NAV_LINKS.map((link) => (
          <div key={link.id} className="col-span-1">
            <Link
              href={link.href}
              className="text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
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
    ) : (
      <div className="text-[0.5rem] text-site-green mobile:text-[0.4rem]">
        © Norihisa Awamura All rights reserved.
      </div>
    )}
  </div>
</footer>
```

### 6. page.tsx の修正

**現在のコード**:
```tsx
<main className="mx-auto flex w-full max-w-screen-2xl flex-col gap-12 px-6 py-16">
  <Greeting />
  <AboutSection />
  <BlogSection />
</main>
```

**修正後**:
```tsx
<main className="container px-6">
  <Greeting />
  <AboutSection />
  <BlogSection />
</main>
```

セクション間の margin は各セクションで個別に設定する。

---

**次のステップ**: このフィードバックに基づいて、各コンポーネントを修正してください。

