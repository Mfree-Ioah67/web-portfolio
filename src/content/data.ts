// All site content lives here. Keep it in sync with the CV: anything on
// this page can come up in an interview, so nothing goes here that is
// not on the CV.

export const site = {
  name: "Phạm Hoàng Hải Nguyên",
  headline: "Final-year Information Assurance student, focused on offensive security.",
  summary:
    "I learn by doing: Hack The Box and TryHackMe labs, a full Pro Lab, CTF competitions with team FPT DarkHotel, and a black-box assessment of a live website. Looking for a Red Team or penetration testing internship in Ho Chi Minh City.",
  contactNote: "Email is the fastest way to reach me.",
  motto: "Secure code, secure future, happy life.",
  email: "phamhoanghainguyen12a12dt@gmail.com",
  github: "https://github.com/Mfree-Ioah67",
  linkedin: "https://www.linkedin.com/in/ph%E1%BA%A1m-ho%C3%A0ng-h%E1%BA%A3i-nguy%C3%AAn-5bba9532a",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "labs", label: "Labs" },
  { id: "competitions", label: "Competitions" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const highlights = [
  { value: "1st", text: "Breach Point CTF Season II, 2026 — team FPT DarkHotel" },
  { value: "27/27", text: "Hack The Box Pro Lab: Dante, completed Oct 2026" },
  { value: "Top 35", text: "Cybersecurity Student Contest Vietnam 2026, of 334 teams" },
  { value: "9/9", text: "FLARE-On 13 finisher, all challenges solved" },
];

export const about = {
  bio: [
    "I'm a final-year Information Assurance student at FPT University in Ho Chi Minh City (expected graduation May 2027).",
    "Most of what I know comes from hands-on work rather than coursework: Hack The Box and TryHackMe labs, a full Pro Lab, CTF competitions and a black-box assessment of a live website. I write a report for every lab I finish.",
  ],
  facts: [
    {
      label: "Education",
      value:
        "BSc Information Assurance, FPT University — GPA 3.2/4.0, expected May 2027. Honorable Student for four semesters (2024–2026).",
    },
    {
      label: "Experience",
      value: "FCJ Cloud Intern, Amazon Web Services Vietnam (First Cloud Journey), Sep – Dec 2025.",
    },
    { label: "Tools", value: "Nmap, Gobuster, Burp Suite, Metasploit, John the Ripper" },
    { label: "Systems", value: "Kali Linux, Parrot OS, Windows" },
    { label: "Scripting", value: "Python" },
    { label: "Languages", value: "Vietnamese (native), English (intermediate)" },
  ],
};

export const labsNote =
  "All lab work was done in authorised training environments. Reports are available on request where the platform's rules allow sharing.";

export interface Lab {
  platform: string;
  title: string;
  period: string;
  points: string[];
}

export const labs: Lab[] = [
  {
    platform: "Hack The Box",
    title: "Pro Lab: Dante",
    period: "Oct 2026",
    points: [
      "Completed the lab (27/27 flags): foothold on a public web server, pivot into the internal network, Domain Admin.",
      "Wrote a full penetration test report with findings, severity ratings and remediation.",
    ],
  },
  {
    platform: "TryHackMe",
    title: "Wreath Network & Compromising Active Directory path",
    period: "Aug – Sep 2026",
    points: [
      "Wreath: compromised a 3-host network through web exploitation, pivoting and privilege escalation; wrote a report.",
      "Completed the Compromising Active Directory path (7 rooms) and Attacktive Directory.",
    ],
  },
  {
    platform: "Hack The Box & TryHackMe",
    title: "Individual machines",
    period: "Jun – Aug 2026",
    points: ["HTB: DevHub, Enigma, Optimum.", "THM: Blue, Ice, Kenobi, Network Services 1–2."],
  },
];

export interface Competition {
  name: string;
  result: string;
  detail: string;
  year: string;
  top?: boolean;
}

export const competitions: Competition[] = [
  {
    name: "Breach Point CTF Season II",
    result: "1st place",
    detail: "36-hour national CTF, team FPT DarkHotel",
    year: "2026",
    top: true,
  },
  {
    name: "Cybersecurity Student Contest Vietnam (CSCV)",
    result: "Top 35 / 334 teams",
    detail: "Team FPT DarkHotel",
    year: "2026",
  },
  { name: "The Catch (CESNET)", result: "17th / 208", detail: "Individual", year: "2026" },
  { name: "FLARE-On 13", result: "Finisher", detail: "All 9 reverse-engineering challenges solved", year: "2026" },
  { name: "UIT Net Challenges", result: "Encouragement Award", detail: "", year: "2026" },
  { name: "Pointer Overflow CTF", result: "34 solved", detail: "Solo", year: "2026" },
  {
    name: "NSUCRYPTO",
    result: "Participant",
    detail: "International Olympiad in Cryptography, individual and team rounds",
    year: "2026",
  },
];

export interface Project {
  title: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  links: { label: string; url: string }[];
}

// The pentest target is a real company's site: keep its name off the public page.
export const projects: Project[] = [
  {
    title: "Black-box web penetration test",
    role: "Team leader (4 members) · Ethical Hacking course, FPT University",
    period: "Jan – Mar 2026",
    description:
      "Black-box assessment of a live e-commerce website following the OWASP Top 10. Reported 5 findings: DOM-based XSS and PII disclosure (High); insecure cookie flags, robots.txt endpoint disclosure and third-party script risk (Medium/Low).",
    tech: ["Nmap", "Gobuster", "Burp Suite", "OWASP ZAP"],
    links: [{ label: "Repository", url: "https://github.com/Mfree-Ioah67/ethical-hacking-hod402" }],
  },
  {
    title: "Web security labs",
    role: "Web security course (IAW301), FPT University",
    period: "",
    description:
      "PortSwigger Web Security Academy labs on SQL injection, XSS, IDOR, OAuth 2.0 and OS command injection, plus a machine-learning XSS detector served through a Flask API.",
    tech: ["Burp Suite", "Python", "scikit-learn", "Flask"],
    links: [{ label: "Repository", url: "https://github.com/Mfree-Ioah67/web-security-portswigger" }],
  },
  {
    title: "Blood Donation Support System on AWS",
    role: "FCJ Cloud Intern, AWS First Cloud Journey",
    period: "Sep – Dec 2025",
    description:
      "3-tier web application deployed on S3/CloudFront, EC2, RDS and Cognito, with CI/CD through GitLab, AWS CodePipeline and CodeBuild.",
    tech: ["AWS", "GitLab CI/CD", "CodePipeline", "CodeBuild"],
    links: [
      { label: "Report site", url: "https://mfree-ioah67.github.io/learning--aws--fcj2025/" },
      { label: "Repository", url: "https://github.com/Mfree-Ioah67/learning--aws--fcj2025" },
    ],
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export const certifications: Certification[] = [
  { title: "Pro Lab: Dante — Certificate of Completion", issuer: "Hack The Box", date: "Oct 2026" },
  {
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "Mar 2026",
    url: "https://www.credly.com/badges/578b2528-3e8e-470c-96cb-a365e6b4b2c0",
  },
  { title: "CCNA: Switching, Routing, and Wireless Essentials", issuer: "Cisco Networking Academy", date: "Jul 2026" },
  {
    title: "CyberOps Associate",
    issuer: "Cisco Networking Academy",
    date: "Oct 2024",
    url: "https://www.credly.com/badges/e5865820-c6cf-4869-9a5d-0d56b10dcc4e",
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "Jul 2024",
    url: "https://www.credly.com/badges/dcd249c3-b88a-4e95-949e-52ae09b56a3f",
  },
];
