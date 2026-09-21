import React from "react";
import { CertificateDropZoneContainer } from "../CertificateDropZone/CertificateDropZoneContainer";

export const DropZoneSectionContainer = (): React.ReactElement => {
  return (
    <div className="flex -mt-10">
      <div className="w-full ">
        <CertificateDropZoneContainer />
      </div>
    </div>
  );
};
