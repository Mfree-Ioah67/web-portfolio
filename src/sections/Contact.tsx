import { site } from "@/content/data";

export default function Contact() {
  return (
    <>
      <p>{site.contactNote}</p>
      <dl className="facts">
        <div style={{ display: "contents" }}>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </dd>
        </div>
        <div style={{ display: "contents" }}>
          <dt>GitHub</dt>
          <dd>
            <a href={site.github} target="_blank" rel="noreferrer">
              github.com/Mfree-Ioah67
            </a>
          </dd>
        </div>
        <div style={{ display: "contents" }}>
          <dt>LinkedIn</dt>
          <dd>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              {site.name}
            </a>
          </dd>
        </div>
      </dl>
    </>
  );
}
