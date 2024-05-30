import React from "react";
import { TfiControlBackward ,TfiControlForward } from "react-icons/tfi";

const StepOne = ({ onPrev, onNext }) => {
  return (
    <div>
     {/* <span className="d-flex flex-row">Connect your website </span>*/}
      <div className="d-flex flex-column mt-4  justify-content-center mx-auto bg-white" style={{maxWidth:"655px"}}>
        <div className="d-flex flex-column py-4 px-3">
          <h2 className="">Watch our guide</h2>
          <p>
            Lorem lorem lorem lorem lorem Lorem lorem lorem lorem loremLorem
            lorem lorem lorem loremLorem lorem lorem lorem lorem
          </p>
        </div>
        <div className="my-3 px-3 d-flex justify-content-center ">
        <iframe width="560" height="400" src="https://www.youtube.com/embed/4RVv5o-ctic?si=TbM0KiN59JZJ3ptp&amp;start=24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          
          </div>
      </div>
      <div className="d-flex justify-content-center mx-auto  mt-4 ">
       
        <button className="btn text-dark pl-2 mx-2 " onClick={onNext}>Next <span className="ml-1"><TfiControlForward /></span></button>
      </div>
    </div>
  );
};

export default StepOne;
