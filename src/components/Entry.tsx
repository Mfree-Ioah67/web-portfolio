import type { ReactNode } from "react";

interface Props {
  title: string;
  meta?: string;
  sub?: string;
  children?: ReactNode;
}

// One dated item in a list: a lab, a project. Title left, date right,
// an optional sub-line, then whatever body the section passes in.
export default function Entry({ title, meta, sub, children }: Props) {
  return (
    <article className="entry">
      <div className="entry__head">
        <h3>{title}</h3>
        {meta && <span className="entry__meta">{meta}</span>}
      </div>
      {sub && <p className="entry__sub">{sub}</p>}
      {children}
    </article>
  );
}
