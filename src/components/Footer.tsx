import { site } from "@/content/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>"{site.motto}"</p>
      </div>
    </footer>
  );
}
