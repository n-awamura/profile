import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Timeline } from "@/components/Timeline";
import { TextWithLineBreaks } from "@/components/TextWithLineBreaks";

export function AboutSection() {
  return (
    <section id="about" className="mt-6">
      <h2 className="mb-6 font-body text-2xl font-light tracking-[0.03em] text-site-green">
        About
      </h2>

      <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-6">
        <div className="max-w-md space-y-6">
          <div className="grid grid-cols-[2fr_3fr] items-start gap-4">
            <div className="flex items-center justify-center">
              <div className="relative h-36 w-36 shrink-0 mobile:h-32 mobile:w-32">
                <Image
                  src="/img/me.png"
                  alt="粟村倫久"
                  fill
                  priority
                  sizes="(max-width: 640px) 128px, 144px"
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-3 text-sm text-site-navy">
              <p className="text-lg font-light text-site-navy">
                <span className="block text-lg">粟村 倫久</span>
                <span className="text-base text-site-navy">
                  Norihisa Awamura
                </span>
              </p>
              <p>
                プロダクトリサーチャー
                <br />
                ワークプレイスエスノグラファ
              </p>
              <p>
                <span>広島出身、東京在住。</span>
                <br />
                <span>
                  ご連絡は
                  <Link href="#top" className="ml-1">
                    上部のSNS
                  </Link>
                  からお願いいたします。
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-site-light-green p-6 mobile:mt-8">
          <Timeline />
        </div>
      </div>
      <div className="mt-16 space-y-16">
        <SubSection title="活動の軸">
          <p className="text-sm">
            「できなかったことができるようになる、をつくる」
          </p>
          <p className="text-sm">
            <TextWithLineBreaks text="自分が拡張される楽しさを増やす仕事がしたいです。そのための重要な手段として生成AIがあると思っています。" />
          </p>
        </SubSection>

        <SubSection title="これまでとこれから">
          <p className="text-sm">
            <TextWithLineBreaks text="直近6年間は、デジタルプロダクトの文脈で、エスノグラフィ(活動の観察)を応用したプロダクトリサーチ(プロダクトのためのデザインリサーチ、UXリサーチ、マーケティングリサーチ)を元にした探索・企画、それらをしやすい環境作り(ResearchOps)を、多職種と協働して行なってきました。" />
          </p>
          <p className="text-sm">
            リサーチ実務については2022年12月にリリースされた{" "}
            <a
              href="https://support.freee.co.jp/hc/ja/articles/12527153459737"
              target="_blank"
              rel="noopener noreferrer"
            >
              freee会計「修正待ちリスト」
            </a>
            の企画、リサーチ環境については(現在進行形ではありますが)現職UbieでのResearchOps整備が、それぞれわかりやすい例だと思っています。
          </p>
          <p className="text-sm">
            <TextWithLineBreaks text="また、2024年末以降、リサーチプロセスやプロトタイピングにおける、Vibe Codingなどの生成AI活用を盛んに行なっています。" />
          </p>
          <p className="text-sm">
            <TextWithLineBreaks text="今後については、生成AI活用を前提とした、新しい協働の形に関心があります。プロダクトリサーチは引き続き強みだと思いますが、それに加え、Vibe Codingなどを通して自分でいろいろ作ることをしたいです。自分ごとになる領域について、「生成AIを活用し、サービス開発において一人で担当する範囲を拡大すること」、「同じく拡大された人たちとのチーミング」をしていきたいし、それができる環境に身を置き続けたいと考えています。" />
          </p>
        </SubSection>

        <SubSection title="スキルと特長">
          <p className="text-sm">
            「リサーチを通して得られた一次情報やそれに紐づく知見・考察をベースに、ステークホルダーが同じストーリーを協創・共有できるようにする」ことを得意とします。
            <br />
            <TextWithLineBreaks text="これは、「エスノグラフィを応用したプロダクトリサーチとアイデア形成」、「リサーチの教育やResearchOpsづくり」、「プロジェクトマネジメント」、「Vibe Codingなどの生成AI活用」のスキルから構成されます。" />
          </p>
          <p className="text-sm">
            <TextWithLineBreaks text="プロダクトリサーチは、以下の種別で理解しています (もちろん実践の中では重なり合うこともあります)。" />
          </p>
          <ul className="list-disc space-y-2 pl-6 text-sm text-site-navy">
            <li>
              マーケティング寄りのリサーチ。つまり、注力すべき領域(機会領域)の特定と輪郭付けを行なうリサーチ
            </li>
            <li>
              プロダクト開発寄りのリサーチ。つまり、問題やソリューションの具体化のためのリサーチ
            </li>
          </ul>
          <p className="text-sm">
            <TextWithLineBreaks text="プロダクトリサーチは、定性・定量ひと通り実戦レベルでできます。" />
            <br />
            <TextWithLineBreaks text="常に事業において実用的であることを目指して行ないます。" />
          </p>
          <p className="text-sm">
            <TextWithLineBreaks text="ツールはCursor、Figmaを使います。Cursorがある前提で、Google Apps Script(GAS)、HTML/CSS、JavaScript、および関連フレームワーク(Next.js、React+Viteなど)やデザインシステムをある程度扱えます。" />
          </p>
          <p className="text-sm">
            <TextWithLineBreaks text="ビジネスにおけるエスノグラフィ専業で食べていた時期が10年ほどある、という、少なくとも国内では珍しいであろう背景を持っています。" />
            <br />
            <span>
              エスノグラフィは、世界で初めてエスノグラフィをビジネス応用した{" "}
              <a
                href="https://www.sri.com/research/future-concepts-division/"
                target="_blank"
                rel="noopener noreferrer"
              >
                パロアルト研究所(PARC)
              </a>
              で身に着け、本流の一つを継いでいます。
            </span>
            <br />
            <TextWithLineBreaks text="パロアルト研究所は、PC、イーサネットなどの概念を世界で初めて創り、情報社会の基盤を築いたことで世界に知られています。" />
          </p>
          <p className="text-sm">
            <TextWithLineBreaks text="多様な環境やテーマでの経験があります。事業会社、クライアントワークそれぞれのクオリティの捉え方を体感的に理解しています。また、未来洞察からデジタルプロダクトまでの実務経験もあります。" />
          </p>

          <div className="mt-12 space-y-3 rounded-lg bg-site-light-green p-4 text-sm text-site-navy">
            <p className="font-semibold text-site-navy">副業のご案内</p>
            <p>
              上記の経験やスキルをベースとし、「その組織で必要十分なリサーチの形は何か」、「散逸したリサーチ結果を再活用可能にするためには」、「それらをどう生成AI駆動で行なうか」などを解決するお手伝いをする副業を、月数時間〜10時間弱程度でできます。
            </p>
            <p>条件の目安は、8,000円/1時間(税抜)です。</p>
            <p>
              もし需要がございましたら、より詳細をお話しできれば嬉しく、お気軽に
              <Link href="#top" className="ml-1">
                上部のSNS
              </Link>
              から連絡くださいませ。
            </p>
          </div>
        </SubSection>

        <SubSection title="言語">
          <ul className="list-disc space-y-2 pl-6 text-sm text-site-navy">
            {[
              { term: "日本語", desc: "母語" },
              {
                term: "英語",
                desc:
                  "第2言語。ビジネスにおける意思疎通に問題がないくらい。2011年時点でTOEIC930",
              },
              {
                term: "台湾華語",
                desc: "第3言語。2024年の中盤から勉強を始め、TOCFL BandAを目指すくらい",
              },
            ].map((lang) => (
              <li key={lang.term}>
                <span className="font-semibold">{lang.term}：</span>
                <span className="font-normal">
                  {lang.desc}
                </span>
              </li>
            ))}
          </ul>
        </SubSection>
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 items-start gap-8 mobile:grid-cols-1 mobile:gap-4">
      <div>
        <h3 className="subsection-title text-md font-normal tracking-[0.03em] text-site-green">
          {title}
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-site-navy">{children}</div>
    </div>
  );
}

