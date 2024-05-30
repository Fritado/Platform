import React from "react";
import { codeChangeData } from "../data/onsiteData";

const CodeCard = ({heading,title1,title2,para1,para2}) => {
  return (
    <div className="mt-4">
      <div className="d-flex flex-column px-4 py-3 bg-white border">
        <h4 className="">{heading}</h4>
        <div className="py-2">
          <h6 className="">{title1}</h6>
          <div className="border p-2 bg-grey">{para1}</div>
        </div>
        <div className="py-2">
          <h6 className="">{title2}</h6>
          <div className="border p-2 bg-grey">{para2}</div>
        </div>
      </div>
    </div>
  );
};

export default CodeCard;
