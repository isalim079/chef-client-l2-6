"use client";

/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React from "react";
import Lottie from "lottie-react";

import subscribeAnimation from "@/assets/animation/hero.json";

const SubscriptionHome = () => {
  const router = useRouter();

  const handleSubscribeClick = () => {
    router.push("/subscription"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative">
          <img
            src="https://images.pexels.com/photos/3761662/pexels-photo-3761662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Subscription"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 p-8 flex flex-col items-center justify-center text-center">
          {/* Lottie Animation */}
          <div className="w-48 mb-3">
            <Lottie animationData={subscribeAnimation} loop={true} />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Unlock Exclusive Content
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            Subscribe now to get access to premium recipes, step-by-step videos,
            and exclusive cooking tips from top chefs.
          </p>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribeClick}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition duration-300"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionHome;
