import { Fragment } from "react";

interface TextWithLineBreaksProps {
  text: string;
}

export function TextWithLineBreaks({ text }: TextWithLineBreaksProps) {
  if (!text) {
    return null;
  }

  const segments = text.match(/[^。]*。|[^。]+/g) ?? [text];

  return (
    <>
      {segments.map((segment, index) => (
        <Fragment key={`${segment}-${index}`}>
          {segment}
          {index !== segments.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}


