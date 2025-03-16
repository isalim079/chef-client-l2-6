"use client";

import { TFollowerInfo, useAuth } from "@/context/AuthContext";
import { FaUserFriends, FaSadTear } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { TUser } from "@/components/UserDashboard/UserProfileInfo/UserProfileInfo";
import Loading from "@/components/shared/Loading/Loading";
import Link from "next/link";
import toast from "react-hot-toast";

const Followings = () => {
  const axiosPublic = useAxiosPublic();
  const { user, token } = useAuth();
  const [followings, setFollowings] = useState<TFollowerInfo[]>([]);
  const [allUser, setAllUser] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followingDetails, setFollowingDetails] = useState<TUser[]>([]);

  // Fetch all users
  const getAllUser = async () => {
    setIsLoading(true);
    await axiosPublic
      .get(`/api/users`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setAllUser(res.data.data);
        setIsLoading(false);
      });
  };

  // Match followings with allUser to get full details
  useEffect(() => {
    if (followings.length > 0 && allUser.length > 0) {
      const matchedFollowings = followings
        .map((following) => {
          const userInfo = allUser.find(
            (user) => user.email === following.email,
          );
          return userInfo ? userInfo : null;
        })
        .filter((user) => user !== null) as TUser[]; // Filter out null values
      setFollowingDetails(matchedFollowings);
    }
  }, [followings, allUser]);

  // Fetch followings from the logged-in user
  useEffect(() => {
    const findUserFollowings = allUser.find(
      (findUser) => findUser?.email === user?.email,
    );
    if (findUserFollowings?.following) {
      setFollowings(findUserFollowings.following);
    }
  }, [allUser, user]);

  // Fetch all users on component mount
  useEffect(() => {
    getAllUser();
  }, [token]);

  // Handle unfollow
  const handleUnfollow = async (followingEmail: string) => {
    try {
      const res = await axiosPublic.delete("/api/users/unfollow", {
        headers: {
          Authorization: `${token}`,
        },
        data: {
          userEmail: user?.email, // Logged-in user's email
          followingEmail, // Email of the user to unfollow
        },
      });

      if (res.data.success) {
        toast.success("Unfollowed successfully");
        // Update the UI by removing the unfollowed user from the list
        setFollowings((prev) => prev.filter((f) => f.email !== followingEmail));
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("Error unfollowing user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaUserFriends className="mr-2 text-gray-800" />
          Followings
        </h1>

        {isLoading ? (
          <Loading />
        ) : followingDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {followingDetails.map((following, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Profile Picture */}
                  <Image
                    src={following.image || "/default-avatar.png"}
                    alt={following.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover"
                  />

                  {/* Name and Email */}
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {following.name}
                    </h2>
                    <p className="text-sm text-gray-600">{following.email}</p>
                  </div>

                  {/* View Profile and Unfollow Buttons */}
                  <div className="flex space-x-4">
                    <Link
                      href={`/recipe-feed/view-profile/${following?.email}`} // Update the link as needed
                      className="w-full"
                    >
                      <button className="border border-gray-800 px-2 py-1 rounded-md hover:bg-gray-800 transition-all duration-200 ease-in-out hover:text-white">
                        View Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => handleUnfollow(following.email)}
                      className="border border-gray-800 px-2 py-1 rounded-md hover:bg-gray-800 transition-all duration-200 ease-in-out hover:text-white"
                    >
                      Unfollow
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center bg-white p-8 rounded-lg shadow-md">
              <FaSadTear className="text-6xl text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">
                You are not following anyone yet.
              </h2>
              <p className="text-gray-600 mt-2">
                Start connecting with others to grow your network!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Followings;
