import { about } from "@/content/data";

export default function About() {
  return (
    <>
      <div className="prose">
        {about.bio.map((p) => (
          <p key={p} data-reveal>
            {p}
          </p>
        ))}
      </div>
      <dl className="facts" data-reveal>
        <div style={{ display: "contents" }}>
          <dt className="now">Now</dt>
          <dd>{about.now}</dd>
        </div>
        {about.facts.map((f) => (
          <div key={f.label} style={{ display: "contents" }}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
