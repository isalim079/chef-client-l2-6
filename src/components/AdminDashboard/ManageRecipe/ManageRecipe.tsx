/* eslint-disable @next/next/no-img-element */
"use client";

import { TRecipe } from "@/components/RecipeFeed/RecipeInterface";
import Loading from "@/components/shared/Loading/Loading";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import AdminMobileSidebar from "../AdminSidebar/AdminMobileSidebar";
import { HiSquaresPlus } from "react-icons/hi2";

const ManageRecipe = () => {
  const axiosPublic = useAxiosPublic();
  const [allRecipeData, setAllRecipeData] = useState<TRecipe[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const getAllRecipe = async () => {
    setIsLoading(true);
    await axiosPublic.get(`/allRecipes`).then((res) => {
      setAllRecipeData(res.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllRecipe();
  }, []);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/myRecipe/${id}`).then((res) => {
          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            getAllRecipe();
          }
        });
      }
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-10">
          {/* subscription table */}
          <div className="">
            <h1 className="text-center text-2xl font-sourGummy my-10 font-bold text-dark-green underline">
              Manage All Recipes
            </h1>

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
                    <AdminMobileSidebar />
                  </ul>
                </div>
              </div>
            </div>
            {/*  */}

            <div className="w-[280px] mx-auto lg:w-full overflow-x-auto">
              <table className="table  overflow-auto relative -z-10">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Recipe Title</th>
                    <th>Chef Name</th>
                    <th>Chef Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {allRecipeData &&
                    allRecipeData?.map((item, index) => (
                      <tr key={index + 1}>
                        <th>{index + 1}</th>
                        <td>
                          <img className="w-10" src={item.image} alt="" />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
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
        </div>
      )}
    </div>
  );
};

export default ManageRecipe;
