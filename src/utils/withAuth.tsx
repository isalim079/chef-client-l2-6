"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Loading from "@/components/shared/Loading/Loading";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect, ComponentType, useState } from "react";
import toast from "react-hot-toast";

interface WithAuthProps {
  [key: string]: any;
}

const withAuth = (WrappedComponent: ComponentType<WithAuthProps>) => {
  const AuthComponent = (props: WithAuthProps) => {
    const { user } = useAuth();
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (isHydrated && !user) {
        toast.error("You need to login first");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    }, [user, router, isHydrated]);

    if (!isHydrated || !user) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthComponent;
};

export default withAuth;
