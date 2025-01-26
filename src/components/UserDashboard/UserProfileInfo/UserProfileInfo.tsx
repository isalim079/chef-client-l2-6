"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import userIcon from "@/assets/animation/user.json";
import Lottie from "lottie-react";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextField from "@/utils/ui/TextField";
import ButtonLoading from "@/utils/ui/ButtonLoading";
import toast from "react-hot-toast";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}`;

const UserProfileInfo = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

 const [userList, setUserList] = useState([])

 useEffect(() => {
    axiosPublic.get(`/api/users`).then((res) => {
      setUserList(res.data.data);
    });

 }, [])
 console.log(userList);


  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true)
    let uploadedImageUrl = user?.image;

    const imageFile = { image: data.profileImage[0] };
    if (imageFile.image) {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      uploadedImageUrl = res.data.data.display_url;
    }
    const updatedInfo = {
      name: data.name ? data.name : user?.name,
      address: data.address ? data.address : user?.address,
      image: uploadedImageUrl ? uploadedImageUrl : user?.image,
    };
    try {
        const res = await axiosPublic.put(`/api/users/${user?.email}`, updatedInfo);
        if(res.data.success) {
            reset()
            setIsLoading(false)
            toast.success("User profile updated successfully", {
                position: "top-center",
            });
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="font-poppins">
      <div className="flex justify-between items-center max-w-[920px] mx-auto bg-primary-white p-16 mt-10">
        {/* Left side */}
        <div className="flex flex-col items-start">
          {user?.image ? (
            <Image
              className="rounded-full mb-4"
              src={user?.image}
              width={100}
              height={100}
              alt="profile picture"
            />
          ) : (
            <div className="w-44">
              <Lottie animationData={userIcon} />
            </div>
          )}
          <h6 className="">
            <span className="font-bold">Name:</span> {user?.name}
          </h6>
          <p className="mt-1">
            <span className="font-bold">Email:</span> {user?.email}
          </p>
        </div>
        {/* Right side */}
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              errors={errors}
              inputType="text"
              label="Name"
              name="name"
              register={register}
              classes=""
              placeholder={user?.name}
              isRequired={false}
            />
            <TextField
              errors={errors}
              inputType="text"
              label="Address"
              name="address"
              register={register}
              classes="mt-4"
              placeholder={user?.address}
              isRequired={false}
            />

            <div className="flex flex-col gap-3 mt-4">
              <label className="font-semibold" htmlFor="profileImage">
                Profile Image
              </label>
              <input
                className="p-3 rounded-md border border-black/50 w-full"
                type="file"
                {...register("profileImage")}
                id=""
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-gray-800 text-primary-white py-2 rounded-md"
            >
              <ButtonLoading
                btnName="Update"
                isLoading={isLoading}
                loadingBtnName="Updating..."
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
