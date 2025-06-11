/* eslint-disable @next/next/no-img-element */
"use client";

import { topContributorsData } from "@/utils/SectionData";
import CountUp from "react-countup";
import { BiSolidLike } from "react-icons/bi";

const TopContributors = () => {
  return (
    <div className="bg-gray-800 font-poppins py-16 lg:py-28 px-6 lg:px-0">
      <div className="max-w-screen-xl mx-auto">
        {/* title section */}
        <div className="text-white">
          <h1 className="lg:text-5xl text-2xl font-bold text-center font-cherrySwash">
            Meet Our Star Cooks
          </h1>
          <p className="lg:text-xl lg:mt-4 text-center ">
            Discover recipes from top contributors and passionate food
            enthusiasts in our community.
          </p>
        </div>

        {/* card section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-7 mt-16">
          {topContributorsData?.map((item, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-md cursor-pointer hover:bg-transparent hover:border-2 hover:border-primary-white hover:text-primary-white hover:shadow-md hover:-translate-y-3 transition-all duration-300 ease-in-out"
            >
              <div className="flex justify-center items-center h-full relative">
                <img
                  className="h-full object-cover"
                  src={item.profileImage}
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800">
                  <div className="flex justify-end lg:items-center pl-2 lg:pl-0 h-full pb-3 lg:font-semibold font-cherrySwash text-lg text-white flex-col ">
                    <h6 className="">{item.username}</h6>
                    <p className="">
                      <span className="text-primary-orange">
                        <CountUp end={item.recipesPosted} enableScrollSpy />
                      </span>{" "}
                      Recipe
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-primary-orange">
                        <CountUp end={item.upvotes} enableScrollSpy />
                      </span>{" "}
                      <BiSolidLike />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
