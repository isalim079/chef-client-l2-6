"use client";
import Image from "next/image";
import logo from "../../../assets/logoW.png";
import Link from "next/link";
import { HiUser, HiUserGroup } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { BiLogOut } from "react-icons/bi";

// import withAuth from "@/utils/withAuth";
import { MdDashboard } from "react-icons/md";

const AdminMobileSidebar = () => {
  const { logout } = useAuth();

  return (
    <div>
      <div className="">
        <div className="bg-gray-800 h-screen font-poppins ">
          <div className="flex justify-center">
            <Link href={"/"}>
              <Image src={logo} width={70} height={70} alt="logo" />
            </Link>
          </div>
          <div className="text-primary-white flex flex-col gap-1 mt-6">
            <Link
              className="p-2 flex items-center gap-2"
              href="/admin-dashboard"
            >
              <MdDashboard className="text-lg" /> Dashboard
            </Link>
            <Link
              className="p-2 flex items-center gap-2"
              href="/admin-dashboard/manage-recipe"
            >
              <HiUser className="text-lg" /> Manage Recipe
            </Link>
            <Link
              className="p-2 flex items-center gap-2"
              href="/admin-dashboard/manage-user"
            >
              <HiUserGroup className="text-lg" /> Manage User
            </Link>

            <button
              onClick={() => logout()}
              className="p-2 flex items-center gap-2"
            >
              <BiLogOut className="text-lg" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMobileSidebar;
