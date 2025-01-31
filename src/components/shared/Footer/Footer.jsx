"use client"

import logo from '@/assets/logo.png'
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <div>
        <footer className="footer footer-center bg-dark-green font-poppins text-primary-white p-10 pt-16">
          <aside>
            <div className="bg-primary-white px-4 py-2 rounded-md">
              <Image
                className=""
                src={logo}
                alt="logo"
                width={80}
                height={80}
              />
            </div>
            <p className="font-bold">
             Chef.
              <br />
              Providing reliable community since 1992
            </p>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav>
          
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
