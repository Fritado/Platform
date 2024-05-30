import React from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";

const HelpCenterCard = ({heading, para}) => {
 
  return (
    <div>
      <div
        className=" p-4 d-flex mx-auto justify-content-center flex-column border mx-auto bg-white help-card"
        style={{ width: "100%" , borderRadius:"10px" }}
      >
        <span className="mx-auto position-relative align-items-center border-0 rounded pl-1" style={{width:"35px" ,padding:"2px"}}>
          <IoIosHelpCircleOutline size={45}  />
        </span>
        <div className="py-2 mt-2 text-center">
          <h3>{heading}</h3>
          <p>{para}</p>
        </div>
        
      </div>
    </div>
  );
};

export default HelpCenterCard;
