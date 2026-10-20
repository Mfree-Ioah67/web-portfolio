import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "@/components/Layout";
import SectionPage from "@/components/SectionPage";
import { pages } from "@/content/data";
import Home from "@/pages/Home";
import About from "@/sections/About";
import Labs from "@/sections/Labs";
import Competitions from "@/sections/Competitions";
import Projects from "@/sections/Projects";
import Certs from "@/sections/Certs";
import Contact from "@/sections/Contact";

const content: Record<string, ReactNode> = {
  about: <About />,
  labs: <Labs />,
  competitions: <Competitions />,
  projects: <Projects />,
  certifications: <Certs />,
  contact: <Contact />,
};

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {pages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<SectionPage page={page}>{content[page.id]}</SectionPage>}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
