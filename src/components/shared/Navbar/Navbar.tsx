"use client";

import Image from "next/image";
import Link from "next/link";
import { CgMenu } from "react-icons/cg";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <div className="overflow-hidden absolute z-30 bg-primary-white/70 w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar w-full ">
              <div className="flex-none lg:hidden ">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <CgMenu className="text-2xl" />
                </label>
              </div>
              <div className="mx-2 flex-1 px-2  justify-end lg:justify-start">
                <Link href={"/"}>
                  <Image className="w-14" src={logo} alt="logo" />
                </Link>
              </div>
              <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal items-center font-semibold">
                  {/* Navbar menu content here */}
                  <li>
                    <Link href={"/recipe-feed"}>Recipe Feed</Link>
                  </li>

                  {/* Action Button */}
                  <div className="flex">
                    <div>
                      <Link href={"/register"}>
                        <button className="px-4 py-2 rounded-md bg-dark-green shadow-sm text-primary-white">
                          Register
                        </button>
                      </Link>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
