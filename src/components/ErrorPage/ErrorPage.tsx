import React, { FunctionComponent } from "react";

export interface ErrorPageProps {
  pageTitle: string;
  header: string;
  description: string;
  image: string;
}

export const ErrorPage: FunctionComponent<ErrorPageProps> = ({ pageTitle, header, description, image, children }) => {
  return (
    <div className="error-canvas">
      <div className="container py-6 md:py-12">
        <div className="error-page-card">
          <div className="error-page-code">{pageTitle}</div>
          <div className="error-page-layout">
            <div className="error-page-art">
              <img src={image} alt="" />
            </div>
            <div className="error-page-copy">
              <span className="page-eyebrow">Credore system notice</span>
              <h1>{header}</h1>
              <h3>{description}</h3>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
