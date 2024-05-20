import React, { FunctionComponent } from "react";

export const ViewVerificationPending: FunctionComponent = () => {
  return (
    <div>
      <div className={`fixed top-5 left-0 z-[2002] flex flex-col h-full w-full items-center justify-center bg-white`}>
        <div className="relative h-48 w-48">
          <div className="rotate-animation  h-48 w-48 rounded-full border-x-4 border-t-4 border-x-[#4FD1C5] border-t-[#4FD1C5] border-[#4FD1C5]-teal" />
          <img
            alt=""
            src={"https://www.credore.xyz/assets/images/Logo.png"}
            className="absolute left-[14%] top-[46%]  -translate-x-1/2 -translate-y-1/2 animate-pulse w-36"
          />
        </div>
      </div>
    </div>
  );
};
