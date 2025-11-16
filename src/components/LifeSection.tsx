import Image from "next/image";
import { NoteEmbed } from "@/components/NoteEmbed";
import type { LifeSection as LifeSectionType } from "@/types";

interface LifeSectionProps {
  section: LifeSectionType;
}

export function LifeSection({ section }: LifeSectionProps) {
  const isTaiwanSection = section.id === "taiwan";
  const rightColumnClass = isTaiwanSection
    ? "flex flex-col gap-[0.1rem]"
    : "space-y-6";

  return (
    <section className="space-y-4">
      <h3 className="font-body text-2xl font-light tracking-[0.03em] text-site-green">
        {section.title}
      </h3>
      <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0">
        <div className="space-y-4 text-sm leading-relaxed text-site-navy mobile:mb-8">
          {section.descriptions.map((desc) => (
            <p key={desc} dangerouslySetInnerHTML={{ __html: formatDescriptionText(desc) }} />
          ))}
        </div>
        <div className={rightColumnClass}>
          {section.noteEmbeds?.map((note) => (
            <div key={`${section.id}-${note.noteId}`} className="overflow-hidden">
              <NoteEmbed
                noteId={note.noteId}
                height={note.height}
                title={`${section.title} note`}
              />
            </div>
          ))}

          {(section.image || section.secondaryImage) && (
            <>
              {section.image && <ImageFigure image={section.image} />}
              {section.secondaryImage && <ImageFigure image={section.secondaryImage} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function formatDescriptionText(text: string) {
  return text.replace(/。/g, "。<br />");
}

function ImageFigure({
  image,
}: {
  image: NonNullable<LifeSectionType["image"]>;
}) {
  const isElephantIcon = image.src === "/img/greeting.svg";

  if (isElephantIcon) {
    return (
      <div className="w-1/2">
        <Image
          src={image.src}
          alt={image.alt}
          width={388}
          height={388}
          className="h-auto w-full object-contain"
        />
      </div>
    );
  }

  return (
    <figure className="space-y-2">
      <div className="relative w-1/2 overflow-hidden bg-site-light-green">
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
        />
      </div>
      {image.caption && (
        <figcaption
          className="life-accent"
          dangerouslySetInnerHTML={{ __html: image.caption }}
        />
      )}
    </figure>
  );
}

