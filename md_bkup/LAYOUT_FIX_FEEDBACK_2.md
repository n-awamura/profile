# レイアウト修正フィードバック（第2回）

作成日: 2025年11月15日

元のHTML/CSSとの視覚的な乖離を解消するための追加修正項目。

---

## 修正項目一覧

### 1. ヘッダー

#### 1-1. "to Side B" のフォントウェイト
- **現状**: `font-normal` (400)
- **元**: フォントウェイトの指定なし（デフォルト）
- **修正**: 元のCSSを確認すると、特にウェイト指定がないため、ブラウザデフォルトの400が適用されるはず。しかし視覚的に違う場合、`font-light` (300) を試す

**参照**: `past_files/css/style.css` L104-108

```css
.side-b-link {
    font-size: 0.75rem;
    color: var(--green);
    letter-spacing: 0.03em;
}
```

元のCSSには `font-weight` の指定がない。Noto Sans JP のデフォルトウェイトを確認する必要がある。

#### 1-2. ヘッダー直下の About, Blog の縦位置とブレーク後の挙動
- **現状**: `mt-6` (1.5rem) + `py-5`
- **元**: `margin: 1.5rem 0 0 0` (上のみ1.5rem)
- **修正**: padding を削除し、margin のみにする

**参照**: `past_files/css/style.css` L136-154

```css
.global-navigation {
    background-color: var(--white);
    margin: 1.5rem 0 0 0;
    padding: 0;
}
```

元のCSSでは padding は 0。現在の `py-5` を削除する必要がある。

---

### 2. グリーティング

#### 2-1. "Hello..." のフォントと大文字
- **現状**: 全部大文字になっている
- **元**: "Hello, I am Norihisa Awamura." （通常の大文字小文字混在）
- **修正**: `uppercase` クラスを削除

**参照**: `past_files/index.html` L65

```html
<h1 class="greeting-text">Hello, I am Norihisa <span class="awa-highlight">Awa</span>mura.</h1>
```

元のHTMLでは通常の大文字小文字が使われている。CSSにも `text-transform: uppercase` の指定はない。

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

### 3. About のプロフィール

#### 3-1. フォントウェイト
- **現状**: `font-light` (300)
- **元**: `font-weight: 300` （日本語名）、指定なし（英語名）
- **修正**: 元のCSSを確認

**参照**: `past_files/css/style.css` L523-531

```css
.profile-name-section .japanese-name {
    font-size: 1.25rem;
    font-weight: 300;
}

.profile-name-section .english-name {
    font-size: 1rem;
    font-weight: 300;
}
```

日本語名も英語名も `font-weight: 300`。現在の実装を確認する必要がある。

#### 3-2. "Norihisa Awamura" のフォント色
- **現状**: `text-site-green`
- **元**: `text-site-green` のはずだが、視覚的に違う
- **修正**: 元のCSSを再確認

**参照**: `past_files/index.html` L80-81

```html
<span class="japanese-name">粟村 倫久</span><br>
<span class="english-name">Norihisa Awamura</span>
```

元のHTMLでは、英語名に特別なクラスは付いていない。親要素の `.profile-name-section` のスタイルが適用される。

**参照**: `past_files/css/style.css` L517-531

```css
.profile-name-section {
    color: var(--navy);
    margin: 0;
    line-height: 1.5;
}

.profile-name-section .japanese-name {
    font-size: 1.25rem;
    font-weight: 300;
}

.profile-name-section .english-name {
    font-size: 1rem;
    font-weight: 300;
}
```

英語名の色は `var(--navy)` (#2C3E50) であるべき。`text-site-green` は間違い。

#### 3-3. "上部のSNS" のフォント
- **現状**: 異なるスタイル
- **元**: グローバルリンクスタイルが適用される
- **修正**: `globals.css` のリンクスタイルを確認

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

リンクは `color: inherit` なので、親要素の色を継承する。特別な色指定は不要。

---

### 4. About のサブセクション

#### 4-1. ブレーク前のサブセクションタイトルに ">" がついている
- **現状**: ">" がない
- **元**: Material Icons の `menu-right` (`\e5cc`) が表示される（デスクトップのみ）
- **修正**: `globals.css` の `.subsection-title::after` を確認

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

現在の実装では、`subsection-title` クラスが適用されていない可能性がある。

#### 4-2. href リンクのフォント
- **現状**: 異なるスタイル
- **元**: グローバルリンクスタイル + 特定のリンクには追加スタイル
- **修正**: `globals.css` のリンクスタイルを確認し、特定のリンクには個別スタイルを適用

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

基本的にリンクは親要素の色を継承する。ただし、一部のリンク（freee会計、パロアルト研究所など）には個別のスタイルが必要かもしれない。

#### 4-3. "言語" セクションの箇条書き上揃え
- **現状**: 上揃えになっていない
- **元**: `align-items: start` で上揃え
- **修正**: 親要素に `items-start` を追加

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

元のCSSでは、`.language-list` は `flex-direction: column` で、各項目は `position: relative` + `padding-left: 1rem` + `::before` で箇条書きを実現している。上揃えは自動的に適用される。

---

### 5. フッター

#### 5-1. 背景が白い
- **現状**: `bg-site-white` (#F8F8F6)
- **元**: 背景色の指定なし（body と同じ `var(--white)` = #F8F8F6）
- **修正**: 背景色を削除するか、body と同じ色を確認

**参照**: `past_files/css/style.css` L1060-1087

```css
footer {
    padding: 1rem 0 1.5rem 0;
}
```

元のCSSでは、footer に背景色の指定がない。body の背景色 `var(--white)` (#F8F8F6) が適用される。

しかし、視覚的に「白い」と感じる場合、body の背景色と異なる可能性がある。元のHTMLを確認する必要がある。

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

body の背景色は `var(--white)` (#F8F8F6)。footer も同じ色のはず。

**問題の可能性**: 現在の実装で、footer の背景色が `bg-site-white` として明示的に設定されているため、グラデーション背景との違いが目立つ可能性がある。

**修正**: footer の背景色を削除し、親要素の背景色を継承させる。

#### 5-2. 上 margin が広すぎる
- **現状**: `mt-24` (6rem)
- **元**: footer 自体に margin の指定なし。セクション間の margin で調整
- **修正**: `mt-24` を削除または減らす

**参照**: `past_files/css/style.css` L1060-1062

```css
footer {
    padding: 1rem 0 1.5rem 0;
}
```

元のCSSでは、footer に margin の指定がない。

**参照**: `past_files/css/style.css` L782-788

```css
main section {
    margin-bottom: 3rem;
}

/* life.htmlのaboutセクションにも同じmargin-bottomを適用 */
main .about {
    margin-bottom: 3rem;
}
```

最後のセクション（Blog または About）の `margin-bottom: 3rem` が footer との間隔になる。

**修正**: footer の `mt-24` を削除し、最後のセクションの `margin-bottom` で調整する。

---

## 実装の優先順位

### 高優先度
1. グリーティングの大文字を削除（`uppercase` クラス削除）
2. "Norihisa Awamura" の色を `text-site-navy` に変更
3. サブセクションタイトルに `subsection-title` クラスを適用（Material Icons の ">" を表示）
4. フッターの背景色を削除
5. フッターの上 margin を削除または減らす

### 中優先度
1. "to Side B" のフォントウェイトを調整
2. グローバルナビゲーションの padding を削除
3. "言語" セクションの箇条書き上揃えを修正
4. リンクのグローバルスタイルを確認・適用

### 低優先度
1. プロフィールのフォントウェイトを微調整
2. "上部のSNS" のフォントスタイルを微調整

---

## 修正対象ファイル

1. `src/components/Header.tsx`
   - "to Side B" のフォントウェイト調整

2. `src/components/GlobalNavigation.tsx`
   - padding の削除（`py-5` → 削除）

3. `src/components/Greeting.tsx`
   - `uppercase` クラスの削除

4. `src/components/AboutSection.tsx`
   - "Norihisa Awamura" の色を `text-site-navy` に変更
   - サブセクションタイトルに `subsection-title` クラスを適用
   - "言語" セクションの上揃えを修正
   - リンクのスタイルを調整

5. `src/components/Footer.tsx`
   - 背景色を削除（`bg-site-white` → 削除）
   - 上 margin を削除または減らす（`mt-24` → `mt-12` または削除）

6. `src/app/globals.css`
   - リンクのグローバルスタイルを確認
   - `.subsection-title::after` が正しく適用されているか確認

---

## 完了条件

- [ ] "to Side B" のフォントウェイトが視覚的に一致
- [ ] グローバルナビゲーションの縦位置が正しい
- [ ] グリーティングが "Hello, I am Norihisa Awamura." （大文字小文字混在）
- [ ] "Norihisa Awamura" の色が `var(--navy)` (#2C3E50)
- [ ] サブセクションタイトルに ">" が表示される（デスクトップのみ）
- [ ] リンクのスタイルが元と一致
- [ ] "言語" セクションの箇条書きが上揃え
- [ ] フッターの背景色が body と同じ
- [ ] フッターの上 margin が適切

---

## 詳細な修正内容

### 1. グリーティングの修正

**現在のコード（推測）**:
```tsx
<h1 className="... uppercase ...">
  Hello, I am Norihisa <span className="text-site-yellow">Awa</span>mura.
</h1>
```

**修正後**:
```tsx
<h1 className="... （uppercaseを削除）...">
  Hello, I am Norihisa <span className="text-site-yellow">Awa</span>mura.
</h1>
```

### 2. "Norihisa Awamura" の色修正

**現在のコード（推測）**:
```tsx
<span className="text-base text-site-green">
  Norihisa Awamura
</span>
```

**修正後**:
```tsx
<span className="text-base text-site-navy">
  Norihisa Awamura
</span>
```

### 3. サブセクションタイトルの修正

**現在のコード（推測）**:
```tsx
<h3 className="text-md font-normal tracking-[0.03em] text-site-green">
  {title}
</h3>
```

**修正後**:
```tsx
<h3 className="subsection-title text-md font-normal tracking-[0.03em] text-site-green">
  {title}
</h3>
```

`globals.css` に既に `.subsection-title::after` のスタイルがあるはず。クラスを追加するだけで ">" が表示される。

### 4. "言語" セクションの上揃え修正

**現在のコード（推測）**:
```tsx
<div className="flex flex-col gap-2 text-sm">
  {[...].map((lang) => (
    <p className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:content-['•']">
      ...
    </p>
  ))}
</div>
```

**修正後**:
```tsx
<div className="flex flex-col items-start gap-2 text-sm">
  {[...].map((lang) => (
    <p className="relative pl-4 before:absolute before:left-0 before:top-0 before:content-['•']">
      ...
    </p>
  ))}
</div>
```

`items-start` を追加し、`before:top-1.5` → `before:top-0` に変更。

### 5. フッターの修正

**現在のコード（推測）**:
```tsx
<footer className="mt-24 bg-site-white">
  ...
</footer>
```

**修正後**:
```tsx
<footer className="pt-4 pb-6">
  ...
</footer>
```

`mt-24` と `bg-site-white` を削除し、padding のみにする。

---

**次のステップ**: このフィードバックに基づいて、各コンポーネントを修正してください。



