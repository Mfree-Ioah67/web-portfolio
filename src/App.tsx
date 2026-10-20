import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
