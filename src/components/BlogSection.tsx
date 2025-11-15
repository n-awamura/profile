import { blogEntries } from "@/data/blogs";
import { NoteEmbed } from "@/components/NoteEmbed";
import type { BlogEntry } from "@/types";
import { BlogCard } from "@/components/BlogCard";
import Link from "next/link";
import { TextWithLineBreaks } from "@/components/TextWithLineBreaks";

export function BlogSection() {
  const rows: BlogEntry[][] = [];
  for (let i = 0; i < blogEntries.length; i += 2) {
    rows.push(blogEntries.slice(i, i + 2));
  }

  return (
    <section id="blog" className="mt-16">
      <h2 className="mb-6 font-body text-2xl font-light tracking-[0.03em] text-site-green">
        Blog
      </h2>

      <div className="space-y-16">
        {rows.map((row, index) => (
          <div
            key={`blog-row-${index}`}
            className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-16"
          >
        {row.map((entry) => (
          <div key={entry.id} className="space-y-4">
                {entry.type === "article" ? (
                  <BlogCard entry={entry} />
                ) : (
                  <NoteArticle entry={entry} />
                )}
              </div>
            ))}
            {row.length === 1 && <div className="hidden desktop:block" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}

function NoteArticle({ entry }: { entry: BlogEntry }) {
  return (
    <article className="flex flex-col gap-3 text-sm text-site-navy">
      <h3 className="sr-only">
        <Link href={entry.link} target="_blank" rel="noopener noreferrer">
          {entry.title}
        </Link>
      </h3>
      {entry.noteId && (
        <div>
          <NoteEmbed noteId={entry.noteId} height={entry.noteHeight} title={entry.title} />
        </div>
      )}
      <div className="space-y-2 leading-relaxed">
        {entry.description.map((text) => (
          <p key={text}>
            <TextWithLineBreaks text={text} />
          </p>
        ))}
      </div>
    </article>
  );
}

