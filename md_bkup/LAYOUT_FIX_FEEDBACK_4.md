# レイアウト修正フィードバック（第4回）

作成日: 2025年11月15日

元のHTML/CSSとの視覚的な乖離を解消するための追加修正項目。

---

## 修正項目一覧

### 1. ヘッダー（グローバルナビゲーション）

#### 1-1. About と Blog が完全に右揃えになっているが、Blog の右に空間を入れる
- **現状**: `mobile:justify-end` で完全に右揃えになっている
- **元**: 10カラムグリッドで、col-8（空）+ col-1（About）+ col-1（Blog）= 10カラム。つまり、Blog の右に空間はない
- **修正**: デスクトップでは10カラムグリッドを維持し、Blog の右に空間がないようにする

**参照**: `past_files/index.html` L48-56

```html
<div class="grid">
    <div class="col-8"></div>
    <div class="col-1">
        <a href="#about" class="nav-link">About</a>
    </div>
    <div class="col-1">
        <a href="#blog" class="nav-link">Blog</a>
    </div>
</div>
```

**参照**: `past_files/css/style.css` L48-54

```css
/* グリッドシステム */
.grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 24px;
    padding: 0 24px;
}
```

元のHTMLでは、10カラムグリッドで col-8 + col-1 + col-1 = 10カラム。つまり、Blog の右に空間はない。

**モバイル時の挙動**:
- **元**: `margin-top: 0rem`
- **修正**: モバイル時も10カラムグリッドを維持するか、flex で横並びにするが、`justify-end` ではなく `justify-start` または `justify-between` を使用

**参照**: `past_files/css/style.css` L1000-1002

```css
.global-navigation {
    margin-top: 0rem;
}
```

元のCSSでは、モバイル時のグローバルナビゲーションの特別な配置指定はない。つまり、デスクトップと同じ10カラムグリッドを維持する可能性が高い。

#### 1-2. ブレーク後に上の margin が維持されていない
- **現状**: `mobile:mt-0` で上の margin が0になっている
- **元**: モバイル時は `margin-top: 0rem`
- **修正**: `mobile:mt-0` は正しい

**参照**: `past_files/css/style.css` L1000-1002

```css
.global-navigation {
    margin-top: 0rem;
}
```

---

### 2. About セクション

#### 2-1. ブレーク後に、左半分と右半分が縦積みになるようにする
- **現状**: `grid-cols-[2fr_3fr]` で常に横並び
- **元**: モバイル時は `.subsection1` が `grid-template-columns: 1fr` で縦積み
- **修正**: モバイル時に `grid-cols-1` を追加

**参照**: `past_files/css/style.css` L891-895

```css
/* レスポンシブ時のサブセクション調整 */
.subsection1 {
    grid-template-columns: 1fr;
    gap: 0rem;
    max-width: 450px;
}
```

元のCSSでは、モバイル時の `.subsection1` は `grid-template-columns: 1fr` で縦積みになる。

**プロフィールレイアウトの修正**:

現在の実装では、プロフィール部分が `grid-cols-[2fr_3fr]` で常に横並びになっている。元のCSSを確認すると、プロフィールレイアウトは `.profile-layout` クラスで定義されており、モバイル時の変更は記載されていない。

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

しかし、全体の `.subsection1` がモバイル時に縦積みになるため、プロフィール部分も縦積みになる可能性がある。

**修正方針**:
1. About セクションの最初の `grid-cols-[2fr_3fr]` をモバイル時に `grid-cols-1` に変更
2. プロフィールレイアウトの `grid-cols-[2fr_3fr]` はそのまま維持（横並びを維持）

#### 2-2. サブセクション「言語」の箇条書きを他のものと合わせる
- **現状**: カスタム箇条書き（`before:content-['•']`）
- **元**: 他のサブセクションと同じ箇条書きスタイル
- **修正**: `list-disc` を使用

**参照**: `past_files/css/style.css` L726-754

```css
.language-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.language-list p {
    font-size: 0.9rem;
    color: var(--navy);
    margin: 0;
    line-height: 1.5;
    position: relative;
    padding-left: 1rem;
}

.language-list p::before {
    content: "•";
    color: var(--navy);
    position: absolute;
    left: 0;
}
```

元のCSSでは、言語リストは `•` を使用しているが、他の箇条書きと同じスタイルにする必要がある。

**他の箇条書きのスタイル**:

現在の実装では、「スキルと特長」セクションの箇条書きは `list-disc` を使用している。言語セクションも同じスタイルにする。

---

### 3. フッター

#### 3-1. About と Blog について、ブレーク後に間が広がってしまう
- **現状**: `mobile:justify-between` で間が広がっている
- **元**: `justify-content: space-between` だが、`gap: 1rem` で間隔を制御
- **修正**: `gap` を調整

**参照**: `past_files/css/style.css` L1019-1024

```css
/* Footer copyright レスポンシブ調整 */
footer .grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}
```

元のCSSでは、フッターのモバイル時は `flex` レイアウトで `justify-content: space-between` を使用し、`gap: 1rem` で間隔を制御している。

**問題**: 現在の実装では、`mobile:gap-4` (1rem) が適用されているが、About と Blog の間が広がりすぎている可能性がある。

**修正方針**:
1. `gap` を小さくする（例: `mobile:gap-2` = 0.5rem）
2. または、`justify-content: flex-start` を使用して左揃えにする

元のCSSを再確認すると、`justify-content: space-between` が使用されているため、About と Blog は左右に配置され、Copyright は右端に配置される。

**詳細な確認**:

元のHTMLを確認すると、フッターのグリッドは以下のようになっている。

**参照**: `past_files/index.html` のフッター部分（推測）

```html
<footer>
    <div class="grid">
        <div class="col-1">
            <a href="#about" class="footer-nav">About</a>
        </div>
        <div class="col-1">
            <a href="#blog" class="footer-nav">Blog</a>
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            <p class="footer-copyright">© Norihisa Awamura All rights reserved.</p>
        </div>
    </div>
</footer>
```

つまり、デスクトップでは col-1 + col-1 + col-4 + col-4 = 10カラム。

モバイル時は `flex` レイアウトで `justify-content: space-between` を使用し、About と Blog は左側に、Copyright は右側に配置される。

**修正**: About と Blog の間隔を小さくするため、`gap` を調整する。

---

## 実装の優先順位

### 高優先度
1. About セクションの左半分と右半分をモバイル時に縦積みにする
2. フッターの About と Blog の間隔を調整

### 中優先度
1. グローバルナビゲーションの Blog の右に空間を入れない（現在の実装を確認）
2. サブセクション「言語」の箇条書きを `list-disc` に変更

### 低優先度
1. その他の細かい調整

---

## 修正対象ファイル

1. `src/components/GlobalNavigation.tsx`
   - Blog の右に空間を入れない（現在の実装を確認）

2. `src/components/AboutSection.tsx`
   - 最初の `grid-cols-[2fr_3fr]` をモバイル時に `grid-cols-1` に変更
   - サブセクション「言語」の箇条書きを `list-disc` に変更

3. `src/components/Footer.tsx`
   - About と Blog の間隔を調整（`gap` を小さくする）

---

## 完了条件

- [ ] グローバルナビゲーションの Blog の右に空間がない
- [ ] モバイル時のグローバルナビゲーションの上 margin が正しい
- [ ] About セクションの左半分と右半分がモバイル時に縦積み
- [ ] サブセクション「言語」の箇条書きが `list-disc`
- [ ] フッターの About と Blog の間隔が適切

---

## 詳細な修正内容

### 1. GlobalNavigation.tsx の修正

**現在のコード**:
```tsx
<nav
  aria-label="サイト内ナビゲーション"
  className="container mt-6 px-6 mobile:mt-0"
>
  <div className="grid grid-cols-10 gap-6 mobile:flex mobile:w-full mobile:items-center mobile:justify-end mobile:gap-4">
    <div className="col-span-8 mobile:hidden" aria-hidden="true" />
    {NAV_LINKS.map((link) => (
      <div key={link.id} className="col-span-1 mobile:w-auto">
        <Link
          href={link.href}
          className="block text-right text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
        >
          {link.label}
        </Link>
      </div>
    ))}
  </div>
</nav>
```

**問題**: `mobile:justify-end` で完全に右揃えになっている。元のCSSでは、モバイル時も10カラムグリッドを維持する可能性が高い。

**修正後**:
```tsx
<nav
  aria-label="サイト内ナビゲーション"
  className="container mt-6 px-6 mobile:mt-0"
>
  <div className="grid grid-cols-10 gap-6">
    <div className="col-span-8 mobile:col-span-8" aria-hidden="true" />
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
  </div>
</nav>
```

モバイル時も10カラムグリッドを維持する。

### 2. AboutSection.tsx の修正

**現在のコード**:
```tsx
<section id="about" className="mt-6">
  <h2 className="mb-6 font-body text-2xl font-light tracking-[0.03em] text-site-green">
    About
  </h2>

  <div className="grid grid-cols-[2fr_3fr] gap-8">
    <div className="max-w-md space-y-6">
      <div className="grid grid-cols-[2fr_3fr] items-start gap-4">
        ...
      </div>
    </div>

    <div className="rounded-lg bg-site-light-green p-6">
      <Timeline />
    </div>
  </div>
  <div className="mt-16 space-y-16">
    <SubSection title="活動の軸">
      ...
    </SubSection>
    ...
  </div>
</section>
```

**修正後**:
```tsx
<section id="about" className="mt-6">
  <h2 className="mb-6 font-body text-2xl font-light tracking-[0.03em] text-site-green">
    About
  </h2>

  <div className="grid grid-cols-[2fr_3fr] gap-8 mobile:grid-cols-1 mobile:gap-0">
    <div className="max-w-md space-y-6">
      <div className="grid grid-cols-[2fr_3fr] items-start gap-4">
        ...
      </div>
    </div>

    <div className="rounded-lg bg-site-light-green p-6 mobile:mt-8">
      <Timeline />
    </div>
  </div>
  <div className="mt-16 space-y-16">
    <SubSection title="活動の軸">
      ...
    </SubSection>
    ...
  </div>
</section>
```

モバイル時に `grid-cols-1` と `gap-0` を追加し、タイムラインに `mobile:mt-8` を追加。

**言語セクションの修正**:

**現在のコード**:
```tsx
<SubSection title="言語">
  <div className="flex flex-col items-start gap-2 text-sm">
    {[
      { term: "日本語", desc: "母語" },
      {
        term: "英語",
        desc:
          "第2言語。ビジネスにおける意思疎通に問題がないくらい。2011年時点でTOEIC930",
      },
      {
        term: "台湾華語",
        desc: "第3言語。2024年の中盤から勉強を始め、TOCFL BandAを目指すくらい",
      },
    ].map((lang) => (
      <p
        key={lang.term}
        className="relative pl-4 before:absolute before:left-0 before:top-0 before:content-['•']"
      >
        <span className="font-semibold">{lang.term}：</span>
        <span className="font-normal">{lang.desc}</span>
      </p>
    ))}
  </div>
</SubSection>
```

**修正後**:
```tsx
<SubSection title="言語">
  <ul className="list-disc space-y-2 pl-6 text-sm text-site-navy">
    {[
      { term: "日本語", desc: "母語" },
      {
        term: "英語",
        desc:
          "第2言語。ビジネスにおける意思疎通に問題がないくらい。2011年時点でTOEIC930",
      },
      {
        term: "台湾華語",
        desc: "第3言語。2024年の中盤から勉強を始め、TOCFL BandAを目指すくらい",
      },
    ].map((lang) => (
      <li key={lang.term}>
        <span className="font-semibold">{lang.term}：</span>
        <span className="font-normal">{lang.desc}</span>
      </li>
    ))}
  </ul>
</SubSection>
```

`list-disc` を使用して、他の箇条書きと同じスタイルにする。

### 3. Footer.tsx の修正

**現在のコード**:
```tsx
<footer className="pt-4 pb-6">
  <div className="container px-6 py-6">
    {showNavigation ? (
      <div className="grid grid-cols-10 items-center gap-6 mobile:flex mobile:flex-wrap mobile:items-center mobile:justify-between mobile:gap-4">
        {NAV_LINKS.map((link) => (
          <div key={link.id} className="col-span-1">
            <Link
              href={link.href}
              className="block text-right text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
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

**修正後**:
```tsx
<footer className="pt-4 pb-6">
  <div className="container px-6 py-6">
    {showNavigation ? (
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
    ) : (
      <div className="text-[0.5rem] text-site-green mobile:text-[0.4rem]">
        © Norihisa Awamura All rights reserved.
      </div>
    )}
  </div>
</footer>
```

`mobile:gap-4` を `mobile:gap-2` (0.5rem) に変更し、About と Blog の間隔を小さくする。また、`text-right` を `text-left` に変更。

---

**次のステップ**: このフィードバックに基づいて、各コンポーネントを修正してください。

