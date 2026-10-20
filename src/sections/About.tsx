import SectionTitle from "@/components/SectionTitle";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionTitle label="ABOUT_ME" accent="red" />
        <div className="about__grid">
          <div className="about__bio">
            <p>
              Cyber Security student focused on Information Assurance and defense. I value
              mindset, discipline, curiosity, and ethics. I enjoy breaking things to understand
              them and building resilient systems that can withstand real-world threats.
            </p>
          </div>
          <div className="about__code">
            <div className="code-block">
              <div className="code-line"><span className="p">&gt;</span><span className="cmd">whoami</span></div>
              <div className="code-line"><span className="p">&gt;</span><span className="k">role:</span><span className="v"> student | blue team · pentesting · assurance</span></div>
              <div className="code-line"><span className="p">&gt;</span><span className="k">interests:</span><span className="v"> malware analysis, cloud security, threat hunting</span></div>
              <div className="code-line"><span className="p">&gt;</span><span className="k">motto:</span><span className="v"> "secure code, secure future, happy life"</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
