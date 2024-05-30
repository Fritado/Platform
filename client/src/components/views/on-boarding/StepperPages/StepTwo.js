import React from "react";
import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";
import { WebsiteProviderList } from '../../data/ProviderList';

const StepTwo = ({ onPrev, onNext }) => {
  return (
    <div>
      {/*<span className="d-flex flex-row">Select your provider </span>*/}
      <div
        className="d-flex flex-column mt-4 bg-white mx-auto justify-content-center"
        style={{ maxWidth: "655px" }}
      >
        <div className="d-flex flex-column justify-content-center py-4 px-3">
          <h2 className="">Provider</h2>
          <p>
            Lorem lorem lorem lorem lorem Lorem lorem lorem lorem loremLorem
            lorem lorem lorem loremLorem lorem lorem lorem lorem Lorem lorem
            lorem lorem lorem Lorem lorem lorem lorem loremLorem lorem lorem
          </p>
        </div>
        <div className="mx-3 my-7">
          {WebsiteProviderList.map((ele) => (
            <div key={ele.id}>
              <ul>
                <label className="">
                  <input
                    type="radio"
                    name="provider"
                    value=""
                    className=""
                  ></input>
                  <span className="pl-3">{ele.option}</span>
                </label>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mx-auto  mt-4 ">
        <button className=" text-dark btn pr-2  mx-2" onClick={onPrev}>
          {" "}
          <span className="mr-1">
            <TfiControlBackward />
          </span>
          Prev
        </button>
        <button className="btn text-dark pl-2 mx-2" onClick={onNext}>
          Next{" "}
          <span className="ml-1">
            <TfiControlForward />
          </span>
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
