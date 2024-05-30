import React from "react";

const FritadoOverviewPg1 = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border mb-2 bg-white justify-content-center p-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* what is fritado */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>What is Fritado</h1>
            <p>Common questions about Seona and what Seona does for you!</p>
          </div>
          {/* <div>video</div> */}
        </div>
        {/*What does Seona do exactly? */}
        <div className="py-3">
          <div>
            <h4>What does Fritado do exactly?</h4>
            <p>
              Fritado does three important things needed to get your website to
              rank higher on search engines such as Google:
            </p>
          </div>
          <ol>
            <li className="li-size">
              Identifying keywords your site needs to rank for
            </li>
            <li className="li-size">
              Write detailed and quality blog posts for your business
            </li>
            <li className="li-size">
              Automatically optimizes your website's code without affecting it’s
              physical appearance
            </li>
          </ol>
        </div>
        {/*Does Seona work for all types of websites? */}
        <div className="py-3">
          <h4>Does Seona work for all types of websites?</h4>
          <p>
            Yes! Seona works for virtually all websites. See below for more
            details on if your website is compatible with Seona.
          </p>
        </div>
        {/* How do I log into Seona? */}
        <div className="py-3">
          <h4>How do I log into Seona?</h4>
          <p>
            To log into your Seona dashboard, visit seona.usestyle.ai. If you
            are already logged in, you will be redirected to your dashboard.
            Otherwise, you will see Seona starting screen where you can input
            your business URL. To log in from the starting screen, click “Sign
            in” at the top right hand corner. ​
          </p>
        </div>
        {/* Does Seona support multiple languages? */}
        <div className="py-3">
          <h4>Does Seona support multiple languages?</h4>
          <p>
            Yes! Seona supports all major languages and you can choose which
            language you would like Seona to write blog posts and code changes
            in during onboarding.
          </p>
        </div>
        {/* Can I have multiple projects under one account? */}
        <div className="py-3">
          <h4>Can I have multiple projects under one account?</h4>
          <p>
            You can add multiple Seona projects to one Style account! Here’s how
            to do so:
          </p>
          <ol className="li-size">
            <li className="li-size">Make sure you’re logged into Seona.</li>
            <li className="li-size">
              Click on the dropdown on the upper right hand corner
            </li>
            <li className="li-size">Select “Add website”</li>
            <li className="li-size">
              You will be taken to the onboarding page of Seona again, where you
              can input the URL of another domain you wish to connect to Seona.
            </li>
          </ol>
          <p>
            You can also switch between your different projects by clicking the
            dropdown in the upper right corner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FritadoOverviewPg1;
