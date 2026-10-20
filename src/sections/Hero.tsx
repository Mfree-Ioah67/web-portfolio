import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createRenderer } from "@/three/core/renderer";
import { createCamera } from "@/three/core/camera";
import { createGlobe } from "@/three/objects/globe";
import { createBackgroundParticles } from "@/three/objects/particles";
import { personal } from "@/content/data";

const COMMANDS = [
  "whoami && cat /etc/targets",
  "nmap -sV -p 1-65535 target.local",
  "hydra -l admin -P wordlist.txt ssh://192.168.1.1",
  "sqlmap -u 'http://target/page?id=1' --dbs",
  "tcpdump -i eth0 -w capture.pcap",
  "volatility -f memory.dmp imageinfo",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cmdIndex, setCmdIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Typing effect
  useEffect(() => {
    const cmd = COMMANDS[cmdIndex];
    let i = 0;
    setTyped("");
    const interval = setInterval(() => {
      i++;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(interval);
        setTimeout(() => setCmdIndex((prev) => (prev + 1) % COMMANDS.length), 2000);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [cmdIndex]);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  // Three.js
  useEffect(() => {
    const canvas = canvasRef.current!;
    const renderer = createRenderer(canvas);
    const camera = createCamera();
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const redLight = new THREE.PointLight(0xff2020, 4, 10);
    redLight.position.set(3, 2, 2);
    scene.add(redLight);
    const blueLight = new THREE.PointLight(0x00c8ff, 3, 10);
    blueLight.position.set(-3, -2, 2);
    scene.add(blueLight);

    const globe = createGlobe();
    globe.position.set(2.2, 0, 0);
    scene.add(globe);

    const bgParticles = createBackgroundParticles();
    scene.add(bgParticles);

    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf: number;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      globe.rotation.y = t * 0.15;
      globe.rotation.x = Math.sin(t * 0.1) * 0.05;
      globe.position.y = Math.sin(t * 0.5) * 0.08;
      bgParticles.rotation.y = t * 0.02;
      bgParticles.rotation.x = t * 0.01;
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero__scanlines" />
      <div className="hero__noise" />
      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="hero__content">
        <div className="hero__badges">
          <span className="badge badge--red">RED TEAM</span>
          <span className="badge badge--blue">SOC ANALYST</span>
          <span className="badge badge--cyan">INCIDENT RESPONSE</span>
          <span className="badge badge--outline">ETHICAL HACKER</span>
        </div>

        <h1 className="hero__name">
          <span className="hero__name-first">HAI</span>
          <span className="hero__name-last"> NGUYEN</span>
        </h1>

        <p className="hero__role">{personal.role}</p>
        <p className="hero__tagline">{personal.tagline}</p>

        <div className="hero__tags">
          <span className="tag">Penetration Testing</span>
          <span className="tag">Cloud Security</span>
          <span className="tag">AWS</span>
          <span className="tag tag--blue">SOC Analysis</span>
          <span className="tag tag--blue">Incident Response</span>
          <span className="tag tag--dim">FPT University</span>
          <span className="tag tag--dim">AWS Intern</span>
        </div>

        <div className="hero__terminal">
          <div className="terminal__bar">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
            <span className="terminal__title">/usr/bin/secure-shell</span>
          </div>
          <div className="terminal__body">
            <div className="terminal__line">
              <span className="terminal__prompt">hainguyen@redteam:~$</span>
              <span className="terminal__cmd"> {typed}</span>
              <span className="terminal__cursor" style={{ opacity: showCursor ? 1 : 0 }}>▋</span>
            </div>
          </div>
        </div>

        <div className="hero__cta">
          <a href={personal.github} target="_blank" rel="noreferrer" className="btn btn--primary">
            <i className="fab fa-github" /> GitHub
          </a>
          <button className="btn btn--outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
