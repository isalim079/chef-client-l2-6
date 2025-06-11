/* eslint-disable @next/next/no-img-element */
"use client";

import Lottie from "lottie-react";
import { desertData } from "./DesertData";
import timing from "@/assets/animation/timing.json";

const DesertSection = () => {
  return (
    <div className=" font-poppins py-12 lg:py-20 px-6 lg:px-0">
      <div className="max-w-screen-xl mx-auto">
        {/* title section */}
        <div className="text-gray-800">
          <h1 className="lg:text-5xl text-2xl font-bold text-center font-cherrySwash">
            Delicious Desserts
          </h1>
          <p className="lg:text-xl lg:mt-4 text-center ">
            Explore our collection of mouth-watering desserts that are perfect
            for any occasion.
          </p>
        </div>

        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 lg:mt-16 ">
          {desertData.map((dessert) => (
            <div
              key={dessert.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg  cursor-pointer hover:scale-[94%] transition-all duration-200 ease-in-out grid grid-cols-5 items-center gap-3 px-3 py-2"
            >
              <div className="col-span-2">
                {/* Image */}
                <img
                  src={dessert.image}
                  alt={dessert.title}
                  className="h-28 object-cover w-full rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="p-4 col-span-3">
                <h2 className="text-lg font-semibold text-gray-800 font-cherrySwash">
                  {dessert.title}
                </h2>
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                  <span>
                    <Lottie className="w-10" animationData={timing} />
                  </span>{" "}
                  <span>
                    <span>{dessert.time}</span> · <span>{dessert.steps}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesertSection;
