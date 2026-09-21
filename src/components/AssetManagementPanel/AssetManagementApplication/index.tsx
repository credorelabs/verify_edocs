import { v5RoleHash, v4RoleHash } from "@trustvc/trustvc";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Info, Upload, Shield } from "react-feather";
import { Link } from "react-router-dom";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { useTokenRegistryContract } from "../../../common/hooks/useTokenRegistryContract";
import { useTokenRegistryRole } from "../../../common/hooks/useTokenRegistryRole";
import { FORM_SG_URL } from "../../../routes";
import { Button } from "../../Button";
import { DocumentStatus } from "../../DocumentStatus";
import { Banner } from "../../UI/Banner";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "../AssetManagementForm";
import { TagBordered } from "../../UI/Tag";
import { useTokenRegistryVersion } from "../../../common/hooks/useTokenRegistryVersion";
import { TokenRegistryVersions } from "../../../constants";
import { ChainInfo } from "../../../constants/chain-info";
import { checkEIP7702Delegation } from "../../../gasless/checkDelegation";
import { checkPaymasterWhitelist } from "../../../gasless/checkPaymasterWhitelist";
import { getPaymasterAddress, setPaymasterAddress as storePaymasterAddress } from "../../../gasless/paymasterStore";
import { utils } from "ethers";

interface AssetManagementIsTransferableDocumentProps {
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
  isTransferableDocument: true;
  isExpired: boolean;
}

interface AssetManagementIsNotTransferableDocumentProps {
  isTransferableDocument: false;
  isExpired: boolean;
}

type AssetManagementApplicationProps =
  | (AssetManagementIsNotTransferableDocumentProps | AssetManagementIsTransferableDocumentProps) & {
      isSampleDocument: boolean;
    };

const renderBanner = (isSample: boolean) => {
  const props = {
    to: FORM_SG_URL,
    buttonText: "Contact us now",
    title: "Ready to learn how Credore can benefit your business?",
    absolute: true,
  };

  if (isSample) {
    return <Banner {...props} />;
  }

  return null;
};

export const AssetManagementApplication: FunctionComponent<AssetManagementApplicationProps> = (props) => {
  const { tokenId, tokenRegistryAddress, setShowEndorsementChain, isTransferableDocument, isExpired } =
    props as AssetManagementIsTransferableDocumentProps;

  const isSampleDocument = props.isSampleDocument;

  const {
    approvedBeneficiary: nominee,
    holder,
    beneficiary,
    prevBeneficiary,
    prevHolder,
    isReturnedToIssuer,
    isTokenBurnt,
    isTitleEscrow,
    documentOwner,

    nominate,
    nominateState,

    changeHolder,
    changeHolderState,

    endorseBeneficiary,
    endorseBeneficiaryState,

    transferOwners,
    transferOwnersState,

    returnToIssuer,
    returnToIssuerState,

    restoreToken,
    restoreTokenState,

    destroyToken,
    destroyTokenState,

    rejectTransferOwner,
    rejectTransferOwnerState,

    rejectTransferHolder,
    rejectTransferHolderState,

    rejectTransferOwnerHolder,
    rejectTransferOwnerHolderState,

    isObligation,
    obligationStatus,
    acceptObligation,
    acceptObligationState,
    rejectObligation,
    rejectObligationState,
    dischargeObligation,
    dischargeObligationState,
  } = useTokenInformationContext();

  const [assetManagementAction, setAssetManagementAction] = useState<AssetManagementActions>(
    AssetManagementActions.None
  );

  const tokenRegistryVersion = useTokenRegistryVersion();

  const { provider, account, currentChainId } = useProviderContext();

  // ---------------------------------------------------------------------------
  // EIP-7702 gasless logic
  // ---------------------------------------------------------------------------

  const [isDelegated, setIsDelegated] = useState(false);
  const [paymasterAddress, setPaymasterAddress] = useState("");
  const [gaslessStatus, setGaslessStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [gaslessError, setGaslessError] = useState("");

  const getRpcUrl = (): string | undefined => (currentChainId ? (ChainInfo as any)[currentChainId]?.rpcUrl : undefined);

  useEffect(() => {
    if (!account || !currentChainId) {
      setIsDelegated(false);
      return;
    }

    const rpcUrl = getRpcUrl();

    if (!rpcUrl) {
      setIsDelegated(false);
      return;
    }

    checkEIP7702Delegation(account, rpcUrl).then(setIsDelegated);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, currentChainId]);

  useEffect(() => {
    setGaslessStatus("idle");
    setGaslessError("");
    setPaymasterAddress("");
  }, [account]);

  const checkGasless = useCallback(
    async (address: string) => {
      const trimmed = address.trim();

      if (!utils.isAddress(trimmed)) return;

      if (!account || !props.isTransferableDocument) {
        setGaslessError("Connect your wallet and load a document first.");
        setGaslessStatus("error");
        return;
      }

      const rpcUrl = getRpcUrl();

      if (!rpcUrl) {
        setGaslessError("No RPC URL for this network.");
        setGaslessStatus("error");
        return;
      }

      setGaslessStatus("checking");
      setGaslessError("");

      try {
        const result = await checkPaymasterWhitelist(
          trimmed,
          account,
          (props as AssetManagementIsTransferableDocumentProps).tokenRegistryAddress,
          rpcUrl
        );

        if (result.isCallerAuthorized && result.isTitleEscrowAuthorized) {
          storePaymasterAddress(account, trimmed);
          setGaslessStatus("success");
        } else {
          setGaslessError("This paymaster address is not applicable to you.");
          setGaslessStatus("error");
        }
      } catch {
        setGaslessError("Unable to verify — please try again.");
        setGaslessStatus("error");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, currentChainId]
  );

  useEffect(() => {
    if (!isDelegated || !account) return;

    const stored = getPaymasterAddress(account);

    if (!stored) return;

    setPaymasterAddress(stored);
    checkGasless(stored);
  }, [isDelegated, account, checkGasless]);

  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const { hasRole: hasAccepterRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: tokenRegistryVersion === TokenRegistryVersions.V4 ? v4RoleHash.AccepterRole : v5RoleHash.AccepterRole,
  });

  const { hasRole: hasRestorerRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: tokenRegistryVersion === TokenRegistryVersions.V4 ? v4RoleHash.RestorerRole : v5RoleHash.RestorerRole,
  });

  const onDestroyToken = (remarks: string = "0x") => {
    destroyToken({ tokenId, remarks });
  };

  const onRestoreToken = (remarks: string = "0x") => {
    restoreToken({ tokenId, remarks });
  };

  const onSetFormAction = useCallback((assetManagementActions: AssetManagementActions) => {
    setAssetManagementAction(assetManagementActions);
  }, []);

  useEffect(() => {
    onSetFormAction(AssetManagementActions.None);
  }, [account, onSetFormAction]);

  const showDocumentStatus =
    assetManagementAction === AssetManagementActions.None ||
    assetManagementAction === AssetManagementActions.RejectTransferHolder ||
    assetManagementAction === AssetManagementActions.RejectTransferOwner ||
    assetManagementAction === AssetManagementActions.RejectTransferOwnerHolder;

  const gaslessEnabled = isDelegated && gaslessStatus === "success";

  return (
    <div id="title-transfer-panel" className="viewer-action-container !max-w-screen-lg  mx-auto px-2 sm:px-0">
      <div
        id="asset-management-box"
        className="
          viewer-action-panel
          w-full
          overflow-hidden
          rounded-xl
          border border-cloud-200
          bg-white
          shadow-[0_4px_18px_rgba(15,23,42,0.05)]
        "
      >
        {/* Compact header */}
        <div
          id="file-name"
          className="
            flex
            min-h-[58px]
            flex-col
            gap-3
            border-b
            border-cloud-200
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              className="
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-lg
                bg-cerulean-50
                text-cerulean-500
              "
            >
              <Shield size={16} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-cloud-900">Document Management</h3>

              <p className="hidden text-[11px] text-cloud-500 sm:block">Manage document ownership and actions</p>
            </div>
          </div>

          <Link id="upload-new-file" data-testid="upload-new-file" className="shrink-0" to="/">
            <Button
              className="
                flex h-9 w-full
                items-center justify-center
                gap-1.5
                whitespace-nowrap
                rounded-lg
                border border-cloud-200
                bg-white
                px-3
                text-xs font-semibold
                text-cerulean-500
                shadow-sm
                transition
                hover:border-cerulean-200
                hover:bg-cerulean-50
                sm:w-auto
              "
            >
              <Upload size={14} />
              Upload New File
            </Button>
          </Link>
        </div>

        {/* Compact gasless status */}
        {isDelegated && (
          <div className="border-b border-cloud-200 px-4 py-2.5 sm:px-5">
            {gaslessStatus === "success" ? (
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle size={15} className="shrink-0 text-forest-500" />

                <span className="font-semibold text-cloud-800">Pay-on-behalf enabled</span>

                <span className="hidden text-cloud-500 sm:inline">· Transaction fees are covered for you</span>
              </div>
            ) : (
              <div
                className="
                  flex
                  flex-col
                  gap-2
                  sm:flex-row
                  sm:items-center
                "
              >
                <div className="flex shrink-0 items-center gap-2">
                  <Info size={15} className="text-tangerine-500" />

                  <span className="text-xs font-semibold text-cloud-800">Enable pay-on-behalf</span>
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <input
                    type="text"
                    placeholder="Paymaster address (0x...)"
                    value={paymasterAddress}
                    disabled={gaslessStatus === "checking"}
                    className="
                      h-9
                      min-w-0
                      flex-1
                      rounded-lg
                      border border-cloud-300
                      bg-white
                      px-3
                      text-xs
                      text-cloud-900
                      outline-none
                      transition
                      placeholder:text-cloud-400
                      focus:border-cerulean-400
                      focus:ring-2
                      focus:ring-cerulean-100
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                    onChange={(e) => {
                      const val = e.target.value;

                      setPaymasterAddress(val);

                      const trimmed = val.trim();

                      if (utils.isAddress(trimmed)) {
                        checkGasless(trimmed);
                      } else if (trimmed.length > 0) {
                        setGaslessStatus("error");
                        setGaslessError("Invalid paymaster address");
                      } else {
                        setGaslessStatus("idle");
                        setGaslessError("");
                      }
                    }}
                  />

                  {gaslessStatus === "checking" && (
                    <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-tangerine-500">
                      <span
                        className="
                          h-3 w-3 animate-spin
                          rounded-full
                          border-2
                          border-tangerine-200
                          border-t-tangerine-500
                        "
                      />
                      <span className="hidden sm:inline">Verifying</span>
                    </span>
                  )}
                </div>

                {gaslessStatus === "error" && gaslessError && (
                  <div className="flex items-center gap-1 text-[11px] font-medium text-scarlet-500">
                    <AlertCircle size={13} />
                    <span>{gaslessError}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Document status */}
        {showDocumentStatus && (
          <div
            className="
              border-b
              border-cloud-200
              px-4
              py-3
              sm:px-5
            "
          >
            <DocumentStatus
              isTransferableDocument={isTransferableDocument}
              isObligation={isObligation}
              tokenRegistryAddress={tokenRegistryAddress}
              setShowEndorsementChain={setShowEndorsementChain}
            />
          </div>
        )}

        {/* Actions */}
        <div className="px-3 py-3 sm:px-5 sm:py-4">
          {isTransferableDocument && isTitleEscrow !== undefined ? (
            <AssetManagementForm
              beneficiary={beneficiary}
              holder={holder}
              nominee={nominee}
              prevBeneficiary={prevBeneficiary}
              prevHolder={prevHolder}
              account={account}
              isGaslessEnabled={gaslessEnabled}
              formAction={assetManagementAction}
              tokenRegistryAddress={tokenRegistryAddress}
              onSetFormAction={onSetFormAction}
              documentOwner={documentOwner}
              isRestorer={hasRestorerRole}
              isAcceptor={hasAccepterRole}
              isReturnedToIssuer={isReturnedToIssuer}
              isTitleEscrow={isTitleEscrow}
              setShowEndorsementChain={setShowEndorsementChain}
              isTokenBurnt={isTokenBurnt}
              onTransferHolder={changeHolder}
              holderTransferringState={changeHolderState}
              onEndorseBeneficiary={endorseBeneficiary}
              beneficiaryEndorseState={endorseBeneficiaryState}
              nominateBeneficiary={nominate}
              nominateBeneficiaryState={nominateState}
              transferOwners={transferOwners}
              transferOwnersState={transferOwnersState}
              rejectTransferOwner={rejectTransferOwner}
              rejectTransferOwnerState={rejectTransferOwnerState}
              rejectTransferHolder={rejectTransferHolder}
              rejectTransferHolderState={rejectTransferHolderState}
              rejectTransferOwnerHolder={rejectTransferOwnerHolder}
              rejectTransferOwnerHolderState={rejectTransferOwnerHolderState}
              onReturnToIssuer={returnToIssuer}
              returnToIssuerState={returnToIssuerState}
              onDestroyToken={onDestroyToken}
              destroyTokenState={destroyTokenState}
              onRestoreToken={onRestoreToken}
              restoreTokenState={restoreTokenState}
              isExpired={isExpired}
              isObligation={isObligation}
              obligationStatus={obligationStatus}
              onAcceptObligation={acceptObligation}
              acceptObligationState={acceptObligationState}
              onRejectObligation={rejectObligation}
              rejectObligationState={rejectObligationState}
              onDischargeObligation={dischargeObligation}
              dischargeObligationState={dischargeObligationState}
            />
          ) : (
            isExpired && (
              <div
                className="
                  flex min-h-[140px]
                  flex-col items-center justify-center
                  rounded-xl
                  border border-scarlet-100
                  bg-scarlet-50/50
                  px-4 py-6
                  text-center
                "
              >
                <div
                  className="
                    mb-2 flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    bg-white
                    text-scarlet-500
                    shadow-sm
                  "
                >
                  <AlertCircle size={18} />
                </div>

                <TagBordered
                  id="expired-sign"
                  rounded="rounded-full"
                  className="
                    border-scarlet-100
                    bg-scarlet-100
                    px-3
                    py-1
                    text-scarlet-500
                  "
                >
                  <h5 data-testid="expiredDoc" className="text-xs font-semibold">
                    Expired
                  </h5>
                </TagBordered>

                <p className="mt-1.5 text-[11px] text-cloud-500">This document has expired.</p>
              </div>
            )
          )}
        </div>

        {!isTransferableDocument && renderBanner(isSampleDocument)}
      </div>
    </div>
  );
};
