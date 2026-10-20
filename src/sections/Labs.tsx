import Section from "@/components/Section";
import { labs } from "@/content/data";

export default function Labs() {
  return (
    <Section id="labs" index="03" title="Labs & Training">
      <div className="labs">
        {labs.map((lab) => (
          <article key={lab.title} className={`card lab${lab.featured ? " lab--featured" : ""}`}>
            <div className="lab__head">
              <p className="label">{lab.platform}</p>
              <span className="lab__period">{lab.period}</span>
            </div>
            <h3 className="lab__title">{lab.title}</h3>
            <ul className="lab__points">
              {lab.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
