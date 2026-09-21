import React from "react";
import { Helmet } from "react-helmet";
import { ViewerPageContainer } from "../components/ViewerPageContainer";
import { NetworkSectionWithMetamask } from "../components/NetworkSection/NetworkSectionWithMetamask";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

export const ViewerPage = (): React.ReactElement => {
  const rootState = useSelector((state: RootState) => state);
  const document = rootState.certificate.rawModified;
  return (
    <>
      <Helmet>
        <meta
          property="description"
          content="Credore provides a secure workspace for reviewing verifiable credentials."
        />
        <meta
          property="og:description"
          content="Credore provides a secure workspace for reviewing verifiable credentials."
        />
        <meta property="og:title" content="Credore - Credential viewer" />
        <meta property="og:url" content={`${window.location.origin}/viewer`} />
        <title>Credore - Credential viewer</title>
        <meta
          name="keywords"
          content="Blockchain, NFT, Ethereum, Electronic Trade Document, Digital Trade Document, Transferable Documents, Electronic Bill of Lading, Bill of Lading, Verifiable Document, Certificate of Origin"
        />
      </Helmet>

      <div className="viewer-page">
        <div className="container viewer-page-header">
          <header className="viewer-heading">
            <div>
              {/* <span className="page-eyebrow">Credential review</span> */}
              <h1 className="!text-2xl">Verification result</h1>
              <p className="!-mt-3">Review document integrity, issuer information, and available actions in one place.</p>
            </div>
            {/* <div className="viewer-header-status">
              <span className="console-live-dot" />
              <span>Secure review session</span>
            </div> */}
          </header>
          <div className="viewer-network-context">
            <NetworkSectionWithMetamask
              subtitle="Credential verified on"
              overlayMargin="ml-3"
              disabled={true}
              document={document}
            />
          </div>
        </div>
        <ViewerPageContainer />
      </div>
    </>
  );
};
