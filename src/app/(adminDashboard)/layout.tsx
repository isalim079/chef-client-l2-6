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
  return <div>{children}</div>;
}
