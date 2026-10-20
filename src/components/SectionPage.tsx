import { useEffect, type ReactNode } from "react";
import { Link } from "react-router";
import RiseText from "@/components/RiseText";
import { pages, site, type Page } from "@/content/data";
import { useArrowNav } from "@/hooks/useArrowNav";
import { setDirection } from "@/navigation";

interface Props {
  page: Page;
  children: ReactNode;
}

export default function SectionPage({ page, children }: Props) {
  const index = pages.indexOf(page);
  const prev = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;
  const prevPath = prev ? prev.path : "/";

  useEffect(() => {
    document.title = `${page.title} · ${site.name}`;
  }, [page]);

  useArrowNav(prevPath, next?.path);

  return (
    <main id="main" className="page">
      <div className="progress" aria-hidden="true" />
      <div className="wrap">
        <h1 className="page__title" aria-label={page.title}>
          <RiseText text={page.title} />
        </h1>
        {children}
        <nav className="pagenav" aria-label="Previous and next" data-reveal>
          <Link to={prevPath} viewTransition onClick={() => setDirection(prevPath)}>
            ← {prev ? prev.title : "Home"}
          </Link>
          <span className="pagenav__hint" aria-hidden="true">
            or use ← → keys
          </span>
          {next && (
            <Link to={next.path} viewTransition onClick={() => setDirection(next.path)}>
              {next.title} →
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
