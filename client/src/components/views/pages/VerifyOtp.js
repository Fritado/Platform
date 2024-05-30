
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import AuthFooter from "../common/AuthFooter";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  // const { signupData } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  //const history = useHistory();

  // useEffect(() => {
  //   if (!signupData) {
  //     history.push("/login");
  //   }
  // }, []);

  // const handleVerifyAndSignup = (e) => {
  //  // e.preventDefault();
  //   const { firstName, lastName, email, password, confirmPassword } =
  //     signupData;

  //   dispatch(
  //     signUp(
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       confirmPassword,
  //       otp,

  //     )
  //   );
  // };

  return (
    <div>
      <div className="d-flex flex-column mx-auto">
        <div className="otp d-flex flex-column mx-auto my-5 pt-5 auth px-0">
          <div className="pb-3">
            <h1 className=" text-color font-weight-bold ">
              Verify account creation code
            </h1>
            <p style={{ fontSize: "16px" }}>
              A verification code has been sent to you (please check the spam
              section).
            </p>
          </div>
          <form className="">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-25 p-3 border border-bottom-3 rounded text-center"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
                marginTop: "20px",
              }}
            />
            <div className="mt-4 font-weight-light">
              <p className="pt-4" style={{ fontSize: "16px" }}>
                Issue with the code ? <strong>Resend code </strong>
              </p>
              <button
                type="submit"
                disabled={!otp}
                className="mt-2 btn btn-primary btn-lg font-weight-medium auth-form-btn"
              >
                Verify account
              </button>
            </div>
          </form>
        </div>
        <AuthFooter />
      </div>
    </div>
  );
};

export default VerifyOtp;
