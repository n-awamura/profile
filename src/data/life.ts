import type { LifeSection } from "@/types";

export const lifeIntro =
  "気がつけば割と多趣味なのかも、と思います。主だったものの紹介です。";

export const lifeOutro =
  "そのほか、飲食、写真、映画など。いったん、この辺にしておきます。";

export const lifeSections: LifeSection[] = [
  {
    id: "music",
    title: "Music",
    descriptions: [
      "いろいろ聴きますが、とくにJTNC (Jazz the New Chapter)系と、その源流とみなされる音楽が好きです。",
    ],
    image: {
      src: "/img/jtnc.png",
      alt: "Jazz the New Chapterの書影",
      caption:
        "※画像は<a href=\"https://www.universal-music.co.jp/jazz/jazz-the-new-chapter/\" target=\"_blank\" rel=\"noopener noreferrer\">Universal Music Japanさま</a>よりお借りしています。",
    },
  },
  {
    id: "taiwan",
    title: "Taiwan",
    descriptions: [
      "電車で環島して以来すっかりハマり、ついには台湾華語まで勉強するようになりました。本サイトのアイコンのモチーフは、台北の象山から拝借しています。",
      "旅の様子はnoteに書いています。アイコンの元になった写真も中にあります。",
    ],
    noteEmbeds: [
      { noteId: "n3fa914851bad", height: 210 },
      { noteId: "n6d9ea062cce8", height: 210 },
    ],
    image: {
      src: "/img/greeting.svg",
      alt: "象のアイコン",
    },
  },
  {
    id: "elephant",
    title: "Elephant",
    descriptions: [
      "象が好きなのも、象山がアイコンになっている理由です。好きな理由はお鼻が長いからです。とくにアジア象のフォルムが好みです。",
    ],
    image: {
      src: "/img/IMG_0885.JPG",
      alt: "象の写真",
      caption:
        "※<a href=\"https://zounokuni.com/\" target=\"_blank\" rel=\"noopener noreferrer\">市原ぞうの国</a>などちょこちょこ会いに行きます。",
    },
  },
  {
    id: "euro-vintage",
    title: "Euro Vintage",
    descriptions: [
      "とある人の影響で買い始めたのがきっかけで、まあまあな量になってきました。街で着られる実用的なもののみを集めています。(なお、アメリカものもそこそこあります)",
    ],
    image: {
      src: "/img/evb.png",
      alt: "Euro Vintage Bookの書影",
      caption:
        "※画像は<a href=\"https://themmagazine.net/magazine/euro-vintage-book/\" target=\"_blank\" rel=\"noopener noreferrer\">Them magazineさま</a>よりお借りしています。",
    },
  },
  {
    id: "vibe-coding",
    title: "Vibe Coding",
    descriptions: [
      '<a href="https://en.wikipedia.org/wiki/Vibe_coding" target="_blank" rel="noopener noreferrer">Vibe Coding</a>で作りたいものを作るのにハマっています。このページもその産物です。',
      "軽く調べ物をするためのアプリや、ジムのトレーニングの記録をつけるためのアプリなど、必要ができ次第作っています。",
      "技術的知識もハンズオンで身につくので、勉強と日常の問題解決が同時にできて楽しいです。",
    ],
    image: {
      src: "/img/app.jpeg",
      alt: "Vibe Codingで作ったアプリ",
    },
  },
];



