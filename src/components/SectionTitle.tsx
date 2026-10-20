interface Props { label: string; accent?: "red" | "blue" }

export default function SectionTitle({ label, accent = "red" }: Props) {
  return (
    <div className="section-title">
      <span className={`section-title__line section-title__line--${accent}`} />
      <h2 className="section-title__text">{label}</h2>
      <span className={`section-title__line section-title__line--${accent}`} />
    </div>
  );
}
