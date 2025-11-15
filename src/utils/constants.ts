import type { NavLink, SocialLink } from "@/types";

export const SITE_TITLE = "Norihisa Awamura's Website";
export const SITE_DESCRIPTION =
  "プロダクトリサーチャー／ワークプレイスエスノグラファ Norihisa Awamura のポートフォリオサイト。活動やリサーチ事例、趣味を紹介しています。";

export const COLOR_PALETTE = {
  white: "#F8F8F6",
  green: "#859A93",
  yellow: "#FDCB6E",
  navy: "#2C3E50",
  lightGreen: "#E7EAE7",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "X",
    href: "https://x.com/n_awamura",
    icon: "/img/x-logo.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/%E5%80%AB%E4%B9%85-%E7%B2%9F%E6%9D%91-7039b9b0",
    icon: "/img/linkedin-logo.svg",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/norihisa.awamura",
    icon: "/img/facebook-logo.svg",
  },
];

export const NAV_LINKS: NavLink[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "blog", label: "Blog", href: "#blog" },
];

export const NOTE_EMBED_SCRIPT_SRC = "https://note.com/scripts/embed.js";
export const NOTE_DEFAULT_HEIGHT = 400;



