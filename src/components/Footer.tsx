import { site } from "@/content/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="footer__motto">"{site.motto}"</p>
      </div>
    </footer>
  );
}
