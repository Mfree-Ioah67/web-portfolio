import Section from "@/components/Section";
import { certifications } from "@/content/data";

export default function Certs() {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="rows">
        {certifications.map((c) => (
          <li key={c.title} className="row">
            <span className="row__name">{c.title}</span>
            <span className="row__detail">
              {c.issuer} · {c.date}
            </span>
            <span className="row__aside">
              {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer">
                  Verify
                </a>
              ) : (
                <span style={{ color: "var(--dim)" }}>On request</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
