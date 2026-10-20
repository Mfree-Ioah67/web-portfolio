import Icon from "@/components/Icon";
import Section from "@/components/Section";
import { projects } from "@/content/data";

export default function Projects() {
  return (
    <Section id="projects" index="04" title="Projects">
      <div className="projects">
        {projects.map((p) => (
          <article key={p.title} className="card project">
            <h3 className="project__title">{p.title}</h3>
            <p className="project__meta">{p.meta}</p>
            <p className="project__desc">{p.description}</p>
            <div className="tags project__tech">
              {p.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="project__links">
              {p.links.map((l) => (
                <a key={l.url} className="text-link" href={l.url} target="_blank" rel="noreferrer">
                  {l.label} <Icon name="external" size={14} />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
