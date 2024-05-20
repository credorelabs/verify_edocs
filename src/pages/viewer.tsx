import React from "react";
import { Helmet } from "react-helmet";
import { ViewerPageContainer } from "../components/ViewerPageContainer";

interface ViewerPageInterface {
  isMagicDemo?: boolean;
}
export const ViewerPage = (props: ViewerPageInterface): React.ReactElement => {
  return (
    <>
      <Helmet>
        <meta
          property="description"
          content="Verify your MLETR files at Credore!"
        />
        <meta
          property="og:description"
          content="Verify your MLETR files at Credore!"
        />
        <meta property="og:title" content="Credore | Viewer" />
        <title>Credore | Viewer</title>
        <meta
          name="keywords"
          content="Transferable Documents, Verifiable Document, Digital Trade Document, Verify Document, Blockchain, NFT, Ethereum, Electronic Trade Document, MLETR"
        />
      </Helmet>
      <ViewerPageContainer {...props} />
    </>
  );
};
