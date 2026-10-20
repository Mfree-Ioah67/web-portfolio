import Icon from "@/components/Icon";
import Section from "@/components/Section";
import { certifications } from "@/content/data";

export default function Certs() {
  return (
    <Section id="certifications" index="05" title="Certifications">
      <ul className="certs">
        {certifications.map((c) => {
          const body = (
            <>
              <div className="cert__text">
                <h3 className="cert__title">{c.title}</h3>
                <p className="cert__issuer">
                  {c.issuer} · {c.date}
                </p>
              </div>
              {c.url && (
                <span className="cert__verify">
                  Verify <Icon name="external" size={14} />
                </span>
              )}
            </>
          );
          return (
            <li key={c.title}>
              {c.url ? (
                <a className="card cert cert--link" href={c.url} target="_blank" rel="noreferrer">
                  {body}
                </a>
              ) : (
                <div className="card cert">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
