"use client";

import Image from "next/image";
import Link from "next/link";
import { CgMenu } from "react-icons/cg";
import logo from "@/assets/logo.png";
import { useAuth } from "@/context/AuthContext";
// import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { logout, user } = useAuth();

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
              <div className="hidden lg:flex lg:w-[57%] justify-between flex-none">
                <ul className="flex gap-4 items-center font-semibold">
                  {/* Navbar menu content here */}
                  <li>
                    <Link className="font-semibold" href={`/create-recipe`}>
                      Create Recipe
                    </Link>
                  </li>
                  <li>
                    <Link className="font-semibold" href={`/recipe-feed`}>
                      Recipe Feed
                    </Link>
                  </li>
                  <li>
                    <Link className="font-semibold" href={`/about-us`}>
                      About Us
                    </Link>
                  </li>
                 
                </ul>
                {/* Action Button */}
                <div className="flex">
                  <div>
                    {user ? (
                      <div>
                        <Link href={`/${user.role}-dashboard`}>
                          <button className="px-4 py-2 rounded-md bg-dark-green shadow-sm text-primary-white">
                            Dashboard
                          </button>
                        </Link>
                        <button
                          className="px-4 py-2 ml-4 rounded-md bg-dark-green shadow-sm text-primary-white"
                          onClick={() => logout()}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="">
                        <Link href={"/login"}>
                          <button className="px-4 py-2 rounded-md bg-dark-green shadow-sm text-primary-white">
                            Login
                          </button>
                        </Link>
                        <Link className="ml-4" href={"/register"}>
                          <button className="px-4 py-2 rounded-md bg-dark-green shadow-sm text-primary-white">
                            Register
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
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
