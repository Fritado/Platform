import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Keyword = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border bg-white justify-content-center py-2 px-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        <div className="d-flex flex-column py-3">
          <h1>Keywords</h1>
        </div>
        <div className="py-1">
          <ul style={{ listStyle: "none" }} className="">
            <li className="py-2 d-flex justify-content-between">
              Keywords Overview
              <span>
                <MdOutlineKeyboardArrowRight />
              </span>
            </li>
            <li className="py-2 d-flex justify-content-between">
              Keywords FAQ's{" "}
              <span>
                <MdOutlineKeyboardArrowRight />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Keyword;
