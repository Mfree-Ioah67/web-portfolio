import SectionTitle from "@/components/SectionTitle";
import { journey } from "@/content/data";

export default function Journey() {
  return (
    <section className="section" id="journey">
      <div className="container">
        <SectionTitle label="LEARNING_JOURNEY" accent="red" />
        <div className="timeline">
          {journey.map((j, i) => (
            <div key={i} className="timeline__item">
              <div className="timeline__marker" />
              <div className="timeline__content">
                <span className="timeline__period">{j.period}</span>
                <h3 className="timeline__title">{j.title}</h3>
                <p className="timeline__place">{j.place}</p>
                <p className="timeline__desc">{j.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
