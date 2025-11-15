"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/utils/constants";

export function Header() {
  const pathname = usePathname();
  const isLifePage = pathname?.startsWith("/life");
  const sideLinkLabel = isLifePage ? "to Side A" : "to Side B";
  const sideLinkHref = isLifePage ? "/" : "/life";

  return (
    <header className="container flex h-24 w-full items-center bg-site-white px-6">
      <Link href="/" className="flex h-24 w-24 items-center justify-center">
        <Image
          src="/img/logo.svg"
          alt="Norihisa Awamura ロゴ"
          width={96}
          height={96}
          priority
          className="h-24 w-24 object-contain"
        />
      </Link>

      <div className="ml-auto flex h-full flex-col items-end justify-between py-1">
        <Link
          href={sideLinkHref}
          className="inline-flex items-center justify-center rounded-md border border-site-green px-2 py-0.5 text-xs font-normal tracking-[0.03em] text-site-green transition hover:no-underline"
        >
          {sideLinkLabel}
        </Link>

        <nav aria-label="ソーシャルリンク" className="flex items-center gap-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-5 w-5 items-center justify-center"
            >
              <Image
                src={link.icon}
                alt={link.name}
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
            </a>
          ))}
        </nav>
      </div>

    </header>
  );
}

