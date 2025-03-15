"use client";

import { TFollowerInfo, useAuth } from "@/context/AuthContext";
import { FaUserFriends, FaSadTear } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { TUser } from "@/components/UserDashboard/UserProfileInfo/UserProfileInfo";
import Loading from "@/components/shared/Loading/Loading";
import Link from "next/link";

const Followers = () => {
  const axiosPublic = useAxiosPublic();
  const { user, token } = useAuth();
  const [followers, setFollowers] = useState<TFollowerInfo[]>([]);
  const [allUser, setAllUser] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followerDetails, setFollowerDetails] = useState<TUser[]>([]);

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

  // Match followers with allUser to get full details
  useEffect(() => {
    if (followers.length > 0 && allUser.length > 0) {
      const matchedFollowers = followers
        .map((follower) => {
          const userInfo = allUser.find((user) => user.email === follower.email);
          return userInfo ? userInfo : null;
        })
        .filter((user) => user !== null) as TUser[]; // Filter out null values
      setFollowerDetails(matchedFollowers);
    }
  }, [followers, allUser]);

  // Fetch followers from the logged-in user
  useEffect(() => {
    if (user?.followers) {
      setFollowers(user.followers);
    }
  }, [user]);

  // Fetch all users on component mount
  useEffect(() => {
    getAllUser();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaUserFriends className="mr-2 text-primary-orange" />
          Followers
        </h1>

        {isLoading ? (
          <Loading />
        ) : followerDetails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {followerDetails.map((follower, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Profile Picture */}
                  <Image
                    src={follower.image || "/default-avatar.png"}
                    alt={follower.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover"
                  />

                  {/* Name and Email */}
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {follower.name}
                    </h2>
                    <p className="text-sm text-gray-600">{follower.email}</p>
                  </div>

                  {/* Profile Button */}
                  <Link
                    href={`/recipe-feed/view-profile/${follower?.email}`} 
                    className="w-full"
                  >
                    <button className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center bg-white p-8 rounded-lg shadow-md">
              <FaSadTear className="text-6xl text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">
                You have no followers yet.
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

export default Followers;