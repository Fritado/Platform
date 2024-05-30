import React from "react";
import {Link} from 'react-router-dom'

const FritadoOverviewPg3 = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border bg-white justify-content-center py-2 px-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* Seona Affecting My Website */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Seona Affecting My Website</h1>
            <p>Common questions about Seona and what Seona does for you!</p>
          </div>
          {/* <div>video</div> */}
        </div>
        {/*Seona Negatively Affecting */}
        <div className="py-3">
          <div>
            <h4>Is Seona Negatively Affecting My Website?</h4>
            <p>
              Here is exactly what Seona will do for your website. Seona will
              NOT affect your website in any other way:
            </p>
          </div>
          <ol>
            <li className="li-size">
              Through the Seona Javascript plugin, Seona will apply active code
              changes to your website when it is displayed in the browser,
              without touching your website's source code.
            </li>
            <li className="li-size">
              If your website is a preferred website provider, see here for how
              Seona posts blogs to your website.
            </li>
          </ol>
          <p className="my-2">
            Seona will not slow down your page speed, make other website edits,
            or break your site's functionality.
          </p>
          <p className="pt-3">
            If you are still having issues, <Link to='#'>contact support.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FritadoOverviewPg3;
