"use client";

// import dynamic from "next/dynamic";
import FeaturedRecipe from "./FeaturedRecipe/FeaturedRecipe";
import HeroSection from "./HeroSection/HeroSection";
import OurCommunity from "./OurCommunity/OurCommunity";
import TopContributors from "./TopContributors/TopContributors";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedRecipe />
      <TopContributors />
      <OurCommunity />
    </div>
  );
};

export default HomePage;

// export default dynamic(() => Promise.resolve(HomePage), {ssr: false})
