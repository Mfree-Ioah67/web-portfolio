import { Fragment, type CSSProperties } from "react";

export function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

interface Props {
  text: string;
  /** Stagger index of the first word, to continue a sequence across segments. */
  start?: number;
}

// Each word rises out of its own clipping mask, one after another.
// Whitespace is kept as-is so the line still wraps naturally.
export default function RiseText({ text, start = 0 }: Props) {
  let i = start;
  return (
    <>
      {text.split(/(\s+)/).map((token, k) =>
        token.trim() === "" ? (
          <Fragment key={k}>{token}</Fragment>
        ) : (
          <span key={k} className="rise" aria-hidden="true">
            <span style={{ "--i": i++ } as CSSProperties}>{token}</span>
          </span>
        ),
      )}
    </>
  );
}
