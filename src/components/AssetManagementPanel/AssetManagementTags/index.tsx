import React, { FunctionComponent } from "react";
import { Tag } from "../../UI/Tag";

export const AssetManagementTags: FunctionComponent = () => {
  const tagCSS = "text-[#F15928] bg-gray-100 border border-gray-300 rounded-lg font-gilroy-bold font-semibold p-3 mt-3 mr-5 ";
  return (
    <div className="container">
      <div className="flex w-full py-2">
        <Tag className={tagCSS}>Transferable</Tag>
        <Tag className={tagCSS}>Negotiable</Tag>
      </div>
    </div>
  );
};
