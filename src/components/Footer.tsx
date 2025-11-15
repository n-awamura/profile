"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/utils/constants";

export function Footer() {
  const pathname = usePathname();
  const showNavigation = pathname === "/";

  return (
    <footer className="pt-4 pb-6">
      <div className="container px-6 py-6">
        {showNavigation ? (
          <div className="grid grid-cols-10 items-center gap-6 mobile:flex mobile:w-full mobile:items-center mobile:justify-between mobile:gap-4">
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-6 mobile:flex mobile:gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="text-left text-xs font-normal tracking-[0.03em] text-site-green transition hover:text-site-navy"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-span-4 mobile:hidden" aria-hidden="true" />
            <div className="col-span-4 text-right text-[0.5rem] text-site-green mobile:text-[0.4rem] mobile:leading-tight mobile:whitespace-nowrap">
              © Norihisa Awamura All rights reserved.
            </div>
          </div>
        ) : (
          <div className="text-right text-[0.5rem] text-site-green mobile:text-[0.4rem]">
            © Norihisa Awamura All rights reserved.
          </div>
        )}
      </div>
    </footer>
  );
}

