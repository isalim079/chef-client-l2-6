import AdminSidebar from "@/components/AdminDashboard/AdminSidebar/AdminSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Chef",
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
          <AdminSidebar />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </div>
  );
}
