"use client";

import { CgSpinnerTwo } from "react-icons/cg";

const ButtonLoading = ({
  isLoading,
  loadingBtnName,
  btnName,
}: {
  isLoading: boolean;
  loadingBtnName: string;
  btnName: string;
}) => {
  return (
    <>
      <span className="flex items-center gap-2 justify-center">
        <CgSpinnerTwo
          className={`${isLoading ? "block" : "hidden"} animate-spin text-lg`}
        />{" "}
        <span className={`${isLoading ? "block" : "hidden"}`}>
          {loadingBtnName}
        </span>{" "}
        <span className={`${isLoading ? "hidden" : "block"}`}>{btnName}</span>
      </span>
    </>
  );
};

export default ButtonLoading;
