import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavMenu } from "./Navbar";

export interface MobileNavbarProps {
  navItems: NavMenu[];
}

export function MobileNavbar(props: MobileNavbarProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav>
      <div className="flex justify-between items-center py-3">
        <div className="text-2xl  font-bold ml-6">Logo</div>
        <div className="flex items-center mr-8 space-x-3">
          <div className=" py-1 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded  ">
            <a href="">Get Started</a>
          </div>
          <div className="">
            <button
              className="text-white mt-2 rounded "
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars className="h-6 w-6 text-gray-300 " />
            </button>
          </div>
        </div>
      </div>
      {navbarOpen && (
        <div>
          <div>
            {props.navItems.map((data) => {
              return (
                <ul className="px-3" key={data.id}>
                  <li className="border-b-2 border-gray-300 ">
                    <a
                      className="px-3 py-2 flex items-center   font-bold  text-gray-500 hover:text-gray-500"
                      href={data.href}
                    >
                      <span className="ml-2">{data.name}</span>
                    </a>
                  </li>
                </ul>
              );
            })}
          </div>

          <div className="border-2 border-gray-800 m-3 rounded">
            <Link href="/auth/login">
              <a className="text-xl  text-center block  py-2"> Log in</a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
