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
import Link from "next/link";

export type TSubscriptionInfo = {
  _id: string;
  tnxId: string;
  purchaseTime: string;
  expiryTime: string;
  amount: number;
};

export type TFollowerInfo = {
  following: boolean;
  name: string;
  email: string;
  image: string;
}

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image: string;
  role: "admin" | "user";
  address?: string;
  userType?: "free" | "premium";
  totalSpends?: number;
  subScriptionInfo?: TSubscriptionInfo[];
  followers?: TFollowerInfo[];
};

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}`;

const UserProfileInfo = () => {
  const { user, token } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [findUser, setFindUser] = useState<TUser | null>(null);

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

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
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
      name: data.name ? data.name : findUser?.name,
      address: data.address ? data.address : findUser?.address,
      image: uploadedImageUrl ? uploadedImageUrl : findUser?.image,
    };
    try {
      const res = await axiosPublic.put(
        `/api/users/${user?.email}`,
        updatedInfo,
      );
      if (res.data.success) {
        reset();
        setIsLoading(false);
        toast.success("User profile updated successfully", {
          position: "top-center",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-poppins">
      <h1 className="text-center mt-10 text-3xl font-bold font-sourGummy">
        Welcome to your profile
      </h1>
      <div className="flex justify-between items-center max-w-[920px] mx-auto bg-primary-white p-16 mt-10 rounded-lg shadow-md">
        {/* Left side */}
        <div className="flex flex-col items-start">
          {findUser?.image ? (
            <Image
              className="rounded-full mb-4"
              src={findUser?.image}
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
            <span className="font-bold">Name:</span> {findUser?.name}
          </h6>
          <p className="mt-1">
            <span className="font-bold">Email:</span> {findUser?.email}
          </p>
          <Link className="underline mt-2" href={"/forgot-password"}>
            Change Password?
          </Link>
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
              placeholder={findUser?.name}
              isRequired={false}
            />
            <TextField
              errors={errors}
              inputType="text"
              label="Address"
              name="address"
              register={register}
              classes="mt-4"
              placeholder={findUser?.address}
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
