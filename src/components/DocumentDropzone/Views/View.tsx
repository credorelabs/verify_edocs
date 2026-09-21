import { Button, ButtonSize } from "../../Button";
import React, { FunctionComponent } from "react";

interface ViewProps {
  toggleQrReaderVisible?: () => void;
}

export const View: FunctionComponent<ViewProps> = ({ toggleQrReaderVisible }) => {
  return (
    <div>
      <img
        className="mx-auto w-44
        "
        alt="Credential upload"
        src="/static/images/dropzone/dropzone_illustration1.png"
      />
      <p className="dropzone-kicker">Verification workspace</p>
      <h3>Drop a credential to begin</h3>
      <p className="my-4 text-cloud-500">We’ll check its provenance and status in seconds.</p>
      <div className="flex flex-col xs:flex-row justify-center gap-2">
        <Button className="primary-action w-full xs:w-72" size={ButtonSize.MD}>
          Choose credential
        </Button>
        <Button
          className="secondary-action w-full xs:w-72 md:hidden"
          size={ButtonSize.MD}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleQrReaderVisible && toggleQrReaderVisible();
          }}
        >
          Scan QR Code
        </Button>
      </div>
    </div>
  );
};
