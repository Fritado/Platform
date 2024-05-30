import React from "react";

const ProductUpdate = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border mb-2 bg-white justify-content-center p-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Product Updated</h1>
            <p>Upcoming releases for Seona and what new features they offer!</p>
          </div>
        </div>

        <div className="py-3">
          <h2>Current Version: v3.4.0</h2>
          <h4>v3.4.0</h4>
          <p>Released: 1/15</p>
          <h4>Features</h4>
          <div>
            <h4>Wordpress plugin</h4>
            <p>
              Seona's Wordpress plugin allows you to easily link your Wordpress
              site to Seona, allowing blogs to be published to your website
              within 5 minutes.
            </p>
          </div>
          <div>
            <h4>Seona Pro</h4>
            <p>Seona Pro is now available! Read more here.</p>
          </div>
        </div>

        <div className="py-3">
          <h4>v3.3.0</h4>
          <p>Released: 12/22</p>
          <h4>Features</h4>
          <div>
            <h4>Location Targeting</h4>
            <p>
              Seona can now write blog posts and make code changes to target a
              specific location your business services.
            </p>
          </div>
          <div>
            <h4>Code changes preview</h4>
            <p>
              You can now preview how code changes look and where they are
              located on your site with the new code change preview page.
            </p>
          </div>
          <div>
            <h4>PageSpeed Insights</h4>
            <p>
              Seona now runs Google's PageSpeed Insights algorithm on your
              website, to determine how much your Google SEO code score has
              increased due to Seona's code changes.
            </p>
          </div>
        </div>

        <div className="py-3">
          <h4>v3.2.0</h4>
          <p>Released: 12/8</p>
          <h4>Features</h4>
          <div>
            <h4>Keywords Page</h4>
            <p>
              Seona can now write blog posts and make code changes to target a
              specific location your business services.
            </p>
          </div>
          <div>
            <h4>Explainer video</h4>
            <p>
              You can now preview how code changes look and where they are
              located on your site with the new code change preview page.
            </p>
          </div>
          <div>
            <h4>New Overview Page</h4>
            <p>
              Seona now runs Google's PageSpeed Insights algorithm on your
              website, to determine how much your Google SEO code score has
              increased due to Seona's code changes.
            </p>
          </div>
          <div>
            <h4>Ask Seona to edit more!</h4>
            <p>
              Seona now runs Google's PageSpeed Insights algorithm on your
              website, to determine how much your Google SEO code score has
              increased due to Seona's code changes.
            </p>
          </div>
          <div>
            <h4>Quality of life + bug fixes</h4>
            <ul>
              <li>You can now change your language in the Settings page.</li>
              <li>
                We now offer region support, so Seona will give tailored
                recommendations to the selected region
              </li>
            </ul>
          </div>
        </div>
        <div className="py-3">
          <h4>v3.1.0</h4>
          <p>Released: 11/13</p>
          <h4>Features</h4>
          <div>
            <h4>Switching upcoming blog topics</h4>
            <p>
              You can now change upcoming blog topics to another Seona's
              recommended blog topic or your own inputted topic.
            </p>
          </div>
          <div>
            <h4>Search terms graph</h4>
            <p>
              You can now track your search term ranking progress in the
              Overview page with our graph, powered by Semrush.
            </p>
          </div>
          <div>
            <h4>New Settings page</h4>
            <p>
              Users can now change their blog posting preference, your code
              changes preference, or your weekly blog schedule.
            </p>
          </div>
          <div>
            <h4>Multi-language support</h4>
            <p>
              We now offer multi-language support for blogs and code changes!
              Select your language during Onboarding..
            </p>
          </div>
          <div>
            <h4>New cancellation flow</h4>
            <p>We have a new cancellation flow to walk users through cancelling their subscription.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
