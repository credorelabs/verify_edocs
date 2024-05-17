import React, { FunctionComponent } from "react";
import { Settings } from "react-feather";
import {
  Button,
  NavigationBar as NavBar,
  NavigationItem,
  NAVIGATION_ITEM_TYPE,
  ButtonSize,
} from "@tradetrust-tt/tradetrust-ui-components";
import { NavLink } from "react-router-dom";
import { URLS } from "../../../constants";
import { FormSgContactLink } from "../../../routes";

// const sharedStyles = "block w-full px-4 py-3 text-cloud-500";

// export const leftNavItems: NavigationItem[] = [
//   // HOT FIX (remove magic demo until a more concrete business decision can be made)
//   // {
//   //   schema: NAVIGATION_ITEM_TYPE.NavigationLink,
//   //   id: "demo",
//   //   label: "Demo",
//   //   path: "/demo",
//   //   customLink: (
//   //     <NavLink activeClassName="text-cerulean-500" className="block w-full text-current" to={"/demo"}>
//   //       Demo
//   //     </NavLink>
//   //   ),
//   // },
//   {
//     schema: NAVIGATION_ITEM_TYPE.NavigationDropDownList,
//     id: "resources",
//     label: "Resources",
//     path: "",
//     dropdownItems: [
//       {
//         id: "learn",
//         label: "Learn",
//         path: "/learn",
//         customLink: (
//           <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/learn"}>
//             Learn
//           </NavLink>
//         ),
//       },
//       {
//         id: "faq",
//         label: "FAQ",
//         path: "/faq",
//         customLink: (
//           <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/faq"}>
//             FAQ
//           </NavLink>
//         ),
//       },
//       {
//         id: "eta",
//         label: "ETA",
//         path: "/eta",
//         customLink: (
//           <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/eta"}>
//             ETA
//           </NavLink>
//         ),
//       },
//       {
//         id: "legality",
//         label: "Legality",
//         path: "/legality",
//         customLink: (
//           <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/legality"}>
//             Legality
//           </NavLink>
//         ),
//       },
//       {
//         id: "guidelines(non-ethereum)",
//         label: "Guidelines (Non-Ethereum)",
//         path: "/guidelines",
//         customLink: (
//           <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/guidelines"}>
//             Guidelines (Non-Ethereum)
//           </NavLink>
//         ),
//       },
//     ],
//   },
//   {
//     schema: NAVIGATION_ITEM_TYPE.NavigationLink,
//     id: "cost",
//     label: "Cost",
//     path: "/cost",
//   },
//   {
//     schema: NAVIGATION_ITEM_TYPE.NavigationDropDownList,
//     id: "news-events",
//     label: "News & Events",
//     path: "",
//     dropdownItems: [
//       {
//         id: "news",
//         label: "News",
//         path: "/news",
//         customLink: (
//           <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/news"}>
//             News
//           </NavLink>
//         ),
//       },
//       {
//         id: "event",
//         label: "Event",
//         path: "/event",
//         customLink: (
//           <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/event"}>
//             Event
//           </NavLink>
//         ),
//       },
//     ],
//   },
//   {
//     schema: NAVIGATION_ITEM_TYPE.NavigationLink,
//     id: "partners",
//     label: "Partners",
//     path: "/partners",
//   },
//   {
//     schema: NAVIGATION_ITEM_TYPE.NavigationLink,
//     id: "contact",
//     label: "Contact",
//     path: "/contact",
//     customLink: <FormSgContactLink className="block w-full text-current">Contact</FormSgContactLink>,
//   },
// ];

export const rightNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLabelButton,
    id: "verify",
    label: "Verify Doc",
    path: "/verify",
    customLink: (
      <NavLink to={"/"}>
        <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800" size={ButtonSize.SM}>
          Verify Doc
        </Button>
      </NavLink>
    ),
  },
];

const NavLogo = () => {
  return (
    <NavLink to={"/"} data-testid="nav-logo-home">
      <img src="/static/images/tradetrust_logo.svg" alt="TradeTrust Logo" />
    </NavLink>
  );
};

interface NavigationBarProps {
  toggleNavBar: boolean;
  setToggleNavBar: (toggleNavbar: boolean) => void;
  leftItems: NavigationItem[];
  rightItems: NavigationItem[];
}

export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const { leftItems, rightItems } = props;

  return (
    // <NavBar
    //   logo={<NavLogo />}
    //   menuRight={rightItems}
    //   menuMobile={[...leftItems, ...rightItems]}
    //   setToggleNavBar={props.setToggleNavBar}
    //   toggleNavBar={props.toggleNavBar} 
    //   menuLeft={[]}    />
    <>


      <nav className="bg-gray-100">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/credore/logo-small.webp" className="h-10" alt="Credore Logo" />
            {/* <img src="/credore/logo1.png" className="h-8" alt="Credore Logo" /> */}
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
              <a onClick={() => history.back()} className="block !py-2 !px-5 !bg-[#4fd1c5] cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <li className="list-none">
                  Back to home
                </li>
              </a>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
