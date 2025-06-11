/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import aboutUs from "@/assets/animation/aboutUs.json";

import { topFoodLovers } from "./AboutUsData";
import Lottie from "lottie-react";

const AboutUs = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto lg:pt-32 font-poppins">
        {/* ------------------ top section -------------------- */}
        <div className="grid lg:grid-cols-2 items-center lg:gap-10 px-6 lg:px-2">
          <div className="order-last text-gray-800">
            <h1 className="lg:text-5xl text-2xl font-bold uppercase mb-2 font-sourGummy text-end">
              Bringing Food Lovers Together
            </h1>
            <p className=" lg:mx-auto text-end mt-3">
              {" "}
              We aim to make sharing and discovering recipes easy, enjoyable,
              and accessible to everyone. Our platform is designed to empower
              home cooks, culinary enthusiasts, and food lovers by providing a
              space to share their favorite recipes, connect with like-minded
              individuals, and enhance their cooking experiences. Whether you're
              a beginner or a seasoned chef, our community brings people
              together through the joy of food.
            </p>
          </div>
          <div className=" ">
            <Lottie animationData={aboutUs} />
          </div>
        </div>

        {/* ----------------- Our team members ----------------- */}
        <div>
          <h1 className="text-center text-xl lg:text-3xl uppercase mt-10 lg:mt-20 font-bold text-primarySite font-sourGummy">
            Our top food lovers
          </h1>

          <div className="w-full border border-gray-800 mb-10 lg:mb-16 mt-5"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 px-6 lg:px-0">
          {topFoodLovers.map((item, index) => (
            <div
              key={index}
              className="bg-primary-white p-6 rounded-2xl shadow-md hover:scale-[94%] cursor-pointer transition-all duration-200 ease-in-out"
            >
              <img
                className="w-16 h-16 object-cover rounded-full"
                src={item?.image}
                alt=""
              />
              <div className="flex items-center justify-between mt-4">
                <h1 className="font-semibold text-lg">{item?.name}</h1>
                <h1 className="underline font-semibold text-end">
                  {item?.role}
                </h1>
              </div>
              <div className="w-full border border-gray-800 my-3"></div>
              <p className="h-[120px]">{item?.bio}</p>

              <p className="text-2xl font-semibold">
                <span className="font-semibold text-base">Recipe Shared:</span>{" "}
                {item?.recipesShared}
              </p>
              <p className="text-2xl font-semibold text-green-600">
                <span className="font-semibold text-base text-gray-800">
                  Total followers:
                </span>{" "}
                {item?.followers}
              </p>
            </div>
          ))}
        </div>

        {/* --------------- contact information --------------------- */}
        <div className="my-16 px-6 lg:px-0">
          <h2 className="text-3xl font-bold text-primarySite font-sourGummy ">
            Contact Us
          </h2>
          <p className="mt-4">
            We&apos;d love to hear from you! Reach out to us at:
          </p>
          <div className="mt-6 space-y-2">
            <p>
              <strong>Address:</strong> 123 Chef streets, City, Bangladesh
            </p>
            <p>
              <strong>Phone:</strong> +123-456-7890
            </p>
            <p>
              <strong>Email:</strong> contact@chefBD.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
