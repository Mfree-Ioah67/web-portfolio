import Icon, { type IconName } from "@/components/Icon";
import Section from "@/components/Section";
import { site } from "@/content/data";

const channels: { icon: IconName; label: string; value: string; href: string }[] = [
  { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "github", label: "GitHub", value: "github.com/Mfree-Ioah67", href: site.github },
  { icon: "linkedin", label: "LinkedIn", value: "Phạm Hoàng Hải Nguyên", href: site.linkedin },
];

export default function Contact() {
  return (
    <Section id="contact" index="06" title="Contact">
      <div className="contact">
        <p className="contact__lead">
          Open to Red Team and penetration testing internships in Ho Chi Minh City. Email is the fastest way to reach
          me.
        </p>
        <ul className="contact__list">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                className="card contact__item"
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span className="contact__icon">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="contact__text">
                  <span className="label">{c.label}</span>
                  <span className="contact__value">{c.value}</span>
                </span>
                <Icon name="arrow" size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
