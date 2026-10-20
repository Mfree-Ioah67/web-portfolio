import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main"></main>
      <Footer />
    </>
  );
}
