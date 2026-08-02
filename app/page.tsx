import GalaxyBackground from "@/components/GalaxyBackground";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import EditorialNav from "@/components/EditorialNav";
import HeroEditorial from "@/components/HeroEditorial";
import AboutEditorial from "@/components/AboutEditorial";
import ProjectsList from "@/components/ProjectsList";
import ExperienceList from "@/components/ExperienceList";
import SkillsEditorial from "@/components/SkillsEditorial";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <GalaxyBackground />
      <CursorGlow />
      <ScrollProgress />
      <EditorialNav />

      <main className="relative">
        <HeroEditorial />
        <AboutEditorial />
        <ProjectsList />
        <ExperienceList />
        <SkillsEditorial />
        <Marquee />
        <Testimonials />
      </main>

      <ContactFooter />
    </>
  );
}
