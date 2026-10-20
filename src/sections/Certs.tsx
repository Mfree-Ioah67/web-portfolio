import { certifications } from "@/content/data";

export default function Certs() {
  return (
    <ul className="rows">
      {certifications.map((c) => (
        <li key={c.title} className="row">
          <span className="row__name">{c.title}</span>
          <span className="row__detail">
            {c.issuer} · {c.date}
            {c.id && (
              <>
                {" · ID "}
                <code>{c.id}</code>
              </>
            )}
          </span>
          <span className="row__aside">
            {c.url && (
              <a href={c.url} target="_blank" rel="noreferrer">
                Verify
              </a>
            )}
            {c.file && (
              <a href={c.file} target="_blank" rel="noreferrer">
                PDF
              </a>
            )}
            {!c.url && !c.file && <span className="dim">On request</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
