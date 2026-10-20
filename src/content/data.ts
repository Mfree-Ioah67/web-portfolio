export const personal = {
  name: "Hai Nguyen",
  fullName: "Pham Hoang Hai Nguyen",
  role: "Information Assurance Student",
  tagline: "Penetration Testing · Cloud Security · Blue Team Operations",
  motto: "Secure code, secure future, happy life.",
  email: "phamhoanghainguyen12a12dt@gmail.com",
  phone: "+84 829 533 727",
  github: "https://github.com/Mfree-Ioah67",
  linkedin: "https://linkedin.com/in/nguyên-phạm-hoàng-hải-5bba9532a",
  university: "FPT University",
  role2: "AWS FCJ Intern",
};

export const skills = [
  {
    category: "Malware Analysis",
    icon: "fas fa-shield-virus",
    tags: ["PEStudio", "Wireshark", "FakeNet-NG", "Autopsy", "VirusTotal", "HxD"],
  },
  {
    category: "Penetration Testing",
    icon: "fas fa-bug",
    tags: ["Burp Suite", "OWASP ZAP", "SQLmap", "Hashcat"],
  },
  {
    category: "Cloud & Infrastructure",
    icon: "fas fa-cloud",
    tags: ["AWS", "GitLab CI/CD", "Linux", "PowerShell", "Bash"],
  },
  {
    category: "Programming",
    icon: "fas fa-code",
    tags: ["Python", "C", "Java", "JavaScript"],
  },
];

export const projects = [
  {
    id: "malware",
    title: "Malware Analysis & Reverse Engineering",
    status: "COMPLETED",
    statusColor: "green",
    icon: "fas fa-bug",
    description:
      "Team Leader for IAM302. Analyzed GorillaBotnet (ELF-based IoT botnet) with 300K+ infected devices using static/dynamic analysis and reverse engineering.",
    tech: ["PEStudio", "Wireshark", "Python", "VirtualBox", "FakeNet-NG"],
    links: [
      { label: "GitHub", icon: "fab fa-github", url: "https://github.com/Mfree-Ioah67/malware-analysis-and-reverse-engineering" },
    ],
  },
  {
    id: "web-security",
    title: "Web Security Labs — IAW301",
    status: "COMPLETED",
    statusColor: "green",
    icon: "fas fa-spider",
    description:
      "PortSwigger labs covering SQLi, XSS, IDOR, OAuth 2.0, OS Command Injection. Includes XSS AI Detector — 3 ML models (SVM 98.36%, PhoBERT 96.72%, DistilBERT 83.61%) with 52 handcrafted features, served via Flask API.",
    tech: ["Burp Suite", "SQLmap", "Python", "scikit-learn", "Flask"],
    links: [
      { label: "GitHub", icon: "fab fa-github", url: "https://github.com/Mfree-Ioah67/web-security-portswigger" },
    ],
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking — HOD402",
    status: "COMPLETED",
    statusColor: "green",
    icon: "fas fa-user-secret",
    description:
      "Full offensive security lifecycle: OSINT, network scanning, exploitation (SET, BeEF, Ettercap), web app pentesting and capstone pentest engagement. Team Noname — IA1801.",
    tech: ["Kali Linux", "Nmap", "Metasploit", "Wireshark", "OWASP ZAP"],
    links: [
      { label: "GitHub", icon: "fab fa-github", url: "https://github.com/Mfree-Ioah67/ethical-hacking-hod402" },
    ],
  },
  {
    id: "aws-fcj",
    title: "AWS First Cloud Journey 2025",
    status: "DEPLOYED",
    statusColor: "green",
    icon: "fas fa-cloud",
    description:
      "AWS FCJ 2025 internship documentation with Hugo site. 12-week worklog, Blood Donation System project, 3 technical blog translations, 5 AWS events.",
    tech: ["Hugo", "GitHub Pages", "AWS", "CloudFormation", "React"],
    links: [
      { label: "GitHub", icon: "fab fa-github", url: "https://github.com/Mfree-Ioah67/learning--aws--fcj2025" },
      { label: "Live Site", icon: "fas fa-external-link-alt", url: "https://mfree-ioah67.github.io/learning--aws--fcj2025/" },
    ],
  },
  {
    id: "aws-project",
    title: "AWS Project Group — Frontend",
    status: "FRONTEND",
    statusColor: "yellow",
    icon: "fas fa-code",
    description:
      "Frontend for AWS group project built with React/Vite. Automated deployment via GitLab CI/CD, S3, CloudFront and API Gateway integration.",
    tech: ["React", "Vite", "AWS S3", "CloudFront", "GitLab CI/CD"],
    links: [
      { label: "GitLab", icon: "fab fa-gitlab", url: "https://gitlab.com/aws-project-group-69/aws_project" },
      { label: "Demo", icon: "fab fa-youtube", url: "https://www.youtube.com/watch?v=Qh5tyL3Goeg" },
    ],
  },
];

export const certs = [
  {
    icon: "fas fa-user-secret",
    title: "Ethical Hacker",
    issuer: "Cisco",
    url: "https://www.credly.com/badges/578b2528-3e8e-470c-96cb-a365e6b4b2c0",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Google Cybersecurity Professional",
    issuer: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/specialization/YVMRW09MLZL6",
  },
  {
    icon: "fas fa-network-wired",
    title: "CCNA",
    issuer: "Cisco",
    url: "https://www.credly.com/badges/dcd249c3-b88a-4e95-949e-52ae09b56a3f",
  },
  {
    icon: "fas fa-shield-virus",
    title: "CyberOps Associate",
    issuer: "Cisco",
    url: "https://www.credly.com/badges/e5865820-c6cf-4869-9a5d-0d56b10dcc4e",
  },
  {
    icon: "fas fa-key",
    title: "Applied Cryptography Specialization",
    issuer: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/JTRJ9WC9QDCD",
  },
  {
    icon: "fab fa-python",
    title: "Python for Everybody",
    issuer: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/PICP4ADM6KBJ",
  },
  {
    icon: "fab fa-linux",
    title: "LFS101: Introduction to Linux",
    issuer: "Linux Foundation",
    url: "https://www.credly.com/badges/da8447d8-771f-4534-bf3a-054dab89e276",
  },
  {
    icon: "fas fa-trophy",
    title: "Honorable Student Awards",
    issuer: "FPT University — FA24, SP25, SU25",
    url: "https://github.com/Mfree-Ioah67/certi_fu",
  },
];

export const journey = [
  {
    period: "2022 — Present",
    title: "Information Assurance Student",
    place: "FPT University",
    desc: "Fourth-year Information Assurance student, studying cybersecurity and security techniques.",
  },
  {
    period: "Sept — Dec 2025",
    title: "FCJ Cloud Intern",
    place: "Amazon Web Services Vietnam",
    desc: "Internship at AWS Vietnam, learning about cloud computing and AWS services.",
  },
];
