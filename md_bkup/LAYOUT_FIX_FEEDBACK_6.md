# レイアウト修正フィードバック（第6回）

作成日: 2025年11月15日

元のHTML/CSSとの視覚的な乖離を解消するための最終修正項目。グローバルナビゲーションとフッターのモバイル時の挙動を完全に再現する。

---

## 修正項目一覧

### 1. グローバルナビゲーション

#### 1-1. ブレーク後に右揃えになってしまう
- **現状**: モバイル時に右揃えになっている
- **元**: モバイル時も10カラムグリッドを維持し、col-8（空）+ col-1（About）+ col-1（Blog）の配置
- **修正**: モバイル時も10カラムグリッドを維持し、左揃えにする

**参照**: `past_files/css/style.css` L1000-1002

```css
.global-navigation {
    margin-top: 0rem;
}
```

元のCSSでは、モバイル時のグローバルナビゲーションに特別な配置指定はない。つまり、デスクトップと同じ10カラムグリッドを維持する。

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

元のHTMLでは、10カラムグリッドで col-8 + col-1 + col-1 = 10カラム。モバイル時もこの構造を維持する。

**問題**: 現在の実装では、モバイル時に `col-span-6` と `col-span-2` を使用しているため、右揃えになっている可能性がある。

**修正**: モバイル時も `col-span-8` と `col-span-1` を維持する。

---

### 2. フッター

#### 2-1. ブレーク後に左揃えになってしまう
- **現状**: モバイル時に左揃えになっている
- **元**: モバイル時は `flex` レイアウトで `justify-content: space-between` を使用
- **修正**: `justify-content: space-between` を維持

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

元のCSSでは、モバイル時のフッターは `flex` レイアウトで `justify-content: space-between` を使用。About と Blog は左側に、Copyright は右側に配置される。

**参照**: `past_files/index.html` L286-297

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

元のHTMLでは、デスクトップは10カラムグリッド（col-1 + col-1 + col-4 + col-4）。

**問題**: 現在の実装では、モバイル時に About と Blog が左側に、Copyright が右側に配置されているはずだが、視覚的に左揃えになっている可能性がある。

**修正**: `justify-content: space-between` を維持し、About と Blog をグループ化する。

#### 2-2. Copyright が改行されてしまう
- **現状**: Copyright が改行されている
- **元**: `white-space: nowrap` で改行を防ぐ（デスクトップ）、`white-space: normal` で改行を許可（モバイル）
- **修正**: モバイル時も `white-space: nowrap` を維持

**参照**: `past_files/css/style.css` L1081-1087

```css
.footer-copyright {
    font-size: 0.5rem;
    color: var(--green);
    text-align: right;
    margin: 0;
    white-space: nowrap;
}
```

デスクトップでは `white-space: nowrap` で改行を防ぐ。

**参照**: `past_files/css/style.css` L1026-1034

```css
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

モバイル時は `white-space: normal` で改行を許可しているが、`max-width: 60%` で幅を制限している。

**問題**: 現在の実装では、モバイル時に `white-space: normal` が適用されているため、Copyright が改行されている可能性がある。

**修正**: モバイル時も `white-space: nowrap` を維持するか、`max-width` を調整して改行を防ぐ。

---

## 実装の優先順位

### 高優先度
1. グローバルナビゲーションのモバイル時の配置を10カラムグリッドに統一
2. フッターのモバイル時の配置を `justify-content: space-between` に統一
3. Copyright の改行を防ぐ

### 中優先度
1. その他の細かい調整

---

## 修正対象ファイル

1. `src/components/GlobalNavigation.tsx`
   - モバイル時の `col-span-6` と `col-span-2` を `col-span-8` と `col-span-1` に変更

2. `src/components/Footer.tsx`
   - モバイル時の About と Blog をグループ化し、`justify-content: space-between` を維持
   - Copyright の `white-space: nowrap` を維持

---

## 完了条件

- [ ] グローバルナビゲーションのモバイル時の配置が10カラムグリッドで左揃え
- [ ] フッターのモバイル時の配置が `justify-content: space-between`
- [ ] Copyright が改行されない

---

## 詳細な修正内容

### 1. GlobalNavigation.tsx の修正

**現在のコード**:
```tsx
<nav
  aria-label="サイト内ナビゲーション"
  className="container mt-6 px-6 mobile:mt-4"
>
  <div className="grid grid-cols-10 gap-6">
    <div className="col-span-8 mobile:col-span-6" aria-hidden="true" />
    {NAV_LINKS.map((link) => (
      <div key={link.id} className="col-span-1 mobile:col-span-2">
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

**問題**: モバイル時に `col-span-6` と `col-span-2` を使用しているため、右揃えになっている。

**修正後**:
```tsx
<nav
  aria-label="サイト内ナビゲーション"
  className="container mt-6 px-6 mobile:mt-4"
>
  <div className="grid grid-cols-10 gap-6">
    <div className="col-span-8" aria-hidden="true" />
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

モバイル時も `col-span-8` と `col-span-1` を維持し、10カラムグリッドを維持する。

### 2. Footer.tsx の修正

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

**問題**: 
1. モバイル時に About と Blog が個別に配置されているため、Copyright との間に大きな空間ができている可能性がある
2. Copyright の `max-width: 60%` により改行されている可能性がある

**修正後**:
```tsx
<footer className="pt-4 pb-6">
  <div className="container px-6 py-6">
    {showNavigation ? (
      <div className="grid grid-cols-10 items-center gap-6 mobile:flex mobile:items-center mobile:justify-between mobile:gap-4">
        <div className="col-span-2 mobile:flex mobile:gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="block text-left text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="col-span-4 mobile:hidden" aria-hidden="true" />
        <div className="col-span-4 text-right text-[0.5rem] text-site-green mobile:text-right mobile:text-[0.4rem] mobile:leading-tight mobile:whitespace-nowrap">
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

**変更点**:
1. About と Blog を `col-span-2` の div でグループ化し、モバイル時に `flex` で横並びにする
2. Copyright に `mobile:whitespace-nowrap` を追加し、改行を防ぐ
3. `mobile:max-w-[60%]` を削除

---

**次のステップ**: このフィードバックに基づいて、各コンポーネントを修正してください。

