import React from "react";
import { Link } from "react-router-dom";

import { User, Code, LogOut } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  const { authUser } = useAuthStore();


  return (
    <nav className="sticky top-0 z-50 flex justify-around w-full ">

      <div className="flex w-full justify-between  mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">

        <Link to="/" className="flex items-center gap-3 cursor-pointer">

          <img
            src="/leetlab.svg"
            className="h-18 w-18 bg-primary/20 text-primary border-none px-2 py-2 rounded-full"
          />
          <span className="text-lg md:text-2xl font-bold tracking-tight text-white hidden md:block">
            Leetlab
          </span>
          
        </Link>

        <div className="">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar flex flex-row "
            >
              <div className="w-10 rounded-full ">
                <img
                  src={
                    authUser?.image ||
                    "/biswajit.jpeg"
                  }
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
            >
              <li>
                <p className="text-base font-semibold">{authUser?.name}</p>

                 <hr className="border-gray-200/10" />
              </li>
              <li>
                 <Link
                  to="/profile"
                  className="hover:bg-primary hover:text-white text-base font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </li>

              {authUser?.role === "ADMIN" && (
                <li>
                  <Link 
                  to="/add-problem"
                  className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <Code className="w-4 h-4 mr-1"  />
                      Add Problem
                  </Link>
                </li>
              )}

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
