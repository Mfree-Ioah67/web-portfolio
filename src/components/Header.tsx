import { nav, site } from "@/content/data";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <a className="header__name" href="#">
          {site.name}
        </a>
        <nav className="nav" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
