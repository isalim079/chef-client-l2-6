"use client";

import FeaturedRecipe from "./FeaturedRecipe/FeaturedRecipe";
import HeroSection from "./HeroSection/HeroSection";
import OurCommunity from "./OurCommunity";
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
