import Image from "next/image";
import Link from "next/link";
import type { BlogEntry } from "@/types";
import { TextWithLineBreaks } from "@/components/TextWithLineBreaks";

interface BlogCardProps {
  entry: BlogEntry;
}

export function BlogCard({ entry }: BlogCardProps) {
  if (!entry.image) {
    return null;
  }

  return (
    <div className="space-y-3 text-sm text-site-navy">
      <Link
        href={entry.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-[200px] overflow-hidden rounded-lg shadow-md"
      >
        <div className="relative h-full w-full">
          <Image
            src={entry.image.src}
            alt={entry.image.alt}
            fill
            sizes="(max-width: 800px) 100vw, 600px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-2xs font-medium leading-snug text-white">{entry.title}</p>
          </div>
        </div>
      </Link>
      {entry.description.map((text) => (
        <p key={text} className="leading-relaxed">
          <TextWithLineBreaks text={text} />
        </p>
      ))}
    </div>
  );
}

