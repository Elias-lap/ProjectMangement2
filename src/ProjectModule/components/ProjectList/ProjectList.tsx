import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import {  useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import { useDarkMode } from "../../../context/DarkLightModa";
import StyleProject from "./Project.module.css";
import Table from "react-bootstrap/Table";
import ImgNotData from "../../../SharedModule/components/ImgNotData/ImgNotData";
import imgNoData from "../../../imgs/noData.png";

interface progectListType {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  manager: { id: number | null };
}

export default function ProjectModule() {
  const [loading, setLoading] = useState(true);

  const { userRole } = useUser();
  //  pagination 
  
  // dark Light moda
  const darkModeContext = useDarkMode();
  const isDarkMode = darkModeContext ? darkModeContext.isDarkMode : false;

  // closing and opening Modal
  const [show, setShow] = useState<boolean>(false);
  const [projectId, setprojectId] = useState<number>(0);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const { Token } = useUser();
  const navigate = useNavigate();

  const navigateToProjectData = () => {
    navigate("/dashboard/project-data");
  };

  const [projecList, setprojecList] = useState<progectListType[]>([]);
  console.log(projecList);
  const [pagesArray, setpagesArray] = useState<number[]>([]);
  

  const getProjects = async (
    pageNo: number,
    pageSize: number,
    title?: string
  ) => {
    console.log(userRole);
    try {
      if (userRole == "undefined") {
        const response = await axios.get(
          "https://upskilling-egypt.com:3003/api/v1/Project/",
          {
            headers: { Authorization: `Bearer ${Token}` },
            params: {
              pageNumber: pageNo,
              pageSize: pageSize,
              title: title,
            },
          }
        );
        // console.log(rsponse.data.totalNumberOfPages);
        setpagesArray(
          Array(response.data.totalNumberOfPages)
            .fill([])
            .map((_, i) => i + 1)
        );
        setprojecList(response.data.data);
      } else if (userRole == "Manager") {
        const response = await axios.get(
          `https://upskilling-egypt.com:3003/api/v1/Project/?pageSize=${pageSize}&pageNumber=${pageNo}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
            params: {
              title: title,
            },
          }
        );
        // console.log(rsponse.data.totalNumberOfPages);
        setpagesArray(
          Array(response.data.totalNumberOfPages)
            .fill([])
            .map((_, i) => i + 1)
        );
        setprojecList(response.data.data);
      } else {
        const response = await axios.get(
          `https://upskilling-egypt.com:3003/api/v1/Project/employee?pageSize=${pageSize}&pageNumber=${pageNo}`,
          {
            headers: { Authorization: `Bearer ${Token}` },
            params: {
              title: title,
            },
          }
        );
        // console.log(rsponse.data.totalNumberOfPages);
        setpagesArray(
          Array(response.data.totalNumberOfPages)
            .fill([])
            .map((_, i) => i + 1)
        );
        setprojecList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`https://upskilling-egypt.com:3003/api/v1/Project/${id}`, {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((response) => {
        handleClose();
        getProjects(1, 10);

        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const getNameValue = (input: ChangeEvent<HTMLInputElement>) => {
    // console.log(input.target.value);
    getProjects(1, 7, (input.target as HTMLInputElement).value);
  };

  useEffect(() => {
    getProjects(1, 10);
  }, []);

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    getProjects(1, 10)
      .then(() => setLoading(false)) // Set loading state to false after fetching data
      .catch(() => setLoading(false)); // Set loading state to false if there's an error
  }, []);

  if (!darkModeContext) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <InfinitySpin />
      </div>
    );
  }
  const navigateToEdit = (pro: string) => {
    navigate(`/dashboard/project-data/${pro}`);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className=" bg-white" closeButton></Modal.Header>
        <Modal.Body className="bgForModalBody">
          <div className=" d-flex justify-content-center">
            <div className=" text-center">
              <img src={imgNoData} alt="imgNoData " />
              <h6 className=" text-muted ">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </h6>
            </div>
          </div>
        </Modal.Body>
        <div className="delete-button d-flex justify-content-end p-3 bg-white">
          <button
            onClick={() => {
              handleDelete(projectId);
            }}
            className="btn btn-danger"
          >
            Delete this item
          </button>
        </div>
      </Modal>
      <div
        className={` ${
          isDarkMode ? "dark-mode" : "bg-white"
        }  title mb-3 mt-1 `}
      >
        <div className="container d-flex justify-content-between py-4 ">
          <h3 className={`${              isDarkMode ? "text-white" : " text-muted "
} `}
              >Projects</h3>
          {userRole == "Manager" ? (
            <button
              onClick={navigateToProjectData}
              className={`${StyleProject.btnAdd}  btn text-white rounded-5 px-5`}
              >
              <i className="fa fa-plus " aria-hidden="true"></i> Add New Project
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={`${isDarkMode ? " dark-mode" : `bg-white }`} container rounded-3 BoxShadowForTables py-4 mt-5`} >
        <div className="row  ">
          <div className="group col-md-2">
            <input
              placeholder="Search By Title"
              type="search"
              className={`${StyleProject.inputSearch}`}
              onChange={getNameValue}
            />
          </div>
        </div>
        <div className=" table-responsive">
          <Table className="mt-4 text-center table">
            <thead className={`${StyleProject.tableThead} `}>
              <tr className=" ">
                <th className={`${StyleProject.WordsTheadTable}   `}>
                  Title
                  {/* <i
                    className={`${StyleProject.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>
                <th className={` h-50  d-flex flex-wrap align-items-center justify-content-center  `}>
                  Num Users
                  {/* <i
                    className={`${StyleProject.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>
                <th className={`${StyleProject.WordsTheadTable}   `}>
                  Description
                  {/* <i
                    className={`${StyleProject.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>
                <th className={`${StyleProject.WordsTheadTable}   `}>
                  Date Created
                  {/* <i
                    className={`${StyleProject.fontChevron}  fa-solid fa-chevron-down ms-3 `}
                  ></i> */}
                </th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={parseInt("6")}>
                    <div className="d-flex justify-content-center align-items-center">
                      <InfinitySpin />
                    </div>
                  </td>
                </tr>
              ) : projecList.length > 0 ? (
                projecList.map((pro, index) => (
                  <tr
                    className=" "
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                    }}
                  >
                    <td className="TdTable">{pro.title}</td>
                    <td className="TdTable">{pro.id}</td>
                    <td className="TdTable">{pro.description}</td>
                    {/* <td className="TdTable">{pro.creationDate} */}
                    <td className="TdTable">
                      {pro && pro.creationDate
                        ? pro.creationDate.substring(0, 10)
                        : "N/A"}
                    </td>

                    {/* Actions column */}
                    <td>
                      {userRole == "Manager" ? (
                        <div className="btn-group">
                          <a
                            className="dropdown-toggle fa-2x"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i
                              className={`${StyleProject.iconTasks} fa-solid fa-ellipsis-vertical`}
                            ></i>
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <span
                                onClick={() =>
                                  navigateToEdit(pro.id.toString())
                                }
                                className="dropdown-item"
                              >
                                <span
                                  className={`${StyleProject.btnCursor}  border-0 px-2`}
                                >
                                  <i
                                    className={`${StyleProject.iconTasks} fa-solid fa-pen-to-square me-1`}
                                  ></i>
                                  Edit
                                </span>{" "}
                              </span>
                            </li>
                            <li>
                              <span
                                onClick={() => {
                                  handleShow();
                                  setprojectId(pro.id);
                                }}
                                className="dropdown-item"
                              >
                                <span
                                  className={`${StyleProject.btnCursor}   border-0  px-2`}
                                >
                                  <i
                                    className={`${StyleProject.iconTasks} fa-solid fa-trash me-1`}
                                  ></i>
                                  Delete
                                </span>{" "}
                              </span>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={parseInt("6")}>
                    <ImgNotData />
                  </td>
                </tr>
              )}
            </tbody>
            <nav
        aria-label="Page navigation example "
        className="d-flex justify-content-center"
      >
        <ul className="pagination ">
          <li className="page-item ">
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pagesArray.map((pageNo) => (
            <li
              onClick={() => getProjects(pageNo, 10)}
              key={pageNo}
              className="page-item "
            >
              <a className="page-link">{pageNo}</a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
          </Table>
        </div>
      </div>

   
    </>
  );
}
