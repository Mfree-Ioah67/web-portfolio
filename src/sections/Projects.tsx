import SectionTitle from "@/components/SectionTitle";
import { projects } from "@/content/data";

const statusColor: Record<string, string> = {
  green: "#00ff41",
  yellow: "#ffcc00",
  red: "#ff2020",
};

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionTitle label="SECURITY_PROJECTS" accent="red" />
        <div className="projects__grid">
          {projects.map((p) => (
            <div key={p.id} className="project-card">
              <div className="project-card__header">
                <span className="project-card__status" style={{ color: statusColor[p.statusColor] }}>
                  <span className="dot-live" style={{ background: statusColor[p.statusColor] }} />
                  {p.status}
                </span>
                <i className={`${p.icon} project-card__icon`} />
              </div>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.description}</p>
              <div className="project-card__tech">
                {p.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
              </div>
              <div className="project-card__links">
                {p.links.map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="project-link">
                    <i className={l.icon} /> {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
