/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/context/AuthContext";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  FaHome,
  FaUserFriends,
  FaNewspaper,
} from "react-icons/fa";
import { TRecipe } from "./RecipeInterface";
import { TUser } from "../UserDashboard/UserProfileInfo/UserProfileInfo";

// JSON data for menu items
const menuItems = [
  {
    icon: <FaHome className="mr-2 text-gray-700" />,
    label: "Feed",
    link: "/recipe-feed",
  },
  {
    icon: <FaUserFriends className="mr-2 text-gray-700" />,
    label: "Followers",
    link: "/recipe-feed/followers",
  },
  {
    icon: <FaNewspaper className="mr-2 text-gray-700" />,
    label: "Followings",
    link: "/recipe-feed/followings",
  },
];

const RecipeFeedProfile = () => {
  const { user, token } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [allRecipeData, setAllRecipeData] = useState<TRecipe[]>([]);
  const [allUserData, setAllUserData] = useState<TUser[]>([]);

  const getAllRecipe = async () => {
    await axiosPublic.get(`/allRecipes`).then((res) => {
      setAllRecipeData(res.data.data);
    }); 
  };

  useEffect(() => {
    getAllRecipe();
  }, []);

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

  useEffect(() => {
    getAllUser();
  }, []);

  const filteredUserPost = allRecipeData.filter(
    (userPost) => userPost?.email === user?.email,
  );

  const getLoggedUser = allUserData.find(
    (findUser) => findUser?.email === user?.email,
  );
    // console.log(getLoggedUser);

  return (
    <div className="w-full p-10 bg-white shadow-lg rounded-lg h-screen">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full"
          src={user?.image || "/default-avatar.png"}
          alt="Profile"
        />
        <h6 className="mt-4 text-xl font-bold text-gray-800">{user?.name}</h6>
        <p className="text-sm text-gray-600">{user?.email}</p>
        <p className="text-sm text-gray-500 italic mt-2 text-center">
          I’d love to share my recipe knowledge with others
        </p>
      </div>

      <div className="mt-6 text-center">
        <div className="flex justify-around">
          <div>
            <p className="font-bold text-primary-orange font-cherrySwash text-xl">
              {" "}
              <CountUp
                enableScrollSpy={true}
                end={Number(filteredUserPost?.length)}
              />
            </p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
          <div>
            <p className="font-bold text-primary-orange font-cherrySwash text-xl">
              <CountUp
                enableScrollSpy={true}
                end={Number(getLoggedUser?.followers?.length)}
              />
            </p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div>
            <p className="font-bold text-primary-orange font-cherrySwash text-xl">
              {" "}
              <CountUp
                enableScrollSpy={true}
                end={Number(getLoggedUser?.following?.length)}
              />
            </p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <Link
              href={`${item.link ? item.link : "#"}`}
              key={index}
              className="flex"
            >
              <li className="flex items-center cursor-pointer hover:translate-x-1 transition-all duration-200 ease-in-out">
                {item.icon}
                <span className="text-sm text-gray-700">{item.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-center">
        <Link href={`/${user?.role}-dashboard/profile`}>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeFeedProfile;
