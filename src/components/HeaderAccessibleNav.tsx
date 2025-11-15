import Link from "next/link";

interface HeaderAccessibleNavProps {
  linkHref: string;
  linkLabel: string;
}

const SNS_LINKS = [
  { name: "X", href: "https://x.com/n_awamura" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/%E5%80%AB%E4%B9%85-%E7%B2%9F%E6%9D%91-7039b9b0",
  },
  { name: "Facebook", href: "https://www.facebook.com/norihisa.awamura" },
];

export function HeaderAccessibleNav({
  linkHref,
  linkLabel,
}: HeaderAccessibleNavProps) {
  return (
    <div className="sr-only" aria-live="off">
      <p>
        ヘッダーナビゲーション:{" "}
        <Link href={linkHref}>{linkLabel}</Link>
      </p>
      <p>
        SNSリンク:{" "}
        {SNS_LINKS.map((link, index) => (
          <span key={link.name}>
            <Link href={link.href}>{link.name}</Link>
            {index < SNS_LINKS.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}


