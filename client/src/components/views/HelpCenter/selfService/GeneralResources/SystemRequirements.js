import React from "react";

const SystemRequirements = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border mb-2 bg-white justify-content-center p-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>System Requirements</h1>
            <p>
              Requirements for your business and website for Seona to work for
              you
            </p>
          </div>
        </div>

        <div className="py-3">
          <p>
            If your site is a preferred website provider, your system
            requirements can be found here:
          </p>
          <h4>Linking Seona</h4>
          <p>
            If your site is a preferred website provider, your system
            requirements can be found here:
          </p>
          <ul>
            <li>Wordpress.com</li>
            <li>Wordpress.org</li>
            <li>Wix</li>
            <li>Squarespace</li>
            <li>Shopify</li>
          </ul>
          <p>
            <span>Note:</span>The biggest reason your website provider is not
            compatible with Seona is you may not be on an upgraded plan, check
            to see if your website provider plan supports custom code
            integrations.
          </p>
          <p>
            Otherwise, find the corresponding instructions to your website
            provider to see if you can follow the steps to link Seona:
          </p>
          <p>
            <span>Note:</span>The biggest reason your website provider is not
            compatible with Seona is you may not be on an upgraded plan, check
            to see if your website provider plan supports custom code
            integrations
          </p>
        </div>

        <div className="py-2">
          <h4 className="pb-1">Code Changes</h4>
          <p>
            Code changes work well for statically generated websites (vast
            majority of website providers), but can be finicky with custom built
            sites (i.e. Nuxt.js). As a result, some or all code changes may not
            be automatically applied to your site. This will not break your
            website's functionality, it will just affect Seona's ability to
            automatically apply the code changes.
          </p>
          <p className="mt-1">
            <span>Note:</span> You can check if code changes are properly being
            applied to your site .here
          </p>
        </div>
        <div className="py-2">
          <h4 className="pb-1">Blog Posts</h4>
          <p>
            If your website is built on a , Seona has the ability to post blogs
            automatically to your site. Seona will automatically post these
            blogs to your Blogs page.
          </p>
          <p className="my-2 pt-1">
            Otherwise, Seona will still write quality blogs for your website,
            but you will have to manually transfer them onto your website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemRequirements;
