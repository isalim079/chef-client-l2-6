/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Loading from "@/components/shared/Loading/Loading";
import { TUser } from "@/components/UserDashboard/UserProfileInfo/UserProfileInfo";
import { useAuth } from "@/context/AuthContext";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosPublic = useAxiosPublic();
  const {  token } = useAuth();
  const [allUser, setAllUser] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    getAllUser()
  }, [ token]);


  const handleDelete = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/allUser/delete/${userId}`, {
            headers: {
              Authorization: `${token}`,
            },
        }).then((res) => {
          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            getAllUser();
          }
        });
      }
    });
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-10">
          {/* subscription table */}
          <div className="overflow-x-auto">
            <h1 className="text-center text-2xl font-sourGummy my-10 font-bold text-dark-green underline">
              Manage All Recipes
            </h1>
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {allUser &&
                  allUser?.map((item, index) => (
                    <tr key={index + 1}>
                      <th>{index + 1}</th>
                      <td>
                        <img className="w-10" src={item.image} alt="" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.userType}</td>
                      <td>{item.role}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(item._id as string)}
                          className=" p-1 rounded-md shadow-md bg-white"
                        >
                          <RiDeleteBin4Fill className="text-red-600 text-2xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
