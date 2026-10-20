import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { nav, site } from "@/content/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled || open ? " header--solid" : ""}`}>
      <div className="container header__inner">
        <a className="header__logo" href="#" onClick={close}>
          <span className="header__prompt">~/</span>
          {site.handle}
        </a>

        {nav.length > 0 && (
          <>
            <nav id="site-nav" className={`header__nav${open ? " header__nav--open" : ""}`} aria-label="Sections">
              {nav.map((item) => (
                <a key={item.id} className="header__link" href={`#${item.id}`} onClick={close}>
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              className="header__toggle"
              type="button"
              aria-controls="site-nav"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
