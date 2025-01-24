"use client";

import Image from "next/image";
import logo from "../../../assets/logoW.png";
import Link from "next/link";
import { HiHome, HiUser, HiUserGroup } from "react-icons/hi";
const UserSidebar = () => {
  return (
    <div className="">
      <div className="bg-gray-800 h-screen p-6 font-poppins">
        <div className="flex justify-center">
            <Image src={logo} width={70} height={70} alt="logo" />
        </div>
        <div className="text-primary-white flex flex-col gap-1 mt-6">
            <Link className="p-2 flex items-center gap-2" href="/"><HiHome className="text-lg" /> Home</Link>
            <Link className="p-2 flex items-center gap-2" href="/user-dashboard/profile"><HiUser className="text-lg" /> Profile</Link>
            <Link className="p-2 flex items-center gap-2" href="/user-dashboard/followers"><HiUserGroup className="text-lg" /> Followers</Link>
          
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
