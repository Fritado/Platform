import React, { useState } from "react";
import CodeCard from "./CodeCard";
import { IoEye } from "react-icons/io5";
import OnSiteCode from "./OnSiteCode";
import { Link } from "react-scroll";

const sideListName = [
  {
    id: "1",
    title: "All",
  },
  {
    id: "2",
    title: "Optimise title",
  },
  {
    id: "3",
    title: "Optimise description",
  },
  {
    id: "4",
    title: "Add Open Graph tag",
  },
  {
    id: "5",
    title: "Add H1 tag",
  },
  {
    id: "6",
    title: "Convert extra H1 tag",
  },
  {
    id: "7",
    title: "Add alterante text",
  },
  {
    id: "8",
    title: "Monthly link target",
  },
  {
    id: "9",
    title: "Add link title",
  },
];
const Overview = () => {
  return (
    <div>
      <OnSiteCode />
      <div className="d-flex flex-row mb-4 mx-4">
        <div className="border-right bg-white p-2" style={{ width: "30%" }}>
          {sideListName.map((element, id) => {
            return (
              <div>
                <ul
                  className={`py-2 cursor-pointer 
                    
                 `}
                  style={{ backgroundColor: "#d9d8d8", listStyle: "none" }}
                >
                  <li key={id}>
                    <Link
                      to={element.title}
                      smooth={true}
                      offset={-130}
                      duration={500}
                    >
                      {element.title}
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
        <div className="">
          <div className="d-flex flex-column px-4 bg-white">
            <div className="p-3">
              <h5 className="fw-semibold">Code Change</h5>
              <p>
                Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
                ipsumLorem ipsumLorem ipsum
              </p>
              <button className="mt-2 border py-2 px-2 bg-grey">
                Not automatically applied
              </button>
              <div className=" my-3 border-top"></div>
              <div className="d-flex justify-content-between">
                <span>Fritado.com</span>
                <button className="border px-3 py-2 bg-grey">
                  <span className="pr-2">
                    <IoEye />
                  </span>
                  Preview
                </button>
              </div>
            </div>
          </div>
          <div className="mx-4">
            <div id="Optimise title">
              <CodeCard
                id="Optimise title"
                heading="Optimise title"
                title1="Name title"
                title2="Previous title"
                para1="Fritado | Automating content Marketing with generative AI"
                para2="Fritado"
              />
            </div>
          </div>
          <div className="mx-4">
            <div id="Optimise description">
              <CodeCard
                id="Optimise description"
                heading="Optimise description"
                title1="Name title"
                title2="Previous title"
                para1="Fritado | Automating content Marketing with generative AI"
                para2="Fritado"
              />
            </div>
          </div>
          <div className="mx-4">
            <div id="Add Open Graph tag">
              <CodeCard
                id="Add Open Graph tag"
                heading="Add Open Graph tag"
                title1="Name title"
                title2="Previous title"
                para1="Fritado | Automating content Marketing with generative AI"
                para2="Fritado"
              />
            </div>
          </div>
          <div className="mx-4">
            <div id="Add H1 tag">
              <CodeCard
                id="Add H1 tag"
                heading="Add H1 tag"
                title1="Name title"
                title2="Previous title"
                para1="Fritado | Automating content Marketing with generative AI"
                para2="Fritado"
              />
            </div>
          </div>
          <div className="mx-4">
            <div id="Convert extra H1 tag">
              <CodeCard
                id="Convert extra H1 tag"
                heading="Convert extra H1 tag"
                title1="Name title"
                title2="Previous title"
                para1="Fritado | Automating content Marketing with generative AI"
                para2="Fritado"
              />
            </div>
          </div>
          <div className="mx-4">
            <div id="Add alterante text">
              <CodeCard
                id="Add alterante text"
                heading="Add alterante text"
                title1="Name title"
                title2="Previous title"
                para1="Fritado | Automating content Marketing with generative AI"
                para2="Fritado"
              />
            </div>
          </div>
          <div className="mx-4">
            <div id="Monthly link target">
              <CodeCard
                id="Monthly link target"
                heading="Monthly link target"
                title1="Name title"
                title2="Previous title"
                para1="Fritado | Automating content Marketing with generative AI"
                para2="Fritado"
              />
            </div>
          </div>
          <div className="mx-4">
            <div id="Add link title">
              <CodeCard
                id="Add link title"
                heading="Add link title"
                title1="Name title"
                title2="Previous title"
                para1="Fritado | Automating content Marketing with generative AI"
                para2="Fritado"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
