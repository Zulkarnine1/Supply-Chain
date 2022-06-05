/* This example requires Tailwind CSS v2.0+ */

import { Popover } from "@headlessui/react";
import Link from "next/link";

export default function Navbar({ portalName }) {
  return (
    <div className="relative bg-gray-50">
      <Popover className="relative bg-black shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1 ">
              <a href="/">
                <>
                  <span className="sr-only cursor-pointer">Velockchain</span>
                  {/* <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                /> */}
                  <p className="text-white text-2xl font-extrabold cursor-pointer">VelockChain</p>
                </>
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              {portalName ? <p className="text-white text-lg">{portalName.toUpperCase()} PORTAL</p> : null}
            </div>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {portalName ? <p className="text-white text-lg">{portalName.toUpperCase()} PORTAL</p> : null}
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
