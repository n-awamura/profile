import type { Metadata } from "next";
import { LifeSection } from "@/components/LifeSection";
import { HeaderAccessibleNav } from "@/components/HeaderAccessibleNav";
import { lifeIntro, lifeOutro, lifeSections } from "@/data/life";
import { TextWithLineBreaks } from "@/components/TextWithLineBreaks";
import { ToTop } from "@/components/ToTop";

export const metadata: Metadata = {
  title: "Side B | Norihisa Awamura",
  description: "Norihisa Awamuraの趣味や個人的な活動の紹介ページ。",
};

export default function LifePage() {
  return (
    <>
      <main className="container w-full">
        <p className="mt-12 mb-16 text-sm leading-relaxed text-site-navy/80">
          <TextWithLineBreaks text={lifeIntro} />
        </p>
        <HeaderAccessibleNav linkHref="/" linkLabel="to Side A" />
        <div className="space-y-16">
          {lifeSections.map((section) => (
            <LifeSection key={section.id} section={section} />
          ))}
        </div>
        <p className="mt-24 mb-16 text-sm leading-relaxed text-site-navy/80">
          <TextWithLineBreaks text={lifeOutro} />
        </p>
      </main>
      <ToTop />
    </>
  );
}

