import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import {
  updateCertificate,
  resetCertificateState,
  states,
  verifyingCertificateFailure,
  verifyingCertificateCompleted,
} from "../../reducers/certificate";
import { getDropzoneBoxUi } from "../../common/utils/getDropzoneBoxUi";
import { View, ViewVerificationError, ViewActionError, ViewVerificationPending } from "../DocumentDropzone/Views";
import { isValid } from "@tradetrust-tt/tt-verify";
import { useProviderContext } from "../../common/contexts/provider";
import { getChainId } from "../../utils/shared";
import { CONSTANTS } from "@tradetrust-tt/tradetrust-utils";
import { useNetworkSelect } from "./../../common/hooks/useNetworkSelect";
import { extractQRCodeFromPDF } from "../../utils/extractPdfQr";

const { TYPES } = CONSTANTS;

export const CertificateDropZone = () => {
  const dispatch = useDispatch();
  const { verificationPending, retrieveCertificateByActionState, verificationStatus, verificationError } = useSelector(
    (state: RootState) => state.certificate
  );

  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrError, setQrError] = useState<string | null>(null); // <-- NEW ERROR STATE

  const isVerificationPending = verificationPending;
  const isVerificationError = useMemo(() => {
    if (verificationError) return true;
    if (verificationStatus && !isValid(verificationStatus)) return true;
    return false;
  }, [verificationError, verificationStatus]);

  const isActionError = retrieveCertificateByActionState === states.FAILURE;

  const resetData = useCallback(() => {
    dispatch(resetCertificateState());
  }, [dispatch]);

  const { currentChainId } = useProviderContext();
  const { switchNetwork } = useNetworkSelect();

  // ===========================
  // ON DROP FILE HANDLER
  // ===========================
  const onDrop = useCallback(
    (acceptedFiles: Blob[]) => {
      // reset UI states
      setQrUrl(null);
      setQrError(null);

      acceptedFiles.forEach(async (file: Blob) => {
        const fileObj = file as File;
        const ext = fileObj.name.split(".").pop()?.toLowerCase();

        console.log("📥 File dropped:", fileObj.name);

        // 1️⃣ PDF → extract QR
        if (ext === "pdf") {
          console.log("📄 PDF detected → scanning for QR...");

          try {
            const qrData = await extractQRCodeFromPDF(fileObj);

            if (!qrData) {
              console.log("❌ No QR code found in PDF!");
              setQrError("No QR code found in this PDF.");
              return;
            }

            console.log("🎉 Extracted QR Code:", qrData);
            setQrUrl(qrData);
          } catch (err) {
            console.error("❌ Error scanning PDF:", err);
            setQrError("Failed to scan PDF. The file may be corrupted or unreadable.");
          }

          return; // stop JSON logic
        }

        // 2️⃣ JSON / TT / OA file
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const json = JSON.parse(reader.result as string);
            const chainId = getChainId(json);

            if (chainId && currentChainId !== chainId) {
              await switchNetwork(chainId);
            }

            dispatch(updateCertificate(json));
          } catch (e) {
            if (e instanceof Error) {
              dispatch(verifyingCertificateCompleted([e.message]));
              dispatch(verifyingCertificateFailure(TYPES.NETWORK_INVALID));
            }
            console.error(e);
          }
        };

        reader.onerror = () => console.log("❌ file read error");
        reader.readAsText(fileObj);
      });
    },
    [currentChainId, dispatch, switchNetwork]
  );

  // ===========================
  // DROPZONE STYLES
  // ===========================
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
  });

  const customStyle = useMemo(() => {
    return getDropzoneBoxUi({
      isDragReject,
      isDragActive,
      isDragAccept,
      isVerificationPending,
      isVerificationError,
      isActionError,
    });
  }, [isDragReject, isDragActive, isDragAccept, isVerificationPending, isVerificationError, isActionError]);

  return (
    <div data-testid="certificate-dropzone" {...getRootProps()}>
      <input {...getInputProps()} />

      <div
        className={`border-2 border-solid rounded-xl text-center relative p-8 min-h-[400px] flex flex-col justify-center ${customStyle}`}
      >

        {/* 🚨 QR ERROR MESSAGE */}
        {qrError && (
          <div className="mb-4 bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded">
            {qrError}
          </div>
        )}

        {/* 🚀 Button shown when QR is extracted */}
        {qrUrl && (
          <div className="mb-4">
            <button
              onClick={() => window.open(qrUrl!, "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
            >
              Open Extracted Document
            </button>
          </div>
        )}

        {/* Original UI */}
        {(() => {
          switch (true) {
            case isVerificationPending:
              return <ViewVerificationPending />;

            case isVerificationError:
              return <ViewVerificationError resetData={resetData} />;

            case isActionError:
              return <ViewActionError resetData={resetData} />;

            default:
              return <View />;
          }
        })()}
      </div>
    </div>
  );
};
