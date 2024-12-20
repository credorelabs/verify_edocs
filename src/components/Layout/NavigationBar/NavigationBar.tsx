import { Tooltip } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { IS_DEVELOPMENT } from "../../../config";

export const NavigationBar = () => {
  const location = useLocation();

  return (
    <>
      <nav className="bg-gray-100 sticky top-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://www.credore.xyz" target="_blank" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/static/images/credore/logo-small.webp" className="h-8" alt="Credore Logo" />
          </a>
          {/* <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button> */}
          <div className={`w-auto flex`} id="navbar-default">
            <ul className={`font-medium ${location.pathname==='/viewer'?'flex':'hidden'} flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700"`}>
              <a href="/" className="block !py-2 !px-5 !bg-[#4fd1c5] cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <li className="list-none">
                  Verify Doc
                </li>
              </a>
            </ul>
            <Tooltip title='Download the .tt file and verify in TradeTrust'>
            <ul data-tooltip-id="my-tooltip-2" className={`font-medium flex flex-col ml-3 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700"`}>
              <a href={IS_DEVELOPMENT?'https://dev.tradetrust.io/verify':'https://tradetrust.io/verify'} className="block !py-2 !px-5 !bg-[#4fd1c5] cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <li className="list-none flex">
                  Verify in TradeTrust
                </li>
              </a>
            </ul>
            </Tooltip>
          </div>
        </div>
      </nav>
    </>
  );
};
