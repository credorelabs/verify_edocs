import React from "react";
import { Bottom, Category, mapper } from "./helpers";
import { FooterColumnProps, FooterProps } from "./types";

const sharedColumnPadding = `px-2 lg:px-6 xl:px-8`;

const FooterColumn = (props: FooterColumnProps): React.ReactElement => {
  const { category, items } = props;
  return (
    <div className={`w-1/2 lg:w-auto mb-8 lg:mb-0 text-cloud-500 ${sharedColumnPadding}`}>
      <Category category={category} />
      {items.map(mapper)}
    </div>
  );
};

export const Footer = (props: FooterProps): React.ReactElement => {
  const { className = "", title = "", logoUrl = "", data, legalData } = props;

  return (
    <footer className={`bg-white no-print ${className}`}>
      <div className="container">
        {/* <div className="flex flex-col flex-wrap sm:flex-row lg:flex-nowrap pb-3.5 lg:justify-between">
          <Logo title={title} logoUrl={logoUrl} />
          {data ? (
            data.map((columnData, index) => <FooterColumn key={`col-${index}`} {...columnData} />)
          ) : (
            <div className="flex-auto" />
          )}
        </div>
        <hr /> */}
        {legalData && <Bottom legalData={legalData} />}
      </div>
    </footer>
  );
};
