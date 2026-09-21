import React, { FunctionComponent } from "react";
import { Button } from "../../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { DetailedErrors } from "../DetailedErrors";
import { URLS } from "../../../constants";

interface ViewVerificationErrorProps {
  resetData: () => void;
}

export const ViewVerificationError: FunctionComponent<ViewVerificationErrorProps> = ({ resetData }) => {
  const { verificationStatus, verificationError } = useSelector((state: RootState) => state.certificate);

  return (
    <div className="verification-state verification-state-error">
      <img
        className="mx-auto w-56"
        alt="Credential verification error"
        src="/static/images/dropzone/dropzone_illustration.svg"
      />
      <DetailedErrors verificationStatus={verificationStatus} verificationError={verificationError} />

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
