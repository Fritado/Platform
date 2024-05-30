import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const GSWebTroubleShooting = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border bg-white justify-content-center py-2 px-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Website Linking Troubleshooting</h1>
            <p>I'm Having Trouble Linking My Website</p>
          </div>
        </div>
        <div className="py-1">
          <ul style={{ listStyle: "none" }} className="">
            <li className="py-2 d-flex justify-content-between">
              How to link my Seona account to WordPress{" "}
              <span>
                <MdOutlineKeyboardArrowRight />
              </span>{" "}
            </li>
            <li className="py-2 d-flex justify-content-between">
              How to link my Seona account to Shopify{" "}
              <span>
                <MdOutlineKeyboardArrowRight />
              </span>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GSWebTroubleShooting;
