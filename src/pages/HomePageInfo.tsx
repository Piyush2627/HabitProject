import States from "../components/common/States";
import TeamSection from "../components/common/TeamSection";
import ThreeBentoGrid from "../components/common/ThreeBentoGrid";
import HomePageHeroSection from "../components/ui/HomePageHeroSection";

function HomePageInfo() {
  return (
    <>
      <HomePageHeroSection />
      <ThreeBentoGrid />
      <States />
      <TeamSection />
    </>
  );
}

export default HomePageInfo;
