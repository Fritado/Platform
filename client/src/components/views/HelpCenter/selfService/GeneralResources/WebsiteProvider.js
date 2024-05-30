import React from "react";

const WebsiteProvider = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border mb-2 bg-white justify-content-center p-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* what is fritado */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Preferred Website Providers</h1>
            <p>A list of preferred website providers</p>
          </div>
          {/* <div>video</div> */}
        </div>
        {/*When can I expect to see results from Seona?... */}
        <div className="py-3">
          <div>
            <p>
              For websites built on preferred website providers, Seona offers
              automatic blog posting and plugin installation.
            </p>
            <h4 className="my-3">
              Here is the list of preferred website providers:
            </h4>
            <div className="my-2">
              <h3 style={{ textDecoration: "underline" }}>Levi:</h3>
              <ul>
                <li>
                  Part of our native system, Levi integrates seamlessly with
                  Seona. Reach out to our team if you use both
                </li>
              </ul>
            </div>
            <div className="my-2">
              <h3 style={{ textDecoration: "underline" }}>​Wordpress.org</h3>
              <ul>
                <li>
                  If your site is hosted through Wordpress.org, you must add
                  Seona as an Administrator to your site.
                </li>
                <li>
                  Once Seona is added as an Administrator, Seona will
                  automatically install the plugin WPCode (if not already
                  installed) and add the Seona Javascript plugin to the header
                  of every website page using the WPCode plugin.
                </li>
                <li>
                  Then, if you have allowed Seona to publish blogs to your site,
                  Seona will create and publish a blog post under your “Posts”
                  page on your Wordpress.org site. These blog posts will
                  automatically appear on your website’s blog page, if you have
                  that set up. Each one is also hosted on a unique path under
                  your website domain, and the path URL will be displayed on
                  your Blog Posts page.
                </li>
              </ul>
            </div>
            <div className="my-2">
              <h3 style={{ textDecoration: "underline" }}>​Wordpress.com</h3>
              <ul>
                <li>
                  If your site is hosted through Wordpress.com, you must add
                  Seona as an Administrator to your site.
                </li>
                <li>
                  Once Seona is added as an Administrator, Seona will
                  automatically install the plugin WPCode (if not already
                  installed) and add the Seona Javascript plugin to the header
                  of every website page using the WPCode plugin.
                </li>
                <li>
                  Then, if you have allowed Seona to publish blogs to your site,
                  Seona will create and publish a blog post under your “Posts”
                  page on your Wordpress.com site. These blog posts will
                  automatically appear on your website’s blog page, if you have
                  that set up. Each one is also hosted on a unique path under
                  your website domain, and the path URL will be displayed on
                  your Blog Posts page.
                </li>
              </ul>
            </div>
            <div className="my-2">
              <h3 style={{ textDecoration: "underline" }}>Squarespace</h3>
              <ul>
                <li>
                  If your site is hosted through Wordpress.com, you must add
                  Seona as an Administrator to your site.
                </li>
                <li>
                  Once Seona is added as an Administrator, Seona will
                  automatically install the plugin WPCode (if not already
                  installed) and add the Seona Javascript plugin to the header
                  of every website page using the WPCode plugin.
                </li>
                <li>
                  Then, if you have allowed Seona to publish blogs to your site,
                  Seona will create and publish a blog post under your “Posts”
                  page on your Wordpress.com site. These blog posts will
                  automatically appear on your website’s blog page, if you have
                  that set up. Each one is also hosted on a unique path under
                  your website domain, and the path URL will be displayed on
                  your Blog Posts page.
                </li>
              </ul>
            </div>
            <div className="my-2">
              <h3 style={{ textDecoration: "underline" }}>Wix</h3>
              <ul>
                <li>
                  If your site is hosted through Wordpress.com, you must add
                  Seona as an Administrator to your site.
                </li>
                <li>
                  Once Seona is added as an Administrator, Seona will
                  automatically install the plugin WPCode (if not already
                  installed) and add the Seona Javascript plugin to the header
                  of every website page using the WPCode plugin.
                </li>
                <li>
                  Then, if you have allowed Seona to publish blogs to your site,
                  Seona will create and publish a blog post under your “Posts”
                  page on your Wordpress.com site. These blog posts will
                  automatically appear on your website’s blog page, if you have
                  that set up. Each one is also hosted on a unique path under
                  your website domain, and the path URL will be displayed on
                  your Blog Posts page.
                </li>
              </ul>
            </div>
            <div className="my-2">
              <h3 style={{ textDecoration: "underline" }}>Shopify</h3>
              <ul>
                <li>
                  If your site is hosted through Wordpress.com, you must add
                  Seona as an Administrator to your site.
                </li>
                <li>
                  Once Seona is added as an Administrator, Seona will
                  automatically install the plugin WPCode (if not already
                  installed) and add the Seona Javascript plugin to the header
                  of every website page using the WPCode plugin.
                </li>
                <li>
                  Then, if you have allowed Seona to publish blogs to your site,
                  Seona will create and publish a blog post under your “Posts”
                  page on your Wordpress.com site. These blog posts will
                  automatically appear on your website’s blog page, if you have
                  that set up. Each one is also hosted on a unique path under
                  your website domain, and the path URL will be displayed on
                  your Blog Posts page.
                </li>
              </ul>
            </div>
          </div>
          <p>
            <span>Note:</span>the actions listed above are the ONLY actions
            Seona will perform to your site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteProvider;
