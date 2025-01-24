"use client";

import useAxiosPublic from "@/lib/hooks/useAxiosPublic";
import ButtonLoading from "@/utils/ui/ButtonLoading";
import TextField from "@/utils/ui/TextField";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ResetPassPageProps {
  resetToken: string;

  email: string;
}

const ResetPassPage: React.FC<ResetPassPageProps> = ({ resetToken, email }) => {
  console.log(resetToken, email);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    const matchPassword = data.password1 === data.password2;
    console.log(matchPassword);
    if (matchPassword) {
      const userData = {
        email: email,
        password: data.password1,
      };

      await axiosPublic.post("/reset-password", userData).then((res) => {
        if (res.data.success) {
          toast.success("Password reset successfully", {
            position: "top-center",
          });
          reset();
          setIsLoading(false);
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }
      });
    }
  };

  return (
    <div className="pt-10">
      <div className="h-screen flex flex-col justify-center items-center">
        <div>
          <h3 className="mb-10 text-2xl font-bold font-poppins ">
            Reset your password
          </h3>
        </div>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="border max-w-[620px] w-full px-16 py-10 rounded-2xl shadow-md bg-primary-white"
        >
          {/* input 1 */}
          <TextField
            errors={errors}
            inputType="password"
            label="New Password"
            name="password1"
            register={register}
            classes="mt-4"
            placeholder="Password"
          />
          {/* input 2 */}
          <TextField
            errors={errors}
            inputType="password"
            label="Re-type your password"
            name="password2"
            register={register}
            classes="mt-4"
            placeholder="Password"
          />
          <div>
            <button
              type="submit"
              className="bg-dark-green text-white w-full mt-7 py-2 font-poppins rounded-lg"
            >
              <ButtonLoading
                btnName="Submit"
                isLoading={isLoading}
                loadingBtnName="Submitting..."
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassPage;
