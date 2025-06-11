"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from "@/utils/ui/TextField";
import { FieldValues, useForm } from "react-hook-form";
import logo from "../../assets/logo.png";
import Image from "next/image";
import vegetable from "../../assets/animation/vegetable.json";
import Lottie from "lottie-react";
import Link from "next/link";
import { useState } from "react";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ButtonLoading from "@/utils/ui/ButtonLoading";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const axiosPublic = useAxiosPublic();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);

    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axiosPublic.post("/login", userData);

      // console.log(res.data);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.data;
        login(user, token);
        // console.log(res.data.data.role);

        setIsLoading(false);
        toast.success("User Logged in successfully", {
          position: "top-center",
        });

        reset();
        setTimeout(() => {
          router.push(`/`);
          // router.push(`/${user?.role}-dashboard`);
        }, 1500);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      toast.error("Wrong email or password");
    }
  };

  const fillAdminCredentials = () => {
    setValue("email", "mraju2440@gmail.com"); 
    setValue("password", "123456"); 
  };

  const fillUserCredentials = () => {
    setValue("email", "e@mail.com"); 
    setValue("password", "123456"); 
  };

  return (
    <div className="lg:pt-28 pt-0 px-6 lg:px-0">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-screen-xl mx-auto mb-10">
        <div className="flex justify-center items-center order-first lg:order-last ">
          <Lottie animationData={vegetable} className="" />
        </div>

        {/* Forms */}
        <div className="flex justify-center items-center order-first">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="border max-w-[620px] w-full px-6 lg:px-16 py-6 lg:py-10 rounded-2xl shadow-md bg-primary-white"
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

            <div className="flex lg:flex-row flex-col justify-between items-center mt-1">
              <div>
              <button onClick={fillAdminCredentials} className="underline">Admin</button>
              <button onClick={fillUserCredentials} className="underline ml-2">User</button>
              </div>
              <Link className="underline" href={"/forgot-password"}>
                Forgot Password?
              </Link>
            </div>

            {/* action button */}
            <div>
              <button
                type="submit"
                className="bg-dark-green text-white w-full mt-7 py-2 font-poppins rounded-lg"
              >
                <ButtonLoading
                  btnName="Login"
                  isLoading={isLoading}
                  loadingBtnName="Logging in..."
                />
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
