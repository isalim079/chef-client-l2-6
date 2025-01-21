"use client";

import FeaturedRecipe from "./FeaturedRecipe/FeaturedRecipe";
import HeroSection from "./HeroSection/HeroSection";
import TopContributors from "./TopContributors/TopContributors";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedRecipe />
      <TopContributors />
    </div>
  );
};

export default HomePage;
