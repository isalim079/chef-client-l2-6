"use client";

import Image from "next/image";
import { useState } from "react";
import anim from "@/assets/animation/featuredRecipe.json";
import Lottie from "lottie-react";
import { featuredRecipeData } from "@/utils/SectionData";

const FeaturedRecipe = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
  };
  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div className=" font-poppins py-12 lg:py-20 px-6 lg:px-0">
      <div className="max-w-screen-xl mx-auto">
        <div>
          <h1 className="lg:text-5xl text-2xl font-bold text-gray-800 font-cherrySwash">
            Taste the Best Handpicked Recipes for You
          </h1>
          <p className="lg:text-xl lg:mt-4 text-gray-800 mt-3">
            Explore trending and highly-rated recipes from our vibrant cooking
            community.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 mt-8 lg:mt-16">
          {featuredRecipeData?.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-8 gap-5 items-center bg-white p-6  lg:p-7 rounded-md cursor-pointer shadow-[16px_17px_10px_-8px_rgba(0,_0,_0,_0.35)] border border-gray-300 ${
                isHovered === index &&
                "-translate-y-3 transition-all duration-300 ease-in-out"
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="lg:col-span-6 col-span-8">
                <h1 className="text-gray-800 font-bold font-cherrySwash text-lg lg:text-xl mb-2 lg:mb-4">
                  {item.name}
                </h1>
                <p className="text-gray-800">{item.description}</p>
                <Lottie
                  className="w-14 mt-4 hidden lg:block"
                  animationData={anim}
                />
              </div>
              <Image
                src={item.image}
                className={`${
                  isHovered === index &&
                  "shadow-md p-3 rounded-lg bg-primary-orange transition-all duration-300 ease-in-out"
                } lg:col-span-2 col-span-8 mx-auto`}
                alt={item.name}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipe;
