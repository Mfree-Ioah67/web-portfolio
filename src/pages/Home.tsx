import { useEffect } from "react";
import { Link } from "react-router";
import { highlights, pages, site } from "@/content/data";
import { setDirection } from "@/navigation";

export default function Home() {
  useEffect(() => {
    document.title = `${site.name} · Offensive Security`;
  }, []);

  return (
    <main id="main" className="home">
      <div className="wrap">
        <h1>{site.headline}</h1>
        <p className="home__summary">{site.summary}</p>
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

        <nav className="toc" aria-label="Sections">
          <ul>
            {pages.map((p) => (
              <li key={p.path}>
                <Link to={p.path} viewTransition onClick={() => setDirection(p.path)}>
                  <span className="toc__title">{p.title}</span>
                  <span className="toc__teaser">{p.teaser}</span>
                  <span className="toc__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
