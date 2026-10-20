import Section from "@/components/Section";
import { competitions } from "@/content/data";

export default function Competitions() {
  return (
    <Section id="competitions" title="Competitions">
      <ol className="rows">
        {competitions.map((c) => (
          <li key={c.name} className={`row${c.top ? " row--top" : ""}`}>
            <span className="row__name">{c.name}</span>
            <span className="row__detail">
              {c.year}
              {c.detail && ` · ${c.detail}`}
            </span>
            <span className="row__aside">{c.result}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
