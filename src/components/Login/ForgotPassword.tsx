/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ButtonLoading from "@/utils/ui/ButtonLoading";
import TextField from "@/utils/ui/TextField";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const [allUserEmail, setAllUserEmail] = useState<{ email: string }[]>([]);

  useEffect(() => {
    axiosPublic.get("/api/users/email").then((res) => {
      setAllUserEmail(res.data.data);
    });
  }, []);

  const onSubmit = async (data: FieldValues) => {
    // setIsLoading(true);

    const resetLink = `${window.location.origin}/reset-password/${Math.random()
      .toString(36)
      .substr(2, 10)}?email=${data.email}`;

    console.log(resetLink);

    const matchedEmail = await allUserEmail?.find(
      (item) => item?.email === data.email
    );

    const formData = {
      to_email: data.email,
      reset_link: resetLink,
    };

    if (matchedEmail) {
      emailjs
        .send(
          `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`, // service id
          `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`, // template id
          formData,
          `${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}` // public key
        )
        .then(
          () => {
            toast.success("Password reset email sent successfully");
            setIsLoading(false);
            reset();
          },
          (error) => {
            // console.log(error);
            console.log("FAILED...", error.text);
          }
        );
    } else {
      toast.error("Email not found");
    }
  };

  return (
    <div>
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
            inputType="email"
            label="Email"
            name="email"
            register={register}
            classes="mt-4"
            placeholder="Enter your Email"
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

export default ForgotPassword;
