/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/context/AuthContext";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { TUser } from "./UserProfileInfo/UserProfileInfo";
import MonthlyTransactionChart from "./UserCharts/MonthlyTransactionChart";
import FollowerFollowingChart from "./UserCharts/FollowerFollowingChart";
import TotalRecipesChart from "./UserCharts/TotalRecipesChart";
import { FaUserPlus, FaBook, FaDollarSign } from "react-icons/fa"; // Importing React Icons

const UserDashboard = () => {
  const { user, token } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [myRecipe, setMyRecipe] = useState([]);
  const [findUser, setFindUser] = useState<TUser | null>(null);

  useEffect(() => {
    axiosPublic.get(`/myRecipe?email=${user?.email}`).then((res) => {
      setMyRecipe(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      axiosPublic
        .get(`/api/getMe/${user?.email}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          setFindUser(res.data.data);
        });
    }
  }, [user, token]);

  return (
    <div className="font-poppins p-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center flex-col">
          <img className="w-20 rounded-full" src={user?.image} alt="" />
          <h6 className="font-semibold text-lg mt-1">{user?.name}</h6>
        </div>
        <div>
          <h6 className="text-3xl font-semibold">Welcome {user?.name}</h6>
          <p className="text-end text-lg font-semibold underline">
            {user?.email}
          </p>
        </div>
      </div>
      <div className="w-full border border-dark-green my-5"></div>

      {/* cards */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Subscription Card */}
        <div className="card bg-gray-800 p-10 text-white transform transition-all duration-500 hover:scale-105">
          <div className="flex justify-center">
            <FaDollarSign className="text-4xl mb-4 animate-bounce" />
          </div>
          <h6 className="font-bold text-2xl text-center">Subscription</h6>
          <p className="text-lg text-center mt-4">
            {user?.userType === "free" ? (
              "You have not subscribed to our membership"
            ) : (
              <span>
                <span className="underline font-semibold text-green-200">
                  Congratulations!
                </span>{" "}
                You have subscribed to our premium membership
              </span>
            )}
          </p>
        </div>

        {/* Recipe Card */}
        <div className="card bg-gray-800 p-10 text-white transform transition-all duration-500 hover:scale-105 ">
          <div className="flex justify-center">
            <FaBook className="text-4xl mb-4 animate-spin-slow" />
          </div>
          <h6 className="font-bold text-2xl">Total Recipe</h6>
          <p className="text-lg mt-4">
            You have created a total of{" "}
            <span className="text-xl font-bold">{myRecipe?.length}</span>{" "}
            recipes!
          </p>
        </div>

        {/* Follower Card */}
        <div className="card bg-gray-800 p-10 text-white transform transition-all duration-500 hover:scale-105">
          <div className="flex justify-center">
            <FaUserPlus className="text-4xl mb-4 animate-pulse" />
          </div>
          <h6 className="font-bold text-2xl">Total Followers</h6>
          <p className="text-lg mt-4">
            {" "}
            <span className="text-xl font-bold">
              {user?.followers ? user.followers.length : 0}
            </span>{" "}
            people follow you!
          </p>
        </div>
      </div>

      {/* charts */}
      <div className="grid lg:grid-cols-2 gap-10 mt-10">
        <MonthlyTransactionChart />
        <FollowerFollowingChart />
        <TotalRecipesChart />
      </div>

      {/* subscription table */}
      <div className="overflow-x-auto mt-10">
        <h1 className="text-center text-2xl font-sourGummy my-10 font-bold text-dark-green underline">
          Subscription Details
        </h1>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>TnxID</th>
              <th>Purchase Time</th>
              <th>Expiry Time</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {findUser?.subScriptionInfo &&
              findUser?.subScriptionInfo?.map((item, index) => (
                <tr key={index + 1}>
                  <th>{index + 1}</th>
                  <td>{item.tnxId}</td>
                  <td>{item.purchaseTime}</td>
                  <td>{item.expiryTime}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;