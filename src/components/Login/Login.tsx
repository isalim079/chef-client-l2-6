"use client";
import TextField from "@/utils/ui/TextField";
import { FieldValues, useForm } from "react-hook-form";
import logo from "../../assets/logo.png";
import Image from "next/image";
import vegetable from "../../assets/animation/vegetable.json";
import Lottie from "lottie-react";
import Link from "next/link";

const Login = () => {
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
      <div className="grid lg:grid-cols-2 gap-16 max-w-screen-xl mx-auto">
        <div className=" flex justify-center items-center ">
          <Lottie animationData={vegetable} className="" />
        </div>

        {/* Forms */}
        <div className="flex justify-center items-center order-first">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="border max-w-[620px] w-full px-16 py-10 rounded-2xl shadow-md bg-primary-white"
          >
            {/* Logo */}
            <div className="mb-4 flex flex-col justify-center items-center w-full">
              <Image className="w-14" src={logo} alt="logo" />
              <h6 className="font-poppins font-bold text-2xl mt-1 text-dark-green">
                Login
              </h6>
            </div>

            {/* input 1 */}
            <TextField
              errors={errors}
              inputType="email"
              label="Email"
              name="email"
              register={register}
              classes="mt-4"
              placeholder="Enter your Email"
            />
            {/* input 2 */}
            <TextField
              errors={errors}
              inputType="password"
              label="Password"
              name="password"
              register={register}
              classes="mt-4"
              placeholder="Enter your password"
            />

            <div>
                <Link href={'/recoverPassword'}>Forget Password?</Link>
            </div>

            {/* action button */}
            <div>
              <button
                type="submit"
                className="bg-dark-green text-white w-full mt-7 py-2 font-poppins rounded-lg"
              >
                Login
              </button>
              {/* bottom action */}
              <div className="flex items-center gap-2 mt-2 font-poppins">
                <p>Don&apos;t have an account?</p>{" "}
                <Link href={"/register"} className="font-semibold underline">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
