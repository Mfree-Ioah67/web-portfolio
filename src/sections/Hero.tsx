import Icon from "@/components/Icon";
import NetworkCanvas from "@/components/NetworkCanvas";
import Terminal from "@/components/Terminal";
import { highlights, site, terminalScript } from "@/content/data";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <NetworkCanvas className="hero__canvas" />

      <div className="container hero__inner">
        <div className="hero__intro">
          <p className="hero__eyebrow">{site.role}</p>
          <h1 className="hero__name" id="hero-title">
            {site.name}
          </h1>
          <p className="hero__summary">{site.summary}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={site.github} target="_blank" rel="noreferrer">
              <Icon name="github" /> GitHub
            </a>
            <a className="btn btn--ghost" href={site.linkedin} target="_blank" rel="noreferrer">
              <Icon name="linkedin" /> LinkedIn
            </a>
            <a className="btn btn--ghost" href={`mailto:${site.email}`}>
              <Icon name="mail" /> Email
            </a>
          </div>
        </div>

        <Terminal className="hero__terminal" title="htb/optimum: replay" script={terminalScript} />

        <ul className="hero__stats">
          {highlights.map((h) => (
            <li key={h.label} className="stat">
              <span className="stat__value">{h.value}</span>
              <span className="stat__label">{h.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
