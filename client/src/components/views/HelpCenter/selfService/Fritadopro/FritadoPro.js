import React from "react";

const FritadoPro = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border mb-2 bg-white justify-content-center p-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* what is fritado */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>What is Fritado Pro?</h1>
            <p>Explaining Fritado Pro and Seona Pro's New Features</p>
          </div>
          {/* <div>video</div> */}
        </div>
        {/*When can I expect to see results from Seona?... */}
        <div className="pb-3 pt-1">
          <div>
            <p>
              Seona Pro is a new subscription tier above Standard that gives
              businesses and users access to a set of brand-new features and
              generation tools. These are powered by some of the newest, most
              powerful generative AI technologies. Here’s everything you need to
              know about Seona Pro. It starts at $99/month.
            </p>
            <h4>Utilize Humanized Text</h4>
            <p>
              Seona’s blogs are already hyper-optimized to maximize SEO, but
              sometimes at the cost of human-readability. Powered by GPT-4, this
              humanizes the content Seona writes to cross-reference readability
              and SEO searchability.
            </p>
          </div>
        </div>

        <div className="py-3">
          <h4>Access DALLE-3 Image Generation</h4>
          <p>
            DALLE-3 excels at generating unique and relevant images in various
            artistic styles for eye-catching blog posts. Leverage hyper-specific
            image generation tailored for your blog content or choose from our
            old database.
          </p>
        </div>
        <div className="py-3">
          <h4>More Blogs for More Reach</h4>
          <p>
            Seona’s Standard plan offers 1 blog post a week utilizing our
            generative AI suite. For businesses who want to supercharge their
            SEO growth, Seona Pro comes with 2 blog posts a week for aggressive
            SEO teams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FritadoPro;
