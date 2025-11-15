import Link from "next/link";
import { NAV_LINKS } from "@/utils/constants";

export function GlobalNavigation() {
  return (
    <section className="mt-6">
      <nav aria-label="サイト内ナビゲーション">
        <div className="container px-6">
          <div className="grid grid-cols-10 gap-6 mobile:gap-0">
            <div
              className="col-span-8 mobile:hidden"
              aria-hidden="true"
            />
            {NAV_LINKS.map((link, index) => (
              <div
                key={link.id}
                className="col-span-1 mobile:col-span-5 mobile:flex mobile:justify-center"
              >
                <Link
                  href={link.href}
                  className={`block text-left text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy desktop:font-bold mobile:flex mobile:w-full mobile:items-center mobile:justify-center mobile:border mobile:border-site-green mobile:px-4 mobile:py-2 mobile:text-center ${
                    index === 0 ? "" : "mobile:border-l-0"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </section>
  );
}

