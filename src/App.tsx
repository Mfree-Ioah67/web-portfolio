import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Intro from "@/sections/Intro";
import About from "@/sections/About";
import Labs from "@/sections/Labs";
import Competitions from "@/sections/Competitions";
import Projects from "@/sections/Projects";
import Certs from "@/sections/Certs";
import Contact from "@/sections/Contact";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Intro />
        <About />
        <Labs />
        <Competitions />
        <Projects />
        <Certs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
