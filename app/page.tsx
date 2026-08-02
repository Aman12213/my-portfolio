import GalaxyBackground from "@/components/GalaxyBackground";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <GalaxyBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Marquee />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
