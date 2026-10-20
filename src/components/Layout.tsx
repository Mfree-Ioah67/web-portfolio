import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

export default function Layout() {
  const { pathname } = useLocation();

  // Runs inside React Router's view transition, so the new page is
  // captured already scrolled to the top.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useReveal(pathname);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
