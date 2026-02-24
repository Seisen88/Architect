import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FloorPlanSection from "@/components/FloorPlanSection";
import SiteAreaSection from "@/components/SiteAreaSection";
import ElevationSection from "@/components/ElevationSection";
import SiteDevelopmentSection from "@/components/SiteDevelopmentSection";
import ArchitectProcessSection from "@/components/ArchitectProcessSection";
import SpecificationsSection from "@/components/SpecificationsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FloorPlanSection />
        <SiteAreaSection />
        <ElevationSection />
        <SiteDevelopmentSection />
        <ArchitectProcessSection />
        <SpecificationsSection />
      </main>
      <Footer />
    </>
  );
}
