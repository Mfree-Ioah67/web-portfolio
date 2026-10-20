import { highlights, site } from "@/content/data";

export default function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="wrap">
        <h1 id="intro-title">{site.headline}</h1>
        <p className="intro__summary">{site.summary}</p>
        <ul className="links">
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`}>Email</a>
          </li>
        </ul>
        <ul className="highlights">
          {highlights.map((h) => (
            <li key={h.value}>
              <b>{h.value}</b>
              <span>{h.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
