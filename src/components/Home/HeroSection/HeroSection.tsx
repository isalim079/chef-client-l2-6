"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightCircle } from "react-icons/bs";
import { heroData } from "./HeroData";
import Marquee from "react-fast-marquee";
import Lottie from "lottie-react";
import starAnim from "@/assets/animation/star.json";

const HeroSection = () => {
  return (
    <div>
      <div className="font-poppins relative">
        {/* background image */}
        <div>
          <Image
            alt="Banner Image"
            width={100}
            height={400}
            src="https://i.ibb.co.com/hJQZMGMC/heroBg.jpg"
            layout="responsive"
          />
        </div>
        <div className="bg-black/50 absolute inset-0 flex justify-center items-center text-white">
          <div className="grid grid-cols-2 max-w-screen-xl mx-auto">
            <div className=" px-6 lg:px-0 ">
              <div className="flex-1 flex flex-col justify-start">
                <h1 className="text-2xl lg:text-5xl font-bold  text-center lg:text-start font-cherrySwash ">
                  Welcome to the Recipe Sharing Community
                </h1>
                <p className="text-lg lg:max-w-[75%] mt-3 lg:mt-7  text-justify lg:text-start">
                  Discover, Share, and Organize Your Favorite Recipes with Cooks
                  from Around the World.
                </p>
                <div className=" mt-6 lg:mt-14 flex justify-center lg:justify-start mb-10 lg:mb-0">
                  <Link href={"/recipe-feed"}>
                    {" "}
                    <button className="border border-white text-white px-4 py-3 rounded-md flex items-center gap-3 font-bold ">
                      Recipe Feed{" "}
                      <BsArrowRightCircle className="text-white text-xl motion-preset-wobble " />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* right side */}
            <div>
              <Marquee className="" autoFill pauseOnHover>
                {heroData.map((item) => (
                  <div className="mr-5 rounded-lg relative" key={item.id}>
                    <Image
                      src={item.image}
                      className="rounded-lg"
                      alt=""
                      width={300}
                      height={100}
                    />
                    <div className="absolute inset-0 flex items-end">
                      <div className="bg-black/70 p-5 h-[30%] w-full rounded-b-lg flex justify-center items-center relative">
                        <h5 className="text-center font-cherrySwash font-bold text-xl">
                          {item.title}
                        </h5>
                        <div className="absolute -top-8 px-5 w-full flex items-center justify-between">
                          <div className="flex items-center font-cherrySwash font-bold text-lg text-black bg-white px-3 rounded-lg">
                            <span>{item.rating}</span>{" "}
                            <Lottie animationData={starAnim} className="w-10" />
                          </div>
                          <div className="">
                            <p className="font-cherrySwash font-bold text-lg text-black bg-white px-3 py-[8px] rounded-lg">
                              {item.cook_time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default HeroSection;
export default dynamic(() => Promise.resolve(HeroSection), { ssr: false });
