import React from "react";

const FritadoOverviewPg2 = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border mb-2 bg-white justify-content-center p-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* what is fritado */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>My SEO Progress</h1>
            <p>Common questions about Seona and what Seona does for you!</p>
          </div>
          {/* <div>video</div> */}
        </div>
        {/*When can I expect to see results from Seona?... */}
        <div className="py-3">
          <div>
            <h4>
              When can I expect to see results from Seona? What kind of results
              should I expect?
            </h4>
            <p>
              SEO takes time to show results. However, Seona gets to work fast
              and efficiently. You should start to see your rankings rise slowly
              over a couple of months, and an uptick in traffic over that
              timeline as well. To learn more about improving SEO, read our SEO
              Basics guide.
            </p>
          </div>
        </div>

        {/* Will my site be punished on search engines... */}
        <div className="py-3">
          <h4>
            Will my site be punished on search engines such as Google for having
            AI written content?
          </h4>
          <p>
            It will not. Search engines reward high-quality and relevant content
            which is what Seona is trained to write. Your site will not be
            punished for Seona's content, in fact, Seona will write content that
            Google rewards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FritadoOverviewPg2;
