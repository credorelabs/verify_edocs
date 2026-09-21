import React from "react";

export const Page: React.FunctionComponent<{ title?: string; subtitle?: string }> = ({ title, subtitle, children }) => {
  return (
    <div className="container page-shell py-10 -mt-4">
      {title && (
        <header className="page-heading">
          {/* <span className="page-eyebrow">Credore credential desk</span> */}
          <h2 className="max-w-3xl -py-6 text-3xl" data-testid="page-title">
            {title}
          </h2>
          {subtitle && (
            <h4 className="page-subtitle" data-testid="page-subtitle">
              {subtitle}
            </h4>
          )}
        </header>
      )}
      {children}
    </div>
  );
};
