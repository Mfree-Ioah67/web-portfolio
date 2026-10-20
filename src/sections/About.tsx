import Section from "@/components/Section";
import { about } from "@/content/data";

export default function About() {
  const { bio, education, experience, toolbox } = about;

  return (
    <Section id="about" index="01" title="About">
      <div className="about">
        <div className="about__bio">
          {bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="about__cards">
          <div className="card">
            <p className="label">Education</p>
            <h3 className="about__heading">{education.school}</h3>
            <p>{education.degree}</p>
            <p className="about__meta">{education.detail}</p>
            <p className="about__meta">{education.note}</p>
          </div>

          <div className="card">
            <p className="label">Experience</p>
            <h3 className="about__heading">{experience.org}</h3>
            <p>{experience.role}</p>
            <p className="about__meta">{experience.period}</p>
          </div>

          <div className="card">
            <p className="label">Toolbox</p>
            <dl className="toolbox">
              {toolbox.map((group) => (
                <div key={group.label} className="toolbox__row">
                  <dt>{group.label}</dt>
                  <dd className="tags">
                    {group.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
