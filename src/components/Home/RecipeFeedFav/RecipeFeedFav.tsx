/* eslint-disable @next/next/no-img-element */
"use client";

import CountUp from "react-countup";
import { favCategoryData, favRecipeData } from "./RecipeFeedFavData";

const RecipeFeedFav = () => {
  return (
    <div className=" font-poppins py-16 lg:py-20 px-6 lg:px-0">
      <div className="max-w-screen-xl mx-auto">
        {/* title section */}
        <div className="text-gray-800">
          <h1 className="lg:text-5xl text-2xl font-bold text-center font-cherrySwash">
            Recipe Feed Favorites
          </h1>
          <p className="lg:text-xl lg:mt-4 text-center ">
            Explore the most-loved recipes and trending dishes from our
            community.
          </p>
        </div>

        {/* bottom section */}
        <div className="grid lg:grid-cols-12 gap-14 mt-16">
          {/* left section */}
          <div className=" col-span-4 p-14 rounded-lg bg-gray-800 text-white">
            <h5 className="text-xl font-cherrySwash font-bold">Categories</h5>

            {favCategoryData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center gap-10 mt-10"
              >
                <div className="col-span-1 text-3xl">{item.icon}</div>
                <div className="col-span-4">
                  <div>
                    <span className="font-cherrySwash font-bold text-lg">
                      {item.title}
                    </span>
                  </div>
                  <div>
                    <span>
                      <span className="text-xl font-cherrySwash text-primary-orange font-black mr-2">
                        <CountUp end={item.posts} enableScrollSpy />
                      </span>{" "}
                      Posts
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* right section */}
          <div className="col-span-8 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {favRecipeData.map((recipe) => (
                <div
                  key={recipe.id}
                  className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-150 cursor-pointer hover:scale-[94%]"
                >
                  {/* Image */}
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Card Content */}
                  <div className="px-6 py-4">
                    {/* Categories */}
                    <div className="text-sm text-gray-500 mb-2">
                      {recipe.categories}
                    </div>

                    {/* Title */}
                    <div className="font-bold text-xl mb-2 font-cherrySwash">
                      {recipe.title}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 text-base">{recipe.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFeedFav;
