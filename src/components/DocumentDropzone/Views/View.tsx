import React, { FunctionComponent } from "react";
import { Button, ButtonSize } from "@tradetrust-tt/tradetrust-ui-components";
import { SampleMobile } from "../SampleMobile";
import { useProviderContext } from "../../../common/contexts/provider";
import { DROPFILE } from "../../Animation";
import Lottie from 'react-lottie'
interface ViewProps {
  toggleQrReaderVisible?: () => void;
}

export const View = ( ) => {
  const { currentChainId } = useProviderContext();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: DROPFILE,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      {/* <SampleMobile currentChainId={currentChainId} /> */}
      <Lottie options={defaultOptions}
            isPaused={false}
            isClickToPauseDisabled={true}
            height={300}
            width={300}
          />
      <h4>Drop your MLETR file here</h4>
      <p className="my-4">Or</p>
      <Button className="bg-teal-500 text-white hover:bg-teal-800 mr-2 md:mr-0" size={ButtonSize.SM}>
        Select Document
      </Button>
    </div>
  );
};
