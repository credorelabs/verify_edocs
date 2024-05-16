import { Overlay, OverlayContextProvider } from "@tradetrust-tt/tradetrust-ui-components";
import React, { useState } from "react";
import { FormState } from "../../../constants/FormState";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./AssetManagementForm";

export default {
  title: "TitleTransfer/AssetManagementForm",
  component: AssetManagementForm,
  parameters: {
    componentSubtitle: "All various scenarios with title transfer.",
  },
};

export const NotLoggedIn = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account=""
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const NoMatch = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <OverlayContextProvider>
      <Overlay />
      <AssetManagementForm
        setShowEndorsementChain={() => {}}
        account="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        onConnectToWallet={() => alert("Login to Metamask")}
        beneficiary="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
        approvedBeneficiary=""
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        formAction={assetManagementAction}
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        onSetFormAction={setAssetManagementAction}
        isSurrendered={false}
        onSurrender={() => alert("Surrender document")}
        surrenderingState={FormState.UNINITIALIZED}
        onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
        holderTransferringState={FormState.UNINITIALIZED}
        onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
        beneficiaryEndorseState={FormState.UNINITIALIZED}
        nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
        approveNewTransferTargetsState={FormState.UNINITIALIZED}
        transferOwners={(approvedBeneficiary, approvedHolder) =>
          alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
        }
        transferOwnersState={FormState.UNINITIALIZED}
        isTitleEscrow={true}
        onDestroyToken={() => alert("Accept document surrender")}
        destroyTokenState={FormState.UNINITIALIZED}
        isTokenBurnt={false}
        onRestoreToken={() => alert("Reject document surrender")}
        restoreTokenState={FormState.UNINITIALIZED}
      />
    </OverlayContextProvider>
  );
};

export const BeneficiaryAndHolder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const Beneficiary = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const Holder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const HolderWithApprovedBeneficiaryAndApprovedHolder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const TransferHolderError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.TransferHolder);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.ERROR}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const TransferHolderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.TransferHolder);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const EndorseChangeBeneficiaryError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseBeneficiary);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.ERROR}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const EndorseChangeBeneficiaryPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseBeneficiary);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.PENDING_CONFIRMATION}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const NominateBeneficiaryAndHolderError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.NominateBeneficiary);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.ERROR}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const NominateBeneficiaryAndHolderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.NominateBeneficiary);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.PENDING_CONFIRMATION}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const EndorseTransferHolderBeneficiary = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseTransfer);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const EndorseTransferHolderBeneficiaryPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseTransfer);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.PENDING_CONFIRMATION}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const SurrenderDocument = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.Surrender);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const SurrenderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.Surrender);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.PENDING_CONFIRMATION}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};

export const SurrenderedNotMinter = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      isAcceptor={false}
      isRestorer={false}
    />
  );
};

export const SurrenderedIsMinter = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      isRestorer={true}
      isAcceptor={true}
    />
  );
};

export const SurrenderedAcceptForm = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.AcceptSurrendered);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      isAcceptor={true}
      isRestorer={false}
    />
  );
};

export const SurrenderedRejectForm = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.RejectSurrendered);

  return (
    <OverlayContextProvider>
      <Overlay />
      <AssetManagementForm
        setShowEndorsementChain={() => {}}
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        onConnectToWallet={() => alert("Login to Metamask")}
        beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
        approvedBeneficiary=""
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        formAction={assetManagementAction}
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        onSetFormAction={setAssetManagementAction}
        isSurrendered={true}
        onSurrender={() => alert("Surrender document")}
        surrenderingState={FormState.UNINITIALIZED}
        onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
        holderTransferringState={FormState.UNINITIALIZED}
        onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
        beneficiaryEndorseState={FormState.UNINITIALIZED}
        nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
        approveNewTransferTargetsState={FormState.UNINITIALIZED}
        transferOwners={(approvedBeneficiary, approvedHolder) =>
          alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
        }
        transferOwnersState={FormState.UNINITIALIZED}
        isTitleEscrow={false}
        onDestroyToken={() => alert("Accept document surrender")}
        destroyTokenState={FormState.UNINITIALIZED}
        isTokenBurnt={false}
        onRestoreToken={() => alert("Reject document surrender")}
        restoreTokenState={FormState.UNINITIALIZED}
        isRestorer={true}
        isAcceptor={false}
      />
    </OverlayContextProvider>
  );
};

export const SurrenderedDocument = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.PENDING_CONFIRMATION}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={true}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
    />
  );
};
