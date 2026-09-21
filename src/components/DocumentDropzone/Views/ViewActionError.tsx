import React, { FunctionComponent } from "react";
import { Button } from "../../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { DetailedError } from "../../DocumentDropzone/DetailedErrors";
import { URLS } from "../../../constants";

interface ViewActionErrorProps {
  resetData: () => void;
}

export const ViewActionError: FunctionComponent<ViewActionErrorProps> = ({ resetData }) => {
  const { retrieveCertificateByActionError } = useSelector((state: RootState) => state.certificate);
  return (
    <div className="verification-state verification-state-error">
      <img
        className="mx-auto w-56"
        alt="Credential action error"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
      <DetailedError
        title={`Unable to load certificate with the provided parameters`}
        message={retrieveCertificateByActionError!}
      />

      <br />

      <div className="state-actions">
        <a
          href={URLS.FAQ}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full"
        >
          <Button className="state-secondary-button w-full">
            Help me resolve this
          </Button>
        </a>

        <Button
          data-testid="try-another"
          className="state-primary-button w-full"
          onClick={(e) => {
            e.stopPropagation();
            resetData();
          }}
        >
          Try another credential
        </Button>
      </div>
    </div>
  );
};
