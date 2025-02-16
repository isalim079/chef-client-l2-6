"use client";

import DesertSection from "./DesertSection/DesertSection";
// import dynamic from "next/dynamic";
import FeaturedRecipe from "./FeaturedRecipe/FeaturedRecipe";
import HeroSection from "./HeroSection/HeroSection";
import OurCommunity from "./OurCommunity/OurCommunity";
import RecipeFeedFav from "./RecipeFeedFav/RecipeFeedFav";
import TopContributors from "./TopContributors/TopContributors";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedRecipe />
      <TopContributors />
      <OurCommunity />
      <RecipeFeedFav />
      <DesertSection />
    </div>
  );
};

export default HomePage;

// export default dynamic(() => Promise.resolve(HomePage), {ssr: false})
