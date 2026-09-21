import React, { FunctionComponent, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  errorMessage?: string;
}

export const Input: FunctionComponent<InputProps> = ({ className, hasError, errorMessage, ...props }) => {
  return (
    <div>
      <input
        className={`app-input px-3 py-2 mb-0 placeholder-cloud-400 ${
          className ? className : ""
        } ${hasError || errorMessage ? "border-scarlet-500" : "border-cloud-200"}`}
        {...props}
      />
      {errorMessage && <p className="text-scarlet-500 my-2">{errorMessage}</p>}
    </div>
  );
};
