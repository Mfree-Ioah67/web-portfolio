import type { ReactNode } from "react";

interface Props {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, index, title, children }: Props) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <h2 className="section__title" id={`${id}-title`}>
          <span className="section__index">{index}.</span>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
