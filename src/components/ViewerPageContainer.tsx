import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CertificateViewer } from "./CertificateViewer";
import { Redirect } from "react-router";
import { RootState } from "../reducers";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ViewVerificationPending } from "./DocumentDropzone/Views";
import { updateCertificate } from "../reducers/certificate";
import { getChainId } from "../utils/shared";
import { useProviderContext } from "../common/contexts/provider";
import { useNetworkSelect } from "../common/hooks/useNetworkSelect";
import { EMAIL_API_KEY, IS_DEVELOPMENT, PUBLIC_URL } from "../config";
import { ChainId, ChainInfoObject } from "../constants/chain-info";

interface ViewerPageContainerProps {
  isMagicDemo?: boolean;
}

interface NetworkSelectViewProps {
  chainId: ChainId;
  networks: ChainInfoObject[];
}

export const ViewerPageContainer = ({
  isMagicDemo,
}: ViewerPageContainerProps): React.ReactElement => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentChainId } = useProviderContext();
  const { switchNetwork } = useNetworkSelect();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const key = queryParams.get("key");
  const net = queryParams.get("net");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chainId = net!=='hedera' ? (IS_DEVELOPMENT ? ChainId.APOTHEM : ChainId.XDC):(IS_DEVELOPMENT ? ChainId.HederaTestnet : ChainId.HederaMainnet)  //getChainId(response.data.document);
  useEffect(() => {
    let isMounted = true;

    const retrieveDoc = async () => {
      if (id && key) {
        try {
          const response = await axios.get(`${PUBLIC_URL}/qrcode-storage/${id}/${key}/${EMAIL_API_KEY}`);
          if (isMounted) {
            if (response.data && response.data.document) {
              if (chainId && currentChainId !== chainId) {
                await switchNetwork(chainId);
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
            } else {
              throw new Error("Document data is missing in the response");
            }
          }
          dispatch(updateCertificate(response.data.document));
        } catch (error) {
          console.error("Error retrieving or decrypting document:", error);
          if (isMounted) {
            setError("Failed to retrieve document. Please try again.");
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      } else {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    

    if (id) {
      retrieveDoc();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id, key]);

  const rootState = useSelector((state: RootState) => state);
  const document = isMagicDemo ? rootState.demoVerify.rawModifiedDocument : rootState.certificate.rawModified;

  if (loading) {
    return <div><ViewVerificationPending/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (document) {
    return <CertificateViewer isMagicDemo={isMagicDemo} document={document} />;
  }

  return <Redirect to="/" />;
};
