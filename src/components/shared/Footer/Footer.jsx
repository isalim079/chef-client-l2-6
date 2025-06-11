"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname()
  // console.log(pathname);
  return (
    <div className={`${pathname.includes('/recipe-feed') ? 'hidden' : 'block'}`}>
      <div>
        <footer className="footer footer-center bg-gray-800 font-poppins text-white p-10 pt-16">
          <aside>
            <div className="bg-white px-4 py-2 rounded-md">
              <Image
                className=""
                src={logo}
                alt="logo"
                width={80}
                height={80}
              />
            </div>
            <p className="lg:font-bold">
              Chef.
              <br />
              Providing reliable community since 1992
            </p>
            <p className="text-gray-300">
              Copyright © {new Date().getFullYear()} - All right reserved
            </p>
          </aside>
          <nav></nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
