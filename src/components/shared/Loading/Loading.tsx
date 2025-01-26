"use client";

import Lottie from "lottie-react";
import loading from "../../../assets/animation/loadingV2.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie className="w-64" animationData={loading} />
    </div>
  );
};

export default Loading;
