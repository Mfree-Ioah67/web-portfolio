import { useEffect } from "react";
import { Link } from "react-router";
import RiseText, { wordCount } from "@/components/RiseText";
import { highlights, pages, site } from "@/content/data";
import { useArrowNav } from "@/hooks/useArrowNav";
import { setDirection } from "@/navigation";

export default function Home() {
  useEffect(() => {
    document.title = `${site.name} · Offensive Security`;
  }, []);

  useArrowNav(undefined, pages[0].path);

  // The marked phrase starts covered like a redacted line, then the bar
  // is pulled away (see .redact in styles.css).
  const [before, after = ""] = site.headline.split(site.headlineMark);
  const markStart = wordCount(before);

  return (
    <main id="main" className="home">
      <div className="wrap">
        <h1 aria-label={site.headline}>
          <RiseText text={before} />
          <span className="redact">
            <RiseText text={site.headlineMark} start={markStart} />
          </span>
          <RiseText text={after} start={markStart + wordCount(site.headlineMark)} />
        </h1>
        <p className="home__summary" data-reveal>
          {site.summary}
        </p>
        <ul className="links" data-reveal>
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
            <li key={h.value} data-reveal>
              <b>{h.value}</b>
              <span>{h.text}</span>
            </li>
          ))}
        </ul>

        <nav className="toc" aria-label="Sections">
          <ul>
            {pages.map((p) => (
              <li key={p.path} data-reveal>
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
