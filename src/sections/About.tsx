import { about } from "@/content/data";

export default function About() {
  return (
    <>
      <div className="prose">
        {about.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="facts">
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
