import { Link, NavLink } from "react-router";
import { pages, site } from "@/content/data";
import { setDirection } from "@/navigation";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <Link className="header__name" to="/" viewTransition onClick={() => setDirection("/")}>
          {site.name}
        </Link>
        <nav className="nav" aria-label="Sections">
          {pages.map((p) => (
            <NavLink key={p.path} to={p.path} viewTransition onClick={() => setDirection(p.path)}>
              {p.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
