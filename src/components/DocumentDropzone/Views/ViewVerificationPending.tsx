import React, { FunctionComponent } from "react";
import { LoaderSpinner } from "../../UI/Loader";

export const ViewVerificationPending: FunctionComponent = () => {
  return (
    <div className="verification-state verification-state-pending">
      <LoaderSpinner data-testid={"loader-spinner"} className="mx-auto" width="50px" primary="#6954df" secondary="#e8e5ff" />
      <p className="m-4 text-2xl">Checking credential integrity…</p>
    </div>
  );
};
