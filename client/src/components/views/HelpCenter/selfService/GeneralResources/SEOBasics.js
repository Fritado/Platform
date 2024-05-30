import React from "react";

const SEOBasics = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border mb-2 bg-white justify-content-center p-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* what is fritado */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>SEO Basics</h1>
            <p>A 5 minute read on what you need to know about SEO</p>
          </div>
          {/* <div>video</div> */}
        </div>
        {/*What does Seona do exactly? */}
        <div className="py-3">
          <div>
            <h4>What is SEO?</h4>
            <p>
              Simply put, Search Engine Optimization (SEO) are a set of
              practices you should apply to your website to increase it’s
              ranking on search engines such as Google
            </p>
          </div>
        </div>

        <div className="py-3">
          <h2>Areas of SEO</h2>
          <div className="my-2">
            <h4>On-site SEO</h4>
            <p>This refers to optimizations you can make on your website</p>
            <ul>
              <li>
                Content - The more quality content you have on your site, the
                more search terms you will rank for. To know what content to
                write about, come up with a list of keywords (link to Keywords)
                you want to rank for, factoring in their relevancy to your
                business, their monthly search traffic, and how competitive it
                is to rank for that keyword.
              </li>
              <li>
                Technical - This refers to code optimizations you can make to
                your website to help Google’s ranking algorithm better find your
                site. Make sure you are following proper site building
                techniques (see Google’s guide) and your page load speed is
                fast.
              </li>
            </ul>
          </div>

          <div className="my-2">
            <h4>On-site SEO</h4>
            <p>
              This refers to optimizations you can make outside your website
            </p>
            <ul>
              <li>
                Content - The more quality content you have on your site, the
                more search terms you will rank for. To know what content to
                write about, come up with a list of keywords (link to Keywords)
                you want to rank for, factoring in their relevancy to your
                business, their monthly search traffic, and how competitive it
                is to rank for that keyword.
              </li>
              <li>
                Technical - This refers to code optimizations you can make to
                your website to help Google’s ranking algorithm better find your
                site. Make sure you are following proper site building
                techniques (see Google’s guide) and your page load speed is
                fast.
              </li>
            </ul>
            <div className="my-2">
              <h4>Keywords</h4>
              <p>
                In SEO, keywords are what people type into search engines when
                they're searching for something. They're important because they
                link what people want with the content you have. Using the right
                keywords makes your website show up in search results when
                people look for what you're offering.
              </p>
            </div>
            <div className="my-2">
              <h4>Semrush</h4>
              <p>
                In SEO, keywords are what people type into search engines when
                they're searching for something. They're important because they
                link what people want with the content you have. Using the right
                keywords makes your website show up in search results when
                people look for what you're offering.
              </p>
            </div>
            <div className="my-2">
              <h4>Domain Authority</h4>
              <p>
                In SEO, keywords are what people type into search engines when
                they're searching for something. They're important because they
                link what people want with the content you have. Using the right
                keywords makes your website show up in search results when
                people look for what you're offering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOBasics;
