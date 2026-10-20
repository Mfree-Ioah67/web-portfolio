import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Competitions from "@/sections/Competitions";
import Labs from "@/sections/Labs";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Competitions />
        <Labs />
      </main>
      <Footer />
    </>
  );
}
