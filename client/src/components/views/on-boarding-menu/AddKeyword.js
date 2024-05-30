import React, { useState, useEffect, useRef } from "react";
import { GoSearch } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";

const AddKeyword = ({ OncloseModal }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      OncloseModal();
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className=" ">
      <div className="modal-wrapper"></div>
      <div className="d-flex flex-column modal-container mx-auto d-flex justify-content-center align-items-center ">
        <button
          onClick={OncloseModal}
          style={{ placeSelf: "end", background: "none" }}
          className="border-0"
        >
          <IoMdClose size={25} />
        </button>

        <div className="border rounded d-flex flex-column align-items-center bg-white text-emphasis-dark mx-4 px-3 py-4">
          <form>
            <div className="mt-2 px-2 d-flex flex-column justify-content-center mx-auto">
              <input
                type="search"
                placeholder="Search"
                className="px-4 py-2 border rounded mb-3"
              />
              <span className="mx-auto d-flex py-3">
                <BsSearch size={45} />
              </span>
            </div>

            <p
              className="text-center"
              style={{ fontSize: "1rem", lineHeight: "1.5rem" }}
            >
              Fritado plans to create blog posts centered around strategic
              keywords to boost traffic and attract customers based on their
              search queries.
            </p>

            <button
              className=" d-flex justify-content-center mx-auto mt-3
             btn btn-primary border rounded py-2.5 px-3 mx-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddKeyword;
