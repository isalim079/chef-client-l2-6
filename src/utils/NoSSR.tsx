"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { ReactNode } from "react";

const NoSSR = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false });
