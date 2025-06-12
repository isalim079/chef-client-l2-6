/* eslint-disable @next/next/no-img-element */
"use client";

import { useAuth } from "@/context/AuthContext";
import { HiSquaresPlus } from "react-icons/hi2";
import UserMobileNav from "./UserSidebar/UserMobileNav";

const UserFollower = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="p-10">
      {/* mobile nav */}
      <div className="lg:hidden block fixed right-0 top-5">
        <div className="drawer drawer-end">
          <input
            id="userMobileSidebarDrawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="userMobileSidebarDrawer" className="">
              <p className="p-3 bg-white shadow-md rounded-full w-fit flex ml-auto mr-6">
                <HiSquaresPlus className="text-2xl" />
              </p>
            </label>
          </div>
          <div className="drawer-side z-50 h-full">
            <label
              htmlFor="userMobileSidebarDrawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="bg-gray-800 w-[65%] min-h-full p-6">
              {/* Sidebar content here */}
              <UserMobileNav />
            </ul>
          </div>
        </div>
      </div>
      {/*  */}
      <h1 className="font-sourGummy text-center text-3xl font-bold mb-10">
        Follower List
      </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra relative  -z-20">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {user?.followers &&
                user?.followers?.map((item, index) => (
                  <tr key={index + 1}>
                    <th>{index + 1}</th>
                    <td>
                      <img
                        className="w-16 rounded-full"
                        src={item.image}
                        alt=""
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserFollower;
