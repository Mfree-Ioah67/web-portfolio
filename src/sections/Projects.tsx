import Entry from "@/components/Entry";
import Section from "@/components/Section";
import { projects } from "@/content/data";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      {projects.map((p) => (
        <Entry key={p.title} title={p.title} meta={p.period} sub={p.role}>
          <p>{p.description}</p>
          <div className="tags">
            {p.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="entry__links">
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </Entry>
      ))}
    </Section>
  );
}
