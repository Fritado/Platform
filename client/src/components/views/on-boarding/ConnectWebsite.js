import React from "react";
import AuthFooter from "../common/AuthFooter";
import Header from "../common/Header";
import Stepper from "./StepperPages/Stepper";
import StepOne from "./StepperPages/StepOne";
import StepTwo from "./StepperPages/StepTwo";
import StepThree from "./StepperPages/StepThree";
import { LuUnplug } from "react-icons/lu";

export default function ConnectWebsite() {
   const list = [<StepOne />, <StepTwo />, <StepThree />];
  // const list = [
  //   { id: 1, heading: "Connect your website", content: <StepOne /> },
  //   { id: 2, heading: "Select your provider", content: <StepTwo /> },
  //   { id: 3, heading: "Explore your dashboard", content: <StepThree /> },
  // ];

  return (
    <div className="">
      <Header />
      <div className="d-flex flex-column mt-3">
        <div className="d-flex flex-column mx-auto justify-content-center align-items-center">
          <span>
            <LuUnplug size={35} />
          </span>
          <div className=" mt-1 d-flex flex-column mx-auto justify-content-center align-items-center">
            <h3 className="text-dark font-weight-bold ">
              Connect your website to continue
            </h3>
            <h4 className="text-dark font-weight-bolder">
              Access is granted to connect with www.domain.com.
            </h4>
            <p className="">
              Connect your website to continue Connect your website to
              continueConnect your website to continueConnect your website to
              continue
            </p>
          </div>
        </div>
      </div>
      <Stepper list={list} />
      <AuthFooter />
    </div>
  );
}
