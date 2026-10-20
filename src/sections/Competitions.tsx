import Section from "@/components/Section";
import { competitions } from "@/content/data";

export default function Competitions() {
  return (
    <Section id="competitions" index="02" title="Competitions">
      <ol className="board">
        {competitions.map((c) => (
          <li key={c.name} className={`board__row${c.top ? " board__row--top" : ""}`}>
            <span className="board__year">{c.year}</span>
            <div className="board__main">
              <h3 className="board__name">{c.name}</h3>
              {c.detail && <p className="board__detail">{c.detail}</p>}
            </div>
            <span className="board__result">{c.result}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
