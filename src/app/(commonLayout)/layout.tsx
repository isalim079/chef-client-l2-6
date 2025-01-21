import Navbar from "@/components/shared/Navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chef",
  description: "Recipe Sharing Community",
};

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
