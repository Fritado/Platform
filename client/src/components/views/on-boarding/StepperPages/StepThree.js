import React, {useState} from "react";
import { TfiControlBackward, TfiControlForward } from "react-icons/tfi";
import { IoCopyOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectDomainName } from "../../../../slice/PageSpeedSlice";
import axios from "axios";

const StepThree = ({ onPrev, onNext }) => {
  const domainName = useSelector(selectDomainName);
  const [scrapedContent, setScrapedContent] = useState('');
  

  const handleScrape = async () =>{
    try{
     
      const scrapeResponse = await axios.post(`http://localhost:4000/api/scrape/web-scrape`, {domainName:domainName});
      console.log("scrappedResponse coming:" ,scrapeResponse.data);
      setScrapedContent(scrapeResponse.data.scrapedContent);

    }
    catch(error){
      console.error('Error:', error.message);
      console.log("Error at frontend side while scraping website")
    }
  }
  return (
    <div>
      {/*<span className="d-flex flex-row">Explore your dashboard</span>*/}
      <div
        className="d-flex flex-column mt-4 bg-white mx-auto align-items-center"
        style={{ maxWidth: "655px" }}
      >
        <div className="d-flex flex-column py-4 px-4">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <h2>Connect your website</h2>
            <button className="px-1 py-2 border rounded">
              Read more{" "}
              <span>
                <MdArrowOutward />
              </span>
            </button>
          </div>
          <p className="py-1">
            Lorem lorem lorem lorem lorem Lorem lorem lorem lorem loremLorem
            lorem lorem lorem loremLorem lorem lorem lorem lorem
          </p>
          <div className="pl-4">
            <ol className="">
              <li className="py-3 pl-3">
                Lorem lorem lorem lorem lorem Lorem lorem lorem lorem loremLorem
                lorem lorem lorem loremLorem lorem lorem lorem lorem Lorem lorem
                lorem lorem lorem Lorem lorem lorem lorem loremLorem lorem lorem
                lorem loremLorem lorem lorem lorem lorem
              </li>

              <li className="py-3  pl-3">
                Lorem lorem lorem lorem lorem Lorem lorem lorem lorem loremLorem
                lorem lorem lorem loremLorem lorem lorem lorem lorem Lorem lorem
                lorem lorem lorem Lorem lorem lorem lorem loremLorem lorem lorem
                lorem loremLorem lorem lorem lorem lorem
              </li>

              <li className="py-3  pl-3">
                Lorem lorem lorem lorem lorem Lorem lorem lorem lorem loremLorem
                lorem lorem lorem loremLorem lorem lorem lorem lorem Lorem lorem
              </li>
              <div className="bg-secondary py-2 ml-3 pl-3 text-dark">
                <p className="d-flex justify-content-between">
                  Lorem lorem lorem lorem lorem Lorem lorem lorem lorem
                  loremLorem lorem lorem lorem loremLorem lorem lorem lorem
                  lorem Lorem lorem{" "}
                  <span className="pr-3">
                    <IoCopyOutline size={22} />
                  </span>
                </p>
              </div>
              <li className="py-3  pl-3">
                Lorem lorem lorem lorem lorem Lorem lorem lorem lorem Lorem
                lorem lorem lorem lorem Lorem lorem lorem lorem
              </li>
                <Link to="/dashboard" className="text-decoration-none">
              <button className="btn btn-primary px-3 py-2 ml-3 mt-1">
                  <span>
                    <TiTick size={22} />
                  </span>
                  Confirm
              </button>
                </Link>
            </ol>
          </div>
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
      <Link to="/dashboard" className="text-decoration-none">
        <button 
        onClick={handleScrape}
        className="d-flex mx-auto justify-content-center my-2 btn btn-primary">
          Explore your dashboard
        </button>
        {scrapedContent && (
        <div>
          <h3>Scraped Content:</h3>
          <pre>{JSON.stringify(scrapedContent, null, 2)}</pre>
        </div>
      )}
        <p>{domainName}</p>
      </Link>
    </div>
  );
};

export default StepThree;
