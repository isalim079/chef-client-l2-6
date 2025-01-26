import UserSidebar from "@/components/UserDashboard/UserSidebar/UserSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard - Chef",
  description: "Recipe sharing community",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
     <div className="grid grid-cols-12">
          <div className="col-span-2">
            <UserSidebar />
          </div>
          <div className="col-span-10">{children}</div>
        </div>
    </div>
  );
}