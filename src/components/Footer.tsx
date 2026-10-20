import { site } from "@/content/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p>
          © {new Date().getFullYear()} {site.name} · "{site.motto}"
        </p>
        <p className="colophon">
          Updated {__BUILD_DATE__} · No analytics, no cookies, no third-party requests ·{" "}
          <a href={site.source} target="_blank" rel="noreferrer">
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
