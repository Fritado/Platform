import React from "react";

const GSSettingUp = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border bg-white justify-content-center py-2 px-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* Seona Affecting My Website */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Setting Up Seona</h1>
            <p>
              After paying for your new Seona project, it’s time to set it up
              and link your website
            </p>
          </div>
        </div>
        <div className="py-3">
          <div>
            <h4>Selecting your website provider</h4>
            <img alt="website-provider" className="my-3" />
            <p>
              The first step in setting up Seona is picking the website provider
              your website is built on. Seona will automatically detect the
              website provider of your URL and pre-select it’s choice, but it
              may not be perfect. If you believe your website is built on a
              different website provider, you can change your selection here.
            </p>
          </div>
        </div>
        <div className="py-3">
          <div>
            <h4>Selecting your code change preference</h4>
            <img alt="website-provider" className="my-3" />
            <p>
              Next, select your preference for how Seona delivers code changes
              to your website. Each week, Seona automatically analyzes up to 100
              pages of your website and recommends new code changes. You can
              allow Seona to apply these changes automatically.
            </p>
            <ul>
              <li style={{ fontWeight: "700" }}>Automatic</li>
              <ul>
                <li>
                  Seona will use it’s Javascript plugin that is installed on
                  your site to deliver code changes automatically to your site.
                  Site visitors to your website will be able to see the
                  implemented code changes live on your site.
                </li>
              </ul>
              <li style={{ fontWeight: "700" }}>Manual</li>
              <ul>
                <li>
                  Seona will still recommend code changes to your site, but will
                  NOT apply them to your site. You can then manually transfer
                  them to your site.
                </li>
              </ul>
            </ul>
          </div>
        </div>
        <div className="py-3">
          <div>
            <h4>Selecting your blog posts preference</h4>
            <p>
              Select your preference for how Seona posts written blog posts to
              your website. Each week, Seona will automatically write a blog
              post relevant to your business, and Seona can automatically post
              it to your website if your website is built on a preferred website
              provider.
            </p>
            <ul>
              <li style={{ fontWeight: "700" }}>Automatically post</li>
              <ul>
                <li>
                  After Seona writes a blog post, it will be displayed on your
                  Seona dashboard and scheduled to automatically post in one
                  week.
                </li>
                <li>
                  During this week, you can review and make edits to the blog
                  post.
                </li>
                <li>
                  <span>Note: </span> Your site needs to be built on a preferred
                  website provider for this option to be selected.
                </li>
              </ul>
              <li style={{ fontWeight: "700" }}>Approve before posting</li>
              <ul>
                <li>
                  After Seona writes a blog post, it will be displayed on your
                  Seona dashboard and scheduled to post in one week.
                </li>
                <li>
                  During this week, you can review and make edits to the blog
                  post.
                </li>
                <li>
                  You must also approve this blog post through the dashboard to
                  allow Seona to post it to your website on the scheduled post
                  date. If you do not approve the blog post before it’s
                  scheduled post date, you can still access the blog post
                  through the dashboard to approve it and allow Seona to post it
                  to your site.
                </li>
                <li>
                  <span>Note: </span> Your site needs to be built on a preferred
                  website provider for this option to be selected.
                </li>
              </ul>
              <li style={{ fontWeight: "700" }}>Manual</li>
              <ul>
                <li>
                  After Seona writes a blog post, it will be displayed on your
                  Seona dashboard
                </li>
                <li>
                  You can review and make edits to the blog post, and post it
                  manually to your site yourself whenever you choose
                </li>
              </ul>
            </ul>
            <p>
              <span>Note:</span>Seona can take up to 24 hours to post your blog
              to your site after the scheduled post date. If your blogs take
              longer to post, you can contact support.
            </p>
          </div>
        </div>
        <div className="py-3">
          <h4>Linking your website to Seona</h4>
          <p>
            The final step is to link your website to Seona! See these detailed
            guides on how to link your site based on what provider your website
            is built on:
          </p>
        </div>
      </div>
    </div>
  );
};

export default GSSettingUp;
