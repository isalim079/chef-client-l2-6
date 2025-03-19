"use client";
import { useMemo } from "react"; //? new edit
import axios from "axios";

// http://localhost:5000
// https://recipe-sharing-community-server-dun.vercel.app

const useAxiosPublic = () => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: "https://recipe-sharing-community-server-dun.vercel.app",
    });
  }, []);

  return instance;
};

export default useAxiosPublic;
