import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthFooter from "../common/AuthFooter";
import Header from "../common/Header";
import priceImage from "../../../assets/plan-pricing/plan.png"

const SelectPlan = () => {
  return (
    <div className="d-flex flex-column">
      <Header />
      <div className="d-flex mx-auto my-4">
        <img
          src={priceImage}
          className=" d-flex mx-auto w-75 h-100"
        />
      </div>
      <Link to="/portal-walk-through" className="d-flex">
        <span className="my-4 font-weight-bold d-flex text-muted mx-auto">
          Next
          <span>
            <MdKeyboardDoubleArrowRight />
          </span>
        </span>
      </Link>
      <AuthFooter />
    </div>
  );
};

export default SelectPlan;
