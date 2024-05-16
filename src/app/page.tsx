"use client"
import PageLayout from "@/components/common/PageLayout";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Lottie from "react-lottie";
import { DOCSCAN } from "@/assets/animation/indes";
// import { isValid, verify } from "@govtechsg/oa-verify";

export default function Home() {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    // Add logic here to handle the dropped files, validate file type, etc.
    if (!files[0]?.name.endsWith('.tt')) {
      Swal.fire('Invalid file type!', 'Please upload a MLETR file', 'warning')
    }
    console.log(files[0]?.name.endsWith('.pdf'));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      // Add logic here to handle the selected files
      console.log(fileList);
    }
  };
  // const verifyDocuments = async () => {
  //   setLoading(true);
  //   const verify = verificationBuilder(openAttestationVerifiers, {
  //     network: "sepolia",
  //   });

  //   const promisesCallback = (verificationMethods) => {
  //     for (const verificationMethod of verificationMethods) {
  //       verificationMethod.then((fragment) => {
  //         console.log(
  //           `${fragment.name} has been resolved with status ${fragment.status}`
  //         );
  //       });
  //     }
  //   };

  //   const fragments = await verify(file, promisesCallback);
  //   // setView(true);
  //   if (isValid(fragments)) {
  //     setView(true);
  //   }
  //   console.log(isValid(fragments));

  //   setVerificationResult(fragments);
  //   if (fragments && fragments.some((item) => item.status === "INVALID")) {
  //     setInvalid(fragments.filter((entry) => entry.status === "INVALID"));
  //     console.log(fragments.filter((entry) => entry.status === "INVALID"));
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   if (file) {
  //     verifyDocuments();
  //   }
  // }, [file]);

  // const handleFileUpload = async (event) => {
  //   const file = event.target.files[0];
  //   // setFile(file);
  //   setInvalid();
  //   console.log("file", file);
  //   let isTransferableAsset;

  //   setSelectedFile(file);
  //   if (!file) {
  //     console.error("No file selected");
  //     return;
  //   }

  //   try {
  //     // Create a new FileReader instance
  //     const reader = new FileReader();

  //     // Define a callback function for when the file is loaded
  //     reader.onload = async (fileC) => {
  //       try {
  //         // Parse the JSON content of the file
  //         const fileContent = JSON.parse(event.target.result);
  //         isTransferableAsset = utils.isTransferableAsset(fileContent);
  //         console.log(oaUtils.isWrappedV2Document(fileContent));
  //         console.log(oaUtils.isWrappedV3Document(fileContent));
  //         if (isTransferableAsset) {
  //           try {
  //             const tokenId = `0x${oaUtils.getAssetId(fileContent)}`;
  //             console.log(tokenId);
  //           } catch (e) {
  //             console.log(e.message);
  //           }
  //         }
  //         setFile(fileContent);
  //         console.log(isTransferableAsset);
  //         console.log(fileContent);

  //         // setVerificationResult(verificationResult);
  //       } catch (error) {
  //         console.error("Error parsing JSON:", error);
  //       }
  //     };

  //     // Read the file as text
  //     reader.readAsText(file);
  //   } catch (error) {
  //     console.error("Error reading file:", error);
  //   }
  // };

  const handleClickInsideDropArea = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: DOCSCAN,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <PageLayout>
      <h1 className="text-3xl font-semibold mb-10">Verify Documents</h1>
      <div className="flex">
        <div
          className={`w-full my-auto h-96 border-2 rounded-lg border-dashed bg-white border-gray-300 flex items-center justify-center ${dragging ? 'bg-gray-100' : ''
            }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClickInsideDropArea}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            accept=".tt"
          />
          <p className="text-gray-500 text-center"><span className="text-3xl">Drop your .tt files here </span><br />or<br /> <span className="px-8 py-1 text-white cursor-pointer rounded-md bg-[#4fd1c5]">click to browse</span></p>
        </div>
        <div className="my-auto">
          <Lottie options={defaultOptions}
            isPaused={false}
            isClickToPauseDisabled={true}
            height={400}
            width={400}
          />
        </div>
      </div>
    </PageLayout>
  );
};
