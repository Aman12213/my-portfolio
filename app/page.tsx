import GalaxyBackground from "@/components/GalaxyBackground";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import EditorialNav from "@/components/EditorialNav";
import HeroEditorial from "@/components/HeroEditorial";
import AboutEditorial from "@/components/AboutEditorial";
import ProjectsList from "@/components/ProjectsList";
import ExperienceList from "@/components/ExperienceList";
import SkillsEditorial from "@/components/SkillsEditorial";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import ContactFooter from "@/components/ContactFooter";
import CursorCrew from "@/components/CursorCrew";

export default function Home() {
  return (
    <>
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

      {/* Five cursors build everything marked data-mc, live, as you scroll. */}
      <CursorCrew />
    </>
  );
}
