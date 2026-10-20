import { useEffect, type ReactNode } from "react";
import { Link } from "react-router";
import { pages, site, type Page } from "@/content/data";
import { setDirection } from "@/navigation";

interface Props {
  page: Page;
  children: ReactNode;
}

export default function SectionPage({ page, children }: Props) {
  const index = pages.indexOf(page);
  const prev = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;

  useEffect(() => {
    document.title = `${page.title} · ${site.name}`;
  }, [page]);

  return (
    <main id="main" className="page">
      <div className="wrap">
        <h1 className="page__title">{page.title}</h1>
        {children}
        <nav className="pagenav" aria-label="Previous and next">
          <Link to={prev ? prev.path : "/"} viewTransition onClick={() => setDirection(prev ? prev.path : "/")}>
            ← {prev ? prev.title : "Home"}
          </Link>
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
