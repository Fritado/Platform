import React from "react";

const GSOnboarding = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border bg-white justify-content-center py-2 px-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        {/* Seona Affecting My Website */}
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Onboarding</h1>
            <p>
              Start using Seona to boost your SEO by completing our short
              onboarding flow
            </p>
          </div>
          {/* <div>video</div> */}
        </div>
        <div className="py-3">
          <div>
            <h4>Input Your URL</h4>
            <img alt=""/>
            <p>
              When you visit Seona at seona.usestyle.ai, you will be prompted to
              input your business’s website domain. Seona will automatically
              strip the URL you enter down to the base domain, excluding the
              protocol, the path, and any subdomains such as “www.” Then it will
              use the https protocol to scan your site.
            </p>
            <ul>
              <li>
                For example, if you enter “https://www.google.com/page”, Seona
                will analyze “https://www.google.com” as your base domain.
              </li>
              <p className='my-2'>
                <span>Note:</span> Seona will notify you if your site cannot be
                visited. Common reasons include:
              </p>
              <img alt=""/>
              <li>
                The domain you inputted could not be visited. Try inputting the
                scanned URL into a web browser to verify this. If your website
                is hosted on a different subdomain, make sure your base domain
                reroutes to the correct subdomain.
              </li>
              <img alt=""/>
              <li>
                The domain you entered is not secure, and is only hosted through
                HTTP, not HTTPS. This is crucial for your website to appear on
                search engines like Google, and requires a valid SSL
                certificate..
              </li>
              <img />
              <li>
                Your website took too long to load, and our servers timed out
                when attempting to visit it. Make sure you website page load
                speed is reasonable.
              </li>
              <img alt=""/>
              <li>
                Our servers may be down at this time. Please try again in a few
                minutes.
              </li>
            </ul>
          </div>
        </div>
        <div className="py-3">
          <h4>Fritado's Score</h4>
          <p>
            After you input your website URL, Seona will give your website’s SEO
            a score out of 10. Seona’s main score is a combination of two
            sub-scores: domain authority and search visibility, each out of 10.
          </p>
          <ul>
            <li>
              Domain authority: This scores how much “authority” your website
              commands on search engines such as Google. In other words, how
              many other quality websites reference or link to yours? Building a
              high domain authority takes time, and requires a high amount of
              marketing to achieve.
            </li>
            <li>
              Search visibility: This scores the amount of keywords your site
              ranks for on search engines like Google. The more your page
              appears for different search queries people have, the higher this
              score is.
            </li>
          </ul>
        </div>
        <div className="py-3">
          <h4>Sample Recommendations</h4>
          <p>
            After providing your SEO score, Seona will offer a few sample
            recommendations to your site, giving you a glimpse of what Seona
            will do for you. The two types of recommendations Seona offers are:
            code changes and blog posts.
          </p>
          <ul>
            <li>
              Code change recommendations: Seona will scan your website’s
              homepage and look for code optimizations to be made (see a full
              list of code change types here). Seona will provide up to three
              sample code changes.
            </li>
            <li>
              Blog post topic recommendations: Seona will write two sample blog
              topics tailored to your business (see how Seona picks blog topics
              here). Note: These may not be the blog topics Seona will write
              about after you purchase Seona
            </li>
          </ul>
        </div>
        <div className="py-3">
          <h4>Langauage Selection</h4>
          <img alt=""/>
          <p>
            Seona supports 139 different languages from the ISO-639 language
            list. Seona will detect the language your browser uses and set that
            as your default language, but you can change your preferred language
            at this step. Seona will write all keywords, code changes, and blog
            posts in your selected language. You can change your preferred
            language in your Settings page later.
          </p>
        </div>
        <div className="py-3">
          <h4>Registration/Logging In</h4>
          <img alt=""/>
          <p>
            After scanning your site, it’s time to register for or log into your
            StyleAI account!
          </p>
          <p>
            <span>Note:</span>We only allow one Seona project per domain, so if
            you try to register a project with a domain that has already been
            claimed, you will be prompted to either:
          </p>
          <img />
          <ol>
            <li>Register another domain OR</li>
            <li>
              Contact support if you want to transfer ownership of the domain
            </li>
          </ol>
        </div>
        <div className="py-3">
          <p>
            After you’ve connected your Seona project to your StyleAI account,
            you will be prompted to select your payment plan. Currently, we
            offer two plans for the basic plan:
          </p>
          <ul>
            <li>
              Monthly: $64.99 per month for the basic plan, billed immediately
              and every month thereafter.
            </li>
            <li>
              Annual, with a 1 week free trial: $599.88 per year, billed after a
              1 week (7 days) free trial and every year thereafter. This is
              equivalent to $49.99 per month.
            </li>
          </ul>
          <p>For Seona Pro, we have two plans as well:</p>
          <ul>
            <li>
              Monthly: $129.99 per month, billed immediately and every month
              thereafter.
            </li>
            <li>
              Annual, with a 1 week free trial: $1,199.88 per year, billed after
              a 1 week (7 days) free trial and every year thereafter. This is
              equivalent to $99.99 per month.r thereafter. This is equivalent to
              $49.99 per month.
            </li>
          </ul>
          <p>
            After selecting your payment plan, you will be brought to our
            checkout page, powered by Stripe. You can either pay with debit
            card, credit card, Cash App, or a US bank account. After paying for
            Seona, you will have full access to Seona’s dashboard and features!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GSOnboarding;
