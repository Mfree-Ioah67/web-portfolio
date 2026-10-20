import SectionTitle from "@/components/SectionTitle";
import { personal } from "@/content/data";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionTitle label="CONTACT" accent="blue" />
        <div className="contact__grid">
          <a href={`mailto:${personal.email}`} className="contact-item">
            <i className="fas fa-envelope" />
            <span>{personal.email}</span>
          </a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="contact-item">
            <i className="fab fa-linkedin" />
            <span>LinkedIn Profile</span>
          </a>
          <a href={personal.github} target="_blank" rel="noreferrer" className="contact-item">
            <i className="fab fa-github" />
            <span>GitHub</span>
          </a>
          <div className="contact-item">
            <i className="fas fa-phone" />
            <span>{personal.phone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
