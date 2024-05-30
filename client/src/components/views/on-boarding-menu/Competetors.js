import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { MdAdd } from "react-icons/md";

const Competetors = () => {
  return (
    <div>
      <div className="page-header">
        <h2 className="text-dark fw-semibold mb-2">Competetors</h2>
        
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Competetors Analysis</h4>
              <p className="card-description">
                Provide a list of your business competitors, and we'll analyze
                their online presence to ensure your visibility at the forefront
                of search results.
              </p>

              <form className="forms-sample">
                <div style={{ textAlign: "right" }} className="">
                  <Link to="/add-keyword">
                    <button className="btn-db me-2">
                      Add{" "}
                      <span>
                        <MdAdd size={26} />
                      </span>
                    </button>
                  </Link>
                </div>

                <Form.Group>
                  <label htmlFor="exampleInputName1">Competetors </label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="abc.com "
                  />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputName1">Competetors </label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="abc.com "
                  />
                </Form.Group>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competetors;
