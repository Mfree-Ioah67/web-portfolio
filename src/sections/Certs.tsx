import SectionTitle from "@/components/SectionTitle";
import { certs } from "@/content/data";

export default function Certs() {
  return (
    <section className="section" id="certs">
      <div className="container">
        <SectionTitle label="CERTIFICATIONS" accent="blue" />
        <div className="certs__grid">
          {certs.map((c) => (
            <a key={c.title} href={c.url} target="_blank" rel="noreferrer" className="cert-card">
              <i className={`${c.icon} cert-card__icon`} />
              <div>
                <p className="cert-card__title">{c.title}</p>
                <p className="cert-card__issuer">{c.issuer}</p>
              </div>
              <i className="fas fa-external-link-alt cert-card__ext" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
