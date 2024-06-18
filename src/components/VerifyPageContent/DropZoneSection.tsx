import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { roundInstructionsText } from ".";
import { updateCertificate } from "../../reducers/certificate";
import { CertificateDropZoneContainer } from "../CertificateDropZone/CertificateDropZoneContainer";
import { setActive, reset } from "../../reducers/sample";
import { loadDemoCertificate, getDemoCert } from "./helpers";
import { useProviderContext } from "../../common/contexts/provider";
import { ChainId } from "../../constants/chain-info";
import { DOCSCAN, FILESCAN } from "../Animation";
import Lottie from "react-lottie";
import { Info } from "@mui/icons-material";



export const DropZoneSectionContainer = (): React.ReactElement => {
  const dispatch = useDispatch();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);
  const { currentChainId } = useProviderContext();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: FILESCAN,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return currentChainId ? (
    <div className="flex mt-4 gap-8">
      <div className="w-2/3">
        <div
          id="demoDrop"
          onDrop={(event) => {
            if (event.dataTransfer && event.dataTransfer.getData(getDemoCert(currentChainId))) {
              loadDemoCertificate(loadCertificate, currentChainId);
              dispatch(setActive());
            } else {
              dispatch(reset());
            }
          }}
        >
          <CertificateDropZoneContainer />
        </div>
      </div>
      <div className="w-1/3 my-auto mx-auto border-2 border-[#F15928] border-dotted p-1 rounded-lg animate-pulse flex gap-2 justify-center items-center ">
        <Info />
        <div>
          This site only verifies documents that are MLETR compliant. Please ensure your document adheres to TradeTrust
          standards before proceeding with the verification process.
        </div>
        {/* <Lottie options={defaultOptions} isPaused={false} isClickToPauseDisabled={true} height={400} width={400} /> */}
      </div>
      {/* <DraggableDemoCertificate chainId={currentChainId} /> */}
    </div>
  ) : (
    <div>You are currently on an unsupported network.</div>
  );
};
