import HomePageFooter from "../components/ui/HomePageFooter";
import HomePageNavigation from "../components/ui/HomePageNavigation";
import HomePageInfo from "../pages/HomePageInfo";

function HomeWebsiteLayout() {
  return (
    <>
      <HomePageNavigation />
      <div className="container mx-auto px-12">
        <HomePageInfo />
      </div>
      <HomePageFooter />
    </>
  );
}

export default HomeWebsiteLayout;
