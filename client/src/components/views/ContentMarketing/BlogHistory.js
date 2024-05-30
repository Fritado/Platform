import React from "react";
import BlogAutomation from "./BlogAutomation";

const BlogHistory = () => {
  return (
    <div className="">
      <BlogAutomation />
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Recent Blog Posts</h4>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sno </th>
                    <th>Blog Topic</th>
                    <th>Published On</th>
                    <th>Google Url Listing</th>
                    <th>Analytic</th>
                  </tr>
                </thead>

                <tbody className="text-capitalize">
                  Your latest posted blog will appear here
                  {/* {jb tk data nhi h show this text else show data in table format} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHistory;
