import SectionTitle from "@/components/SectionTitle";
import { skills } from "@/content/data";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionTitle label="TECHNICAL_SKILLS" accent="blue" />
        <div className="skills__grid">
          {skills.map((s) => (
            <div key={s.category} className="skill-card">
              <h3 className="skill-card__title">
                <i className={s.icon} /> {s.category}
              </h3>
              <div className="skill-card__tags">
                {s.tags.map((t) => (
                  <span key={t} className="skill-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
