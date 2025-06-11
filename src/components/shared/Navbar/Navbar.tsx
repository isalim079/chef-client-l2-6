"use client";

import Image from "next/image";
import Link from "next/link";
import { CgMenu } from "react-icons/cg";
import logo from "@/assets/logoW.png";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
// import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { logout, user } = useAuth();

  const pathname = usePathname();

  return (
    <div
      className={`overflow-hidden bg-gray-800 ${pathname === "/" ? "sticky top-0 z-30" : ""} w-full`}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="drawer">
          <input id="navbarDrawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar w-full ">
              <div className="flex-none lg:hidden ">
                <label
                  htmlFor="navbarDrawer"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <CgMenu className="text-2xl text-white" />
                </label>
              </div>
              <div className="mx-2 flex-1 px-2  justify-end lg:justify-start">
                <Link href={"/"}>
                  <Image className="w-14" src={logo} alt="logo" />
                </Link>
              </div>
              <div className="hidden lg:flex lg:w-[64%] justify-between flex-none">
                <ul className="flex gap-6 items-center font-semibold text-white text-lg">
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
                  <li>
                    <Link className="font-semibold" href={`/contact-us`}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
                {/* Action Button */}
                <div className="flex">
                  <div>
                    {user ? (
                      <div>
                        <Link href={`/${user.role}-dashboard`}>
                          <button className="px-4 py-2 rounded-md text-white border border-white font-semibold">
                            Dashboard
                          </button>
                        </Link>
                        <button
                          className="px-4 py-2 ml-4 rounded-md text-white border border-white font-semibold"
                          onClick={() => logout()}
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="">
                        <Link href={"/login"}>
                          <button className="px-4 py-2 rounded-md text-white border border-white font-semibold">
                            Login
                          </button>
                        </Link>
                        <Link className="ml-4" href={"/register"}>
                          <button className="px-4 py-2 rounded-md text-white border border-white font-semibold">
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
              htmlFor="navbarDrawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              {/* Sidebar content here */}
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
              <li>
                <Link className="font-semibold" href={`/contact-us`}>
                  Contact Us
                </Link>
              </li>
              {/* Action Button */}
              <div className="flex mt-5">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
