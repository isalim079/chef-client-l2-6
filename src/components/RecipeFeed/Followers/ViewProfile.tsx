/* eslint-disable @next/next/no-img-element */
"use client";

import { TUser } from "@/components/UserDashboard/UserProfileInfo/UserProfileInfo";
import { useAuth } from "@/context/AuthContext";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaUser, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { TRecipe } from "@/components/RecipeFeed/RecipeInterface";
import Loading from "@/components/shared/Loading/Loading";

const ViewProfile = ({ followerEmail }: { followerEmail: string }) => {
  const { token } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [allUserData, setAllUserData] = useState<TUser[]>([]);
  const [filterUser, setFilterUser] = useState<TUser | null>(null);
  const [userRecipes, setUserRecipes] = useState<TRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all users
  const getAllUser = async () => {
    await axiosPublic
      .get(`/api/users`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setAllUserData(res.data.data);
      });
  };

  // Fetch user recipes
  const getUserRecipes = async () => {
    await axiosPublic
      .get(`/allRecipes`)
      .then((res) => {
        const filteredRecipes = res.data.data.filter(
          (recipe: TRecipe) => recipe.email === followerEmail,
        );
        setUserRecipes(filteredRecipes);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllUser();
    getUserRecipes();
  }, []);

  // Find the user based on followerEmail
  useEffect(() => {
    if (allUserData.length > 0) {
      const user = allUserData.find((user) => user.email === followerEmail);
      if (user) {
        setFilterUser(user);
      }
    }
  }, [allUserData, followerEmail]);

  if (isLoading) {
    return <Loading />;
  }

  if (!filterUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">User not found</h2>
          <p className="text-gray-600 mt-2">
            The user you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  //   console.log(userRecipes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="relative">
          <div className="">
            <img
              className="h-[320px] w-full object-cover"
              src="https://i.ibb.co/W4D4jVyd/photo-1622737133809-d95047b9e673-q-80-w-1932-auto-format-fit-crop-ixlib-rb-4-0.jpg"
              alt="bg image"
            />
          </div>
          <div className="absolute inset-0 p-6 rounded-lg shadow-md text-center bg-black/50">
            <div className="flex justify-center ">
              <Image
                src={filterUser.image || "/default-avatar.png"}
                alt={filterUser.name}
                width={120}
                height={120}
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mt-4">
              {filterUser.name}
            </h1>
            <p className="text-sm text-white">{filterUser.email}</p>

            {/* Follow Button */}
            <button className="mt-4 bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition-colors duration-300 font-semibold">
              Follow
            </button>
          </div>
        </div>

        {/* User Details */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About Me</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FaUser className="text-gray-800" />
              <p className="text-sm text-gray-600">
                {filterUser?.bio || "No bio available"}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-gray-800" />
              <p className="text-sm text-gray-600">
                {filterUser?.address || "Location not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* User Recipes/Posts */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recipes</h2>
          {userRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userRecipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
                >
                  <Image
                    src={recipe.image || "/default-recipe.png"}
                    alt={recipe.title}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <FaHeart className="text-red-500" />
                    <p className="text-sm text-gray-600">
                      {recipe.upvote?.filter((vote) => vote.upvote).length || 0}{" "}
                      Likes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-600">No recipes found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
