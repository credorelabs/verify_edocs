import React from "react";
import { Helmet } from "react-helmet";
import { DropZoneSectionContainer } from "../components/VerifyPageContent/DropZoneSection";
import { Page } from "../components/Layout/Page";
import { OverlayContent, OverlayContextProvider } from "@tradetrust-tt/tradetrust-ui-components";
import { NetworkSelect } from "../components/Layout/NetworkSelect";
import { InfoOverlay } from "../components/UI/Overlay";
import { Tooltip } from "@mui/material";
import { Info } from "@mui/icons-material";

const VerifyPage = (): React.ReactElement => {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Credore | Verify" />
        <meta
          property="description"
          content="Verify your MLETR files at Credore!"
        />
        <meta
          property="og:description"
          content="Verify your MLETR files at Credore!"
        />
        {/* <meta property="og:url" content={`${window.location.origin}/verify`} /> */}
        <title>Credore | Verify</title>
        <meta
          name="keywords"
          content="Transferable Documents, Verifiable Document, Digital Trade Document, Verify Document, Blockchain, NFT, Ethereum, Electronic Trade Document, MLETR"
        />
      </Helmet>

      <Page title="Verify Your MLETR Documents">
        <div className="flex items-center my-auto mt-10">
          <div className="text-gray-900 mr-3 font-semibold" data-testid="page-subtitle">
            Choose your network to verify
          </div>
          <NetworkSelect />&nbsp;&nbsp;&nbsp;
          <Tooltip className="cursor-pointer" title="A document can only be verified on the network where it was originally created. If you are uncertain, please confirm with the document issuer."><Info /></Tooltip>
        </div>
        <DropZoneSectionContainer />
      </Page>
    </>
  );
};

export default VerifyPage;
