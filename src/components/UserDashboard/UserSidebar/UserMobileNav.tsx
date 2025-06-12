"use client";

import Image from "next/image";
import logo from "../../../assets/logoW.png";
import Link from "next/link";
import { HiHome, HiUser, HiUserGroup } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import { RiUserFollowFill } from "react-icons/ri";
import withAuth from "@/utils/withAuth";
const UserMobileNav = () => {
  const { logout } = useAuth();

  return (
    <div className="">
      <div className="w-full">
        <div className="font-poppins">
          <div className="flex justify-center">
            <Link href={"/"}>
              <Image src={logo} width={70} height={70} alt="logo" />
            </Link>
          </div>
          <div className="text-primary-white flex flex-col gap-3 mt-10 text-2xl">
            <Link
              className="p-2 flex items-center gap-4"
              href={`/user-dashboard`}
            >
              <HiHome className="text-2xl" /> Dashboard
            </Link>
            <Link
              className="p-2 flex items-center gap-4"
              href="/user-dashboard/profile"
            >
              <HiUser className="text-2xl" /> Profile
            </Link>
            <Link
              className="p-2 flex items-center gap-4"
              href="/user-dashboard/followers"
            >
              <HiUserGroup className="text-2xl" /> Followers
            </Link>
            <Link
              className="p-2 flex items-center gap-4"
              href={"/subscription"}
            >
              <RiUserFollowFill className="text-2xl" /> Subscribe
            </Link>
            <button
              onClick={() => logout()}
              className="p-2 flex items-center gap-4"
            >
              <BiLogOut className="text-2xl" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(UserMobileNav);
