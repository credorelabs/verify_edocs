import React from "react";
import { ExternalLink } from "react-feather";
import { NavLink } from "react-router-dom";
import { FORM_SG_URL } from "../../routes";
import { Footer as BaseFooter, FooterColumnItemProps } from "../UI/Footer";

const sharedStyles = `font-medium text-sm text-cloud-500 hover:text-cerulean-500`;
const renderNavLink = ({ label, to }: FooterColumnItemProps) => {
  return (
    <NavLink className={sharedStyles} to={to}>
      {label}
    </NavLink>
  );
};
const renderExternalLink = ({ label, to }: FooterColumnItemProps) => {
  return (
    <a className="flex items-center" href={to} target={"_blank"} rel="noopener noreferrer">
      <p className={`${sharedStyles} mr-1`}>{label}</p>
      <div className={`w-auto`}>
        <ExternalLink size={12} color={"#89969F"} />
      </div>
    </a>
  );
};

const data = [
  {
    category: "Utilities",
    items: [
      { label: "Verify a credential", to: "/", render: renderNavLink },
    ],
  },
  {
    category: "Support",
    items: [
      { label: "Credential network", to: "https://tradetrust.io", render: renderExternalLink },
      { label: "Documentation", to: "https://docs.tradetrust.io", render: renderExternalLink },
      { label: "Contact", to: FORM_SG_URL, render: renderExternalLink },
    ],
  },
];

const legalData = {
  copyright: (
    <div className="font-medium text-sm text-cloud-500 px-0 sm:px-4 flex sm:items-center sm:text-center min-h-[2rem]">
      {`Copyright \u00A9 ${new Date().getFullYear()} Credore`}
    </div>
  ),
  items: [],
};

export const Footer: React.FunctionComponent = () => {
  return (
    <BaseFooter
      className="py-8 px-6"
      title="credore"
      legalData={legalData}
      data={data}
    />
  );
};
