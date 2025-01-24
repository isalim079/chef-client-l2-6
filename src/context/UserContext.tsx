
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import useAxiosPublic from "@/lib/hooks/useAxiosPublic";

type TUser = {
    _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  address?: string;
  token: string;
} | null;

type UserContextType = {
  user: TUser;
  setUser: (user: TUser) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser>(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/loggedUserInfo")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
