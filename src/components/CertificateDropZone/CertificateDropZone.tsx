import {
  errorMessages,
  isDocumentRevokable,
  isObligationRecord,
  isTransferableRecord,
  isValid,
} from "@trustvc/trustvc";
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { useProviderContext } from "../../common/contexts/provider";
import { getDropzoneBoxUi } from "../../common/utils/getDropzoneBoxUi";
import { ChainId } from "../../constants/chain-info";
import { RootState } from "../../reducers";
import {
  resetCertificateState,
  states,
  updateCertificate,
  updateFilename,
  verifyingCertificateCompleted,
  verifyingCertificateFailure,
} from "../../reducers/certificate";
import { getChainId } from "../../utils/shared";
import {
  View,
  ViewActionError,
  ViewVerificationError,
  ViewVerificationPending,
} from "../DocumentDropzone/Views";
import NetworkSectionModel from "../NetworkSection/NetworkSectionModel";
import { HeaderIconState } from "../UI/Overlay/OverlayContent/Modal";
import { useNetworkSelect } from "./../../common/hooks/useNetworkSelect";
import { extractQRCodeFromPDF } from "../../utils/extractPdfQr";

const { TYPES } = errorMessages;

interface CertificateDropzoneProps {
  toggleQrReaderVisible?: () => void;
}

type PdfScanState = "idle" | "scanning" | "success" | "error";

export const CertificateDropZone: FunctionComponent<CertificateDropzoneProps> = (
  props
) => {
  const { toggleQrReaderVisible } = props;

  const dispatch = useDispatch();

  const {
    verificationPending,
    retrieveCertificateByActionState,
    verificationStatus,
    verificationError,
  } = useSelector((state: RootState) => state.certificate);

  const { showOverlay, closeOverlay } = useContext(OverlayContext);

  const isVerificationPending = verificationPending;

  const isVerificationError = useMemo(() => {
    if (verificationError) return true;

    if (verificationStatus && !isValid(verificationStatus)) {
      return true;
    }

    return false;
  }, [verificationError, verificationStatus]);

  const isActionError = retrieveCertificateByActionState === states.FAILURE;

  const { currentChainId } = useProviderContext();
  const { switchNetwork } = useNetworkSelect();

  const [pdfScanState, setPdfScanState] = useState<PdfScanState>("idle");
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrError, setQrError] = useState<string | null>(null);

  const [targetChainId, setTargetChainId] = useState<number | null>(null);
  const [pendingCertificateData, setPendingCertificateData] = useState<any | null>(
    null
  );

  const resetData = useCallback(() => {
    dispatch(resetCertificateState());

    setPdfScanState("idle");
    setPdfFileName(null);
    setQrUrl(null);
    setQrError(null);
  }, [dispatch]);


  const processFile = useCallback(
    async (json: any, chainId?: ChainId) => {
      if (!chainId) {
        dispatch(updateCertificate(json));
        closeOverlay();
        return;
      }

      if (currentChainId === chainId) {
        dispatch(updateCertificate(json));
      } else {
        await switchNetwork(chainId);
        setTargetChainId(chainId);
        setPendingCertificateData(json);
      }

      closeOverlay();
    },
    [dispatch, currentChainId, switchNetwork, closeOverlay]
  );

  const processPdfFile = useCallback(async (file: File) => {
    setPdfFileName(file.name);
    setQrUrl(null);
    setQrError(null);
    setPdfScanState("scanning");

    try {
      console.log("📄 PDF detected → scanning for QR:", file.name);

      const extractedQrUrl = await extractQRCodeFromPDF(file);

      if (!extractedQrUrl) {
        console.warn("❌ No QR code found in PDF");

        setQrError(
          "No QR code was found in this PDF. Please upload a credential PDF containing a valid QR code."
        );
        setPdfScanState("error");

        return;
      }

      console.log("✅ QR code extracted:", extractedQrUrl);

      setQrUrl(extractedQrUrl);
      setPdfScanState("success");
    } catch (error) {
      console.error("❌ Error scanning PDF:", error);

      setQrError(
        "We couldn't read this PDF. Please make sure the file is valid and try again."
      );
      setPdfScanState("error");
    }
  }, []);


  const processJsonFile = useCallback(
    (file: File) => {
      const reader = new FileReader();

      if (file.name) {
        dispatch(updateFilename(file.name));
      }

      reader.onabort = () => {
        console.log("File reading was aborted");
      };

      reader.onerror = () => {
        console.error("File reading failed");

        dispatch(verifyingCertificateFailure(TYPES.INVALID));
        dispatch(verifyingCertificateCompleted());
      };

      reader.onload = async () => {
        try {
          const json = JSON.parse(reader.result as string);

          const chainId = getChainId(json);

          const requiresNetwork =
            isTransferableRecord(json) ||
            isObligationRecord(json) ||
            isDocumentRevokable(json);

          if (!chainId && requiresNetwork) {
            showOverlay(
              <NetworkSectionModel
                collapsible={false}
                title="Credential uploaded"
                headerIconState={HeaderIconState.SUCCESS}
                cancelText="Cancel"
                continueText="Proceed"
                preContent={
                  <div className="flex justify-center items-center">
                    <p>Select network for document verification.</p>
                  </div>
                }
                postContent={<></>}
                nextStep={() => {
                  processFile(json, chainId);
                }}
              />
            );

            return;
          }

          await processFile(json, chainId);
        } catch (e) {
          console.error(e);

          if (e instanceof Error) {
            const { message } = e;

            const isNetworkMismatch =
              message === TYPES.NETWORK_MISMATCH_MAINNET ||
              message === TYPES.NETWORK_MISMATCH_TESTNET;

            const errorType = isNetworkMismatch
              ? (message as keyof typeof TYPES)
              : TYPES.INVALID;

            dispatch(verifyingCertificateFailure(errorType));
            dispatch(verifyingCertificateCompleted());
          }
        }
      };

      reader.readAsText(file);
    },
    [dispatch, processFile, showOverlay]
  );


  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) {
        return;
      }

      setPdfScanState("idle");
      setPdfFileName(null);
      setQrUrl(null);
      setQrError(null);

      const ext = file.name.split(".").pop()?.toLowerCase();

      if (ext === "pdf") {
        processPdfFile(file);
        return;
      }

      if (ext === "tt") {
        processJsonFile(file);
        return;
      }

      dispatch(verifyingCertificateFailure(TYPES.INVALID));
      dispatch(verifyingCertificateCompleted());
    },
    [dispatch, processJsonFile, processPdfFile]
  );


  useEffect(() => {
    if (
      targetChainId &&
      currentChainId === targetChainId &&
      pendingCertificateData
    ) {
      dispatch(updateCertificate(pendingCertificateData));
      setTargetChainId(null);
      setPendingCertificateData(null);
    }
  }, [
    currentChainId,
    targetChainId,
    pendingCertificateData,
    dispatch,
  ]);


  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/tt": [".tt"],
      "application/pdf": [".pdf"],
    },
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
  }, [
    isDragReject,
    isDragActive,
    isDragAccept,
    isVerificationPending,
    isVerificationError,
    isActionError,
  ]);



  const renderPdfState = () => {
    if (pdfScanState === "scanning") {
      return (
        <div className="flex flex-col items-center justify-center px-6 py-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <svg
              className="h-6 w-6 animate-spin text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            Scanning PDF for QR code
          </h3>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            We're checking{" "}
            <span className="font-medium text-gray-700">
              {pdfFileName}
            </span>{" "}
            for a credential QR code.
          </p>

          <p className="mt-3 text-xs text-gray-400">
            Please keep this window open.
          </p>
        </div>
      );
    }

    if (pdfScanState === "success" && qrUrl) {
      return (
        <div className="flex flex-col items-center justify-center px-6 py-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            QR code found
          </h3>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            A verification link was successfully extracted from your PDF.
          </p>

          <div className="mt-4 max-w-full rounded-lg bg-gray-50 px-4 py-3 text-left">
            <p className="max-w-md truncate text-sm font-medium text-gray-700">
              {pdfFileName}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                window.open(qrUrl, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Open verification
              <span aria-hidden="true">↗</span>
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                resetData();
              }}
              className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              Upload another
            </button>
          </div>
        </div>
      );
    }

    if (pdfScanState === "error") {
      return (
        <div className="flex flex-col items-center justify-center px-6 py-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 4h.01M5.07 19h13.86a2 2 0 001.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16a2 2 0 001.73 3z"
              />
            </svg>
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            QR code not found
          </h3>

          <p className="mt-2 max-w-md text-center text-sm text-gray-500">
            {qrError}
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              resetData();
            }}
            className="mt-5 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Try another file
          </button>
        </div>
      );
    }

    return null;
  };


  return (
    <div
      className={`verification-dropzone text-center relative p-8 min-h-[420px] flex flex-col justify-center ${customStyle} -mx-4 xs:mx-0`}
    >
      <div
        data-testid="certificate-dropzone"
        className="cursor-pointer"
        {...getRootProps()}
      >
        <input
          {...getInputProps({
            "aria-label": "Upload credential",
          })}
        />

        <div
          className={`border-2 border-solid rounded-xl text-center relative p-8 min-h-[400px] flex flex-col justify-center ${customStyle}`}
        >

          {pdfScanState !== "idle" ? (
            renderPdfState()
          ) : (
            <>
              {isVerificationPending ? (
                <ViewVerificationPending />
              ) : isVerificationError ? (
                <ViewVerificationError resetData={resetData} />
              ) : isActionError ? (
                <ViewActionError resetData={resetData} />
              ) : (
                <View />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};