"use client";

import axios from "axios";

// http://localhost:5000
// https://recipe-sharing-community-server-dun.vercel.app/

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "http://localhost:5000",
  });

  return instance;
};

export default useAxiosPublic;
