"use client";
import loadingAnim from "@/assets/animation/loadingV2.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <span>Loading...</span> */}
      <Lottie animationData={loadingAnim} className="w-60" />
    </div>
  );
};

export default Loading;
