import { useEffect, useState } from "react";

const links = ["home", "about", "skills", "projects", "certs", "journey", "contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">
        <button className="header__logo" onClick={() => scrollTo("home")}>
          <i className="fas fa-user-secret" />
          <span>HAI.NGUYEN</span>
        </button>

        {/* Desktop nav */}
        <nav className="header__nav">
          {links.map((l) => (
            <button key={l} className="header__link" onClick={() => scrollTo(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </nav>

        {/* Mobile burger */}
        <button className="header__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span className={menuOpen ? "open" : ""} />
          <span className={menuOpen ? "open" : ""} />
          <span className={menuOpen ? "open" : ""} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="header__mobile">
          {links.map((l) => (
            <button key={l} className="header__mobile-link" onClick={() => scrollTo(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
