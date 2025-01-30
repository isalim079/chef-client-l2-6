"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type TSubscriptionInfo = {
  _id: string;
  tnxId: string;
  purchaseTime: string;
  expiryTime: string;
  amount: number;
};
type TUser = {
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
};

type AuthContextType = {
  user: TUser | null;
  token: string | null;
  login: (user: TUser, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); //? new edit

  useEffect(() => {
    setIsClient(true); //? new edit

    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const login = (user: TUser, token: string) => {
    setUser(user);
    setToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  if (!isClient) return null; //? new edit

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
