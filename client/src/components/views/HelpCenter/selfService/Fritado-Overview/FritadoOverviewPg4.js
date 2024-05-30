import React from "react";
import { Link } from "react-router-dom";
import { TiCancel, TiArrowRight } from "react-icons/ti";
import { MdKeyboardArrowUp ,MdOutlineLogout} from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";

const FritadoOverviewPg4 = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border bg-white justify-content-center py-2 px-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/*Prcing */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Pricing and Blilling</h1>
            <p>Common questions about Seona and what Seona does for you!</p>
          </div>
          {/* <div>video</div> */}
        </div>
        {/*Seona Negatively Affecting */}
        <div className="py-3">
          <div>
            <h3>How do I cancel my Seona subscription?</h3>
            <p>
              If you would like to cancel your Seona subscription, you can do so
              by either:
            </p>
          </div>
          <ol>
            <li className="li-size">
              Clicking “Cancel my subscription” under the user dropdown located
              at the top right corner of your dashboard, OR
            </li>
            <button className="border-0 rounded px-3 py-2 ">admin@useStyli.ai <span><MdKeyboardArrowUp  size={20}/></span></button>
            <div className="my-3 bg-white border rounded d-flex flex-column w-25">
            <button className="border-0  rounded py-2"><span><TiCancel size={20}/></span> Cancel my subscription</button>
            <button className="border-0  rounded py-2"><span><MdOutlineLogout size={20}/></span> Log out</button>
            </div>
            <li className="li-size">
              Underneath the Billing section of the Settings page.
            </li>
            <h5>Billing</h5>
            <p>Manage you credit card info , subscription , and billing history</p>
            <div className="d-flex justify-content-between w-50">
            <button className="bg-danger border-0  rounded px-3 py-2 ">Cancel my subscription<span><TiArrowRight size={20}/></span></button>
            <button className="border-0  rounded px-3 py-2"><span className="pr-1"><TbExternalLink size={20} /></span>Manage Payments</button>
            </div>
          </ol>
        </div>
        <div className="py-3">
          <div>
            <h3>
              If I cancel my Seona subscription, will Seona’s blog posts and
              code changes still be there?
            </h3>
            <p>
              Any blogs writes for your website is owned by you for perpetuity,
              but you will no longer have access to the dashboard after your
              payment period ends. All code changes will stop applying to your
              website after your payment period ends if you have not applied
              them manually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FritadoOverviewPg4;
