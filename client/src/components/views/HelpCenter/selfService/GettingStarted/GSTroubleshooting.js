import React from "react";

const GSTroubleshooting = () => {
  return (
    <div>
      <div
        className="d-flex flex-column border bg-white justify-content-center py-2 px-4"
        style={{ marginRight: "4rem", marginLeft: "4rem", borderRadius: "8px" }}
      >
        <div className="d-flex flex-column py-3">
          <div className="">
            <h1>Getting Started Troubleshooting</h1>
          </div>
        </div>
        <div className="py-3">
          <div>
            <h4>When I input my business URL, Seona says there is an error</h4>
            <img alt="website-provider" className="my-3" />
            <p>Common reasons include:</p>
            <ul>
              <li>
                The domain you inputted could not be visited. Try inputting the
                scanned URL into a web browser to verify this. If your website
                is hosted on a different subdomain, make sure your base domain
                reroutes to the correct subdomain.
              </li>
              <li>
                The domain you entered is not secure, and is only hosted through
                HTTP, not HTTPS. This is crucial for your website to appear on
                search engines like Google, and requires a valid SSL
                certificate.
              </li>
              <li>
                Your website took too long to load, and our servers timed out
                when attempting to visit it. Make sure you website page load
                speed is reasonable.
              </li>
              <li>
                Our servers may be down at this time. Please try again in a few
                minutes.
              </li>
            </ul>
            <p>If you are still having issues, contact support here. ​</p>
          </div>
        </div>
        <div className="py-3">
          <div>
            <h4>
              After I sign up for Seona, it says "this URL has already been
              claimed"
            </h4>
            <img alt="website-provider" className="my-3 mx-auto" />
            <p>
              We only allow one Seona project per domain, so if you try to
              register a project with a domain that has already been claimed,
              you will be prompted to either:
            </p>
            <ol>
              <li>Register another domain OR</li>

              <li>
                Contact support if you want to transfer ownership of the domain
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTroubleshooting;
