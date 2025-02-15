"use client";

import { communityData } from "@/utils/SectionData";
import Lottie from "lottie-react";
import { useState } from "react";
import Marquee from "react-fast-marquee";

const OurCommunity = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
  };
  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div className=" font-poppins py-16 lg:py-28 px-6 lg:px-0">
      <div className="max-w-screen-xl mx-auto">
        {/* title section */}
        <div className="text-gray-800">
          <h1 className="lg:text-5xl text-2xl font-bold text-center font-cherrySwash">
            What’s Cooking in Our Community?
          </h1>
          <p className="lg:text-xl lg:mt-4 text-center ">
            Explore trending recipes, exciting events, and inspiring stories
            from our passionate cooking community.
          </p>
        </div>

        <Marquee className="mt-16 " autoFill>
          {communityData?.map((item, index) => (
            <div
              key={index}
              className={` bg-gray-800 p-8 max-w-[720px] h-[380px] flex flex-col justify-between items-center rounded-lg cursor-pointer mr-10 ${
                isHovered === index &&
                ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
               <div className={` mx-auto  `}>
                <Lottie
                  className={`w-52 border-2 border-primary-orange p-2 rounded-lg shadow-[4px_4px_8px_0px_#facc15] ${
                    isHovered === index &&
                    ""
                  }`}
                  animationData={item?.image}
                />
              </div>
              <div className={`text-white mt-7 text-center`}>
                <p className="text-xl lg:text-2xl text-primary-orange font-bold mb-4 font-cherrySwash">
                  {item.title}
                </p>
                <p className="">{item.description}</p>
              </div>
             
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default OurCommunity;
