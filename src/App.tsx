import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Certs from "@/sections/Certs";
import Journey from "@/sections/Journey";
import Contact from "@/sections/Contact";

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certs />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
