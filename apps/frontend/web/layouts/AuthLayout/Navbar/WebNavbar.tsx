import Link from "next/link";
import React from "react";
import { FaGlobe, FaEnvelope } from "react-icons/fa";
import { NavMenu } from "./Navbar";

export interface WebNavbarProps {
  navItems: NavMenu[];
}

export function WebNavbar(props: WebNavbarProps) {
  return (
    <nav className="flex items-center justify-around ">
      <div className="text-2xl  font-bold ml-16">Logo</div>
      <div className="flex px-3 -ml-20">
        {props.navItems.map((data) => {
          return (
            <ul key={data.id}>
              <li>
                <a
                  className="px-3 py-2 flex items-center    text-gray-500 hover:text-gray-500"
                  href={data.href}
                >
                  <span className="ml-2">{data.name}</span>
                </a>
              </li>
            </ul>
          );
        })}
      </div>
      <div className="flex items-center mr-32">
        <div className="mr-6 pr-2 w-12 border-r-2 border-gray-200  ">
          <FaGlobe className="w-6 h-6 text-gray-400 ml-auto mr-auto block" />
        </div>
        <div
          className="-ml-3
         text-gray-600"
        >
          <a href="">Contact Sales</a>
        </div>

        <div className="py-5 px-3 mr-3   text-gray-600 ">
          <Link href="/auth/login">
            <a> Log in</a>
          </Link>
        </div>
        <div className=" py-1 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded w-28 ">
          <a href="">Get Started</a>
        </div>
      </div>
    </nav>
  );
}
