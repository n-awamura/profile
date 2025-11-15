"use client";

import Script from "next/script";
import { NOTE_DEFAULT_HEIGHT, NOTE_EMBED_SCRIPT_SRC } from "@/utils/constants";

interface NoteEmbedProps {
  noteId: string;
  height?: number;
  title?: string;
}

export function NoteEmbed({
  noteId,
  height = NOTE_DEFAULT_HEIGHT,
  title,
}: NoteEmbedProps) {
  const iframeTitle = title ?? `note embed ${noteId}`;

  return (
    <>
      <iframe
        className="note-embed"
        src={`https://note.com/embed/notes/${noteId}`}
        style={{ padding: 0, margin: 0 }}
        height={height}
        title={iframeTitle}
        loading="lazy"
      />
      <Script src={NOTE_EMBED_SCRIPT_SRC} strategy="lazyOnload" />
    </>
  );
}



