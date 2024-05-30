import React from "react";

const OverviewPage = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border bg-white justify-content-center py-2 px-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* Seona Affecting My Website */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Overview Page</h1>
            <p>
              SThe Overview page provides a high level look into your Seona
              project
            </p>
          </div>
          {/* <div>video</div> */}
        </div>
        <div className="py-3">
          <div>
            <img alt="" />
            <h4>Calender</h4>
            <p>
              At the top, there is a calendar that displays upcoming blog posts
              written by Seona and when whey will become available.
            </p>
            <img alt="" />
          </div>
        </div>
        <div className="py-3">
          <h4>Blog Posts Preview</h4>
          <p>
            The Blog posts section includes a glimpse into blog posts written by
            Seona, and you can navigate to the Blogs page from here.
          </p>
          <img alt="" />
        </div>
        <div className="py-3">
          <h4>Code Changes Preview</h4>
          <p>
            TThe Code changes section includes some high level stats about the
            code changes recommended by Seona, including how many active code
            changes are being applied to your site and how many pages Seona has
            crawled. You can navigate to the code changes page from here
          </p>
          <img alt="" />
        </div>
        <div className="py-3">
          <h4>Search Terms Graph</h4>
          <p>
            The Search terms section includes a graph of how many search terms
            you are currently ranking for. The graph is split up into five
            buckets:
          </p>
          <ul>
            <li>
              Top 3: The number of search terms where your site ranks in the top
              3 spots on Google
            </li>
            <li>
              Top 4 - 10: The number of search terms where your site ranks in
              the top 4 - 10 spots on Google
            </li>
            <li>
              Top 11 - 20: The number of search terms where your site ranks in
              the top 11 - 20 spots on Google
            </li>
            <li>
              Top 21 - 50: The number of search terms where your site ranks in
              the top 21 - 50 spots on Google
            </li>
            <li>
              Top 51 - 100: The number of search terms where your site ranks in
              the top 51 - 100 spots on Google
            </li>
          </ul>
          <p>
            The graph displays data for your website for the last 12 months, and
            you can hover your mouse across the graph to see the number of
            search terms in each bucket over time.
          </p>
          <img alt="" className="my-2"/>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
