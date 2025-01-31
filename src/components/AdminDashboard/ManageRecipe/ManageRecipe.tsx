/* eslint-disable @next/next/no-img-element */
"use client";

import { TRecipe } from "@/components/RecipeFeed/RecipeInterface";
import Loading from "@/components/shared/Loading/Loading";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import Swal from "sweetalert2";

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
      )}
    </div>
  );
};

export default ManageRecipe;
