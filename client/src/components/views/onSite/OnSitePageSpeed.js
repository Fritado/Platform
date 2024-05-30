import React , {useState}from "react";
import OnSiteCode from "./OnSiteCode";
import { TbRefresh } from "react-icons/tb";
import { Link } from "react-scroll";

const sideListName = [
  {
    id: "1",
    title: "On this page",
  },
  {
    id: "2",
    title: "Overview",
  },
  {
    id: "3",
    title: "Search engine optimization",
  },
  {
    id: "4",
    title: "Best practices",
  },
  {
    id: "5",
    title: "Accessiability",
  },
];

const OnSitePageSpeed = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleItemClick = (id) => {
    setSelectedItemId(id);
  };
  return (
    <div>
      <OnSiteCode />
      <div className="d-flex flex-row">
        <div className="border-right bg-white p-2" style={{ width: "40%" }}>
          {sideListName.map((element, id) => {
            const isSelected = selectedItemId === element.id;
            return (
              <div>
                <ul
                  onClick={() => handleItemClick(element.id)}
                  className={`py-2 cursor-pointer ${
                    isSelected ? "selected-item" : ""
                  }`}
                  style={{ backgroundColor: "#d9d8d8", listStyle: "none" }}
                >
                  <li key={id}>
                    <Link
                      to={element.title}
                      smooth={true}
                      offset={-430}
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
        <div className="d-flex flex-column mx-auto justify-content-center align-items-center px-4 bg-white">
          <div className="py-3 d-flex flex-column mx-auto align-items-center justify-content-center">
            <h5 className="text-center mt-2">fritado.com</h5>
            <p className="text-center">
              Pagespeed lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem
              ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem
              ipsumlorem ipsumlorem ipsumlorem ipsum
            </p>
            <p className="py-2">Data provided by Google</p>
            <button className="border px-2 py-1">
              <span className="pe-2">
                <TbRefresh />
              </span>
              Refresh report
            </button>
          </div>
          <div className="d-flex flex-column border mt-4" id="Search engine optimization">
            <div className="border-bottom px-4 pt-3">
              <h5 className="py-1 fw-semibold text-dark">
                Search engine optimization
              </h5>
              <p className="pb-2">
                Lorem ipsym Lorem ipsym Lorem ipsym Lorem ipsym Lorem ipsym
                Lorem ipsym Lorem ipsym Lorem ipsym Lorem ipsym{" "}
              </p>
            </div>
            <div className="">
              <div className="border-bottom pt-2">
                <p className="px-4 d-flex">Document has title</p>
              </div>
              <div className="border-bottom pt-2 ">
                <p className="px-4">Document has meta description</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Links have descriptive text</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Images have alternative text</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Document has viewport meta tag</p>
              </div>
              <div className="py-3">
                <p className="px-3 pt-2">
                  Google also utilizes aother metrics to calculate ypur page
                  speed insights search engine optimization score
                </p>
              </div>
            </div>
          </div>


          <div className="border d-flex flex-column mt-4 py-3 px-4 text-dark" id="Best practices">
            <h5 className="py-1 fw-semibold text-dark">Best Practices</h5>
            <p className="pb-2">
              Lorem ipsym Lorem ipsym Lorem ipsym Lorem ipsym Lorem ipsym Lorem
              ipsym Lorem ipsym Lorem ipsym Lorem ipsym
            </p>
          </div>
          <div className="d-flex flex-column border mt-4" id="Accessiability">
            <div className="border-bottom px-4 pt-3">
              <h5 className="py-1 fw-semibold text-dark">Accessiability</h5>
              <p className="pb-2">
                Lorem ipsym Lorem ipsym Lorem ipsym Lorem ipsym Lorem ipsym
                Lorem ipsym Lorem ipsym Lorem ipsym Lorem ipsym{" "}
              </p>
            </div>
            <div className="">
              <div className="border-bottom pt-2">
                <p className="px-4 d-flex">Document has title</p>
              </div>
              <div className="border-bottom pt-2 ">
                <p className="px-4">Document has meta description</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Links have descriptive text</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Images have alternative text</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Document has viewport meta tag</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Document has viewport meta tag</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Document has viewport meta tag</p>
              </div>
              <div className="border-bottom pt-2">
                <p className="px-4">Document has viewport meta tag</p>
              </div>
              <div className="py-3">
                <p className="px-3 pt-2">
                  Google also utilizes aother metrics to calculate ypur page
                  speed insights search engine optimization score
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnSitePageSpeed;
