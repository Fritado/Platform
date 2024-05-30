import React, { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import {
  FritadoOverView,
  GettingStarted,
  Features,
  Fritadopro,
  GeneralResources,
} from "../../data/HelpCenterData";

const SelfService = () => {
  const [openState, setOpenState] = useState({ section: null, index: null });

  const handleAccordionClick = (section, index) => {
    setOpenState((prev) => {
      const isOpen = prev.section === section && prev.index === index;

      return {
        section: isOpen ? null : section,
        index: isOpen ? null : index,
      };
    });
  };

  const isTitleOpen = (section, index) =>
    openState.section === section && openState.index === index;

  const renderAccordionSection = (data, sectionName, section) => (
    <section
      key={sectionName}
      className="mt-3 px-4 py-4 bg-white border"
      style={{ borderRadius: "10px" }}
    >
      <div className="border-bottom pb-1 pt-2">
        <h2 className="pb-2">{sectionName}</h2>
      </div>
      <div className="pt-3">
        {data.map((ele, index) => (
          <div key={ele.title} className="py-1 d-flex flex-column">
            <div
              onClick={() => handleAccordionClick(sectionName, index)}
              className="d-flex flex-row justify-content-between"
            >
              <p className="cursor-pointer">{ele.title}</p>
              <span className="mr-2">
                {openState[sectionName]?.[index] ? (
                  <MdKeyboardArrowDown size={20} />
                ) : (
                  <MdKeyboardArrowRight size={20} />
                )}
              </span>
            </div>
            {isTitleOpen(sectionName, index) && (
              <div className="my-1 ml-12">{ele.flipContent}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div>
      <div
        className="px-4 mt-4"
        style={{ marginRight: "4rem", marginLeft: "4rem" }}
      >
        {/*Section-2 */}
        <div className="mt-4">
          <section className="d-flex flex-column">
            <div>
              <div className="d-flex flex-column">
                <h1>Fritado</h1>
                <p>Click here for questions about our SEO Assistant,Fritado</p>
              </div>
              <div
                className=" d-flex flex-column mt-2"
                style={{ gap: "25px", borderRadius: "8px" }}
              >
                {/* ///////////////////////////// */}
                {renderAccordionSection(
                  FritadoOverView,
                  "Fritado Overview",
                  "overview"
                )}
                {renderAccordionSection(
                  GettingStarted,
                  "Getting Started",
                  "started"
                )}
                {renderAccordionSection(Features, "Features", "features")}
                {renderAccordionSection(Fritadopro, "Fritado Pro", "pro")}
                {renderAccordionSection(
                  GeneralResources,
                  "General Resources",
                  "resources"
                )}
                {/* ///////////////////////////////////// */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SelfService;
