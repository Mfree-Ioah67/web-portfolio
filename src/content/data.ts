// All site content lives here. Keep it in sync with the CV: anything listed
// on this page can come up in an interview.

import type { TerminalEntry } from "@/components/Terminal";

export interface NavItem {
  id: string;
  label: string;
}

export const site = {
  name: "Phạm Hoàng Hải Nguyên",
  handle: "hai.nguyen",
  role: "Offensive Security · Red Team",
  summary:
    "Final-year Information Assurance student at FPT University. I learn offensive security hands-on: Hack The Box and TryHackMe labs, a full Pro Lab, and CTF competitions with team FPT DarkHotel.",
  motto: "Secure code, secure future, happy life.",
  email: "phamhoanghainguyen12a12dt@gmail.com",
  github: "https://github.com/Mfree-Ioah67",
  linkedin: "https://www.linkedin.com/in/ph%E1%BA%A1m-ho%C3%A0ng-h%E1%BA%A3i-nguy%C3%AAn-5bba9532a",
};

export const nav: NavItem[] = [{ id: "about", label: "About" }];

export const highlights = [
  { value: "1st", label: "Breach Point CTF Season II" },
  { value: "27/27", label: "HTB Pro Lab: Dante" },
  { value: "Top 35", label: "CSCV 2026, of 334 teams" },
  { value: "9/9", label: "FLARE-On 13" },
];

// Replay of HTB Optimum (on the CV): recon, finding the public exploit,
// the foothold shell, then enumeration before privilege escalation.
export const terminalScript: TerminalEntry[] = [
  {
    prompt: "hai@kali:~$",
    command: "nmap -sC -sV 10.10.10.8",
    output: "80/tcp open  http  HttpFileServer httpd 2.3",
  },
  {
    prompt: "hai@kali:~$",
    command: "searchsploit hfs 2.3",
    output: "Rejetto HTTP File Server (HFS) 2.3.x - Remote Command Execution",
  },
  {
    prompt: "C:\\Users\\kostas\\Desktop>",
    command: "whoami",
    output: "optimum\\kostas",
    remote: true,
  },
  {
    prompt: "C:\\Users\\kostas\\Desktop>",
    command: 'systeminfo | findstr /B /C:"OS Name"',
    output: "OS Name: Microsoft Windows Server 2012 R2 Standard",
    remote: true,
  },
];

export const about = {
  bio: [
    "I'm a final-year Information Assurance student at FPT University in Ho Chi Minh City, focused on offensive security.",
    "Most of what I know comes from hands-on work: Hack The Box and TryHackMe labs, a full Pro Lab, CTF competitions and a black-box assessment of a live website. I document every lab I finish.",
  ],
  education: {
    school: "FPT University",
    degree: "BSc Information Assurance",
    detail: "GPA 3.2 / 4.0 · Expected May 2027",
    note: "Honorable Student, four semesters (2024–2026)",
  },
  experience: {
    org: "Amazon Web Services Vietnam",
    role: "FCJ Cloud Intern, First Cloud Journey",
    period: "Sep – Dec 2025",
  },
  toolbox: [
    { label: "Tools", items: ["Nmap", "Gobuster", "Burp Suite", "Metasploit", "John the Ripper"] },
    { label: "Systems", items: ["Kali Linux", "Parrot OS", "Windows"] },
    { label: "Scripting", items: ["Python"] },
  ],
};
