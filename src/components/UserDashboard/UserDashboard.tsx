/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/context/AuthContext";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [myRecipe, setMyRecipe] = useState([]);

  useEffect(() => {
    axiosPublic.get(`/myRecipe?email=${user?.email}`).then((res) => {
      setMyRecipe(res.data.data);
    });
  }, []);

  console.log(user?.subScriptionInfo);

  return (
    <div className="font-poppins  p-10 ">
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
        {/* subscription card */}
        <div className="bg-primary-white p-10">
          <h6 className=" font-bold text-2xl text-center">Subscription</h6>
          <p className="text-lg text-center mt-4">
            {user?.userType === "free" ? (
              "You have not subscribe to our membership"
            ) : (
              <span>
                <span className="underline font-semibold text-green-600">
                  Congratulations!
                </span>{" "}
                You have subscribe to our premium membership
              </span>
            )}
          </p>
        </div>
        {/* Recipe card */}
        <div className="bg-primary-white p-10 text-center">
          <h6 className=" font-bold text-2xl">Total Recipe</h6>
          <p className="text-lg mt-4">
            You have created total{" "}
            <span className="text-xl font-bold">{myRecipe?.length}</span>{" "}
            recipe!
          </p>
        </div>
        {/* subscription card */}
        <div className="bg-primary-white p-10 text-center">
          <h6 className=" font-bold text-2xl">Total Followers</h6>
          <p className="text-lg mt-4">
            {" "}
            <span className="text-xl font-bold">
              {user?.followers ? user.followers.length : 0}
            </span>{" "}
            people follows you!
          </p>
        </div>
      </div>

      {/* subscription table */}
      <div className="overflow-x-auto">
        <h1 className="text-center text-2xl font-sourGummy my-10 font-bold text-dark-green underline">Subscription Details</h1>
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
             {user?.subScriptionInfo && user?.subScriptionInfo?.map((item, index) => ( <tr key={index + 1}>
                <th>{index+1}</th>
                <td>{item.tnxId}</td>
                <td>{item.purchaseTime}</td>
                <td>{item.expiryTime}</td>
              </tr>))}
             
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default UserDashboard;
