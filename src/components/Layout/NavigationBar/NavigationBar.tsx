import React, { FunctionComponent } from "react";
import { Settings } from "react-feather";
import { NavLink } from "react-router-dom";
import { Button, ButtonSize } from "../../Button";
import { NavigationBar as NavBar, NAVIGATION_ITEM_TYPE, NavigationItem } from "../../NavigationBar";

export const rightNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLabelButton,
    id: "verify",
    label: "Verify",
    path: "/",
    customLink: (
      <NavLink to={"/"}>
        <Button className="nav-primary-button" size={ButtonSize.SM}>
          Verify credential
        </Button>
      </NavLink>
    ),
  },
];

const NavLogo = () => {
  return (
    <a className="credore-wordmark" href="/" data-testid="nav-logo-home" aria-label="Credore home">
      <span className="credore-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>credore</span>
    </a>
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
    <NavBar />
  );
};
