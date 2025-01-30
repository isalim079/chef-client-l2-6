/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAuth } from "@/context/AuthContext";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import withAuth from "@/utils/withAuth";
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";

const CreateRecipe = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const editor = useRef(null);

  const [content, setContent] = useState("");

  const imageName = watch("image");

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}`;

  const onSubmit = async (data: any) => {
    setLoading(true);
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(image_hosting_api, formData);

      if (res.data.success) {
        const imageUrl = res.data.data.url;
        const recipeDetails = {
          image: imageUrl,
          title: data.title,
          recipe: content,
          email: user?.email,
          name: user?.name,
          profileImg: user?.image,
        };

        await axiosPublic.post("/recipeFeed", recipeDetails).then((res) => {
          if (res.data.success) {
            toast.success("Recipe created successfully");
            reset();
            setContent("");
            setLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-primary-white p-14 shadow-md">
        <div className="max-w-[920px] mx-auto ">
          {/* title container */}
          <div className="mb-10 mt-20">
            <h1 className="text-4xl font-bold font-sourGummy text-center uppercase text-dark-green">
              Create your recipe
            </h1>
            <p className="text-center text-lg font-semibold">
              Let the world know your talent
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* field 1 */}
            <div className="mb-4">
              <input
                className="border rounded-md p-2 w-full"
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-600 mt-2">This field is required</p>
              )}
            </div>

            {/* field 2 */}
            <div>
              <JoditEditor
                className=""
                ref={editor}
                value={content}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>

            {/* field 3 */}
            <div className=" relative  border rounded-md p-2 w-full mt-4 bg-white">
              <input
                type="file"
                placeholder="Image *"
                className="p-3 rounded-md w-full opacity-0 relative z-20 cursor-pointer"
                {...register("image")}
              />
              <div className=" flex items-center gap-5 absolute inset-0 left-3 text-black">
                <FaFileUpload className="text-3xl " />
                <p>{imageName ? imageName[0]?.name : "Upload recipe image"}</p>
              </div>
            </div>

            {/* submit button */}
            <div>
              <button className="bg-dark-green py-3 w-full mt-4 text-white font-semibold rounded-md shadow-md">
                {loading ? (
                  <p className="flex flex-row justify-center items-center gap-3">
                    <span className="loading loading-dots loading-lg"></span>
                  </p>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CreateRecipe);
