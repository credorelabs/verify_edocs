import { v2, utils } from "@tradetrust-tt/tradetrust";
import { ButtonIcon } from "@tradetrust-tt/tradetrust-ui-components";
import QRCode, { ImageSettings } from "qrcode.react";
import React, { FunctionComponent, useState } from "react";
import { SvgIcon, SvgIconQRCode } from "../UI/SvgIcon";
import { WrappedOrSignedOpenAttestationDocument, getOpenAttestationData } from "../../utils/shared";
import { DownloadForOffline, Print } from "@mui/icons-material";
interface DocumentUtilityProps {
  document: WrappedOrSignedOpenAttestationDocument;
  onPrint: () => void;
}

export const DocumentUtility: FunctionComponent<DocumentUtilityProps> = ({ document, onPrint }) => {
  const [qrCodePopover, setQrCodePopover] = useState(false);
  const documentWithMetadata = getOpenAttestationData(document) as any; // Extending document data to account for undefined metadata in OA schema
  const { links }: any = utils.isRawV3Document(documentWithMetadata)
    ? documentWithMetadata.credentialSubject
    : documentWithMetadata;
  const fileName = documentWithMetadata?.$template?.name || "Untitled";
  const qrcodeUrl = links?.self?.href;

  const imageSettings: ImageSettings = {
    src: `/static/images/credore/qrlogo.png`,
    height: 50,
    width: 55,
    excavate: true,
  };

  return (
    <div className="container no-print bg-white pb-8">
      <div className="flex flex-wrap">
        <div className="w-auto ml-auto">
          {qrcodeUrl && (
            <div
              className="relative"
              onClick={() => {
                setQrCodePopover(!qrCodePopover);
              }}
            >
              <ButtonIcon
                className="bg-white border-2 border-cloud-100 rounded-xl hover:bg-cloud-100"
                aria-label="document-utility-qr-button"
                style={{ width: "auto", height: "auto" }}
              >
                <SvgIcon className="text-cerulean-500" strokeWidth="0.5" fill="currentColor">
                  <SvgIconQRCode />
                </SvgIcon>
              </ButtonIcon>
              <div
                data-testid="qr-code-svg"
                className={`absolute border p-2 mt-2 top-100 right-0 shadow-md rounded bg-white ${
                  qrCodePopover ? "block" : "hidden"
                }`}
              >
                <QRCode
                  value={qrcodeUrl}
                  level="Q"
                  size={200}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  imageSettings={imageSettings}
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-auto ml-3">
          <ButtonIcon
            className="bg-white text-cerulean-500 border-2 border-cloud-100 rounded-xl hover:bg-cloud-100"
            aria-label="document-utility-print-button"
            onClick={() => onPrint()}
            style={{ width: "auto", height: "auto" }}
          >
            <Print className="text-[#4fd1c5]"/>
          </ButtonIcon>
        </div>
        <div className="w-auto ml-3">
          <a
            download={`${fileName}.tt`}
            target="_black"
            href={`data:text/json;,${encodeURIComponent(JSON.stringify(document, null, 2))}`}
            role="button"
            aria-label="document-utility-download"
          >
            <ButtonIcon
              className="bg-white text-cerulean-500 border-2 border-cloud-100 rounded-xl hover:bg-cloud-100"
              style={{ width: "auto", height: "auto" }}
            >
              <DownloadForOffline className="text-[#4fd1c5]"/>
            </ButtonIcon>
          </a>
        </div>
      </div>
    </div>
  );
};
