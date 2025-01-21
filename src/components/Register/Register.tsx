"use client";

import TextField from "@/utils/ui/TextField";
import { FieldValues, useForm } from "react-hook-form";
import logo from "../../assets/logo.png";
import Image from "next/image";
import cycling from "../../assets/animation/girlCycling.json";
import Lottie from "lottie-react";
import Link from "next/link";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="pt-28">
      <div className="grid lg:grid-cols-2 max-w-screen-xl mx-auto">
        <div className=" flex justify-center items-center">
          <Lottie animationData={cycling} className="" />
        </div>

        {/* Forms */}
        <div className="flex justify-center items-center">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="border max-w-[620px] w-full px-16 py-10 rounded-2xl shadow-md bg-primary-white"
          >
            {/* Logo */}
            <div className="mb-4 flex flex-col justify-center items-center w-full">
              <Image className="w-14" src={logo} alt="logo" />
              <h6 className="font-poppins font-bold text-2xl mt-1 text-dark-green">
                Register
              </h6>
            </div>

            {/* input 1 */}
            <TextField
              errors={errors}
              inputType="text"
              label="Name"
              name="name"
              register={register}
              classes=""
              placeholder="Enter your name"
            />
            {/* input 2 */}
            <TextField
              errors={errors}
              inputType="email"
              label="Email"
              name="email"
              register={register}
              classes="mt-4"
              placeholder="Enter your Email"
            />
            {/* input 3 */}
            <TextField
              errors={errors}
              inputType="password"
              label="Password"
              name="password"
              register={register}
              classes="mt-4"
              placeholder="Enter your password"
            />
            {/* input 4 */}
            <div className="flex flex-col gap-3 mt-4">
              <label className="font-semibold" htmlFor="profileImage">
                * Profile Image
              </label>
              <input
                className="p-3 rounded-md border border-black/50 w-full"
                type="file"
                {...register("profileImage")}
                id=""
              />
            </div>

            {/* action button */}
            <div>
              <button
                type="submit"
                className="bg-dark-green text-white w-full mt-7 py-2 font-poppins rounded-lg"
              >
                Register
              </button>
              {/* bottom action */}
              <div className="flex items-center gap-2 mt-2 font-poppins">
                <p>Already have an account?</p>{" "}
                <Link href={"/login"} className="font-semibold underline">
                  Login to your account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
