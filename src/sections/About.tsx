import Section from "@/components/Section";
import { about } from "@/content/data";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="prose">
        {about.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="facts">
        {about.facts.map((f) => (
          <div key={f.label} style={{ display: "contents" }}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
