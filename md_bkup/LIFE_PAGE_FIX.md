# Life.htmlページ修正分析レポート

## 📋 概要
オリジナルlife.htmlとNext.js実装のlife/page.tsxにおける表示の問題を分析し、修正点を提示します。

---

## 🔍 問題点の詳細分析

### 問題1: 全セクション - ブレーク後に画像が大きくなる

#### オリジナルHTML（life.html）
```html
<!-- 例：Musicセクション -->
<img src="img/jtnc.png" 
     alt="Jazz the New Chapterの書影" 
     style="width: 50%; max-width: 50%; height: auto; margin: 0 0 1rem 0;">
```

**ポイント：** デスクトップでもモバイルでも**常に50%の幅**を維持

#### Next.js実装（LifeSection.tsx）
```tsx
<div className="relative w-1/2 overflow-hidden rounded-lg bg-site-light-green mobile:w-full">
  <Image
    src={image.src}
    alt={image.alt}
    width={800}
    height={600}
    className="h-auto w-full object-cover"
  />
</div>
```

**問題点：**
- デスクトップ: `w-1/2` (50%) ✅ 正しい
- モバイル: `mobile:w-full` (100%) ❌ 大きすぎる
- オリジナルはモバイルでも50%を維持すべき

---

### 問題2: Taiwanセクション - 象の画像の表示

#### オリジナルHTML構造
```html
<div class="right-content">
  <div class="blog-article-set">
    <!-- Note embed 1 -->
    <iframe class="note-embed" src="..." height="210"></iframe>
    
    <!-- Note embed 2 -->
    <iframe class="note-embed" src="..." height="210"></iframe>
    
    <!-- 象のアイコン -->
    <img src="img/greeting.svg" 
         alt="象のアイコン" 
         style="width: 50%; max-width: 50%; height: auto; margin: 0;">
  </div>
</div>
```

**重要な構造：**
1. `.blog-article-set`内に3つの要素（Note×2 + 象アイコン）
2. 象のアイコンは`margin: 0`（上下の余白なし）
3. `width: 50%`（親要素の50%）

#### オリジナルCSS（past_style.css）
```css
/* Blog記事セット */
.blog-article-set {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    height: fit-content;
    align-items: flex-start;
}

/* Taiwan セクション専用 - gapを強制的に小さく */
.right-content .blog-article-set {
    gap: 0.1rem !important;
}
```

**ポイント：**
- Taiwanセクションの`.blog-article-set`は`gap: 0.1rem`（非常に小さい）
- 象のアイコンは`width: 50%`で`.blog-article-set`の半分の幅

#### Next.js実装（LifeSection.tsx）

現在の実装では：
```tsx
{section.noteEmbeds?.map((note) => (
  <div key={`${section.id}-${note.noteId}`} className="overflow-hidden">
    <NoteEmbed ... />
  </div>
))}

{(section.image || section.secondaryImage) && (
  <>
    {section.image && <ImageFigure image={section.image} />}
    {section.secondaryImage && <ImageFigure image={section.secondaryImage} />}
  </>
)}
```

**問題点：**
1. NoteEmbedsとImageが別々のレンダリングロジック
2. オリジナルの`.blog-article-set`構造が再現されていない
3. 間隔が`space-y-6`（1.5rem）で広すぎる
4. 象のアイコンのサイズが`w-1/2 mobile:w-full`で、モバイル時に大きくなる

---

### 問題3: 結び文とfooterのmargin

#### オリジナルHTML
```html
<!-- 結び文 -->
<p class="activity-description" style="margin-top: 6rem; margin-bottom: 4rem;">
  そのほか、飲食、写真、映画など。いったん、この辺にしておきます。
</p>
```

**CSS確認：**
```css
.activity-description {
    font-size: 0.9rem;
    color: var(--navy);
    margin: 0 0 1rem 0;  /* デフォルト */
    line-height: 1.5;
}
```

インラインスタイルで：
- `margin-top: 6rem`
- `margin-bottom: 4rem`

#### Next.js実装（page.tsx）
```tsx
<p className="mt-24 mb-16 text-sm leading-relaxed text-site-navy/80">
  {lifeOutro}
</p>
```

**Tailwindクラス：**
- `mt-24` = 6rem ✅ 正しい
- `mb-16` = 4rem ✅ 正しい

**しかし、問題がある可能性：**
1. 親要素の`space-y-16`（4rem）が干渉している可能性
2. ページ全体の構造が違う（オリジナルは`<main>`内に直接配置、Next.jsは`flex flex-col gap-12`）

#### オリジナルのmain構造
```html
<main>
  <section class="about">
    <p>導入文</p>
    <!-- セクション群 -->
    <p>結び文</p>
  </section>
</main>
```

**ポイント：** すべてが1つの`<section class="about">`内

#### Next.js構造
```tsx
<main className="container flex w-full flex-col gap-12 py-16">
  <p>導入文</p>
  <div className="space-y-16">
    {lifeSections.map(...)}
  </div>
  <p>結び文</p>
</main>
```

**問題点：**
- `flex-col gap-12`により、導入文・セクション群・結び文の間に一律3rem（gap-12）の間隔
- 結び文の`mt-24`と`gap-12`が重複している可能性

---

## ✅ 修正方針

### 修正1: 画像のモバイル時サイズを50%に固定

**ファイル:** `src/components/LifeSection.tsx`

**修正箇所:** `ImageFigure`コンポーネント

```tsx
// 修正前
<div className="relative w-1/2 overflow-hidden rounded-lg bg-site-light-green mobile:w-full">

// 修正後
<div className="relative w-1/2 overflow-hidden rounded-lg bg-site-light-green">
```

**変更内容：**
- `mobile:w-full`を削除
- デスクトップ・モバイル両方で`w-1/2`（50%）を維持

---

### 修正2: Taiwanセクションの象アイコン表示の修正

**方法A: 条件分岐でTaiwanセクションのみ特別な構造にする（推奨）**

**ファイル:** `src/components/LifeSection.tsx`

```tsx
export function LifeSection({ section }: LifeSectionProps) {
  return (
    <section className="space-y-6">
      <h3 className="font-body text-2xl font-light tracking-[0.03em] text-site-green">
        {section.title}
      </h3>
      <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0">
        <div className="space-y-4 text-sm leading-relaxed text-site-navy mobile:mb-8">
          {section.descriptions.map((desc) => (
            <p key={desc} dangerouslySetInnerHTML={{ __html: desc }} />
          ))}
        </div>
        <div className={section.id === "taiwan" ? "flex flex-col gap-[0.1rem]" : "space-y-6"}>
          {section.noteEmbeds?.map((note) => (
            <div key={`${section.id}-${note.noteId}`} className="overflow-hidden">
              <NoteEmbed
                noteId={note.noteId}
                height={note.height}
                title={`${section.title} note`}
              />
            </div>
          ))}

          {(section.image || section.secondaryImage) && (
            <>
              {section.image && <ImageFigure image={section.image} />}
              {section.secondaryImage && <ImageFigure image={section.secondaryImage} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ImageFigure({
  image,
}: {
  image: NonNullable<LifeSectionType["image"]>;
}) {
  return (
    <figure className="space-y-2">
      <div className="relative w-1/2 overflow-hidden rounded-lg bg-site-light-green">
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
        />
      </div>
      {image.caption && (
        <figcaption
          className="life-accent"
          dangerouslySetInnerHTML={{ __html: image.caption }}
        />
      )}
    </figure>
  );
}
```

**変更内容：**
1. Taiwanセクションのみ`gap-[0.1rem]`を適用（オリジナルの0.1rem間隔を再現）
2. 他のセクションは`space-y-6`を維持
3. 画像の`mobile:w-full`を削除

**方法B: すべてのセクションの間隔を調整する**

もし全体的に間隔を狭めたい場合：
```tsx
<div className="space-y-2">  {/* space-y-6から変更 */}
```

---

### 修正3: 結び文のmarginを正確に再現

**ファイル:** `src/app/life/page.tsx`

**修正前：**
```tsx
<main className="container flex w-full flex-col gap-12 py-16">
  <p className="mt-12 text-sm leading-relaxed text-site-navy/80">{lifeIntro}</p>
  <div className="space-y-16">
    {lifeSections.map((section) => (
      <LifeSection key={section.id} section={section} />
    ))}
  </div>
  <p className="mt-24 mb-16 text-sm leading-relaxed text-site-navy/80">
    {lifeOutro}
  </p>
</main>
```

**問題点：**
- `flex-col gap-12`と`mt-24`が干渉
- 実際のmargin-topは`gap-12`（3rem）と`mt-24`（6rem）の扱いが不明確

**修正後：**
```tsx
<main className="container w-full py-16">
  <div className="space-y-0">
    <p className="mt-12 mb-16 text-sm leading-relaxed text-site-navy/80">
      {lifeIntro}
    </p>
    <div className="space-y-16">
      {lifeSections.map((section) => (
        <LifeSection key={section.id} section={section} />
      ))}
    </div>
    <p className="mt-24 mb-16 text-sm leading-relaxed text-site-navy/80">
      {lifeOutro}
    </p>
  </div>
</main>
```

**変更内容：**
1. `flex flex-col gap-12`を削除
2. `space-y-0`で明示的にgapを制御
3. 各要素のmarginを明示的に指定
   - 導入文: `mt-12 mb-16`（3rem, 4rem）
   - セクション間: `space-y-16`（4rem）
   - 結び文: `mt-24 mb-16`（6rem, 4rem）

**オリジナルとの対応：**

| 要素 | オリジナル | Next.js修正後 |
|------|-----------|--------------|
| 導入文の上部 | `margin-top: 3rem` | `mt-12` (3rem) ✅ |
| 導入文の下部 | `margin-bottom: 4rem` | `mb-16` (4rem) ✅ |
| セクション間 | `margin-top: 4rem` | `space-y-16` (4rem) ✅ |
| 結び文の上部 | `margin-top: 6rem` | `mt-24` (6rem) ✅ |
| 結び文の下部 | `margin-bottom: 4rem` | `mb-16` (4rem) ✅ |

---

## 📝 実装の完全版コード

### LifeSection.tsx（修正版）

```tsx
import Image from "next/image";
import { NoteEmbed } from "@/components/NoteEmbed";
import type { LifeSection as LifeSectionType } from "@/types";

interface LifeSectionProps {
  section: LifeSectionType;
}

export function LifeSection({ section }: LifeSectionProps) {
  return (
    <section className="space-y-6">
      <h3 className="font-body text-2xl font-light tracking-[0.03em] text-site-green">
        {section.title}
      </h3>
      <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0">
        <div className="space-y-4 text-sm leading-relaxed text-site-navy mobile:mb-8">
          {section.descriptions.map((desc) => (
            <p key={desc} dangerouslySetInnerHTML={{ __html: desc }} />
          ))}
        </div>
        {/* Taiwanセクションのみ特別な間隔 */}
        <div className={section.id === "taiwan" ? "flex flex-col gap-[0.1rem]" : "space-y-6"}>
          {section.noteEmbeds?.map((note) => (
            <div key={`${section.id}-${note.noteId}`} className="overflow-hidden">
              <NoteEmbed
                noteId={note.noteId}
                height={note.height}
                title={`${section.title} note`}
              />
            </div>
          ))}

          {(section.image || section.secondaryImage) && (
            <>
              {section.image && <ImageFigure image={section.image} />}
              {section.secondaryImage && <ImageFigure image={section.secondaryImage} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ImageFigure({
  image,
}: {
  image: NonNullable<LifeSectionType["image"]>;
}) {
  return (
    <figure className="space-y-2">
      {/* mobile:w-fullを削除してモバイルでも50%を維持 */}
      <div className="relative w-1/2 overflow-hidden rounded-lg bg-site-light-green">
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
        />
      </div>
      {image.caption && (
        <figcaption
          className="life-accent"
          dangerouslySetInnerHTML={{ __html: image.caption }}
        />
      )}
    </figure>
  );
}
```

### page.tsx（修正版）

```tsx
import type { Metadata } from "next";
import { LifeSection } from "@/components/LifeSection";
import { lifeIntro, lifeOutro, lifeSections } from "@/data/life";
import { ToTop } from "@/components/ToTop";

export const metadata: Metadata = {
  title: "Side B | Norihisa Awamura",
  description: "Norihisa Awamuraの趣味や個人的な活動の紹介ページ。",
};

export default function LifePage() {
  return (
    <>
      <main className="container w-full py-16">
        <div className="space-y-0">
          <p className="mt-12 mb-16 text-sm leading-relaxed text-site-navy/80">
            {lifeIntro}
          </p>
          <div className="space-y-16">
            {lifeSections.map((section) => (
              <LifeSection key={section.id} section={section} />
            ))}
          </div>
          <p className="mt-24 mb-16 text-sm leading-relaxed text-site-navy/80">
            {lifeOutro}
          </p>
        </div>
      </main>
      <ToTop />
    </>
  );
}
```

---

## 🎯 修正のまとめ

### LifeSection.tsx

| 修正箇所 | 修正前 | 修正後 | 理由 |
|---------|--------|--------|------|
| 右側コンテナ | `space-y-6` | `taiwan`セクションのみ`gap-[0.1rem]` | Taiwanセクションの象アイコンの間隔を再現 |
| 画像div | `w-1/2 mobile:w-full` | `w-1/2` | モバイルでも50%幅を維持 |

### page.tsx

| 修正箇所 | 修正前 | 修正後 | 理由 |
|---------|--------|--------|------|
| main | `flex flex-col gap-12` | 削除 | flexのgapとmarginの干渉を防ぐ |
| コンテナdiv | なし | `space-y-0`を追加 | 明示的なスペース制御 |
| 導入文 | `mt-12` | `mt-12 mb-16` | オリジナルのmarginを再現 |

---

## 🚀 実装手順

1. **LifeSection.tsxを修正**
   - Taiwanセクション用の条件分岐を追加
   - `mobile:w-full`を削除

2. **page.tsxを修正**
   - `flex flex-col gap-12`を削除
   - `space-y-0`を追加
   - 導入文に`mb-16`を追加

3. **ブラウザで確認**
   - デスクトップ表示
   - モバイル表示（≤800px）
   - 特にTaiwanセクションの象アイコンの位置と間隔
   - 結び文とfooterの間隔

---

**作成日**: 2025年11月15日  
**分析対象**: past_files/life.html, src/app/life/page.tsx, src/components/LifeSection.tsx

