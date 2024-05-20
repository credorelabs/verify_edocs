import React, { FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { DetailedErrors } from "../DetailedErrors";
import Swal from "sweetalert2";

interface ViewVerificationErrorProps {
  resetData: () => void;
}

export const ViewVerificationError: FunctionComponent<ViewVerificationErrorProps> = ({ resetData }) => {
  const { verificationStatus, verificationError } = useSelector((state: RootState) => state.certificate);
  return (
    <>
    <DetailedErrors verificationError={verificationError} verificationStatus={verificationStatus}/>
    <Button 
      onClick={(e)=>{
        e.stopPropagation();
        resetData()
      }}
      className="bg-[#f15928] w-auto"
    >Try another Document</Button>
    </>
  );
};
