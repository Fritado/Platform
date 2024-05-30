import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiArrowUpDownLine } from "react-icons/ri";
import AddKeyword from "./AddKeyword";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import {
  getKeyWords,
  deleteKeyWord,
  updateSingleKeyword,
} from "../../services/onBoarding/KeywordApi";
const Keywords = () => {
  const [showModal, setShowModal] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [filterVal, setFilterVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editableIndex, setEditableIndex] = useState(null);
  const [newKeywordValue, setNewKeywordValue] = useState("");

  useEffect(() => {
    getAllKeywords();
  }, []);

  const getAllKeywords = async () => {
    try {
      const keywordsData = await getKeyWords();
      if (keywordsData && keywordsData.length > 0) {
        setKeywords(keywordsData);
      } else {
        console.error("No keywords found in the response data");
      }
    } catch (error) {
      console.error("Error while fetching Keywords data", error);
    }
  };

  const deleteEachKeyword = async (keywordToDelete) => {
    try {
      const deleteSuccess = await deleteKeyWord(keywordToDelete);
      if (deleteSuccess) {
        const updatedKeywords = keywords.filter(
          (keyword) => keyword !== keywordToDelete
        );
        setKeywords(updatedKeywords);
      }
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
  };

  const updateEachKeyword = async (index, newKeyword) => {
    try {
      const UpdateSuccess = await updateSingleKeyword(
        keywords[index],
        newKeyword
      );
      if (UpdateSuccess) {
        const updatedKeywords = [...keywords];
        updatedKeywords[index] = newKeyword;
        setKeywords(updatedKeywords);
        setEditableIndex(null);
      }
    } catch (error) {
      console.error("Error updating keyword:", error);
    }
  };
  const handleFilter = (E) => {
    setCurrentPage(1);
  };

  const handleEdit = (index, keyword) => {
    setEditableIndex(index);
    setNewKeywordValue(keyword);
  };
  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      updateEachKeyword(index, newKeywordValue);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = keywords.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(keywords.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="text-dark font-weight-bold mb-2"> KeyWords</h2>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Fritado will write blog posts around keywords in order to
                increase traffic and attract customers based on what they search
                for.
              </h4>
              <h4>
                Fritado suggests focusing on easily accessible keywords,
                considering the popularity of your website
              </h4>
              <div className="mt-4 pt-3 d-flex flex-row justify-content-between">
                <div>
                  <input
                    type="search"
                    placeholder="Search"
                    value={filterVal}
                    onChange={(event) => {
                      setFilterVal(event.target.value);
                    }}
                    className="px-4 py-2 border rounded mb-3"
                  />
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn-db me-2 "
                >
                  Add{" "}
                  <span>
                    <MdAdd size={26} />
                  </span>
                </button>
              </div>
              {showModal && (
                <AddKeyword OncloseModal={() => setShowModal(false)} />
              )}

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="fw-normal">S.no</th>
                      <th className="fw-normal"style={{ paddingLeft: "2.5rem" }}>
                        <span className="pe-2">
                          <RiArrowUpDownLine size={18} />
                        </span>
                        Keyword
                      </th>
                      <th className="fw-normal">
                        <span className="pe-2">
                          <RiArrowUpDownLine size={18} />
                        </span>
                        Search Volume
                      </th>
                      <th className="fw-normal">
                        <span className="pe-2">
                          <RiArrowUpDownLine size={18} />
                        </span>
                        Competition
                      </th>
                      <th className="fw-normal">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems
                      .filter((keyword) => {
                        if (filterVal == "") {
                          return keyword;
                        } else if (
                          keyword
                            .toLowerCase()
                            .includes(filterVal.toLowerCase())
                        ) {
                          return keyword;
                        }
                      })

                      .map((keyword, index) => (
                        <tr key={index}>
                          <td>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </td>
                          <td>
                            {editableIndex === index ? (
                              <input
                                type="text"
                                value={newKeywordValue}
                                className="border-0"
                                onChange={(e) =>
                                  setNewKeywordValue(e.target.value)
                                }
                                onKeyPress={(e) => handleKeyPress(e, index)}
                              />
                            ) : (
                              keyword
                            )}
                          </td>
                          <td>100</td>
                          <td>#</td>
                          <td>
                            <span className="pe-3">
                              <CiEdit
                                size={22}
                                onClick={() => handleEdit(index, keyword)}
                                // onClick={() => {
                                //   const newKeyword = prompt(
                                //     "Enter the new keyword:"
                                //   );
                                //   if (newKeyword !== null) {
                                //     updateSingleKeyword(keyword, newKeyword);
                                //   }
                                // }}
                              />
                            </span>
                            <span
                              className="ps-3"
                              onClick={() => deleteEachKeyword(keyword)}
                            >
                              <MdDeleteForever size={22} />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <nav>
                  <ul className="pagination">
                    {pageNumbers.map((number) => (
                      <li key={number} className="page-item">
                        <a
                          onClick={(e) => paginate(number, e)}
                          href="!#"
                          className={`page-link ${
                            currentPage === number ? "active" : ""
                          }`}
                        >
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keywords;
