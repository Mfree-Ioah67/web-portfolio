import Entry from "@/components/Entry";
import { labs, labsNote } from "@/content/data";

export default function Labs() {
  return (
    <>
      <p className="note" data-reveal>
        {labsNote}
      </p>
      {labs.map((lab) => (
        <Entry key={lab.title} title={lab.title} meta={lab.period} sub={lab.platform}>
          <ul className="bullets">
            {lab.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Entry>
      ))}
    </>
  );
}
