/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { videoRecipeData } from "./VideoRecipeData";

const VideoRecipe = () => {
  const [selectedVideo, setSelectedVideo] = useState(videoRecipeData[0]);

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
  };

  return (
    <div className="font-poppins py-16 lg:py-20 px-6 lg:px-0">
      <div className="max-w-screen-xl mx-auto">
        {/* title section */}
        <div className="text-gray-800">
          <h1 className="lg:text-5xl text-2xl font-bold text-center font-cherrySwash">
            Cooking Made Cinematic 🎥✨
          </h1>
          <p className="lg:text-xl lg:mt-4 text-center max-w-[680px] mx-auto">
            Dive into our sizzling video recipes—where every dish gets the
            blockbuster treatment. Watch, cook, and wow your taste buds!
          </p>
        </div>

        {/* video data */}
        <div className="">
          <div className="flex flex-col lg:flex-row gap-6 p-6 mt-14">
            {/* Left Side: Main Video Player */}
            <div className="lg:w-2/3">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedVideo.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedVideo.time} · {selectedVideo.steps} · Recipe by{" "}
                  {selectedVideo.author}
                </p>
              </div>
            </div>

            {/* Right Side: Video Cards */}
            <div className="lg:w-1/3 space-y-4 h-[520px] overflow-y-auto">
              {videoRecipeData.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 bg-gray-800  ${
                    selectedVideo.id === video.id
                      ? "bg-gray-800 shadow-md text-white"
                      : "hover:bg-gray-900 text-white"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-16 relative flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="rounded-lg object-cover w-24 h-16"
                    />
                  </div>

                  {/* Video Details */}
                  <div>
                    <h3 className="text-lg font-semibold ">{video.title}</h3>
                    <p className="text-sm text-gray-300 mt-3">
                      {video.time} · {video.steps}
                    </p>
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

export default VideoRecipe;
